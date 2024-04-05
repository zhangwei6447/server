const express = require('express')

const router = express.Router()

/**
 * 引入数据库
 */
const model = require('../db/store/store.js')
const homeTypes = require('../db/commonInterface/homeTypes.js')
const goods = require('../db/store/goods.js')
const mainTypes = require('../db/commonInterface/mainTypes.js')
const listTypes = require('../db/commonInterface/listType.js')
/**
 * 商家表
 */
router.get('/store/resgister', (req, res) => {
    model.find({}, { '_id': 0, '__v': 0 }).then(data => {
        // console.log(data);
        res.send(data)
    })
})
/**
 * 查询商家
 */
router.get('/query/store', (req, res) => {
    const { store_id } = req.query
    if (store_id) {
        model.find({ store_id: store_id }).then(data => {
            res.send({ code: 200, data: data[0] })
        })
    }
})

/**
 * 查询商家--通过_id
 */
router.post('/query/store2', (req, res) => {
    const { _id } = req.body
    if (!_id) return
    model.find({ _id }).then(d => {
        res.send({ code: 200, data: d[0] })
    })
})

/**
 * 商品表
 */
router.get('/store/goods', (req, res) => {
    goods.find({}, { '_id': 0, '__v': 0 }).then(data => {
        // console.log(data);
        res.send(data)
    })
})

/**
 * 获取首页类型数据
 */
router.get('/home/types', (req, res) => {
    homeTypes.find({}, { '_id': 0, '__v': 0 }).then(data => {
        res.send({ code: 200, data: data })
    })
})

/**
 * 分类页面数据类型
 */
router.get('/main/types', (req, res) => {
    mainTypes.find({}, { '_id': 0, '__v': 0 }).then(data => {
        res.send({ code: 200, data: data })
    })
})
/**
 * ListTypes页面数据
 */
router.get('/list/types', (req, res) => {
    listTypes.find().then(data => {
        res.send({ code: 200, data: data })
    })
})

module.exports = router