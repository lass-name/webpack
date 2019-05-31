import request from './base'
const requireContext = require.context('.', false, /\.js$/)
let services = {}

requireContext.keys().forEach(fileName => {
  if (fileName === './index.js' || fileName === './base.js') return
  services = {...services, ...requireContext(fileName).default}
})

const requireApi = require.context('@/api', false, /\.js$/)
let methods = {}
requireApi.keys().forEach(fileName => {
  let obj = requireApi(fileName).default

  for (let o of obj) {
    let {url, method, argsParams} = o
    method = (method || 'get').toLowerCase()
    let methodName = url.replace(/^\/|\/$/g, '').replace(/[\W|_]([a-zA-Z])/g, (all, letter) => {
      return letter.toUpperCase()
    })
    methods[methodName] = (commit, payload, mutation) => {
      if (method === 'get' && argsParams) {
        url = `${url}/${payload.id || payload}`
      }
      let options = request.getOptions(url, payload, o.timeout, o.proxy)
      return request[method](commit, options, mutation)
    }
  }
})

console.log(methods)
services = {...methods, ...services}
console.log(services)

export default services
