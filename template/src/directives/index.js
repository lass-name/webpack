export const upper = {
  bind: function (el, binding) {
    el.addEventListener('keyup', function (event) {
      event.target.value = event.target.value.toUpperCase()
      binding.value.set[binding.value.name] = event.target.value
    })
  }
}