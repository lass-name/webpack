const requireModule = require.context('.', false, /^(?!\.\/index).*\.js$/)
const modules = {}

requireModule.keys().forEach(fileName => {
  const moduleName = fileName.replace(/\.\/|\.js/g, '')
  modules[moduleName] = {
    // namespaced: true,
    ...requireModule(fileName).default
  }
})

export default modules
