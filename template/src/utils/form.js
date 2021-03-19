import { regex } from './regex'
import { checkIdCard } from './idcard'

{{#if_eq platform "web"}}
const validInput = (value, callback, reg) => {
  if (value && !reg.test(value)) {
    return callback(new Error(''))
  }
  callback()
}

const customValid = {
  validIdCard: (rule, value, callback) => {
    let message = (value && checkIdCard(value.toUpperCase())) || ''
    if (message === '' || message === '验证通过') {
      callback()
    } else {
      return callback(new Error(message))
    }
  }
}

let form = {}
let field = {}
Object.keys(regex).forEach(key => {
  let _key = key.replace(/\b(\w)(\w*)/g, ($0, $1, $2) => {
    return $1.toUpperCase() + $2
  })
  form[`valid${_key}`] = (rule, value, callback) => {
    let _regex = rule.regex || regex[key]
    validInput(value, callback, _regex)
  }
  field[`valid${_key}`] = (value)=>{
    return (value!=='' && regex[key].test(value)) || false
  }
})

form = {...form,...customValid}
field = {...field,...customValid}
// form表单验证
export const formValid = form
// 基本字段验证
export const fieldValid = field


export default {
  formValid,
  fieldValid
}
{{/if_eq}}
{{#if_eq platform "mobile"}}
import { extend, localize } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'
extend('email', email)
extend('required', required)

extend('password', {
  validate (value, {min, max}) {
    return regex.pwd.test(value)
  },
  params: ['min', 'max']
})

extend('idCard', {
  validate (value) {
    return checkIdCard(value)
  }
})

extend('mobile', {
  validate (value) {
    return regex.mobile.test(value)
  }
})

localize({
  'zh-CN': {
    names: {
      email: '邮箱',
      password: '密码',
      idCard: '身份证号',
      mobile: '手机号码'
    },
    messages: {
      ...zh.messages,
      required: '请输入{_field_}',
      email: '请输入正确的邮箱格式',
      password: '密码必须是6到18位',
      idCard: '请输入合法的身份证号',
      mobile: '请输入合法的手机号'
    }
  }
})

localize('zh-CN')

{{/if_eq}}