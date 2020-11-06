import {
    getBrandList
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
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  