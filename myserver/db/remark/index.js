/**
 * 连接mongdb数据库
 */
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/huiwan').then(() => {
    console.log('*********************************************');
    console.log('remarkCollect连接成功');
    console.log('*********************************************');
})
/**
 * 定义表结构
 */
// 评论内容
const content = new mongoose.Schema({
    date: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    img: {
        type: Array
    },
    like: {
        type: Array,
        required: true
    }
})
// 回复内容
const reply = new mongoose.Schema({
    date: {
        type: Number
    },
    text: {
        type: String
    },
    like: {
        type: Array
    },
    is_report_num: {
        type: Number
    },
    is_delete: {
        type: Boolean
    },
    user_id: {
        type: String
    },
    reply_user_id: {
        type: String
    }
})
// 评论表
const remarks = new mongoose.Schema({
    goods_id: {
        type: String,
        required: true
    },
    store_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    content: [content],
    is_report_num: {
        type: Number,
        required: true
    },
    is_delete: {
        type: Boolean,
        required: true
    },
    reply: [reply]
})

/**
 * 创建表模型
 */
const model = mongoose.model('remarks', remarks)
module.exports = model

