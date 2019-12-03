// json.js
// 封装接送模块
var json = function (res, result, msg) {
  res.json({
    code: 200,
    msg: msg,
    data: result
  })
}
module.exports = json
