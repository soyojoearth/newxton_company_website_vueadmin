import { getCommissionDetail, commissionSave, getCommissionLogs } from '@/api/commission'

const state = {
  detailData: {},
  commissionSaveStatus: Number,

  listData: {},
  countData: Number
}

const mutations = {
  SET_DETAIL_DATA: (state, data) => {
    state.detailData = data
  },
  COMMISSION_SAVE: (state, data) => {
    state.commissionSaveStatus = data
  },
  ORDER_REFUND_APPROVAL: (state, data) => {
    state.orderRefundApprovalStatus = data
  },

  SET_LIST_DATA: (state, data) => {
    state.listData = data
  },
  SET_COUNT_DATA: (state, data) => {
    state.countData = data
  }
}

const actions = {
  searchDetailData({ commit }, data) {
    return new Promise((resolve, reject) => {
      getCommissionDetail(data)
        .then(res => {
          commit('SET_DETAIL_DATA', res.result)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  commissionSave({ commit }, data) {
    return new Promise((resolve, reject) => {
      commissionSave(data)
        .then(res => {
          commit('COMMISSION_SAVE', res.status)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getCommissionLogs({ commit }, data) {
    return new Promise((resolve, reject) => {
      getCommissionLogs(data)
        .then(res => {
          commit('SET_LIST_DATA', res.result.list)
          commit('SET_COUNT_DATA', res.result.count)
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
