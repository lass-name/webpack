import service, {methods, generatorVuex} from '@/services'
import modules from './modules'
let generatorModule = {}

const getModules = function (obj, key = 'generator',namespace='common', module = {}) {
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
      let _mutationType = ''
      if (generatorVuex && generatorVuex[namespace] && action in generatorVuex[namespace]) {
        let { _state, getter, mutationType } = generatorVuex[namespace][action]
        _mutationType = mutationType
        module.mutations[mutationType] = (state, data) => {
          state[_state] = data
        }
        module.state[_state] = {}
        module.getters[getter] = (state) => {
          return state[_state]
        }
      }

      module.actions[action] = ({commit}, payload) => {
        return service[namespace][action](commit, payload, _mutationType)
      }
    } else if (type === 'object') {
      getModules(obj[action], action, action)
    }
  })
  generatorModule[key] = module
  
}

getModules(methods)
export default generatorModule
