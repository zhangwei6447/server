/**
 * 连接mongdb数据库
 */
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/huiwan').then(() => {
    console.log('*********************************************');
    console.log('store连接成功');
    console.log('*********************************************');
})
/**
 * 定义表结构
 */
// 商家表
const stores = new mongoose.Schema({
    store_id: {
        type: String,
        required: true
    },
    store_name: {
        type: String,
        required: true
    },
    store_des: {
        type: String,
        required: true
    },
    store_phone: {
        type: String,
        required: true
    },
    store_address: {
        type: String,
        required: true
    },
    store_create_time: {
        type: String,
        required: true
    },
    store_create_creater: {
        type: String,
        required: true
    },
    store_username:{
        type:String,
        required:true
    },
    store_password:{
        type:String,
        required:true
    },
    store_logo:{
        type:String,
        required:true
    }
})

/**
 * 创建表模型
 */
const model = mongoose.model('stores', stores)
module.exports = model


// model.insertMany({store_id:'001',store_name:'创意工坊',store_des:'这是一个专门售卖手办的小店',store_phone:'12345678901',store_address:'四川省成都市青羊区苏坡街道22号',store_create_time:'2023.03.10',store_create_creater:'张三',store_username:'chuangyigongfang',store_password:'12345'})
// model.insertMany({
//     store_id:'007',
//     store_name:'泡泡玛特',
//     store_des:'暂无',
//     store_phone:'12345678907',
//     store_address:'上海市青浦区',
//     store_create_time:'2011.05.10',
//     store_create_creater:'马成功',
//     store_username:'paopaomate',
//     store_password:'12345'
// })