import Vue from 'vue'
import loading from './indicator'
const Indicator = Vue.extend(loading)

let instance

export default {
  open (options = {}) {
    if (!instance) {
      instance = new Indicator({
        el: document.createElement('div')
      })
    }
    // console.log('open', instance.vm, instance)
    if (instance.visible) return

    document.body.appendChild(instance.$el)
    Vue.nextTick(() => {
      instance.visible = true
    })
  },
  close () {
    if (instance) {
      instance.visible = false
    }
  }
}
