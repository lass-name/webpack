import axios from 'axios'
{{#if_eq platform "mobile"}}
import {Indicator, MessageBox} from 'mint-ui'
{{/if_eq}}
{{#if_eq platform "web"}}
import { MessageBox } from "element-ui";
import Indicator from '@/components/indicator'
{{/if_eq}}
import { storage } from '@/utils'
import router from '@/router'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}
// console.dir(codeMessage)
axios.interceptors.request.use(config => {
  Indicator.open()
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  Indicator.close()
  return response
}, error => {
  Indicator.close()
  return Promise.reject(error)
})
let baseUrl = '/api'

const defaultOptions = {
  baseURL: baseUrl,
  method: 'get',
  timeout: 50000
}

export default {
  base: (commit, options, mutation) => {
    options.headers = {token: storage.getItem('t') || ''}
    return new Promise((resolve, reject) => {
      axios({...defaultOptions, ...options}).then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response
        }
        const errortext = codeMessage[response.status] || response.statusText
        const error = new Error(errortext)
        error.name = response.status
        throw error
      }).then(({data}) => {
        let {resultCode, message, ResultCode} = data
        if (+resultCode === 1 || ResultCode === 0) {
          let _data = data.data || data
          mutation && commit(mutation, _data)
          resolve(_data)
        } else if (ResultCode === undefined && resultCode === undefined) { // 银行卡信息
          mutation && commit(mutation, data)
          resolve(data)
        } else if (+resultCode === 403) {
          router.replace({path: '/login', query: {redirect: router.currentRoute.fullPath}})
        } else {
          console.log(message)
          MessageBox.alert(message)
          reject(message)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  get: function (commit, options, mutation) {
    options = {...options, ...{params: {...defaultOptions.params, ...options.data}, data: {}}}
    return this.base(commit, options, mutation)
  },
  post: function (commit, options, mutation) {
    options.method = 'post'
    return this.base(commit, options, mutation)
  },
  put: function (commit, options, mutation) {
    options.method = 'put'
    return this.base(commit, options, mutation)
  },
  delete: function (commit, options, mutation) {
    options.method = 'delete'
    return this.base(commit, options, mutation)
  },
  getOptions: (url, data = {}, timeout = defaultOptions.timeout, baseURL = defaultOptions.baseURL) => {
    timeout = timeout || defaultOptions.timeout
    return {url, data, timeout, baseURL}
  },
  pureDataCommit: (commit, data, mutation) => {
    return new Promise((resolve, reject) => {
      mutation && commit(mutation, data)
      let dval = (data && data.value) ? data.value : ''
      resolve(dval)
    })
  }
}