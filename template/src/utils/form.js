import { regex } from './regex'
import { checkIdCard } from './idcard'

{{#if_eq platform "web"}}
const validInput = (value, callback, reg) => {
  if (value && !reg.test(value)) {
    return callback(new Error(''))
  }
  callback()
}


export const formValid = {
  validNameCN: (rule, value, callback) => {
    validInput(value, callback, regex.realName)
  },
  validSceneName: (rule, value, callback) => {
    validInput(value, callback, regex.sceneName)
  },
  validInputCN: (rule, value, callback) => {
    validInput(value, callback, regex.inputCN)
  },
  validPoint: (rule, value, callback) => {
    validInput(value, callback, regex.floatNumber)
  },
  validPointNoZero: (rule, value, callback) => {
    if (!value) {
      callback()
    }
    if (+value > 0) {
      validInput(value, callback, regex.floatNumber)
    } else {
      return callback(new Error('请输入大于0的数字'))
    }
  },
  validMobile: (rule, value, callback) => {
    validInput(value, callback, regex.mobile)
  },
  validPhone: (rule, value, callback) => {
    validInput(value, callback, regex.phone)
  },
  validTelphone: (rule, value, callback) => {
    validInput(value, callback, regex.phoneAndMobile)
  },
  validNumber: (rule, value, callback) => {
    validInput(value, callback, regex.number)
  },
  validInput100: (rule, value, callback) => {
    validInput(value, callback, regex.input100)
  },
  validInputSpace100: (rule, value, callback) => {
    validInput(value, callback, regex.inputspace100)
  },
  validIdCard: (rule, value, callback) => {
    let message = (value && checkIdCard(value.toUpperCase())) || ''
    if (message === '' || message === '验证通过') {
      callback()
    } else {
      return callback(new Error(message))
    }
  },
  validAccount: (rule, value, callback) => {
    validInput(value, callback, regex.accountNum)
  },
  validCorpNumber: (rule, value, callback) => {
    validInput(value, callback, regex.corpNumber)
  },
  validCorpNumber50: (rule, value, callback) => {
    validInput(value, callback, regex.corpNumber50)
  },
  validXingYeNumber: (rule, value, callback) => {
    validInput(value, callback, regex.xingyeAccount)
  },
  validPassword: (rule, value, callback) => {
    validInput(value, callback, regex.password)
  }
}

export const fieldValid = {
  account: (value) => {
    return (value && regex.accountNum.test(value)) || false
  }
}

export default formValid
{{/if_eq}}