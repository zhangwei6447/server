/**
 * 连接mongdb数据库
 */
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/huiwan').then(() => {
    console.log('*********************************************');
    console.log('mainTypes连接成功');
    console.log('*********************************************');
})
/**
 * 定义表结构
 */
// 首页分类表
const itemSchema=new mongoose.Schema({
    img:{
        type:String,
        required:true
    },
    txt:{
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true
    }
})
const mainTypes = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    items:[itemSchema]
})

/**
 * 创建表模型
 */
const model = mongoose.model('mainTypes', mainTypes)
module.exports = model

// model.insertMany([{
//     "title": "手办雕像",
//     "items": [
//         {
//           "img": "https://i0.hdslb.com/bfs/mall/mall/44/9d/449d140b7ccc7c19e0d27998a5017629.png@.jpg",
//           "txt": "景品",
//           "path": "/images/449d140b7ccc7c19e0d27998a5017629.png@.jpg"
//         },
//         {
//           "img": "https://i0.hdslb.com/bfs/mall/mall/c6/7c/c67c67d5207730fb0055473ef636a8df.png@.jpg",
//           "txt": "比例手办",
//           "path": "/images/c67c67d5207730fb0055473ef636a8df.png@.jpg"
//         },
//         {
//           "img": "https://i0.hdslb.com/bfs/mall/mall/72/e6/72e6309e4dbdfb8ed6b2257f0ad2ee33.png@.jpg",
//           "txt": "Q版手办",
//           "path": "/images/72e6309e4dbdfb8ed6b2257f0ad2ee33.png@.jpg"
//         },
//         {
//           "img": "https://i0.hdslb.com/bfs/mall/mall/60/58/60589878cf7c9d1a2556e252a4436108.png@.jpg",
//           "txt": "可动手办",
//           "path": "/images/60589878cf7c9d1a2556e252a4436108.png@.jpg"
//         },
//         {
//           "img": "https://i0.hdslb.com/bfs/mall/mall/93/da/93da12e8407ac295dc526ebf385905dd.png@.jpg",
//           "txt": "盒蛋",
//           "path": "/images/93da12e8407ac295dc526ebf385905dd.png@.jpg"
//         },
//         {
//           "img": "https://i0.hdslb.com/bfs/mall/mall/0f/50/0f50481b132d21bf215b42d3b4a61d1b.png@.jpg",
//           "txt": "雕像",
//           "path": "/images/0f50481b132d21bf215b42d3b4a61d1b.png@.jpg"
//         },
//         {
//           "img": "https://i0.hdslb.com/bfs/mall/mall/be/be/bebe865d5598e1fa0ee018e21921d743.png@.jpg",
//           "txt": "手办配件",
//           "path": "/images/bebe865d5598e1fa0ee018e21921d743.png@.jpg"
//         }
//       ]
//   },
//   {
//     "title": "周边",
//     "items": [
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/ca/df/cadf9cfc847cde1ad50486fb2763cb2c.png@.jpg",
//         "txt": "谷子",
//         "path": "/images/cadf9cfc847cde1ad50486fb2763cb2c.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/d8/b3/d8b33ca373f5d0c717f675aa24abbc38.png@.jpg",
//         "txt": "日用品",
//         "path": "/images/d8b33ca373f5d0c717f675aa24abbc38.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/22/ef/22eff3706d37f4e795431ebdd2dcb00d.png@.jpg",
//         "txt": "服饰鞋包",
//         "path": "/images/22eff3706d37f4e795431ebdd2dcb00d.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/0a/ba/0aba2dea0606cde3488eb93192451ed2.png@.jpg",
//         "txt": "文创文具",
//         "path": "/images/0aba2dea0606cde3488eb93192451ed2.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/9d/ab/9dab5264bf61e82e0ec3a908d11af213.png@.jpg",
//         "txt": "扭蛋",
//         "path": "/images/9dab5264bf61e82e0ec3a908d11af213.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/36/af/36afb3e61e00bd20042a75b2aafe66e5.png@.jpg",
//         "txt": "其他",
//         "path": "/images/36afb3e61e00bd20042a75b2aafe66e5.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/36/73/36736cd77b20cc7d1af37c223fa96dbb.png@.jpg",
//         "txt": "棉花娃娃",
//         "path": "/images/36736cd77b20cc7d1af37c223fa96dbb.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/1a/49/1a49dae1d6d3cbbf98175d3c7baadc5c.png@.jpg",
//         "txt": "BJD娃娃",
//         "path": "/images/1a49dae1d6d3cbbf98175d3c7baadc5c.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/d4/09/d4097f16a661105be9984e8b99a13858.png@.jpg",
//         "txt": "毛绒玩偶",
//         "path": "/images/d4097f16a661105be9984e8b99a13858.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/56/1f/561f0a7281417a482980e79635ba9609.png@.jpg",
//         "txt": "3c数码",
//         "path": "/images/561f0a7281417a482980e79635ba9609.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/03/7f/037fc720cfe1c032fc0f403f457acb2a.png@.jpg",
//         "txt": "键盘鼠标",
//         "path": "/images/037fc720cfe1c032fc0f403f457acb2a.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/77/ae/77ae91d40f9d6b53953958c6f9839e21.png@.jpg",
//         "txt": "耳机",
//         "path": "/images/77ae91d40f9d6b53953958c6f9839e21.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/11/e8/11e8b97b14060c482ea721b42f230406.png@.jpg",
//         "txt": "痛包",
//         "path": "/images/11e8b97b14060c482ea721b42f230406.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/08/44/0844b166d3574465dd9f8e5eb48c4c17.png@.jpg",
//         "txt": "食品",
//         "path": "/images/0844b166d3574465dd9f8e5eb48c4c17.png@.jpg"
//       }
//     ]
//   },
//   {
//     "title": "模型兵人",
//     "items": [
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/1c/a4/1ca44cc96a46afb3515f1e67a387ac3a.png@.jpg",
//         "txt": "模型",
//         "path": "/images/1ca44cc96a46afb3515f1e67a387ac3a.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/f6/4b/f64b760a7b637f842f31670ce42f8132.png@.jpg",
//         "txt": "兵人",
//         "path": "/images/f64b760a7b637f842f31670ce42f8132.png@.jpg"
//       }
//     ]
//   },
//   {
//     "title": "图书漫画",
//     "items": [
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/86/8e/868e05f1db3b3a1c91a408a8a57bc41e.png@.jpg",
//         "txt": "漫画",
//         "path": "/images/868e05f1db3b3a1c91a408a8a57bc41e.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/7b/d9/7bd9aa46782dd7cca6c63c794b1c4685.png@.jpg",
//         "txt": "画集",
//         "path": "/images/7bd9aa46782dd7cca6c63c794b1c4685.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/21/6d/216d5286be90a3b2f68bad80b22b88b8.png@.jpg",
//         "txt": "CD唱片",
//         "path": "/images/216d5286be90a3b2f68bad80b22b88b8.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/8a/f0/8af06b48d47310aba61aa543a6026542.png@.jpg",
//         "txt": "轻小说",
//         "path": "/images/8af06b48d47310aba61aa543a6026542.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/de/aa/deaa4010fea437b576e0bd18aca7acfe.png@.jpg",
//         "txt": "其他出版物",
//         "path": "/images/deaa4010fea437b576e0bd18aca7acfe.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/0c/c3/0cc316f991627586c63b81f1e622e4b4.jpg@.jpg",
//         "txt": "写真集",
//         "path": "/images/0cc316f991627586c63b81f1e622e4b4.jpg@.jpg"
//       }
//     ]
//   },
//   {
//     "title": "卡牌",
//     "items": [
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/93/c9/93c9bbc8db9f88f90a6a659579dde86e.png@.jpg",
//         "txt": "卡牌",
//         "path": "/images/93c9bbc8db9f88f90a6a659579dde86e.png@.jpg"
//       }
//     ]
//   },
//   {
//     "title": "潮玩潮物",
//     "items": [
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/d6/94/d69451b5be29a7277d0fc947bebf86ad.png@.jpg",
//         "txt": "潮玩",
//         "path": "/images/d69451b5be29a7277d0fc947bebf86ad.png@.jpg"
//       }
//     ]
//   },
//   {
//     "title": "漫展",
//     "items": [
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/0e/a8/0ea865a702506fddb223329b91f948d4.jpg@.jpg",
//         "txt": "展览",
//         "path": "/images/0ea865a702506fddb223329b91f948d4.jpg@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/72/61/7261e629d80982d9aa5a20d74c523409.jpg@.jpg",
//         "txt": "演出",
//         "path": "/images/7261e629d80982d9aa5a20d74c523409.jpg@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/0f/e4/0fe40da42745f5bc8179e9cacf7440ec.jpg@.jpg",
//         "txt": "本地生活",
//         "path": "/images/0fe40da42745f5bc8179e9cacf7440ec.jpg@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/4e/72/4e72e0ec04b314979c2281fd45727722.jpg@.jpg",
//         "txt": "电影",
//         "path": "/images/4e72e0ec04b314979c2281fd45727722.jpg@.jpg"
//       }
//     ]
//   },
//   {
//     "title": "盲盒",
//     "items": [
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/d6/08/d608d2cedfb4551279023a51d56db7f6.jpg@.jpg",
//         "txt": "盲盒",
//         "path": "/images/d608d2cedfb4551279023a51d56db7f6.jpg@.jpg"
//       }
//     ]
//   },
//   {
//     "title": "赏赏赏",
//     "items": [
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/40/90/4090160db901cb8487b3b89c30954642.png@.jpg",
//         "txt": "磁力赏",
//         "path": "/images/4090160db901cb8487b3b89c30954642.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/53/79/53795c707680e086c17587e3ef6450f1.png@.jpg",
//         "txt": "一番赏",
//         "path": "/images/53795c707680e086c17587e3ef6450f1.png@.jpg"
//       }
//     ]
//   },
//   {
//     "title": "众筹",
//     "items": [
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/8e/ef/8eef8b5a7b26be4f3ee391ebd321e11d.png@.jpg",
//         "txt": "众筹",
//         "path": "/images/8eef8b5a7b26be4f3ee391ebd321e11d.png@.jpg"
//       }
//     ]
//   },
//   {
//     "title": "装机助手",
//     "items": [
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/83/e6/83e66ad76c9d949c33fec1b67adbe874.png@.jpg",
//         "txt": "装机助手",
//         "path": "/images/83e66ad76c9d949c33fec1b67adbe874.png@.jpg"
//       }
//     ]
//   },
//   {
//     "title": "原创商品",
//     "items": [
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/18/ea/18ea24e69c0a741b87daaabd0a213e2b.png@.jpg",
//         "txt": "绘画约稿",
//         "path": "/images/18ea24e69c0a741b87daaabd0a213e2b.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/23/a8/23a8f051986c513bb9af041bc3f43240.png@.jpg",
//         "txt": "创意手工",
//         "path": "/images/23a8f051986c513bb9af041bc3f43240.png@.jpg"
//       }
//     ]
//   },
//   {
//     "title": "IP",
//     "items": [
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/ee/ff/eeff598e326413c1f8dd2223405b65f0.png@.jpg",
//         "txt": "Fate系列",
//         "path": "/images/eeff598e326413c1f8dd2223405b65f0.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/3b/50/3b50389d457828496f7f6048666884c4.png@.jpg",
//         "txt": "VOCALOID",
//         "path": "/images/3b50389d457828496f7f6048666884c4.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/d6/39/d639985105293b9eb1642231aed85c6c.png@.jpg",
//         "txt": "Re:从零开始的异世界生活",
//         "path": "/images/d639985105293b9eb1642231aed85c6c.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/19/79/1979d9daa4f708c925d47d65e7b78845.png@.jpg",
//         "txt": "明日方舟",
//         "path": "/images/1979d9daa4f708c925d47d65e7b78845.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/77/d0/77d03421903375fcbe0c3aa6649149cc.png@.jpg",
//         "txt": "鬼灭之刃",
//         "path": "/images/77d03421903375fcbe0c3aa6649149cc.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/c3/50/c3504a36f3a373455678870b439c7e53.png@.jpg",
//         "txt": "路人女主的养成方法",
//         "path": "/images/c3504a36f3a373455678870b439c7e53.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/b6/b0/b6b0a138ca4486506c477c29b8246d53.jpg@.jpg",
//         "txt": "假面骑士",
//         "path": "/images/b6b0a138ca4486506c477c29b8246d53.jpg@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/test/mall/84/f3/84f39e74db9b3235e44773123bea5440.jpg@.jpg",
//         "txt": "哔哩哔哩",
//         "path": "/images/84f39e74db9b3235e44773123bea5440.jpg@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/d1/72/d1729fc09e5817aec56d2f8590c2fff2.jpg@.jpg",
//         "txt": "海贼王",
//         "path": "/images/d1729fc09e5817aec56d2f8590c2fff2.jpg@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/09/90/09909980ddabcb8960e10e8fde943683.png@.jpg",
//         "txt": "刀剑神域",
//         "path": "/images/09909980ddabcb8960e10e8fde943683.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/58/3a/583a31093b98a3ee8a21fa99e14c01a7.jpg@.jpg",
//         "txt": "碧蓝航线",
//         "path": "/images/583a31093b98a3ee8a21fa99e14c01a7.jpg@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/87/cf/87cfd3f9b89102a56b1ae15a140d2c0e.png@.jpg",
//         "txt": "高达系列",
//         "path": "/images/87cfd3f9b89102a56b1ae15a140d2c0e.png@.jpg"
//       }
//     ]
//   },
//   {
//     "title": "品牌",
//     "items": [
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/9a/81/9a81c4e31712f7231a71cc5faa316b46.png@.jpg",
//         "txt": "哔哩哔哩",
//         "path": "/images/9a81c4e31712f7231a71cc5faa316b46.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/test/mall/f1/81/f18112ac0513b7e2f308de4cc8a2fb54.jpg@.jpg",
//         "txt": "GSC",
//         "path": "/images/f18112ac0513b7e2f308de4cc8a2fb54.jpg@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/mall/mall/de/73/de73291c26f1ef9bfe1bd7770953c82f.png@.jpg",
//         "txt": "万代",
//         "path": "/images/de73291c26f1ef9bfe1bd7770953c82f.png@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/test/mall/e6/d6/e6d6c696f400de15a4783a6a7afb06de.jpg@.jpg",
//         "txt": "Max Factory",
//         "path": "/images/e6d6c696f400de15a4783a6a7afb06de.jpg@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/test/mall/7b/c2/7bc2fa8f7aeff4b6b7b9a8d248a8be4a.jpg@.jpg",
//         "txt": "ALTER",
//         "path": "/images/7bc2fa8f7aeff4b6b7b9a8d248a8be4a.jpg@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/test/mall/3e/82/3e828d697d7379f22539e834fb7a5b0a.jpg@.jpg",
//         "txt": "Phat!",
//         "path": "/images/3e828d697d7379f22539e834fb7a5b0a.jpg@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/test/mall/f1/a2/f1a23df19f34a376731b8101e9af9677.jpg@.jpg",
//         "txt": "ANIPLEX+",
//         "path": "/images/f1a23df19f34a376731b8101e9af9677.jpg@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/test/mall/06/f4/06f43704c9bf88d27450eee039110574.jpg@.jpg",
//         "txt": "FREEing",
//         "path": "/images/06f43704c9bf88d27450eee039110574.jpg@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/test/mall/d5/fa/d5fae961dd5b03464b3d79e043b595cb.jpg@.jpg",
//         "txt": "Orange Rouge",
//         "path": "/images/d5fae961dd5b03464b3d79e043b595cb.jpg@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/test/mall/1c/2e/1c2e113dced44a570e45cf788a317128.jpg@.jpg",
//         "txt": "Stronger",
//         "path": "/images/1c2e113dced44a570e45cf788a317128.jpg@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/test/mall/17/f4/17f4ffc247b32443f4168602d8e78d46.jpg@.jpg",
//         "txt": "SQUARE-ENIX",
//         "path": "/images/17f4ffc247b32443f4168602d8e78d46.jpg@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/test/mall/fa/13/fa137fcb5ccca0ffe4f7caf5ad78d23b.jpg@.jpg",
//         "txt": "角川",
//         "path": "/images/fa137fcb5ccca0ffe4f7caf5ad78d23b.jpg@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/test/mall/cc/6c/cc6cbcc3c987ea01bf1ea1ea9a58d0c2.jpg@.jpg",
//         "txt": "Hobbymax",
//         "path": "/images/cc6cbcc3c987ea01bf1ea1ea9a58d0c2.jpg@.jpg"
//       },
//       {
//         "img": "https://i0.hdslb.com/bfs/test/mall/80/4e/804e876a607f392a4d5f021a02571944.jpg@.jpg",
//         "txt": "Chara-ani",
//         "path": "/images/804e876a607f392a4d5f021a02571944.jpg@.jpg"
//       }
//     ]
//   }])