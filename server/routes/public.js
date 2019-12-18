const express = require('express')
const router = express.Router()
const public = require('../modules/public')

// 获取分类
router.get('/optimizeImg', (req, res, next) => {
  public.optimizeImg(req, res, next)
})

module.exports = router