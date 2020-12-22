import {
  getProductList, updateProduct, swapProduct, deleteProduct, getProductDetail, getProductPictureList, createProduct, createProductCategory, deleteProductCategory, updateProductCategory, getProductCategoryList,
  changeRecommend, changeIsHot, changeIsNew, changeIsSelling, createFromOther
} from '@/api/product'
import Vue from 'vue'
const state = {
  ListData: [],
  CategoryListData: [],
  ListNumber: 1,
  Detail: '',
  PicList: [],
  allDetail: [],
  pageCount: 0,
  createFromOtherStatus: Number,
  createFromResult: {}
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
  SET_ALLDETAIL: (state, detail) => {
    state.allDetail = detail
  },
  SET_PICLIST: (state, picList) => {
    state.PicList = picList
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
  },
  CREATE_FROM_OTHER_STATUS: (state, data) => {
    state.createFromOtherStatus = data
  },
  CREATE_FROM_RESULT: (state, data) => {
    state.createFromResult = data
  }

}

const actions = {



  getList ({ commit, state }, params) {
    Vue.prototype.$myLoading.myLoading.loading()

    params['page_number'] = state.ListNumber
    // console.log(params);
    return new Promise((resolve, reject) => {
      getProductList(params).then(res => {
        res.result.list.forEach((element,index) => {
          res.result.list[index]["NewCommissionRate"]=element.commissionRate
        });
        commit('SET_LIST_DATA', res.result.list)
        commit('SET_PAGE_COUNT', res.result.count)
        Vue.prototype.$myLoading.myLoading.closeLoading()
        resolve()
      }).catch(err => {
        Vue.prototype.$myLoading.myLoading.closeLoading()
        reject(err)
      })


    })
  },
  deleteProduct ({ state }, id) {
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
  createProduct ({ state }, data) {
    return new Promise((resolve, reject) => {
      createProduct(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  swapData ({ state }, data) {
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
  updateProduct ({ state }, data) {
    return new Promise((resolve, reject) => {
      updateProduct(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getDetail ({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      getProductDetail({
        id: data
      }).then(res => {
        commit('SET_DETAIL', res.detail.productDescription)
        commit('SET_ALLDETAIL', res.detail)

        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getProductPictureList ({ commit, state }, data) {
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
  getCategory ({ commit }) {
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
  createCategory ({ state }, data) {
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
  updateCategory ({ commit }, data) {
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
  deleteCategory ({ commit }, data) {
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
  changeRecommend ({ commit }, data) {
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
  },
  changeIsHot ({ commit }, data) {
    return new Promise((resolve, reject) => {
      changeIsHot({
        id: data.id,
        set_hot: data.isHot ? 1 : 0
      })
        .then(res => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  changeIsNew ({ commit }, data) {
    return new Promise((resolve, reject) => {
      changeIsNew({
        id: data.id,
        set_new: data.isNew ? 1 : 0
      })
        .then(res => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  changeIsSelling ({ commit }, data) {
    return new Promise((resolve, reject) => {
      changeIsSelling({
        id: data.id,
        set_selling: data.isSelling ? 1 : 0
      })
        .then(res => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  createFromOther({ commit }, data) {
    Vue.prototype.$myLoading.myLoading.loading()
    return new Promise((resolve, reject) => {
      createFromOther(data).then(res => {
        commit('CREATE_FROM_OTHER_STATUS', res.status)
        commit('CREATE_FROM_RESULT', res.result)
        Vue.prototype.$myLoading.myLoading.closeLoading()
        resolve()
      }).catch(err => {
        Vue.prototype.$myLoading.myLoading.closeLoading()
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
