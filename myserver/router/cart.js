const express = require('express')

const router = express.Router()

/**
 * 引入数据库
 */
const cart = require('../db/cart/cart.js')
const goods = require('../db/store/goods.js')

/**
 * 添加购物车
 */
router.post('/cart/add', (req, res) => {
    const { goods_id, user_id } = req.body
    if (!goods_id) return
    goods.find({ _id: goods_id }, { '__v': 0 }).then(data => {
        if (data[0].num <= 0) {
            res.send({ code: 200, msg: '该商品已售罄，请浏览其它商品' })
        } else {
            cart.find({ user_id }).then(d => {
                if (d.some(it => it.goods_id === goods_id)) {
                    cart.find({ user_id, goods_id }).then(d1 => {
                        let num = d1[0].goods_num
                        num++
                        cart.updateOne({ user_id, goods_id }, { $set: { goods_num: num } }).then(d2 => {
                            res.send({ code: 200, msg: '更新购物车成功' })
                        })
                    })
                } else {
                    cart.insertMany(req.body)
                    res.send({ code: 200, msg: '加入购物车成功' })
                }
            })
        }
    })
})

/**
 * 修改购物车
 */
router.post('/cart/update', (req, res) => {
    const { user_id, _id, count } = req.body
    if (user_id && _id && count) {
        cart.find({ _id }).then(data => {
            cart.updateOne({ _id: data[0]._id }, { $set: { goods_num: count } }).then(d => {
                res.send({ code: 200, msg: '购物车更新成功' })
            })
        })
    }
})

/**
 * 删除购物车
 */
router.post('/cart/delete', (req, res) => {
    const { _id } = req.body
    if (_id) {
        cart.deleteOne({ _id }).then(data => {
            res.send({ code: 200, msg: '删除商品成功' })
        })
    }
})

/**
 * 获取购物车数据接口 
 */
router.get('/cart/userid', (req, res) => {
    const { user_id } = req.query
    if (!user_id) return
    cart.find().then(data => {
        let cartList = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].user_id === user_id) {
                cartList.push(data[i])
            }
        }
        res.send({ code: 200, data: cartList })
    })
})

module.exports = router