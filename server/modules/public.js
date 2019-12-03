var poolextend = require('../utils/poolextend')
var json = require('../utils/json')
const utils = require('../utils/index')

var publicList = {
  // 注册
  register: async (req, res, next) => {
    let query = await utils.format(req)
    poolextend('SELECT loginNum FROM user WHERE loginNum=?', [query.loginNum])
      .then(result => {
        if (result.length > 0) {
          json(res, result, '用户名重复')
        } else {
          poolextend('INSERT INTO user(loginNum,password,token) VALUES(?,?,?)')
            .then(result => {
              json(res, result, '成功')
            })
            .catch(err => {
              json(res, err, '注册失败')
            })
        }
      })
  }
}
module.exports = publicList
