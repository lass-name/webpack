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
  let name = fileName.replace(/\.\/|\.js$/g, '')
  for (let o of obj) {
    let {url, method, argsParams} = o
    method = method || 'get'
    methods[url.replace(`/${name}/`, '')] = (commit, payload, mutation) => {
      if (method === 'get' && argsParams) {
        url = `${url}/${payload.id || payload}`
      }
      let options = request.getOptions(url, payload)
      return request[method](commit, options, mutation)
    }
  }
})

services = {...methods, ...services}

export default services
