import {
  userList, getPageList,
  getPageDetail, editPageDetail,
  resetUserPwd, blockUser,
  resetUserType,resetUserRole
} from '@/api/set'

const state = {
  userPageNumber: 1,
  userArr: [],
  pageData: [],
  pageDetail: {
    detail: '',
    title: '',
    webTitle: '',
    time: '',
    id: ''
  }
}

const mutations = {
  SET_USER_PAGE: (state, pages) => {
    state.userPageNumber = pages
  },
  SET_USER_ARR: (state, arr) => {
    state.userArr = arr
  },
  SET_PATE_DATA: (state, arr) => {
    state.pageData = arr
  },
  SET_PATE_DETAIL: (state, data) => {    
    state.pageDetail.id = data.id
    state.pageDetail.detail = data.contentDetail
    state.pageDetail.title = data.contentTitle
    state.pageDetail.time = data.datelineUpdateReadable
    state.pageDetail.webTitle = data.webTitle
  },
  GET_ROLE_LIST: (state, arr) => {
    state.roleList = arr
  },
}

const actions = {
  getUserArr({ commit, state }) {
    return new Promise((resolve, reject) => {
      userList({ page_number: state.userPageNumber }).then(response => {
        commit('SET_USER_ARR', response.list)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getPageList({ commit }) {
    return new Promise((resolve, rejust) => {
      getPageList()
        .then(res => {
          commit('SET_PATE_DATA', res.list)
          // console.log(res)
          resolve()
        })
        .catch(err => {
          rejust(err)
        })
    })
  },
  getPageDetail({ commit }, data) {
    return new Promise((resolve, rejust) => {
      getPageDetail({
        id: data
      })
        .then(res => {
          commit('SET_PATE_DETAIL', res.detail)
          resolve()
        })
        .catch(err => {
          rejust(err)
        })
    })
  },
  editPageDetail({ state }) {
    return new Promise((resolve, rejust) => {
      editPageDetail({
        id: state.pageDetail.id,
        web_title: state.pageDetail.webTitle,
        content_title: state.pageDetail.title,
        content_detail: state.pageDetail.detail
      })
        .then(res => {
          resolve(true)
        })
        .catch(err => {
          rejust(err)
        })
    })
  },
  resetUserPwd({ state }, data) {
    return new Promise((resolve, rejust) => {
      resetUserPwd({
        reset_user_id: data.id,
        reset_user_pwd: data.pwd
      })
        .then(res => {
          resolve()
        })
        .catch(err => {
          rejust(err)
        })
    })
  },
  blockUser({ state }, data) {
    return new Promise((resolve, rejust) => {
      blockUser({
        block_user_id: data.id,
        is_block: data.is_block
      })
        .then(res => {
          resolve()
        })
        .catch(err => {
          rejust(err)
        })
    })
  },
  resetUserType({ state }, data) {
    return new Promise((resolve, rejust) => {
      resetUserType({
        reset_user_id: data.id,
        reset_user_type: data.type
      })
        .then(res => {
          resolve()
        })
        .catch(err => {
          rejust(err)
        })
    })
  },
  resetUserRole({ state }, data) {
    return new Promise((resolve, rejust) => {
      resetUserRole({
        reset_user_id: data.id,
        reset_user_role: data.roleId
      })
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
