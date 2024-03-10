// 引入
const express=require('express')
const cors=require('cors')
// ------------------------------- //
// 定义-方便使用
const app = express()
// ------------------------------- //

/**
 * 导入接口
 */

// ================================ //
// 用户接口
const usersRouter=require('./router/users.js')
// 商家接口
const storeRouter=require('./router/store.js')
// 购物车接口
const cartRouter=require('./router/cart.js')
// 商品接口
const goodsRouter=require('./router/goods.js')
// ================================ //


// 监听接口
app.listen(8888,()=>{
    console.log(`
        服务器启动成功！
        地址为：http://localhost:8888
    `);
})
// 配置跨域
app.use(cors())
// post请求参数
app.use(express.urlencoded())

/**
 * 挂载接口
 */
// ================================ //
app.use(usersRouter)
app.use(storeRouter)
app.use(cartRouter)
app.use(goodsRouter)
// ================================ //