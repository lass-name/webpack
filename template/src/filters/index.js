/**
 * 过滤器
 * 全局过滤器定义
 */

/* export const mobile = (value) => {
  return (value && value.replace(regex.mobileSecret, '$1****$2')) || value
} */
export function Currency (value) {
  value = (+value || 0).toFixed(2)
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}