const express = require('express')
const multer = require('multer')
const fs = require('fs')
const router = express.Router()
// 创建一个存储实例
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 指定存储文件的目标路径
        cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
        // 使用原始文件名
        cb(null, file.originalname);
    }
});
// 使用存储实例创建 multer 中间件
const upload = multer({ storage: storage });


// 头像访问接口
// 返回值为base64
router.get('/upload/userHead/:imageName', (req, res) => {
    if (req.params.imageName) {
        const filePath = `./upload/userHead/${req.params.imageName}`;
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (!err) {
                fs.createReadStream(filePath).pipe(res)
            } else {
                res.statusCode = 404
                res.end('File not found')
            }
        })
    }

})
// 评论图片访问接口
router.get('/upload/remark/:imageName', (req, res) => {
    if (req.params.imageName) {
        const filePath = `./upload/remark/${req.params.imageName}`;
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (!err) {
                fs.createReadStream(filePath).pipe(res)
            } else {
                res.statusCode = 404
                res.end('File not found')
            }
        })
    }
})
// 聊天图片访问接口
router.get('/upload/chat/:imageName', (req, res) => {
    if (req.params.imageName) {
        const filePath = `./upload/chat/${req.params.imageName}`;
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (!err) {
                fs.createReadStream(filePath).pipe(res)
            } else {
                res.statusCode = 404
                res.end('File not found')
            }
        })
    }
})

// ---------------------测试--------------------------- //
// 访问接口
router.get('/upload/test/:imageName', (req, res) => {
    const filePath = `./upload/test/${req.params.imageName}`;
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
            fs.createReadStream(filePath).pipe(res)
        } else {
            res.statusCode = 404
            res.end('File not found')
        }
    })
})

module.exports = router