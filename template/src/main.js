{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
{{#if_eq platform "mobile"}}
import mintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
{{/if_eq}}
{{#if_eq platform "web"}}
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
{{/if_eq}}
import * as filters from '@/filters'
import * as directives from '@/directives'

Object.keys(filters).forEach(key=>{
  Vue.filter(key,filters[key])
})

Object.keys(directives).forEach(key=>{
  Vue.filter(key,directives[key])
})

{{#if_eq platform "mobile"}}
Vue.use(mintUI)
{{/if_eq}}
{{#if_eq platform "web"}}
Vue.use(elementUI,{size:'small'})
{{/if_eq}}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
