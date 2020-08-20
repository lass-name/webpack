import qs from 'qs'
import request from './base'
const requireContext = require.context('.', false, /\.js$/)
let services = {}

const regex = /^\/|\/$/g
/* const isObject = (val)=>{
  return val && Object.prototype.toString.call(val)==='[object Object]'
} */
requireContext.keys().forEach(file => {
  if (file === './index.js' || file === './base.js') return
  services = {...services, ...requireContext(file).default}
})

const requireApi = require.context('@/api', false, /\.js$/)
let methods = {}
let generatorVuex = {}
requireApi.keys().forEach(file => {
  let apiObject = requireApi(file).default
  let fileName = file.replace(/\.\/|\.js$/g,'')
  let _methods = {}
  let tempVuex = {}

  for (let item of apiObject) {
    let {url, method, argsParams, baseURL, headers, formdata} = item.options
    let vuex = item.vuex
    method = (method || 'get').toLowerCase()
    let methodName = url.replace(regex, '').replace(/[\W|_]([a-zA-Z])/g, (_, letter) => {
      return letter.toUpperCase()
    })

    if (methodName in _methods) {
      methodName = `${method}${methodName.substring(0, 1).toUpperCase()}${methodName.substring(1)}`
    }
    _methods[methodName] = (commit, payload, mutation) => {
      let options = {}
      let _url = `/${url.replace(regex,'')}`
      if (method === 'get' && argsParams) {
        _url = `${_url}/${payload.id || payload}`
      }
      options.url = _url
      
      let data = (payload && payload.data) || payload || {}
      if (payload && payload.params) {
        let { params, ...other } = payload
        options.params = params
        data = other
      } else if (method === 'get' && !argsParams) {
        options.params = {...data}
        data = {}
      }
      if(baseURL){
        options.baseURL = `/${baseURL.replace(regex,'')}`
      }

      options = {...item.options, ...options}
      if(Object.keys(data).length){
        if(formdata){
          data = qs.stringify(data)
        }
        options = {data, ...options}
      }
      if(headers){
        options = {...options, headers}
      }
      
      return request.base(commit, options, mutation)
    }
    if (vuex || (vuex !== false && method === 'get')) {
      let _mutationType = url.replace(regex, '').replace(/\W/g, '_').toUpperCase()
      let state = (vuex && vuex.state) || _mutationType
      let getter = (vuex && vuex.getter) || _mutationType
      let mutationType = (vuex && vuex.mutationType) || _mutationType
      tempVuex[methodName] = {
        _state: state,
        getter,
        mutationType
      }
    }
  }
  methods[fileName] = _methods
  generatorVuex[fileName] = tempVuex
})
services = {...methods, ...services}

export {
  methods,
  generatorVuex
}

export default services
