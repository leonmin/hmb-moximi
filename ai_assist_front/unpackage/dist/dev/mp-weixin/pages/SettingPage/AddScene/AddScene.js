(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/SettingPage/AddScene/AddScene"],{

/***/ 545:
/*!*************************************************************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/main.js?{"page":"pages%2FSettingPage%2FAddScene%2FAddScene"} ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _AddScene = _interopRequireDefault(__webpack_require__(/*! ./pages/SettingPage/AddScene/AddScene.vue */ 546));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_AddScene.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 546:
/*!****************************************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/pages/SettingPage/AddScene/AddScene.vue ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddScene_vue_vue_type_template_id_f3c24b7a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddScene.vue?vue&type=template&id=f3c24b7a& */ 547);
/* harmony import */ var _AddScene_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddScene.vue?vue&type=script&lang=js& */ 549);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _AddScene_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _AddScene_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _AddScene_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AddScene.vue?vue&type=style&index=0&lang=css& */ 551);
/* harmony import */ var _HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../HBuilderX/HBuilderX.2.4.2.20191115/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 18);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AddScene_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AddScene_vue_vue_type_template_id_f3c24b7a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AddScene_vue_vue_type_template_id_f3c24b7a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _AddScene_vue_vue_type_template_id_f3c24b7a___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

/* hot reload */
if (false) { var api; }
component.options.__file = "colorUI/ai_chat_front/ai_assist_front/pages/SettingPage/AddScene/AddScene.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 547:
/*!***********************************************************************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/pages/SettingPage/AddScene/AddScene.vue?vue&type=template&id=f3c24b7a& ***!
  \***********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_AddScene_vue_vue_type_template_id_f3c24b7a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX/HBuilderX.2.4.2.20191115/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../HBuilderX/HBuilderX.2.4.2.20191115/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../HBuilderX/HBuilderX.2.4.2.20191115/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../HBuilderX/HBuilderX.2.4.2.20191115/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../HBuilderX/HBuilderX.2.4.2.20191115/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX/HBuilderX.2.4.2.20191115/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./AddScene.vue?vue&type=template&id=f3c24b7a& */ 548);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_AddScene_vue_vue_type_template_id_f3c24b7a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_AddScene_vue_vue_type_template_id_f3c24b7a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_AddScene_vue_vue_type_template_id_f3c24b7a___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_AddScene_vue_vue_type_template_id_f3c24b7a___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 548:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/colorUI/ai_chat_front/ai_assist_front/pages/SettingPage/AddScene/AddScene.vue?vue&type=template&id=f3c24b7a& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 549:
/*!*****************************************************************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/pages/SettingPage/AddScene/AddScene.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_AddScene_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX/HBuilderX.2.4.2.20191115/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../HBuilderX/HBuilderX.2.4.2.20191115/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../HBuilderX/HBuilderX.2.4.2.20191115/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../HBuilderX/HBuilderX.2.4.2.20191115/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX/HBuilderX.2.4.2.20191115/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./AddScene.vue?vue&type=script&lang=js& */ 550);
/* harmony import */ var _HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_AddScene_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_AddScene_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_AddScene_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_AddScene_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_AddScene_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 550:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/colorUI/ai_chat_front/ai_assist_front/pages/SettingPage/AddScene/AddScene.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;





















































































































var _api = __webpack_require__(/*! ../../../utils/api.js */ 43);var uniIcons = function uniIcons() {return Promise.all(/*! import() | components/uni-icons/uni-icons */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/uni-icons/uni-icons")]).then(__webpack_require__.bind(null, /*! ../../../components/uni-icons/uni-icons.vue */ 614));};








var jweixin = __webpack_require__(/*! jweixin-module */ 44);
var jishiInterval;var mpopup = function mpopup() {return __webpack_require__.e(/*! import() | components/xuan-popup/xuan-popup */ "components/xuan-popup/xuan-popup").then(__webpack_require__.bind(null, /*! ../../../components/xuan-popup/xuan-popup.vue */ 629));};

var RECTIME;var _default =
{
  components: {
    uniIcons: uniIcons,
    mpopup: mpopup },

  data: function data() {
    return {
      openInput: "",
      recStatus: "按住我开始录音",
      recComplete: false,
      isleft: true,
      isRight: false,
      progerssShow: false,
      recordTipShow: {
        opacity: "1" },

      isRec: false,
      ttsScene: '',
      isSave: false,
      isPlay: true,
      confirmShow: false,
      failShow: false,
      jsData: "",
      isDisable: true,
      localId: "",
      sceneName: '', //场景名称
      serverId: '',
      jishi: 0,
      xiaomiSucc: false,
      mobile: '',
      isJishi: false,
      startTime: '', //录音开始时间
      endTime: '', // 录音结束时间
      timeConsum: 0, //总耗时
      sceneId: '', //场景id
      PrologueGet: '', //场景详情
      ttsKey: '',
      sceneType: '',
      sceneDefId: '' };


  },
  onLoad: function onLoad(options) {
    uni.showToast({
      title: '加载中...',
      icon: 'none' });

    if (options.id) {
      this.sceneId = options.id;
      // 编辑场景
      this.prologueGet();
    }
    // 得到JSSDK
    this.getJsAPI();
    // 查询当前音色
    this.checkTtsScene();
  },
  methods: {
    // 查询当前音色
    checkTtsScene: function checkTtsScene() {var _this2 = this;
      var params = {};
      this.$request.url_request(_api.TTSSCENE, params, 'GET', function (res) {
        uni.hideToast();
        _this2.ttsScene = JSON.parse(res.data).data.data;
        console.log('sdadada', _this2.ttsScene);
      }, function (err) {});
    },
    // 编辑场景
    prologueGet: function prologueGet() {var _this3 = this;
      var params = {
        id: this.sceneId };

      this.$request.url_request(_api.PROLOGUEGET, params, 'GET', function (res) {
        _this3.PrologueGet = JSON.parse(res.data).data.data;
        _this3.sceneName = _this3.PrologueGet.name;
        _this3.openInput = _this3.PrologueGet.customText;
        _this3.ttsKey = _this3.PrologueGet.ttsKey,
        _this3.sceneType = _this3.PrologueGet.sceneType;
        _this3.sceneDefId = _this3.PrologueGet.sceneDefId;
      }, function (err) {});
    },
    // 获得jssdk
    getJsAPI: function getJsAPI() {var _this4 = this;
      var that = this;
      var params = {};
      this.$request.url_request(_api.JSAPI, params, "GET", function (res) {
        _this4.jsData = JSON.parse(res.data).data;
        console.log("开场白得到的签名", _this4.jsData.signature);
        jweixin.config({
          appId: _this4.jsData.appId,
          timestamp: _this4.jsData.timestamp,
          nonceStr: _this4.jsData.nonceStr,
          signature: _this4.jsData.signature,
          jsApiList: ['startRecord', 'stopRecord', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice',
          'onVoicePlayEnd'] }),


        jweixin.ready(function () {
          console.log("接口处理成功");
        }),
        jweixin.error(function () {
          console.log("接口处理失败");
        });
      }, function (err) {});
    },
    // 小秘说
    xiaomishuo: function xiaomishuo() {
      this.isDisable = true;
      console.log('自己录', this.isDisable);
      this.xiaomiSucc = false;
      this.isleft = true,
      this.isRight = false;
    },
    // 小秘取消
    cancelXiaomi: function cancelXiaomi() {
      this.xiaomiSucc = false;
    },
    // 小米说保存
    saveXiaomi: function saveXiaomi() {
      this.xiaomiSucc = true;
    },
    // 小米说确认保存
    confirmXiaomi: function confirmXiaomi() {var _this5 = this;
      var params = {
        customText: this.openInput,
        name: this.sceneName,
        id: this.sceneId,
        ttsKey: this.ttsKey,
        sceneType: this.sceneType,
        sceneDefId: this.sceneDefId };

      this.$request.url_request(_api.SETTEXTPROLOGUE, params, 'GET', function (res) {
        if (JSON.parse(res.data).code == 200) {
          uni.showToast({
            title: '保存成功！',
            icon: 'success',
            mask: true,
            duration: 1000 });

          _this5.xiaomiSucc = false;
          setTimeout(function () {
            uni.reLaunch({
              url: '../Setting/Setting' });

          }, 1000);
        } else {
          if (JSON.parse(res.data).resultMsg !== null || JSON.parse(res.data).resultMsg !== '') {
            _this5.xiaomiSucc = false;
            uni.showToast({
              title: JSON.parse(res.data).resultMsg,
              icon: 'none',
              duration: 1200 });

          }
        }
      }, function (err) {
        console.log("文本保存失败");
      });

    },
    // 小米说删除
    delXiaomi: function delXiaomi() {},
    // 自己录
    gotoSelfRecord: function gotoSelfRecord() {
      console.log('自己录', this.isDisable);
      this.isDisable = false;
      this.btnShow = false,
      this.isleft = false,
      this.isRight = true;
    },
    // 开始录音
    startRec: function startRec() {
      var that = this;
      this.isJishi = true;
      this.jishi = 0;
      this.startTime = new Date().getTime();
      this.progerssShow = true,
      this.recordTipShow.opacity = "0",
      this.isRec = true,
      this.recStatus = "放开我停止录音",
      this.isPlay = true,
      console.log("开始录音");
      // 开始录音
      jweixin.startRecord();
      // 录音计时
      jishiInterval = setInterval(function () {
        that.jishi++;
      }, 1000);

    },
    // 停止录音
    stopRec: function stopRec() {
      clearInterval(jishiInterval);
      this.isJishi = false;
      this.endTime = new Date().getTime();
      this.timeConsum = this.endTime - this.startTime;
      console.log(this.timeConsum);
      var that = this;
      if (this.timeConsum / 1000 < 3) {
        uni.showModal({
          content: '录音不足3秒',
          showCancel: false });

      } else {
        var _this = this;
        this.isSave = true,
        this.recComplete = true;
        jweixin.stopRecord({
          success: function success(res) {
            _this.localId = res.localId;
            uni.showToast({
              title: '录音完成',
              icon: 'none',
              mask: true,
              duration: 1000 });

          } });

      }

      this.progerssShow = false,
      this.recordTipShow.opacity = "1",
      this.isRec = false,
      this.recStatus = "按住我开始录音",
      this.isPlay = false;
    },
    // 录音试听
    playRecord: function playRecord() {
      var _this = this;
      console.log("试听的localId", this.localId);
      if (this.localId == '') {
        uni.showModal({
          content: '请先录制一段声音！',
          showCancel: false });

      } else {
        jweixin.playVoice({
          localId: _this.localId });

      }

    },

    // 删除录音
    delRec: function delRec() {
      if (this.localId == '') {
        this.failShow = false;
        uni.showModal({
          content: '请先录音！',
          showCancel: false });

      } else {
        this.isJishi = false;
        this.confirmShow = true;
      }
    },
    // 保存录音
    confirmSave: function confirmSave() {
      if (this.localId == '') {
        this.failShow = false;
        uni.showModal({
          content: '请先录音！',
          showCancel: false });

      } else {
        this.isJishi = false;
        this.failShow = true;
      }

    },
    // 上传语音 保存录音
    saveRecord: function saveRecord() {
      var _this = this;
      if (this.localId == '') {
        this.failShow = false;
        uni.showModal({
          content: '请先录音！',
          showCancel: false });

      } else {
        console.log('得到的录音时间', this.timeConsum);
        jweixin.uploadVoice({
          localId: _this.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function success(res) {var _this6 = this;
            _this.serverId = res.serverId; // 返回音频的服务器端ID
            var params = {
              serverId: _this.serverId,
              voiceLength: _this.timeConsum,
              name: _this.sceneName,
              id: _this.sceneId,
              ttsKey: _this.ttsScene.ttsKey,
              sceneType: _this.ttsScene.sceneType,
              sceneDefId: _this.ttsScene.sceneDefId,
              customText: "自定义语音开场白" };

            console.log('录音参数', params);
            _this.$request.url_request(_api.SETVOICEPROLOGUE, params, 'GET', function (res) {
              if (JSON.parse(res.data).code == 200) {
                console.log("录音上传成功！");
                uni.showToast({
                  title: '保存成功!',
                  icon: 'success',
                  duration: 1000 });

                setTimeout(function () {
                  uni.reLaunch({
                    url: '../Setting/Setting' });

                }, 1000);
                _this.confirmShow = false,
                _this.failShow = false;
                _this.isJishi = false;
              } else {
                if (JSON.parse(res.data).resultMsg !== null || JSON.parse(res.data).resultMsg !== '') {
                  _this6.xiaomiSucc = false;
                  uni.showToast({
                    title: JSON.parse(res.data).resultMsg,
                    icon: 'none',
                    duration: 1200 });

                }
              }

            }, function (err) {

              uni.showToast({
                title: '保存失败!',
                icon: 'none',
                duration: 1000 });

              console.log("录音上传失败！");
            });
          } });

        this.confirmShow = false,
        this.failShow = false;
      }
    },
    // 取消录音
    cancelSave: function cancelSave() {
      this.isJishi = false;
      this.confirmShow = false,
      this.failShow = false;
    },
    confirmCancel: function confirmCancel() {
      this.isJishi = false;
      this.confirmShow = false;
    },
    // 返回上一页
    goback: function goback() {
      uni.navigateBack({
        delta: 1 });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 551:
/*!*************************************************************************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/pages/SettingPage/AddScene/AddScene.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_AddScene_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX/HBuilderX.2.4.2.20191115/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../HBuilderX/HBuilderX.2.4.2.20191115/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../../../HBuilderX/HBuilderX.2.4.2.20191115/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../../../HBuilderX/HBuilderX.2.4.2.20191115/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../HBuilderX/HBuilderX.2.4.2.20191115/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../../HBuilderX/HBuilderX.2.4.2.20191115/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX/HBuilderX.2.4.2.20191115/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./AddScene.vue?vue&type=style&index=0&lang=css& */ 552);
/* harmony import */ var _HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_AddScene_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_AddScene_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_AddScene_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_AddScene_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_2_4_2_20191115_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_AddScene_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 552:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/colorUI/ai_chat_front/ai_assist_front/pages/SettingPage/AddScene/AddScene.vue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[[545,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/SettingPage/AddScene/AddScene.js.map