/**
 * 连接mongdb数据库
 */
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/huiwan').then(() => {
    console.log('*********************************************');
    console.log('goods连接成功');
    console.log('*********************************************');
})
/**
 * 定义表结构
 */
// 商品表
const goods = new mongoose.Schema({
    goods_id: {
        type: String,
        required: true
    },
    goods_type: {
        type: String,
        required: true
    },
    img: {
        type: Array,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    old_price: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    want: {
        type: Array,
        required: true
    },
    the_charts_des: {
        type: String
    },
    params: {
        type: Array,
        required: true
    },
    store_id: {
        type: String,
        required: true
    },
    details: {
        type: Array,
        required: true
    },
    num: {
        type: Number,
        required: true
    },
    ground_time: {
        type: Number,
        required: true
    },
    // 售出
    sold: {
        type: Number
    },
    // 库存
    stock: {
        type: Number
    },
    purchase_limit:{
        type:Number
    }
})

/**
 * 创建表模型
 */
const model = mongoose.model('goods', goods)
module.exports = model

// model.find().then(d=>{
//     for(let i=0;i<d.length;i++){
//         model.updateOne({goods_id:d[i].goods_id},{$set:{purchase_limit:5}}).then(date=>{
//             console.log('更新成功');
//         })
//     }
// })

// model.insertMany({
//     goods_id:'002001',
//     goods_type:'手办',
//     img:[
//         'https://i0.hdslb.com/bfs/mall/mall/91/db/91dbd6b9fd3c65621d60ce3fb2eb381c.png@.webp',
//         'https://i0.hdslb.com/bfs/mall/mall/d8/ae/d8ae53172389d97845b145cf9b4b9e1e.png@.webp',
//         'https://i0.hdslb.com/bfs/mall/mall/21/08/21085b3299780ec035cfaffd59389cac.png@.webp',
//         'https://i0.hdslb.com/bfs/mall/mall/4a/97/4a97de6ac45e6591fa460df14146a952.png@.webp',
//         'https://i0.hdslb.com/bfs/mall/mall/4a/97/4a97de6ac45e6591fa460df14146a952.png@.webp',
//         'https://i0.hdslb.com/bfs/mall/mall/4a/97/4a97de6ac45e6591fa460df14146a952.png@.webp'
//     ],
//     price:'106',
//     old_price:'119',
//     name:'FuRyu Trio-Try-iT 五等分的新娘 中野四叶 兔女郎Ver. 景品手办',
//     want:0,
//     the_charts_des:'中野四叶榜 No.11',
//     params:[
//         {'尺寸':'高约220mm'},
//         {'比例':'无比例'},
//         {'发售日':'2023-12'},
//         {'材质':'PVC; ABS'}
//     ],
//     store_id:'002',
//     details:[
//         'https://i0.hdslb.com/bfs/mall/mall/c1/b3/c1b3ee8e1fe147cfb8ad054f8a64fa67.jpg@750w_.webp',
//         'https://i0.hdslb.com/bfs/mall/mall/34/01/340101096b3bc9293459105f099a9572.jpg@750w_.webp',
//         'https://i0.hdslb.com/bfs/mall/mall/03/ce/03cefdcc1c1c817b77f15f3d0ed19e84.jpg@750w_.webp',
//         'https://i0.hdslb.com/bfs/mall/mall/d0/2e/d02ed7e9fdcdb01cb58108e2ca750c3a.jpg@750w_.webp',
//         'https://i0.hdslb.com/bfs/mall/mall/78/b2/78b28165c19b84e2326147b850c4ecd9.jpg@750w_.webp'
//     ],
//     num:10
// })

/**
 * ************************************************************************
 * ************************************************************************
 * ************************************************************************
 */
// model.insertMany({
//     goods_id: '002003',
//     goods_type: '手办',
//     img: [
//         'https://huiwan-resource.oss-cn-beijing.aliyuncs.com/goods_img/goods_17/banner/48cc30323fd9a71366a7993e6a35561d.png%40.webp',
//         'https://huiwan-resource.oss-cn-beijing.aliyuncs.com/goods_img/goods_17/banner/86d0818a6052c64d593d4ed7488d076b.png%40.webp',
//         'https://huiwan-resource.oss-cn-beijing.aliyuncs.com/goods_img/goods_17/banner/dd1742353eac03539635e683469c7f2a9f1222b9.png%40.webp',
//         'https://huiwan-resource.oss-cn-beijing.aliyuncs.com/goods_img/goods_17/banner/f099d58ef684d266b85b3ae5ea8e78ba.png%40.webp',
//         'https://huiwan-resource.oss-cn-beijing.aliyuncs.com/goods_img/goods_17/banner/37203ab7ae7851224c09ba9546cccdb8.png%40.webp',
//         'https://huiwan-resource.oss-cn-beijing.aliyuncs.com/goods_img/goods_17/banner/41cbda2eaf95e6d36bd0d211f4bb6695.png%40.webp'
//     ],
//     price: '115',
//     old_price: '125',
//     name: 'FuRyu Trio-Try-iT 五等分的新娘 中野五月 Bunnies ver. 景品手办',
//     want: 0,
//     the_charts_des: '中野五月榜 No.4',
//     params: [
//         { '尺寸': '高约235mm' },
//         { '比例': '无比例' },
//         { '发售日': '2024-01' },
//         {'材质':'PVC; ABS'}
//     ],
//     store_id: '002',
//     details: [
//         'https://huiwan-resource.oss-cn-beijing.aliyuncs.com/goods_img/goods_17/detail/18d6d2331a5c174a25eff2daf81ca3ff.jpg%40750w_.webp',
//         'https://huiwan-resource.oss-cn-beijing.aliyuncs.com/goods_img/goods_17/detail/26f03c516110d0434a6bfd71098b63a8.jpg%40750w_.webp',
//         'https://huiwan-resource.oss-cn-beijing.aliyuncs.com/goods_img/goods_17/detail/8435eb800c7e3a6812200b12845d6aca.jpg%40750w_.webp',
//         'https://huiwan-resource.oss-cn-beijing.aliyuncs.com/goods_img/goods_17/detail/ecc56d4c221d09d74c8d168cf942d4c9.jpg%40750w_.webp',
//         'https://huiwan-resource.oss-cn-beijing.aliyuncs.com/goods_img/goods_17/detail/14e19fd3735409d88aa07886af1f3e52.jpg%40750w_.webp',
//     ],
//     num: 10
// })
