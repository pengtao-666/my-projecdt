/* eslint-disable no-undef */
const mysql = require('mysql')
// mysql配置.
const db = require('../db/db.js')
const pool = mysql.createPool(db)
module.exports = function (sql, params) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (_err, connection) {
      if (_err) return reject(_err)
      connection.query(sql, params, function (err, results) {
        connection.release()
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  })
}
