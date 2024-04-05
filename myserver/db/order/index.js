/**
 * 连接mongdb数据库
 */
const { type } = require('express/lib/response');
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/huiwan').then(() => {
    console.log('*********************************************');
    console.log('orders连接成功');
    console.log('*********************************************');
})
/**
 * 定义表结构
 */
// 订单
const orders = new mongoose.Schema({
    order_id: {
        type: String,
        required: true
    },
    order_status: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    store_id: {
        type: String,
        required: true
    },
    goods_id: {
        type: String,
        required: true
    },
    goods_num: {
        type: Number,
        required: true
    },
    goods_price: {
        type: Number,
        required: true
    },
    // 创建时间
    create_time: {
        type: Number,
        required: true
    },
    // 发货时间
    delivery_time: {
        type: Number
    },
    // 发货地址
    delivery_address: {
        type: String
    },
    // 收货时间
    receiving_time: {
        type: Number
    },
    // 收货地址
    receiving_address: {
        type: String
    },
    // 售后状态
    after_sales_status: {
        type: String
    },
    // 是否送达
    is_delivered:{
        type:Boolean
    }
})

/**
 * 创建表模型
 */
const model = mongoose.model('orders', orders)
module.exports = model

/**
 * order_status--订单状态
 * + 待付款
 * + 订单已失效
 * + 已支付
 * + 已发货
 * + 已收货
 * + 已退款
 * + 
 */
