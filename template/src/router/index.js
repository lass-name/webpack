import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const requireRouter = require.context('.', false, /^(?!\.\/index).*\.js$/)
let _routers = []

requireRouter.keys().forEach(fileName => {
  _routers = [..._routers, ...requireRouter(fileName).default]
})

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
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
