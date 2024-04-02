const express = require('express')

const router = express.Router()

/**
 * 引入数据库
 */
const searchTable = require('../db/search/index.js')
const goodsTable = require('../db/store/goods.js')
const storeTable = require('../db/store/store.js')
/**
 * 新增搜索历史接口
 */
router.post('/search/add/history', (req, res) => {
    const { user_id } = req.headers
    const { txt, date } = req.body
    if (!user_id) return
    let obj = {
        user_id,
        txt,
        date
    }
    searchTable.insertMany(obj).then(d => {
        res.send({ code: 200, msg: '新增成功' })
    })
})

/**
 * 获取搜索历史接口
 */
router.post('/search/query/history', (req, res) => {
    const { user_id } = req.headers
    if (!user_id) return
    searchTable.find({ user_id }).then(d => {
        res.send({ code: 200, data: d })
    })
})

/**
 * 删除单个搜索历史
 */
router.post('/search/delete/history', (req, res) => {
    const { _id } = req.body
    if (!_id) return
    searchTable.deleteMany({ _id }).then(d => [
        res.send({ code: 200, msg: '删除成功' })
    ])
})

/**
 * 删除所有搜索历史
 */
router.post('/search/deleteAll/history', (req, res) => {
    const { user_id } = req.headers
    if (!user_id) return
    searchTable.deleteMany({ user_id }).then(d => [
        res.send({ code: 200, msg: '删除成功' })
    ])
})

/**
 * 商品搜索
 */
router.post('/search/goods', (req, res) => {
    const { txt, page, size } = req.body
    if (!page) {
        res.send({ code: 400, msg: '请求参数page没有正确传递' })
    }
    if (!size) {
        res.send({ code: 400, msg: '请求参数size没有正确传递' })
    }
    if (!txt) return
    goodsTable.find().then(d => {
        let result = d.filter(it => {
            return it.name.includes(txt)
        })
        let startIndex = (page - 1) * size
        let endIndex = page * size
        res.send({ code: 200, data: { total: result.length, rows: result.slice(startIndex, endIndex) } })
    })
})
/**
 * 关键字搜索商家
 */
router.post('/search/store/key', (req, res) => {
    const { value } = req.body
    if (!value) return
    storeTable.find().then(d => {
        let result = d.filter(it => {
            return it.store_name.includes(value)
        })
        res.send({ code: 200, data: result[0] || '' })
    })
})

/**
 * 根据商家搜索商品
 */
router.post('/search/goods/store', (req, res) => {
    const { store_id } = req.body
    if (!store_id) return
    goodsTable.find({ store_id }).then(d => {
        res.send({ code: 200, data: d || '' })
    })
})


module.exports = router