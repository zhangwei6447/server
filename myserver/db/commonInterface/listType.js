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
//     type_name:'图书漫画',
//     data:[
//         {
//             img:'https://huiwan-resource.oss-cn-beijing.aliyuncs.com/goods_types_recommend/tushu/1d6c3fc5a6cc0d9f635924c2cea1a092.png%40165w_165h.webp',
//             txt:'漫画'
//         },
//         {
//             img:'https://huiwan-resource.oss-cn-beijing.aliyuncs.com/goods_types_recommend/tushu/0053c4783a0ce67883fe57b2748b195a.png%40165w_165h.webp',
//             txt:'画集'
//         },
//         {
//             img:'https://huiwan-resource.oss-cn-beijing.aliyuncs.com/goods_types_recommend/tushu/d71854820ae6003e32590c4ccb077908.png%40165w_165h.webp',
//             txt:'其它出版物'
//         },
//         {
//             img:'https://huiwan-resource.oss-cn-beijing.aliyuncs.com/goods_types_recommend/tushu/e9a4e3befcc5a71cc0c9615f331a7015.png%40165w_165h.webp',
//             txt:'轻小说'
//         },
//         {
//             img:'https://huiwan-resource.oss-cn-beijing.aliyuncs.com/goods_types_recommend/tushu/be61ba659ae7a49efa1f5cc679911fe4.png%40165w_165h.webp',
//             txt:'写真集'
//         },
//         {
//             img:'https://huiwan-resource.oss-cn-beijing.aliyuncs.com/goods_types_recommend/tushu/ca7972d21844149c5be327a598085392.png%40165w_165h.webp',
//             txt:'CD唱片'
//         },
//         // {
//         //     img:'',
//         //     txt:''
//         // },
//         // {
//         //     img:'',
//         //     txt:''
//         // },
//         // {
//         //     img:'',
//         //     txt:''
//         // },
//         // {
//         //     img:'',
//         //     txt:''
//         // },
//         // {
//         //     img:'',
//         //     txt:''
//         // },
//         // {
//         //     img:'',
//         //     txt:''
//         // },
//         // {
//         //     img:'',
//         //     txt:''
//         // },
//     ],
//     lable:['五等分新娘','明日方舟','VOCALOID','在地下城邂逅是...','海贼王','物语系列','魔法少女小圆','CODE GEASS 反叛的...','人形电脑天使心','凉宫春日系列']
// })