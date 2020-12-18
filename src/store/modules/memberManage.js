import { getMemberList, getMemberInfo, memberUpdateBasic, memberUpdateCmmission, memberUpdateBalance, memberAddressList } from '@/api/memberManage'

const state = {
  listData: {},
  countData: Number,
  detailData: {},
  updateBasicStatus: Number,
  updateCmmissionStatus: Number,
  updateBalanceStatus: Number,
  addressData: []
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
  UPDATE_BASIC_STATUS: (state, data) => {
    state.updateBasicStatus = data
  },
  UPDATE_CMMISSION_STATUS: (state, data) => {
    state.updateCmmissionStatus = data
  },
  UPDATE_BALANCE_STATUS: (state, data) => {
    state.updateBalanceStatus = data
  },
  SET_ADDRESS_DATA: (state, data) => {
    state.addressData = data
  }
}

const actions = {
  searchListData({ commit }, data) {
    return new Promise((resolve, reject) => {
      getMemberList(data)
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
      getMemberInfo(data)
        .then(res => {
          commit('SET_DETAIL_DATA', res.result)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  updateBasic({ commit }, data) {
    return new Promise((resolve, reject) => {
      memberUpdateBasic(data)
        .then(res => {
          commit('UPDATE_BASIC_STATUS', res.status)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  updateCmmission({ commit }, data) {
    return new Promise((resolve, reject) => {
      memberUpdateCmmission(data)
        .then(res => {
          commit('UPDATE_CMMISSION_STATUS', res.status)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  updateBalance({ commit }, data) {
    return new Promise((resolve, reject) => {
      memberUpdateBalance(data)
        .then(res => {
          commit('UPDATE_BALANCE_STATUS', res.status)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getAddressList({ commit }, data) {
    return new Promise((resolve, reject) => {
      memberAddressList(data)
        .then(res => {
          commit('SET_ADDRESS_DATA', res.result)
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
