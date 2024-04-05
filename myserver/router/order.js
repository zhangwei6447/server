const express = require('express')
const router = express.Router()
/**
 * 引入数据库
 */
const orderTable = require('../db/order/index')
const orederStandardTable = require('../db/order/order_id')
// 存储待执行订单失效函数的队列
const taskQueue = [];

// 创建订单接口
router.post('/order/add', (req, res) => {
    const { user_id, goods_id, store_id, order_status, goods_num, goods_price, receiving_address } = req.body
    if (!user_id || !goods_id || !store_id) return
    /** 创建订单编号 */
    let order_id = generateRandomNumber()
    do {
        order_id = generateRandomNumber()
    } while (queryOrderId(order_id))
    let obj = {
        user_id,
        goods_id,
        store_id,
        order_id: order_id,
        order_status,
        goods_num,
        goods_price,
        receiving_address,
        create_time: Date.now(),
        is_delivered: false
    }
    orederStandardTable.insertMany({ order_id }).then(d1 => { })
    orderTable.insertMany(obj).then(d => {
        res.send({ code: 200, msg: '创建订单成功' })
    })
    // 订单待支付失效
    if (order_status === '待支付') {
        const task = {
            functionToExecute: orderLose,
            timestamp: new Date().getTime(),
            order_id: order_id,
        };
        taskQueue.push(task);
    }
})

// 订单修改接口
router.post('/order/update', (req, res) => {
    const { receiving_address, order_id } = req.body
    if (!receiving_address || !order_id) return
    orderTable.updateOne({ order_id }, {
        $set: {
            order_status: '已支付',
            receiving_address
        }
    }).then(d => {
        res.send({ code: 200, msg: '订单更新成功' })
    })

})

// 取消订单接口
router.post('/order/cancel', (req, res) => {
    const { order_id } = req.body
    if (!order_id) return
    orderTable.updateOne({ order_id }, { $set: { order_status: '订单已失效' } }).then(d => {
        res.send({ code: 200, msg: '订单已取消' })
    })
})

// 订单支付接口
router.post('/order/pay', (req, res) => {
    const { order_id } = req.body
    if (!order_id) return
    orderTable.updateOne({ order_id }, { $set: { order_status: '已支付' } }).then(d => {
        res.send({ code: 200, msg: '支付成功' })
    })
})

// 订单确认收货接口
router.post('/order/receiving/goods', (req, res) => {
    const { order_id } = req.body
    if (!order_id) return
    orderTable.find({ order_id }).then(data => {
        if (data[0].is_delivered) {
            orderTable.updateOne({ order_id }, { $set: { order_status: '已收货' } }).then(d => {
                res.send({ code: 200, msg: '已收货' })
            })
        } else {
            res.send({ code: 200, msg: '商品还未送达' })
        }
    })
})

// 查询订单接口
router.post('/order/query', (req, res) => {
    const { user_id } = req.body
    if (!user_id) return
    orderTable.find({ user_id }).then(d => {
        res.send({ code: 200, data: d })
    })
})

/** --------------------------------------------方法--------------------------------------------------- */
/** 定时检查任务队列并执行过期的任务 */
setInterval(() => {
    for (let i = 0; i < taskQueue.length; i++) {
        const task = taskQueue[i];
        if (new Date().getTime() - task.timestamp >= 24 * 60 * 60 * 1000) {
            task.functionToExecute(task.order_id);
            taskQueue.splice(i, 1);
        }
        // if (new Date().getTime() - task.timestamp >= 30000) {
        //     task.functionToExecute(task.order_id);
        //     taskQueue.splice(i, 1);
        // }
    }
}, 1000);

/** 订单失效函数 */
function orderLose(order_id) {
    if (!order_id) return
    orderTable.find({ order_id }).then(d => {
        if (d[0].order_status === '待支付') {
            orderTable.updateOne({ order_id }, { $set: { order_status: '订单已失效' } }).then(d1 => { console.log(`订单${order_id}失效`); })
        }
    })

}

/** 判断订单号是否存在 */
function queryOrderId(order_id) {
    orederStandardTable.find().then(d => {
        if (d.length) {
            return d.some(it => it.order_id === order_id)
        }
    })
}

/** 生成订单编号函数 */
function generateRandomNumber() {
    let result = '';
    for (let i = 0; i < 16; i++) {
        // 使用 Math.random() 生成 0 到 1 之间的随机数，并将其转换为 0 到 9 的数字
        result += Math.floor(Math.random() * 10).toString();
    }
    return result;
}
module.exports = router