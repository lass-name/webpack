import request from './base'
const requireContext = require.context('.', false, /\.js$/)
let services = {}

requireContext.keys().forEach(file => {
  if (file === './index.js' || file === './base.js') return
  services = {...services, ...requireContext(file).default}
})

const requireApi = require.context('@/api', false, /\.js$/)
let methods = {}
requireApi.keys().forEach(file => {
  let obj = requireApi(file).default
  let fileName = file.replace(/\.\/|\.js$/g,'')
  let _methods = {}

  for (let o of obj) {
    let {url, method, argsParams} = o
    method = (method || 'get').toLowerCase()
    let methodName = url.replace(/^\/|\/$/g, '').replace(/[\W|_]([a-zA-Z])/g, (_, letter) => {
      return letter.toUpperCase()
    })
    _methods[methodName] = (commit, payload, mutation) => {
      let _url = url
      if (method === 'get' && argsParams) {
        _url = `${_url}/${payload.id || payload}`
      }
      let options = request.getOptions(_url, payload.data || payload, o.timeout, o.proxy)
      if(payload.params){
        options.params = payload.params
      }
      return request[method](commit, options, mutation)
    }
  }
  methods[fileName] = _methods
})
services = {...methods, ...services}

export default services
