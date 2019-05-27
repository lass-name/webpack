import enumData from '@/data/enum'

const factory = (value, source) => {
  return (value !== undefined && source.find(c => +c.key === +value) && source.find(c => +c.key === +value).value) || value
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
