import service, {methods} from '@/services'
import modules from './modules'
let module = {}

/* const requireModule = require.context('@/store/modules', false, /^(?!\.\/index).*\.js$/)
const modules = {}

requireModule.keys().forEach(fileName => {
  const moduleName = fileName.replace(/\.\/|\.js/g, '')
  modules[moduleName] = {
    // namespaced: true,
    ...requireModule(fileName).default
  }
}) */

const getModules = function (obj, key = 'generator',namespace='common', actions = {}) {
  if (obj === undefined) {
    return
  }
  Object.keys(obj).forEach(action => {
    let customActions = modules[namespace] && modules[namespace]['actions']
    if(customActions && action in customActions){
      return
    }
    let type = typeof obj[action]
    if (type === 'function') {
      actions[action] = ({commit}, payload) => {
        return service[namespace][action](commit, payload)
      }
    } else if (type === 'object') {
      getModules(obj[action], action, action)
    }
  })
  if(Object.keys(actions).length){
    module[key] = {actions}
  }
  
}

getModules(methods)
export default module
