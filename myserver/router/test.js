const express = require('express')
const multer = require('multer')
const router = express.Router()
const fs=require('fs')
// 创建一个存储实例
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 指定存储文件的目标路径
        cb(null, 'upload/test/');
    },
    filename: (req, file, cb) => {
        // 使用原始文件名
        cb(null, file.originalname);
    }
});
// 使用存储实例创建 multer 中间件
const upload = multer({ storage: storage });


router.post('/upload/test', upload.single('file'), (req, res) => {
    const {img_base64,img_name}=req.body
    // 定义路径名
    const pc_name=img_name+'.'+img_base64.split(';')[0].split('/')[1]
    const filepath=`upload/test/${pc_name}`
    //去掉图片base64码前面部分data:image/png;base64
    const base64 = img_base64.replace(/^data:image\/\w+;base64,/, "");
    // base64转图片
    const buffer=new Buffer.from(base64,'base64')
    // 写入文件
    fs.writeFile(filepath,buffer,(err)=>{
        if(err){
            res.send('写入文件夹失败',err)
        }else{
            res.send({code:200,path:'/'+filepath})
        }
    })
})
// ---------------------------------------------- //


module.exports = router