import {
    apiGetDeliveryConfigList
  } from '@/api/delivery'
  import Vue from 'vue'
  const state = {
    deliveryConfigList: [],
  }
  
  const mutations = {
    SET_DELIVERY_CONFIG_LIST: (state, list) => {
      state.deliveryConfigList = list
    }
  }
  
  const actions = {
    getDeliveryConfigList ({ commit }) {
      return new Promise((resolve, reject) => {
        apiGetDeliveryConfigList()
          .then(res => {
            commit('SET_DELIVERY_CONFIG_LIST', res.list)
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
  