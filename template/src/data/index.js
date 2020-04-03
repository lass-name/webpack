const requireContext = require.context('.',false,/^(?!\.\/index).*\.js$/)
let data = {}

requireContext.keys().forEach(file => {
  data = {...data, ...requireContext(file).default}
});

export default data
