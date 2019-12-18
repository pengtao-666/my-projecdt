var poolextend = require('../utils/poolextend')
var json = require('../utils/json')
const utils = require('../utils/index')
const fs = require('fs')
var publicList = {
  // 检测图片资源
  optimizeImg: async (req, res, next) => {
    let data = await poolextend('SELECT * FROM file_hash')
    let arr = []
    returnImg(res, data, arr, 0)
  }
}
returnImg = async (res, data, arr, i) => {
  let item = await publicAccess(data[i].url)
  arr.push(item)
  i++
  if (i < data.length) {
    returnImg(res, data, arr, i)
  } else {
    json(res, arr, '结果')
  }
}
publicAccess = item => {
  return new Promise((resolve,reject)=>{
    fs.access(item, err => {
      if (err) resolve(err.path)
      resolve()
    })
  })
}

module.exports = publicList
