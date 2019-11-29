/* eslint-disable no-undef */
const mysql = require('mysql')
// mysql配置
var db = require('../db/db.js')

module.exports = function (sql,sqlData) {
  return new Promise((resolve, reject) => {
    const pool = mysql.createPool(db)
    pool.getConnection(function (_err, connection) {
      connection.query(sql, sqlData, function (err, results) {
        if(err){
          reject(err)
        }else{
          resolve(results)
        }
        connection.release()
      })
    })
  })
}