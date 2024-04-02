/**
 * 连接mongdb数据库
 */
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/huiwan').then(() => {
    console.log('*********************************************');
    console.log('cart连接成功');
    console.log('*********************************************');
})
/**
 * 定义表结构
 */
// 首页推荐数据列表
const cart = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    goods_id:{
        type:String,
        required:true
    },
    goods_name:{
        type:String,
        required:true
    },
    goods_num:{
        type:Number,
        required:true
    },
    goods_price:{
        type:String,
        required:true
    },
    sub_total:{
        type:Number
    }
})

/**
 * 创建表模型
 */
const model = mongoose.model('cart', cart)
module.exports = model

