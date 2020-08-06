import {
  getProductList, updateProduct, swapProduct, deleteProduct, getProductDetail, getProductPictureList, createProduct, createProductCategory, deleteProductCategory, updateProductCategory, getProductCategoryList, changeRecommend
} from '@/api/product'
import Vue from 'vue'
const state = {
  ListData: [],
  CategoryListData: [],
  ListNumber: 1,
  Detail: '',
  PicList: []
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
  SET_PICLIST: (state, picList) => {
    state.PicList = picList
  },
  SET_CATEGORY_LIST: (state, data) => {
    state.CategoryListData = data
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
  getList({ commit, state }) {
    return new Promise((resolve, reject) => {
      getProductList({
        page_number: state.ListNumber
      }).then(res => {
        commit('SET_LIST_DATA', res.list)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  deleteProduct({ state }, id) {
    return new Promise((resolve, reject) => {
      deleteProduct({
        id: id
      }).then(res => {
        console.log(res)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  createProduct({ state }, data) {
    return new Promise((resolve, reject) => {
      createProduct(data).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  swapData({ state }, data) {
    return new Promise((resolve, rejust) => {
      swapProduct({
        product_id_a: data.a_id,
        product_id_b: data.b_id
      })
        .then(res => {
          resolve()
        })
        .catch(err => {
          rejust(err)
        })
    })
  },
  updateProduct({ state }, data) {
    return new Promise((resolve, reject) => {
      updateProduct(data).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getDetail({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      getProductDetail({
        id: data
      }).then(res => {
        commit('SET_DETAIL', res.detail.productDescription)

        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getProductPictureList({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      getProductPictureList({
        product_id: data
      }).then(res => {
        commit('SET_PICLIST', res.list)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getCategory({ commit }) {
    return new Promise((resolve, reject) => {
      getProductCategoryList()
        .then(res => {
          commit('SET_CATEGORY_LIST', res.list_simple)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  createCategory({ state }, data) {
    return new Promise((resolve, reject) => {
      createProductCategory({
        category_name: data.name,
        category_pid: data.value
      })
        .then(res => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  updateCategory({ commit }, data) {
    return new Promise((resolve, reject) => {
      updateProductCategory({
        id: data.SelectId,
        category_name: data.name,
        category_pid: data.value
      })
        .then(res => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  deleteCategory({ commit }, data) {
    return new Promise((resolve, reject) => {
      deleteProductCategory({
        id: data
      })
        .then(res => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  changeRecommend({ commit }, data) {
    return new Promise((resolve, reject) => {
      changeRecommend({
        id: data.id,
        recommend: data.recommend ? 1 : 0
      })
        .then(res => {
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
