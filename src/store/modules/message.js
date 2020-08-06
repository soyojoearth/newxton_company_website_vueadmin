import { getList, deleteMessage } from '@/api/message'

const state = {
  ListData: []
}

const mutations = {
  SET_LIST_DATA: (state, data) => {
    state.ListData = data
  }
}

const actions = {
  getList({ commit }, data) {
    return new Promise((resolve, rejust) => {
      getList({ page_number: data })
        .then(res => {
          commit('SET_LIST_DATA', res.list)
          resolve()
        })
        .catch(err => {
          rejust(err)
        })
    })
  },
  deleteMessage({ state }, data) {
    return new Promise((resolve, rejust) => {
      deleteMessage({ id: data })
        .then(res => {
          resolve()
        })
        .catch(err => {
          rejust(err)
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
