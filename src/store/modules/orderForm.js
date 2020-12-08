import { getOrderList, getOrderDetail, orderUpdateAddress, orderUpdatePrice, orderUpdateRemark, orderUpdateDelivery, getDeliveryList } from '@/api/orderForm'
import { getFreightList } from '@/api/freight'

const state = {
  listData: {},
  countData: Number,
  detailData: {},
  updateAddressStatus: Number,
  updatePriceStatus: Number,
  updateRemarkStatus: Number,
  updateDeliveryStatus: Number,
  deliveryList: [],
  freightList: []
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
  UPDATE_ADDRESS_STATUS: (state, data) => {
    state.updateAddressStatus = data
  },
  UPDATE_PRICE_STATUS: (state, data) => {
    state.updatePriceStatus = data
  },
  UPDATE_REMARK_STATUS: (state, data) => {
    state.updateRemarkStatus = data
  },
  UPDATE_DELIVERY_STATUS: (state, data) => {
    state.updateDeliveryStatus = data
  },
  SET_DELIVERY_LIST: (state, data) => {
    state.deliveryList = data
  },
  SET_FREIGHT_LIST: (state, data) => {
    state.freightList = data
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
  searchDetailData({ commit }, data) {
    return new Promise((resolve, reject) => {
      getOrderDetail(data)
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
      orderUpdateAddress(data)
        .then(res => {
          commit('UPDATE_ADDRESS_STATUS', res.status)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  updatePrice({ commit }, data) {
    return new Promise((resolve, reject) => {
      orderUpdatePrice(data)
        .then(res => {
          commit('UPDATE_PRICE_STATUS', res.status)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  updateRemark({ commit }, data) {
    return new Promise((resolve, reject) => {
      orderUpdateRemark(data)
        .then(res => {
          commit('UPDATE_REMARK_STATUS', res.status)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  updateDelivery({ commit }, data) {
    return new Promise((resolve, reject) => {
      orderUpdateDelivery(data)
        .then(res => {
          commit('UPDATE_DELIVERY_STATUS', res.status)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getDeliveryList({ commit }, data) {
    return new Promise((resolve, reject) => {
      getDeliveryList(data)
        .then(res => {
          commit('SET_DELIVERY_LIST', res.result)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getFreightList({ commit },) {
    return new Promise((resolve, reject) => {
      getFreightList({})
        .then(res => {
          commit('SET_FREIGHT_LIST', res.list)
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
