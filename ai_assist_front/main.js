import Vue from 'vue'
import App from './App'
import './colorui/main.css'
import './colorui/icon.css'
import './components/comm.css'
import VueClipboard  from 'vue-clipboard2'
import WxValidate from './utils/WxValidate.js'
import Request from "./utils/request.js"
Vue.prototype.$request = Request;
Vue.config.productionTip = false
Vue.prototype.$validate = WxValidate;
Vue.use(VueClipboard)
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
