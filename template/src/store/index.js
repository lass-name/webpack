import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import service from '@/services'
import * as types from './mutation-type'
import { storage } from '@/utils'
import generator from './generator'

Vue.use(Vuex)

// state
const state = {
  commonData: (storage.getItem('commonData') && JSON.parse(storage.getItem('commonData'))) || {}
}

// getters
const getters = {
  commonData: state => state.commonData
}

// actions
const actions = {
  pureDataTransmit: ({commit}, payload) => {
    return service.dataCommit(commit, payload, types.COMMIT_PURE_DATA)
  }
}

// mutations
const mutations = {
  [types.COMMIT_PURE_DATA] (state, data) {
    if ((data.value && !data.value.ResultCode) || !!data.reset) {
      state.commonData[data.key] = data.value
      let save = data.save === undefined
      if (save) {
        storage.setItem('commonData', JSON.stringify(state.commonData))
      }
    }
  }
}

console.log(generator)
const merge = require('webpack-merge')
const mergedModules = merge.smart(generator, modules)

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: mergedModules
})

export default store
