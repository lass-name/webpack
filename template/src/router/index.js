import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const requireRouter = require.context('.', false, /^(?!\.\/index).*\.js$/)
let _routers = []

requireRouter.keys().forEach(fileName => {
  _routers = [..._routers, ...requireRouter(fileName).default]
})

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/layout'),
      children: _routers
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
export default router
