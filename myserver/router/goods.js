const express = require('express')
const router = express.Router()
/**
 * 引入数据库
 */
const goods = require("../db/store/goods.js")
const userTable = require('../db/database.js')

// 首页商品推荐
router.get('/home/recommend', (req, res) => {
    const { page, size } = req.query
    if (!page) {
        res.send({ code: 400, msg: '请求参数page没有正确传递' })
    }
    if (!size) {
        res.send({ code: 400, msg: '请求参数size没有正确传递' })
    }
    let startIndex = (page - 1) * size
    let endIndex = page * size
    goods.find({}, { '_id': 0, '__v': 0 }).then(data => {
        res.send({ code: 200, data: { total: data.length, rows: data.slice(startIndex, endIndex) } })
    })
})
// 商品推荐--类型 手办/周边...
router.get('/recommend/type', (req, res) => {
    const { page, size, type } = req.query
    if (!page) {
        res.send({ code: 400, msg: '请求参数page没有正确传递' })
    }
    if (!size) {
        res.send({ code: 400, msg: '请求参数size没有正确传递' })
    }
    let startIndex = (page - 1) * size
    let endIndex = page * size
    goods.find({}, { '_id': 0, '__v': 0 }).then(data => {
        typeGoods = data.filter(it => {
            return it.goods_type.includes(type)
        })
        res.send({ code: 200, data: { total: data.length, rows: typeGoods.slice(startIndex, endIndex) } })
    })
})
//商品推荐--类型--细分 比例手办/景品
router.get('/recommend/detailtype', (req, res) => {
    const { page, size, type, detailType } = req.query
    if (!page) {
        res.send({ code: 400, msg: '请求参数page没有正确传递' })
    }
    if (!size) {
        res.send({ code: 400, msg: '请求参数size没有正确传递' })
    }
    let startIndex = (page - 1) * size
    let endIndex = page * size
    goods.find({}, { '_id': 0, '__v': 0 }).then(data => {
        typeGoods = data.filter(it => {
            return it.goods_type.includes(type)
        })
        detailTypeGoods = typeGoods.filter(it => {
            return it.name.includes(detailType)
        })
        res.send({ code: 200, data: { total: data.length, rows: detailTypeGoods.slice(startIndex, endIndex) } })
    })
})
// 获取商品详情
router.get('/goods/detail', (req, res) => {
    const { goods_id } = req.query
    if (goods_id) {
        goods.find({ goods_id: goods_id }).then(d => {
            res.send({ code: 200, data: d[0] })
        })
    }
})
// 获取商品详情--通过_id
router.get('/goods/detail2', (req, res) => {
    const { _id } = req.query
    if (_id) {
        goods.find({ _id }).then(d => {
            res.send({ code: 200, data: d[0] })
        })
    }
})
// 商品想要--用户收藏
router.post('/goods/want', (req, res) => {
    const { goods_id, user_id } = req.headers
    goods.find({ goods_id: goods_id }).then(d => {
        if (!d[0].want) return
        if (d[0].want.every(it => it !== user_id)) {
            let wantArr = d[0].want || []
            wantArr.push(user_id)
            goods.updateOne({ goods_id }, { $set: { want: wantArr } }).then(d1 => {
                userTable.find({ _id: user_id }).then(d2 => {
                    if (!d2[0].goods_collect) return
                    if (d2[0].goods_collect.every(it => it !== goods_id)) {
                        let goods_collect_arr = d2[0].goods_collect || []
                        goods_collect_arr.push(goods_id)
                        userTable.updateOne({ _id: user_id }, { $set: { goods_collect: goods_collect_arr } }).then(d3 => {
                            res.send({ code: 200, msg: '收藏成功' })
                        })
                    }
                })
            })
        }
    })
})
// 商品取消想要--用户取消收藏
router.post('/goods/cancel/want', (req, res) => {
    const { goods_id, user_id } = req.headers
    goods.find({ goods_id: goods_id }).then(d => {
        if (!d[0].want) return
        if (d[0].want.some(it => it === user_id)) {
            let wantArr = d[0].want.filter(it => {
                return it !== user_id
            }) || []
            goods.updateOne({ goods_id }, { $set: { want: wantArr } }).then(d1 => {
                userTable.find({ _id: user_id }).then(d2 => {
                    if (!d2[0].goods_collect) return
                    if (d2[0].goods_collect.some(it => it === goods_id)) {
                        let goods_collect_arr = d2[0].goods_collect.filter(it => {
                            return it !== goods_id
                        }) || []
                        userTable.updateOne({ _id: user_id }, { $set: { goods_collect: goods_collect_arr } }).then(d3 => {
                            res.send({ code: 200, msg: '取消收藏成功' })
                        })
                    }
                })
            })
        }
    })
})

module.exports = router