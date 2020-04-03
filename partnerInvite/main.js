import Vue from 'vue'
import App from './App'
import JsEncrypt  from 'jsencrypt'
import jse from './utils/jsencryptKey.js'
Vue.prototype.$jsEncrypt  = JsEncrypt

Vue.config.productionTip = false
import Request from "./utils/request.js"
Vue.prototype.$request = Request;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
