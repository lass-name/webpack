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

const setFilter = (value, type = 1) => {
  Object.keys(value).forEach(key => {
    if (typeof value[key] === 'function') {
      if (type === 1) {
        Vue.filter(key, value[key])
      } else {
        Vue.directive(key, value[key])
      }
    } else {
      setFilter(value[key], type)
    }
  })
}

setFilter(filters)
setFilter(directives, 2)

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
