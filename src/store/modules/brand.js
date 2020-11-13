import { deleteBrand, getBrandList, saveBrand } from '@/api/brand'

const state = {
  brandList: [],
  brandSaveStatus: Number,
  brandDeleteStatus: Number
}

const mutations = {
  SET_BRAND_LIST: (state, data) => {
    state.brandList = data
  },
  SET_BRAND_SAVE_STATUS: (state, data) => {
    state.brandSaveStatus = data
  },
  SET_BRAND_Delete_STATUS: (state, data) => {
    state.brandDeleteStatus = data
  }
}

const actions = {
  getBrandList({ commit }) {
    return new Promise((resolve, reject) => {
      getBrandList()
        .then(res => {
          commit('SET_BRAND_LIST', res.list)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  saveBrand({ commit }, data) {
    return new Promise((resolve, reject) => {
      saveBrand(data)
        .then(res => {
          commit('SET_BRAND_SAVE_STATUS', res.status)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  deleteBrand({ commit }, data) {
    return new Promise((resolve, reject) => {
      deleteBrand(data)
        .then(res => {
          commit('SET_BRAND_Delete_STATUS', res.status)
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
