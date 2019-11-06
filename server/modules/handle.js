// mysql连接池
var poolextend = require('./poolextend')
var json = require('./json')
var userData = {
  login: (req, res, next) => {
    poolextend.query('SELECT * FROM user WHERE loginNum=? AND password=? ', [req.body.loginNum, req.body.password], function (err, result) {
      if (err) throw err
      let msg = '成功'
      if (result.length === 1) {
        result = result[0]
      } else if (result.length === 0) {
        msg = '登录名或密码错误'
      }
      json(res, result, msg)
    })
  }
}
module.exports = userData
