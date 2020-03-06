import Vue from 'vue'
import App from './App'
import JsEncrypt from 'jsencrypt'
import jse from './utils/jsencryptKey.js'
import clipboard from 'clipboard'	
Vue.prototype.$jsEncrypt  = JsEncrypt
Vue.prototype.clipboard = clipboard

Vue.config.productionTip = false
import Request from "./utils/request.js"
Vue.prototype.$request = Request;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
