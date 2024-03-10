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
    const { goods_id } = req.body
    goods.find({ goods_id }, { '__v': 0 }).then(data => {
        if(data[0].num<=0){
            res.send({code:200,msg:'该商品已售罄，请浏览其它商品'})
        }else{
            cart.insertMany(req.body)
            res.send({code:200,msg:'加入购物车成功'})
        }
    })
})

/**
 * 修改购物车
 */
router.post('/cart/update',(req,res)=>{
    const {user_id,_id,count}=req.body
    if(user_id&&_id&&count){
        cart.find({_id}).then(data=>{
            cart.updateOne({_id:data[0]._id},{$set:{goods_num:count}}).then(d=>{
                res.send({code:200,msg:'购物车更新成功'})
            })
        })
    }
})

/**
 * 删除购物车
 */
router.post('/cart/delete',(req,res)=>{
    const {user_id,goods_id}=req.body
    if(user_id&&goods_id){
        cart.find({goods_id}).then(data=>{
            cart.deleteOne({goods_id:goods_id}).then(data=>{
                res.send({code:200,msg:'删除商品成功'})
            })
        })
    }
})

/**
 * 获取购物车数据接口 
 */
router.get('/cart/userid',(req,res)=>{
    const {user_id}=req.query
    cart.find().then(data=>{
        let cartList=[]
        for(let i=0;i<data.length;i++){
            if(data[i].user_id===user_id){
                cartList.push(data[i])
            }
        }
        res.send({code:200,data:cartList})
    })
})

module.exports = router