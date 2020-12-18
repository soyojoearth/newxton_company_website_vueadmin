import { memberLevelList, memberLevelSave, memberLevelDelete} from '@/api/memberManage'

const state = {
  listData: [],
  countData: Number,
  saveStatus: Number,
  deleteStatus: Number
}

const mutations = {
  SET_LIST_DATA: (state, data) => {
    state.listData = data
  },
  UPDATE_SAVE_STATUS: (state, data) => {
    state.saveStatus = data
  },
  UPDATE_DELETE_STATUS: (state, data) => {
    state.deleteStatus = data
  }
}

const actions = {
  searchListData({ commit }) {
    return new Promise((resolve, reject) => {
      memberLevelList({})
        .then(res => {
          commit('SET_LIST_DATA', res.result)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  memberLevelSave({ commit }, data) {
    return new Promise((resolve, reject) => {
      memberLevelSave(data)
        .then(res => {
          commit('UPDATE_SAVE_STATUS', res.status)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  memberLevelDelete({ commit }, data) {
    return new Promise((resolve, reject) => {
      memberLevelDelete(data)
        .then(res => {
          commit('UPDATE_DELETE_STATUS', res.status)
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
