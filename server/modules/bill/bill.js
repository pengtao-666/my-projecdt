/*
 * @Date: 2020-03-31 13:12:57
 * @LastEditTime: 2020-04-23 15:22:47
 * @Description: 账单
 */
// 连接池
const poolextend = require('../../utils/poolextend.js')
const json = require('../../utils/json.js')
const utils = require('../../utils/index.js')

const bill = {
  // 删除账单
  de_details: async (req, res, next) => {
    if (!req.body.id) return json(res, null, '找不到id', 201)
    const sql = `DELETE FROM bill_list WHERE id=${req.body.id}`
    poolextend(sql).then(data => {
      if (data.affectedRows && data.affectedRows > 1) {
        json(res, null, '删除成功')
      } else {
        json(res, null, '删除失败', 201)
      }
    })
  },
  // 修改账单
  up_details: async (req, res, next) => {
    if (!req.body.id) return json(res, null, '找不到id', 201)
    const sql = `UPDATE bill_list SET ? WHERE id=${req.body.id}`
    poolextend(sql, req.body).then(data => {
      if (data.changedRows) {
        json(res, data, '修改成功')
      } else {
        json(res, null, '修改失败', 201)
      }
    })
  },
  // 获取账单详情
  get_details: async (req, res, next) => {
    if (!req.query.id) return json(res, null, '找不到id', 201)
    const field = `id,DATE_FORMAT(addTime,'%Y-%m-%d') as addTime,categoryId,remarks,number,type`
    const sql = `select ${field} from bill_list where id=${req.query.id}`
    try {
      poolextend(sql).then(data => {
        json(res, { ...data[0] }, '成功')
      })
    } catch (err) {
      json(res, err, '失败', 201)
    }
  },
  // 获取账单分类排行
  get_ranking: async (req, res, next) => {
    let q = req.query
    if (!q.categoryId) q.categoryId = 'null'
    const sql = `SELECT remarks,number,type,categoryId FROM bill_list `
    const where = `WHERE userId=${q.userId} AND categoryId=${q.categoryId} or ${q.categoryId} is null AND type=${q.type} ORDER BY CAST(number AS DECIMAL) DESC `
    poolextend(sql + where).then(data => {
      json(res, data, q.categoryId)
    })
  },
  // 获取账单分类统计
  get_summary: async (req, res, next) => {
    const sql = `SELECT ROUND(SUM(bi.number),2) as data,ca.name FROM bill_list as bi`
    const sql1 = ` LEFT JOIN bill_category AS ca ON bi.categoryId=ca.id `
    const where = `WHERE bi.userId=${req.query.userId} AND bi.type=${req.query.type} GROUP BY bi.categoryId`
    try {
      poolextend(sql + sql1 + where).then(data => {
        json(res, data, '成功')
      })
    } catch (err) {
      json(req, err, '失败', 201)
    }
  },
  // 获取账单分类列表
  get_category: async (req, res, next) => {
    const sql = `SELECT * FROM bill_category WHERE userId=${req.query.userId} OR userId IS NULL`
    try {
      let data = await poolextend(sql)
      json(res, data, '成功')
    } catch (err) {
      json(res, err, '失败', 201)
    }
  },
  // 添加账单分类
  add_category: async (req, res, next) => {
    const sql = `INSERT INTO bill_category SET ?`
    poolextend(sql, req.body).then(data => {
      if (data.sqlMessage) {
        json(res, data.sqlMessage, '添加失败', 201)
      } else {
        json(res, '', '添加成功')
      }
    })
  },
  // 获取账单统计
  get_statistics: async (req, res, next) => {
    const publicSql = `WHERE userId=${req.query.userId} AND DATE_FORMAT(addTime,'%Y-%m') = '${req.query.addTime}'`
    const sql1 = `(SELECT SUM(number) FROM bill_list ${publicSql} AND type=0) AS consume`
    const sql2 = `(SELECT SUM(number) FROM bill_list ${publicSql} AND type=1) AS income`
    const sqlCont = `SELECT ${sql1},${sql2}`
    try {
      let [data] = await poolextend(sqlCont)
      json(res, data, '成功')
    } catch (err) {
      json(res, err, '失败', 201)
    }
  },
  // 获取账单列表
  get_list: async (req, res, next) => {
    // 查询字段
    const queryField = 'id,categoryId,remarks,number,type'
    // 公共条件
    let publicSql = `WHERE userId=${req.query.userId} AND DATE_FORMAT(addTime,'%Y-%m') = '${req.query.addTime}'`
    // 统计
    let sql1 = `(SELECT SUM(number) FROM bill_list ${publicSql} AND type=0) AS consume`
    let sql2 = `(SELECT SUM(number) FROM bill_list ${publicSql} AND type=1) AS income`
    let sqlunion = `SELECT  ${sql1},${sql2}`
    let [amount] = await poolextend(sqlunion)
    // 列表
    let sql = `SELECT ${queryField},DATE_FORMAT(addTime,'%Y-%m-%d') AS date FROM bill_list ${publicSql} ORDER BY date DESC`
    poolextend(sql).then(data => {
      json(res, { consume: amount.consume, income: amount.income, list: data }, '成功')
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
