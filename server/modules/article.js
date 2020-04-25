const poolextend = require('../utils/poolextend')
const json = require('../utils/json')
const utils = require('../utils/index')
const formidable = require('formidable')
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
  // 废弃
  upload: async (req, res, next) => {
    var form = new formidable.IncomingForm()
    var uploadDir = 'public/fileUpload/'
    form.uploadDir = uploadDir
    form.keepExtensions = true // 保留拓展名
    form.maxFieldsSize = 20 * 1024 * 1024 // 上传文件的最大大小
    form.hash = 'md5'
    form.parse(req, async (err, fields, files) => {
      if (err) return json(res, err, '错误')
      let [fileStatus] = await poolextend('SELECT url FROM file_hash WHERE hash=?', [files.file.hash])
      if (fileStatus) {
        fs.unlink(files.file.path, err => {
          if (err) console.log('失败')
        })
        json(res, fileStatus.url, '成功')
        // json(res, files, '成功')
      } else {
        await poolextend('INSERT INTO file_hash(hash,url) VALUES(?,?)', [files.file.hash, files.file.path])
        json(res, files.file.path, '成功')
      }
    })
  },
  add_artcle: async (req, res, next) => {
    const q = await utils.format(req)
    try {
      await poolextend('INSERT INTO article_cont SET ?', q)
      json(res, null, '添加成功')
    } catch (err) {
      json(res, err, '添加失败', 201)
    }
    // try {
    //   const sql = 'INSERT INTO article_cont (title,author,createDate,content,src,subclassId,categoryId) VALUES(?,?,?,?,?,?,?)'
    //   await poolextend(sql, [q.title, q.author, q.createDate, q.content, q.src, q.subclassId, q.categoryId])
    //   json(res, null, '添加成功')
    // } catch (err) {
    //   json(res, err, '错误')
    // }
  },
  search_artcle: async (req, res, next) => {
    const query = utils.format(req)
    let sql = `SELECT *,cont.id FROM article_cont AS cont `
    const cateJoin = 'LEFT JOIN article_category AS cate ON cont.categoryId=cate.id '
    const subJoin = 'LEFT JOIN article_subclass AS sub ON cont.subclassId=sub.id '
    sql += cateJoin + subJoin
    sql += `WHERE title LIKE '%${query.title}%' ORDER BY cont.id DESC`
    if (query.page) sql += ` LIMIT ${(query.page - 1) * query.pageSize},${query.pageSize}`
    try {
      let data = {}
      let [total] = await poolextend(`SELECT COUNT(*) as total FROM article_cont WHERE title LIKE '%${query.title}%'`)
      data.list = await poolextend(sql)
      data.total = total.total
      json(res, data, '成功')
    } catch (err) {
      json(res, err, '失败', 201)
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
  get_artcle: async (req, res, next) => {
    const query = await utils.format(req)
    let where = ''
    let sql = `SELECT *,cont.id FROM article_cont AS cont `
    const cateJoin = 'LEFT JOIN article_category AS cate ON cont.categoryId=cate.id '
    const subJoin = 'LEFT JOIN article_subclass AS sub ON cont.subclassId=sub.id WHERE 1=1'
    sql += cateJoin + subJoin
    if (query.categoryId) where += ` AND cont.categoryId=${query.categoryId}`
    if (query.subclassId) where += ` AND cont.subclassId=${query.subclassId}`
    if (query.title) where += ` AND cont.title LIKE '%${query.title}%'`
    sql += where
    sql += ' ORDER BY cont.id DESC'
    if (query.page) sql += ` LIMIT ${(query.page - 1) * query.pageSize},${query.pageSize}`
    try {
      let data = {}
      let [total] = await poolextend(`SELECT COUNT(cont.id) as total FROM article_cont as cont WHERE 1 ${where}`)
      data.list = await poolextend(sql)
      data.total = total.total
      json(res, data, '成功')
    } catch (err) {
      json(res, err, '失败', 201)
    }
  },
  get_artcleDetails: async (req, res, next) => {
    const query = utils.format(req)
    const cateJoin = 'LEFT JOIN article_category AS cate ON cont.categoryId=cate.id '
    const subJoin = 'LEFT JOIN article_subclass AS sub ON cont.subclassId=sub.id'
    try {
      let [data] = await poolextend(`SELECT *,cont.id FROM article_cont AS cont ${cateJoin} ${subJoin} WHERE cont.id=${query.id}`)
      json(res, data, '成功')
    } catch (err) {
      json(res, err, '错误', 201)
    }
  },
  delete_article: async (req, res, next) => {
    const query = utils.format(req)
    let [data] = await poolextend(`SELECT status,userName FROM userList WHERE uid=?`, [query.uid])
    if (query.author !== data.userName && data.status !== 1) return json(res, data, '权限不足', 201)
    try {
      await poolextend(`delete from article_cont where id=${query.id}`)
      json(res, {}, '成功')
    } catch (err) {
      json(res, err, '失败', 201)
    }
  },
  update_article: async (req, res, next) => {
    const query = await utils.format(req)
    let sql = `UPDATE article_cont SET title=?,content=?,src=?,subclassId=?,categoryId=? `
    sql += `WHERE id=?`
    const arr = [query.title, query.content, query.src, query.subclassId, query.categoryId, query.id]
    try {
      await poolextend(sql, arr)
      json(res, null, '成功')
    } catch (err) {
      json(res, err, '错误', 201)
    }
  }
}
module.exports = apiArtcle
