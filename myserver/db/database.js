/**
 * 连接mongdb数据库
 */
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/huiwan').then(() => {
    console.log('*********************************************');
    console.log('数据库连接成功');
    console.log('*********************************************');
})
/**
 * 定义表结构
 */
// 子表--browsing_history
const browsing_history = new mongoose.Schema({
    date: {
        type: Number
    },
    goods_id: {
        type: String
    }
})
// 用户表
const users = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    sex: {
        type: String
    },
    email: {
        type: String
    },
    token: {
        type: String
    },
    goods_collect: {
        type: Array
    },
    browsing_history:[browsing_history]
})

/**
 * 创建表模型
 */
const model = mongoose.model('users', users)
module.exports = model

// model.insertMany({"username":"zs","password":"12345","phone":"12345"})