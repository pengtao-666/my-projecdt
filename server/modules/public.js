var poolextend = require('../utils/poolextend')
var json = require('../utils/json')
const utils = require('../utils/index')

var publicList = {
  // 删除
  delete: async (req, res, next) => {
    let query = await utils.format(req)
    poolextend('DELETE FROM user WHERE id in (?)', [query.ids])
      .then(result => {
        json(res, result, '用户名重复')
      })
  }
}
module.exports = publicList
