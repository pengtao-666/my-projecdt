const express = require('express')
const router = express.Router()
const user = require('../modules/user')
// 公共模块
router.use('/public', require('./public'))
// 文章模块
router.use('/article', require('./article'))

// 注册
router.post('/register', (req, res, next) => {
  user.register(req, res, next)
})
// 修改账号
router.post('/updateUser', (req, res, next) => {
  user.updateUser(req, res, next)
})
// 登录
router.post('/login', function (req, res, next) {
  user.login(req, res, next)
})
// 获取用户列表
router.get('/userList', function (req, res, next) {
  user.userList(req, res, next)
})
// 删除账号
router.post('/deleteUser', function (req, res, next) {
  user.delete(req, res, next)
})
module.exports = router
