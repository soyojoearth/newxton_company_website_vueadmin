/* eslint-disable no-unused-vars */
import {
  getNewList, deleteNew, createNew,
  updateNew, getDetail, getCategoryList,
  updateCategory, deleteCategory, changeRecommend, swapData, createCategoryList
} from '@/api/new'
import Vue from 'vue'

const state = {
  ListData: [],
  CategoryListData: [],
  ListNumber: 1,
  Detail: {},
  pageCount: 0
}

const mutations = {
  SET_LIST_DATA: (state, arr) => {
    state.ListData = arr
    console.log(state.ListData)
  },
  SET_LIST_NUMBER: (state, number) => {
    state.ListNumber = number
  },
  SET_DETAIL: (state, data) => {
    state.Detail[data.id] = data.detail
  },
  SET_CATEGORY_LIST: (state, data) => {
    state.CategoryListData = data
  },
  SET_PAGE_COUNT: (state, data) => {
    state.pageCount = data
  },
  SWAP_LIST_DATA: (state, data) => {
    let temps = {}
    const { actionIndex, index } = data
    temps = state.ListData[actionIndex]
    Vue.set(state.ListData, actionIndex, state.ListData[index])
    Vue.set(state.ListData, index, temps)
  }
}

const actions = {
  getList ({ commit, state }, params) {
    params['page_number'] = state.ListNumber
    return new Promise((resolve, rejust) => {
      getNewList(params).then(res => {
        commit('SET_LIST_DATA', res.list)
        commit('SET_PAGE_COUNT', res.page_count)

        resolve()
      }).catch(err => {
        rejust(err)
      })
    })
  },
  deleteNew ({ state }, id) {
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
  createNew ({ state }, data) {
    return new Promise((resolve, rejust) => {
      createNew({
        category_id: data.category_id,
        content_title: data.title,
        content_detail: data.detail,
        is_recommend: data.is_recommend
      }).then(res => {
        resolve(res)
      }).catch(err => {
        rejust(err)
      })
    })
  },
  updateNew ({ state }, data) {
    return new Promise((resolve, rejust) => {
      updateNew({
        id: data.id,
        category_id: data.category_id,
        content_title: data.title,
        content_detail: data.detail,
        is_recommend: data.is_recommend ? 1 : 0
      }).then(res => {
        resolve(res)
      }).catch(err => {
        rejust(err)
      })
    })
  },
  getDetail ({ commit, state }, data) {
    return new Promise((resolve, rejust) => {
      getDetail({
        id: data
      }).then(res => {
        commit('SET_DETAIL', { id: data, detail: res.detail.contentDetail })
        resolve()
      }).catch(err => {
        rejust(err)
      })
    })
  },
  getCategory ({ commit }) {
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
  updateCategory ({ commit }, data) {
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
  deleteCategory ({ commit }, data) {
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
  changeRecommend ({ commit }, data) {
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
  },
  swapData ({ state }, data) {
    return new Promise((resolve, rejust) => {
      swapData({
        news_id_a: data.a_id,
        news_id_b: data.b_id
      })
        .then(res => {
          resolve()
        })
        .catch(err => {
          rejust(err)
        })
    })
  },
  createCategoryList ({ state }, data) {
    return new Promise((resolve, rejust) => {
      createCategoryList({
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
