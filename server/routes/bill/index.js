/*
 * @Date: 2020-03-31 13:28:44
 * @LastEditTime: 2020-03-31 14:51:29
 * @Description: 账单
 */
// 引入express 模块
const express = require('express')
const router = express.Router()
const bill = require('../../modules/bill/bill.js')

// 获取列表
router.get('/bill_list', (req, res, next) => {
  bill.get_list(req, res, next)
})
// 添加明细
router.post('/bill_increase', (req, res, next) => {
  bill.increase(req, res, next)
})
module.exports = router
