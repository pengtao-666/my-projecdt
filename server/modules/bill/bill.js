/*
 * @Date: 2020-03-31 13:12:57
 * @LastEditTime: 2020-04-01 23:00:24
 * @Description: 账单
 */
// 连接池
const poolextend = require('../../utils/poolextend.js')
const json = require('../../utils/json.js')
const utils = require('../../utils/index.js')

const bill = {
  get_list: async (req, res, next) => {
    let sql = 'select * from bill_list where userId=?'
    poolextend(sql, req.query).then(data => {
      json(res, data, '')
    })
  },
  increase: async (req, res, next) => {
    let data = await poolextend('INSERT INTO bill_list SET ?', req.body)
    if (data.sqlMessage) {
      json(res, data, '添加失败', 201)
    } else {
      json(res, '', '添加成功')
    }
  }
}

module.exports = bill
