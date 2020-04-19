import axios from 'axios'
{{#if_eq platform "mobile"}}
import {Toast, Dialog} from 'vant'
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
  {{#if_eq platform "mobile"}}
  Toast.loading({message: '加载中...'})
  {{/if_eq}}
  {{#if_eq platform "web  "}}
  Indicator.open()
  {{/if_eq}}
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  {{#if_eq platform "mobile"}}
  Toast.clear()
  {{/if_eq}}
  {{#if_eq platform "web"}}
  Indicator.close()
  {{/if_eq}}
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const errortext = codeMessage[response.status] || response.statusText
  const error = new Error(errortext)
  error.name = response.status
  throw error 
}, error => {
  {{#if_eq platform "mobile"}}
  Toast.clear()
  {{/if_eq}}
  {{#if_eq platform "web"}}
  Indicator.close()
  {{/if_eq}}
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
    options.baseURL = options.baseURL || baseUrl
    return new Promise((resolve, reject) => {
      axios({...defaultOptions, ...options}).then(response => {
        return response
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
          if(message){
            {{#if_eq platform "mobile"}}
            Dialog.alert({message: message})
            {{/if_eq}}
            {{#if_eq platform "web"}}
            MessageBox.alert(message)
            {{/if_eq}}
            reject(message)
          } else {
            resolve(data)
          }
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  pureDataCommit: (commit, data, mutation) => {
    return new Promise((resolve, reject) => {
      mutation && commit(mutation, data)
      // let dval = (data && data.value !== undefined) ? data.value : ''
      resolve(data)
    })
  }
}
