/**
 * 连接mongdb数据库
 */
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/huiwan').then(() => {
    console.log('*********************************************');
    console.log('address连接成功');
    console.log('*********************************************');
})
/**
 * 定义表结构
 */
// 收货地址表地址
const address = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    // 收货人
    consignee: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    county: {
        type: String,
        required: true
    },
    detail_address: {
        type: String,
        required: true
    },
    is_default: {
        type: Boolean,
        required: true
    },
    date:{
        type: Number,
        required: true
    }
})

/**
 * 创建表模型
 */
const model = mongoose.model('address', address)
module.exports = model

