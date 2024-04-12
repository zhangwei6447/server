const express = require('express')
const router = express.Router()
/**
 * 引入数据库
 */
const goodsTable = require("../db/store/goods.js")

// 人气--手办接口
router.get('/popular', (req, res) => {
    const { page, size, type } = req.query
    if (!page || !size) return
    let startIndex = (page - 1) * size
    let endIndex = page * size
    goodsTable.find({}).then(data => {
        let result = data.filter(it => it.goods_type === type)
        res.send({ code: 200, data: { total: data.length, rows: result.slice(startIndex, endIndex) } })
    })
})

module.exports = router