/**
 * 连接mongdb数据库
 */
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/huiwan').then(() => {
    console.log('*********************************************');
    console.log('homeTypes连接成功');
    console.log('*********************************************');
})
/**
 * 定义表结构
 */
// 首页分类表
const homeTypes = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    txt: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    test: {
        type: Buffer,
        required: true
    },
    testUrl: {
        type: String,
        required: true
    }
})

/**
 * 创建表模型
 */
const model = mongoose.model('homeTypes', homeTypes)
module.exports = model
// --------------------------------------------------------------//
