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
    let q = req.body
    if (!q.userName || !q.password) {
      return json(res, null, '账号密码不能为空', 201)
    }
    let [userInfo] = await poolextend('SELECT userName FROM userList WHERE userName=?', [q.userName])
    if (userInfo) {
      json(res, null, '账号重复', 201)
    } else {
      let uid = await testing()
      let sql = 'INSERT INTO userList(userName,name,password,uid) VALUES(?,?,?,?)'
      q.name = q.name ? q.name : q.userName.length > 4 ? `用户${q.userName.substr(-4)}` : q.userName
      poolextend(sql, [q.userName, q.name, q.password, uid])
        .then(result => {
          json(res, {}, '注册成功')
        })
        .catch(err => {
          json(res, err, '注册失败')
        })
    }
  },
  // 登录
  login: async (req, res, next) => {
    let q = req.body
    let sql = `SELECT userName,status,uid,name,avatarUrl,gender FROM userList WHERE userName=${q.userName} AND password=${q.password}`
    try {
      let [data] = await poolextend(sql)
      if (!data) return json(res, null, '登录名或密码错误', 201)
      json(res, data, '登录成功')
    } catch (err) {
      json(res, err, '登录失败', 201)
    }
  },
  // 更改
  updateUser: async (req, res, next) => {
    let q = req.body
    let sql = ''
    let arr = []
    if (q.password) {
      if (q.password === '') return json(res, {}, '密码不能为空', 201)
      sql = 'UPDATE userList SET name=?,password=? WHERE id=? AND password=?'
      arr = [q.name, q.password, q.id, q.oldPassword]
    } else {
      sql = 'UPDATE userList SET name=? WHERE id=?'
      arr = [q.name, q.id]
    }
    try {
      const data = await poolextend(sql, arr)
      if (data.affectedRows <= 0) return json(res, null, '修改失败,老密码错误或用户不存在', 201)
      json(res, null, '成功')
    } catch (err) {
      json(res, err, '修改失败', 201)
    }
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
function testing () {
  return new Promise((resolve, reject) => {
    let uid = utils.randomId()
    poolextend(`select uid from userList where uid=${uid}`).then(data => {
      if (data.length > 0) {
        testing()
      } else {
        resolve(uid)
      }
    })
  })
}
module.exports = userData
