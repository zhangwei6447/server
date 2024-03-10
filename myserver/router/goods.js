const express = require('express')
const router = express.Router()
/**
 * 引入数据库
 */
const goods = require("../db/store/goods.js")

// 首页商品推荐
router.get('/home/recommend', (req, res) => {
    const { page, size } = req.query
    if(!page){
        res.send({code:400,msg:'请求参数page没有正确传递'})
    }
    if(!size){
        res.send({code:400,msg:'请求参数size没有正确传递'})
    }
    let startIndex=(page-1)*size
    let endIndex=page*size
    goods.find({}, { '_id': 0, '__v': 0 }).then(data => {
        res.send({code:200,data:{total:data.length,rows:data.slice(startIndex,endIndex)}})
    })
})
// 商品推荐--类型 手办/周边...
router.get('/recommend/type', (req, res) => {
    const { page, size,type } = req.query
    if(!page){
        res.send({code:400,msg:'请求参数page没有正确传递'})
    }
    if(!size){
        res.send({code:400,msg:'请求参数size没有正确传递'})
    }
    let startIndex=(page-1)*size
    let endIndex=page*size
    goods.find({}, { '_id': 0, '__v': 0 }).then(data => {
        typeGoods=data.filter(it=>{
            return it.goods_type.includes(type)
        })
        res.send({code:200,data:{total:data.length,rows:typeGoods.slice(startIndex,endIndex)}})
    })
})
//商品推荐--类型--细分 比例手办/景品
router.get('/recommend/detailtype', (req, res) => {
    const { page, size,type,detailType } = req.query
    if(!page){
        res.send({code:400,msg:'请求参数page没有正确传递'})
    }
    if(!size){
        res.send({code:400,msg:'请求参数size没有正确传递'})
    }
    let startIndex=(page-1)*size
    let endIndex=page*size
    goods.find({}, { '_id': 0, '__v': 0 }).then(data => {
        typeGoods=data.filter(it=>{
            return it.goods_type.includes(type)
        })
        detailTypeGoods=typeGoods.filter(it=>{
            return it.name.includes(detailType)
        })
        res.send({code:200,data:{total:data.length,rows:detailTypeGoods.slice(startIndex,endIndex)}})
    })
})


module.exports = router