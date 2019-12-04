// json.js
// 封装接送模块
var json = function (res, result, msg, code = 200) {
  res.json({
    code: code,
    msg: msg,
    data: result
  })
}
module.exports = json
