var express = require('express')
var router = express.Router()
var user = require('../modules/user')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})
router.post('/register', (req, res, next) => {
  user.register(req, res, next)
})
router.use('/login', function (req, res, next) {
  user.login(req, res, next)
})
router.get('/userList', function (req, res, next) {
  user.userList(req, res, next)
})
module.exports = router
