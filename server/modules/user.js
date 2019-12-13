// mysql连接池
var poolextend = require('../utils/poolextend')
var json = require('../utils/json')

const utils = require('../utils/index')
const jwt = require('jsonwebtoken')
// 解析 token 用的密钥
const SECRET = 'token_secret'
var userData = {
  // 注册
  register: async (req, res, next) => {
    let query = await utils.format(req)
    let uid = jwt.sign(query, SECRET)
    if (!query.userName) {
      return json(res, null, '账号不能为空', 201)
    }
    let [userInfo] = await poolextend('SELECT userName FROM userList WHERE userName=?', [query.userName])
    if (userInfo) {
      json(res, null, '账号重复', 201)
    } else {
      let sql = 'INSERT INTO userList(userName,name,password,uid) VALUES(?,?,?,?)'
      poolextend(sql, [query.userName, query.name, query.password, uid])
        .then(result => {
          json(res, {}, '成功')
        })
        .catch(err => {
          json(res, err, '注册失败')
        })
    }
  },
  // 登录
  login: async (req, res, next) => {
    let query = await utils.format(req)
    let sql = 'SELECT userName,status,password,uid FROM userList WHERE userName=? AND password=?'
    let sqlArr = [query.userName, query.password]
    try {
      let [data] = await poolextend(sql, sqlArr)
      let msg = '登录成功'
      if (!data) msg = '登录名或密码错误'
      json(res, data, msg)
    } catch (err) {
      json(res, err, '登录失败')
    }
  },
  // 更改
  updateUser: async (req, res, next) => {
    let query = await utils.format(req)
    let sql = ''
    let arr = []
    if (query.password) {
      if (query.password === '') return json(res, {}, '密码不能为空', 201)
      sql = 'UPDATE userList SET name=?,password=? WHERE id=?'
      arr = [query.name, query.password, query.id]
    } else {
      sql = 'UPDATE userList SET name=? WHERE id=?'
      arr = [query.name, query.id]
    }
    poolextend(sql, arr)
      .then(result => {
        json(res, result, '成功')
      })
      .catch(err => {
        json(res, err, '修改失败', 201)
      })
  },
  // 用户列表
  userList: async (req, res, next) => {
    const query = utils.format(req)
    let data = {}
    let sql = 'SELECT id,userName,name,status,createDate FROM userList'
    let where = ''
    if (query.userName) where = ` WHERE userName LIKE '%${query.userName}%'`
    sql += where
    if (query.page) sql += ` LIMIT ${(query.page - 1) * query.pageSize},${query.pageSize}`
    try {
      let [total] = await poolextend(`SELECT COUNT(id) as total FROM userList ${where}`)
      data.list = await poolextend(sql)
      data.total = total.total
      json(res, data, '成功')
    } catch (err) {
      json(res, err, '失败', 201)
    }
  },
  // 删除
  delete: async (req, res, next) => {
    let query = await utils.format(req)
    try {
      let [data] = await poolextend(`SELECT status FROM userList WHERE uid=?`, [query.uid])
      if (data.status !== 1) return json(res, null, '权限不足', 201)
    } catch (err) { return json(res, err, '失败', 201) }
    try {
      await poolextend(`DELETE FROM userList WHERE id in (${query.ids})`)
      json(res, null, '成功')
    } catch (err) { json(res, err, '删除失败') }
  }
}
module.exports = userData
