/**
 * 连接mongdb数据库
 */
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/huiwan').then(() => {
    console.log('*********************************************');
    console.log('phoneCode连接成功');
    console.log('*********************************************');
})
/**
 * 定义表结构
 */
// 手机验证码表
const phoneCode = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
})

/**
 * 创建表模型
 */
const model = mongoose.model('phoneCode', phoneCode)
module.exports = model
