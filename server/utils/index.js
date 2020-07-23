const qs = require('qs')
module.exports = {
  format (req) {
    let query
    switch (req.method) {
      case 'GET':
        query = req.query
        break
      case 'POST':
        query = req.body
        break
    }
    return qs.parse(query)
  },
  format2 (req) {
    switch (req.method) {
      case 'GET':
        req.query = qs.parse(req.query)
        break
      case 'POST':
        req.body = qs.parse(req.body)
        break
    }
    return req
  },
  randomId () {
    let b = new Date().getTime() + ''
    for (let i = 0; i < 4; i++) {
      let a = parseInt(Math.random() * b.length)
      let aa = parseInt(Math.random() * 10)
      b = `${b.substring(0, a)}${aa}${b.substring(a, b.length)}`
    }
    return b
  }
}
