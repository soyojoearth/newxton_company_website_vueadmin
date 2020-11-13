import { getRegionList, saveRegion, deleteRegion } from '@/api/region'

const state = {
  listData: [],
  saveStatus: Number,
  deleteStatus: Number
}

const mutations = {
  SET_LIST_DATA: (state, data) => {
    state.listData = data
  },
  SET_SAVE_STATUS: (state, data) => {
    state.saveStatus = data
  },
  SET_DELETE_STATUS: (state, data) => {
    state.deleteStatus = data
  }
}

const actions = {
  searchListData({ commit }) {
    return new Promise((resolve, reject) => {
      getRegionList()
        .then(res => {
          commit('SET_LIST_DATA', res.list)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  saveData({ commit }, data) {
    return new Promise((resolve, reject) => {
      saveRegion(data)
        .then(res => {
          commit('SET_SAVE_STATUS', res.status)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  deleteData({ commit }, data) {
    return new Promise((resolve, reject) => {
      deleteRegion(data)
        .then(res => {
          commit('SET_DELETE_STATUS', res.status)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
