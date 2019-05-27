import dayjs from 'dayjs'
/**
 * 数据存储方式
 */
export const storage = {
  setItem (key, value) {
    key && value && sessionStorage.setItem(key, value)
  },
  getItem: (key) => {
    return (key && sessionStorage.getItem(key)) || ''
  },
  removeItem: (key) => {
    key && sessionStorage.removeItem(key)
  },
  clear: () => {
    sessionStorage.clear()
  }
}
/**
 * 数组去重函数
*/
export const unique = (arr) => {
  const tmp = new Map()
  return arr.filter(item => {
    if (typeof (item) !== 'string') {
      item = JSON.stringify(item)
    }
    return (!tmp.has(item) && tmp.set(item, 1))
  })
}

export const day = {
  now: () => {
    return dayjs()
  },
  nowF: (format = 'YYYY-MM-DD') => {
    return dayjs().format(format)
  },
  format: (value, format = 'YYYY-MM-DD') => {
    return dayjs(value).format(format)
  }
}