/*
 * @Date: 2020-03-31 13:12:57
 * @LastEditTime: 2020-04-10 21:36:59
 * @Description: 账单
 */
// 连接池
const poolextend = require('../../utils/poolextend.js')
const json = require('../../utils/json.js')
const utils = require('../../utils/index.js')

const bill = {
  // 获取账单统计
  get_statistics: async (req, res, next) => {
    let sql = `SELECT SUM(number) AS consume FROM bill_list WHERE type=0 AND userId=${req.query.userId} AND DATE_FORMAT(addTime,'%Y-%m') = '${req.query.addTime}'`
    let sql1 = `SELECT SUM(number) AS income FROM bill_list WHERE type=1 AND userId=${req.query.userId} AND DATE_FORMAT(addTime,'%Y-%m') = '${req.query.addTime}'`
    try {
      let [data] = await poolextend(sql)
      let [data1] = await poolextend(sql1)
      if (!data.consume) data.consume = 0
      if (!data1.income) data1.income = 0
      json(res, { consume: data.consume, income: data1.income }, '成功')
    } catch (err) {
      json(res, err, '失败', 201)
    }
  },
  // 获取账单列表
  get_list: async (req, res, next) => {
    let dateRule = ` AND DATE_FORMAT(addTime,'%Y-%m') = '${req.query.addTime}'`
    let userRule = ` WHERE userId=${req.query.userId}`
    let sql = `SELECT id,categoryId,remarks,number,type,DATE_FORMAT(addTime,'%Y-%m-%d') AS date FROM bill_list ${userRule}${dateRule} ORDER BY date DESC`
    let sql1 = `SELECT SUM(number) AS consume FROM bill_list ${userRule}${dateRule} AND type=0  `
    let sql2 = `SELECT SUM(number) AS income FROM bill_list ${userRule}${dateRule} AND type=1`
    let [consume] = await poolextend(sql1)
    let [income] = await poolextend(sql2)
    poolextend(sql).then(data => {
      json(res, { consume: consume.consume, income: income.income, list: data }, '成功')
    })
  },
  // 添加账单
  increase: async (req, res, next) => {
    let data = await poolextend('INSERT INTO bill_list SET ?', req.body)
    if (data.sqlMessage) {
      json(res, data.sqlMessage, '添加失败', 201)
    } else {
      json(res, '', '添加成功')
    }
  }
}

module.exports = bill
