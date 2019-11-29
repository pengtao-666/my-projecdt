var express = require('express')
var router = express.Router()
var user = require('../modules/handle')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})
router.use('/login', function (req, res, next) {
  user.login(req, res, next)
  // res.render('index', { title: 'Express' })
})
router.get('/userList', function (req, res, next) {
  user.userList(req, res, next)
  // res.render('index', { title: 'Express' })
})
module.exports = router
