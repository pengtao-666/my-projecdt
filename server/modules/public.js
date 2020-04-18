var poolextend = require('../utils/poolextend')
var json = require('../utils/json')
const formidable = require('formidable')
const fs = require('fs')

const uploadcos = require('../utils/cos')
var publicList = {
  upload2: async (req, res, next) => {
    let data = await uploadcos.putObj2(req.body)
    json(res, data, '测试')
  },
  // 上传图片
  upload: (req, res, next) => {
    var form = new formidable.IncomingForm()
    var uploadDir = 'public/fileUpload/'
    form.uploadDir = uploadDir
    form.keepExtensions = true // 保留拓展名
    form.maxFieldsSize = 20 * 1024 * 1024 // 上传文件的最大大小
    form.hash = 'md5'
    form.parse(req, async (err, queryData, files) => {
      if (err) return json(res, err, '失败')
      let data = await uploadcos.putObj(queryData, files)
      json(res, data, '测试')
    })
  },
  // 检测图片资源
  optimizeImg: async (req, res, next) => {
    let data = await poolextend('SELECT * FROM file_hash')
    returnImg(res, data, 0)
  }
}
var returnImg = async (res, data, i) => {
  await publicAccess(data[i].url)
  i++
  if (i < data.length) {
    returnImg(res, data, i)
  } else {
    json(res, null, '结果')
  }
}
var publicAccess = item => {
  return new Promise((resolve, reject) => {
    fs.access(item, async err => {
      if (err) {
        await poolextend('DELETE FORM file_hash WHERE url=?', [err.path])
      }
      resolve()
    })
  })
}

module.exports = publicList
