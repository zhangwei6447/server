const express = require('express')

const router = express.Router()

/**
 * 引入数据库
 */
const addressTable = require('../db/address/index')

// 新建收货地址接口
router.post('/address/add', (req, res) => {
    const { user_id, consignee, phone, province, city, county, detail_address, is_default, date } = req.body
    if (!user_id || !consignee || !phone || !province || !city || !county || !detail_address || !is_default || !date) return
    if (is_default === 'true') {
        addressTable.find({ user_id }).then(d => {
            if (!d.length) return
            d.forEach(item => {
                addressTable.updateOne({ _id: item._id }, { $set: { is_default: false } }).then(d2 => { })
            })
        })
    }
    setTimeout(() => {
        addressTable.find({ user_id }).then(d2 => {
            if (!d2.length) {
                req.body.is_default = true
                addressTable.insertMany(req.body).then(data => {
                    res.send({ code: 200, msg: '新建地址成功' })
                })
            } else {
                addressTable.insertMany(req.body).then(data => {
                    res.send({ code: 200, msg: '新建地址成功' })
                })
            }
        })
    }, 10)
})

// 查询个人所有地址接口
router.post('/address/query/all', (req, res) => {
    const { user_id } = req.body
    if (!user_id) return
    addressTable.find({ user_id }).then(d => {
        res.send({ code: 200, data: d })
    })
})

// 查询单个地址接口
router.post('/address/query', (req, res) => {
    const { _id } = req.body
    if (!_id) return
    addressTable.find({ _id }).then(d => {
        res.send({ code: 200, data: d[0] })
    })
})

// 修改地址接口
router.post('/address/update', (req, res) => {
    const { user_id, consignee, phone, province, city, county, detail_address, is_default, date, _id } = req.body
    if (!user_id || !consignee || !phone || !province || !city || !county || !detail_address || !is_default || !date) return
    if (is_default) {
        addressTable.find({ user_id }).then(d => {
            if (!d.length) return
            d.forEach(item => {
                addressTable.updateOne({ _id: item._id }, { $set: { is_default: false } }).then(d2 => { })
            })
        })
    }
    setTimeout(() => {
        addressTable.updateOne({ _id }, { $set: { user_id, consignee, phone, province, city, county, detail_address, is_default, date } }).then(data => {
            res.send({ code: 200, msg: '修改地址成功' })
        })
    }, 10)
})

// 删除地址接口
router.post('/address/delete', (req, res) => {
    const { _id } = req.body
    if (!_id) return
    addressTable.find({ _id }).then(d => {
        if (d[0].is_default) {
            addressTable.find().then(d2 => {
                let arr = d2.filter(item => item._id !== _id)
                let obj = arr.sort((a, b) => b.date - a.date)[0]
                addressTable.updateOne({ _id: JSON.parse(JSON.stringify(obj._id)) }, { $set: { is_default: true } }).then(d3 => { })
            })
        }
    })
    addressTable.deleteOne({ _id }).then(d => {
        res.send({ code: 200, msg: '删除地址成功' })
    })
})

module.exports = router