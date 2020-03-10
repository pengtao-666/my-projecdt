const express = require('express')
const router = express.Router()
const publics = require('../modules/public')

// 获取分类
router.get('/optimizeImg', (req, res, next) => {
  publics.optimizeImg(req, res, next)
})

module.exports = router
