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
    if (query.password != null) {
      if (query.password === '') {
        return json(res, {}, '密码不能为空', 201)
      }
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
  userList: (req, res, next) => {
    poolextend('SELECT id,userName,name,status,createDate FROM userList')
      .then(result => {
        let msg = '成功'
        json(res, result, msg)
      })
      .catch(err => {
        json(res, err, '失败')
      })
  },
  // 删除
  delete: async (req, res, next) => {
    let query = await utils.format(req)
    let [data] = await poolextend('SELECT status FROM userList WHERE uid=?', [query.uid])
    if (data.status !== 1) {
      json(res, {}, '权限不足', 201)
      return
    }
    poolextend(`DELETE FROM userList WHERE id in (${query.ids})`)
      .then(result => {
        json(res, result, '成功')
      })
      .catch(err => {
        json(res, err, '删除失败')
      })
  }
}
module.exports = userData
