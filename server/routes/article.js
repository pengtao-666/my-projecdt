const express = require('express')
const router = express.Router()
const apiArtcle = require('../modules/article')

// 添加分类
router.post('/add_category', (req, res, next) => {
  apiArtcle.add_category(req, res, next)
})
// 添加子分类
router.post('/add_subclass', (req, res, next) => {
  apiArtcle.add_subclass(req, res, next)
})
// 获取分类
router.get('/get_category', (req, res, next) => {
  apiArtcle.get_category(req, res, next)
})
// 上传图片
router.post('/upload', (req, res, next) => {
  apiArtcle.upload(req, res, next)
})
// 发布文章
router.post('/add_artcle', (req, res, next) => {
  apiArtcle.add_artcle(req, res, next)
})
// 获取文章列表
router.get('/get_artcle', (req, res, next) => {
  apiArtcle.get_artcle(req, res, next)
})
// 获取文章详情
router.get('/get_artcleDetails', (req, res, next) => {
  apiArtcle.get_artcleDetails(req, res, next)
})
// 搜索文章
router.get('/search_artcle', (req, res, next) => {
  apiArtcle.search_artcle(req, res, next)
})
// 删除文章
router.post('/delete_article', (req, res, next) => {
  apiArtcle.delete_article(req, res, next)
})
// 编辑文章
router.post('/update_article', (req, res, next) => {
  apiArtcle.update_article(req, res, next)
})

module.exports = router
