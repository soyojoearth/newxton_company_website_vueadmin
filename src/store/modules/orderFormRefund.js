import { getOrderRefundList, getOrderRefundDetail, orderRefundApproval } from '@/api/orderFormRefund'

const state = {
  listData: {},
  countData: Number,
  detailData: {},
  orderRefundApprovalStatus: Number
}

const mutations = {
  SET_LIST_DATA: (state, data) => {
    state.listData = data
  },
  SET_COUNT_DATA: (state, data) => {
    state.countData = data
  },
  SET_DETAIL_DATA: (state, data) => {
    state.detailData = data
  },
  ORDER_REFUND_APPROVAL: (state, data) => {
    state.orderRefundApprovalStatus = data
  }
}

const actions = {
  searchListData({ commit }, data) {
    return new Promise((resolve, reject) => {
      getOrderRefundList(data)
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
  searchDetailData({ commit }, data) {
    return new Promise((resolve, reject) => {
      getOrderRefundDetail(data)
        .then(res => {
          commit('SET_DETAIL_DATA', res.result)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  updateAddress({ commit }, data) {
    return new Promise((resolve, reject) => {
      orderRefundApproval(data)
        .then(res => {
          commit('ORDER_REFUND_APPROVAL', res.status)
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
