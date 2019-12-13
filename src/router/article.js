const articleRouter = {
  edit: r => require.ensure([], () => r(require('../views/container/article/edit.vue'))),
  publish: r => require.ensure([], () => r(require('../views/container/article/publish.vue'))),
  manage: r => require.ensure([], () => r(require('../views/container/article/manage.vue'))),
  details: r => require.ensure([], () => r(require('../views/container/article/children/details.vue'))),
  list: r => require.ensure([], () => r(require('../views/container/article/children/list.vue'))),
  index: r => require.ensure([], () => r(require('../views/container/article/index.vue')))
}
module.exports = articleRouter
