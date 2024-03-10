const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
/**
 * 引入数据库
 */
const model = require('../db/database.js')
const tokens = require('../db/token.js')
const phoneCode = require('../db/phoneCode.js')
const details=require('../db/commonInterface/details.js')
/**
 * 用户注册
 */
router.post('/user/register', (req, res) => {
    model.find({}, { '_id': 0 }).then(data => {
        let { username, password, phone } = req.body
        let type = data.some(item => {
            return username == item.username
        })
        let type2 = data.some(item => {
            return phone == item.phone
        })
        if (type == true || type2 == true) {
            if (type == true) {
                res.send({ code: 400, msg: '该用户名已存在' })
                console.log(`
                    -------------------------
                    插入失败
                    -------------------------
                `);
            } else {
                res.send({ code: 400, msg: '该手机号已被注册' })
                console.log(`
                    -------------------------
                    插入失败
                    -------------------------
                `);
            }
        } else {
            res.send({ code: 200, msg: '注册成功' })
            console.log(req.body);
            model.insertMany(req.body).then(date => {
                console.log(`
                    -----------------------
                    插入成功
                    -----------------------
                `);
            })
        }
    })
})
/**
 * 用户登录-用户名+密码
 */
router.post('/user/login', (req, res) => {
    const { username, password } = req.body
    let token = jwt.sign({ username }, 'zw', { expiresIn: '999h' })
    model.find({ username, password }, { '__v': 0 }).then(data => {
        if (!data.length) {
            res.send({ code: 400, msg: '用户或者密码错误' })
        } else {
            tokens.find({ user_id: username }, { '__v': 0 }).then(data1 => {
                if (!data1.length) {
                    tokens.insertMany({ 'user_id': username, 'token': token })
                } else {
                    tokens.updateOne({ user_id: username }, { $set: { token: token } }).then(d => { })
                }
            })
            data[0].token=token
            res.send({ code: 200, msg: '登录成功', data: data[0] })
        }
    })
})
/**
 * 获取验证码
 */
router.post('/phone/code', (req, res) => {
    const { phone } = req.body
    let code = (parseInt(Math.random() * 10) + '') + (parseInt(Math.random() * 10) + '') + (parseInt(Math.random() * 10) + '') + (parseInt(Math.random() * 10) + '')
    model.find({ phone }, { '_id': 0, '__v': 0 }).then(data => {
        if (!data.length) {
            res.send({ code: 400, msg: '手机号没有注册' })
        } else {
            phoneCode.find({ phone: phone }).then(data1 => {
                if (!data1.length) {
                    phoneCode.insertMany({ 'phone': phone, 'code': code })
                    res.send({ code: 200, data:code })
                } else {
                    phoneCode.updateOne({ phone: phone }, { $set: { code: code } }).then(d => { })
                    res.send({ code: 200, data:{code:data1[0].code,phone:phone} })
                }
            })
        }
    })
})
/**
 * 验证码登录接口
 */
router.post('/login/phone', (req, res) => {
    const { phone, code } = req.body
    let token = jwt.sign({ phone }, 'zw', { expiresIn: '999h' })
    model.find({ phone }, { '_id': 0, '__v': 0 }).then(data => {
        if (!data.length) {
            res.send({ code: 400, msg: '输入的手机号有误' })
        } else {
            phoneCode.find({ phone: data[0].phone }).then(data1 => {
                if (code !== data1[0].code) {
                    res.send({ code: 400, msg: '你输入的验证码有误，请重新输入' })
                } else {
                    tokens.find({ user_id: data[0].username }).then(d => {
                        if (!d.length) {
                            tokens.insertMany({ 'user_id': data[0].username, 'token': token })
                        } else {
                            tokens.updateOne({ user_id: data[0].username }, { $set: { token: token } }).then(d1 => { })
                        }
                    })
                    data[0].token=token
                    res.send({ code: 200, msg: '登录成功', data: data[0] })
                }
            })
        }
    })
})
/**
 * 修改密码接口
 */
router.post('/update/password', (req, res) => {
    const { token } = req.headers
    const { password, newpassword } = req.body
    tokens.find({ token: token }).then(data => {
        if (!data.length) {
            res.send({ code: 400, msg: '修改密码传递的token传输不正确' })
        } else {
            model.find({ username: data[0].user_id }).then(data1 => {
                if (data1[0].password !== password) {
                    res.send({ code: 400, msg: '输入的旧密码有误，请检查是否输入正确' })
                } else {
                    model.updateOne({ username: data1[0].username }, { $set: { password: newpassword } }).then(d => {
                        res.send({ code: 200, msg: '修改成功，请重新登录' })
                    })
                }
            })
        }
    })
})

/** 免登录接口 */
router.post('/auto/login', (req, res) => {
    const { token } = req.headers
    tokens.find({ token }).then(data => {
        if (!data.length) {
            res.send({ code: 400, msg: 'token已过期，请重新登录' })
        } else {
            model.find({ username: data[0].user_id }).then(d => {
                if (!d.length) {
                    res.send({ code: 400, msg: 'token已过期，请重新登录' })
                } else {
                    d[0].token=data[0].token
                    res.send({ code: 200, msg: '', data: d[0] })
                }
            })
        }
    })
})

/** 获取协议接口 */
router.get('/suggest/info',(req,res)=>{
    details.find().then(data=>{
        console.log(data[0].details);
        res.send({code:200,data:data[0].details})
    })
})

module.exports = router
