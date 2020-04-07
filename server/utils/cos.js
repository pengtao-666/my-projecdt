/*
 * @Date: 2020-04-02 22:40:19
 * @LastEditTime: 2020-04-05 11:08:47
 * @Description: 对象存储
 */
const path = require('path')
const fs = require('fs')
const COS = require('cos-nodejs-sdk-v5')
const cos = new COS({
  SecretId: 'AKIDd4GDuMnUBcqpa7sUKwJTP8csvlNmhpTs', // 替换为你的SecretId
  SecretKey: 'J0SfdOtFOJ2WlkUyCAsLYWEixwf8ML5a' // 替换为你的SecretKey
})

function putObj (queryData, file) {
  queryData.path = queryData.path ? queryData.path : 'other'
  return new Promise((resolve, reject) => {
    // 日期
    const date = new Date().getTime()
    // 路径
    const route = path.join(__dirname).split('/')
    route.pop()
    cos.putObject({
      Bucket: 'my-cos-1257084742',
      Region: 'ap-chengdu',
      Key: `${queryData.path}/${parseTime(date, '{y}-{m}-{d}')}/${file.file.name}`,
      StorageClass: 'STANDARD',
      Body: fs.createReadStream(`${route.join('/')}/${file.file.path}`)
    }, async (err, data) => {
      fs.unlink(file.file.path, err => {
        if (err) console.log('删除临时图片失败')
      })
      if (err) {
        resolve(err, '失败')
      } else {
        resolve(data, '成功')
      }
    })
  })
}
var parseTime = function (time, cFormat) {
  if (!time) return time
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}
exports.putObj = putObj
