const express = require('express')
const multer = require('multer')
const router = express.Router()
const fs = require('fs')
/**
 * 引入数据库
 */
// 用户表
const userTable = require('../db/store/store.js')
// 商品表
const goodsTable = require('../db/store/goods.js')
// 商家表
const storeTable = require('../db/store/store.js')
// 评论表
const remarkTable = require('../db/remark/index.js')

/** 新增评论接口 */
router.post('/remark/add', (req, res) => {
    const { user_id, store_id, goods_id } = req.headers
    const is_report_num = 0
    const is_delete = false
    if (user_id && store_id && goods_id) {
        const obj = {
            user_id,
            store_id,
            goods_id,
            content: req.body,
            is_report_num,
            is_delete
        }
        remarkTable.insertMany(obj).then(d => {
            res.send({ code: 200, msg: '评论成功' })
        })
    }
})

/** 查询评论接口 */
router.post('/query/remark', (req, res) => {
    const { goods_id } = req.headers
    if (goods_id) {
        remarkTable.find({ goods_id: goods_id }).then(d => {
            // console.log(d);
            res.send({ code: 200, remark: d })
        })
    }
})

/** 存储评论图片接口 */
// 创建一个存储实例
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 指定存储文件的目标路径
        cb(null, 'upload/remark/');
    },
    filename: (req, file, cb) => {
        // 使用原始文件名
        cb(null, file.originalname);
    }
});
// 使用存储实例创建 multer 中间件
const upload = multer({ storage: storage });

// 接口
router.post('/upload/remarkimg', upload.single('file'), (req, res) => {
    const { img_base64, img_name } = req.body
    // 定义路径名
    const pc_name = img_name + '.' + img_base64.split(';')[0].split('/')[1]
    const filepath = `upload/remark/${pc_name}`
    //去掉图片base64码前面部分data:image/png;base64
    const base64 = img_base64.replace(/^data:image\/\w+;base64,/, "");
    // base64转图片
    const buffer = new Buffer.from(base64, 'base64')
    // 写入文件
    fs.writeFile(filepath, buffer, (err) => {
        if (err) {
            res.send('写入文件夹失败', err)
        } else {
            res.send({ code: 200, path: '/' + filepath })
        }
    })
})

/** 评论点赞接口 */
router.post('/remark/like', (req, res) => {
    const { remark_id, user_id } = req.body
    remarkTable.find({ _id: remark_id }).then(d => {
        let content = JSON.parse(JSON.stringify(d[0].content))
        if (content[0].like.every(it => user_id !== it)) {
            content[0].like.push(user_id)
            remarkTable.updateOne({ _id: remark_id }, { $set: { content: content } }).then(d2 => {
                res.send({ code: 200, msg: '点赞成功' })
            })
        }
    })
})
/** 评论取消点赞接口 */
router.post('/remark/cancel/like', (req, res) => {
    const { remark_id, user_id } = req.body
    remarkTable.find({ _id: remark_id }).then(d => {
        let content = JSON.parse(JSON.stringify(d[0].content))
        if (content[0].like.some(it => user_id === it)) {
            content[0].like = content[0].like.filter(it => {
                return it !== user_id
            })
            remarkTable.updateOne({ _id: remark_id }, { $set: { content: content } }).then(d2 => {
                res.send({ code: 200, msg: '取消点赞成功' })
            })
        }
    })
})

/** 回复评论接口 */
router.post('/reply/remark', (req, res) => {
    const { remark_id } = req.headers
    remarkTable.find({ _id: remark_id }).then(d => {
        let replyArr = JSON.parse(JSON.stringify(d[0].reply) || [])
        replyArr.push(req.body)
        remarkTable.updateOne({ _id: remark_id }, { $set: { reply: replyArr } }).then(d1 => {
            res.send({ code: 200, msg: '回复成功' })
        })
    })
})
/** 回复点赞接口 */
router.post('/reply/like', (req, res) => {
    const { remark_id, reply_id, user_id } = req.body
    remarkTable.find({ _id: remark_id }).then(d => {
        let replyArr = JSON.parse(JSON.stringify(d[0].reply))
        replyArr.forEach(it => {
            if (it._id === reply_id) {
                if (it.like.every(i => i !== user_id)) {
                    it.like.push(user_id)
                }
            }
        })
        remarkTable.updateOne({ _id: remark_id }, { $set: { reply: replyArr } }).then(d2 => {
            res.send({ code: 200, msg: '点赞成功' })
            // console.log({ code: 200, msg: '点赞成功' });
        })
    })
})
/** 回复接口取消点赞 */
router.post('/reply/cancel/like', (req, res) => {
    const { remark_id, reply_id, user_id } = req.body
    remarkTable.find({ _id: remark_id }).then(d => {
        let replyArr = JSON.parse(JSON.stringify(d[0].reply))
        replyArr.forEach(it => {
            if (it._id === reply_id) {
                if (it.like.some(i => i === user_id)) {
                    it.like = it.like.filter(item => {
                        return item !== user_id
                    })
                }
            }
        })
        remarkTable.updateOne({ _id: remark_id }, { $set: { reply: replyArr } }).then(d2 => {
            res.send({ code: 200, msg: '取消点赞成功' })
            // console.log({ code: 200, msg: '取消点赞成功' });
        })
    })
})
/** 评论举报接口 */
router.post('/remark/report', (req, res) => {
    const { remark_id } = req.body
    remarkTable.find({ _id: remark_id }).then(d => {
        let report_num = JSON.parse(JSON.stringify(d[0].is_report_num))
        report_num++
        remarkTable.updateOne({ _id: remark_id }, { $set: { is_report_num: report_num } }).then(d2 => {
            res.send({ code: 200, msg: '举报成功' })
        })
    })
})
/** 回复举报接口 */
router.post('/reply/report', (req, res) => {
    const { remark_id, reply_id } = req.body
    remarkTable.find({ _id: remark_id }).then(d => {
        let replyArr = JSON.parse(JSON.stringify(d[0].reply))
        replyArr.forEach(it => {
            if (it._id === reply_id) {
                let report_num = JSON.parse(JSON.stringify(it.is_report_num))
                report_num++
                it.is_report_num = report_num
            }
        })
        remarkTable.updateOne({ _id: remark_id }, { $set: { reply: replyArr } }).then(d2 => {
            res.send({ code: 200, msg: '举报成功' })
        })
    })

})
module.exports = router