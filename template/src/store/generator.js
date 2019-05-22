import service from '@/services'
let module = {}

const getModules = function (obj, key = 'generator', actions = {}) {
  if (obj === undefined) {
    return
  }
  Object.keys(obj).forEach(action => {
    let type = typeof obj[action]
    if (type === 'function') {
      actions[action] = ({commit}, payload) => {
        return service[action](commit, payload)
      }
    } else if (type === 'object') {
      getModules(obj[action], action)
    }
  })
  module[key] = {actions}
}

getModules(service)
// console.log(module)
export default module
