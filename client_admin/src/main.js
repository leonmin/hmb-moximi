import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import VueClipboard from 'vue-clipboard2'
import '@/permission' // permission control

// 复制到粘贴板插件
import Vueclipboard from 'vue-clipboard2'
Vueclipboard.config.autoSetContainer = true
Vue.use(Vueclipboard)

/* 手机号处理*/
Vue.filter('formatTel', function(value) {
  if (!value) return ''
  value = value.toString()
  return value.substr(0, 3) + '****' + value.substr(7)
})
// 分转元
Vue.filter('formatMoney', function(number) {
//     var number = +val.replace(/[^\d.]/g, '');
  return isNaN(number) ? 0.00 : parseFloat((number / 100).toFixed(2))
})

/* 判断是否过期*/
Vue.filter('formatDate', function(endTime) {
  const date = new Date()
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  let h = date.getHours()
  let f = date.getMinutes()
  let s = date.getSeconds()
  m = m + ''
  d = d + ''
  h = h + ''
  f = f + ''
  s = s + ''
  if (m.length < 2) {
    m = '0' + m
  }
  if (d.length < 2) {
    d = '0' + d
  }
  if (h.length < 2) {
    h = '0' + h
  }
  if (f.length < 2) {
    f = '0' + f
  }
  if (s.length < 2) {
    s = '0' + s
  }
  const nowDate = y + '-' + m + '-' + d + ' ' + h + ':' + f + ':' + s
  if (nowDate > endTime) {
    return '已过期'
  } else {
    return '未过期'
  }
})

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
