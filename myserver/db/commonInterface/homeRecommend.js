/**
 * 连接mongdb数据库
 */
const mongoose = require('mongoose')
const fs=require('fs')

mongoose.connect('mongodb://127.0.0.1:27017/huiwan').then(() => {
    console.log('*********************************************');
    console.log('homeRecommends连接成功');
    console.log('*********************************************');
})
/**
 * 定义表结构
 */
// 首页推荐数据列表
const homeRecommends = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    state:{
        type:String
    },
    tag:{
        type:Array
    }
})

/**
 * 创建表模型
 */
const model = mongoose.model('homeRecommends', homeRecommends)
module.exports = model

