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
  }
}
