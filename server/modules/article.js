const poolextend = require('../utils/poolextend')
const json = require('../utils/json')
const utils = require('../utils/index')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
var apiArtcle = {
  add_category: async (req, res, next) => {
    const query = await utils.format(req)
    let [repeat] = await poolextend('SELECT categoryName FROM article_category WHERE categoryName=?', [query.categoryName])
    if (repeat) return json(res, repeat, '分类重复', 201)
    try {
      const sql = 'INSERT INTO article_category (categoryName) VALUES(?)'
      await poolextend(sql, [query.categoryName])
      json(res, null, '添加成功')
    } catch (err) {
      json(res, err.sqlMessage, '错误')
    }
  },
  add_subclass: async (req, res, next) => {
    const query = await utils.format(req)
    if (!query.subclassName) return json(res, null, '分类不能为空', 201)
    let [repeat] = await poolextend('SELECT subclassName FROM article_subclass WHERE subclassName=? AND categoryId=?', [query.subclassName, query.categoryId])
    if (repeat) return json(res, repeat, '标签重复', 201)
    try {
      const sql = 'INSERT INTO article_subclass (categoryId,subclassName) VALUES(?,?)'
      await poolextend(sql, [query.categoryId, query.subclassName])
      json(res, null, '添加成功')
    } catch (err) {
      json(res, err.sqlMessage, '错误')
    }
  },
  get_category: async (req, res, next) => {
    const query = await utils.format(req)
    let sql = 'SELECT * FROM article_category'
    if (Number(query.type) !== 0 && Number(query.categoryId) !== 0) {
      sql = 'SELECT * FROM article_subclass WHERE categoryId=?'
    } else if (Number(query.categoryId) === 0) {
      sql = 'SELECT * FROM article_subclass'
    }
    try {
      let data = await poolextend(sql, [query.categoryId])
      json(res, data, '成功')
    } catch (err) {
      json(res, err, '失败', 201)
    }
  },
  upload: async (req, res, next) => {
    var form = new formidable.IncomingForm()
    var uploadDir = 'public/fileUpload/'
    form.uploadDir = uploadDir
    form.keepExtensions = true // 保留拓展名
    form.maxFieldsSize = 20 * 1024 * 1024 // 上传文件的最大大小
    form.hash = 'md5'
    form.parse(req, async (err, fields, files) => {
      if (err) return json(req, err, '错误')
      let [fileStatus] = await poolextend('SELECT url FROM file_hash WHERE hash=?', [files.file.hash])
      if (fileStatus) {
        json(res, fileStatus.url, '成功')
        fs.unlink(files.file.path, err => {
          if (err) console.log('失败')
        })
      } else {
        await poolextend('INSERT INTO file_hash(hash,url) VALUES(?,?)', [files.file.hash, files.file.path])
        json(res, files.file.path, '成功')
      }
      // json(res, { hash: '6ae2beef9a6eacb038023d58eb6fd9e2', files }, '成功')
    })
  },
  add_artcle: async (req, res, next) => {
    const q = await utils.format(req)
    try {
      const sql = 'INSERT INTO article_cont (title,author,createDate,content,src,subclassId,categoryId) VALUES(?,?,?,?,?,?,?)'
      await poolextend(sql, [q.title, q.author, q.createDate, q.content, q.src, q.subclassId, q.categoryId])
      json(res, null, '添加成功')
    } catch (err) {
      json(res, err.sqlMessage, '错误')
    }
  },
  search_artcle: async (req, res, next) => {
    const query = utils.format(req)
    let sql = `SELECT *,cont.id FROM article_cont AS cont `
    const cateJoin = 'LEFT JOIN article_category AS cate ON cont.categoryId=cate.id '
    const subJoin = 'LEFT JOIN article_subclass AS sub ON cont.subclassId=sub.id '
    sql += cateJoin + subJoin
    sql += `WHERE title LIKE '%${query.title}%' ORDER BY createDate DESC`
    try {
      let data = await poolextend(sql)
      json(res, data, '成功')
    } catch (err) {
      json(res, err, '失败', 201)
    }
  },
  get_artcle: async (req, res, next) => {
    const query = await utils.format(req)
    let sql = `SELECT *,cont.id FROM article_cont AS cont `
    const cateJoin = 'LEFT JOIN article_category AS cate ON cont.categoryId=cate.id '
    const subJoin = 'LEFT JOIN article_subclass AS sub ON cont.subclassId=sub.id '
    sql += cateJoin + subJoin
    let arr = []
    if (query.categoryId && query.subclassId) {
      arr = [query.categoryId, query.subclassId]
      sql += 'WHERE cont.categoryId=? AND cont.subclassId=?'
    } else if (query.categoryId) {
      arr.push(query.categoryId)
      sql += 'WHERE cont.categoryId=?'
    } else if (query.subclassId) {
      arr.push(query.subclassId)
      sql += 'WHERE cont.subclassId=?'
    }
    sql += 'ORDER BY cont.id DESC'
    try {
      let data = await poolextend(sql, arr)
      json(res, data, '成功')
    } catch (err) {
      json(res, err, '失败', 201)
    }
  },
  get_artcleDetails: async (req, res, next) => {
    const query = utils.format(req)
    try {
      let [data] = await poolextend('SELECT * FROM article_cont WHERE id=?', [query.id])
      json(res, data, '成功')
    } catch (err) {
      json(res, err, '错误', 201)
    }
  }
}
module.exports = apiArtcle
