/**
 * 连接mongdb数据库
 */
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/huiwan').then(() => {
    console.log('*********************************************');
    console.log('orders_standard连接成功');
    console.log('*********************************************');
})
/**
 * 定义表结构
 */
// 订单编号参照
const orders_standards = new mongoose.Schema({
    order_id: {
        type: String,
        required: true
    }
})

/**
 * 创建表模型
 */
const model = mongoose.model('orders_standards', orders_standards)
module.exports = model

