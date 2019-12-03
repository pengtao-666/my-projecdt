import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: r => require.ensure([], () => r(require('../views/index.vue'))),
    children: [
      {
        path: '/',
        component: r => require.ensure([], () => r(require('../views/container/index.vue'))),
        children: [
          {
            path: '/',
            component: r => require.ensure([], () => r(require('../views/container/home/index.vue')))
          },
          {
            path: '/userList',
            component: r => require.ensure([], () => r(require('../views/container/user/list.vue')))
          },
          {
            path: '/album',
            component: r => require.ensure([], () => r(require('../views/container/album/index.vue')))
          }
        ]
      },
      {
        path: '/login',
        component: r => require.ensure([], () => r(require('../views/login/index.vue')))
      }
    ]
  }
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'about',

  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: process.env.NODE_ENV === 'development' ? 'hash' : 'history',
  // mode:'history',
  base: process.env.BASE_URL,
  routes
})

export default router
