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
    poolextend('SELECT loginNum FROM user WHERE loginNum=?', [query.loginNum])
      .then(result => {
        if (result.length > 0) {
          json(res, result, '用户名重复')
        } else {
          poolextend('INSERT INTO user(loginNum,password,token) VALUES(?,?,?)', [query.loginNum, query.password, token])
            .then(result => {
              json(res, result, '成功')
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
    poolextend('SELECT loginNum,userName,password,token FROM user WHERE loginNum=? AND password=?', [query.loginNum, query.password])
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
        throw err
      })
  },
  // 用户列表
  userList: (req, res, next) => {
    poolextend('SELECT loginNum,userName,date FROM user')
      .then(result => {
        let msg = '成功'
        json(res, result, msg)
      })
  }
}
module.exports = userData
