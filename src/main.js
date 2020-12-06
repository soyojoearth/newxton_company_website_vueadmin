import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import Ie from './Ie'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
import VueDND from 'awe-dnd'
import { IEVersion } from '@/utils'
import * as myLoading from '@/utils/loading'
Vue.use(VueDND)

import Print1 from 'vue-print-nb'
Vue.use(Print1)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
Vue.prototype.$myLoading = { myLoading }
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
import './styles/loading.css'
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
console.log(IEVersion())

// 判断是否为ie11;
if (IEVersion()) {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
} else {
  new Vue({
    el: '#app',
    render: h => h(Ie)
  })
}
