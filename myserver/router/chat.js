const express = require('express')
const multer = require('multer')
const fs = require('fs')
const router = express.Router()

/**
 * 引入数据库
 */
const chatsTable = require('../db/chat/index.js')
const storeTable = require('../db/store/store.js')

/**
 * 新增聊天接口
 */
router.post('/chat/add', (req, res) => {
    const { user_id, store_id } = req.body
    if (!user_id || !store_id) return
    chatsTable.find({ chat_users: [user_id, store_id] || [store_id, user_id] }).then(data => {
        if (!data.length) {
            let obj = {
                chat_users: [user_id, store_id],
            }
            chatsTable.insertMany(obj).then(d => {
                res.send({ code: 200, msg: '新增聊天成功' })
            })
        } else {
            const { date, text, img, send_user_id } = req.body
            if (!date || !(text || img) || !send_user_id) return
            let con = {
                date: date || '',
                text: text || '',
                img: img || '',
                send_user_id: send_user_id || ''
            }
            let lastmessage = text || '[图片]'
            chatsTable.find({ chat_users: [user_id, store_id] || [store_id, user_id] }).then(d => {
                let content = JSON.parse(JSON.stringify(d[0].content))
                content.push(con)
                chatsTable.updateOne({ chat_users: [user_id, store_id] || [store_id, user_id] }, { $set: { last_message: lastmessage, last_time: date, content } }).then(d1 => {
                    res.send({ code: 200, msg: '新增聊天消息' })
                })
            })
            chatsTable.updateOne()
        }
    })
})

/**
 * 查询和所有商家的聊天
 */
router.get('/chat/query/all', (req, res) => {
    const { user_id } = req.query
    if (!user_id) return
    chatsTable.find().then(data => {
        let d = data.filter(it => {
            return it.chat_users.includes(user_id)
        })
        res.send({ code: 200, data: d })
    })
})

/**
 * 查询和单个商家的聊天
 */
router.get('/chat/query', (req, res) => {
    const { user_id, store_id } = req.query
    if (!user_id || !store_id) return
    chatsTable.find({ chat_users: [user_id, store_id] || [store_id, user_id] }).then(data => {
        res.send({ code: 200, data: data[0] })
    })
})

/**
 * 清空聊天接口
 */
router.post('/chat/clear', (req, res) => {
    const { user_id, store_id } = req.body
    if (!user_id || !store_id) return
    chatsTable.updateOne({ chat_users: [user_id, store_id] || [store_id, user_id] }, { $set: { content: [] } }).then(d => {
        res.send({ code: 200, msg: '清除聊天成功' })
    })
})


/**-----------------上传图片------------------------ */
/** 存储评论图片接口 */
// 创建一个存储实例
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 指定存储文件的目标路径
        cb(null, 'upload/chat/');
    },
    filename: (req, file, cb) => {
        // 使用原始文件名
        cb(null, file.originalname);
    }
});
// 使用存储实例创建 multer 中间件
const upload = multer({ storage: storage });
// 接口
router.post('/upload/chat', upload.single('file'), (req, res) => {
    const { img_base64, img_name } = req.body
    // 定义路径名
    const pc_name = img_name + '.' + img_base64.split(';')[0].split('/')[1]
    const filepath = `upload/chat/${pc_name}`
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
module.exports = router