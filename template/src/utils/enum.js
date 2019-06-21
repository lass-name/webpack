import enumData from '@/data/enum'

const factory = (value, source) => {
  if (value === undefined) {
    return value
  }
  let obj = source.find(c => `${c.value}`.trim() === `${value}`.trim())
  return (obj && obj.label) || value
}

let methods = {}
const getData = (value) => {
  Object.keys(value).forEach(key => {
    let type = value[key] instanceof Array
    if (type) {
      methods[key] = (val) => {
        return factory(val, value[key])
      }
    } else {
      getData(value[key])
    }
  })
}

getData(enumData)
export const data = {...methods}
