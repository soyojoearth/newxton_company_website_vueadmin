import { getOrderList, withdrawApproval, transferUpdate } from '@/api/withdraw'

const state = {
  listData: {},
  countData: Number,
  withdrawApprovalStatus: Number,
  transferUpdateStatus: Number
}

const mutations = {
  SET_LIST_DATA: (state, data) => {
    state.listData = data
  },
  SET_COUNT_DATA: (state, data) => {
    state.countData = data
  },
  WITHDRAW_APPROVAL_STATUS: (state, data) => {
    state.withdrawApprovalStatus = data
  },
  STANSFER_UPDATE_STATUS: (state, data) => {
    state.transferUpdateStatus = data
  }
}

const actions = {
  searchListData({ commit }, data) {
    return new Promise((resolve, reject) => {
      getOrderList(data)
        .then(res => {
          commit('SET_LIST_DATA', res.result.list)
          commit('SET_COUNT_DATA', res.result.count)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  withdrawApproval({ commit }, data) {
    return new Promise((resolve, reject) => {
      withdrawApproval(data)
        .then(res => {
          commit('WITHDRAW_APPROVAL_STATUS', res.status)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  transferUpdate({ commit }, data) {
    return new Promise((resolve, reject) => {
      transferUpdate(data)
        .then(res => {
          commit('STANSFER_UPDATE_STATUS', res.status)
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
