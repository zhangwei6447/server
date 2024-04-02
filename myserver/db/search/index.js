/**
 * 连接mongdb数据库
 */
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/huiwan').then(() => {
    console.log('*********************************************');
    console.log('searchHistoryTable连接成功');
    console.log('*********************************************');
})
/**
 * 定义表结构
 */
// 用户表
const searchHistorys = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    txt:{
        type:String,
        required:true
    },
    date:{
        type:Number,
        required:true
    }
})

/**
 * 创建表模型
 */
const model = mongoose.model('searchHistorys', searchHistorys)
module.exports = model

// model.insertMany({"username":"zs","password":"12345","phone":"12345"})