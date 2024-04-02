/**
 * 连接mongdb数据库
 */
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/huiwan').then(() => {
    console.log('*********************************************');
    console.log('listType连接成功');
    console.log('*********************************************');
})
/**
 * 定义表结构
 */
// 类型页面数据
const itemSchema=new mongoose.Schema({
    img:{
        type:String,
        required:true
    },
    txt:{
        type:String,
        required:true
    }
})
const listTypes = new mongoose.Schema({
    type_name:{
        type:String,
        required:true
    },
    data:[itemSchema],
    lable:{
        type:Array,
        required:true
    }
})

/**
 * 创建表模型
 */
const model = mongoose.model('listTypes', listTypes)
module.exports = model
// --------------------------------------------------------------//
// model.insertMany({
//     type_name:'卡牌',
//     data:[
//         {
//             img:'https://huiwan-resource.oss-cn-beijing.aliyuncs.com/goods_types_recommend/all/93c9bbc8db9f88f90a6a659579dde86e.png%40.jpg',
//             txt:'卡牌'
//         },

//     ],
//     lable:['原创','五等份的新娘','VOCALOID','刀剑神域','Fate系列','偶像大师系列','少女前线','尼尔系列','魔道祖师','海贼王']
// })