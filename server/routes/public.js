const express = require('express')
const router = express.Router()
const publics = require('../modules/public')

// 获取分类
router.get('/optimizeImg', (req, res, next) => {
  publics.optimizeImg(req, res, next)
})
// 上传文件
router.post('/upload', (req, res, next) => {
  publics.upload(req, res, next)
})
// 上传文件
router.post('/upload2', (req, res, next) => {
  publics.upload2(req, res, next)
})
module.exports = router
