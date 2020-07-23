/*
 * @Date: 2020-03-31 13:12:57
 * @LastEditTime: 2020-07-16 18:04:11
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
    const sql = `DELETE FROM bill_list WHERE id=${req.body.id} AND userId=${req.body.userId}`
    poolextend(sql).then(data => {
      if (data.affectedRows && data.affectedRows >= 1) {
        json(res, null, '删除成功')
      } else {
        json(res, null, '删除失败', 201)
      }
    })
  },
  // 修改账单
  up_details: async (req, res, next) => {
    if (!req.body.id) return json(res, null, '找不到id', 201)
    const sql = `UPDATE bill_list SET ? WHERE id=${req.body.id} AND userId=${req.body.userId}`
    poolextend(sql, req.body).then(data => {
      if (data.changedRows) {
        json(res, null, '修改成功')
      } else {
        json(res, null, '修改失败', 201)
      }
    })
  },
  // 获取账单详情
  get_details: async (req, res, next) => {
    if (!req.query.id) return json(res, null, '找不到id', 201)
    const field = `id,DATE_FORMAT(addTime,'%Y-%m-%d') as addTime,categoryId,remarks,number,type`
    const sql = `select ${field} from bill_list where id=${req.query.id} and userId=${req.query.userId}`
    let [data] = await poolextend(sql)
    if (data) {
      json(res, data, '成功')
    } else {
      json(res, null, '失败', 201)
    }
  },
  // 获取账单分类排行
  get_ranking: async (req, res, next) => {
    let q = req.query
    const sql1 = `SELECT CONVERT(number,DECIMAL(8,2)) as number,remarks,categoryId,id FROM bill_list `
    let where = `WHERE userId=${q.userId} AND DATE_FORMAT(addTime,'%Y-%m') = '${q.addTime}' AND type=${q.type}`
    if (q.categoryId !== 'null') where += ` AND categoryId=${q.categoryId}`
    const sort = ' ORDER BY number DESC'
    const limit = ` LIMIT ${(q.page - 1) * q.pageSize},${q.pageSize}`
    poolextend(sql1 + where + sort + limit)
      .then(data => {
        json(res, data, '成功')
      })
      .catch((err) => {
        console.log('[bill.js] get_ranking:获取账单分类排行', err)
        json(res, null, '失败', 201)
      })
  },
  // 获取账单分类统计
  get_summary: async (req, res, next) => {
    const sql = `SELECT ROUND(SUM(bi.number),2) as data,ca.id,ca.name FROM bill_list as bi`
    const sql1 = ` LEFT JOIN bill_category AS ca ON bi.categoryId=ca.id `
    const where = `WHERE bi.userId=${req.query.userId} AND bi.type=${req.query.type} AND DATE_FORMAT(addTime,'%Y-%m') = '${req.query.addTime}' GROUP BY bi.categoryId`
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
  // 删除账单分类
  del_category: async (req, res, next) => {
    const sql = `DELETE FROM bill_category WHERE id=${req.body.id} AND userId=${req.body.userId}`
    poolextend(sql).then(data => {
      if (data.sqlMessage) {
        json(res, data.sqlMessage, '删除失败', 201)
      } else {
        json(res, null, '删除成功')
      }
    })
  },
  // 获取账单统计
  get_statistics: async (req, res, next) => {
    const where = `WHERE userId=${req.query.userId} AND DATE_FORMAT(addTime,'%Y-%m') = '${req.query.addTime}'`
    const sql1 = `(SELECT SUM(number) FROM bill_list ${where} AND type=0) AS consume`
    const sql2 = `(SELECT SUM(number) FROM bill_list ${where} AND type=1) AS income`
    const sqlCont = `SELECT ${sql1},${sql2}`
    try {
      let [data] = await poolextend(sqlCont)
      json(res, data, '成功')
    } catch (err) {
      json(res, err, '失败', 201)
    }
  },
  // 统计
  Statistics: async (where) => {
    return new Promise(async (resolve) => {
      const sql0 = `(SELECT SUM(number) FROM bill_list ${where}`
      const sql1 = `${sql0} AND type=0) AS consume`
      const sql2 = `${sql0} AND type=1) AS income`
      const sqlunion = `SELECT ${sql1},${sql2},COUNT(*) as total from bill_list ${where}`
      resolve(await poolextend(sqlunion))
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
// 获取账单列表
bill.get_list = async function (req, res, next) {
  const q = req.query
  // 查询字段
  const keys = "id,categoryId,remarks,number,type,DATE_FORMAT(addTime,'%Y-%m-%d') AS date"
  // 公共条件
  const where = `WHERE userId=${q.userId} AND DATE_FORMAT(addTime,'%Y-%m') = '${q.addTime}'`
  // 列表
  let sql = `SELECT ${keys} FROM bill_list ${where} ORDER BY date DESC`
  const limit = ` LIMIT ${(q.page - 1) * q.pageSize},${q.pageSize}`
  Promise.all([this.Statistics(where), poolextend(sql + limit)]).then(data => {
    json(res, { ...data[0][0], list: data[1] }, '成功')
  })
}

module.exports = bill
