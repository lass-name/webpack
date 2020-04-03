import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import modules from './modules'
import service from '@/services'
import * as types from './mutation-type'
import generator from './generator'

Vue.use(Vuex)

// state
const state = {
  commonData: {}, // (storage.getItem('commonData') && JSON.parse(storage.getItem('commonData'))) || {},
  activedData: {}
}

// getters
const getters = {
  commonData: state => state.commonData,
  activedData: state => state.activedData
}

// actions
const actions = {
  setCommon: ({commit}, payload) => {
    return service.dataCommit(commit, payload, types.COMMIT_PURE_DATA)
  },
  resetCommon: ({commit}, payload) => {
    return service.dataCommit(commit, payload, types.RESET_COMMIT_PURE_DATA)
  },
  setActive: ({commit}, payload) => {
    return service.dataCommit(commit, payload, types.SET_ACTIVETED_DATA)
  }
}

// mutations
const mutations = {
  [types.COMMIT_PURE_DATA] (state, data) {
    if (data.value || data.key) {
      state.commonData[data.key || 'nokey'] = data.value || data
    }
  },
  [types.RESET_COMMIT_PURE_DATA] (state) {
    state.commonData = {}
  },
  [types.SET_ACTIVETED_DATA] (state, data) {
    state.activedData = data.value || data || ''
  }
}

const merge = require('webpack-merge')
const generatorModules = merge.smart(generator, modules)

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: generatorModules,
  plugins: createPersistedState({
    storage: window.sessionStorage
  })
})

export default store
