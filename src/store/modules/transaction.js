import { getTansactionList} from '@/api/transaction'

const state = {
  listData: {},
  countData: Number
}

const mutations = {
  SET_LIST_DATA: (state, data) => {
    state.listData = data
  },
  SET_COUNT_DATA: (state, data) => {
    state.countData = data
  }
}

const actions = {
  getTansactionList({ commit }, data) {
    return new Promise((resolve, reject) => {
      getTansactionList(data)
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
