var poolextend = require('../utils/poolextend')
var json = require('../utils/json')
const utils = require('../utils/index')
const fs = require('fs')
var publicList = {
  // 检测图片资源
  optimizeImg: async (req, res, next) => {
    let data = await poolextend('SELECT * FROM file_hash')
    returnImg(res, data, 0)
  }
}
returnImg = async (res, data, i) => {
  await publicAccess(data[i].url)
  i++
  if (i < data.length) {
    returnImg(res, data, i)
  } else {
    json(res, null, '结果')
  }
}
publicAccess = item => {
  return new Promise((resolve,reject)=>{
    fs.access(item, async err => {
      if (err) {
        await poolextend(`DELETE FORM file_hash WHERE url='${err.path}'`)
      }
      resolve()
    })
  })
}

module.exports = publicList
