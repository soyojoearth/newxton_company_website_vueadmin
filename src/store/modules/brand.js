import {
    getBrandList,saveBrand,deleteBrand
  } from '@/api/brand'
  import Vue from 'vue'
  const state = {
    brandList: []
  }
  
  const mutations = {
    SET_BRAND_LIST: (state, list) => {
      state.brandList = list
    }
  }
  
  const actions = {
    getBrandList ({ commit }) {
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
    saveBrand ({ commit },data) {
      return new Promise((resolve, reject) => {
        saveBrand(data)
          .then(res => {
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    deleteBrand ({ commit },data) {
      return new Promise((resolve, reject) => {
        deleteBrand(data)
          .then(res => {
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
  