const requireContext = require.context('.', false, /\.vue$/)
let components = {}
requireContext.keys().forEach(file => {
  let filename = file.replace(/\.\/|\.vue/g, '')
  components[filename] = requireContext(file).default
})

export default components
