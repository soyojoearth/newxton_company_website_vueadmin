import {
  getDeliveryConfigList,getDeliveryCompanyList,saveDeliveryCompany,deleteDeliveryCompany
} from '@/api/delivery'
import Vue from 'vue'
const state = {
  deliveryConfigList: [],
  deliveryCompanyList: []
}

const mutations = {
  SET_DELIVERY_CONFIG_LIST: (state, list) => {
    state.deliveryConfigList = list
  },

  SET_DELIVERY_COMPANY_LIST: (state, list) => {
    state.deliveryCompanyList = list
  }
}

const actions = {
  getDeliveryConfigList({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getDeliveryConfigList()
        .then(res => {
          commit('SET_DELIVERY_CONFIG_LIST', res.list)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getDeliveryCompanyList({
    commit,
    state
  }, data) {
    return new Promise((resolve, reject) => {
      getDeliveryCompanyList()
        .then(res => {
          commit('SET_DELIVERY_COMPANY_LIST', res.list)
          resolve()
        }).catch(err => {
          reject(err)
        })
    })
  },

  saveDeliveryCompany({
    state
  }, data) {
    return new Promise((resolve, reject) => {
      saveDeliveryCompany({
          id: data.id,
          name: data.name,
          code100: data.code100,
          activity: data.activity
        })
        .then(res => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  deleteDeliveryCompany ({ commit }, data) {
    return new Promise((resolve, reject) => {
      deleteDeliveryCompany({
        id: data
      })
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
