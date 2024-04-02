/**
 * 连接mongdb数据库
 */
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/huiwan').then(() => {
    console.log('*********************************************');
    console.log('chats连接成功');
    console.log('*********************************************');
})
/**
 * 定义表结构
 */
// 聊天表
const content = new mongoose.Schema({
    date:{
        type:Number
    },
    text:{
        type:String
    },
    img:{
        type:String
    },
    send_user_id:{
        type:String
    }
})
const chats = new mongoose.Schema({
    chat_users: {
        type: Array,
        required: true
    },
    last_message:{
        type:String
    },
    last_time:{
        type:Number
    },
    content:[content],
})

/**
 * 创建表模型
 */
const model = mongoose.model('chats', chats)
module.exports = model

