import {
roleList,groupList,actionList,roleDetailUpdate,groupDetailUpdate,roleDetail,groupDetail,roleAdd,groupAdd,roleDelete,groupDelete
} from '@/api/acl'
  
  const state = {
    roleList: [],
    groupList: [],
    actionList: [],
    roleDetail: {},
    groupDetail: {}
  }
  
  const mutations = {
    GET_ROLE_LIST: (state, arr) => {
      state.roleList = arr
    },
    GET_GROUP_LIST: (state, arr) => {
      state.groupList = arr
    },
    GET_ACTION_LIST: (state, arr) => {
      state.actionList = arr
    },
    GET_ROLE_DETAIL: (state, obj) => {
      state.roleDetail = obj
    },
    GET_GROUP_DETAIL: (state, obj) => {
      state.groupDetail = obj
    },
  }
  
  const actions = {
    getRoleList({ commit, state }) {
      return new Promise((resolve, reject) => {
        roleList({ page_number: state.userPageNumber })
          .then(response => {
          commit('GET_ROLE_LIST', response.list)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    getGroupList({ commit, state },params) {
      return new Promise((resolve, reject) => {
        groupList()
          .then(response => {
            commit('GET_GROUP_LIST', response.list)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getActionList({ commit, state },params) {
      return new Promise((resolve, reject) => {
        actionList()
          .then(response => {
            commit('GET_ACTION_LIST', response.list)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    roleDetail({ commit, state },params) {
      return new Promise((resolve, reject) => {
        roleDetail(params)
          .then(response => {
            commit('GET_ROLE_DETAIL', response.detail)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    groupDetail({ commit, state },params) {
      return new Promise((resolve, reject) => {
        groupDetail(params)
          .then(response => {
            commit('GET_GROUP_DETAIL', response.detail)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    roleDetailUpdate({ commit, state },params) {
      return new Promise((resolve, reject) => {
        roleDetailUpdate(params)
          .then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    groupDetailUpdate({ commit, state },params) {
      return new Promise((resolve, reject) => {
        groupDetailUpdate(params)
          .then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    roleAdd({ commit, state },params) {
      return new Promise((resolve, reject) => {
        roleAdd(params)
          .then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    groupAdd({ commit, state },params) {
      return new Promise((resolve, reject) => {
        groupAdd(params)
          .then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    roleDelete({ commit, state },params) {
      return new Promise((resolve, reject) => {
        roleDelete(params)
          .then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    groupDelete({ commit, state },params) {
      return new Promise((resolve, reject) => {
        groupDelete(params)
          .then(response => {
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
  