import {
    getInfo,addjobTransfer
  } from '@/api/oss'
  
  const state = {
    statusDescription: "",
    totalLocal:0,
    totalQiniu:0
  }
  
  const mutations = {
    GET_INFO: (state, data) => {
        state.statusDescription = data.statusDescription
        state.totalLocal = data.totalLocal
        state.totalQiniu = data.totalQiniu
    },
    ADD_JOB: (state, data) => {
        state.statusDescription = data.statusDescription
    },
  }
  
  const actions = {
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          commit('GET_INFO', response.data)
        //   console.log(response.data);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    addjobTransfer({ commit}, params) {
        return new Promise((resolve, reject) => {
            addjobTransfer(params).then(response => {
            commit('ADD_JOB', response.data)
            //   console.log(response.data);
            resolve()
            }).catch(error => {
            reject(error)
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
  