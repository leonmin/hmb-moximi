(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = {
    multipleSlots: true,
    addGlobalClass: true };


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin']['options']) {
      Object.assign(options, vueOptions['mp-weixin']['options']);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 12:
/*!***********************************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/node_modules/query-string/index.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}
var strictUriEncode = __webpack_require__(/*! strict-uri-encode */ 13);
var decodeComponent = __webpack_require__(/*! decode-uri-component */ 14);
var splitOnFirst = __webpack_require__(/*! split-on-first */ 15);

function encoderForArrayFormat(options) {
  switch (options.arrayFormat) {
    case 'index':
      return function (key) {return function (result, value) {
          var index = result.length;
          if (value === undefined || options.skipNull && value === null) {
            return result;
          }

          if (value === null) {
            return [].concat(_toConsumableArray(result), [[encode(key, options), '[', index, ']'].join('')]);
          }

          return [].concat(_toConsumableArray(
          result), [
          [encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')]);

        };};

    case 'bracket':
      return function (key) {return function (result, value) {
          if (value === undefined || options.skipNull && value === null) {
            return result;
          }

          if (value === null) {
            return [].concat(_toConsumableArray(result), [[encode(key, options), '[]'].join('')]);
          }

          return [].concat(_toConsumableArray(result), [[encode(key, options), '[]=', encode(value, options)].join('')]);
        };};

    case 'comma':
      return function (key) {return function (result, value) {
          if (value === null || value === undefined || value.length === 0) {
            return result;
          }

          if (result.length === 0) {
            return [[encode(key, options), '=', encode(value, options)].join('')];
          }

          return [[result, encode(value, options)].join(',')];
        };};

    default:
      return function (key) {return function (result, value) {
          if (value === undefined || options.skipNull && value === null) {
            return result;
          }

          if (value === null) {
            return [].concat(_toConsumableArray(result), [encode(key, options)]);
          }

          return [].concat(_toConsumableArray(result), [[encode(key, options), '=', encode(value, options)].join('')]);
        };};}

}

function parserForArrayFormat(options) {
  var result;

  switch (options.arrayFormat) {
    case 'index':
      return function (key, value, accumulator) {
        result = /\[(\d*)\]$/.exec(key);

        key = key.replace(/\[\d*\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = {};
        }

        accumulator[key][result[1]] = value;
      };

    case 'bracket':
      return function (key, value, accumulator) {
        result = /(\[\])$/.exec(key);
        key = key.replace(/\[\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = [value];
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };

    case 'comma':
      return function (key, value, accumulator) {
        var isArray = typeof value === 'string' && value.split('').indexOf(',') > -1;
        var newValue = isArray ? value.split(',') : value;
        accumulator[key] = newValue;
      };

    default:
      return function (key, value, accumulator) {
        if (accumulator[key] === undefined) {
          accumulator[key] = value;
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };}

}

function encode(value, options) {
  if (options.encode) {
    return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
  }

  return value;
}

function decode(value, options) {
  if (options.decode) {
    return decodeComponent(value);
  }

  return value;
}

function keysSorter(input) {
  if (Array.isArray(input)) {
    return input.sort();
  }

  if (typeof input === 'object') {
    return keysSorter(Object.keys(input)).
    sort(function (a, b) {return Number(a) - Number(b);}).
    map(function (key) {return input[key];});
  }

  return input;
}

function removeHash(input) {
  var hashStart = input.indexOf('#');
  if (hashStart !== -1) {
    input = input.slice(0, hashStart);
  }

  return input;
}

function getHash(url) {
  var hash = '';
  var hashStart = url.indexOf('#');
  if (hashStart !== -1) {
    hash = url.slice(hashStart);
  }

  return hash;
}

function extract(input) {
  input = removeHash(input);
  var queryStart = input.indexOf('?');
  if (queryStart === -1) {
    return '';
  }

  return input.slice(queryStart + 1);
}

function parseValue(value, options) {
  if (options.parseNumbers && !Number.isNaN(Number(value)) && typeof value === 'string' && value.trim() !== '') {
    value = Number(value);
  } else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
    value = value.toLowerCase() === 'true';
  }

  return value;
}

function parse(input, options) {
  options = Object.assign({
    decode: true,
    sort: true,
    arrayFormat: 'none',
    parseNumbers: false,
    parseBooleans: false },
  options);

  var formatter = parserForArrayFormat(options);

  // Create an object with no prototype
  var ret = Object.create(null);

  if (typeof input !== 'string') {
    return ret;
  }

  input = input.trim().replace(/^[?#&]/, '');

  if (!input) {
    return ret;
  }var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {

    for (var _iterator = input.split('&')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var param = _step.value;var _splitOnFirst =
      splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '='),_splitOnFirst2 = _slicedToArray(_splitOnFirst, 2),key = _splitOnFirst2[0],value = _splitOnFirst2[1];

      // Missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
      value = value === undefined ? null : decode(value, options);
      formatter(decode(key, options), value, ret);
    }} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return != null) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}var _arr =

  Object.keys(ret);for (var _i = 0; _i < _arr.length; _i++) {var key = _arr[_i];
    var value = ret[key];
    if (typeof value === 'object' && value !== null) {var _arr2 =
      Object.keys(value);for (var _i2 = 0; _i2 < _arr2.length; _i2++) {var k = _arr2[_i2];
        value[k] = parseValue(value[k], options);
      }
    } else {
      ret[key] = parseValue(value, options);
    }
  }

  if (options.sort === false) {
    return ret;
  }

  return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce(function (result, key) {
    var value = ret[key];
    if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
      // Sort object keys, not values
      result[key] = keysSorter(value);
    } else {
      result[key] = value;
    }

    return result;
  }, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = function (object, options) {
  if (!object) {
    return '';
  }

  options = Object.assign({
    encode: true,
    strict: true,
    arrayFormat: 'none' },
  options);

  var formatter = encoderForArrayFormat(options);

  var objectCopy = Object.assign({}, object);
  if (options.skipNull) {var _arr3 =
    Object.keys(objectCopy);for (var _i3 = 0; _i3 < _arr3.length; _i3++) {var key = _arr3[_i3];
      if (objectCopy[key] === undefined || objectCopy[key] === null) {
        delete objectCopy[key];
      }
    }
  }

  var keys = Object.keys(objectCopy);

  if (options.sort !== false) {
    keys.sort(options.sort);
  }

  return keys.map(function (key) {
    var value = object[key];

    if (value === undefined) {
      return '';
    }

    if (value === null) {
      return encode(key, options);
    }

    if (Array.isArray(value)) {
      return value.
      reduce(formatter(key), []).
      join('&');
    }

    return encode(key, options) + '=' + encode(value, options);
  }).filter(function (x) {return x.length > 0;}).join('&');
};

exports.parseUrl = function (input, options) {
  return {
    url: removeHash(input).split('?')[0] || '',
    query: parse(extract(input), options) };

};

exports.stringifyUrl = function (input, options) {
  var url = removeHash(input.url).split('?')[0] || '';
  var queryFromUrl = exports.extract(input.url);
  var parsedQueryFromUrl = exports.parse(queryFromUrl);
  var hash = getHash(input.url);
  var query = Object.assign(parsedQueryFromUrl, input.query);
  var queryString = exports.stringify(query, options);
  if (queryString) {
    queryString = "?".concat(queryString);
  }

  return "".concat(url).concat(queryString).concat(hash);
};

/***/ }),

/***/ 13:
/*!****************************************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/node_modules/strict-uri-encode/index.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {return encodeURIComponent(str).replace(/[!'()*]/g, function (x) {return "%".concat(x.charCodeAt(0).toString(16).toUpperCase());});};

/***/ }),

/***/ 14:
/*!****************************************************!*\
  !*** ./node_modules/decode-uri-component/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),

/***/ 15:
/*!*************************************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/node_modules/split-on-first/index.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (string, separator) {
  if (!(typeof string === 'string' && typeof separator === 'string')) {
    throw new TypeError('Expected the arguments to be of type `string`');
  }

  if (separator === '') {
    return [string];
  }

  var separatorIndex = string.indexOf(separator);

  if (separatorIndex === -1) {
    return [string];
  }

  return [
  string.slice(0, separatorIndex),
  string.slice(separatorIndex + separator.length)];

};

/***/ }),

/***/ 18:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    options.components = Object.assign(components, options.components || {})
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 19:
/*!*****************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/colorui/main.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    } else {
      console.error(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!*****************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/colorui/icon.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 21:
/*!********************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/components/comm.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 22:
/*!*******************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/utils/commonURL.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // const mainURL = "https://api-test.jkhelper.com/api.php" 
// const mainURL = "https://api-dev.jkhelper.com/api.php"
// const mainURL = "https://api.jkhelper.com/api.php"


/*
*	正式
* */
// const mainURL = "https://m.checkshirt-ai.com"
// const shareURL = "https://m.checkshirt-ai.com/index.html#/pages/JumpLogin/JumpLogin"

/*
*	测试
* */
var mainURL = "http://m.t.checkshirt-ai.com";
var shareURL = "http://m.t.checkshirt-ai.com/index.html#/pages/JumpLogin/JumpLogin";var _default =


{
  mainURL: mainURL,
  shareURL: shareURL };exports.default = _default;

/***/ }),

/***/ 23:
/*!*********************************************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/node_modules/vue-clipboard2/vue-clipboard.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var Clipboard = __webpack_require__(/*! clipboard/dist/clipboard.min.js */ 24); // FIXME: workaround for browserify

var VueClipboardConfig = {
  autoSetContainer: false,
  appendToBody: true // This fixes IE, see #50
};

var VueClipboard = {
  install: function install(Vue) {
    Vue.prototype.$clipboardConfig = VueClipboardConfig;
    Vue.prototype.$copyText = function (_text, container) {
      return new Promise(function (resolve, reject) {
        var fakeElement = document.createElement('button');
        var clipboard = new Clipboard(fakeElement, {
          text: function text() {return _text;},
          action: function action() {return 'copy';},
          container: typeof container === 'object' ? container : document.body });

        clipboard.on('success', function (e) {
          clipboard.destroy();
          resolve(e);
        });
        clipboard.on('error', function (e) {
          clipboard.destroy();
          reject(e);
        });
        if (VueClipboardConfig.appendToBody) document.body.appendChild(fakeElement);
        fakeElement.click();
        if (VueClipboardConfig.appendToBody) document.body.removeChild(fakeElement);
      });
    };

    Vue.directive('clipboard', {
      bind: function bind(el, binding, vnode) {
        if (binding.arg === 'success') {
          el._vClipboard_success = binding.value;
        } else if (binding.arg === 'error') {
          el._vClipboard_error = binding.value;
        } else {
          var clipboard = new Clipboard(el, {
            text: function text() {return binding.value;},
            action: function action() {return binding.arg === 'cut' ? 'cut' : 'copy';},
            container: VueClipboardConfig.autoSetContainer ? el : undefined });

          clipboard.on('success', function (e) {
            var callback = el._vClipboard_success;
            callback && callback(e);
          });
          clipboard.on('error', function (e) {
            var callback = el._vClipboard_error;
            callback && callback(e);
          });
          el._vClipboard = clipboard;
        }
      },
      update: function update(el, binding) {
        if (binding.arg === 'success') {
          el._vClipboard_success = binding.value;
        } else if (binding.arg === 'error') {
          el._vClipboard_error = binding.value;
        } else {
          el._vClipboard.text = function () {return binding.value;};
          el._vClipboard.action = function () {return binding.arg === 'cut' ? 'cut' : 'copy';};
        }
      },
      unbind: function unbind(el, binding) {
        if (binding.arg === 'success') {
          delete el._vClipboard_success;
        } else if (binding.arg === 'error') {
          delete el._vClipboard_error;
        } else {
          el._vClipboard.destroy();
          delete el._vClipboard;
        }
      } });

  },
  config: VueClipboardConfig };


if (true) {
  module.exports = VueClipboard;
} else {}

/***/ }),

/***/ 24:
/*!*********************************************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/node_modules/clipboard/dist/clipboard.min.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 /*!
               * clipboard.js v2.0.4
               * https://zenorocha.github.io/clipboard.js
               * 
               * Licensed MIT © Zeno Rocha
               */
!function (t, e) { true ? module.exports = e() : undefined;}(void 0, function () {return function (n) {var o = {};function r(t) {if (o[t]) return o[t].exports;var e = o[t] = { i: t, l: !1, exports: {} };return n[t].call(e.exports, e, e.exports, r), e.l = !0, e.exports;}return r.m = n, r.c = o, r.d = function (t, e, n) {r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });}, r.r = function (t) {"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });}, r.t = function (e, t) {if (1 & t && (e = r(e)), 8 & t) return e;if (4 & t && "object" == typeof e && e && e.__esModule) return e;var n = Object.create(null);if (r.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var o in e) {r.d(n, o, function (t) {return e[t];}.bind(null, o));}return n;}, r.n = function (t) {var e = t && t.__esModule ? function () {return t.default;} : function () {return t;};return r.d(e, "a", e), e;}, r.o = function (t, e) {return Object.prototype.hasOwnProperty.call(t, e);}, r.p = "", r(r.s = 0);}([function (t, e, n) {"use strict";var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {return typeof t;} : function (t) {return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;},i = function () {function o(t, e) {for (var n = 0; n < e.length; n++) {var o = e[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o);}}return function (t, e, n) {return e && o(t.prototype, e), n && o(t, n), t;};}(),a = o(n(1)),c = o(n(3)),u = o(n(4));function o(t) {return t && t.__esModule ? t : { default: t };}var l = function (t) {function o(t, e) {!function (t, e) {if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");}(this, o);var n = function (t, e) {if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != typeof e && "function" != typeof e ? t : e;}(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this));return n.resolveOptions(e), n.listenClick(t), n;}return function (t, e) {if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);}(o, c.default), i(o, [{ key: "resolveOptions", value: function value() {var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};this.action = "function" == typeof t.action ? t.action : this.defaultAction, this.target = "function" == typeof t.target ? t.target : this.defaultTarget, this.text = "function" == typeof t.text ? t.text : this.defaultText, this.container = "object" === r(t.container) ? t.container : document.body;} }, { key: "listenClick", value: function value(t) {var e = this;this.listener = (0, u.default)(t, "click", function (t) {return e.onClick(t);});} }, { key: "onClick", value: function value(t) {var e = t.delegateTarget || t.currentTarget;this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new a.default({ action: this.action(e), target: this.target(e), text: this.text(e), container: this.container, trigger: e, emitter: this });} }, { key: "defaultAction", value: function value(t) {return s("action", t);} }, { key: "defaultTarget", value: function value(t) {var e = s("target", t);if (e) return document.querySelector(e);} }, { key: "defaultText", value: function value(t) {return s("text", t);} }, { key: "destroy", value: function value() {this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null);} }], [{ key: "isSupported", value: function value() {var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"],e = "string" == typeof t ? [t] : t,n = !!document.queryCommandSupported;return e.forEach(function (t) {n = n && !!document.queryCommandSupported(t);}), n;} }]), o;}();function s(t, e) {var n = "data-clipboard-" + t;if (e.hasAttribute(n)) return e.getAttribute(n);}t.exports = l;}, function (t, e, n) {"use strict";var o,r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {return typeof t;} : function (t) {return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;},i = function () {function o(t, e) {for (var n = 0; n < e.length; n++) {var o = e[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o);}}return function (t, e, n) {return e && o(t.prototype, e), n && o(t, n), t;};}(),a = n(2),c = (o = a) && o.__esModule ? o : { default: o };var u = function () {function e(t) {!function (t, e) {if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");}(this, e), this.resolveOptions(t), this.initSelection();}return i(e, [{ key: "resolveOptions", value: function value() {var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};this.action = t.action, this.container = t.container, this.emitter = t.emitter, this.target = t.target, this.text = t.text, this.trigger = t.trigger, this.selectedText = "";} }, { key: "initSelection", value: function value() {this.text ? this.selectFake() : this.target && this.selectTarget();} }, { key: "selectFake", value: function value() {var t = this,e = "rtl" == document.documentElement.getAttribute("dir");this.removeFake(), this.fakeHandlerCallback = function () {return t.removeFake();}, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[e ? "right" : "left"] = "-9999px";var n = window.pageYOffset || document.documentElement.scrollTop;this.fakeElem.style.top = n + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = (0, c.default)(this.fakeElem), this.copyText();} }, { key: "removeFake", value: function value() {this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null);} }, { key: "selectTarget", value: function value() {this.selectedText = (0, c.default)(this.target), this.copyText();} }, { key: "copyText", value: function value() {var e = void 0;try {e = document.execCommand(this.action);} catch (t) {e = !1;}this.handleResult(e);} }, { key: "handleResult", value: function value(t) {this.emitter.emit(t ? "success" : "error", { action: this.action, text: this.selectedText, trigger: this.trigger, clearSelection: this.clearSelection.bind(this) });} }, { key: "clearSelection", value: function value() {this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges();} }, { key: "destroy", value: function value() {this.removeFake();} }, { key: "action", set: function set() {var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "copy";if (this._action = t, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"');}, get: function get() {return this._action;} }, { key: "target", set: function set(t) {if (void 0 !== t) {if (!t || "object" !== (void 0 === t ? "undefined" : r(t)) || 1 !== t.nodeType) throw new Error('Invalid "target" value, use a valid Element');if ("copy" === this.action && t.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if ("cut" === this.action && (t.hasAttribute("readonly") || t.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target = t;}}, get: function get() {return this._target;} }]), e;}();t.exports = u;}, function (t, e) {t.exports = function (t) {var e;if ("SELECT" === t.nodeName) t.focus(), e = t.value;else if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName) {var n = t.hasAttribute("readonly");n || t.setAttribute("readonly", ""), t.select(), t.setSelectionRange(0, t.value.length), n || t.removeAttribute("readonly"), e = t.value;} else {t.hasAttribute("contenteditable") && t.focus();var o = window.getSelection(),r = document.createRange();r.selectNodeContents(t), o.removeAllRanges(), o.addRange(r), e = o.toString();}return e;};}, function (t, e) {function n() {}n.prototype = { on: function on(t, e, n) {var o = this.e || (this.e = {});return (o[t] || (o[t] = [])).push({ fn: e, ctx: n }), this;}, once: function once(t, e, n) {var o = this;function r() {o.off(t, r), e.apply(n, arguments);}return r._ = e, this.on(t, r, n);}, emit: function emit(t) {for (var e = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[t] || []).slice(), o = 0, r = n.length; o < r; o++) {n[o].fn.apply(n[o].ctx, e);}return this;}, off: function off(t, e) {var n = this.e || (this.e = {}),o = n[t],r = [];if (o && e) for (var i = 0, a = o.length; i < a; i++) {o[i].fn !== e && o[i].fn._ !== e && r.push(o[i]);}return r.length ? n[t] = r : delete n[t], this;} }, t.exports = n;}, function (t, e, n) {var d = n(5),h = n(6);t.exports = function (t, e, n) {if (!t && !e && !n) throw new Error("Missing required arguments");if (!d.string(e)) throw new TypeError("Second argument must be a String");if (!d.fn(n)) throw new TypeError("Third argument must be a Function");if (d.node(t)) return s = e, f = n, (l = t).addEventListener(s, f), { destroy: function destroy() {l.removeEventListener(s, f);} };if (d.nodeList(t)) return a = t, c = e, u = n, Array.prototype.forEach.call(a, function (t) {t.addEventListener(c, u);}), { destroy: function destroy() {Array.prototype.forEach.call(a, function (t) {t.removeEventListener(c, u);});} };if (d.string(t)) return o = t, r = e, i = n, h(document.body, o, r, i);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");var o, r, i, a, c, u, l, s, f;};}, function (t, n) {n.node = function (t) {return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType;}, n.nodeList = function (t) {var e = Object.prototype.toString.call(t);return void 0 !== t && ("[object NodeList]" === e || "[object HTMLCollection]" === e) && "length" in t && (0 === t.length || n.node(t[0]));}, n.string = function (t) {return "string" == typeof t || t instanceof String;}, n.fn = function (t) {return "[object Function]" === Object.prototype.toString.call(t);};}, function (t, e, n) {var a = n(7);function i(t, e, n, o, r) {var i = function (e, n, t, o) {return function (t) {t.delegateTarget = a(t.target, n), t.delegateTarget && o.call(e, t);};}.apply(this, arguments);return t.addEventListener(n, i, r), { destroy: function destroy() {t.removeEventListener(n, i, r);} };}t.exports = function (t, e, n, o, r) {return "function" == typeof t.addEventListener ? i.apply(null, arguments) : "function" == typeof n ? i.bind(null, document).apply(null, arguments) : ("string" == typeof t && (t = document.querySelectorAll(t)), Array.prototype.map.call(t, function (t) {return i(t, e, n, o, r);}));};}, function (t, e) {if ("undefined" != typeof Element && !Element.prototype.matches) {var n = Element.prototype;n.matches = n.matchesSelector || n.mozMatchesSelector || n.msMatchesSelector || n.oMatchesSelector || n.webkitMatchesSelector;}t.exports = function (t, e) {for (; t && 9 !== t.nodeType;) {if ("function" == typeof t.matches && t.matches(e)) return t;t = t.parentNode;}};}]);});

/***/ }),

/***/ 25:
/*!********************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/utils/WxValidate.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 表单验证
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * @param {Object} rules 验证字段的规则
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * @param {Object} messages 验证字段的提示信息
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   */var
WxValidate = /*#__PURE__*/function () {
  function WxValidate() {var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};_classCallCheck(this, WxValidate);
    Object.assign(this, {
      data: {},
      rules: rules,
      messages: messages });

    this.__init();
  }

  /**
     * __init
     */_createClass(WxValidate, [{ key: "__init", value: function __init()
    {
      this.__initMethods();
      this.__initDefaults();
      this.__initData();
    }

    /**
       * 初始化数据
       */ }, { key: "__initData", value: function __initData()
    {
      this.form = {};
      this.errorList = [];
    }

    /**
       * 初始化默认提示信息
       */ }, { key: "__initDefaults", value: function __initDefaults()
    {
      this.defaults = {
        messages: {
          required: '这是必填字段。',
          email: '请输入有效的电子邮件地址。',
          tel: '请输入11位的手机号码。',
          url: '请输入有效的网址。',
          date: '请输入有效的日期。',
          dateISO: '请输入有效的日期（ISO），例如：2009-06-23，1998/01/22。',
          number: '请输入有效的数字。',
          digits: '只能输入数字。',
          idcard: '请输入18位的有效身份证。',
          equalTo: this.formatTpl('输入值必须和 {0} 相同。'),
          contains: this.formatTpl('输入值必须包含 {0}。'),
          minlength: this.formatTpl('最少要输入 {0} 个字符。'),
          maxlength: this.formatTpl('最多可以输入 {0} 个字符。'),
          rangelength: this.formatTpl('请输入长度在 {0} 到 {1} 之间的字符。'),
          min: this.formatTpl('请输入不小于 {0} 的数值。'),
          max: this.formatTpl('请输入不大于 {0} 的数值。'),
          range: this.formatTpl('请输入范围在 {0} 到 {1} 之间的数值。') } };


    }

    /**
       * 初始化默认验证方法
       */ }, { key: "__initMethods", value: function __initMethods()
    {
      var that = this;
      that.methods = {
        /**
                        * 验证必填元素
                        */
        required: function required(value, param) {
          if (!that.depend(param)) {
            return 'dependency-mismatch';
          } else if (typeof value === 'number') {
            value = value.toString();
          } else if (typeof value === 'boolean') {
            return !0;
          }

          return value.length > 0;
        },
        /**
            * 验证电子邮箱格式
            */
        email: function email(value) {
          return that.optional(value) ||
          /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.
          test(value);
        },
        /**
            * 提现金额
            */
        checkcash: function checkcash(value) {
          return that.optional(value) || value >= 100;
        },
        /**
            * 提现金额10元
            */
        checkcashTen: function checkcashTen(value) {
          return that.optional(value) || value >= 10;
        },
        /**
            * 验证手机格式
            */
        tel: function tel(value) {
          return that.optional(value) || /^1[23456789]\d{9}$/.test(value);
        },
        /**
            * 验证URL格式
            */
        url: function url(value) {
          return that.optional(value) ||
          /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.
          test(value);
        },
        /**
            * 验证日期格式
            */
        date: function date(value) {
          return that.optional(value) || !/Invalid|NaN/.test(new Date(value).toString());
        },
        /**
            * 验证ISO类型的日期格式
            */
        dateISO: function dateISO(value) {
          return that.optional(value) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
        },
        /**
            * 验证十进制数字
            */
        number: function number(value) {
          return that.optional(value) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
        },
        /**
            * 验证整数
            */
        digits: function digits(value) {
          return that.optional(value) || /^\d+$/.test(value);
        },
        /**
            * 验证身份证号码
            */
        idcard: function idcard(value) {
          return that.optional(value) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
          value);
        },
        /**
            * 验证两个输入框的内容是否相同
            */
        equalTo: function equalTo(value, param) {
          return that.optional(value) || value === that.data[param];
        },
        /**
            * 验证是否包含某个值
            */
        contains: function contains(value, param) {
          return that.optional(value) || value.indexOf(param) >= 0;
        },
        /**
            * 验证最小长度
            */
        minlength: function minlength(value, param) {
          return that.optional(value) || value.length >= param;
        },
        /**
            * 验证最大长度
            */
        maxlength: function maxlength(value, param) {
          return that.optional(value) || value.length <= param;
        },
        /**
            * 验证一个长度范围[min, max]
            */
        rangelength: function rangelength(value, param) {
          return that.optional(value) || value.length >= param[0] && value.length <= param[1];
        },
        /**
            * 验证最小值
            */
        min: function min(value, param) {
          return that.optional(value) || value >= param;
        },
        /**
            * 验证最大值
            */
        max: function max(value, param) {
          return that.optional(value) || value <= param;
        },
        /**
            * 验证一个值范围[min, max]
            */
        range: function range(value, param) {
          return that.optional(value) || value >= param[0] && value <= param[1];
        } };

    }

    /**
       * 添加自定义验证方法
       * @param {String} name 方法名
       * @param {Function} method 函数体，接收两个参数(value, param)，value表示元素的值，param表示参数
       * @param {String} message 提示信息
       */ }, { key: "addMethod", value: function addMethod(
    name, method, message) {
      this.methods[name] = method;
      this.defaults.messages[name] = message !== undefined ? message : this.defaults.messages[name];
    }

    /**
       * 判断验证方法是否存在
       */ }, { key: "isValidMethod", value: function isValidMethod(
    value) {
      var methods = [];
      for (var method in this.methods) {
        if (method && typeof this.methods[method] === 'function') {
          methods.push(method);
        }
      }
      return methods.indexOf(value) !== -1;
    }

    /**
       * 格式化提示信息模板
       */ }, { key: "formatTpl", value: function formatTpl(
    source, params) {
      var that = this;
      if (arguments.length === 1) {
        return function () {
          var args = Array.from(arguments);
          args.unshift(source);
          return that.formatTpl.apply(this, args);
        };
      }
      if (params === undefined) {
        return source;
      }
      if (arguments.length > 2 && params.constructor !== Array) {
        params = Array.from(arguments).slice(1);
      }
      if (params.constructor !== Array) {
        params = [params];
      }
      params.forEach(function (n, i) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function () {
          return n;
        });
      });
      return source;
    }

    /**
       * 判断规则依赖是否存在
       */ }, { key: "depend", value: function depend(
    param) {
      switch (typeof param) {
        case 'boolean':
          param = param;
          break;
        case 'string':
          param = !!param.length;
          break;
        case 'function':
          param = param();
        default:
          param = !0;}

      return param;
    }

    /**
       * 判断输入值是否为空
       */ }, { key: "optional", value: function optional(
    value) {
      return !this.methods.required(value) && 'dependency-mismatch';
    }

    /**
       * 获取自定义字段的提示信息
       * @param {String} param 字段名
       * @param {Object} rule 规则
       */ }, { key: "customMessage", value: function customMessage(
    param, rule) {
      var params = this.messages[param];
      var isObject = typeof params === 'object';
      if (params && isObject) return params[rule.method];
    }

    /**
       * 获取某个指定字段的提示信息
       * @param {String} param 字段名
       * @param {Object} rule 规则
       */ }, { key: "defaultMessage", value: function defaultMessage(
    param, rule) {
      var message = this.customMessage(param, rule) || this.defaults.messages[rule.method];
      var type = typeof message;

      if (type === 'undefined') {
        message = "Warning: No message defined for ".concat(rule.method, ".");
      } else if (type === 'function') {
        message = message.call(this, rule.parameters);
      }

      return message;
    }

    /**
       * 缓存错误信息
       * @param {String} param 字段名
       * @param {Object} rule 规则
       * @param {String} value 元素的值
       */ }, { key: "formatTplAndAdd", value: function formatTplAndAdd(
    param, rule, value) {
      var msg = this.defaultMessage(param, rule);

      this.errorList.push({
        param: param,
        msg: msg,
        value: value });

    }

    /**
       * 验证某个指定字段的规则
       * @param {String} param 字段名
       * @param {Object} rules 规则
       * @param {Object} data 需要验证的数据对象
       */ }, { key: "checkParam", value: function checkParam(
    param, rules, data) {

      // 缓存数据对象
      this.data = data;

      // 缓存字段对应的值
      var value = data[param] !== null && data[param] !== undefined ? data[param] : '';

      // 遍历某个指定字段的所有规则，依次验证规则，否则缓存错误信息
      for (var method in rules) {

        // 判断验证方法是否存在
        if (this.isValidMethod(method)) {

          // 缓存规则的属性及值
          var rule = {
            method: method,
            parameters: rules[method]


            // 调用验证方法
          };var result = this.methods[method](value, rule.parameters);

          // 若result返回值为dependency-mismatch，则说明该字段的值为空或非必填字段
          if (result === 'dependency-mismatch') {
            continue;
          }

          this.setValue(param, method, result, value);

          // 判断是否通过验证，否则缓存错误信息，跳出循环
          if (!result) {
            this.formatTplAndAdd(param, rule, value);
            break;
          }
        }
      }
    }

    /**
       * 设置字段的默认验证值
       * @param {String} param 字段名
       */ }, { key: "setView", value: function setView(
    param) {
      this.form[param] = {
        $name: param,
        $valid: true,
        $invalid: false,
        $error: {},
        $success: {},
        $viewValue: "" };

    }

    /**
       * 设置字段的验证值
       * @param {String} param 字段名
       * @param {String} method 字段的方法
       * @param {Boolean} result 是否通过验证
       * @param {String} value 字段的值
       */ }, { key: "setValue", value: function setValue(
    param, method, result, value) {
      var params = this.form[param];
      params.$valid = result;
      params.$invalid = !result;
      params.$error[method] = !result;
      params.$success[method] = result;
      params.$viewValue = value;
    }

    /**
       * 验证所有字段的规则，返回验证是否通过
       * @param {Object} data 需要验证数据对象
       */ }, { key: "checkForm", value: function checkForm(
    data) {
      this.__initData();

      for (var param in this.rules) {
        this.setView(param);
        this.checkParam(param, this.rules[param], data);
      }

      return this.valid();
    }

    /**
       * 返回验证是否通过
       */ }, { key: "valid", value: function valid()
    {
      return this.size() === 0;
    }

    /**
       * 返回错误信息的个数
       */ }, { key: "size", value: function size()
    {
      return this.errorList.length;
    }

    /**
       * 返回所有错误信息
       */ }, { key: "validationErrors", value: function validationErrors()
    {
      return this.errorList;
    } }]);return WxValidate;}();var _default =


WxValidate;exports.default = _default;

/***/ }),

/***/ 26:
/*!*****************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/utils/request.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _commonURL = _interopRequireDefault(__webpack_require__(/*! utils/commonURL.js */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function jyRequest(url, parm, method, successCallback, errorCallback) {
  var token;
  try {
    token = uni.getStorageSync('myToken');
  } catch (e) {
    console.log('获取错误', e);
    //TODO handle the exception
  }
  uni.request({
    url: url,
    dataType: 'text',
    method: method,
    data: parm,
    header: {
      // 'content-type': 'application/json', 
      'content-type': 'application/x-www-form-urlencoded',
      "AI-Chat-Token": token },

    success: function success(res) {
      if (res.statusCode == 200) {
        var data = JSON.parse(res.data);
        if (data.code == 0 || data.code == 4001001 || data.code < 0 || data.code == 400) {
          if (data.msg !== null) {
            uni.showToast({
              title: data.msg,
              icon: 'none',
              duration: 1000 });

          }
        }
        successCallback(res);
      } else {
        uni.showToast({
          title: '网络连接异常',
          icon: 'none',
          duration: 2000 });

        errorCallback(null);
      }

    },
    fail: function fail(error) {
      console.log(error);
      errorCallback(error);
    } });

}

function jyRequestSimple(url, parm, method, successCallback, errorCallback) {
  var token;
  try {
    token = uni.getStorageSync('myToken');
  } catch (e) {
    console.log('获取错误', e);
    //TODO handle the exception
  }
  uni.request({
    url: url,
    dataType: 'text',
    method: method,
    data: parm,
    header: {
      'content-type': 'application/json',
      "AI-Chat-Token": token },

    success: function success(res) {
      if (res.statusCode == 200) {
        var data = JSON.parse(res.data);
        if (data.code == 0 || data.code == 4001001 || data.code < 0 || data.code == 400) {
          if (data.msg !== null) {
            uni.showToast({
              title: data.msg,
              icon: 'none',
              duration: 1000 });

          }
        }
        successCallback(res);
      } else {
        uni.showToast({
          title: '网络连接异常',
          icon: 'none',
          duration: 2000 });

        errorCallback(null);
      }
    },
    fail: function fail(error) {
      errorCallback(error);
    } });

}var _default =

{
  url_request: function url_request(url, param, way, successCallback, errorCallback) {
    return jyRequest(url, param, way, successCallback, errorCallback);
  },
  url_requestSimple: function url_requestSimple(url, param, way, successCallback, errorCallback) {
    return jyRequestSimple(url, param, way, successCallback, errorCallback);
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 27:
/*!****************************************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/node_modules/jsencrypt/bin/jsencrypt.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
(function (global, factory) {
   true ? factory(exports) :
  undefined;
})(void 0, function (exports) {'use strict';

  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  function int2char(n) {
    return BI_RM.charAt(n);
  }
  //#region BIT_OPERATIONS
  // (public) this & a
  function op_and(x, y) {
    return x & y;
  }
  // (public) this | a
  function op_or(x, y) {
    return x | y;
  }
  // (public) this ^ a
  function op_xor(x, y) {
    return x ^ y;
  }
  // (public) this & ~a
  function op_andnot(x, y) {
    return x & ~y;
  }
  // return index of lowest 1-bit in x, x < 2^31
  function lbit(x) {
    if (x == 0) {
      return -1;
    }
    var r = 0;
    if ((x & 0xffff) == 0) {
      x >>= 16;
      r += 16;
    }
    if ((x & 0xff) == 0) {
      x >>= 8;
      r += 8;
    }
    if ((x & 0xf) == 0) {
      x >>= 4;
      r += 4;
    }
    if ((x & 3) == 0) {
      x >>= 2;
      r += 2;
    }
    if ((x & 1) == 0) {
      ++r;
    }
    return r;
  }
  // return number of 1 bits in x
  function cbit(x) {
    var r = 0;
    while (x != 0) {
      x &= x - 1;
      ++r;
    }
    return r;
  }
  //#endregion BIT_OPERATIONS

  var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var b64pad = "=";
  function hex2b64(h) {
    var i;
    var c;
    var ret = "";
    for (i = 0; i + 3 <= h.length; i += 3) {
      c = parseInt(h.substring(i, i + 3), 16);
      ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
    }
    if (i + 1 == h.length) {
      c = parseInt(h.substring(i, i + 1), 16);
      ret += b64map.charAt(c << 2);
    } else
    if (i + 2 == h.length) {
      c = parseInt(h.substring(i, i + 2), 16);
      ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
    }
    while ((ret.length & 3) > 0) {
      ret += b64pad;
    }
    return ret;
  }
  // convert a base64 string to hex
  function b64tohex(s) {
    var ret = "";
    var i;
    var k = 0; // b64 state, 0-3
    var slop = 0;
    for (i = 0; i < s.length; ++i) {
      if (s.charAt(i) == b64pad) {
        break;
      }
      var v = b64map.indexOf(s.charAt(i));
      if (v < 0) {
        continue;
      }
      if (k == 0) {
        ret += int2char(v >> 2);
        slop = v & 3;
        k = 1;
      } else
      if (k == 1) {
        ret += int2char(slop << 2 | v >> 4);
        slop = v & 0xf;
        k = 2;
      } else
      if (k == 2) {
        ret += int2char(slop);
        ret += int2char(v >> 2);
        slop = v & 3;
        k = 3;
      } else
      {
        ret += int2char(slop << 2 | v >> 4);
        ret += int2char(v & 0xf);
        k = 0;
      }
    }
    if (k == 1) {
      ret += int2char(slop << 2);
    }
    return ret;
  }

  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0
    
    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.
    
    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
  /* global Reflect, Promise */

  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf ||
    { __proto__: [] } instanceof Array && function (d, b) {d.__proto__ = b;} ||
    function (d, b) {for (var p in b) {if (b.hasOwnProperty(p)) d[p] = b[p];}};
    return _extendStatics(d, b);
  };

  function __extends(d, b) {
    _extendStatics(d, b);
    function __() {this.constructor = d;}
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  // Hex JavaScript decoder
  // Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>
  // Permission to use, copy, modify, and/or distribute this software for any
  // purpose with or without fee is hereby granted, provided that the above
  // copyright notice and this permission notice appear in all copies.
  //
  // THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
  // WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
  // MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
  // ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
  // WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
  // ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
  // OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
  /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
  var decoder;
  var Hex = {
    decode: function decode(a) {
      var i;
      if (decoder === undefined) {
        var hex = "0123456789ABCDEF";
        var ignore = " \f\n\r\t\xA0\u2028\u2029";
        decoder = {};
        for (i = 0; i < 16; ++i) {
          decoder[hex.charAt(i)] = i;
        }
        hex = hex.toLowerCase();
        for (i = 10; i < 16; ++i) {
          decoder[hex.charAt(i)] = i;
        }
        for (i = 0; i < ignore.length; ++i) {
          decoder[ignore.charAt(i)] = -1;
        }
      }
      var out = [];
      var bits = 0;
      var char_count = 0;
      for (i = 0; i < a.length; ++i) {
        var c = a.charAt(i);
        if (c == "=") {
          break;
        }
        c = decoder[c];
        if (c == -1) {
          continue;
        }
        if (c === undefined) {
          throw new Error("Illegal character at offset " + i);
        }
        bits |= c;
        if (++char_count >= 2) {
          out[out.length] = bits;
          bits = 0;
          char_count = 0;
        } else
        {
          bits <<= 4;
        }
      }
      if (char_count) {
        throw new Error("Hex encoding incomplete: 4 bits missing");
      }
      return out;
    } };


  // Base64 JavaScript decoder
  // Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>
  // Permission to use, copy, modify, and/or distribute this software for any
  // purpose with or without fee is hereby granted, provided that the above
  // copyright notice and this permission notice appear in all copies.
  //
  // THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
  // WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
  // MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
  // ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
  // WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
  // ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
  // OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
  /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
  var decoder$1;
  var Base64 = {
    decode: function decode(a) {
      var i;
      if (decoder$1 === undefined) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var ignore = "= \f\n\r\t\xA0\u2028\u2029";
        decoder$1 = Object.create(null);
        for (i = 0; i < 64; ++i) {
          decoder$1[b64.charAt(i)] = i;
        }
        for (i = 0; i < ignore.length; ++i) {
          decoder$1[ignore.charAt(i)] = -1;
        }
      }
      var out = [];
      var bits = 0;
      var char_count = 0;
      for (i = 0; i < a.length; ++i) {
        var c = a.charAt(i);
        if (c == "=") {
          break;
        }
        c = decoder$1[c];
        if (c == -1) {
          continue;
        }
        if (c === undefined) {
          throw new Error("Illegal character at offset " + i);
        }
        bits |= c;
        if (++char_count >= 4) {
          out[out.length] = bits >> 16;
          out[out.length] = bits >> 8 & 0xFF;
          out[out.length] = bits & 0xFF;
          bits = 0;
          char_count = 0;
        } else
        {
          bits <<= 6;
        }
      }
      switch (char_count) {
        case 1:
          throw new Error("Base64 encoding incomplete: at least 2 bits missing");
        case 2:
          out[out.length] = bits >> 10;
          break;
        case 3:
          out[out.length] = bits >> 16;
          out[out.length] = bits >> 8 & 0xFF;
          break;}

      return out;
    },
    re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
    unarmor: function unarmor(a) {
      var m = Base64.re.exec(a);
      if (m) {
        if (m[1]) {
          a = m[1];
        } else
        if (m[2]) {
          a = m[2];
        } else
        {
          throw new Error("RegExp out of sync");
        }
      }
      return Base64.decode(a);
    } };


  // Big integer base-10 printing library
  // Copyright (c) 2014 Lapo Luchini <lapo@lapo.it>
  // Permission to use, copy, modify, and/or distribute this software for any
  // purpose with or without fee is hereby granted, provided that the above
  // copyright notice and this permission notice appear in all copies.
  //
  // THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
  // WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
  // MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
  // ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
  // WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
  // ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
  // OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
  /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
  var max = 10000000000000; // biggest integer that can still fit 2^53 when multiplied by 256
  var Int10 = /** @class */function () {
    function Int10(value) {
      this.buf = [+value || 0];
    }
    Int10.prototype.mulAdd = function (m, c) {
      // assert(m <= 256)
      var b = this.buf;
      var l = b.length;
      var i;
      var t;
      for (i = 0; i < l; ++i) {
        t = b[i] * m + c;
        if (t < max) {
          c = 0;
        } else
        {
          c = 0 | t / max;
          t -= c * max;
        }
        b[i] = t;
      }
      if (c > 0) {
        b[i] = c;
      }
    };
    Int10.prototype.sub = function (c) {
      // assert(m <= 256)
      var b = this.buf;
      var l = b.length;
      var i;
      var t;
      for (i = 0; i < l; ++i) {
        t = b[i] - c;
        if (t < 0) {
          t += max;
          c = 1;
        } else
        {
          c = 0;
        }
        b[i] = t;
      }
      while (b[b.length - 1] === 0) {
        b.pop();
      }
    };
    Int10.prototype.toString = function (base) {
      if ((base || 10) != 10) {
        throw new Error("only base 10 is supported");
      }
      var b = this.buf;
      var s = b[b.length - 1].toString();
      for (var i = b.length - 2; i >= 0; --i) {
        s += (max + b[i]).toString().substring(1);
      }
      return s;
    };
    Int10.prototype.valueOf = function () {
      var b = this.buf;
      var v = 0;
      for (var i = b.length - 1; i >= 0; --i) {
        v = v * max + b[i];
      }
      return v;
    };
    Int10.prototype.simplify = function () {
      var b = this.buf;
      return b.length == 1 ? b[0] : this;
    };
    return Int10;
  }();

  // ASN.1 JavaScript decoder
  var ellipsis = "\u2026";
  var reTimeS = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
  var reTimeL = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
  function stringCut(str, len) {
    if (str.length > len) {
      str = str.substring(0, len) + ellipsis;
    }
    return str;
  }
  var Stream = /** @class */function () {
    function Stream(enc, pos) {
      this.hexDigits = "0123456789ABCDEF";
      if (enc instanceof Stream) {
        this.enc = enc.enc;
        this.pos = enc.pos;
      } else
      {
        // enc should be an array or a binary string
        this.enc = enc;
        this.pos = pos;
      }
    }
    Stream.prototype.get = function (pos) {
      if (pos === undefined) {
        pos = this.pos++;
      }
      if (pos >= this.enc.length) {
        throw new Error("Requesting byte offset " + pos + " on a stream of length " + this.enc.length);
      }
      return "string" === typeof this.enc ? this.enc.charCodeAt(pos) : this.enc[pos];
    };
    Stream.prototype.hexByte = function (b) {
      return this.hexDigits.charAt(b >> 4 & 0xF) + this.hexDigits.charAt(b & 0xF);
    };
    Stream.prototype.hexDump = function (start, end, raw) {
      var s = "";
      for (var i = start; i < end; ++i) {
        s += this.hexByte(this.get(i));
        if (raw !== true) {
          switch (i & 0xF) {
            case 0x7:
              s += "  ";
              break;
            case 0xF:
              s += "\n";
              break;
            default:
              s += " ";}

        }
      }
      return s;
    };
    Stream.prototype.isASCII = function (start, end) {
      for (var i = start; i < end; ++i) {
        var c = this.get(i);
        if (c < 32 || c > 176) {
          return false;
        }
      }
      return true;
    };
    Stream.prototype.parseStringISO = function (start, end) {
      var s = "";
      for (var i = start; i < end; ++i) {
        s += String.fromCharCode(this.get(i));
      }
      return s;
    };
    Stream.prototype.parseStringUTF = function (start, end) {
      var s = "";
      for (var i = start; i < end;) {
        var c = this.get(i++);
        if (c < 128) {
          s += String.fromCharCode(c);
        } else
        if (c > 191 && c < 224) {
          s += String.fromCharCode((c & 0x1F) << 6 | this.get(i++) & 0x3F);
        } else
        {
          s += String.fromCharCode((c & 0x0F) << 12 | (this.get(i++) & 0x3F) << 6 | this.get(i++) & 0x3F);
        }
      }
      return s;
    };
    Stream.prototype.parseStringBMP = function (start, end) {
      var str = "";
      var hi;
      var lo;
      for (var i = start; i < end;) {
        hi = this.get(i++);
        lo = this.get(i++);
        str += String.fromCharCode(hi << 8 | lo);
      }
      return str;
    };
    Stream.prototype.parseTime = function (start, end, shortYear) {
      var s = this.parseStringISO(start, end);
      var m = (shortYear ? reTimeS : reTimeL).exec(s);
      if (!m) {
        return "Unrecognized time: " + s;
      }
      if (shortYear) {
        // to avoid querying the timer, use the fixed range [1970, 2069]
        // it will conform with ITU X.400 [-10, +40] sliding window until 2030
        m[1] = +m[1];
        m[1] += +m[1] < 70 ? 2000 : 1900;
      }
      s = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];
      if (m[5]) {
        s += ":" + m[5];
        if (m[6]) {
          s += ":" + m[6];
          if (m[7]) {
            s += "." + m[7];
          }
        }
      }
      if (m[8]) {
        s += " UTC";
        if (m[8] != "Z") {
          s += m[8];
          if (m[9]) {
            s += ":" + m[9];
          }
        }
      }
      return s;
    };
    Stream.prototype.parseInteger = function (start, end) {
      var v = this.get(start);
      var neg = v > 127;
      var pad = neg ? 255 : 0;
      var len;
      var s = "";
      // skip unuseful bits (not allowed in DER)
      while (v == pad && ++start < end) {
        v = this.get(start);
      }
      len = end - start;
      if (len === 0) {
        return neg ? -1 : 0;
      }
      // show bit length of huge integers
      if (len > 4) {
        s = v;
        len <<= 3;
        while (((+s ^ pad) & 0x80) == 0) {
          s = +s << 1;
          --len;
        }
        s = "(" + len + " bit)\n";
      }
      // decode the integer
      if (neg) {
        v = v - 256;
      }
      var n = new Int10(v);
      for (var i = start + 1; i < end; ++i) {
        n.mulAdd(256, this.get(i));
      }
      return s + n.toString();
    };
    Stream.prototype.parseBitString = function (start, end, maxLength) {
      var unusedBit = this.get(start);
      var lenBit = (end - start - 1 << 3) - unusedBit;
      var intro = "(" + lenBit + " bit)\n";
      var s = "";
      for (var i = start + 1; i < end; ++i) {
        var b = this.get(i);
        var skip = i == end - 1 ? unusedBit : 0;
        for (var j = 7; j >= skip; --j) {
          s += b >> j & 1 ? "1" : "0";
        }
        if (s.length > maxLength) {
          return intro + stringCut(s, maxLength);
        }
      }
      return intro + s;
    };
    Stream.prototype.parseOctetString = function (start, end, maxLength) {
      if (this.isASCII(start, end)) {
        return stringCut(this.parseStringISO(start, end), maxLength);
      }
      var len = end - start;
      var s = "(" + len + " byte)\n";
      maxLength /= 2; // we work in bytes
      if (len > maxLength) {
        end = start + maxLength;
      }
      for (var i = start; i < end; ++i) {
        s += this.hexByte(this.get(i));
      }
      if (len > maxLength) {
        s += ellipsis;
      }
      return s;
    };
    Stream.prototype.parseOID = function (start, end, maxLength) {
      var s = "";
      var n = new Int10();
      var bits = 0;
      for (var i = start; i < end; ++i) {
        var v = this.get(i);
        n.mulAdd(128, v & 0x7F);
        bits += 7;
        if (!(v & 0x80)) {// finished
          if (s === "") {
            n = n.simplify();
            if (n instanceof Int10) {
              n.sub(80);
              s = "2." + n.toString();
            } else
            {
              var m = n < 80 ? n < 40 ? 0 : 1 : 2;
              s = m + "." + (n - m * 40);
            }
          } else
          {
            s += "." + n.toString();
          }
          if (s.length > maxLength) {
            return stringCut(s, maxLength);
          }
          n = new Int10();
          bits = 0;
        }
      }
      if (bits > 0) {
        s += ".incomplete";
      }
      return s;
    };
    return Stream;
  }();
  var ASN1 = /** @class */function () {
    function ASN1(stream, header, length, tag, sub) {
      if (!(tag instanceof ASN1Tag)) {
        throw new Error("Invalid tag value.");
      }
      this.stream = stream;
      this.header = header;
      this.length = length;
      this.tag = tag;
      this.sub = sub;
    }
    ASN1.prototype.typeName = function () {
      switch (this.tag.tagClass) {
        case 0: // universal
          switch (this.tag.tagNumber) {
            case 0x00:
              return "EOC";
            case 0x01:
              return "BOOLEAN";
            case 0x02:
              return "INTEGER";
            case 0x03:
              return "BIT_STRING";
            case 0x04:
              return "OCTET_STRING";
            case 0x05:
              return "NULL";
            case 0x06:
              return "OBJECT_IDENTIFIER";
            case 0x07:
              return "ObjectDescriptor";
            case 0x08:
              return "EXTERNAL";
            case 0x09:
              return "REAL";
            case 0x0A:
              return "ENUMERATED";
            case 0x0B:
              return "EMBEDDED_PDV";
            case 0x0C:
              return "UTF8String";
            case 0x10:
              return "SEQUENCE";
            case 0x11:
              return "SET";
            case 0x12:
              return "NumericString";
            case 0x13:
              return "PrintableString"; // ASCII subset
            case 0x14:
              return "TeletexString"; // aka T61String
            case 0x15:
              return "VideotexString";
            case 0x16:
              return "IA5String"; // ASCII
            case 0x17:
              return "UTCTime";
            case 0x18:
              return "GeneralizedTime";
            case 0x19:
              return "GraphicString";
            case 0x1A:
              return "VisibleString"; // ASCII subset
            case 0x1B:
              return "GeneralString";
            case 0x1C:
              return "UniversalString";
            case 0x1E:
              return "BMPString";}

          return "Universal_" + this.tag.tagNumber.toString();
        case 1:
          return "Application_" + this.tag.tagNumber.toString();
        case 2:
          return "[" + this.tag.tagNumber.toString() + "]"; // Context
        case 3:
          return "Private_" + this.tag.tagNumber.toString();}

    };
    ASN1.prototype.content = function (maxLength) {
      if (this.tag === undefined) {
        return null;
      }
      if (maxLength === undefined) {
        maxLength = Infinity;
      }
      var content = this.posContent();
      var len = Math.abs(this.length);
      if (!this.tag.isUniversal()) {
        if (this.sub !== null) {
          return "(" + this.sub.length + " elem)";
        }
        return this.stream.parseOctetString(content, content + len, maxLength);
      }
      switch (this.tag.tagNumber) {
        case 0x01: // BOOLEAN
          return this.stream.get(content) === 0 ? "false" : "true";
        case 0x02: // INTEGER
          return this.stream.parseInteger(content, content + len);
        case 0x03: // BIT_STRING
          return this.sub ? "(" + this.sub.length + " elem)" :
          this.stream.parseBitString(content, content + len, maxLength);
        case 0x04: // OCTET_STRING
          return this.sub ? "(" + this.sub.length + " elem)" :
          this.stream.parseOctetString(content, content + len, maxLength);
        // case 0x05: // NULL
        case 0x06: // OBJECT_IDENTIFIER
          return this.stream.parseOID(content, content + len, maxLength);
        // case 0x07: // ObjectDescriptor
        // case 0x08: // EXTERNAL
        // case 0x09: // REAL
        // case 0x0A: // ENUMERATED
        // case 0x0B: // EMBEDDED_PDV
        case 0x10: // SEQUENCE
        case 0x11: // SET
          if (this.sub !== null) {
            return "(" + this.sub.length + " elem)";
          } else
          {
            return "(no elem)";
          }
        case 0x0C: // UTF8String
          return stringCut(this.stream.parseStringUTF(content, content + len), maxLength);
        case 0x12: // NumericString
        case 0x13: // PrintableString
        case 0x14: // TeletexString
        case 0x15: // VideotexString
        case 0x16: // IA5String
        // case 0x19: // GraphicString
        case 0x1A: // VisibleString
          // case 0x1B: // GeneralString
          // case 0x1C: // UniversalString
          return stringCut(this.stream.parseStringISO(content, content + len), maxLength);
        case 0x1E: // BMPString
          return stringCut(this.stream.parseStringBMP(content, content + len), maxLength);
        case 0x17: // UTCTime
        case 0x18: // GeneralizedTime
          return this.stream.parseTime(content, content + len, this.tag.tagNumber == 0x17);}

      return null;
    };
    ASN1.prototype.toString = function () {
      return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (this.sub === null ? "null" : this.sub.length) + "]";
    };
    ASN1.prototype.toPrettyString = function (indent) {
      if (indent === undefined) {
        indent = "";
      }
      var s = indent + this.typeName() + " @" + this.stream.pos;
      if (this.length >= 0) {
        s += "+";
      }
      s += this.length;
      if (this.tag.tagConstructed) {
        s += " (constructed)";
      } else
      if (this.tag.isUniversal() && (this.tag.tagNumber == 0x03 || this.tag.tagNumber == 0x04) && this.sub !== null) {
        s += " (encapsulates)";
      }
      s += "\n";
      if (this.sub !== null) {
        indent += "  ";
        for (var i = 0, max = this.sub.length; i < max; ++i) {
          s += this.sub[i].toPrettyString(indent);
        }
      }
      return s;
    };
    ASN1.prototype.posStart = function () {
      return this.stream.pos;
    };
    ASN1.prototype.posContent = function () {
      return this.stream.pos + this.header;
    };
    ASN1.prototype.posEnd = function () {
      return this.stream.pos + this.header + Math.abs(this.length);
    };
    ASN1.prototype.toHexString = function () {
      return this.stream.hexDump(this.posStart(), this.posEnd(), true);
    };
    ASN1.decodeLength = function (stream) {
      var buf = stream.get();
      var len = buf & 0x7F;
      if (len == buf) {
        return len;
      }
      // no reason to use Int10, as it would be a huge buffer anyways
      if (len > 6) {
        throw new Error("Length over 48 bits not supported at position " + (stream.pos - 1));
      }
      if (len === 0) {
        return null;
      } // undefined
      buf = 0;
      for (var i = 0; i < len; ++i) {
        buf = buf * 256 + stream.get();
      }
      return buf;
    };
    /**
        * Retrieve the hexadecimal value (as a string) of the current ASN.1 element
        * @returns {string}
        * @public
        */
    ASN1.prototype.getHexStringValue = function () {
      var hexString = this.toHexString();
      var offset = this.header * 2;
      var length = this.length * 2;
      return hexString.substr(offset, length);
    };
    ASN1.decode = function (str) {
      var stream;
      if (!(str instanceof Stream)) {
        stream = new Stream(str, 0);
      } else
      {
        stream = str;
      }
      var streamStart = new Stream(stream);
      var tag = new ASN1Tag(stream);
      var len = ASN1.decodeLength(stream);
      var start = stream.pos;
      var header = start - streamStart.pos;
      var sub = null;
      var getSub = function getSub() {
        var ret = [];
        if (len !== null) {
          // definite length
          var end = start + len;
          while (stream.pos < end) {
            ret[ret.length] = ASN1.decode(stream);
          }
          if (stream.pos != end) {
            throw new Error("Content size is not correct for container starting at offset " + start);
          }
        } else
        {
          // undefined length
          try {
            for (;;) {
              var s = ASN1.decode(stream);
              if (s.tag.isEOC()) {
                break;
              }
              ret[ret.length] = s;
            }
            len = start - stream.pos; // undefined lengths are represented as negative values
          }
          catch (e) {
            throw new Error("Exception while decoding undefined length content: " + e);
          }
        }
        return ret;
      };
      if (tag.tagConstructed) {
        // must have valid content
        sub = getSub();
      } else
      if (tag.isUniversal() && (tag.tagNumber == 0x03 || tag.tagNumber == 0x04)) {
        // sometimes BitString and OctetString are used to encapsulate ASN.1
        try {
          if (tag.tagNumber == 0x03) {
            if (stream.get() != 0) {
              throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
            }
          }
          sub = getSub();
          for (var i = 0; i < sub.length; ++i) {
            if (sub[i].tag.isEOC()) {
              throw new Error("EOC is not supposed to be actual content.");
            }
          }
        }
        catch (e) {
          // but silently ignore when they don't
          sub = null;
        }
      }
      if (sub === null) {
        if (len === null) {
          throw new Error("We can't skip over an invalid tag with undefined length at offset " + start);
        }
        stream.pos = start + Math.abs(len);
      }
      return new ASN1(streamStart, header, len, tag, sub);
    };
    return ASN1;
  }();
  var ASN1Tag = /** @class */function () {
    function ASN1Tag(stream) {
      var buf = stream.get();
      this.tagClass = buf >> 6;
      this.tagConstructed = (buf & 0x20) !== 0;
      this.tagNumber = buf & 0x1F;
      if (this.tagNumber == 0x1F) {// long tag
        var n = new Int10();
        do {
          buf = stream.get();
          n.mulAdd(128, buf & 0x7F);
        } while (buf & 0x80);
        this.tagNumber = n.simplify();
      }
    }
    ASN1Tag.prototype.isUniversal = function () {
      return this.tagClass === 0x00;
    };
    ASN1Tag.prototype.isEOC = function () {
      return this.tagClass === 0x00 && this.tagNumber === 0x00;
    };
    return ASN1Tag;
  }();

  // Copyright (c) 2005  Tom Wu
  // Bits per digit
  var dbits;
  // JavaScript engine analysis
  var canary = 0xdeadbeefcafe;
  var j_lm = (canary & 0xffffff) == 0xefcafe;
  //#region
  var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
  var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
  //#endregion
  // (public) Constructor
  var BigInteger = /** @class */function () {
    function BigInteger(a, b, c) {
      if (a != null) {
        if ("number" == typeof a) {
          this.fromNumber(a, b, c);
        } else
        if (b == null && "string" != typeof a) {
          this.fromString(a, 256);
        } else
        {
          this.fromString(a, b);
        }
      }
    }
    //#region PUBLIC
    // BigInteger.prototype.toString = bnToString;
    // (public) return string representation in given radix
    BigInteger.prototype.toString = function (b) {
      if (this.s < 0) {
        return "-" + this.negate().toString(b);
      }
      var k;
      if (b == 16) {
        k = 4;
      } else
      if (b == 8) {
        k = 3;
      } else
      if (b == 2) {
        k = 1;
      } else
      if (b == 32) {
        k = 5;
      } else
      if (b == 4) {
        k = 2;
      } else
      {
        return this.toRadix(b);
      }
      var km = (1 << k) - 1;
      var d;
      var m = false;
      var r = "";
      var i = this.t;
      var p = this.DB - i * this.DB % k;
      if (i-- > 0) {
        if (p < this.DB && (d = this[i] >> p) > 0) {
          m = true;
          r = int2char(d);
        }
        while (i >= 0) {
          if (p < k) {
            d = (this[i] & (1 << p) - 1) << k - p;
            d |= this[--i] >> (p += this.DB - k);
          } else
          {
            d = this[i] >> (p -= k) & km;
            if (p <= 0) {
              p += this.DB;
              --i;
            }
          }
          if (d > 0) {
            m = true;
          }
          if (m) {
            r += int2char(d);
          }
        }
      }
      return m ? r : "0";
    };
    // BigInteger.prototype.negate = bnNegate;
    // (public) -this
    BigInteger.prototype.negate = function () {
      var r = nbi();
      BigInteger.ZERO.subTo(this, r);
      return r;
    };
    // BigInteger.prototype.abs = bnAbs;
    // (public) |this|
    BigInteger.prototype.abs = function () {
      return this.s < 0 ? this.negate() : this;
    };
    // BigInteger.prototype.compareTo = bnCompareTo;
    // (public) return + if this > a, - if this < a, 0 if equal
    BigInteger.prototype.compareTo = function (a) {
      var r = this.s - a.s;
      if (r != 0) {
        return r;
      }
      var i = this.t;
      r = i - a.t;
      if (r != 0) {
        return this.s < 0 ? -r : r;
      }
      while (--i >= 0) {
        if ((r = this[i] - a[i]) != 0) {
          return r;
        }
      }
      return 0;
    };
    // BigInteger.prototype.bitLength = bnBitLength;
    // (public) return the number of bits in "this"
    BigInteger.prototype.bitLength = function () {
      if (this.t <= 0) {
        return 0;
      }
      return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
    };
    // BigInteger.prototype.mod = bnMod;
    // (public) this mod a
    BigInteger.prototype.mod = function (a) {
      var r = nbi();
      this.abs().divRemTo(a, null, r);
      if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
        a.subTo(r, r);
      }
      return r;
    };
    // BigInteger.prototype.modPowInt = bnModPowInt;
    // (public) this^e % m, 0 <= e < 2^32
    BigInteger.prototype.modPowInt = function (e, m) {
      var z;
      if (e < 256 || m.isEven()) {
        z = new Classic(m);
      } else
      {
        z = new Montgomery(m);
      }
      return this.exp(e, z);
    };
    // BigInteger.prototype.clone = bnClone;
    // (public)
    BigInteger.prototype.clone = function () {
      var r = nbi();
      this.copyTo(r);
      return r;
    };
    // BigInteger.prototype.intValue = bnIntValue;
    // (public) return value as integer
    BigInteger.prototype.intValue = function () {
      if (this.s < 0) {
        if (this.t == 1) {
          return this[0] - this.DV;
        } else
        if (this.t == 0) {
          return -1;
        }
      } else
      if (this.t == 1) {
        return this[0];
      } else
      if (this.t == 0) {
        return 0;
      }
      // assumes 16 < DB < 32
      return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
    };
    // BigInteger.prototype.byteValue = bnByteValue;
    // (public) return value as byte
    BigInteger.prototype.byteValue = function () {
      return this.t == 0 ? this.s : this[0] << 24 >> 24;
    };
    // BigInteger.prototype.shortValue = bnShortValue;
    // (public) return value as short (assumes DB>=16)
    BigInteger.prototype.shortValue = function () {
      return this.t == 0 ? this.s : this[0] << 16 >> 16;
    };
    // BigInteger.prototype.signum = bnSigNum;
    // (public) 0 if this == 0, 1 if this > 0
    BigInteger.prototype.signum = function () {
      if (this.s < 0) {
        return -1;
      } else
      if (this.t <= 0 || this.t == 1 && this[0] <= 0) {
        return 0;
      } else
      {
        return 1;
      }
    };
    // BigInteger.prototype.toByteArray = bnToByteArray;
    // (public) convert to bigendian byte array
    BigInteger.prototype.toByteArray = function () {
      var i = this.t;
      var r = [];
      r[0] = this.s;
      var p = this.DB - i * this.DB % 8;
      var d;
      var k = 0;
      if (i-- > 0) {
        if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p) {
          r[k++] = d | this.s << this.DB - p;
        }
        while (i >= 0) {
          if (p < 8) {
            d = (this[i] & (1 << p) - 1) << 8 - p;
            d |= this[--i] >> (p += this.DB - 8);
          } else
          {
            d = this[i] >> (p -= 8) & 0xff;
            if (p <= 0) {
              p += this.DB;
              --i;
            }
          }
          if ((d & 0x80) != 0) {
            d |= -256;
          }
          if (k == 0 && (this.s & 0x80) != (d & 0x80)) {
            ++k;
          }
          if (k > 0 || d != this.s) {
            r[k++] = d;
          }
        }
      }
      return r;
    };
    // BigInteger.prototype.equals = bnEquals;
    BigInteger.prototype.equals = function (a) {
      return this.compareTo(a) == 0;
    };
    // BigInteger.prototype.min = bnMin;
    BigInteger.prototype.min = function (a) {
      return this.compareTo(a) < 0 ? this : a;
    };
    // BigInteger.prototype.max = bnMax;
    BigInteger.prototype.max = function (a) {
      return this.compareTo(a) > 0 ? this : a;
    };
    // BigInteger.prototype.and = bnAnd;
    BigInteger.prototype.and = function (a) {
      var r = nbi();
      this.bitwiseTo(a, op_and, r);
      return r;
    };
    // BigInteger.prototype.or = bnOr;
    BigInteger.prototype.or = function (a) {
      var r = nbi();
      this.bitwiseTo(a, op_or, r);
      return r;
    };
    // BigInteger.prototype.xor = bnXor;
    BigInteger.prototype.xor = function (a) {
      var r = nbi();
      this.bitwiseTo(a, op_xor, r);
      return r;
    };
    // BigInteger.prototype.andNot = bnAndNot;
    BigInteger.prototype.andNot = function (a) {
      var r = nbi();
      this.bitwiseTo(a, op_andnot, r);
      return r;
    };
    // BigInteger.prototype.not = bnNot;
    // (public) ~this
    BigInteger.prototype.not = function () {
      var r = nbi();
      for (var i = 0; i < this.t; ++i) {
        r[i] = this.DM & ~this[i];
      }
      r.t = this.t;
      r.s = ~this.s;
      return r;
    };
    // BigInteger.prototype.shiftLeft = bnShiftLeft;
    // (public) this << n
    BigInteger.prototype.shiftLeft = function (n) {
      var r = nbi();
      if (n < 0) {
        this.rShiftTo(-n, r);
      } else
      {
        this.lShiftTo(n, r);
      }
      return r;
    };
    // BigInteger.prototype.shiftRight = bnShiftRight;
    // (public) this >> n
    BigInteger.prototype.shiftRight = function (n) {
      var r = nbi();
      if (n < 0) {
        this.lShiftTo(-n, r);
      } else
      {
        this.rShiftTo(n, r);
      }
      return r;
    };
    // BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
    // (public) returns index of lowest 1-bit (or -1 if none)
    BigInteger.prototype.getLowestSetBit = function () {
      for (var i = 0; i < this.t; ++i) {
        if (this[i] != 0) {
          return i * this.DB + lbit(this[i]);
        }
      }
      if (this.s < 0) {
        return this.t * this.DB;
      }
      return -1;
    };
    // BigInteger.prototype.bitCount = bnBitCount;
    // (public) return number of set bits
    BigInteger.prototype.bitCount = function () {
      var r = 0;
      var x = this.s & this.DM;
      for (var i = 0; i < this.t; ++i) {
        r += cbit(this[i] ^ x);
      }
      return r;
    };
    // BigInteger.prototype.testBit = bnTestBit;
    // (public) true iff nth bit is set
    BigInteger.prototype.testBit = function (n) {
      var j = Math.floor(n / this.DB);
      if (j >= this.t) {
        return this.s != 0;
      }
      return (this[j] & 1 << n % this.DB) != 0;
    };
    // BigInteger.prototype.setBit = bnSetBit;
    // (public) this | (1<<n)
    BigInteger.prototype.setBit = function (n) {
      return this.changeBit(n, op_or);
    };
    // BigInteger.prototype.clearBit = bnClearBit;
    // (public) this & ~(1<<n)
    BigInteger.prototype.clearBit = function (n) {
      return this.changeBit(n, op_andnot);
    };
    // BigInteger.prototype.flipBit = bnFlipBit;
    // (public) this ^ (1<<n)
    BigInteger.prototype.flipBit = function (n) {
      return this.changeBit(n, op_xor);
    };
    // BigInteger.prototype.add = bnAdd;
    // (public) this + a
    BigInteger.prototype.add = function (a) {
      var r = nbi();
      this.addTo(a, r);
      return r;
    };
    // BigInteger.prototype.subtract = bnSubtract;
    // (public) this - a
    BigInteger.prototype.subtract = function (a) {
      var r = nbi();
      this.subTo(a, r);
      return r;
    };
    // BigInteger.prototype.multiply = bnMultiply;
    // (public) this * a
    BigInteger.prototype.multiply = function (a) {
      var r = nbi();
      this.multiplyTo(a, r);
      return r;
    };
    // BigInteger.prototype.divide = bnDivide;
    // (public) this / a
    BigInteger.prototype.divide = function (a) {
      var r = nbi();
      this.divRemTo(a, r, null);
      return r;
    };
    // BigInteger.prototype.remainder = bnRemainder;
    // (public) this % a
    BigInteger.prototype.remainder = function (a) {
      var r = nbi();
      this.divRemTo(a, null, r);
      return r;
    };
    // BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
    // (public) [this/a,this%a]
    BigInteger.prototype.divideAndRemainder = function (a) {
      var q = nbi();
      var r = nbi();
      this.divRemTo(a, q, r);
      return [q, r];
    };
    // BigInteger.prototype.modPow = bnModPow;
    // (public) this^e % m (HAC 14.85)
    BigInteger.prototype.modPow = function (e, m) {
      var i = e.bitLength();
      var k;
      var r = nbv(1);
      var z;
      if (i <= 0) {
        return r;
      } else
      if (i < 18) {
        k = 1;
      } else
      if (i < 48) {
        k = 3;
      } else
      if (i < 144) {
        k = 4;
      } else
      if (i < 768) {
        k = 5;
      } else
      {
        k = 6;
      }
      if (i < 8) {
        z = new Classic(m);
      } else
      if (m.isEven()) {
        z = new Barrett(m);
      } else
      {
        z = new Montgomery(m);
      }
      // precomputation
      var g = [];
      var n = 3;
      var k1 = k - 1;
      var km = (1 << k) - 1;
      g[1] = z.convert(this);
      if (k > 1) {
        var g2 = nbi();
        z.sqrTo(g[1], g2);
        while (n <= km) {
          g[n] = nbi();
          z.mulTo(g2, g[n - 2], g[n]);
          n += 2;
        }
      }
      var j = e.t - 1;
      var w;
      var is1 = true;
      var r2 = nbi();
      var t;
      i = nbits(e[j]) - 1;
      while (j >= 0) {
        if (i >= k1) {
          w = e[j] >> i - k1 & km;
        } else
        {
          w = (e[j] & (1 << i + 1) - 1) << k1 - i;
          if (j > 0) {
            w |= e[j - 1] >> this.DB + i - k1;
          }
        }
        n = k;
        while ((w & 1) == 0) {
          w >>= 1;
          --n;
        }
        if ((i -= n) < 0) {
          i += this.DB;
          --j;
        }
        if (is1) {// ret == 1, don't bother squaring or multiplying it
          g[w].copyTo(r);
          is1 = false;
        } else
        {
          while (n > 1) {
            z.sqrTo(r, r2);
            z.sqrTo(r2, r);
            n -= 2;
          }
          if (n > 0) {
            z.sqrTo(r, r2);
          } else
          {
            t = r;
            r = r2;
            r2 = t;
          }
          z.mulTo(r2, g[w], r);
        }
        while (j >= 0 && (e[j] & 1 << i) == 0) {
          z.sqrTo(r, r2);
          t = r;
          r = r2;
          r2 = t;
          if (--i < 0) {
            i = this.DB - 1;
            --j;
          }
        }
      }
      return z.revert(r);
    };
    // BigInteger.prototype.modInverse = bnModInverse;
    // (public) 1/this % m (HAC 14.61)
    BigInteger.prototype.modInverse = function (m) {
      var ac = m.isEven();
      if (this.isEven() && ac || m.signum() == 0) {
        return BigInteger.ZERO;
      }
      var u = m.clone();
      var v = this.clone();
      var a = nbv(1);
      var b = nbv(0);
      var c = nbv(0);
      var d = nbv(1);
      while (u.signum() != 0) {
        while (u.isEven()) {
          u.rShiftTo(1, u);
          if (ac) {
            if (!a.isEven() || !b.isEven()) {
              a.addTo(this, a);
              b.subTo(m, b);
            }
            a.rShiftTo(1, a);
          } else
          if (!b.isEven()) {
            b.subTo(m, b);
          }
          b.rShiftTo(1, b);
        }
        while (v.isEven()) {
          v.rShiftTo(1, v);
          if (ac) {
            if (!c.isEven() || !d.isEven()) {
              c.addTo(this, c);
              d.subTo(m, d);
            }
            c.rShiftTo(1, c);
          } else
          if (!d.isEven()) {
            d.subTo(m, d);
          }
          d.rShiftTo(1, d);
        }
        if (u.compareTo(v) >= 0) {
          u.subTo(v, u);
          if (ac) {
            a.subTo(c, a);
          }
          b.subTo(d, b);
        } else
        {
          v.subTo(u, v);
          if (ac) {
            c.subTo(a, c);
          }
          d.subTo(b, d);
        }
      }
      if (v.compareTo(BigInteger.ONE) != 0) {
        return BigInteger.ZERO;
      }
      if (d.compareTo(m) >= 0) {
        return d.subtract(m);
      }
      if (d.signum() < 0) {
        d.addTo(m, d);
      } else
      {
        return d;
      }
      if (d.signum() < 0) {
        return d.add(m);
      } else
      {
        return d;
      }
    };
    // BigInteger.prototype.pow = bnPow;
    // (public) this^e
    BigInteger.prototype.pow = function (e) {
      return this.exp(e, new NullExp());
    };
    // BigInteger.prototype.gcd = bnGCD;
    // (public) gcd(this,a) (HAC 14.54)
    BigInteger.prototype.gcd = function (a) {
      var x = this.s < 0 ? this.negate() : this.clone();
      var y = a.s < 0 ? a.negate() : a.clone();
      if (x.compareTo(y) < 0) {
        var t = x;
        x = y;
        y = t;
      }
      var i = x.getLowestSetBit();
      var g = y.getLowestSetBit();
      if (g < 0) {
        return x;
      }
      if (i < g) {
        g = i;
      }
      if (g > 0) {
        x.rShiftTo(g, x);
        y.rShiftTo(g, y);
      }
      while (x.signum() > 0) {
        if ((i = x.getLowestSetBit()) > 0) {
          x.rShiftTo(i, x);
        }
        if ((i = y.getLowestSetBit()) > 0) {
          y.rShiftTo(i, y);
        }
        if (x.compareTo(y) >= 0) {
          x.subTo(y, x);
          x.rShiftTo(1, x);
        } else
        {
          y.subTo(x, y);
          y.rShiftTo(1, y);
        }
      }
      if (g > 0) {
        y.lShiftTo(g, y);
      }
      return y;
    };
    // BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
    // (public) test primality with certainty >= 1-.5^t
    BigInteger.prototype.isProbablePrime = function (t) {
      var i;
      var x = this.abs();
      if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
        for (i = 0; i < lowprimes.length; ++i) {
          if (x[0] == lowprimes[i]) {
            return true;
          }
        }
        return false;
      }
      if (x.isEven()) {
        return false;
      }
      i = 1;
      while (i < lowprimes.length) {
        var m = lowprimes[i];
        var j = i + 1;
        while (j < lowprimes.length && m < lplim) {
          m *= lowprimes[j++];
        }
        m = x.modInt(m);
        while (i < j) {
          if (m % lowprimes[i++] == 0) {
            return false;
          }
        }
      }
      return x.millerRabin(t);
    };
    //#endregion PUBLIC
    //#region PROTECTED
    // BigInteger.prototype.copyTo = bnpCopyTo;
    // (protected) copy this to r
    BigInteger.prototype.copyTo = function (r) {
      for (var i = this.t - 1; i >= 0; --i) {
        r[i] = this[i];
      }
      r.t = this.t;
      r.s = this.s;
    };
    // BigInteger.prototype.fromInt = bnpFromInt;
    // (protected) set from integer value x, -DV <= x < DV
    BigInteger.prototype.fromInt = function (x) {
      this.t = 1;
      this.s = x < 0 ? -1 : 0;
      if (x > 0) {
        this[0] = x;
      } else
      if (x < -1) {
        this[0] = x + this.DV;
      } else
      {
        this.t = 0;
      }
    };
    // BigInteger.prototype.fromString = bnpFromString;
    // (protected) set from string and radix
    BigInteger.prototype.fromString = function (s, b) {
      var k;
      if (b == 16) {
        k = 4;
      } else
      if (b == 8) {
        k = 3;
      } else
      if (b == 256) {
        k = 8;
        /* byte array */
      } else
      if (b == 2) {
        k = 1;
      } else
      if (b == 32) {
        k = 5;
      } else
      if (b == 4) {
        k = 2;
      } else
      {
        this.fromRadix(s, b);
        return;
      }
      this.t = 0;
      this.s = 0;
      var i = s.length;
      var mi = false;
      var sh = 0;
      while (--i >= 0) {
        var x = k == 8 ? +s[i] & 0xff : intAt(s, i);
        if (x < 0) {
          if (s.charAt(i) == "-") {
            mi = true;
          }
          continue;
        }
        mi = false;
        if (sh == 0) {
          this[this.t++] = x;
        } else
        if (sh + k > this.DB) {
          this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
          this[this.t++] = x >> this.DB - sh;
        } else
        {
          this[this.t - 1] |= x << sh;
        }
        sh += k;
        if (sh >= this.DB) {
          sh -= this.DB;
        }
      }
      if (k == 8 && (+s[0] & 0x80) != 0) {
        this.s = -1;
        if (sh > 0) {
          this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
        }
      }
      this.clamp();
      if (mi) {
        BigInteger.ZERO.subTo(this, this);
      }
    };
    // BigInteger.prototype.clamp = bnpClamp;
    // (protected) clamp off excess high words
    BigInteger.prototype.clamp = function () {
      var c = this.s & this.DM;
      while (this.t > 0 && this[this.t - 1] == c) {
        --this.t;
      }
    };
    // BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
    // (protected) r = this << n*DB
    BigInteger.prototype.dlShiftTo = function (n, r) {
      var i;
      for (i = this.t - 1; i >= 0; --i) {
        r[i + n] = this[i];
      }
      for (i = n - 1; i >= 0; --i) {
        r[i] = 0;
      }
      r.t = this.t + n;
      r.s = this.s;
    };
    // BigInteger.prototype.drShiftTo = bnpDRShiftTo;
    // (protected) r = this >> n*DB
    BigInteger.prototype.drShiftTo = function (n, r) {
      for (var i = n; i < this.t; ++i) {
        r[i - n] = this[i];
      }
      r.t = Math.max(this.t - n, 0);
      r.s = this.s;
    };
    // BigInteger.prototype.lShiftTo = bnpLShiftTo;
    // (protected) r = this << n
    BigInteger.prototype.lShiftTo = function (n, r) {
      var bs = n % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << cbs) - 1;
      var ds = Math.floor(n / this.DB);
      var c = this.s << bs & this.DM;
      for (var i = this.t - 1; i >= 0; --i) {
        r[i + ds + 1] = this[i] >> cbs | c;
        c = (this[i] & bm) << bs;
      }
      for (var i = ds - 1; i >= 0; --i) {
        r[i] = 0;
      }
      r[ds] = c;
      r.t = this.t + ds + 1;
      r.s = this.s;
      r.clamp();
    };
    // BigInteger.prototype.rShiftTo = bnpRShiftTo;
    // (protected) r = this >> n
    BigInteger.prototype.rShiftTo = function (n, r) {
      r.s = this.s;
      var ds = Math.floor(n / this.DB);
      if (ds >= this.t) {
        r.t = 0;
        return;
      }
      var bs = n % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << bs) - 1;
      r[0] = this[ds] >> bs;
      for (var i = ds + 1; i < this.t; ++i) {
        r[i - ds - 1] |= (this[i] & bm) << cbs;
        r[i - ds] = this[i] >> bs;
      }
      if (bs > 0) {
        r[this.t - ds - 1] |= (this.s & bm) << cbs;
      }
      r.t = this.t - ds;
      r.clamp();
    };
    // BigInteger.prototype.subTo = bnpSubTo;
    // (protected) r = this - a
    BigInteger.prototype.subTo = function (a, r) {
      var i = 0;
      var c = 0;
      var m = Math.min(a.t, this.t);
      while (i < m) {
        c += this[i] - a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      if (a.t < this.t) {
        c -= a.s;
        while (i < this.t) {
          c += this[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += this.s;
      } else
      {
        c += this.s;
        while (i < a.t) {
          c -= a[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }
        c -= a.s;
      }
      r.s = c < 0 ? -1 : 0;
      if (c < -1) {
        r[i++] = this.DV + c;
      } else
      if (c > 0) {
        r[i++] = c;
      }
      r.t = i;
      r.clamp();
    };
    // BigInteger.prototype.multiplyTo = bnpMultiplyTo;
    // (protected) r = this * a, r != this,a (HAC 14.12)
    // "this" should be the larger one if appropriate.
    BigInteger.prototype.multiplyTo = function (a, r) {
      var x = this.abs();
      var y = a.abs();
      var i = x.t;
      r.t = i + y.t;
      while (--i >= 0) {
        r[i] = 0;
      }
      for (i = 0; i < y.t; ++i) {
        r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
      }
      r.s = 0;
      r.clamp();
      if (this.s != a.s) {
        BigInteger.ZERO.subTo(r, r);
      }
    };
    // BigInteger.prototype.squareTo = bnpSquareTo;
    // (protected) r = this^2, r != this (HAC 14.16)
    BigInteger.prototype.squareTo = function (r) {
      var x = this.abs();
      var i = r.t = 2 * x.t;
      while (--i >= 0) {
        r[i] = 0;
      }
      for (i = 0; i < x.t - 1; ++i) {
        var c = x.am(i, x[i], r, 2 * i, 0, 1);
        if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
          r[i + x.t] -= x.DV;
          r[i + x.t + 1] = 1;
        }
      }
      if (r.t > 0) {
        r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
      }
      r.s = 0;
      r.clamp();
    };
    // BigInteger.prototype.divRemTo = bnpDivRemTo;
    // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
    // r != q, this != m.  q or r may be null.
    BigInteger.prototype.divRemTo = function (m, q, r) {
      var pm = m.abs();
      if (pm.t <= 0) {
        return;
      }
      var pt = this.abs();
      if (pt.t < pm.t) {
        if (q != null) {
          q.fromInt(0);
        }
        if (r != null) {
          this.copyTo(r);
        }
        return;
      }
      if (r == null) {
        r = nbi();
      }
      var y = nbi();
      var ts = this.s;
      var ms = m.s;
      var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus
      if (nsh > 0) {
        pm.lShiftTo(nsh, y);
        pt.lShiftTo(nsh, r);
      } else
      {
        pm.copyTo(y);
        pt.copyTo(r);
      }
      var ys = y.t;
      var y0 = y[ys - 1];
      if (y0 == 0) {
        return;
      }
      var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
      var d1 = this.FV / yt;
      var d2 = (1 << this.F1) / yt;
      var e = 1 << this.F2;
      var i = r.t;
      var j = i - ys;
      var t = q == null ? nbi() : q;
      y.dlShiftTo(j, t);
      if (r.compareTo(t) >= 0) {
        r[r.t++] = 1;
        r.subTo(t, r);
      }
      BigInteger.ONE.dlShiftTo(ys, t);
      t.subTo(y, y); // "negative" y so we can replace sub with am later
      while (y.t < ys) {
        y[y.t++] = 0;
      }
      while (--j >= 0) {
        // Estimate quotient digit
        var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
        if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {// Try it out
          y.dlShiftTo(j, t);
          r.subTo(t, r);
          while (r[i] < --qd) {
            r.subTo(t, r);
          }
        }
      }
      if (q != null) {
        r.drShiftTo(ys, q);
        if (ts != ms) {
          BigInteger.ZERO.subTo(q, q);
        }
      }
      r.t = ys;
      r.clamp();
      if (nsh > 0) {
        r.rShiftTo(nsh, r);
      } // Denormalize remainder
      if (ts < 0) {
        BigInteger.ZERO.subTo(r, r);
      }
    };
    // BigInteger.prototype.invDigit = bnpInvDigit;
    // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
    // justification:
    //         xy == 1 (mod m)
    //         xy =  1+km
    //   xy(2-xy) = (1+km)(1-km)
    // x[y(2-xy)] = 1-k^2m^2
    // x[y(2-xy)] == 1 (mod m^2)
    // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
    // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
    // JS multiply "overflows" differently from C/C++, so care is needed here.
    BigInteger.prototype.invDigit = function () {
      if (this.t < 1) {
        return 0;
      }
      var x = this[0];
      if ((x & 1) == 0) {
        return 0;
      }
      var y = x & 3; // y == 1/x mod 2^2
      y = y * (2 - (x & 0xf) * y) & 0xf; // y == 1/x mod 2^4
      y = y * (2 - (x & 0xff) * y) & 0xff; // y == 1/x mod 2^8
      y = y * (2 - ((x & 0xffff) * y & 0xffff)) & 0xffff; // y == 1/x mod 2^16
      // last step - calculate inverse mod DV directly;
      // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
      y = y * (2 - x * y % this.DV) % this.DV; // y == 1/x mod 2^dbits
      // we really want the negative inverse, and -DV < y < DV
      return y > 0 ? this.DV - y : -y;
    };
    // BigInteger.prototype.isEven = bnpIsEven;
    // (protected) true iff this is even
    BigInteger.prototype.isEven = function () {
      return (this.t > 0 ? this[0] & 1 : this.s) == 0;
    };
    // BigInteger.prototype.exp = bnpExp;
    // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
    BigInteger.prototype.exp = function (e, z) {
      if (e > 0xffffffff || e < 1) {
        return BigInteger.ONE;
      }
      var r = nbi();
      var r2 = nbi();
      var g = z.convert(this);
      var i = nbits(e) - 1;
      g.copyTo(r);
      while (--i >= 0) {
        z.sqrTo(r, r2);
        if ((e & 1 << i) > 0) {
          z.mulTo(r2, g, r);
        } else
        {
          var t = r;
          r = r2;
          r2 = t;
        }
      }
      return z.revert(r);
    };
    // BigInteger.prototype.chunkSize = bnpChunkSize;
    // (protected) return x s.t. r^x < DV
    BigInteger.prototype.chunkSize = function (r) {
      return Math.floor(Math.LN2 * this.DB / Math.log(r));
    };
    // BigInteger.prototype.toRadix = bnpToRadix;
    // (protected) convert to radix string
    BigInteger.prototype.toRadix = function (b) {
      if (b == null) {
        b = 10;
      }
      if (this.signum() == 0 || b < 2 || b > 36) {
        return "0";
      }
      var cs = this.chunkSize(b);
      var a = Math.pow(b, cs);
      var d = nbv(a);
      var y = nbi();
      var z = nbi();
      var r = "";
      this.divRemTo(d, y, z);
      while (y.signum() > 0) {
        r = (a + z.intValue()).toString(b).substr(1) + r;
        y.divRemTo(d, y, z);
      }
      return z.intValue().toString(b) + r;
    };
    // BigInteger.prototype.fromRadix = bnpFromRadix;
    // (protected) convert from radix string
    BigInteger.prototype.fromRadix = function (s, b) {
      this.fromInt(0);
      if (b == null) {
        b = 10;
      }
      var cs = this.chunkSize(b);
      var d = Math.pow(b, cs);
      var mi = false;
      var j = 0;
      var w = 0;
      for (var i = 0; i < s.length; ++i) {
        var x = intAt(s, i);
        if (x < 0) {
          if (s.charAt(i) == "-" && this.signum() == 0) {
            mi = true;
          }
          continue;
        }
        w = b * w + x;
        if (++j >= cs) {
          this.dMultiply(d);
          this.dAddOffset(w, 0);
          j = 0;
          w = 0;
        }
      }
      if (j > 0) {
        this.dMultiply(Math.pow(b, j));
        this.dAddOffset(w, 0);
      }
      if (mi) {
        BigInteger.ZERO.subTo(this, this);
      }
    };
    // BigInteger.prototype.fromNumber = bnpFromNumber;
    // (protected) alternate constructor
    BigInteger.prototype.fromNumber = function (a, b, c) {
      if ("number" == typeof b) {
        // new BigInteger(int,int,RNG)
        if (a < 2) {
          this.fromInt(1);
        } else
        {
          this.fromNumber(a, c);
          if (!this.testBit(a - 1)) {
            // force MSB set
            this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
          }
          if (this.isEven()) {
            this.dAddOffset(1, 0);
          } // force odd
          while (!this.isProbablePrime(b)) {
            this.dAddOffset(2, 0);
            if (this.bitLength() > a) {
              this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
            }
          }
        }
      } else
      {
        // new BigInteger(int,RNG)
        var x = [];
        var t = a & 7;
        x.length = (a >> 3) + 1;
        b.nextBytes(x);
        if (t > 0) {
          x[0] &= (1 << t) - 1;
        } else
        {
          x[0] = 0;
        }
        this.fromString(x, 256);
      }
    };
    // BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
    // (protected) r = this op a (bitwise)
    BigInteger.prototype.bitwiseTo = function (a, op, r) {
      var i;
      var f;
      var m = Math.min(a.t, this.t);
      for (i = 0; i < m; ++i) {
        r[i] = op(this[i], a[i]);
      }
      if (a.t < this.t) {
        f = a.s & this.DM;
        for (i = m; i < this.t; ++i) {
          r[i] = op(this[i], f);
        }
        r.t = this.t;
      } else
      {
        f = this.s & this.DM;
        for (i = m; i < a.t; ++i) {
          r[i] = op(f, a[i]);
        }
        r.t = a.t;
      }
      r.s = op(this.s, a.s);
      r.clamp();
    };
    // BigInteger.prototype.changeBit = bnpChangeBit;
    // (protected) this op (1<<n)
    BigInteger.prototype.changeBit = function (n, op) {
      var r = BigInteger.ONE.shiftLeft(n);
      this.bitwiseTo(r, op, r);
      return r;
    };
    // BigInteger.prototype.addTo = bnpAddTo;
    // (protected) r = this + a
    BigInteger.prototype.addTo = function (a, r) {
      var i = 0;
      var c = 0;
      var m = Math.min(a.t, this.t);
      while (i < m) {
        c += this[i] + a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      if (a.t < this.t) {
        c += a.s;
        while (i < this.t) {
          c += this[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += this.s;
      } else
      {
        c += this.s;
        while (i < a.t) {
          c += a[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += a.s;
      }
      r.s = c < 0 ? -1 : 0;
      if (c > 0) {
        r[i++] = c;
      } else
      if (c < -1) {
        r[i++] = this.DV + c;
      }
      r.t = i;
      r.clamp();
    };
    // BigInteger.prototype.dMultiply = bnpDMultiply;
    // (protected) this *= n, this >= 0, 1 < n < DV
    BigInteger.prototype.dMultiply = function (n) {
      this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
      ++this.t;
      this.clamp();
    };
    // BigInteger.prototype.dAddOffset = bnpDAddOffset;
    // (protected) this += n << w words, this >= 0
    BigInteger.prototype.dAddOffset = function (n, w) {
      if (n == 0) {
        return;
      }
      while (this.t <= w) {
        this[this.t++] = 0;
      }
      this[w] += n;
      while (this[w] >= this.DV) {
        this[w] -= this.DV;
        if (++w >= this.t) {
          this[this.t++] = 0;
        }
        ++this[w];
      }
    };
    // BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
    // (protected) r = lower n words of "this * a", a.t <= n
    // "this" should be the larger one if appropriate.
    BigInteger.prototype.multiplyLowerTo = function (a, n, r) {
      var i = Math.min(this.t + a.t, n);
      r.s = 0; // assumes a,this >= 0
      r.t = i;
      while (i > 0) {
        r[--i] = 0;
      }
      for (var j = r.t - this.t; i < j; ++i) {
        r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
      }
      for (var j = Math.min(a.t, n); i < j; ++i) {
        this.am(0, a[i], r, i, 0, n - i);
      }
      r.clamp();
    };
    // BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
    // (protected) r = "this * a" without lower n words, n > 0
    // "this" should be the larger one if appropriate.
    BigInteger.prototype.multiplyUpperTo = function (a, n, r) {
      --n;
      var i = r.t = this.t + a.t - n;
      r.s = 0; // assumes a,this >= 0
      while (--i >= 0) {
        r[i] = 0;
      }
      for (i = Math.max(n - this.t, 0); i < a.t; ++i) {
        r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
      }
      r.clamp();
      r.drShiftTo(1, r);
    };
    // BigInteger.prototype.modInt = bnpModInt;
    // (protected) this % n, n < 2^26
    BigInteger.prototype.modInt = function (n) {
      if (n <= 0) {
        return 0;
      }
      var d = this.DV % n;
      var r = this.s < 0 ? n - 1 : 0;
      if (this.t > 0) {
        if (d == 0) {
          r = this[0] % n;
        } else
        {
          for (var i = this.t - 1; i >= 0; --i) {
            r = (d * r + this[i]) % n;
          }
        }
      }
      return r;
    };
    // BigInteger.prototype.millerRabin = bnpMillerRabin;
    // (protected) true if probably prime (HAC 4.24, Miller-Rabin)
    BigInteger.prototype.millerRabin = function (t) {
      var n1 = this.subtract(BigInteger.ONE);
      var k = n1.getLowestSetBit();
      if (k <= 0) {
        return false;
      }
      var r = n1.shiftRight(k);
      t = t + 1 >> 1;
      if (t > lowprimes.length) {
        t = lowprimes.length;
      }
      var a = nbi();
      for (var i = 0; i < t; ++i) {
        // Pick bases at random, instead of starting at 2
        a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var y = a.modPow(r, this);
        if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
          var j = 1;
          while (j++ < k && y.compareTo(n1) != 0) {
            y = y.modPowInt(2, this);
            if (y.compareTo(BigInteger.ONE) == 0) {
              return false;
            }
          }
          if (y.compareTo(n1) != 0) {
            return false;
          }
        }
      }
      return true;
    };
    // BigInteger.prototype.square = bnSquare;
    // (public) this^2
    BigInteger.prototype.square = function () {
      var r = nbi();
      this.squareTo(r);
      return r;
    };
    //#region ASYNC
    // Public API method
    BigInteger.prototype.gcda = function (a, callback) {
      var x = this.s < 0 ? this.negate() : this.clone();
      var y = a.s < 0 ? a.negate() : a.clone();
      if (x.compareTo(y) < 0) {
        var t = x;
        x = y;
        y = t;
      }
      var i = x.getLowestSetBit();
      var g = y.getLowestSetBit();
      if (g < 0) {
        callback(x);
        return;
      }
      if (i < g) {
        g = i;
      }
      if (g > 0) {
        x.rShiftTo(g, x);
        y.rShiftTo(g, y);
      }
      // Workhorse of the algorithm, gets called 200 - 800 times per 512 bit keygen.
      var gcda1 = function gcda1() {
        if ((i = x.getLowestSetBit()) > 0) {
          x.rShiftTo(i, x);
        }
        if ((i = y.getLowestSetBit()) > 0) {
          y.rShiftTo(i, y);
        }
        if (x.compareTo(y) >= 0) {
          x.subTo(y, x);
          x.rShiftTo(1, x);
        } else
        {
          y.subTo(x, y);
          y.rShiftTo(1, y);
        }
        if (!(x.signum() > 0)) {
          if (g > 0) {
            y.lShiftTo(g, y);
          }
          setTimeout(function () {callback(y);}, 0); // escape
        } else
        {
          setTimeout(gcda1, 0);
        }
      };
      setTimeout(gcda1, 10);
    };
    // (protected) alternate constructor
    BigInteger.prototype.fromNumberAsync = function (a, b, c, callback) {
      if ("number" == typeof b) {
        if (a < 2) {
          this.fromInt(1);
        } else
        {
          this.fromNumber(a, c);
          if (!this.testBit(a - 1)) {
            this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
          }
          if (this.isEven()) {
            this.dAddOffset(1, 0);
          }
          var bnp_1 = this;
          var bnpfn1_1 = function bnpfn1_1() {
            bnp_1.dAddOffset(2, 0);
            if (bnp_1.bitLength() > a) {
              bnp_1.subTo(BigInteger.ONE.shiftLeft(a - 1), bnp_1);
            }
            if (bnp_1.isProbablePrime(b)) {
              setTimeout(function () {callback();}, 0); // escape
            } else
            {
              setTimeout(bnpfn1_1, 0);
            }
          };
          setTimeout(bnpfn1_1, 0);
        }
      } else
      {
        var x = [];
        var t = a & 7;
        x.length = (a >> 3) + 1;
        b.nextBytes(x);
        if (t > 0) {
          x[0] &= (1 << t) - 1;
        } else
        {
          x[0] = 0;
        }
        this.fromString(x, 256);
      }
    };
    return BigInteger;
  }();
  //#region REDUCERS
  //#region NullExp
  var NullExp = /** @class */function () {
    function NullExp() {
    }
    // NullExp.prototype.convert = nNop;
    NullExp.prototype.convert = function (x) {
      return x;
    };
    // NullExp.prototype.revert = nNop;
    NullExp.prototype.revert = function (x) {
      return x;
    };
    // NullExp.prototype.mulTo = nMulTo;
    NullExp.prototype.mulTo = function (x, y, r) {
      x.multiplyTo(y, r);
    };
    // NullExp.prototype.sqrTo = nSqrTo;
    NullExp.prototype.sqrTo = function (x, r) {
      x.squareTo(r);
    };
    return NullExp;
  }();
  // Modular reduction using "classic" algorithm
  var Classic = /** @class */function () {
    function Classic(m) {
      this.m = m;
    }
    // Classic.prototype.convert = cConvert;
    Classic.prototype.convert = function (x) {
      if (x.s < 0 || x.compareTo(this.m) >= 0) {
        return x.mod(this.m);
      } else
      {
        return x;
      }
    };
    // Classic.prototype.revert = cRevert;
    Classic.prototype.revert = function (x) {
      return x;
    };
    // Classic.prototype.reduce = cReduce;
    Classic.prototype.reduce = function (x) {
      x.divRemTo(this.m, null, x);
    };
    // Classic.prototype.mulTo = cMulTo;
    Classic.prototype.mulTo = function (x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    };
    // Classic.prototype.sqrTo = cSqrTo;
    Classic.prototype.sqrTo = function (x, r) {
      x.squareTo(r);
      this.reduce(r);
    };
    return Classic;
  }();
  //#endregion
  //#region Montgomery
  // Montgomery reduction
  var Montgomery = /** @class */function () {
    function Montgomery(m) {
      this.m = m;
      this.mp = m.invDigit();
      this.mpl = this.mp & 0x7fff;
      this.mph = this.mp >> 15;
      this.um = (1 << m.DB - 15) - 1;
      this.mt2 = 2 * m.t;
    }
    // Montgomery.prototype.convert = montConvert;
    // xR mod m
    Montgomery.prototype.convert = function (x) {
      var r = nbi();
      x.abs().dlShiftTo(this.m.t, r);
      r.divRemTo(this.m, null, r);
      if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
        this.m.subTo(r, r);
      }
      return r;
    };
    // Montgomery.prototype.revert = montRevert;
    // x/R mod m
    Montgomery.prototype.revert = function (x) {
      var r = nbi();
      x.copyTo(r);
      this.reduce(r);
      return r;
    };
    // Montgomery.prototype.reduce = montReduce;
    // x = x/R mod m (HAC 14.32)
    Montgomery.prototype.reduce = function (x) {
      while (x.t <= this.mt2) {
        // pad x so am has enough room later
        x[x.t++] = 0;
      }
      for (var i = 0; i < this.m.t; ++i) {
        // faster way of calculating u0 = x[i]*mp mod DV
        var j = x[i] & 0x7fff;
        var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM;
        // use am to combine the multiply-shift-add into one call
        j = i + this.m.t;
        x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
        // propagate carry
        while (x[j] >= x.DV) {
          x[j] -= x.DV;
          x[++j]++;
        }
      }
      x.clamp();
      x.drShiftTo(this.m.t, x);
      if (x.compareTo(this.m) >= 0) {
        x.subTo(this.m, x);
      }
    };
    // Montgomery.prototype.mulTo = montMulTo;
    // r = "xy/R mod m"; x,y != r
    Montgomery.prototype.mulTo = function (x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    };
    // Montgomery.prototype.sqrTo = montSqrTo;
    // r = "x^2/R mod m"; x != r
    Montgomery.prototype.sqrTo = function (x, r) {
      x.squareTo(r);
      this.reduce(r);
    };
    return Montgomery;
  }();
  //#endregion Montgomery
  //#region Barrett
  // Barrett modular reduction
  var Barrett = /** @class */function () {
    function Barrett(m) {
      this.m = m;
      // setup Barrett
      this.r2 = nbi();
      this.q3 = nbi();
      BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
      this.mu = this.r2.divide(m);
    }
    // Barrett.prototype.convert = barrettConvert;
    Barrett.prototype.convert = function (x) {
      if (x.s < 0 || x.t > 2 * this.m.t) {
        return x.mod(this.m);
      } else
      if (x.compareTo(this.m) < 0) {
        return x;
      } else
      {
        var r = nbi();
        x.copyTo(r);
        this.reduce(r);
        return r;
      }
    };
    // Barrett.prototype.revert = barrettRevert;
    Barrett.prototype.revert = function (x) {
      return x;
    };
    // Barrett.prototype.reduce = barrettReduce;
    // x = x mod m (HAC 14.42)
    Barrett.prototype.reduce = function (x) {
      x.drShiftTo(this.m.t - 1, this.r2);
      if (x.t > this.m.t + 1) {
        x.t = this.m.t + 1;
        x.clamp();
      }
      this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
      this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
      while (x.compareTo(this.r2) < 0) {
        x.dAddOffset(1, this.m.t + 1);
      }
      x.subTo(this.r2, x);
      while (x.compareTo(this.m) >= 0) {
        x.subTo(this.m, x);
      }
    };
    // Barrett.prototype.mulTo = barrettMulTo;
    // r = x*y mod m; x,y != r
    Barrett.prototype.mulTo = function (x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    };
    // Barrett.prototype.sqrTo = barrettSqrTo;
    // r = x^2 mod m; x != r
    Barrett.prototype.sqrTo = function (x, r) {
      x.squareTo(r);
      this.reduce(r);
    };
    return Barrett;
  }();
  //#endregion
  //#endregion REDUCERS
  // return new, unset BigInteger
  function nbi() {return new BigInteger(null);}
  function parseBigInt(str, r) {
    return new BigInteger(str, r);
  }
  // am: Compute w_j += (x*this_i), propagate carries,
  // c is initial carry, returns final carry.
  // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
  // We need to select the fastest one that works in this environment.
  // am1: use a single mult and divide to get the high bits,
  // max digit bits should be 26 because
  // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
  function am1(i, x, w, j, c, n) {
    while (--n >= 0) {
      var v = x * this[i++] + w[j] + c;
      c = Math.floor(v / 0x4000000);
      w[j++] = v & 0x3ffffff;
    }
    return c;
  }
  // am2 avoids a big mult-and-extract completely.
  // Max digit bits should be <= 30 because we do bitwise ops
  // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
  function am2(i, x, w, j, c, n) {
    var xl = x & 0x7fff;
    var xh = x >> 15;
    while (--n >= 0) {
      var l = this[i] & 0x7fff;
      var h = this[i++] >> 15;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
      c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
      w[j++] = l & 0x3fffffff;
    }
    return c;
  }
  // Alternately, set max digit bits to 28 since some
  // browsers slow down when dealing with 32-bit numbers.
  function am3(i, x, w, j, c, n) {
    var xl = x & 0x3fff;
    var xh = x >> 14;
    while (--n >= 0) {
      var l = this[i] & 0x3fff;
      var h = this[i++] >> 14;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
      c = (l >> 28) + (m >> 14) + xh * h;
      w[j++] = l & 0xfffffff;
    }
    return c;
  }
  if (j_lm && navigator.appName == "Microsoft Internet Explorer") {
    BigInteger.prototype.am = am2;
    dbits = 30;
  } else
  if (j_lm && navigator.appName != "Netscape") {
    BigInteger.prototype.am = am1;
    dbits = 26;
  } else
  {// Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
  }
  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = (1 << dbits) - 1;
  BigInteger.prototype.DV = 1 << dbits;
  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2, BI_FP);
  BigInteger.prototype.F1 = BI_FP - dbits;
  BigInteger.prototype.F2 = 2 * dbits - BI_FP;
  // Digit conversions
  var BI_RC = [];
  var rr;
  var vv;
  rr = "0".charCodeAt(0);
  for (vv = 0; vv <= 9; ++vv) {
    BI_RC[rr++] = vv;
  }
  rr = "a".charCodeAt(0);
  for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
  }
  rr = "A".charCodeAt(0);
  for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
  }
  function intAt(s, i) {
    var c = BI_RC[s.charCodeAt(i)];
    return c == null ? -1 : c;
  }
  // return bigint initialized to value
  function nbv(i) {
    var r = nbi();
    r.fromInt(i);
    return r;
  }
  // returns bit length of the integer x
  function nbits(x) {
    var r = 1;
    var t;
    if ((t = x >>> 16) != 0) {
      x = t;
      r += 16;
    }
    if ((t = x >> 8) != 0) {
      x = t;
      r += 8;
    }
    if ((t = x >> 4) != 0) {
      x = t;
      r += 4;
    }
    if ((t = x >> 2) != 0) {
      x = t;
      r += 2;
    }
    if ((t = x >> 1) != 0) {
      x = t;
      r += 1;
    }
    return r;
  }
  // "constants"
  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1);

  // prng4.js - uses Arcfour as a PRNG
  var Arcfour = /** @class */function () {
    function Arcfour() {
      this.i = 0;
      this.j = 0;
      this.S = [];
    }
    // Arcfour.prototype.init = ARC4init;
    // Initialize arcfour context from key, an array of ints, each from [0..255]
    Arcfour.prototype.init = function (key) {
      var i;
      var j;
      var t;
      for (i = 0; i < 256; ++i) {
        this.S[i] = i;
      }
      j = 0;
      for (i = 0; i < 256; ++i) {
        j = j + this.S[i] + key[i % key.length] & 255;
        t = this.S[i];
        this.S[i] = this.S[j];
        this.S[j] = t;
      }
      this.i = 0;
      this.j = 0;
    };
    // Arcfour.prototype.next = ARC4next;
    Arcfour.prototype.next = function () {
      var t;
      this.i = this.i + 1 & 255;
      this.j = this.j + this.S[this.i] & 255;
      t = this.S[this.i];
      this.S[this.i] = this.S[this.j];
      this.S[this.j] = t;
      return this.S[t + this.S[this.i] & 255];
    };
    return Arcfour;
  }();
  // Plug in your RNG constructor here
  function prng_newstate() {
    return new Arcfour();
  }
  // Pool size must be a multiple of 4 and greater than 32.
  // An array of bytes the size of the pool will be passed to init()
  var rng_psize = 256;

  // Random number generator - requires a PRNG backend, e.g. prng4.js
  var rng_state;
  var rng_pool = null;
  var rng_pptr;
  // Initialize the pool with junk if needed.
  if (rng_pool == null) {
    rng_pool = [];
    rng_pptr = 0;
    var t = void 0;
    if (window.crypto && window.crypto.getRandomValues) {
      // Extract entropy (2048 bits) from RNG if available
      var z = new Uint32Array(256);
      window.crypto.getRandomValues(z);
      for (t = 0; t < z.length; ++t) {
        rng_pool[rng_pptr++] = z[t] & 255;
      }
    }
    // Use mouse events for entropy, if we do not have enough entropy by the time
    // we need it, entropy will be generated by Math.random.
    var onMouseMoveListener_1 = function onMouseMoveListener_1(ev) {
      this.count = this.count || 0;
      if (this.count >= 256 || rng_pptr >= rng_psize) {
        if (window.removeEventListener) {
          window.removeEventListener("mousemove", onMouseMoveListener_1, false);
        } else
        if (window.detachEvent) {
          window.detachEvent("onmousemove", onMouseMoveListener_1);
        }
        return;
      }
      try {
        var mouseCoordinates = ev.x + ev.y;
        rng_pool[rng_pptr++] = mouseCoordinates & 255;
        this.count += 1;
      }
      catch (e) {
        // Sometimes Firefox will deny permission to access event properties for some reason. Ignore.
      }
    };
    if (window.addEventListener) {
      window.addEventListener("mousemove", onMouseMoveListener_1, false);
    } else
    if (window.attachEvent) {
      window.attachEvent("onmousemove", onMouseMoveListener_1);
    }
  }
  function rng_get_byte() {
    if (rng_state == null) {
      rng_state = prng_newstate();
      // At this point, we may not have collected enough entropy.  If not, fall back to Math.random
      while (rng_pptr < rng_psize) {
        var random = Math.floor(65536 * Math.random());
        rng_pool[rng_pptr++] = random & 255;
      }
      rng_state.init(rng_pool);
      for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
        rng_pool[rng_pptr] = 0;
      }
      rng_pptr = 0;
    }
    // TODO: allow reseeding after first request
    return rng_state.next();
  }
  var SecureRandom = /** @class */function () {
    function SecureRandom() {
    }
    SecureRandom.prototype.nextBytes = function (ba) {
      for (var i = 0; i < ba.length; ++i) {
        ba[i] = rng_get_byte();
      }
    };
    return SecureRandom;
  }();

  // Depends on jsbn.js and rng.js
  // function linebrk(s,n) {
  //   var ret = "";
  //   var i = 0;
  //   while(i + n < s.length) {
  //     ret += s.substring(i,i+n) + "\n";
  //     i += n;
  //   }
  //   return ret + s.substring(i,s.length);
  // }
  // function byte2Hex(b) {
  //   if(b < 0x10)
  //     return "0" + b.toString(16);
  //   else
  //     return b.toString(16);
  // }
  function pkcs1pad1(s, n) {
    if (n < s.length + 22) {
      console.error("Message too long for RSA");
      return null;
    }
    var len = n - s.length - 6;
    var filler = "";
    for (var f = 0; f < len; f += 2) {
      filler += "ff";
    }
    var m = "0001" + filler + "00" + s;
    return parseBigInt(m, 16);
  }
  // PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
  function pkcs1pad2(s, n) {
    if (n < s.length + 11) {// TODO: fix for utf-8
      console.error("Message too long for RSA");
      return null;
    }
    var ba = [];
    var i = s.length - 1;
    while (i >= 0 && n > 0) {
      var c = s.charCodeAt(i--);
      if (c < 128) {// encode using utf-8
        ba[--n] = c;
      } else
      if (c > 127 && c < 2048) {
        ba[--n] = c & 63 | 128;
        ba[--n] = c >> 6 | 192;
      } else
      {
        ba[--n] = c & 63 | 128;
        ba[--n] = c >> 6 & 63 | 128;
        ba[--n] = c >> 12 | 224;
      }
    }
    ba[--n] = 0;
    var rng = new SecureRandom();
    var x = [];
    while (n > 2) {// random non-zero pad
      x[0] = 0;
      while (x[0] == 0) {
        rng.nextBytes(x);
      }
      ba[--n] = x[0];
    }
    ba[--n] = 2;
    ba[--n] = 0;
    return new BigInteger(ba);
  }
  // "empty" RSA key constructor
  var RSAKey = /** @class */function () {
    function RSAKey() {
      this.n = null;
      this.e = 0;
      this.d = null;
      this.p = null;
      this.q = null;
      this.dmp1 = null;
      this.dmq1 = null;
      this.coeff = null;
    }
    //#region PROTECTED
    // protected
    // RSAKey.prototype.doPublic = RSADoPublic;
    // Perform raw public operation on "x": return x^e (mod n)
    RSAKey.prototype.doPublic = function (x) {
      return x.modPowInt(this.e, this.n);
    };
    // RSAKey.prototype.doPrivate = RSADoPrivate;
    // Perform raw private operation on "x": return x^d (mod n)
    RSAKey.prototype.doPrivate = function (x) {
      if (this.p == null || this.q == null) {
        return x.modPow(this.d, this.n);
      }
      // TODO: re-calculate any missing CRT params
      var xp = x.mod(this.p).modPow(this.dmp1, this.p);
      var xq = x.mod(this.q).modPow(this.dmq1, this.q);
      while (xp.compareTo(xq) < 0) {
        xp = xp.add(this.p);
      }
      return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
    };
    //#endregion PROTECTED
    //#region PUBLIC
    // RSAKey.prototype.setPublic = RSASetPublic;
    // Set the public key fields N and e from hex strings
    RSAKey.prototype.setPublic = function (N, E) {
      if (N != null && E != null && N.length > 0 && E.length > 0) {
        this.n = parseBigInt(N, 16);
        this.e = parseInt(E, 16);
      } else
      {
        console.error("Invalid RSA public key");
      }
    };
    // RSAKey.prototype.encrypt = RSAEncrypt;
    // Return the PKCS#1 RSA encryption of "text" as an even-length hex string
    RSAKey.prototype.encrypt = function (text) {
      var m = pkcs1pad2(text, this.n.bitLength() + 7 >> 3);
      if (m == null) {
        return null;
      }
      var c = this.doPublic(m);
      if (c == null) {
        return null;
      }
      var h = c.toString(16);
      if ((h.length & 1) == 0) {
        return h;
      } else
      {
        return "0" + h;
      }
    };
    // RSAKey.prototype.setPrivate = RSASetPrivate;
    // Set the private key fields N, e, and d from hex strings
    RSAKey.prototype.setPrivate = function (N, E, D) {
      if (N != null && E != null && N.length > 0 && E.length > 0) {
        this.n = parseBigInt(N, 16);
        this.e = parseInt(E, 16);
        this.d = parseBigInt(D, 16);
      } else
      {
        console.error("Invalid RSA private key");
      }
    };
    // RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
    // Set the private key fields N, e, d and CRT params from hex strings
    RSAKey.prototype.setPrivateEx = function (N, E, D, P, Q, DP, DQ, C) {
      if (N != null && E != null && N.length > 0 && E.length > 0) {
        this.n = parseBigInt(N, 16);
        this.e = parseInt(E, 16);
        this.d = parseBigInt(D, 16);
        this.p = parseBigInt(P, 16);
        this.q = parseBigInt(Q, 16);
        this.dmp1 = parseBigInt(DP, 16);
        this.dmq1 = parseBigInt(DQ, 16);
        this.coeff = parseBigInt(C, 16);
      } else
      {
        console.error("Invalid RSA private key");
      }
    };
    // RSAKey.prototype.generate = RSAGenerate;
    // Generate a new random private key B bits long, using public expt E
    RSAKey.prototype.generate = function (B, E) {
      var rng = new SecureRandom();
      var qs = B >> 1;
      this.e = parseInt(E, 16);
      var ee = new BigInteger(E, 16);
      for (;;) {
        for (;;) {
          this.p = new BigInteger(B - qs, 1, rng);
          if (this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
            break;
          }
        }
        for (;;) {
          this.q = new BigInteger(qs, 1, rng);
          if (this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
            break;
          }
        }
        if (this.p.compareTo(this.q) <= 0) {
          var t = this.p;
          this.p = this.q;
          this.q = t;
        }
        var p1 = this.p.subtract(BigInteger.ONE);
        var q1 = this.q.subtract(BigInteger.ONE);
        var phi = p1.multiply(q1);
        if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
          this.n = this.p.multiply(this.q);
          this.d = ee.modInverse(phi);
          this.dmp1 = this.d.mod(p1);
          this.dmq1 = this.d.mod(q1);
          this.coeff = this.q.modInverse(this.p);
          break;
        }
      }
    };
    // RSAKey.prototype.decrypt = RSADecrypt;
    // Return the PKCS#1 RSA decryption of "ctext".
    // "ctext" is an even-length hex string and the output is a plain string.
    RSAKey.prototype.decrypt = function (ctext) {
      var c = parseBigInt(ctext, 16);
      var m = this.doPrivate(c);
      if (m == null) {
        return null;
      }
      return pkcs1unpad2(m, this.n.bitLength() + 7 >> 3);
    };
    // Generate a new random private key B bits long, using public expt E
    RSAKey.prototype.generateAsync = function (B, E, callback) {
      var rng = new SecureRandom();
      var qs = B >> 1;
      this.e = parseInt(E, 16);
      var ee = new BigInteger(E, 16);
      var rsa = this;
      // These functions have non-descript names because they were originally for(;;) loops.
      // I don't know about cryptography to give them better names than loop1-4.
      var loop1 = function loop1() {
        var loop4 = function loop4() {
          if (rsa.p.compareTo(rsa.q) <= 0) {
            var t = rsa.p;
            rsa.p = rsa.q;
            rsa.q = t;
          }
          var p1 = rsa.p.subtract(BigInteger.ONE);
          var q1 = rsa.q.subtract(BigInteger.ONE);
          var phi = p1.multiply(q1);
          if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
            rsa.n = rsa.p.multiply(rsa.q);
            rsa.d = ee.modInverse(phi);
            rsa.dmp1 = rsa.d.mod(p1);
            rsa.dmq1 = rsa.d.mod(q1);
            rsa.coeff = rsa.q.modInverse(rsa.p);
            setTimeout(function () {callback();}, 0); // escape
          } else
          {
            setTimeout(loop1, 0);
          }
        };
        var loop3 = function loop3() {
          rsa.q = nbi();
          rsa.q.fromNumberAsync(qs, 1, rng, function () {
            rsa.q.subtract(BigInteger.ONE).gcda(ee, function (r) {
              if (r.compareTo(BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {
                setTimeout(loop4, 0);
              } else
              {
                setTimeout(loop3, 0);
              }
            });
          });
        };
        var loop2 = function loop2() {
          rsa.p = nbi();
          rsa.p.fromNumberAsync(B - qs, 1, rng, function () {
            rsa.p.subtract(BigInteger.ONE).gcda(ee, function (r) {
              if (r.compareTo(BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {
                setTimeout(loop3, 0);
              } else
              {
                setTimeout(loop2, 0);
              }
            });
          });
        };
        setTimeout(loop2, 0);
      };
      setTimeout(loop1, 0);
    };
    RSAKey.prototype.sign = function (text, digestMethod, digestName) {
      var header = getDigestHeader(digestName);
      var digest = header + digestMethod(text).toString();
      var m = pkcs1pad1(digest, this.n.bitLength() / 4);
      if (m == null) {
        return null;
      }
      var c = this.doPrivate(m);
      if (c == null) {
        return null;
      }
      var h = c.toString(16);
      if ((h.length & 1) == 0) {
        return h;
      } else
      {
        return "0" + h;
      }
    };
    RSAKey.prototype.verify = function (text, signature, digestMethod) {
      var c = parseBigInt(signature, 16);
      var m = this.doPublic(c);
      if (m == null) {
        return null;
      }
      var unpadded = m.toString(16).replace(/^1f+00/, "");
      var digest = removeDigestHeader(unpadded);
      return digest == digestMethod(text).toString();
    };
    return RSAKey;
  }();
  // Undo PKCS#1 (type 2, random) padding and, if valid, return the plaintext
  function pkcs1unpad2(d, n) {
    var b = d.toByteArray();
    var i = 0;
    while (i < b.length && b[i] == 0) {
      ++i;
    }
    if (b.length - i != n - 1 || b[i] != 2) {
      return null;
    }
    ++i;
    while (b[i] != 0) {
      if (++i >= b.length) {
        return null;
      }
    }
    var ret = "";
    while (++i < b.length) {
      var c = b[i] & 255;
      if (c < 128) {// utf-8 decode
        ret += String.fromCharCode(c);
      } else
      if (c > 191 && c < 224) {
        ret += String.fromCharCode((c & 31) << 6 | b[i + 1] & 63);
        ++i;
      } else
      {
        ret += String.fromCharCode((c & 15) << 12 | (b[i + 1] & 63) << 6 | b[i + 2] & 63);
        i += 2;
      }
    }
    return ret;
  }
  // https://tools.ietf.org/html/rfc3447#page-43
  var DIGEST_HEADERS = {
    md2: "3020300c06082a864886f70d020205000410",
    md5: "3020300c06082a864886f70d020505000410",
    sha1: "3021300906052b0e03021a05000414",
    sha224: "302d300d06096086480165030402040500041c",
    sha256: "3031300d060960864801650304020105000420",
    sha384: "3041300d060960864801650304020205000430",
    sha512: "3051300d060960864801650304020305000440",
    ripemd160: "3021300906052b2403020105000414" };

  function getDigestHeader(name) {
    return DIGEST_HEADERS[name] || "";
  }
  function removeDigestHeader(str) {
    for (var name_1 in DIGEST_HEADERS) {
      if (DIGEST_HEADERS.hasOwnProperty(name_1)) {
        var header = DIGEST_HEADERS[name_1];
        var len = header.length;
        if (str.substr(0, len) == header) {
          return str.substr(len);
        }
      }
    }
    return str;
  }
  // Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
  // function RSAEncryptB64(text) {
  //  var h = this.encrypt(text);
  //  if(h) return hex2b64(h); else return null;
  // }
  // public
  // RSAKey.prototype.encrypt_b64 = RSAEncryptB64;

  /*!
  Copyright (c) 2011, Yahoo! Inc. All rights reserved.
  Code licensed under the BSD License:
  http://developer.yahoo.com/yui/license.html
  version: 2.9.0
  */
  var YAHOO = {};
  YAHOO.lang = {
    /**
                  * Utility to set up the prototype, constructor and superclass properties to
                  * support an inheritance strategy that can chain constructors and methods.
                  * Static members will not be inherited.
                  *
                  * @method extend
                  * @static
                  * @param {Function} subc   the object to modify
                  * @param {Function} superc the object to inherit
                  * @param {Object} overrides  additional properties/methods to add to the
                  *                              subclass prototype.  These will override the
                  *                              matching items obtained from the superclass
                  *                              if present.
                  */
    extend: function extend(subc, superc, overrides) {
      if (!superc || !subc) {
        throw new Error("YAHOO.lang.extend failed, please check that " +
        "all dependencies are included.");
      }

      var F = function F() {};
      F.prototype = superc.prototype;
      subc.prototype = new F();
      subc.prototype.constructor = subc;
      subc.superclass = superc.prototype;

      if (superc.prototype.constructor == Object.prototype.constructor) {
        superc.prototype.constructor = superc;
      }

      if (overrides) {
        var i;
        for (i in overrides) {
          subc.prototype[i] = overrides[i];
        }

        /*
           * IE will not enumerate native functions in a derived object even if the
           * function was overridden.  This is a workaround for specific functions
           * we care about on the Object prototype.
           * @property _IEEnumFix
           * @param {Function} r  the object to receive the augmentation
           * @param {Function} s  the object that supplies the properties to augment
           * @static
           * @private
           */
        var _IEEnumFix = function _IEEnumFix() {},
        ADD = ["toString", "valueOf"];
        try {
          if (/MSIE/.test(navigator.userAgent)) {
            _IEEnumFix = function _IEEnumFix(r, s) {
              for (i = 0; i < ADD.length; i = i + 1) {
                var fname = ADD[i],f = s[fname];
                if (typeof f === 'function' && f != Object.prototype[fname]) {
                  r[fname] = f;
                }
              }
            };
          }
        } catch (ex) {}_IEEnumFix(subc.prototype, overrides);
      }
    } };


  /* asn1-1.0.13.js (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
          */

  /**
              * @fileOverview
              * @name asn1-1.0.js
              * @author Kenji Urushima kenji.urushima@gmail.com
              * @version asn1 1.0.13 (2017-Jun-02)
              * @since jsrsasign 2.1
              * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
              */

  /**
                  * kjur's class library name space
                  * <p>
                  * This name space provides following name spaces:
                  * <ul>
                  * <li>{@link KJUR.asn1} - ASN.1 primitive hexadecimal encoder</li>
                  * <li>{@link KJUR.asn1.x509} - ASN.1 structure for X.509 certificate and CRL</li>
                  * <li>{@link KJUR.crypto} - Java Cryptographic Extension(JCE) style MessageDigest/Signature
                  * class and utilities</li>
                  * </ul>
                  * </p>
                  * NOTE: Please ignore method summary and document of this namespace. This caused by a bug of jsdoc2.
                  * @name KJUR
                  * @namespace kjur's class library name space
                  */
  var KJUR = {};

  /**
                  * kjur's ASN.1 class library name space
                  * <p>
                  * This is ITU-T X.690 ASN.1 DER encoder class library and
                  * class structure and methods is very similar to
                  * org.bouncycastle.asn1 package of
                  * well known BouncyCaslte Cryptography Library.
                  * <h4>PROVIDING ASN.1 PRIMITIVES</h4>
                  * Here are ASN.1 DER primitive classes.
                  * <ul>
                  * <li>0x01 {@link KJUR.asn1.DERBoolean}</li>
                  * <li>0x02 {@link KJUR.asn1.DERInteger}</li>
                  * <li>0x03 {@link KJUR.asn1.DERBitString}</li>
                  * <li>0x04 {@link KJUR.asn1.DEROctetString}</li>
                  * <li>0x05 {@link KJUR.asn1.DERNull}</li>
                  * <li>0x06 {@link KJUR.asn1.DERObjectIdentifier}</li>
                  * <li>0x0a {@link KJUR.asn1.DEREnumerated}</li>
                  * <li>0x0c {@link KJUR.asn1.DERUTF8String}</li>
                  * <li>0x12 {@link KJUR.asn1.DERNumericString}</li>
                  * <li>0x13 {@link KJUR.asn1.DERPrintableString}</li>
                  * <li>0x14 {@link KJUR.asn1.DERTeletexString}</li>
                  * <li>0x16 {@link KJUR.asn1.DERIA5String}</li>
                  * <li>0x17 {@link KJUR.asn1.DERUTCTime}</li>
                  * <li>0x18 {@link KJUR.asn1.DERGeneralizedTime}</li>
                  * <li>0x30 {@link KJUR.asn1.DERSequence}</li>
                  * <li>0x31 {@link KJUR.asn1.DERSet}</li>
                  * </ul>
                  * <h4>OTHER ASN.1 CLASSES</h4>
                  * <ul>
                  * <li>{@link KJUR.asn1.ASN1Object}</li>
                  * <li>{@link KJUR.asn1.DERAbstractString}</li>
                  * <li>{@link KJUR.asn1.DERAbstractTime}</li>
                  * <li>{@link KJUR.asn1.DERAbstractStructured}</li>
                  * <li>{@link KJUR.asn1.DERTaggedObject}</li>
                  * </ul>
                  * <h4>SUB NAME SPACES</h4>
                  * <ul>
                  * <li>{@link KJUR.asn1.cades} - CAdES long term signature format</li>
                  * <li>{@link KJUR.asn1.cms} - Cryptographic Message Syntax</li>
                  * <li>{@link KJUR.asn1.csr} - Certificate Signing Request (CSR/PKCS#10)</li>
                  * <li>{@link KJUR.asn1.tsp} - RFC 3161 Timestamping Protocol Format</li>
                  * <li>{@link KJUR.asn1.x509} - RFC 5280 X.509 certificate and CRL</li>
                  * </ul>
                  * </p>
                  * NOTE: Please ignore method summary and document of this namespace.
                  * This caused by a bug of jsdoc2.
                  * @name KJUR.asn1
                  * @namespace
                  */
  if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) KJUR.asn1 = {};

  /**
                                                                      * ASN1 utilities class
                                                                      * @name KJUR.asn1.ASN1Util
                                                                      * @class ASN1 utilities class
                                                                      * @since asn1 1.0.2
                                                                      */
  KJUR.asn1.ASN1Util = new function () {
    this.integerToByteHex = function (i) {
      var h = i.toString(16);
      if (h.length % 2 == 1) h = '0' + h;
      return h;
    };
    this.bigIntToMinTwosComplementsHex = function (bigIntegerValue) {
      var h = bigIntegerValue.toString(16);
      if (h.substr(0, 1) != '-') {
        if (h.length % 2 == 1) {
          h = '0' + h;
        } else {
          if (!h.match(/^[0-7]/)) {
            h = '00' + h;
          }
        }
      } else {
        var hPos = h.substr(1);
        var xorLen = hPos.length;
        if (xorLen % 2 == 1) {
          xorLen += 1;
        } else {
          if (!h.match(/^[0-7]/)) {
            xorLen += 2;
          }
        }
        var hMask = '';
        for (var i = 0; i < xorLen; i++) {
          hMask += 'f';
        }
        var biMask = new BigInteger(hMask, 16);
        var biNeg = biMask.xor(bigIntegerValue).add(BigInteger.ONE);
        h = biNeg.toString(16).replace(/^-/, '');
      }
      return h;
    };
    /**
        * get PEM string from hexadecimal data and header string
        * @name getPEMStringFromHex
        * @memberOf KJUR.asn1.ASN1Util
        * @function
        * @param {String} dataHex hexadecimal string of PEM body
        * @param {String} pemHeader PEM header string (ex. 'RSA PRIVATE KEY')
        * @return {String} PEM formatted string of input data
        * @description
        * This method converts a hexadecimal string to a PEM string with
        * a specified header. Its line break will be CRLF("\r\n").
        * @example
        * var pem  = KJUR.asn1.ASN1Util.getPEMStringFromHex('616161', 'RSA PRIVATE KEY');
        * // value of pem will be:
        * -----BEGIN PRIVATE KEY-----
        * YWFh
        * -----END PRIVATE KEY-----
        */
    this.getPEMStringFromHex = function (dataHex, pemHeader) {
      return hextopem(dataHex, pemHeader);
    };

    /**
        * generate ASN1Object specifed by JSON parameters
        * @name newObject
        * @memberOf KJUR.asn1.ASN1Util
        * @function
        * @param {Array} param JSON parameter to generate ASN1Object
        * @return {KJUR.asn1.ASN1Object} generated object
        * @since asn1 1.0.3
        * @description
        * generate any ASN1Object specified by JSON param
        * including ASN.1 primitive or structured.
        * Generally 'param' can be described as follows:
        * <blockquote>
        * {TYPE-OF-ASNOBJ: ASN1OBJ-PARAMETER}
        * </blockquote>
        * 'TYPE-OF-ASN1OBJ' can be one of following symbols:
        * <ul>
        * <li>'bool' - DERBoolean</li>
        * <li>'int' - DERInteger</li>
        * <li>'bitstr' - DERBitString</li>
        * <li>'octstr' - DEROctetString</li>
        * <li>'null' - DERNull</li>
        * <li>'oid' - DERObjectIdentifier</li>
        * <li>'enum' - DEREnumerated</li>
        * <li>'utf8str' - DERUTF8String</li>
        * <li>'numstr' - DERNumericString</li>
        * <li>'prnstr' - DERPrintableString</li>
        * <li>'telstr' - DERTeletexString</li>
        * <li>'ia5str' - DERIA5String</li>
        * <li>'utctime' - DERUTCTime</li>
        * <li>'gentime' - DERGeneralizedTime</li>
        * <li>'seq' - DERSequence</li>
        * <li>'set' - DERSet</li>
        * <li>'tag' - DERTaggedObject</li>
        * </ul>
        * @example
        * newObject({'prnstr': 'aaa'});
        * newObject({'seq': [{'int': 3}, {'prnstr': 'aaa'}]})
        * // ASN.1 Tagged Object
        * newObject({'tag': {'tag': 'a1',
        *                    'explicit': true,
        *                    'obj': {'seq': [{'int': 3}, {'prnstr': 'aaa'}]}}});
        * // more simple representation of ASN.1 Tagged Object
        * newObject({'tag': ['a1',
        *                    true,
        *                    {'seq': [
        *                      {'int': 3},
        *                      {'prnstr': 'aaa'}]}
        *                   ]});
        */
    this.newObject = function (param) {
      var _KJUR = KJUR,
      _KJUR_asn1 = _KJUR.asn1,
      _DERBoolean = _KJUR_asn1.DERBoolean,
      _DERInteger = _KJUR_asn1.DERInteger,
      _DERBitString = _KJUR_asn1.DERBitString,
      _DEROctetString = _KJUR_asn1.DEROctetString,
      _DERNull = _KJUR_asn1.DERNull,
      _DERObjectIdentifier = _KJUR_asn1.DERObjectIdentifier,
      _DEREnumerated = _KJUR_asn1.DEREnumerated,
      _DERUTF8String = _KJUR_asn1.DERUTF8String,
      _DERNumericString = _KJUR_asn1.DERNumericString,
      _DERPrintableString = _KJUR_asn1.DERPrintableString,
      _DERTeletexString = _KJUR_asn1.DERTeletexString,
      _DERIA5String = _KJUR_asn1.DERIA5String,
      _DERUTCTime = _KJUR_asn1.DERUTCTime,
      _DERGeneralizedTime = _KJUR_asn1.DERGeneralizedTime,
      _DERSequence = _KJUR_asn1.DERSequence,
      _DERSet = _KJUR_asn1.DERSet,
      _DERTaggedObject = _KJUR_asn1.DERTaggedObject,
      _newObject = _KJUR_asn1.ASN1Util.newObject;

      var keys = Object.keys(param);
      if (keys.length != 1)
      throw "key of param shall be only one.";
      var key = keys[0];

      if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + key + ":") == -1)
      throw "undefined key: " + key;

      if (key == "bool") return new _DERBoolean(param[key]);
      if (key == "int") return new _DERInteger(param[key]);
      if (key == "bitstr") return new _DERBitString(param[key]);
      if (key == "octstr") return new _DEROctetString(param[key]);
      if (key == "null") return new _DERNull(param[key]);
      if (key == "oid") return new _DERObjectIdentifier(param[key]);
      if (key == "enum") return new _DEREnumerated(param[key]);
      if (key == "utf8str") return new _DERUTF8String(param[key]);
      if (key == "numstr") return new _DERNumericString(param[key]);
      if (key == "prnstr") return new _DERPrintableString(param[key]);
      if (key == "telstr") return new _DERTeletexString(param[key]);
      if (key == "ia5str") return new _DERIA5String(param[key]);
      if (key == "utctime") return new _DERUTCTime(param[key]);
      if (key == "gentime") return new _DERGeneralizedTime(param[key]);

      if (key == "seq") {
        var paramList = param[key];
        var a = [];
        for (var i = 0; i < paramList.length; i++) {
          var asn1Obj = _newObject(paramList[i]);
          a.push(asn1Obj);
        }
        return new _DERSequence({ 'array': a });
      }

      if (key == "set") {
        var paramList = param[key];
        var a = [];
        for (var i = 0; i < paramList.length; i++) {
          var asn1Obj = _newObject(paramList[i]);
          a.push(asn1Obj);
        }
        return new _DERSet({ 'array': a });
      }

      if (key == "tag") {
        var tagParam = param[key];
        if (Object.prototype.toString.call(tagParam) === '[object Array]' &&
        tagParam.length == 3) {
          var obj = _newObject(tagParam[2]);
          return new _DERTaggedObject({ tag: tagParam[0],
            explicit: tagParam[1],
            obj: obj });
        } else {
          var newParam = {};
          if (tagParam.explicit !== undefined)
          newParam.explicit = tagParam.explicit;
          if (tagParam.tag !== undefined)
          newParam.tag = tagParam.tag;
          if (tagParam.obj === undefined)
          throw "obj shall be specified for 'tag'.";
          newParam.obj = _newObject(tagParam.obj);
          return new _DERTaggedObject(newParam);
        }
      }
    };

    /**
        * get encoded hexadecimal string of ASN1Object specifed by JSON parameters
        * @name jsonToASN1HEX
        * @memberOf KJUR.asn1.ASN1Util
        * @function
        * @param {Array} param JSON parameter to generate ASN1Object
        * @return hexadecimal string of ASN1Object
        * @since asn1 1.0.4
        * @description
        * As for ASN.1 object representation of JSON object,
        * please see {@link newObject}.
        * @example
        * jsonToASN1HEX({'prnstr': 'aaa'});
        */
    this.jsonToASN1HEX = function (param) {
      var asn1Obj = this.newObject(param);
      return asn1Obj.getEncodedHex();
    };
  }();

  /**
        * get dot noted oid number string from hexadecimal value of OID
        * @name oidHexToInt
        * @memberOf KJUR.asn1.ASN1Util
        * @function
        * @param {String} hex hexadecimal value of object identifier
        * @return {String} dot noted string of object identifier
        * @since jsrsasign 4.8.3 asn1 1.0.7
        * @description
        * This static method converts from hexadecimal string representation of
        * ASN.1 value of object identifier to oid number string.
        * @example
        * KJUR.asn1.ASN1Util.oidHexToInt('550406') &rarr; "2.5.4.6"
        */
  KJUR.asn1.ASN1Util.oidHexToInt = function (hex) {
    var s = "";
    var i01 = parseInt(hex.substr(0, 2), 16);
    var i0 = Math.floor(i01 / 40);
    var i1 = i01 % 40;
    var s = i0 + "." + i1;

    var binbuf = "";
    for (var i = 2; i < hex.length; i += 2) {
      var value = parseInt(hex.substr(i, 2), 16);
      var bin = ("00000000" + value.toString(2)).slice(-8);
      binbuf = binbuf + bin.substr(1, 7);
      if (bin.substr(0, 1) == "0") {
        var bi = new BigInteger(binbuf, 2);
        s = s + "." + bi.toString(10);
        binbuf = "";
      }
    }
    return s;
  };

  /**
      * get hexadecimal value of object identifier from dot noted oid value
      * @name oidIntToHex
      * @memberOf KJUR.asn1.ASN1Util
      * @function
      * @param {String} oidString dot noted string of object identifier
      * @return {String} hexadecimal value of object identifier
      * @since jsrsasign 4.8.3 asn1 1.0.7
      * @description
      * This static method converts from object identifier value string.
      * to hexadecimal string representation of it.
      * @example
      * KJUR.asn1.ASN1Util.oidIntToHex("2.5.4.6") &rarr; "550406"
      */
  KJUR.asn1.ASN1Util.oidIntToHex = function (oidString) {
    var itox = function itox(i) {
      var h = i.toString(16);
      if (h.length == 1) h = '0' + h;
      return h;
    };

    var roidtox = function roidtox(roid) {
      var h = '';
      var bi = new BigInteger(roid, 10);
      var b = bi.toString(2);
      var padLen = 7 - b.length % 7;
      if (padLen == 7) padLen = 0;
      var bPad = '';
      for (var i = 0; i < padLen; i++) {bPad += '0';}
      b = bPad + b;
      for (var i = 0; i < b.length - 1; i += 7) {
        var b8 = b.substr(i, 7);
        if (i != b.length - 7) b8 = '1' + b8;
        h += itox(parseInt(b8, 2));
      }
      return h;
    };

    if (!oidString.match(/^[0-9.]+$/)) {
      throw "malformed oid string: " + oidString;
    }
    var h = '';
    var a = oidString.split('.');
    var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
    h += itox(i0);
    a.splice(0, 2);
    for (var i = 0; i < a.length; i++) {
      h += roidtox(a[i]);
    }
    return h;
  };


  // ********************************************************************
  //  Abstract ASN.1 Classes
  // ********************************************************************

  // ********************************************************************

  /**
   * base class for ASN.1 DER encoder object
   * @name KJUR.asn1.ASN1Object
   * @class base class for ASN.1 DER encoder object
   * @property {Boolean} isModified flag whether internal data was changed
   * @property {String} hTLV hexadecimal string of ASN.1 TLV
   * @property {String} hT hexadecimal string of ASN.1 TLV tag(T)
   * @property {String} hL hexadecimal string of ASN.1 TLV length(L)
   * @property {String} hV hexadecimal string of ASN.1 TLV value(V)
   * @description
   */
  KJUR.asn1.ASN1Object = function () {
    var hV = '';

    /**
                  * get hexadecimal ASN.1 TLV length(L) bytes from TLV value(V)
                  * @name getLengthHexFromValue
                  * @memberOf KJUR.asn1.ASN1Object#
                  * @function
                  * @return {String} hexadecimal string of ASN.1 TLV length(L)
                  */
    this.getLengthHexFromValue = function () {
      if (typeof this.hV == "undefined" || this.hV == null) {
        throw "this.hV is null or undefined.";
      }
      if (this.hV.length % 2 == 1) {
        throw "value hex must be even length: n=" + hV.length + ",v=" + this.hV;
      }
      var n = this.hV.length / 2;
      var hN = n.toString(16);
      if (hN.length % 2 == 1) {
        hN = "0" + hN;
      }
      if (n < 128) {
        return hN;
      } else {
        var hNlen = hN.length / 2;
        if (hNlen > 15) {
          throw "ASN.1 length too long to represent by 8x: n = " + n.toString(16);
        }
        var head = 128 + hNlen;
        return head.toString(16) + hN;
      }
    };

    /**
        * get hexadecimal string of ASN.1 TLV bytes
        * @name getEncodedHex
        * @memberOf KJUR.asn1.ASN1Object#
        * @function
        * @return {String} hexadecimal string of ASN.1 TLV
        */
    this.getEncodedHex = function () {
      if (this.hTLV == null || this.isModified) {
        this.hV = this.getFreshValueHex();
        this.hL = this.getLengthHexFromValue();
        this.hTLV = this.hT + this.hL + this.hV;
        this.isModified = false;
        //alert("first time: " + this.hTLV);
      }
      return this.hTLV;
    };

    /**
        * get hexadecimal string of ASN.1 TLV value(V) bytes
        * @name getValueHex
        * @memberOf KJUR.asn1.ASN1Object#
        * @function
        * @return {String} hexadecimal string of ASN.1 TLV value(V) bytes
        */
    this.getValueHex = function () {
      this.getEncodedHex();
      return this.hV;
    };

    this.getFreshValueHex = function () {
      return '';
    };
  };

  // == BEGIN DERAbstractString ================================================
  /**
   * base class for ASN.1 DER string classes
   * @name KJUR.asn1.DERAbstractString
   * @class base class for ASN.1 DER string classes
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @property {String} s internal string of value
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>str - specify initial ASN.1 value(V) by a string</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */
  KJUR.asn1.DERAbstractString = function (params) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);

    /**
                                                                    * get string value of this string object
                                                                    * @name getString
                                                                    * @memberOf KJUR.asn1.DERAbstractString#
                                                                    * @function
                                                                    * @return {String} string value of this string object
                                                                    */
    this.getString = function () {
      return this.s;
    };

    /**
        * set value by a string
        * @name setString
        * @memberOf KJUR.asn1.DERAbstractString#
        * @function
        * @param {String} newS value by a string to set
        */
    this.setString = function (newS) {
      this.hTLV = null;
      this.isModified = true;
      this.s = newS;
      this.hV = stohex(this.s);
    };

    /**
        * set value by a hexadecimal string
        * @name setStringHex
        * @memberOf KJUR.asn1.DERAbstractString#
        * @function
        * @param {String} newHexString value by a hexadecimal string to set
        */
    this.setStringHex = function (newHexString) {
      this.hTLV = null;
      this.isModified = true;
      this.s = null;
      this.hV = newHexString;
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params == "string") {
        this.setString(params);
      } else if (typeof params['str'] != "undefined") {
        this.setString(params['str']);
      } else if (typeof params['hex'] != "undefined") {
        this.setStringHex(params['hex']);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);
  // == END   DERAbstractString ================================================

  // == BEGIN DERAbstractTime ==================================================
  /**
   * base class for ASN.1 DER Generalized/UTCTime class
   * @name KJUR.asn1.DERAbstractTime
   * @class base class for ASN.1 DER Generalized/UTCTime class
   * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
   * @extends KJUR.asn1.ASN1Object
   * @description
   * @see KJUR.asn1.ASN1Object - superclass
   */
  KJUR.asn1.DERAbstractTime = function (params) {
    KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);

    // --- PRIVATE METHODS --------------------
    this.localDateToUTC = function (d) {
      utc = d.getTime() + d.getTimezoneOffset() * 60000;
      var utcDate = new Date(utc);
      return utcDate;
    };

    /*
        * format date string by Data object
        * @name formatDate
        * @memberOf KJUR.asn1.AbstractTime;
        * @param {Date} dateObject
        * @param {string} type 'utc' or 'gen'
        * @param {boolean} withMillis flag for with millisections or not
        * @description
        * 'withMillis' flag is supported from asn1 1.0.6.
        */
    this.formatDate = function (dateObject, type, withMillis) {
      var pad = this.zeroPadding;
      var d = this.localDateToUTC(dateObject);
      var year = String(d.getFullYear());
      if (type == 'utc') year = year.substr(2, 2);
      var month = pad(String(d.getMonth() + 1), 2);
      var day = pad(String(d.getDate()), 2);
      var hour = pad(String(d.getHours()), 2);
      var min = pad(String(d.getMinutes()), 2);
      var sec = pad(String(d.getSeconds()), 2);
      var s = year + month + day + hour + min + sec;
      if (withMillis === true) {
        var millis = d.getMilliseconds();
        if (millis != 0) {
          var sMillis = pad(String(millis), 3);
          sMillis = sMillis.replace(/[0]+$/, "");
          s = s + "." + sMillis;
        }
      }
      return s + "Z";
    };

    this.zeroPadding = function (s, len) {
      if (s.length >= len) return s;
      return new Array(len - s.length + 1).join('0') + s;
    };

    // --- PUBLIC METHODS --------------------
    /**
     * get string value of this string object
     * @name getString
     * @memberOf KJUR.asn1.DERAbstractTime#
     * @function
     * @return {String} string value of this time object
     */
    this.getString = function () {
      return this.s;
    };

    /**
        * set value by a string
        * @name setString
        * @memberOf KJUR.asn1.DERAbstractTime#
        * @function
        * @param {String} newS value by a string to set such like "130430235959Z"
        */
    this.setString = function (newS) {
      this.hTLV = null;
      this.isModified = true;
      this.s = newS;
      this.hV = stohex(newS);
    };

    /**
        * set value by a Date object
        * @name setByDateValue
        * @memberOf KJUR.asn1.DERAbstractTime#
        * @function
        * @param {Integer} year year of date (ex. 2013)
        * @param {Integer} month month of date between 1 and 12 (ex. 12)
        * @param {Integer} day day of month
        * @param {Integer} hour hours of date
        * @param {Integer} min minutes of date
        * @param {Integer} sec seconds of date
        */
    this.setByDateValue = function (year, month, day, hour, min, sec) {
      var dateObject = new Date(Date.UTC(year, month - 1, day, hour, min, sec, 0));
      this.setByDate(dateObject);
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };
  };
  YAHOO.lang.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);
  // == END   DERAbstractTime ==================================================

  // == BEGIN DERAbstractStructured ============================================
  /**
   * base class for ASN.1 DER structured class
   * @name KJUR.asn1.DERAbstractStructured
   * @class base class for ASN.1 DER structured class
   * @property {Array} asn1Array internal array of ASN1Object
   * @extends KJUR.asn1.ASN1Object
   * @description
   * @see KJUR.asn1.ASN1Object - superclass
   */
  KJUR.asn1.DERAbstractStructured = function (params) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);

    /**
                                                                    * set value by array of ASN1Object
                                                                    * @name setByASN1ObjectArray
                                                                    * @memberOf KJUR.asn1.DERAbstractStructured#
                                                                    * @function
                                                                    * @param {array} asn1ObjectArray array of ASN1Object to set
                                                                    */
    this.setByASN1ObjectArray = function (asn1ObjectArray) {
      this.hTLV = null;
      this.isModified = true;
      this.asn1Array = asn1ObjectArray;
    };

    /**
        * append an ASN1Object to internal array
        * @name appendASN1Object
        * @memberOf KJUR.asn1.DERAbstractStructured#
        * @function
        * @param {ASN1Object} asn1Object to add
        */
    this.appendASN1Object = function (asn1Object) {
      this.hTLV = null;
      this.isModified = true;
      this.asn1Array.push(asn1Object);
    };

    this.asn1Array = new Array();
    if (typeof params != "undefined") {
      if (typeof params['array'] != "undefined") {
        this.asn1Array = params['array'];
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);


  // ********************************************************************
  //  ASN.1 Object Classes
  // ********************************************************************

  // ********************************************************************
  /**
   * class for ASN.1 DER Boolean
   * @name KJUR.asn1.DERBoolean
   * @class class for ASN.1 DER Boolean
   * @extends KJUR.asn1.ASN1Object
   * @description
   * @see KJUR.asn1.ASN1Object - superclass
   */
  KJUR.asn1.DERBoolean = function () {
    KJUR.asn1.DERBoolean.superclass.constructor.call(this);
    this.hT = "01";
    this.hTLV = "0101ff";
  };
  YAHOO.lang.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);

  // ********************************************************************
  /**
   * class for ASN.1 DER Integer
   * @name KJUR.asn1.DERInteger
   * @class class for ASN.1 DER Integer
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>int - specify initial ASN.1 value(V) by integer value</li>
   * <li>bigint - specify initial ASN.1 value(V) by BigInteger object</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */
  KJUR.asn1.DERInteger = function (params) {
    KJUR.asn1.DERInteger.superclass.constructor.call(this);
    this.hT = "02";

    /**
                     * set value by Tom Wu's BigInteger object
                     * @name setByBigInteger
                     * @memberOf KJUR.asn1.DERInteger#
                     * @function
                     * @param {BigInteger} bigIntegerValue to set
                     */
    this.setByBigInteger = function (bigIntegerValue) {
      this.hTLV = null;
      this.isModified = true;
      this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
    };

    /**
        * set value by integer value
        * @name setByInteger
        * @memberOf KJUR.asn1.DERInteger
        * @function
        * @param {Integer} integer value to set
        */
    this.setByInteger = function (intValue) {
      var bi = new BigInteger(String(intValue), 10);
      this.setByBigInteger(bi);
    };

    /**
        * set value by integer value
        * @name setValueHex
        * @memberOf KJUR.asn1.DERInteger#
        * @function
        * @param {String} hexadecimal string of integer value
        * @description
        * <br/>
        * NOTE: Value shall be represented by minimum octet length of
        * two's complement representation.
        * @example
        * new KJUR.asn1.DERInteger(123);
        * new KJUR.asn1.DERInteger({'int': 123});
        * new KJUR.asn1.DERInteger({'hex': '1fad'});
        */
    this.setValueHex = function (newHexString) {
      this.hV = newHexString;
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params['bigint'] != "undefined") {
        this.setByBigInteger(params['bigint']);
      } else if (typeof params['int'] != "undefined") {
        this.setByInteger(params['int']);
      } else if (typeof params == "number") {
        this.setByInteger(params);
      } else if (typeof params['hex'] != "undefined") {
        this.setValueHex(params['hex']);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);

  // ********************************************************************
  /**
   * class for ASN.1 DER encoded BitString primitive
   * @name KJUR.asn1.DERBitString
   * @class class for ASN.1 DER encoded BitString primitive
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>bin - specify binary string (ex. '10111')</li>
   * <li>array - specify array of boolean (ex. [true,false,true,true])</li>
   * <li>hex - specify hexadecimal string of ASN.1 value(V) including unused bits</li>
   * <li>obj - specify {@link KJUR.asn1.ASN1Util.newObject}
   * argument for "BitString encapsulates" structure.</li>
   * </ul>
   * NOTE1: 'params' can be omitted.<br/>
   * NOTE2: 'obj' parameter have been supported since
   * asn1 1.0.11, jsrsasign 6.1.1 (2016-Sep-25).<br/>
   * @example
   * // default constructor
   * o = new KJUR.asn1.DERBitString();
   * // initialize with binary string
   * o = new KJUR.asn1.DERBitString({bin: "1011"});
   * // initialize with boolean array
   * o = new KJUR.asn1.DERBitString({array: [true,false,true,true]});
   * // initialize with hexadecimal string (04 is unused bits)
   * o = new KJUR.asn1.DEROctetString({hex: "04bac0"});
   * // initialize with ASN1Util.newObject argument for encapsulated
   * o = new KJUR.asn1.DERBitString({obj: {seq: [{int: 3}, {prnstr: 'aaa'}]}});
   * // above generates a ASN.1 data like this:
   * // BIT STRING, encapsulates {
   * //   SEQUENCE {
   * //     INTEGER 3
   * //     PrintableString 'aaa'
   * //     }
   * //   }
   */
  KJUR.asn1.DERBitString = function (params) {
    if (params !== undefined && typeof params.obj !== "undefined") {
      var o = KJUR.asn1.ASN1Util.newObject(params.obj);
      params.hex = "00" + o.getEncodedHex();
    }
    KJUR.asn1.DERBitString.superclass.constructor.call(this);
    this.hT = "03";

    /**
                     * set ASN.1 value(V) by a hexadecimal string including unused bits
                     * @name setHexValueIncludingUnusedBits
                     * @memberOf KJUR.asn1.DERBitString#
                     * @function
                     * @param {String} newHexStringIncludingUnusedBits
                     */
    this.setHexValueIncludingUnusedBits = function (newHexStringIncludingUnusedBits) {
      this.hTLV = null;
      this.isModified = true;
      this.hV = newHexStringIncludingUnusedBits;
    };

    /**
        * set ASN.1 value(V) by unused bit and hexadecimal string of value
        * @name setUnusedBitsAndHexValue
        * @memberOf KJUR.asn1.DERBitString#
        * @function
        * @param {Integer} unusedBits
        * @param {String} hValue
        */
    this.setUnusedBitsAndHexValue = function (unusedBits, hValue) {
      if (unusedBits < 0 || 7 < unusedBits) {
        throw "unused bits shall be from 0 to 7: u = " + unusedBits;
      }
      var hUnusedBits = "0" + unusedBits;
      this.hTLV = null;
      this.isModified = true;
      this.hV = hUnusedBits + hValue;
    };

    /**
        * set ASN.1 DER BitString by binary string<br/>
        * @name setByBinaryString
        * @memberOf KJUR.asn1.DERBitString#
        * @function
        * @param {String} binaryString binary value string (i.e. '10111')
        * @description
        * Its unused bits will be calculated automatically by length of
        * 'binaryValue'. <br/>
        * NOTE: Trailing zeros '0' will be ignored.
        * @example
        * o = new KJUR.asn1.DERBitString();
        * o.setByBooleanArray("01011");
        */
    this.setByBinaryString = function (binaryString) {
      binaryString = binaryString.replace(/0+$/, '');
      var unusedBits = 8 - binaryString.length % 8;
      if (unusedBits == 8) unusedBits = 0;
      for (var i = 0; i <= unusedBits; i++) {
        binaryString += '0';
      }
      var h = '';
      for (var i = 0; i < binaryString.length - 1; i += 8) {
        var b = binaryString.substr(i, 8);
        var x = parseInt(b, 2).toString(16);
        if (x.length == 1) x = '0' + x;
        h += x;
      }
      this.hTLV = null;
      this.isModified = true;
      this.hV = '0' + unusedBits + h;
    };

    /**
        * set ASN.1 TLV value(V) by an array of boolean<br/>
        * @name setByBooleanArray
        * @memberOf KJUR.asn1.DERBitString#
        * @function
        * @param {array} booleanArray array of boolean (ex. [true, false, true])
        * @description
        * NOTE: Trailing falses will be ignored in the ASN.1 DER Object.
        * @example
        * o = new KJUR.asn1.DERBitString();
        * o.setByBooleanArray([false, true, false, true, true]);
        */
    this.setByBooleanArray = function (booleanArray) {
      var s = '';
      for (var i = 0; i < booleanArray.length; i++) {
        if (booleanArray[i] == true) {
          s += '1';
        } else {
          s += '0';
        }
      }
      this.setByBinaryString(s);
    };

    /**
        * generate an array of falses with specified length<br/>
        * @name newFalseArray
        * @memberOf KJUR.asn1.DERBitString
        * @function
        * @param {Integer} nLength length of array to generate
        * @return {array} array of boolean falses
        * @description
        * This static method may be useful to initialize boolean array.
        * @example
        * o = new KJUR.asn1.DERBitString();
        * o.newFalseArray(3) &rarr; [false, false, false]
        */
    this.newFalseArray = function (nLength) {
      var a = new Array(nLength);
      for (var i = 0; i < nLength; i++) {
        a[i] = false;
      }
      return a;
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params == "string" && params.toLowerCase().match(/^[0-9a-f]+$/)) {
        this.setHexValueIncludingUnusedBits(params);
      } else if (typeof params['hex'] != "undefined") {
        this.setHexValueIncludingUnusedBits(params['hex']);
      } else if (typeof params['bin'] != "undefined") {
        this.setByBinaryString(params['bin']);
      } else if (typeof params['array'] != "undefined") {
        this.setByBooleanArray(params['array']);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);

  // ********************************************************************
  /**
   * class for ASN.1 DER OctetString<br/>
   * @name KJUR.asn1.DEROctetString
   * @class class for ASN.1 DER OctetString
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * This class provides ASN.1 OctetString simple type.<br/>
   * Supported "params" attributes are:
   * <ul>
   * <li>str - to set a string as a value</li>
   * <li>hex - to set a hexadecimal string as a value</li>
   * <li>obj - to set a encapsulated ASN.1 value by JSON object
   * which is defined in {@link KJUR.asn1.ASN1Util.newObject}</li>
   * </ul>
   * NOTE: A parameter 'obj' have been supported
   * for "OCTET STRING, encapsulates" structure.
   * since asn1 1.0.11, jsrsasign 6.1.1 (2016-Sep-25).
   * @see KJUR.asn1.DERAbstractString - superclass
   * @example
   * // default constructor
   * o = new KJUR.asn1.DEROctetString();
   * // initialize with string
   * o = new KJUR.asn1.DEROctetString({str: "aaa"});
   * // initialize with hexadecimal string
   * o = new KJUR.asn1.DEROctetString({hex: "616161"});
   * // initialize with ASN1Util.newObject argument
   * o = new KJUR.asn1.DEROctetString({obj: {seq: [{int: 3}, {prnstr: 'aaa'}]}});
   * // above generates a ASN.1 data like this:
   * // OCTET STRING, encapsulates {
   * //   SEQUENCE {
   * //     INTEGER 3
   * //     PrintableString 'aaa'
   * //     }
   * //   }
   */
  KJUR.asn1.DEROctetString = function (params) {
    if (params !== undefined && typeof params.obj !== "undefined") {
      var o = KJUR.asn1.ASN1Util.newObject(params.obj);
      params.hex = o.getEncodedHex();
    }
    KJUR.asn1.DEROctetString.superclass.constructor.call(this, params);
    this.hT = "04";
  };
  YAHOO.lang.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);

  // ********************************************************************
  /**
   * class for ASN.1 DER Null
   * @name KJUR.asn1.DERNull
   * @class class for ASN.1 DER Null
   * @extends KJUR.asn1.ASN1Object
   * @description
   * @see KJUR.asn1.ASN1Object - superclass
   */
  KJUR.asn1.DERNull = function () {
    KJUR.asn1.DERNull.superclass.constructor.call(this);
    this.hT = "05";
    this.hTLV = "0500";
  };
  YAHOO.lang.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);

  // ********************************************************************
  /**
   * class for ASN.1 DER ObjectIdentifier
   * @name KJUR.asn1.DERObjectIdentifier
   * @class class for ASN.1 DER ObjectIdentifier
   * @param {Array} params associative array of parameters (ex. {'oid': '2.5.4.5'})
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>oid - specify initial ASN.1 value(V) by a oid string (ex. 2.5.4.13)</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */
  KJUR.asn1.DERObjectIdentifier = function (params) {
    var itox = function itox(i) {
      var h = i.toString(16);
      if (h.length == 1) h = '0' + h;
      return h;
    };
    var roidtox = function roidtox(roid) {
      var h = '';
      var bi = new BigInteger(roid, 10);
      var b = bi.toString(2);
      var padLen = 7 - b.length % 7;
      if (padLen == 7) padLen = 0;
      var bPad = '';
      for (var i = 0; i < padLen; i++) {bPad += '0';}
      b = bPad + b;
      for (var i = 0; i < b.length - 1; i += 7) {
        var b8 = b.substr(i, 7);
        if (i != b.length - 7) b8 = '1' + b8;
        h += itox(parseInt(b8, 2));
      }
      return h;
    };

    KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
    this.hT = "06";

    /**
                     * set value by a hexadecimal string
                     * @name setValueHex
                     * @memberOf KJUR.asn1.DERObjectIdentifier#
                     * @function
                     * @param {String} newHexString hexadecimal value of OID bytes
                     */
    this.setValueHex = function (newHexString) {
      this.hTLV = null;
      this.isModified = true;
      this.s = null;
      this.hV = newHexString;
    };

    /**
        * set value by a OID string<br/>
        * @name setValueOidString
        * @memberOf KJUR.asn1.DERObjectIdentifier#
        * @function
        * @param {String} oidString OID string (ex. 2.5.4.13)
        * @example
        * o = new KJUR.asn1.DERObjectIdentifier();
        * o.setValueOidString("2.5.4.13");
        */
    this.setValueOidString = function (oidString) {
      if (!oidString.match(/^[0-9.]+$/)) {
        throw "malformed oid string: " + oidString;
      }
      var h = '';
      var a = oidString.split('.');
      var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
      h += itox(i0);
      a.splice(0, 2);
      for (var i = 0; i < a.length; i++) {
        h += roidtox(a[i]);
      }
      this.hTLV = null;
      this.isModified = true;
      this.s = null;
      this.hV = h;
    };

    /**
        * set value by a OID name
        * @name setValueName
        * @memberOf KJUR.asn1.DERObjectIdentifier#
        * @function
        * @param {String} oidName OID name (ex. 'serverAuth')
        * @since 1.0.1
        * @description
        * OID name shall be defined in 'KJUR.asn1.x509.OID.name2oidList'.
        * Otherwise raise error.
        * @example
        * o = new KJUR.asn1.DERObjectIdentifier();
        * o.setValueName("serverAuth");
        */
    this.setValueName = function (oidName) {
      var oid = KJUR.asn1.x509.OID.name2oid(oidName);
      if (oid !== '') {
        this.setValueOidString(oid);
      } else {
        throw "DERObjectIdentifier oidName undefined: " + oidName;
      }
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };

    if (params !== undefined) {
      if (typeof params === "string") {
        if (params.match(/^[0-2].[0-9.]+$/)) {
          this.setValueOidString(params);
        } else {
          this.setValueName(params);
        }
      } else if (params.oid !== undefined) {
        this.setValueOidString(params.oid);
      } else if (params.hex !== undefined) {
        this.setValueHex(params.hex);
      } else if (params.name !== undefined) {
        this.setValueName(params.name);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);

  // ********************************************************************
  /**
   * class for ASN.1 DER Enumerated
   * @name KJUR.asn1.DEREnumerated
   * @class class for ASN.1 DER Enumerated
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>int - specify initial ASN.1 value(V) by integer value</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   * @example
   * new KJUR.asn1.DEREnumerated(123);
   * new KJUR.asn1.DEREnumerated({int: 123});
   * new KJUR.asn1.DEREnumerated({hex: '1fad'});
   */
  KJUR.asn1.DEREnumerated = function (params) {
    KJUR.asn1.DEREnumerated.superclass.constructor.call(this);
    this.hT = "0a";

    /**
                     * set value by Tom Wu's BigInteger object
                     * @name setByBigInteger
                     * @memberOf KJUR.asn1.DEREnumerated#
                     * @function
                     * @param {BigInteger} bigIntegerValue to set
                     */
    this.setByBigInteger = function (bigIntegerValue) {
      this.hTLV = null;
      this.isModified = true;
      this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
    };

    /**
        * set value by integer value
        * @name setByInteger
        * @memberOf KJUR.asn1.DEREnumerated#
        * @function
        * @param {Integer} integer value to set
        */
    this.setByInteger = function (intValue) {
      var bi = new BigInteger(String(intValue), 10);
      this.setByBigInteger(bi);
    };

    /**
        * set value by integer value
        * @name setValueHex
        * @memberOf KJUR.asn1.DEREnumerated#
        * @function
        * @param {String} hexadecimal string of integer value
        * @description
        * <br/>
        * NOTE: Value shall be represented by minimum octet length of
        * two's complement representation.
        */
    this.setValueHex = function (newHexString) {
      this.hV = newHexString;
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params['int'] != "undefined") {
        this.setByInteger(params['int']);
      } else if (typeof params == "number") {
        this.setByInteger(params);
      } else if (typeof params['hex'] != "undefined") {
        this.setValueHex(params['hex']);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DEREnumerated, KJUR.asn1.ASN1Object);

  // ********************************************************************
  /**
   * class for ASN.1 DER UTF8String
   * @name KJUR.asn1.DERUTF8String
   * @class class for ASN.1 DER UTF8String
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */
  KJUR.asn1.DERUTF8String = function (params) {
    KJUR.asn1.DERUTF8String.superclass.constructor.call(this, params);
    this.hT = "0c";
  };
  YAHOO.lang.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);

  // ********************************************************************
  /**
   * class for ASN.1 DER NumericString
   * @name KJUR.asn1.DERNumericString
   * @class class for ASN.1 DER NumericString
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */
  KJUR.asn1.DERNumericString = function (params) {
    KJUR.asn1.DERNumericString.superclass.constructor.call(this, params);
    this.hT = "12";
  };
  YAHOO.lang.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);

  // ********************************************************************
  /**
   * class for ASN.1 DER PrintableString
   * @name KJUR.asn1.DERPrintableString
   * @class class for ASN.1 DER PrintableString
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */
  KJUR.asn1.DERPrintableString = function (params) {
    KJUR.asn1.DERPrintableString.superclass.constructor.call(this, params);
    this.hT = "13";
  };
  YAHOO.lang.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);

  // ********************************************************************
  /**
   * class for ASN.1 DER TeletexString
   * @name KJUR.asn1.DERTeletexString
   * @class class for ASN.1 DER TeletexString
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */
  KJUR.asn1.DERTeletexString = function (params) {
    KJUR.asn1.DERTeletexString.superclass.constructor.call(this, params);
    this.hT = "14";
  };
  YAHOO.lang.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);

  // ********************************************************************
  /**
   * class for ASN.1 DER IA5String
   * @name KJUR.asn1.DERIA5String
   * @class class for ASN.1 DER IA5String
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */
  KJUR.asn1.DERIA5String = function (params) {
    KJUR.asn1.DERIA5String.superclass.constructor.call(this, params);
    this.hT = "16";
  };
  YAHOO.lang.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);

  // ********************************************************************
  /**
   * class for ASN.1 DER UTCTime
   * @name KJUR.asn1.DERUTCTime
   * @class class for ASN.1 DER UTCTime
   * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
   * @extends KJUR.asn1.DERAbstractTime
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>str - specify initial ASN.1 value(V) by a string (ex.'130430235959Z')</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * <li>date - specify Date object.</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   * <h4>EXAMPLES</h4>
   * @example
   * d1 = new KJUR.asn1.DERUTCTime();
   * d1.setString('130430125959Z');
   *
   * d2 = new KJUR.asn1.DERUTCTime({'str': '130430125959Z'});
   * d3 = new KJUR.asn1.DERUTCTime({'date': new Date(Date.UTC(2015, 0, 31, 0, 0, 0, 0))});
   * d4 = new KJUR.asn1.DERUTCTime('130430125959Z');
   */
  KJUR.asn1.DERUTCTime = function (params) {
    KJUR.asn1.DERUTCTime.superclass.constructor.call(this, params);
    this.hT = "17";

    /**
                     * set value by a Date object<br/>
                     * @name setByDate
                     * @memberOf KJUR.asn1.DERUTCTime#
                     * @function
                     * @param {Date} dateObject Date object to set ASN.1 value(V)
                     * @example
                     * o = new KJUR.asn1.DERUTCTime();
                     * o.setByDate(new Date("2016/12/31"));
                     */
    this.setByDate = function (dateObject) {
      this.hTLV = null;
      this.isModified = true;
      this.date = dateObject;
      this.s = this.formatDate(this.date, 'utc');
      this.hV = stohex(this.s);
    };

    this.getFreshValueHex = function () {
      if (typeof this.date == "undefined" && typeof this.s == "undefined") {
        this.date = new Date();
        this.s = this.formatDate(this.date, 'utc');
        this.hV = stohex(this.s);
      }
      return this.hV;
    };

    if (params !== undefined) {
      if (params.str !== undefined) {
        this.setString(params.str);
      } else if (typeof params == "string" && params.match(/^[0-9]{12}Z$/)) {
        this.setString(params);
      } else if (params.hex !== undefined) {
        this.setStringHex(params.hex);
      } else if (params.date !== undefined) {
        this.setByDate(params.date);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);

  // ********************************************************************
  /**
   * class for ASN.1 DER GeneralizedTime
   * @name KJUR.asn1.DERGeneralizedTime
   * @class class for ASN.1 DER GeneralizedTime
   * @param {Array} params associative array of parameters (ex. {'str': '20130430235959Z'})
   * @property {Boolean} withMillis flag to show milliseconds or not
   * @extends KJUR.asn1.DERAbstractTime
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>str - specify initial ASN.1 value(V) by a string (ex.'20130430235959Z')</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * <li>date - specify Date object.</li>
   * <li>millis - specify flag to show milliseconds (from 1.0.6)</li>
   * </ul>
   * NOTE1: 'params' can be omitted.
   * NOTE2: 'withMillis' property is supported from asn1 1.0.6.
   */
  KJUR.asn1.DERGeneralizedTime = function (params) {
    KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, params);
    this.hT = "18";
    this.withMillis = false;

    /**
                              * set value by a Date object
                              * @name setByDate
                              * @memberOf KJUR.asn1.DERGeneralizedTime#
                              * @function
                              * @param {Date} dateObject Date object to set ASN.1 value(V)
                              * @example
                              * When you specify UTC time, use 'Date.UTC' method like this:<br/>
                              * o1 = new DERUTCTime();
                              * o1.setByDate(date);
                              *
                              * date = new Date(Date.UTC(2015, 0, 31, 23, 59, 59, 0)); #2015JAN31 23:59:59
                              */
    this.setByDate = function (dateObject) {
      this.hTLV = null;
      this.isModified = true;
      this.date = dateObject;
      this.s = this.formatDate(this.date, 'gen', this.withMillis);
      this.hV = stohex(this.s);
    };

    this.getFreshValueHex = function () {
      if (this.date === undefined && this.s === undefined) {
        this.date = new Date();
        this.s = this.formatDate(this.date, 'gen', this.withMillis);
        this.hV = stohex(this.s);
      }
      return this.hV;
    };

    if (params !== undefined) {
      if (params.str !== undefined) {
        this.setString(params.str);
      } else if (typeof params == "string" && params.match(/^[0-9]{14}Z$/)) {
        this.setString(params);
      } else if (params.hex !== undefined) {
        this.setStringHex(params.hex);
      } else if (params.date !== undefined) {
        this.setByDate(params.date);
      }
      if (params.millis === true) {
        this.withMillis = true;
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);

  // ********************************************************************
  /**
   * class for ASN.1 DER Sequence
   * @name KJUR.asn1.DERSequence
   * @class class for ASN.1 DER Sequence
   * @extends KJUR.asn1.DERAbstractStructured
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>array - specify array of ASN1Object to set elements of content</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */
  KJUR.asn1.DERSequence = function (params) {
    KJUR.asn1.DERSequence.superclass.constructor.call(this, params);
    this.hT = "30";
    this.getFreshValueHex = function () {
      var h = '';
      for (var i = 0; i < this.asn1Array.length; i++) {
        var asn1Obj = this.asn1Array[i];
        h += asn1Obj.getEncodedHex();
      }
      this.hV = h;
      return this.hV;
    };
  };
  YAHOO.lang.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);

  // ********************************************************************
  /**
   * class for ASN.1 DER Set
   * @name KJUR.asn1.DERSet
   * @class class for ASN.1 DER Set
   * @extends KJUR.asn1.DERAbstractStructured
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>array - specify array of ASN1Object to set elements of content</li>
   * <li>sortflag - flag for sort (default: true). ASN.1 BER is not sorted in 'SET OF'.</li>
   * </ul>
   * NOTE1: 'params' can be omitted.<br/>
   * NOTE2: sortflag is supported since 1.0.5.
   */
  KJUR.asn1.DERSet = function (params) {
    KJUR.asn1.DERSet.superclass.constructor.call(this, params);
    this.hT = "31";
    this.sortFlag = true; // item shall be sorted only in ASN.1 DER
    this.getFreshValueHex = function () {
      var a = new Array();
      for (var i = 0; i < this.asn1Array.length; i++) {
        var asn1Obj = this.asn1Array[i];
        a.push(asn1Obj.getEncodedHex());
      }
      if (this.sortFlag == true) a.sort();
      this.hV = a.join('');
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params.sortflag != "undefined" &&
      params.sortflag == false)
      this.sortFlag = false;
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);

  // ********************************************************************
  /**
   * class for ASN.1 DER TaggedObject
   * @name KJUR.asn1.DERTaggedObject
   * @class class for ASN.1 DER TaggedObject
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * Parameter 'tagNoNex' is ASN.1 tag(T) value for this object.
   * For example, if you find '[1]' tag in a ASN.1 dump,
   * 'tagNoHex' will be 'a1'.
   * <br/>
   * As for optional argument 'params' for constructor, you can specify *ANY* of
   * following properties:
   * <ul>
   * <li>explicit - specify true if this is explicit tag otherwise false
   *     (default is 'true').</li>
   * <li>tag - specify tag (default is 'a0' which means [0])</li>
   * <li>obj - specify ASN1Object which is tagged</li>
   * </ul>
   * @example
   * d1 = new KJUR.asn1.DERUTF8String({'str':'a'});
   * d2 = new KJUR.asn1.DERTaggedObject({'obj': d1});
   * hex = d2.getEncodedHex();
   */
  KJUR.asn1.DERTaggedObject = function (params) {
    KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
    this.hT = "a0";
    this.hV = '';
    this.isExplicit = true;
    this.asn1Object = null;

    /**
                             * set value by an ASN1Object
                             * @name setString
                             * @memberOf KJUR.asn1.DERTaggedObject#
                             * @function
                             * @param {Boolean} isExplicitFlag flag for explicit/implicit tag
                             * @param {Integer} tagNoHex hexadecimal string of ASN.1 tag
                             * @param {ASN1Object} asn1Object ASN.1 to encapsulate
                             */
    this.setASN1Object = function (isExplicitFlag, tagNoHex, asn1Object) {
      this.hT = tagNoHex;
      this.isExplicit = isExplicitFlag;
      this.asn1Object = asn1Object;
      if (this.isExplicit) {
        this.hV = this.asn1Object.getEncodedHex();
        this.hTLV = null;
        this.isModified = true;
      } else {
        this.hV = null;
        this.hTLV = asn1Object.getEncodedHex();
        this.hTLV = this.hTLV.replace(/^../, tagNoHex);
        this.isModified = false;
      }
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params['tag'] != "undefined") {
        this.hT = params['tag'];
      }
      if (typeof params['explicit'] != "undefined") {
        this.isExplicit = params['explicit'];
      }
      if (typeof params['obj'] != "undefined") {
        this.asn1Object = params['obj'];
        this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);

  /**
                                                                       * Create a new JSEncryptRSAKey that extends Tom Wu's RSA key object.
                                                                       * This object is just a decorator for parsing the key parameter
                                                                       * @param {string|Object} key - The key in string format, or an object containing
                                                                       * the parameters needed to build a RSAKey object.
                                                                       * @constructor
                                                                       */
  var JSEncryptRSAKey = /** @class */function (_super) {
    __extends(JSEncryptRSAKey, _super);
    function JSEncryptRSAKey(key) {
      var _this = _super.call(this) || this;
      // Call the super constructor.
      //  RSAKey.call(this);
      // If a key key was provided.
      if (key) {
        // If this is a string...
        if (typeof key === "string") {
          _this.parseKey(key);
        } else
        if (JSEncryptRSAKey.hasPrivateKeyProperty(key) ||
        JSEncryptRSAKey.hasPublicKeyProperty(key)) {
          // Set the values for the key.
          _this.parsePropertiesFrom(key);
        }
      }
      return _this;
    }
    /**
       * Method to parse a pem encoded string containing both a public or private key.
       * The method will translate the pem encoded string in a der encoded string and
       * will parse private key and public key parameters. This method accepts public key
       * in the rsaencryption pkcs #1 format (oid: 1.2.840.113549.1.1.1).
       *
       * @todo Check how many rsa formats use the same format of pkcs #1.
       *
       * The format is defined as:
       * PublicKeyInfo ::= SEQUENCE {
       *   algorithm       AlgorithmIdentifier,
       *   PublicKey       BIT STRING
       * }
       * Where AlgorithmIdentifier is:
       * AlgorithmIdentifier ::= SEQUENCE {
       *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
       *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
       * }
       * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
       * RSAPublicKey ::= SEQUENCE {
       *   modulus           INTEGER,  -- n
       *   publicExponent    INTEGER   -- e
       * }
       * it's possible to examine the structure of the keys obtained from openssl using
       * an asn.1 dumper as the one used here to parse the components: http://lapo.it/asn1js/
       * @argument {string} pem the pem encoded string, can include the BEGIN/END header/footer
       * @private
       */
    JSEncryptRSAKey.prototype.parseKey = function (pem) {
      try {
        var modulus = 0;
        var public_exponent = 0;
        var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
        var der = reHex.test(pem) ? Hex.decode(pem) : Base64.unarmor(pem);
        var asn1 = ASN1.decode(der);
        // Fixes a bug with OpenSSL 1.0+ private keys
        if (asn1.sub.length === 3) {
          asn1 = asn1.sub[2].sub[0];
        }
        if (asn1.sub.length === 9) {
          // Parse the private key.
          modulus = asn1.sub[1].getHexStringValue(); // bigint
          this.n = parseBigInt(modulus, 16);
          public_exponent = asn1.sub[2].getHexStringValue(); // int
          this.e = parseInt(public_exponent, 16);
          var private_exponent = asn1.sub[3].getHexStringValue(); // bigint
          this.d = parseBigInt(private_exponent, 16);
          var prime1 = asn1.sub[4].getHexStringValue(); // bigint
          this.p = parseBigInt(prime1, 16);
          var prime2 = asn1.sub[5].getHexStringValue(); // bigint
          this.q = parseBigInt(prime2, 16);
          var exponent1 = asn1.sub[6].getHexStringValue(); // bigint
          this.dmp1 = parseBigInt(exponent1, 16);
          var exponent2 = asn1.sub[7].getHexStringValue(); // bigint
          this.dmq1 = parseBigInt(exponent2, 16);
          var coefficient = asn1.sub[8].getHexStringValue(); // bigint
          this.coeff = parseBigInt(coefficient, 16);
        } else
        if (asn1.sub.length === 2) {
          // Parse the public key.
          var bit_string = asn1.sub[1];
          var sequence = bit_string.sub[0];
          modulus = sequence.sub[0].getHexStringValue();
          this.n = parseBigInt(modulus, 16);
          public_exponent = sequence.sub[1].getHexStringValue();
          this.e = parseInt(public_exponent, 16);
        } else
        {
          return false;
        }
        return true;
      }
      catch (ex) {
        return false;
      }
    };
    /**
        * Translate rsa parameters in a hex encoded string representing the rsa key.
        *
        * The translation follow the ASN.1 notation :
        * RSAPrivateKey ::= SEQUENCE {
        *   version           Version,
        *   modulus           INTEGER,  -- n
        *   publicExponent    INTEGER,  -- e
        *   privateExponent   INTEGER,  -- d
        *   prime1            INTEGER,  -- p
        *   prime2            INTEGER,  -- q
        *   exponent1         INTEGER,  -- d mod (p1)
        *   exponent2         INTEGER,  -- d mod (q-1)
        *   coefficient       INTEGER,  -- (inverse of q) mod p
        * }
        * @returns {string}  DER Encoded String representing the rsa private key
        * @private
        */
    JSEncryptRSAKey.prototype.getPrivateBaseKey = function () {
      var options = {
        array: [
        new KJUR.asn1.DERInteger({ int: 0 }),
        new KJUR.asn1.DERInteger({ bigint: this.n }),
        new KJUR.asn1.DERInteger({ int: this.e }),
        new KJUR.asn1.DERInteger({ bigint: this.d }),
        new KJUR.asn1.DERInteger({ bigint: this.p }),
        new KJUR.asn1.DERInteger({ bigint: this.q }),
        new KJUR.asn1.DERInteger({ bigint: this.dmp1 }),
        new KJUR.asn1.DERInteger({ bigint: this.dmq1 }),
        new KJUR.asn1.DERInteger({ bigint: this.coeff })] };


      var seq = new KJUR.asn1.DERSequence(options);
      return seq.getEncodedHex();
    };
    /**
        * base64 (pem) encoded version of the DER encoded representation
        * @returns {string} pem encoded representation without header and footer
        * @public
        */
    JSEncryptRSAKey.prototype.getPrivateBaseKeyB64 = function () {
      return hex2b64(this.getPrivateBaseKey());
    };
    /**
        * Translate rsa parameters in a hex encoded string representing the rsa public key.
        * The representation follow the ASN.1 notation :
        * PublicKeyInfo ::= SEQUENCE {
        *   algorithm       AlgorithmIdentifier,
        *   PublicKey       BIT STRING
        * }
        * Where AlgorithmIdentifier is:
        * AlgorithmIdentifier ::= SEQUENCE {
        *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
        *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
        * }
        * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
        * RSAPublicKey ::= SEQUENCE {
        *   modulus           INTEGER,  -- n
        *   publicExponent    INTEGER   -- e
        * }
        * @returns {string} DER Encoded String representing the rsa public key
        * @private
        */
    JSEncryptRSAKey.prototype.getPublicBaseKey = function () {
      var first_sequence = new KJUR.asn1.DERSequence({
        array: [
        new KJUR.asn1.DERObjectIdentifier({ oid: "1.2.840.113549.1.1.1" }),
        new KJUR.asn1.DERNull()] });


      var second_sequence = new KJUR.asn1.DERSequence({
        array: [
        new KJUR.asn1.DERInteger({ bigint: this.n }),
        new KJUR.asn1.DERInteger({ int: this.e })] });


      var bit_string = new KJUR.asn1.DERBitString({
        hex: "00" + second_sequence.getEncodedHex() });

      var seq = new KJUR.asn1.DERSequence({
        array: [
        first_sequence,
        bit_string] });


      return seq.getEncodedHex();
    };
    /**
        * base64 (pem) encoded version of the DER encoded representation
        * @returns {string} pem encoded representation without header and footer
        * @public
        */
    JSEncryptRSAKey.prototype.getPublicBaseKeyB64 = function () {
      return hex2b64(this.getPublicBaseKey());
    };
    /**
        * wrap the string in block of width chars. The default value for rsa keys is 64
        * characters.
        * @param {string} str the pem encoded string without header and footer
        * @param {Number} [width=64] - the length the string has to be wrapped at
        * @returns {string}
        * @private
        */
    JSEncryptRSAKey.wordwrap = function (str, width) {
      width = width || 64;
      if (!str) {
        return str;
      }
      var regex = "(.{1," + width + "})( +|$\n?)|(.{1," + width + "})";
      return str.match(RegExp(regex, "g")).join("\n");
    };
    /**
        * Retrieve the pem encoded private key
        * @returns {string} the pem encoded private key with header/footer
        * @public
        */
    JSEncryptRSAKey.prototype.getPrivateKey = function () {
      var key = "-----BEGIN RSA PRIVATE KEY-----\n";
      key += JSEncryptRSAKey.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
      key += "-----END RSA PRIVATE KEY-----";
      return key;
    };
    /**
        * Retrieve the pem encoded public key
        * @returns {string} the pem encoded public key with header/footer
        * @public
        */
    JSEncryptRSAKey.prototype.getPublicKey = function () {
      var key = "-----BEGIN PUBLIC KEY-----\n";
      key += JSEncryptRSAKey.wordwrap(this.getPublicBaseKeyB64()) + "\n";
      key += "-----END PUBLIC KEY-----";
      return key;
    };
    /**
        * Check if the object contains the necessary parameters to populate the rsa modulus
        * and public exponent parameters.
        * @param {Object} [obj={}] - An object that may contain the two public key
        * parameters
        * @returns {boolean} true if the object contains both the modulus and the public exponent
        * properties (n and e)
        * @todo check for types of n and e. N should be a parseable bigInt object, E should
        * be a parseable integer number
        * @private
        */
    JSEncryptRSAKey.hasPublicKeyProperty = function (obj) {
      obj = obj || {};
      return obj.hasOwnProperty("n") &&
      obj.hasOwnProperty("e");
    };
    /**
        * Check if the object contains ALL the parameters of an RSA key.
        * @param {Object} [obj={}] - An object that may contain nine rsa key
        * parameters
        * @returns {boolean} true if the object contains all the parameters needed
        * @todo check for types of the parameters all the parameters but the public exponent
        * should be parseable bigint objects, the public exponent should be a parseable integer number
        * @private
        */
    JSEncryptRSAKey.hasPrivateKeyProperty = function (obj) {
      obj = obj || {};
      return obj.hasOwnProperty("n") &&
      obj.hasOwnProperty("e") &&
      obj.hasOwnProperty("d") &&
      obj.hasOwnProperty("p") &&
      obj.hasOwnProperty("q") &&
      obj.hasOwnProperty("dmp1") &&
      obj.hasOwnProperty("dmq1") &&
      obj.hasOwnProperty("coeff");
    };
    /**
        * Parse the properties of obj in the current rsa object. Obj should AT LEAST
        * include the modulus and public exponent (n, e) parameters.
        * @param {Object} obj - the object containing rsa parameters
        * @private
        */
    JSEncryptRSAKey.prototype.parsePropertiesFrom = function (obj) {
      this.n = obj.n;
      this.e = obj.e;
      if (obj.hasOwnProperty("d")) {
        this.d = obj.d;
        this.p = obj.p;
        this.q = obj.q;
        this.dmp1 = obj.dmp1;
        this.dmq1 = obj.dmq1;
        this.coeff = obj.coeff;
      }
    };
    return JSEncryptRSAKey;
  }(RSAKey);

  /**
              *
              * @param {Object} [options = {}] - An object to customize JSEncrypt behaviour
              * possible parameters are:
              * - default_key_size        {number}  default: 1024 the key size in bit
              * - default_public_exponent {string}  default: '010001' the hexadecimal representation of the public exponent
              * - log                     {boolean} default: false whether log warn/error or not
              * @constructor
              */
  var JSEncrypt = /** @class */function () {
    function JSEncrypt(options) {
      options = options || {};
      this.default_key_size = parseInt(options.default_key_size, 10) || 1024;
      this.default_public_exponent = options.default_public_exponent || "010001"; // 65537 default openssl public exponent for rsa key type
      this.log = options.log || false;
      // The private and public key.
      this.key = null;
    }
    /**
       * Method to set the rsa key parameter (one method is enough to set both the public
       * and the private key, since the private key contains the public key paramenters)
       * Log a warning if logs are enabled
       * @param {Object|string} key the pem encoded string or an object (with or without header/footer)
       * @public
       */
    JSEncrypt.prototype.setKey = function (key) {
      if (this.log && this.key) {
        console.warn("A key was already set, overriding existing.");
      }
      this.key = new JSEncryptRSAKey(key);
    };
    /**
        * Proxy method for setKey, for api compatibility
        * @see setKey
        * @public
        */
    JSEncrypt.prototype.setPrivateKey = function (privkey) {
      // Create the key.
      this.setKey(privkey);
    };
    /**
        * Proxy method for setKey, for api compatibility
        * @see setKey
        * @public
        */
    JSEncrypt.prototype.setPublicKey = function (pubkey) {
      // Sets the public key.
      this.setKey(pubkey);
    };
    /**
        * Proxy method for RSAKey object's decrypt, decrypt the string using the private
        * components of the rsa key object. Note that if the object was not set will be created
        * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
        * @param {string} str base64 encoded crypted string to decrypt
        * @return {string} the decrypted string
        * @public
        */
    JSEncrypt.prototype.decrypt = function (str) {
      // Return the decrypted string.
      try {
        return this.getKey().decrypt(b64tohex(str));
      }
      catch (ex) {
        return false;
      }
    };
    /**
        * Proxy method for RSAKey object's encrypt, encrypt the string using the public
        * components of the rsa key object. Note that if the object was not set will be created
        * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
        * @param {string} str the string to encrypt
        * @return {string} the encrypted string encoded in base64
        * @public
        */
    JSEncrypt.prototype.encrypt = function (str) {
      // Return the encrypted string.
      try {
        return hex2b64(this.getKey().encrypt(str));
      }
      catch (ex) {
        return false;
      }
    };
    /**
        * Proxy method for RSAKey object's sign.
        * @param {string} str the string to sign
        * @param {function} digestMethod hash method
        * @param {string} digestName the name of the hash algorithm
        * @return {string} the signature encoded in base64
        * @public
        */
    JSEncrypt.prototype.sign = function (str, digestMethod, digestName) {
      // return the RSA signature of 'str' in 'hex' format.
      try {
        return hex2b64(this.getKey().sign(str, digestMethod, digestName));
      }
      catch (ex) {
        return false;
      }
    };
    /**
        * Proxy method for RSAKey object's verify.
        * @param {string} str the string to verify
        * @param {string} signature the signature encoded in base64 to compare the string to
        * @param {function} digestMethod hash method
        * @return {boolean} whether the data and signature match
        * @public
        */
    JSEncrypt.prototype.verify = function (str, signature, digestMethod) {
      // Return the decrypted 'digest' of the signature.
      try {
        return this.getKey().verify(str, b64tohex(signature), digestMethod);
      }
      catch (ex) {
        return false;
      }
    };
    /**
        * Getter for the current JSEncryptRSAKey object. If it doesn't exists a new object
        * will be created and returned
        * @param {callback} [cb] the callback to be called if we want the key to be generated
        * in an async fashion
        * @returns {JSEncryptRSAKey} the JSEncryptRSAKey object
        * @public
        */
    JSEncrypt.prototype.getKey = function (cb) {
      // Only create new if it does not exist.
      if (!this.key) {
        // Get a new private key.
        this.key = new JSEncryptRSAKey();
        if (cb && {}.toString.call(cb) === "[object Function]") {
          this.key.generateAsync(this.default_key_size, this.default_public_exponent, cb);
          return;
        }
        // Generate the key.
        this.key.generate(this.default_key_size, this.default_public_exponent);
      }
      return this.key;
    };
    /**
        * Returns the pem encoded representation of the private key
        * If the key doesn't exists a new key will be created
        * @returns {string} pem encoded representation of the private key WITH header and footer
        * @public
        */
    JSEncrypt.prototype.getPrivateKey = function () {
      // Return the private representation of this key.
      return this.getKey().getPrivateKey();
    };
    /**
        * Returns the pem encoded representation of the private key
        * If the key doesn't exists a new key will be created
        * @returns {string} pem encoded representation of the private key WITHOUT header and footer
        * @public
        */
    JSEncrypt.prototype.getPrivateKeyB64 = function () {
      // Return the private representation of this key.
      return this.getKey().getPrivateBaseKeyB64();
    };
    /**
        * Returns the pem encoded representation of the public key
        * If the key doesn't exists a new key will be created
        * @returns {string} pem encoded representation of the public key WITH header and footer
        * @public
        */
    JSEncrypt.prototype.getPublicKey = function () {
      // Return the private representation of this key.
      return this.getKey().getPublicKey();
    };
    /**
        * Returns the pem encoded representation of the public key
        * If the key doesn't exists a new key will be created
        * @returns {string} pem encoded representation of the public key WITHOUT header and footer
        * @public
        */
    JSEncrypt.prototype.getPublicKeyB64 = function () {
      // Return the private representation of this key.
      return this.getKey().getPublicBaseKeyB64();
    };
    JSEncrypt.version = "3.0.0-rc.1";
    return JSEncrypt;
  }();

  window.JSEncrypt = JSEncrypt;

  exports.JSEncrypt = JSEncrypt;
  exports.default = JSEncrypt;

  Object.defineProperty(exports, '__esModule', { value: true });

});

/***/ }),

/***/ 28:
/*!**********************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/utils/jsencryptKey.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _jsencrypt = _interopRequireDefault(__webpack_require__(/*! jsencrypt */ 27));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.prototype.$encruption = function (obj) {
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCzhuy0c70yLooCcg1oV8s/FdniStnpeHZfJr7LECTRBw9Str0W7RJ1cMBbbQtBfcsBQ/rQxGVulC3Quj53zqQSiHJvVISnWaRd3Ebv9hFYpeGRg4xgZbOB4M1zTq0i0rk7U65s+enTTHIY+QQRnbObYjlk1abRcGJnHgQG4T6vJQIDAQAB');

  return encrypt.encrypt(obj);
};

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!***********************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/pages.json ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 43:
/*!*************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/utils/api.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.PUSHCLICK = exports.GREENCREATEORDER = exports.GREENCARDLIST = exports.TASKINFO = exports.SCENCESET = exports.SETVOICEPROLOGUE = exports.SCENEUSERPOST = exports.SCENEREFUSEUPDATE = exports.SCENEREFUSE = exports.SCENELIST = exports.SCENESTATUS = exports.REFUSECALLSET = exports.REFUSECALL = exports.BLACKDELETE = exports.BLACKADD = exports.BLACKLIST = exports.PROLOGUEDELETE = exports.SETTEXTPROLOGUE = exports.PROLOGUEGET = exports.PROLOGUESET = exports.PROLOGUECURRENT = exports.PROLOGUELIST = exports.TTSCONVERT = exports.TTSSCENE = exports.TTSUPDATE = exports.TTSPLAID = exports.TRANSFERCONFIG = exports.QRCODE = exports.CARDPACKDETAILS = exports.CARDPACK = exports.PARTNERCASHLIST = exports.PARTNERINVITELIST = exports.PARTNERCASHOUT = exports.PARTNERBIND = exports.PARTNERINVITEDATA = exports.PARTNERCASH = exports.PARTNERINFO = exports.EXCHANGECARD = exports.SHARECARD = exports.FEEDBACK = exports.UPLOADFILE = exports.GETNUMINFO = exports.SUBSCRIBEINFO = exports.INVITELIST = exports.INVITEDATA = exports.JSAPI = exports.APPLYCASHOUT = exports.MYCASHLIST = exports.CASHLIST = exports.MYCASH = exports.MYINFO = exports.GOODSLIST = exports.BEFORODER = exports.CREATEORDER = exports.ADDBLACKLIST = exports.COUPONLIST = exports.BANNER = exports.DELCALL = exports.AUDITION = exports.CANCELPROLPGUE = exports.GETPROLPGUE = exports.TEXTPROLOGUE = exports.VOICEPROLOGUE = exports.DELCONTACT = exports.ADDCONTACT = exports.CONTACTDETAIL = exports.CONTACTLIST = exports.CALLRECORDDETAILS = exports.INDEXCOUPON = exports.SHOWINDEXTIP = exports.SETTINGURL = exports.CALLRECORDLIST = exports.CALLRECORDLISTTODAY = exports.SENDCODE2 = exports.SENDCODE = exports.LOGIN = exports.TEST = void 0; // const API = "";	
var API = "/api";
// 测试
var TEST = API + "/getWangYiNews";
// 绑定手机号
exports.TEST = TEST;var LOGIN = API + "/app/bindMobile";
//发送验证码加密
exports.LOGIN = LOGIN;var SENDCODE = API + "/app/sendVerifyCodeS";
//发送验证码
exports.SENDCODE = SENDCODE;var SENDCODE2 = API + "/app/sendVerifyCode";
// 通话列表
exports.SENDCODE2 = SENDCODE2;var CALLRECORDLISTTODAY = API + "/app/chat/callRecordListToday";
// 历史来电
exports.CALLRECORDLISTTODAY = CALLRECORDLISTTODAY;var CALLRECORDLIST = API + "/app/chat/callRecordList";
// 获取接听
exports.CALLRECORDLIST = CALLRECORDLIST;var SETTINGURL = API + "/app/chat/getSettingPageUrl";
// 首页会员状态
exports.SETTINGURL = SETTINGURL;var SHOWINDEXTIP = API + "/app/index/showIndexTips";
// 首页获取优惠券
exports.SHOWINDEXTIP = SHOWINDEXTIP;var INDEXCOUPON = API + "/app/index/getCoupon";


/**
                                                                                     * 专属定制
                                                                                     */

// 通讯录详情
exports.INDEXCOUPON = INDEXCOUPON;var CALLRECORDDETAILS = API + "/app/chat/callRecordDetails";
// 通讯录列表
exports.CALLRECORDDETAILS = CALLRECORDDETAILS;var CONTACTLIST = API + "/app/contact/list";
// 通讯录详情
exports.CONTACTLIST = CONTACTLIST;var CONTACTDETAIL = API + "/app/contact/detail";
// 添加联系人
exports.CONTACTDETAIL = CONTACTDETAIL;var ADDCONTACT = API + "/app/contact/create";
// 删除联系人
exports.ADDCONTACT = ADDCONTACT;var DELCONTACT = API + "/app/contact/delete";
// 自定义录音开场白
exports.DELCONTACT = DELCONTACT;var VOICEPROLOGUE = API + "/app/chat/setVoicePrologue";
// 自定义文本开场白
exports.VOICEPROLOGUE = VOICEPROLOGUE;var TEXTPROLOGUE = API + "/app/chat/setTextPrologue";
// 查询自定义开场白
exports.TEXTPROLOGUE = TEXTPROLOGUE;var GETPROLPGUE = API + "/app/chat/getPrologue";
// 取消开场白
exports.GETPROLPGUE = GETPROLPGUE;var CANCELPROLPGUE = API + "/app/chat/cancelPrologue";
// 试听
exports.CANCELPROLPGUE = CANCELPROLPGUE;var AUDITION = API + "/app/chat/audition";
// 删除通话详情
exports.AUDITION = AUDITION;var DELCALL = API + "/app/chat/delCallRecord";
//banner
exports.DELCALL = DELCALL;var BANNER = API + "/app/banner";

//优惠券列表
exports.BANNER = BANNER;var COUPONLIST = API + "/app/chat/couponList";


/**
                                                                        * 个人中心
                                                                        */

// 添加黑名单
exports.COUPONLIST = COUPONLIST;var ADDBLACKLIST = API + "/app/blacklist/add";
// 创建订单
exports.ADDBLACKLIST = ADDBLACKLIST;var CREATEORDER = API + "/app/order/createOrder";
// 优惠券
exports.CREATEORDER = CREATEORDER;var BEFORODER = API + "/app/order/beforeOrder";
//购买卡列表
exports.BEFORODER = BEFORODER;var GOODSLIST = API + "/app/order/goodsCardList";
//我的信息
exports.GOODSLIST = GOODSLIST;var MYINFO = API + "/app/chat/myInfo";
//我的钱包
exports.MYINFO = MYINFO;var MYCASH = API + "/app/chat/myCash";
//零钱明细
exports.MYCASH = MYCASH;var CASHLIST = API + "/app/chat/cashList";
//零钱明细详情
exports.CASHLIST = CASHLIST;var MYCASHLIST = API + "/app/chat/myCashList";
//提现
exports.MYCASHLIST = MYCASHLIST;var APPLYCASHOUT = API + "/app/chat/applyCashOut";
//JSSDK
exports.APPLYCASHOUT = APPLYCASHOUT;var JSAPI = API + "/app/chat/jsapiParams";
//邀请数据
exports.JSAPI = JSAPI;var INVITEDATA = API + "/app/chat/myInviteData";
//邀请明细
exports.INVITEDATA = INVITEDATA;var INVITELIST = API + "/app/chat/inviteUserList";
//是否关注
exports.INVITELIST = INVITELIST;var SUBSCRIBEINFO = API + "/app/chat/subscribeInfo";
//引导页手机号
exports.SUBSCRIBEINFO = SUBSCRIBEINFO;var GETNUMINFO = API + "/app/chat/getNumberInfo";
// 上传图片
exports.GETNUMINFO = GETNUMINFO;var UPLOADFILE = API + "/app/uploadFile";
// 用户反馈
exports.UPLOADFILE = UPLOADFILE;var FEEDBACK = API + "/app/chat/feedback";
// 用户分享免费
exports.FEEDBACK = FEEDBACK;var SHARECARD = API + "/app/order/shareGetWeekCard";





// 卡密激活
exports.SHARECARD = SHARECARD;var EXCHANGECARD = API + "/app/order/submitExchangeCard";



/**
                                                                                         * 合伙人
                                                                                         */
// 合伙人信息
exports.EXCHANGECARD = EXCHANGECARD;var PARTNERINFO = API + "/app/chat/myPartnerInfo";
// 合伙人钱包
exports.PARTNERINFO = PARTNERINFO;var PARTNERCASH = API + "/app/chat/myPartnerCash";
// 合伙人邀请信息
exports.PARTNERCASH = PARTNERCASH;var PARTNERINVITEDATA = API + "/app/chat/myPartnerInviteData";
// 合伙人绑定
exports.PARTNERINVITEDATA = PARTNERINVITEDATA;var PARTNERBIND = API + "/app/bindPartnerMobile";
// 合伙人提现
exports.PARTNERBIND = PARTNERBIND;var PARTNERCASHOUT = API + "/app/chat/partnerApplyCashOut";
// 合伙人邀请列表
exports.PARTNERCASHOUT = PARTNERCASHOUT;var PARTNERINVITELIST = API + "/app/chat/partnerInviteUserList";
// 合伙人明细列表
exports.PARTNERINVITELIST = PARTNERINVITELIST;var PARTNERCASHLIST = API + "/app/chat/partnerCashList";
// 合伙人卡密列表
exports.PARTNERCASHLIST = PARTNERCASHLIST;var CARDPACK = API + "/app/chat/cardPack";
// 合伙人卡密列表详情
exports.CARDPACK = CARDPACK;var CARDPACKDETAILS = API + "/app/chat/cardPackDetails";
// 合伙人二维码
exports.CARDPACKDETAILS = CARDPACKDETAILS;var QRCODE = API + '/app/chat/partnerPoster';

// 接听配置


// 转接状态
exports.QRCODE = QRCODE;var TRANSFERCONFIG = API + "/user/bysetting/transferConfig";
// 音色列表
exports.TRANSFERCONFIG = TRANSFERCONFIG;var TTSPLAID = API + "/user/bysetting/ttsPlaid";
// 设置音色
exports.TTSPLAID = TTSPLAID;var TTSUPDATE = API + "/user/bysetting/ttsUpdate";
// 查询当前音色
exports.TTSUPDATE = TTSUPDATE;var TTSSCENE = API + "/user/bysetting/ttsScene";
// 转化语音
exports.TTSSCENE = TTSSCENE;var TTSCONVERT = API + "/user/bysetting/ttsConvert";
// 开场白列表
exports.TTSCONVERT = TTSCONVERT;var PROLOGUELIST = API + "/user/bysetting/prologueList";
// 当前设置开场白
exports.PROLOGUELIST = PROLOGUELIST;var PROLOGUECURRENT = API + "/user/bysetting/prologueCurrent";
// 设置开场白
exports.PROLOGUECURRENT = PROLOGUECURRENT;var PROLOGUESET = API + "/user/bysetting/prologueSet";
// 修改开场白详情
exports.PROLOGUESET = PROLOGUESET;var PROLOGUEGET = API + "/user/bysetting/prologueGet";
// 开场白修改设置
exports.PROLOGUEGET = PROLOGUEGET;var SETTEXTPROLOGUE = API + "/user/bysetting/setTextPrologue";
// 删除开场白
exports.SETTEXTPROLOGUE = SETTEXTPROLOGUE;var PROLOGUEDELETE = API + "/user/bysetting/prologueDelete";
// 黑名单列表
exports.PROLOGUEDELETE = PROLOGUEDELETE;var BLACKLIST = API + "/user/bysetting/blackList";
// 黑名单添加
exports.BLACKLIST = BLACKLIST;var BLACKADD = API + "/user/bysetting/blackAdd";
// 黑名单删除
exports.BLACKADD = BLACKADD;var BLACKDELETE = API + "/user/bysetting/blackDetele";
// 拒接黑名单状态
exports.BLACKDELETE = BLACKDELETE;var REFUSECALL = API + "/user/bysetting/refuseCall";
// 更改拒接黑名单状态
exports.REFUSECALL = REFUSECALL;var REFUSECALLSET = API + "/user/bysetting/refuseCallSet";
// 场景列表
exports.REFUSECALLSET = REFUSECALLSET;var SCENESTATUS = API + "/user/bysetting/sceneStatus";
// 场景列表
exports.SCENESTATUS = SCENESTATUS;var SCENELIST = API + "/user/bysetting/scenelist";
// 场景拒接列表
exports.SCENELIST = SCENELIST;var SCENEREFUSE = API + "/user/bysetting/sceneRefuse";
// 场景拒接列表更新
exports.SCENEREFUSE = SCENEREFUSE;var SCENEREFUSEUPDATE = API + "/user/bysetting/sceneRefuseUpdate";
// 添加场景回复
exports.SCENEREFUSEUPDATE = SCENEREFUSEUPDATE;var SCENEUSERPOST = API + "/user/bysetting/sceneUserPost";
//设置语音开场白
exports.SCENEUSERPOST = SCENEUSERPOST;var SETVOICEPROLOGUE = API + "/user/bysetting/setVoicePrologue";
//设置回复
exports.SETVOICEPROLOGUE = SETVOICEPROLOGUE;var SCENCESET = API + "/user/bysetting/sceneSet";


// 绿色通道

// 任务进度
exports.SCENCESET = SCENCESET;var TASKINFO = API + "/app/green/taskInfo";
// 绿色通道列表
exports.TASKINFO = TASKINFO;var GREENCARDLIST = API + "/app/green/cardList";
// 绿色通道列表
exports.GREENCARDLIST = GREENCARDLIST;var GREENCREATEORDER = API + "/app/green/createOrder";
//推送统计
exports.GREENCREATEORDER = GREENCREATEORDER;var PUSHCLICK = API + "/push_stats/click";exports.PUSHCLICK = PUSHCLICK;

/***/ }),

/***/ 44:
/*!*****************************************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/node_modules/jweixin-module/lib/index.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}!function (e, n) { true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {return n(e);}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;}(window, function (o, e) {if (!o.jWeixin) {var _w;var n,c = { config: "preVerifyJSAPI", onMenuShareTimeline: "menu:share:timeline", onMenuShareAppMessage: "menu:share:appmessage", onMenuShareQQ: "menu:share:qq", onMenuShareWeibo: "menu:share:weiboApp", onMenuShareQZone: "menu:share:QZone", previewImage: "imagePreview", getLocation: "geoLocation", openProductSpecificView: "openProductViewWithPid", addCard: "batchAddCard", openCard: "batchViewCard", chooseWXPay: "getBrandWCPayRequest", openEnterpriseRedPacket: "getRecevieBizHongBaoRequest", startSearchBeacons: "startMonitoringBeacons", stopSearchBeacons: "stopMonitoringBeacons", onSearchBeacons: "onBeaconsInRange", consumeAndShareCard: "consumedShareCard", openAddress: "editAddress" },a = function () {var e = {};for (var n in c) {e[c[n]] = n;}return e;}(),i = o.document,t = i.title,r = navigator.userAgent.toLowerCase(),s = navigator.platform.toLowerCase(),d = !(!s.match("mac") && !s.match("win")),u = -1 != r.indexOf("wxdebugger"),l = -1 != r.indexOf("micromessenger"),p = -1 != r.indexOf("android"),f = -1 != r.indexOf("iphone") || -1 != r.indexOf("ipad"),m = (n = r.match(/micromessenger\/(\d+\.\d+\.\d+)/) || r.match(/micromessenger\/(\d+\.\d+)/)) ? n[1] : "",g = { initStartTime: L(), initEndTime: 0, preVerifyStartTime: 0, preVerifyEndTime: 0 },h = { version: 1, appId: "", initTime: 0, preVerifyTime: 0, networkType: "", isPreVerifyOk: 1, systemType: f ? 1 : p ? 2 : -1, clientVersion: m, url: encodeURIComponent(location.href) },v = {},S = { _completes: [] },y = { state: 0, data: {} };O(function () {g.initEndTime = L();});var I = !1,_ = [],w = (_w = { config: function config(e) {B("config", v = e);var t = !1 !== v.check;O(function () {if (t) M(c.config, { verifyJsApiList: C(v.jsApiList), verifyOpenTagList: C(v.openTagList) }, function () {S._complete = function (e) {g.preVerifyEndTime = L(), y.state = 1, y.data = e;}, S.success = function (e) {h.isPreVerifyOk = 0;}, S.fail = function (e) {S._fail ? S._fail(e) : y.state = -1;};var t = S._completes;return t.push(function () {!function () {if (!(d || u || v.debug || m < "6.0.2" || h.systemType < 0)) {var i = new Image();h.appId = v.appId, h.initTime = g.initEndTime - g.initStartTime, h.preVerifyTime = g.preVerifyEndTime - g.preVerifyStartTime, w.getNetworkType({ isInnerInvoke: !0, success: function success(e) {h.networkType = e.networkType;var n = "https://open.weixin.qq.com/sdk/report?v=" + h.version + "&o=" + h.isPreVerifyOk + "&s=" + h.systemType + "&c=" + h.clientVersion + "&a=" + h.appId + "&n=" + h.networkType + "&i=" + h.initTime + "&p=" + h.preVerifyTime + "&u=" + h.url;i.src = n;} });}}();}), S.complete = function (e) {for (var n = 0, i = t.length; n < i; ++n) {t[n]();}S._completes = [];}, S;}()), g.preVerifyStartTime = L();else {y.state = 1;for (var e = S._completes, n = 0, i = e.length; n < i; ++n) {e[n]();}S._completes = [];}}), w.invoke || (w.invoke = function (e, n, i) {o.WeixinJSBridge && WeixinJSBridge.invoke(e, x(n), i);}, w.on = function (e, n) {o.WeixinJSBridge && WeixinJSBridge.on(e, n);});}, ready: function ready(e) {0 != y.state ? e() : (S._completes.push(e), !l && v.debug && e());}, error: function error(e) {m < "6.0.2" || (-1 == y.state ? e(y.data) : S._fail = e);}, checkJsApi: function checkJsApi(e) {M("checkJsApi", { jsApiList: C(e.jsApiList) }, (e._complete = function (e) {if (p) {var n = e.checkResult;n && (e.checkResult = JSON.parse(n));}e = function (e) {var n = e.checkResult;for (var i in n) {var t = a[i];t && (n[t] = n[i], delete n[i]);}return e;}(e);}, e));}, onMenuShareTimeline: function onMenuShareTimeline(e) {P(c.onMenuShareTimeline, { complete: function complete() {M("shareTimeline", { title: e.title || t, desc: e.title || t, img_url: e.imgUrl || "", link: e.link || location.href, type: e.type || "link", data_url: e.dataUrl || "" }, e);} }, e);}, onMenuShareAppMessage: function onMenuShareAppMessage(n) {P(c.onMenuShareAppMessage, { complete: function complete(e) {"favorite" === e.scene ? M("sendAppMessage", { title: n.title || t, desc: n.desc || "", link: n.link || location.href, img_url: n.imgUrl || "", type: n.type || "link", data_url: n.dataUrl || "" }) : M("sendAppMessage", { title: n.title || t, desc: n.desc || "", link: n.link || location.href, img_url: n.imgUrl || "", type: n.type || "link", data_url: n.dataUrl || "" }, n);} }, n);}, onMenuShareQQ: function onMenuShareQQ(e) {P(c.onMenuShareQQ, { complete: function complete() {M("shareQQ", { title: e.title || t, desc: e.desc || "", img_url: e.imgUrl || "", link: e.link || location.href }, e);} }, e);}, onMenuShareWeibo: function onMenuShareWeibo(e) {P(c.onMenuShareWeibo, { complete: function complete() {M("shareWeiboApp", { title: e.title || t, desc: e.desc || "", img_url: e.imgUrl || "", link: e.link || location.href }, e);} }, e);}, onMenuShareQZone: function onMenuShareQZone(e) {P(c.onMenuShareQZone, { complete: function complete() {M("shareQZone", { title: e.title || t, desc: e.desc || "", img_url: e.imgUrl || "", link: e.link || location.href }, e);} }, e);}, updateTimelineShareData: function updateTimelineShareData(e) {M("updateTimelineShareData", { title: e.title, link: e.link, imgUrl: e.imgUrl }, e);}, updateAppMessageShareData: function updateAppMessageShareData(e) {M("updateAppMessageShareData", { title: e.title, desc: e.desc, link: e.link, imgUrl: e.imgUrl }, e);}, startRecord: function startRecord(e) {M("startRecord", {}, e);}, stopRecord: function stopRecord(e) {M("stopRecord", {}, e);}, onVoiceRecordEnd: function onVoiceRecordEnd(e) {P("onVoiceRecordEnd", e);}, playVoice: function playVoice(e) {M("playVoice", { localId: e.localId }, e);}, pauseVoice: function pauseVoice(e) {M("pauseVoice", { localId: e.localId }, e);}, stopVoice: function stopVoice(e) {M("stopVoice", { localId: e.localId }, e);}, onVoicePlayEnd: function onVoicePlayEnd(e) {P("onVoicePlayEnd", e);}, uploadVoice: function uploadVoice(e) {M("uploadVoice", { localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, downloadVoice: function downloadVoice(e) {M("downloadVoice", { serverId: e.serverId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, translateVoice: function translateVoice(e) {M("translateVoice", { localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, chooseImage: function chooseImage(e) {M("chooseImage", { scene: "1|2", count: e.count || 9, sizeType: e.sizeType || ["original", "compressed"], sourceType: e.sourceType || ["album", "camera"] }, (e._complete = function (e) {if (p) {var n = e.localIds;try {n && (e.localIds = JSON.parse(n));} catch (e) {}}}, e));}, getLocation: function getLocation(e) {}, previewImage: function previewImage(e) {M(c.previewImage, { current: e.current, urls: e.urls }, e);}, uploadImage: function uploadImage(e) {M("uploadImage", { localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, downloadImage: function downloadImage(e) {M("downloadImage", { serverId: e.serverId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, getLocalImgData: function getLocalImgData(e) {!1 === I ? (I = !0, M("getLocalImgData", { localId: e.localId }, (e._complete = function (e) {if (I = !1, 0 < _.length) {var n = _.shift();wx.getLocalImgData(n);}}, e))) : _.push(e);}, getNetworkType: function getNetworkType(e) {M("getNetworkType", {}, (e._complete = function (e) {e = function (e) {var n = e.errMsg;e.errMsg = "getNetworkType:ok";var i = e.subtype;if (delete e.subtype, i) e.networkType = i;else {var t = n.indexOf(":"),o = n.substring(t + 1);switch (o) {case "wifi":case "edge":case "wwan":e.networkType = o;break;default:e.errMsg = "getNetworkType:fail";}}return e;}(e);}, e));}, openLocation: function openLocation(e) {M("openLocation", { latitude: e.latitude, longitude: e.longitude, name: e.name || "", address: e.address || "", scale: e.scale || 28, infoUrl: e.infoUrl || "" }, e);} }, _defineProperty(_w, "getLocation", function getLocation(e) {M(c.getLocation, { type: (e = e || {}).type || "wgs84" }, (e._complete = function (e) {delete e.type;}, e));}), _defineProperty(_w, "hideOptionMenu", function hideOptionMenu(e) {M("hideOptionMenu", {}, e);}), _defineProperty(_w, "showOptionMenu", function showOptionMenu(e) {M("showOptionMenu", {}, e);}), _defineProperty(_w, "closeWindow", function closeWindow(e) {M("closeWindow", {}, e = e || {});}), _defineProperty(_w, "hideMenuItems", function hideMenuItems(e) {M("hideMenuItems", { menuList: e.menuList }, e);}), _defineProperty(_w, "showMenuItems", function showMenuItems(e) {M("showMenuItems", { menuList: e.menuList }, e);}), _defineProperty(_w, "hideAllNonBaseMenuItem", function hideAllNonBaseMenuItem(e) {M("hideAllNonBaseMenuItem", {}, e);}), _defineProperty(_w, "showAllNonBaseMenuItem", function showAllNonBaseMenuItem(e) {M("showAllNonBaseMenuItem", {}, e);}), _defineProperty(_w, "scanQRCode", function scanQRCode(e) {M("scanQRCode", { needResult: (e = e || {}).needResult || 0, scanType: e.scanType || ["qrCode", "barCode"] }, (e._complete = function (e) {if (f) {var n = e.resultStr;if (n) {var i = JSON.parse(n);e.resultStr = i && i.scan_code && i.scan_code.scan_result;}}}, e));}), _defineProperty(_w, "openAddress", function openAddress(e) {M(c.openAddress, {}, (e._complete = function (e) {e = function (e) {return e.postalCode = e.addressPostalCode, delete e.addressPostalCode, e.provinceName = e.proviceFirstStageName, delete e.proviceFirstStageName, e.cityName = e.addressCitySecondStageName, delete e.addressCitySecondStageName, e.countryName = e.addressCountiesThirdStageName, delete e.addressCountiesThirdStageName, e.detailInfo = e.addressDetailInfo, delete e.addressDetailInfo, e;}(e);}, e));}), _defineProperty(_w, "openProductSpecificView", function openProductSpecificView(e) {M(c.openProductSpecificView, { pid: e.productId, view_type: e.viewType || 0, ext_info: e.extInfo }, e);}), _defineProperty(_w, "addCard", function addCard(e) {for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {var r = n[t],a = { card_id: r.cardId, card_ext: r.cardExt };i.push(a);}M(c.addCard, { card_list: i }, (e._complete = function (e) {var n = e.card_list;if (n) {for (var i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {var o = n[i];o.cardId = o.card_id, o.cardExt = o.card_ext, o.isSuccess = !!o.is_succ, delete o.card_id, delete o.card_ext, delete o.is_succ;}e.cardList = n, delete e.card_list;}}, e));}), _defineProperty(_w, "chooseCard", function chooseCard(e) {M("chooseCard", { app_id: v.appId, location_id: e.shopId || "", sign_type: e.signType || "SHA1", card_id: e.cardId || "", card_type: e.cardType || "", card_sign: e.cardSign, time_stamp: e.timestamp + "", nonce_str: e.nonceStr }, (e._complete = function (e) {e.cardList = e.choose_card_info, delete e.choose_card_info;}, e));}), _defineProperty(_w, "openCard", function openCard(e) {for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {var r = n[t],a = { card_id: r.cardId, code: r.code };i.push(a);}M(c.openCard, { card_list: i }, e);}), _defineProperty(_w, "consumeAndShareCard", function consumeAndShareCard(e) {M(c.consumeAndShareCard, { consumedCardId: e.cardId, consumedCode: e.code }, e);}), _defineProperty(_w, "chooseWXPay", function chooseWXPay(e) {M(c.chooseWXPay, V(e), e);}), _defineProperty(_w, "openEnterpriseRedPacket", function openEnterpriseRedPacket(e) {M(c.openEnterpriseRedPacket, V(e), e);}), _defineProperty(_w, "startSearchBeacons", function startSearchBeacons(e) {M(c.startSearchBeacons, { ticket: e.ticket }, e);}), _defineProperty(_w, "stopSearchBeacons", function stopSearchBeacons(e) {M(c.stopSearchBeacons, {}, e);}), _defineProperty(_w, "onSearchBeacons", function onSearchBeacons(e) {P(c.onSearchBeacons, e);}), _defineProperty(_w, "openEnterpriseChat", function openEnterpriseChat(e) {M("openEnterpriseChat", { useridlist: e.userIds, chatname: e.groupName }, e);}), _defineProperty(_w, "launchMiniProgram", function launchMiniProgram(e) {M("launchMiniProgram", { targetAppId: e.targetAppId, path: function (e) {if ("string" == typeof e && 0 < e.length) {var n = e.split("?")[0],i = e.split("?")[1];return n += ".html", void 0 !== i ? n + "?" + i : n;}}(e.path), envVersion: e.envVersion }, e);}), _defineProperty(_w, "openBusinessView", function openBusinessView(e) {M("openBusinessView", { businessType: e.businessType, queryString: e.queryString || "", envVersion: e.envVersion }, (e._complete = function (n) {if (p) {var e = n.extraData;if (e) try {n.extraData = JSON.parse(e);} catch (e) {n.extraData = {};}}}, e));}), _defineProperty(_w, "miniProgram", { navigateBack: function navigateBack(e) {e = e || {}, O(function () {M("invokeMiniProgramAPI", { name: "navigateBack", arg: { delta: e.delta || 1 } }, e);});}, navigateTo: function navigateTo(e) {O(function () {M("invokeMiniProgramAPI", { name: "navigateTo", arg: { url: e.url } }, e);});}, redirectTo: function redirectTo(e) {O(function () {M("invokeMiniProgramAPI", { name: "redirectTo", arg: { url: e.url } }, e);});}, switchTab: function switchTab(e) {O(function () {M("invokeMiniProgramAPI", { name: "switchTab", arg: { url: e.url } }, e);});}, reLaunch: function reLaunch(e) {O(function () {M("invokeMiniProgramAPI", { name: "reLaunch", arg: { url: e.url } }, e);});}, postMessage: function postMessage(e) {O(function () {M("invokeMiniProgramAPI", { name: "postMessage", arg: e.data || {} }, e);});}, getEnv: function getEnv(e) {O(function () {e({ miniprogram: "miniprogram" === o.__wxjs_environment });});} }), _w),T = 1,k = {};return i.addEventListener("error", function (e) {if (!p) {var n = e.target,i = n.tagName,t = n.src;if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) if (-1 != t.indexOf("wxlocalresource://")) {e.preventDefault(), e.stopPropagation();var o = n["wx-id"];if (o || (o = T++, n["wx-id"] = o), k[o]) return;k[o] = !0, wx.ready(function () {wx.getLocalImgData({ localId: t, success: function success(e) {n.src = e.localData;} });});}}}, !0), i.addEventListener("load", function (e) {if (!p) {var n = e.target,i = n.tagName;n.src;if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {var t = n["wx-id"];t && (k[t] = !1);}}}, !0), e && (o.wx = o.jWeixin = w), w;}function M(n, e, i) {o.WeixinJSBridge ? WeixinJSBridge.invoke(n, x(e), function (e) {A(n, e, i);}) : B(n, i);}function P(n, i, t) {o.WeixinJSBridge ? WeixinJSBridge.on(n, function (e) {t && t.trigger && t.trigger(e), A(n, e, i);}) : B(n, t || i);}function x(e) {return (e = e || {}).appId = v.appId, e.verifyAppId = v.appId, e.verifySignType = "sha1", e.verifyTimestamp = v.timestamp + "", e.verifyNonceStr = v.nonceStr, e.verifySignature = v.signature, e;}function V(e) {return { timeStamp: e.timestamp + "", nonceStr: e.nonceStr, package: e.package, paySign: e.paySign, signType: e.signType || "SHA1" };}function A(e, n, i) {"openEnterpriseChat" != e && "openBusinessView" !== e || (n.errCode = n.err_code), delete n.err_code, delete n.err_desc, delete n.err_detail;var t = n.errMsg;t || (t = n.err_msg, delete n.err_msg, t = function (e, n) {var i = e,t = a[i];t && (i = t);var o = "ok";if (n) {var r = n.indexOf(":");"confirm" == (o = n.substring(r + 1)) && (o = "ok"), "failed" == o && (o = "fail"), -1 != o.indexOf("failed_") && (o = o.substring(7)), -1 != o.indexOf("fail_") && (o = o.substring(5)), "access denied" != (o = (o = o.replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != o || (o = "permission denied"), "config" == i && "function not exist" == o && (o = "ok"), "" == o && (o = "fail");}return n = i + ":" + o;}(e, t), n.errMsg = t), (i = i || {})._complete && (i._complete(n), delete i._complete), t = n.errMsg || "", v.debug && !i.isInnerInvoke && alert(JSON.stringify(n));var o = t.indexOf(":");switch (t.substring(o + 1)) {case "ok":i.success && i.success(n);break;case "cancel":i.cancel && i.cancel(n);break;default:i.fail && i.fail(n);}i.complete && i.complete(n);}function C(e) {if (e) {for (var n = 0, i = e.length; n < i; ++n) {var t = e[n],o = c[t];o && (e[n] = o);}return e;}}function B(e, n) {if (!(!v.debug || n && n.isInnerInvoke)) {var i = a[e];i && (e = i), n && n._complete && delete n._complete, console.log('"' + e + '",', n || "");}}function L() {return new Date().getTime();}function O(e) {l && (o.WeixinJSBridge ? e() : i.addEventListener && i.addEventListener("WeixinJSBridgeReady", e, !1));}});

/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@alpha","_id":"@dcloudio/uni-stat@2.0.0-alpha-25720200116005","_inBundle":false,"_integrity":"sha512-RZFw3WAaS/CZTzzv9JPaWvmoNitojD/06vPdHSzlqZi8GbuE222lFuyochEjrGkG8rPPrWHAnwfoPBuQVtkfdg==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@alpha","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"alpha","saveSpec":null,"fetchSpec":"alpha"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-alpha-25720200116005.tgz","_shasum":"08bb17aba91c84a981f33d74153aa3dd07b578ad","_spec":"@dcloudio/uni-stat@alpha","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/alpha/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"a129bde60de35f7ef497f43d5a45b4556231995c","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-alpha-25720200116005"};

/***/ }),

/***/ 619:
/*!******************************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/components/uni-icons/icons.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  'contact': "\uE100",
  'person': "\uE101",
  'personadd': "\uE102",
  'contact-filled': "\uE130",
  'person-filled': "\uE131",
  'personadd-filled': "\uE132",
  'phone': "\uE200",
  'email': "\uE201",
  'chatbubble': "\uE202",
  'chatboxes': "\uE203",
  'phone-filled': "\uE230",
  'email-filled': "\uE231",
  'chatbubble-filled': "\uE232",
  'chatboxes-filled': "\uE233",
  'weibo': "\uE260",
  'weixin': "\uE261",
  'pengyouquan': "\uE262",
  'chat': "\uE263",
  'qq': "\uE264",
  'videocam': "\uE300",
  'camera': "\uE301",
  'mic': "\uE302",
  'location': "\uE303",
  'mic-filled': "\uE332",
  'speech': "\uE332",
  'location-filled': "\uE333",
  'micoff': "\uE360",
  'image': "\uE363",
  'map': "\uE364",
  'compose': "\uE400",
  'trash': "\uE401",
  'upload': "\uE402",
  'download': "\uE403",
  'close': "\uE404",
  'redo': "\uE405",
  'undo': "\uE406",
  'refresh': "\uE407",
  'star': "\uE408",
  'plus': "\uE409",
  'minus': "\uE410",
  'circle': "\uE411",
  'checkbox': "\uE411",
  'close-filled': "\uE434",
  'clear': "\uE434",
  'refresh-filled': "\uE437",
  'star-filled': "\uE438",
  'plus-filled': "\uE439",
  'minus-filled': "\uE440",
  'circle-filled': "\uE441",
  'checkbox-filled': "\uE442",
  'closeempty': "\uE460",
  'refreshempty': "\uE461",
  'reload': "\uE462",
  'starhalf': "\uE463",
  'spinner': "\uE464",
  'spinner-cycle': "\uE465",
  'search': "\uE466",
  'plusempty': "\uE468",
  'forward': "\uE470",
  'back': "\uE471",
  'left-nav': "\uE471",
  'checkmarkempty': "\uE472",
  'home': "\uE500",
  'navigate': "\uE501",
  'gear': "\uE502",
  'paperplane': "\uE503",
  'info': "\uE504",
  'help': "\uE505",
  'locked': "\uE506",
  'more': "\uE507",
  'flag': "\uE508",
  'home-filled': "\uE530",
  'gear-filled': "\uE532",
  'info-filled': "\uE534",
  'help-filled': "\uE535",
  'more-filled': "\uE537",
  'settings': "\uE560",
  'list': "\uE562",
  'bars': "\uE563",
  'loop': "\uE565",
  'paperclip': "\uE567",
  'eye': "\uE568",
  'arrowup': "\uE580",
  'arrowdown': "\uE581",
  'arrowleft': "\uE582",
  'arrowright': "\uE583",
  'arrowthinup': "\uE584",
  'arrowthindown': "\uE585",
  'arrowthinleft': "\uE586",
  'arrowthinright': "\uE587",
  'pulldown': "\uE588",
  'closefill': "\uE589",
  'sound': "\uE590",
  'scan': "\uE612" };exports.default = _default;

/***/ }),

/***/ 7:
/*!****************************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/pages.json?{"type":"style"} ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index/index": { "navigationBarTitleText": "魔小秘" }, "pages/IncomeHome/IncomeHome": { "navigationBarTitleText": "魔秘来电", "enablePullDownRefresh": true, "backgroundTextStyle": "dark" }, "pages/IncomeHome/focus/focus": { "navigationBarTitleText": "关注公众号" }, "pages/CustomPage/CustomPage": { "navigationBarTitleText": "专属定制", "enablePullDownRefresh": true, "backgroundTextStyle": "dark" }, "pages/MinePage/MinePage": { "navigationBarTitleText": "个人中心", "enablePullDownRefresh": true, "backgroundTextStyle": "dark" }, "pages/SettingPage/SettingPage": { "navigationBarTitleText": "接听配置" }, "pages/IncomeHome/search/search": { "navigationBarTitleText": "搜索来电" }, "pages/IncomeHome/callDetails/callDetails": { "navigationBarTitleText": "通话详情" }, "pages/CustomPage/editOpen/editOpen": { "navigationBarTitleText": "编辑开场白" }, "pages/MinePage/MineWallet/MineWallet": { "navigationBarTitleText": "我的钱包", "enablePullDownRefresh": true, "backgroundTextStyle": "dark" }, "pages/MinePage/MineWalletDetail/MineWalletDetail": { "navigationBarTitleText": "明细详情" }, "pages/MinePage/MineWithDraw/MineWithDraw": { "navigationBarTitleText": "提现" }, "pages/MinePage/MineVipPage/MineVipPage": { "navigationBarTitleText": "我的VIP" }, "pages/MinePage/personalData/personalData": { "navigationBarTitleText": "个人信息" }, "pages/MinePage/aboutMXM/aboutMXM": { "navigationBarTitleText": "关于魔小秘" }, "pages/Welcome/Welcome": { "navigationBarTitleText": "服务介绍" }, "pages/Login/bindMobile": { "navigationBarTitleText": "魔小秘" }, "pages/Login/callList/callList": { "navigationBarTitleText": "注册" }, "pages/Login/callListDetail/callListDetail": { "navigationBarTitleText": "注册" }, "pages/Login/Invite/InviteNewUser": { "navigationBarTitleText": "领取折扣优惠券" }, "pages/Login/RegisterSucc/RegisterSucc": {}, "pages/Login/Invite/Invite": { "navigationBarTitleText": "邀请赚钱", "enablePullDownRefresh": true, "backgroundTextStyle": "dark" }, "pages/Login/Loginin/Loginin": {}, "pages/CustomPage/AddressBook/AddressBook": { "navigationBarTitleText": "通讯录" }, "pages/CustomPage/AddContact/AddContact": { "navigationBarTitleText": "添加联系人" }, "pages/CustomPage/ContactDetail/ContactDetail": { "navigationBarTitleText": "通讯录详情", "enablePullDownRefresh": true, "backgroundTextStyle": "dark" }, "pages/MinePage/Coupons/Coupons": { "navigationBarTitleText": "选择优惠券" }, "pages/JumpLogin/JumpLogin": { "navigationBarTitleText": "跳转" }, "pages/partner/partner": { "navigationBarTitleText": "合伙人", "enablePullDownRefresh": true, "backgroundTextStyle": "dark" }, "pages/camilo/camilo": { "navigationBarTitleText": "卡密激活" }, "pages/partner/balanceSubsidiary/balanceSubsidiary": { "navigationBarTitleText": "余额明细" }, "pages/partner/partnerBind/partnerBind": { "navigationBarTitleText": "账号绑定" }, "pages/partner/partnerInvite/partnerInvite": { "navigationBarTitleText": "我的邀请", "enablePullDownRefresh": true, "backgroundTextStyle": "dark" }, "pages/partner/partnerInviteNew/partnerInviteNew": { "navigationBarTitleText": "邀请使用" }, "pages/Login/Invite/inviteDetail": { "navigationBarTitleText": "我的邀请", "enablePullDownRefresh": true, "backgroundTextStyle": "dark" }, "pages/helpCenter/helpCenter": { "navigationBarTitleText": "帮助中心" }, "pages/helpCenter/about": { "navigationBarTitleText": "关于魔小秘" }, "pages/helpCenter/callForwarding": { "navigationBarTitleText": "什么是呼叫转移" }, "pages/helpCenter/isSetting": { "navigationBarTitleText": "如何查询是否设置成功" }, "pages/helpCenter/downtime": { "navigationBarTitleText": "手机停机后是否还能正常使用" }, "pages/helpCenter/ensureSafety": { "navigationBarTitleText": "魔小秘如何保障数据安全" }, "pages/helpCenter/feedBack": { "navigationBarTitleText": "如何反馈问题" }, "pages/MinePage/haveASaying/haveASaying": { "navigationBarTitleText": "我有话说" }, "pages/Welcome/guide/guide": { "navigationBarTitleText": "启用魔小秘" }, "pages/partner/partnerDraw/partnerDraw": { "navigationBarTitleText": "提现" }, "pages/partner/regSucc/regSucc": { "navigationBarTitleText": "注册成功" }, "pages/partner/partnerJumpLogin/partnerJumpLogin": { "navigationBarTitleText": "跳转" }, "pages/partner/partnerTip/partnerTip": { "navigationBarTitleText": "提示" }, "pages/Welcome/guideNew/guideNew": { "navigationBarTitleText": "引导页面" }, "pages/helpCenter/setFail": { "navigationBarTitleText": "设置失败" }, "static/userAgreement/userAgreement": { "navigationBarTitleText": "隐私协议" }, "static/privacyAgreement/privacyAgreement": { "navigationBarTitleText": "用户协议" }, "pages/Login/Courier/Courier": { "navigationBarTitleText": "外卖" }, "pages/Login/business/business": { "navigationBarTitleText": "商务" }, "pages/Login/collection/collection": { "navigationBarTitleText": "催收" }, "pages/IncomeHome/callList": { "navigationBarTitleText": "通话列表", "enablePullDownRefresh": true, "backgroundTextStyle": "dark" }, "pages/MinePage/exclusiveNum/exclusiveNum": { "navigationBarTitleText": "专属转接号码" }, "pages/partner/camiloPackage/camiloPackage": { "navigationBarTitleText": "卡密包", "enablePullDownRefresh": true, "backgroundTextStyle": "dark" }, "pages/partner/camiDetail/camiDetail": { "navigationBarTitleText": "卡密详情", "enablePullDownRefresh": true, "backgroundTextStyle": "dark" }, "pages/MinePage/WxService/WxService": { "navigationBarTitleText": "微信客服" }, "pages/commonWebView/commonWebView": { "navigationBarTitleText": "链接" }, "static/cooperationAgree/cooperationAgree": { "navigationBarTitleText": "共享经济合作伙伴协议" }, "pages/SettingPage/Setting/Setting": { "navigationBarTitleText": "接听配置" }, "pages/SettingPage/CustomReply/CustomReply": { "navigationBarTitleText": "自定义回复" }, "pages/SettingPage/RejectionBlacklist/RejectionBlacklist": { "navigationBarTitleText": "拒接黑名单" }, "pages/SettingPage/AddScene/AddScene": { "navigationBarTitleText": "新增场景" }, "pages/SettingPage/addBlack/addBlack": { "navigationBarTitleText": "添加黑名单" }, "pages/SettingPage/setReply/setReply": { "navigationBarTitleText": "设置回复" }, "pages/SettingPage/OpenUnsuccessful/OpenUnsuccessful": { "navigationBarTitleText": "开启不成功" }, "pages/greenChannel/greenChannel": { "navigationBarTitleText": "绿色通道" }, "pages/MinePage/AutomaticRenewal/AutomaticRenewal": { "navigationBarTitleText": "我的VIP" } }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "uni-app", "navigationBarBackgroundColor": "#FFFFFF", "backgroundColor": "#FFFFFF" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!***************************************************************************!*\
  !*** E:/colorUI/ai_chat_front/ai_assist_front/pages.json?{"type":"stat"} ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__9800B5A" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map