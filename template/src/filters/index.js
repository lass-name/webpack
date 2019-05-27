import { regex } from '@/utils/regex'
import { data } from '@/utils/enum'
/**
 * 过滤器
 * 全局过滤器定义
 */

export const mobile = (value) => {
  return (value && value.replace(regex.mobileSecret, '$1****$2')) || value
}
export function Currency (value) {
  value = (+value || 0).toFixed(2)
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function TableFilter (value, filter) {
  return (value && data[filter](value)) || value
}

const filters = {}
Object.keys(data).forEach(key => {
  filters[key] = (value) => {
    return data[key](value)
  }
})

export const dataFilter = {...filters}
