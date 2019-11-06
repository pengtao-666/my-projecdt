/* eslint-disable no-undef */
const mysql = require('mysql')
// mysql配置
var db = require('../db/db.js')
const pool = mysql.createPool(db)

// 封装
// eslint-disable-next-line no-undef
query = function (sql, callback) {
  pool.getConnection(function (_err, connection) {
    connection.query(sql, sqlData, function (err, results) {
      callback(err, results)
      connection.release()
    })
  })
}

module.exports = pool
