import {
  getNewList, deleteNew, createNew,
  updateNew, getDetail, getCategoryList,
  updateCategory, deleteCategory, changeRecommend
} from '@/api/file'

const state = {
  ListData: [],
  CategoryListData: [],
  ListNumber: 1,
  Detail: ''
}

const mutations = {
  SET_LIST_DATA: (state, arr) => {
    state.ListData = arr
  },
  SET_LIST_NUMBER: (state, number) => {
    state.ListNumber = number
  },
  SET_DETAIL: (state, detail) => {
    state.Detail = detail
  },
  SET_CATEGORY_LIST: (state, data) => {
    state.CategoryListData = data
  }
}

const actions = {
  getList({ commit, state }) {
    return new Promise((resolve, rejust) => {
      getNewList({
        category_id: 0,
        page_number: state.ListNumber
      }).then(res => {
        commit('SET_LIST_DATA', res.list)
        resolve()
      }).catch(err => {
        rejust(err)
      })
    })
  },
  deleteNew({ state }, id) {
    return new Promise((resolve, rejust) => {
      deleteNew({
        id: id
      }).then(res => {
        console.log(res)
        resolve()
      }).catch(err => {
        rejust(err)
      })
    })
  },
  createNew({ state }, data) {
    return new Promise((resolve, rejust) => {
      createNew({
        category_id: data.category_id,
        content_title: data.title,
        content_detail: data.detail,
        is_recommend: data.is_recommend
      }).then(res => {
        resolve(111)
      }).catch(err => {
        rejust(err)
      })
    })
  },
  updateNew({ state }, data) {
    return new Promise((resolve, rejust) => {
      updateNew({
        id: data.id,
        category_id: data.category_id,
        content_title: data.title,
        content_detail: data.detail,
        is_recommend: data.is_recommend ? 1 : 0
      }).then(res => {
        resolve()
      }).catch(err => {
        rejust(err)
      })
    })
  },
  getDetail({ commit, state }, data) {
    return new Promise((resolve, rejust) => {
      getDetail({
        id: data
      }).then(res => {
        commit('SET_DETAIL', res.detail.contentDetail)
        resolve()
      }).catch(err => {
        rejust(err)
      })
    })
  },
  getCategory({ commit }) {
    return new Promise((resolve, rejust) => {
      getCategoryList()
        .then(res => {
          commit('SET_CATEGORY_LIST', res.list_simple)
          resolve()
        })
        .catch(err => {
          rejust(err)
        })
    })
  },
  updateCategory({ commit }, data) {
    return new Promise((resolve, rejust) => {
      updateCategory({
        id: data.SelectId,
        category_name: data.name,
        category_pid: data.value
      })
        .then(res => {
          resolve()
        })
        .catch(err => {
          rejust(err)
        })
    })
  },
  deleteCategory({ commit }, data) {
    return new Promise((resolve, rejust) => {
      deleteCategory({
        id: data
      })
        .then(res => {
          resolve()
        })
        .catch(err => {
          rejust(err)
        })
    })
  },
  changeRecommend({ commit }, data) {
    return new Promise((resolve, rejust) => {
      changeRecommend({
        id: data.id,
        recommend: data.recommend ? 1 : 0
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
