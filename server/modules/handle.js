// mysql连接池
var poolextend = require('./poolextend')
var json = require('./json')
const utils=require('../utils/index')
var userData = {
  // 登录
  login:async (req, res, next) => {
    let query=await utils.format(req)
    poolextend('SELECT * FROM user WHERE loginNum=? AND password=?',[query.loginNum, query.password])
    .then(result=>{
      let msg = '成功'
      if (result.length === 1) {
        result = result[0]
      } else if (result.length === 0) {
        msg = '登录名或密码错误'
      }
      json(res, query, msg)
    })
    .catch(err=>{
      throw err
    })
  },
  // 用户列表
  userList: (req, res, next) => {
    poolextend('SELECT * FROM user')
    .then(result=>{
      let msg = '成功'
      json(res, result, msg)
    })
  },
  // 添加用户
  addUser: (req, res, next) => {
    poolextend.query('INSERT INTO user VALUES')
  }
}
module.exports = userData
