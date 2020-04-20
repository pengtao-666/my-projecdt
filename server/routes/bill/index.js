/*
 * @Date: 2020-03-31 13:28:44
 * @LastEditTime: 2020-04-20 11:36:28
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
// 获取 收支统计
router.get('/bill_statistics', (req, res, next) => {
  bill.get_statistics(req, res, next)
})
// 添加明细列表
router.post('/bill_increase', (req, res, next) => {
  bill.increase(req, res, next)
})
// 删除明细
router.post('/de_details', (req, res, next) => {
  bill.de_details(req, res, next)
})
// 修改明细
router.post('/up_details', (req, res, next) => {
  bill.up_details(req, res, next)
})
// 获取账单详情
router.get('/get_details', (req, res, next) => {
  bill.get_details(req, res, next)
})
// 获取账单分类列表
router.get('/get_category', (req, res, next) => {
  bill.get_category(req, res, next)
})
// 添加账单分类列表
router.post('/add_category', (req, res, next) => {
  bill.add_category(req, res, next)
})
// 获取账单分类统计
router.get('/get_summary', (req, res, next) => {
  bill.get_summary(req, res, next)
})
module.exports = router
