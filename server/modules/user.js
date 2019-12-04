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
    let token = jwt.sign(query, SECRET)
    poolextend('SELECT userName FROM userList WHERE userName=?', [query.userName])
      .then(result => {
        if (result.length > 0) {
          json(res, result, '账号重复', 201)
        } else {
          let sql = 'INSERT INTO userList(userName,name,password,uid) VALUES(?,?,?,?)'
          poolextend(sql, [query.userName, query.name, query.password, token])
            .then(result => {
              json(res, {}, '成功')
            })
            .catch(err => {
              json(res, err, '注册失败')
            })
        }
      })
  },
  // 登录
  login: async (req, res, next) => {
    let query = await utils.format(req)
    poolextend('SELECT userName,password,uid FROM userList WHERE userName=? AND password=?', [query.userName, query.password])
      .then(result => {
        let msg = '成功'
        if (result.length === 1) {
          result = result[0]
        } else if (result.length === 0) {
          msg = '登录名或密码错误'
        }
        json(res, result, msg)
      })
      .catch(err => {
        json(res, err, '登录失败')
      })
  },
  // 更改
  updateUser: async (req, res, next) => {
    let query = await utils.format(req)
    let sql = 'UPDATE userList SET name=?,userName=?,password=? WHERE id=?'
    poolextend(sql, [query.name, query.userName, query.password, query.id])
      .then(result => {
        json(res, result, '成功')
      })
  },
  // 用户列表
  userList: (req, res, next) => {
    poolextend('SELECT id,userName,name,password,createDate FROM userList')
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
    json(res, {}, '无删除权限', 201)
    let query = await utils.format(req)
    // poolextend(`DELETE FROM userList WHERE id in (${query.ids})`)
    //   .then(result => {
    //     json(res, result, '成功')
    //   })
    //   .catch(err => {
    //     json(res, err, '删除失败')
    //   })
  }
}
module.exports = userData
