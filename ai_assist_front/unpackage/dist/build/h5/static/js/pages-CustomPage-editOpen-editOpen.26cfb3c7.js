(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-CustomPage-editOpen-editOpen"],{"0f28":function(e,t,i){"use strict";i.r(t);var n=i("a0f0"),a=i.n(n);for(var o in n)"default"!==o&&function(e){i.d(t,e,function(){return n[e]})}(o);t["default"]=a.a},"353d":function(e,t,i){"use strict";i.r(t);var n=i("9867"),a=i("f3cf");for(var o in a)"default"!==o&&function(e){i.d(t,e,function(){return a[e]})}(o);i("cc8e");var s=i("2877"),r=Object(s["a"])(a["default"],n["a"],n["b"],!1,null,"6d49a228",null);t["default"]=r.exports},"49d7":function(e,t,i){"use strict";var n=i("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a,o=n(i("f499")),s=i("781f"),r=i("5c82"),c=n(i("dd71")),d=i("ecd9"),l={components:{uniIcons:s.uniIcons,mpopup:c.default},data:function(){return{openInput:"",recStatus:"按住我开始录音",recComplete:!1,isleft:!0,isRight:!1,progerssShow:!1,recordTipShow:{opacity:"1"},isRec:!1,isSave:!1,isPlay:!0,confirmShow:!1,failShow:!1,jsData:"",isDisable:!0,localId:"",serverId:"",jishi:0,xiaomiSucc:!1,mobile:"",isJishi:!1,startTime:"",endTime:"",timeConsum:0}},onLoad:function(e){var t=JSON.parse(e.data);this.mobile=t.mobile,this.openInput=t.text,this.getJsAPI()},methods:{getJsAPI:function(){var e=this,t={};this.$request.url_request(r.JSAPI,t,"GET",function(t){e.jsData=JSON.parse(t.data).data,console.log("开场白得到的签名",e.jsData.signature),d.config({appId:e.jsData.appId,timestamp:e.jsData.timestamp,nonceStr:e.jsData.nonceStr,signature:e.jsData.signature,jsApiList:["startRecord","stopRecord","playVoice","pauseVoice","stopVoice","uploadVoice","onVoicePlayEnd"]}),d.ready(function(){console.log("接口处理成功")}),d.error(function(){console.log("接口处理失败")})},function(e){})},xiaomishuo:function(){this.isDisable=!0,console.log("自己录",this.isDisable),this.xiaomiSucc=!1,this.isleft=!0,this.isRight=!1},cancelXiaomi:function(){this.xiaomiSucc=!1},saveXiaomi:function(){this.xiaomiSucc=!0},confirmXiaomi:function(){var e=this,t={mobile:this.mobile,text:this.openInput};this.$request.url_request(r.TEXTPROLOGUE,t,"GET",function(t){uni.showToast({title:"保存成功！",icon:"success",mask:!0,duration:1e3}),e.xiaomiSucc=!1;(0,o.default)({mobile:e.mobile});setTimeout(function(){uni.navigateBack({})},1e3)},function(e){console.log("文本保存失败")})},delXiaomi:function(){},gotoSelfRecord:function(){console.log("自己录",this.isDisable),this.isDisable=!1,this.btnShow=!1,this.isleft=!1,this.isRight=!0},startRec:function(){var e=this;this.isJishi=!0,this.jishi=0,this.startTime=(new Date).getTime(),this.progerssShow=!0,this.recordTipShow.opacity="0",this.isRec=!0,this.recStatus="放开我停止录音",this.isPlay=!0,console.log("开始录音"),d.startRecord(),a=setInterval(function(){e.jishi++},1e3)},stopRec:function(){clearInterval(a),this.isJishi=!1,this.endTime=(new Date).getTime(),this.timeConsum=this.endTime-this.startTime,console.log(this.timeConsum);if(this.timeConsum/1e3<3)uni.showModal({content:"录音不足3秒",showCancel:!1});else{var e=this;this.isSave=!0,this.recComplete=!0,d.stopRecord({success:function(t){e.localId=t.localId,uni.showToast({title:"录音完成",icon:"none",mask:!0,duration:1e3})}})}this.progerssShow=!1,this.recordTipShow.opacity="1",this.isRec=!1,this.recStatus="按住我开始录音",this.isPlay=!1},playRecord:function(){var e=this;console.log("试听的localId",this.localId),""==this.localId?uni.showModal({content:"请先录制一段声音！",showCancel:!1}):d.playVoice({localId:e.localId})},delRec:function(){""==this.localId?(this.failShow=!1,uni.showModal({content:"请先录音！",showCancel:!1})):(this.isJishi=!1,this.confirmShow=!0)},confirmSave:function(){""==this.localId?(this.failShow=!1,uni.showModal({content:"请先录音！",showCancel:!1})):(this.isJishi=!1,this.failShow=!0)},saveRecord:function(){var e=this;""==this.localId?(this.failShow=!1,uni.showModal({content:"请先录音！",showCancel:!1})):(console.log("得到的录音时间",this.timeConsum),d.uploadVoice({localId:e.localId,isShowProgressTips:1,success:function(t){e.serverId=t.serverId;var i={mobile:e.mobile,serverId:e.serverId,voiceLength:e.timeConsum};e.$request.url_request(r.VOICEPROLOGUE,i,"GET",function(t){console.log("录音上传成功！"),uni.showToast({title:"保存成功!",icon:"none",duration:1e3}),setTimeout(function(){uni.navigateBack({})},1e3),e.confirmShow=!1,e.failShow=!1,e.isJishi=!1},function(e){uni.showToast({title:"保存失败!",icon:"none",duration:1e3}),console.log("录音上传失败！")})}}),this.confirmShow=!1,this.failShow=!1)},cancelSave:function(){this.isJishi=!1,this.confirmShow=!1,this.failShow=!1},confirmCancel:function(){this.isJishi=!1,this.confirmShow=!1},goback:function(){uni.navigateBack({delta:1})}}};t.default=l},"6bb6":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"popup_list"},e._l(e.popup_list,function(t,n){return i("v-uni-view",{key:t.uuid,attrs:{id:t.uuid}},[i("v-uni-view",{staticClass:"mpopup",class:[t.animator,t.typeClass],style:{background:t.color,top:n*e.distance+45+"px"},on:{click:function(i){i=e.$handleEvent(i),e.close(t.uuid,n)}}},[i("v-uni-view",{staticClass:"pic"},[i("v-uni-image",{staticClass:"icon",attrs:{mode:"aspectFit",src:t.icon}})],1),i("v-uni-text",{staticClass:"text",style:{color:t.colortext}},[e._v(e._s(t.content))])],1)],1)}),1)},a=[];i.d(t,"a",function(){return n}),i.d(t,"b",function(){return a})},"919a":function(e,t,i){t=e.exports=i("2350")(!1),t.push([e.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.mpopup[data-v-4b6b38ea]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;text-align:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;min-height:45px;width:%?550?%;-webkit-transition:all .5s;-o-transition:all .5s;transition:all .5s;position:fixed;left:0;right:0;margin:0 auto;border-radius:5px;z-index:998}.mpopup .pic[data-v-4b6b38ea]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;text-align:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:15px;height:15px;margin:auto 20px auto 0}.mpopup .pic .icon[data-v-4b6b38ea]{width:100%;height:auto}.mpopup .text[data-v-4b6b38ea]{margin:auto 20px auto 0;width:65%;font-size:16px}.mpopup-success[data-v-4b6b38ea]{background:#f0f9eb;border:1px solid #e1f3d8;color:#67c23a}.mpopup-err[data-v-4b6b38ea]{background:#fef0f0;border:1px solid #fde2e2;color:#f56c6c}.mpopup-warn[data-v-4b6b38ea]{background:#fdf6ec;border:1px solid #faecd8;color:#e6a23c}.mpopup-info[data-v-4b6b38ea]{background:#edf2fc;border:1px solid #ebeef5;color:#909399}.mpopup-loading[data-v-4b6b38ea]{background:#e2f5ff;border:1px solid #ceeeff;color:#5cbaff}.mpopup-loading uni-image[data-v-4b6b38ea]{-webkit-animation:rotate360-data-v-4b6b38ea 1.5s ease infinite;animation:rotate360-data-v-4b6b38ea 1.5s ease infinite}.fade_Down[data-v-4b6b38ea]{-webkit-animation:fadeInDown-data-v-4b6b38ea .6s both;animation:fadeInDown-data-v-4b6b38ea .6s both}.fade_Top[data-v-4b6b38ea]{-webkit-animation:fadeInTop-data-v-4b6b38ea .5s forwards;animation:fadeInTop-data-v-4b6b38ea .5s forwards}\n/*从上到下*/@-webkit-keyframes fadeInDown-data-v-4b6b38ea{0%{opacity:0;-webkit-transform:translateY(-100px);transform:stranslate(0,-100px)}to{opacity:1;-webkit-transform:translateY(10px);transform:stranslate(0,10px)}}@keyframes fadeInDown-data-v-4b6b38ea{0%{opacity:0;-webkit-transform:translateY(-100px);transform:stranslate(0,-100px)}to{opacity:1;-webkit-transform:translateY(10px);transform:stranslate(0,10px)}}\n/*从下到上*/@-webkit-keyframes fadeInTop-data-v-4b6b38ea{0%{opacity:1;-webkit-transform:translateY(10px);transform:stranslate(0,10px)}to{opacity:0;-webkit-transform:translateY(-100px);transform:stranslate(0,-100px)}}@keyframes fadeInTop-data-v-4b6b38ea{0%{opacity:1;-webkit-transform:translateY(10px);transform:stranslate(0,10px)}to{opacity:0;-webkit-transform:translateY(-100px);transform:stranslate(0,-100px)}}@-webkit-keyframes rotate360-data-v-4b6b38ea{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes rotate360-data-v-4b6b38ea{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}',""])},9867:function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"editOpen"},[i("v-uni-view",{staticClass:"editOpenContain shadowE7"},[i("v-uni-view",{staticClass:"flexDisplay"},[i("v-uni-view",[i("v-uni-text",{staticClass:"fontStyle30"},[e._v("开场白")])],1),e.isleft?i("v-uni-text",{staticClass:"cuIcon-notification iconSize"}):e._e(),e.recComplete?i("v-uni-text",{staticClass:"greyTextXs",on:{click:function(t){t=e.$handleEvent(t),e.playRecord(t)}}},[e._v("试听")]):e._e()],1),i("v-uni-view",{staticClass:"openContent",class:e.isRight?"greyText":""},[e.isDisable?i("v-uni-textarea",{attrs:{maxlength:"100",bindinput:"textareaAInput",placeholder:"您好，我现在正在忙，您有什么事情可以简要的说明一下。"},model:{value:e.openInput,callback:function(t){e.openInput=t},expression:"openInput"}}):i("v-uni-textarea",{attrs:{maxlength:"100",bindinput:"textareaAInput",disabled:"",placeholder:"在这里录下你想传达的留言"}})],1),i("v-uni-view",{staticClass:"openBtn"},[i("v-uni-view",[i("v-uni-view",{staticClass:"btnLeft",class:e.isleft?"blueBg":"blueColor",on:{click:function(t){t=e.$handleEvent(t),e.xiaomishuo(t)}}},[i("v-uni-text",{staticClass:"cuIcon-writefill"}),i("v-uni-text",[e._v("小秘说")])],1),i("v-uni-view",{staticClass:"btnRight",class:e.isRight?"blueBg":"blueColor",on:{click:function(t){t=e.$handleEvent(t),e.gotoSelfRecord(t)}}},[i("v-uni-text",{staticClass:"cuIcon-voicefill"}),i("v-uni-text",[e._v("自己录")])],1)],1),e.isleft?i("v-uni-view",{staticClass:"greyText"},[i("v-uni-text",[e._v(e._s(e.openInput?e.openInput.length:0)+"/100")])],1):e._e()],1)],1),e.isleft?i("v-uni-view",{staticClass:"bottomBtn cu-bar btn-group"},[i("v-uni-button",{staticClass:"cu-btn bg-white shadowE7 round",on:{click:function(t){t=e.$handleEvent(t),e.delXiaomi(t)}}},[e._v("删除")]),i("v-uni-button",{staticClass:"cu-btn bg-blue shadow-blur round",on:{click:function(t){t=e.$handleEvent(t),e.saveXiaomi(t)}}},[e._v("保存")])],1):e._e(),e.isRight?i("v-uni-view",{staticClass:"selfRec"},[i("v-uni-view",{staticClass:"recordBtn cu-bar btn-group"},[i("v-uni-button",{staticClass:"cu-btn bg-white shadowE7 round",on:{click:function(t){t=e.$handleEvent(t),e.delRec(t)}}},[e._v("删除")]),i("v-uni-button",{staticClass:"cu-btn bg-blue shadowE7 round",class:e.isSave?"saveBlue":"",on:{click:function(t){t=e.$handleEvent(t),e.confirmSave(t)}}},[e._v("保存")])],1),i("v-uni-view",{staticClass:"positionRela"},[i("v-uni-view",{staticClass:"recordView"},[e.isJishi?i("v-uni-view",{staticClass:"jishi"},[i("v-uni-text",[e._v("正在录音"+e._s(e.jishi)+"秒")])],1):e._e(),i("v-uni-view",{staticClass:"recordTip",style:e.recordTipShow},[e._v("按住我开始录音")]),i("v-uni-view",{staticClass:"container",class:e.isRec?"isRec":""},[i("v-uni-view",{staticClass:"wave ripple danger"},[i("v-uni-view",{staticClass:"circle"}),i("v-uni-view",{staticClass:"circle"}),i("v-uni-view",{staticClass:"circle"}),i("v-uni-view",{staticClass:"recordCircle",on:{touchstart:function(t){t=e.$handleEvent(t),e.startRec(t)},touchend:function(t){t=e.$handleEvent(t),e.stopRec(t)}}},[e.isPlay?i("v-uni-text",{staticClass:"cuIcon-voicefill recordIcon"}):i("v-uni-text",{staticClass:"cuIcon-playfill recordIcon"})],1)],1)],1),i("v-uni-view",{staticClass:"startRecord"},[i("v-uni-text",[e._v(e._s(e.recStatus))])],1)],1)],1)],1):e._e(),i("v-uni-view",{staticClass:"cu-modal",class:e.xiaomiSucc?"show":""},[i("v-uni-view",{staticClass:"cu-dialog",staticStyle:{"border-radius":"20rpx"}},[i("v-uni-view",{staticClass:"padding-xl"},[i("v-uni-text",{staticClass:"eoTipText"},[e._v("确认开场白？")]),i("v-uni-view",{staticClass:"cu-bar btn-group eoTipBtn"},[i("v-uni-button",{staticClass:"cu-btn bg-white shadowE7 round",on:{click:function(t){t=e.$handleEvent(t),e.cancelXiaomi(t)}}},[e._v("取消")]),i("v-uni-button",{staticClass:"cu-btn bg-blue shadow-blur round",on:{click:function(t){t=e.$handleEvent(t),e.confirmXiaomi(t)}}},[e._v("确定")])],1)],1)],1)],1),i("v-uni-view",{staticClass:"cu-modal",class:e.confirmShow?"show":""},[i("v-uni-view",{staticClass:"cu-dialog",staticStyle:{"border-radius":"20rpx"}},[i("v-uni-view",{staticClass:"padding-xl"},[i("v-uni-text",{staticClass:"eoTipText"},[e._v("场景对话还未保存，确认要放弃吗？")]),i("v-uni-view",{staticClass:"cu-bar btn-group eoTipBtn"},[i("v-uni-button",{staticClass:"cu-btn bg-white shadowE7 round",on:{click:function(t){t=e.$handleEvent(t),e.cancelSave(t)}}},[e._v("取消")]),i("v-uni-button",{staticClass:"cu-btn bg-blue shadow-blur round",on:{click:function(t){t=e.$handleEvent(t),e.confirmCancel(t)}}},[e._v("确定")])],1)],1)],1)],1),i("v-uni-view",{staticClass:"cu-modal",class:e.failShow?"show":""},[i("v-uni-view",{staticClass:"cu-dialog",staticStyle:{"border-radius":"20rpx"}},[i("v-uni-view",{staticClass:"padding-xl"},[i("v-uni-text",{staticClass:"eoTipText"},[e._v("确认保存录音？")]),i("v-uni-view",{staticClass:"cu-bar btn-group eoTipBtn"},[i("v-uni-button",{staticClass:"cu-btn bg-white shadowE7 round",on:{click:function(t){t=e.$handleEvent(t),e.cancelSave(t)}}},[e._v("取消")]),i("v-uni-button",{staticClass:"cu-btn bg-blue shadow-blur round",on:{click:function(t){t=e.$handleEvent(t),e.saveRecord(t)}}},[e._v("确定")])],1)],1)],1)],1),i("mpopup",{ref:"mpopup",attrs:{isdistance:!0}})],1)},a=[];i.d(t,"a",function(){return n}),i.d(t,"b",function(){return a})},"9d45":function(e,t,i){"use strict";var n=i("f2f2"),a=i.n(n);a.a},a0f0:function(e,t,i){"use strict";var n=i("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("6b54"),i("87b3"),i("a481");var a=n(i("795b")),o={data:function(){return{popup_list:[],distance:65}},props:{isdistance:{type:Boolean,default:!0}},methods:{init:function(e){return"success"==e.type?(e.icon="../../static/xuan-popup/success.png",e.typeClass="mpopup-success",e):"warn"==e.type?(e.icon="../../static/xuan-popup/warn.png",e.typeClass="mpopup-warn",e):"info"==e.type?(e.icon="../../static/xuan-popup/info.png",e.typeClass="mpopup-info",e):"err"==e.type?(e.icon="../../static/xuan-popup/err.png",e.typeClass="mpopup-err",e):"loading"==e.type?(e.icon="../../static/xuan-popup/loading.png",e.typeClass="mpopup-loading",e):void 0},open:function(e){this.isdistance||(this.distance=0);var t=this.guid();e.uuid=t,e.animator="fade_Down","boolean"!=typeof e.isClick&&(e.isClick=!1);var i=this.init(e);this.popup_list.push(i),i.isClick?this.$emit("uuidCallback",i.uuid):this.disappear(i.uuid,i.timeout)},disappear:function(e,t){var i=this;this.fade_out_animator(e,t).then(function(e){setTimeout(function(){for(var t=0;t<i.popup_list.length;t++)i.popup_list[t].uuid==e&&(i.popup_list.splice(t,1),i.$forceUpdate())},250)})},fade_out_animator:function(e,t){var i=this;return t&&"number"==typeof t||(t=3e3),new a.default(function(n){setTimeout(function(){for(var t=0;t<i.popup_list.length;t++)i.popup_list[t].uuid==e&&(i.popup_list[t].animator="fade_Top",n(e))},t)})},close:function(e,t){var i=this;t&&!this.popup_list[t].isClick||this.remove_element(e).then(function(t){setTimeout(function(){for(var n=0;n<i.popup_list.length;n++)i.popup_list[n].uuid==t&&(i.popup_list.splice(n,1),i.$emit("closeCallback",e),i.$forceUpdate())},250)})},remove_element:function(e){var t=this;return new a.default(function(i){for(var n=0;n<t.popup_list.length;n++)if(t.popup_list[n].uuid==e){t.popup_list[n].animator="fade_Top",i(e);break}})},update:function(e){for(var t=0;t<this.popup_list.length;t++)if(this.popup_list[t].uuid==e.uuid){this.popup_list[t].type=e.type,this.init(this.popup_list[t]),this.popup_list[t].content=e.content;break}},guid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0,i="x"==e?t:3&t|8;return i.toString(16)})}}};t.default=o},b54a:function(e,t,i){"use strict";i("386b")("link",function(e){return function(t){return e(this,"a","href",t)}})},c3e5:function(e,t,i){t=e.exports=i("2350")(!1),t.push([e.i,'uni-page-body[data-v-6d49a228]{background-color:#fff}.editOpenContain[data-v-6d49a228]{background-color:#fff;padding:%?40?% %?30?%}.openContent[data-v-6d49a228]{margin:%?30?% 0;height:%?150?%}.openContent>uni-textarea[data-v-6d49a228]{width:100%;font-size:%?28?%;height:%?160?%}.btnLeft[data-v-6d49a228],.btnRight[data-v-6d49a228]{padding:%?16?% %?20?%;text-align:center;border:%?1?% solid #1c75ff;display:inline-block;width:%?200?%;font-size:%?26?%}.btnLeft[data-v-6d49a228]{border-radius:%?100?% 0 0 %?100?%}.btnRight[data-v-6d49a228]{border-radius:0 %?100?% %?100?% 0;color:#fff}.btnLeft>uni-text[data-v-6d49a228]:first-of-type{margin-right:%?10?%}.btnRight>uni-text[data-v-6d49a228]:first-of-type{margin-right:%?10?%}.blueBg[data-v-6d49a228]{background:-webkit-gradient(linear,left top,right top,from(#5799ff),color-stop(10%,#5799ff),color-stop(70%,#1c75ff),to(#1c75ff));background:-o-linear-gradient(left,#5799ff 0,#5799ff 10%,#1c75ff 70%,#1c75ff 100%);background:linear-gradient(left,#5799ff,#5799ff 10%,#1c75ff 70%,#1c75ff);background:-ms-linear-gradient(left,#5799ff 0,#5799ff 10%,#1c75ff 70%,#1c75ff 100%);background:-webkit-linear-gradient(left,#5799ff,#5799ff 10%,#1c75ff 70%,#1c75ff);background:-moz-linear-gradient(left,#5799ff 0,#5799ff 10%,#1c75ff 70%,#1c75ff 100%);color:#fff}.blueColor[data-v-6d49a228]{color:#1c75ff}.openBtn[data-v-6d49a228]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.bottomBtn[data-v-6d49a228]{margin:auto;width:100%;bottom:%?10?%;position:absolute;padding:%?30?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.recordBtn>uni-button[data-v-6d49a228]{padding:%?40?% 0;font-size:%?34?%}.bottomBtn>uni-button[data-v-6d49a228]:first-of-type{color:#9d9d9d}.recordBtn[data-v-6d49a228]{padding:%?50?% 0;width:100%;background-color:#f1f4f6;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.recordBtn>uni-button[data-v-6d49a228]:first-of-type{color:#9d9d9d}.recordView[data-v-6d49a228]{background-color:#fff;padding:%?40?% %?100?%}.positionRela[data-v-6d49a228]{position:relative}.jishi[data-v-6d49a228]{text-align:center}.recordTip[data-v-6d49a228]{background-color:#a0c5ff;color:#ebf2ff;width:%?280?%;margin:auto;font-size:%?26?%;border-radius:%?14?%;padding:%?10?% 0;text-align:center;position:relative}.recordTip[data-v-6d49a228]:after{content:"";position:absolute;top:100%;left:44%;width:0;height:0;border:%?16?% solid;border-color:#a0c5ff rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0)}.recordCircle[data-v-6d49a228]{background:-webkit-gradient(linear,left top,right top,from(#1c75ff),color-stop(10%,#1c75ff),color-stop(70%,#5799ff),to(#5799ff));background:-o-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 70%,#5799ff 100%);background:linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 70%,#5799ff);background:-ms-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 70%,#5799ff 100%);background:-webkit-linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 70%,#5799ff);background:-moz-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 70%,#5799ff 100%);width:%?200?%;height:%?200?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;border-radius:%?100?%;z-index:999}.recordIcon[data-v-6d49a228]{font-size:%?100?%;color:#fff}\n\n/* 录音效果 */.container[data-v-6d49a228]{\n\t/* position: absolute; */position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:%?250?%;height:%?250?%;margin:%?10?% auto}.isRec>.wave[data-v-6d49a228]{position:relative;width:%?200?%;height:%?200?%;z-index:8}.isRec .circle[data-v-6d49a228]{position:absolute;border-radius:50%;opacity:0}\n\n/* 波纹效果 */.isRec .circle[data-v-6d49a228]{width:%?200?%;\n\t/* 减去边框的大小 */height:%?200?%\n\t/* 减去边框的大小 */}.isRec .circle[data-v-6d49a228]:first-child{-webkit-animation:circle-opacity-data-v-6d49a228 2s infinite;animation:circle-opacity-data-v-6d49a228 2s infinite}.isRec .circle[data-v-6d49a228]:nth-child(2){-webkit-animation:circle-opacity-data-v-6d49a228 2s infinite;animation:circle-opacity-data-v-6d49a228 2s infinite;-webkit-animation-delay:.3s;animation-delay:.3s}.isRec .circle[data-v-6d49a228]:nth-child(3){-webkit-animation:circle-opacity-data-v-6d49a228 2s infinite;animation:circle-opacity-data-v-6d49a228 2s infinite;-webkit-animation-delay:.6s;animation-delay:.6s}.isRec>.wave.ripple.danger .circle[data-v-6d49a228]{background-color:#cde1ff}\n\n/* 波动效果 */.isRec .circle[data-v-6d49a228]:first-child{-webkit-animation:circle-opacity-data-v-6d49a228 2s infinite;animation:circle-opacity-data-v-6d49a228 2s infinite}@-webkit-keyframes circle-opacity-data-v-6d49a228{0%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}to{opacity:0;-webkit-transform:scale(1.5);transform:scale(1.5)}}@keyframes circle-opacity-data-v-6d49a228{0%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}to{opacity:0;-webkit-transform:scale(1.5);transform:scale(1.5)}}.startRecord[data-v-6d49a228]{color:#a4a4a4;font-size:%?26?%;text-align:center;margin-bottom:%?20?%}.selfRec[data-v-6d49a228]{\n\t/* position: absolute; */bottom:0;width:100%}\n\n/* 进度条 */.progerss[data-v-6d49a228]{position:absolute;left:0;top:0;border:%?3?% solid #1c75ff;width:80%}.saveBlue[data-v-6d49a228]{background:-webkit-gradient(linear,left top,right top,from(#1c75ff),color-stop(10%,#1c75ff),color-stop(70%,#5799ff),to(#5799ff));background:-o-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 70%,#5799ff 100%);background:linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 70%,#5799ff);background:-ms-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 70%,#5799ff 100%);background:-webkit-linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 70%,#5799ff);background:-moz-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 70%,#5799ff 100%);color:#fff}.eoTipText[data-v-6d49a228]{color:#111;font-size:%?34?%;font-weight:600;display:inline-block;margin:%?30?%}.eoTipBtn[data-v-6d49a228]{margin:%?40?% 0 %?10?% 0}.eoTipBtn>uni-button[data-v-6d49a228]{padding:%?38?% 0}\n\n/* 录音播放效果 */@-webkit-keyframes yuying1-data-v-6d49a228{0%{height:0%}20%{height:50%}50%{height:100%}80%{height:50%}to{height:0%}}@keyframes yuying1-data-v-6d49a228{0%{height:0%}20%{height:50%}50%{height:100%}80%{height:50%}to{height:0%}}.playContainer[data-v-6d49a228]{width:%?90?%;height:%?30?%;margin:auto}.playContainer .one[data-v-6d49a228]{animation:yuying1-data-v-6d49a228 .8s infinite .3s;-webkit-animation:yuying1-data-v-6d49a228 .8s infinite .3s}.playContainer .two[data-v-6d49a228]{animation:yuying1-data-v-6d49a228 .8s infinite .4s;-webkit-animation:yuying1-data-v-6d49a228 .8s infinite .4s}.playContainer .three[data-v-6d49a228]{animation:yuying1-data-v-6d49a228 .8s infinite .5s;-webkit-animation:yuying1-data-v-6d49a228 .8s infinite .5s}.playContainer .four[data-v-6d49a228]{animation:yuying1-data-v-6d49a228 .8s infinite .6s;-webkit-animation:yuying1-data-v-6d49a228 .8s infinite .6s}.playContainer .five[data-v-6d49a228]{animation:yuying1-data-v-6d49a228 .8s infinite .7s;-webkit-animation:yuying1-data-v-6d49a228 .8s infinite .7s}.five[data-v-6d49a228],.four[data-v-6d49a228],.one[data-v-6d49a228],.three[data-v-6d49a228],.two[data-v-6d49a228]{width:%?6?%;height:100%;margin-left:%?10?%;border-radius:%?50?%;background-color:#1c75ff;vertical-align:middle;display:inline-block}body.?%PAGE?%[data-v-6d49a228]{background-color:#fff}',""])},cc8e:function(e,t,i){"use strict";var n=i("cd5d"),a=i.n(n);a.a},cd5d:function(e,t,i){var n=i("c3e5");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("521be538",n,!0,{sourceMap:!1,shadowMode:!1})},dd71:function(e,t,i){"use strict";i.r(t);var n=i("6bb6"),a=i("0f28");for(var o in a)"default"!==o&&function(e){i.d(t,e,function(){return a[e]})}(o);i("9d45");var s=i("2877"),r=Object(s["a"])(a["default"],n["a"],n["b"],!1,null,"4b6b38ea",null);t["default"]=r.exports},ecd9:function(e,t,i){"use strict";var n=i("288e"),a=n(i("bd86"));i("28a5"),i("7f7f"),i("b54a"),i("4917");var o=n(i("f499"));i("a481"),function(t,i){e.exports=i(t)}(window,function(e,t){function i(t,i,n){e.WeixinJSBridge?WeixinJSBridge.invoke(t,s(i),function(e){c(t,e,n)}):l(t,n)}function n(t,i,n){e.WeixinJSBridge?WeixinJSBridge.on(t,function(e){n&&n.trigger&&n.trigger(e),c(t,e,i)}):l(t,n||i)}function s(e){return(e=e||{}).appId=R.appId,e.verifyAppId=R.appId,e.verifySignType="sha1",e.verifyTimestamp=R.timestamp+"",e.verifyNonceStr=R.nonceStr,e.verifySignature=R.signature,e}function r(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function c(e,t,i){"openEnterpriseChat"==e&&(t.errCode=t.err_code),delete t.err_code,delete t.err_desc,delete t.err_detail;var n=t.errMsg;n||(n=t.err_msg,delete t.err_msg,n=function(e,t){var i=e,n=v[i];n&&(i=n);var a="ok";if(t){var o=t.indexOf(":");"confirm"==(a=t.substring(o+1))&&(a="ok"),"failed"==a&&(a="fail"),-1!=a.indexOf("failed_")&&(a=a.substring(7)),-1!=a.indexOf("fail_")&&(a=a.substring(5)),"access denied"!=(a=(a=a.replace(/_/g," ")).toLowerCase())&&"no permission to execute"!=a||(a="permission denied"),"config"==i&&"function not exist"==a&&(a="ok"),""==a&&(a="fail")}return i+":"+a}(e,n),t.errMsg=n),(i=i||{})._complete&&(i._complete(t),delete i._complete),n=t.errMsg||"",R.debug&&!i.isInnerInvoke&&alert((0,o.default)(t));var a=n.indexOf(":");switch(n.substring(a+1)){case"ok":i.success&&i.success(t);break;case"cancel":i.cancel&&i.cancel(t);break;default:i.fail&&i.fail(t)}i.complete&&i.complete(t)}function d(e){if(e){for(var t=0,i=e.length;t<i;++t){var n=e[t],a=m[n];a&&(e[t]=a)}return e}}function l(e,t){if(!(!R.debug||t&&t.isInnerInvoke)){var i=v[e];i&&(e=i),t&&t._complete&&delete t._complete,console.log('"'+e+'",',t||"")}}function u(){return(new Date).getTime()}function f(t){k&&(e.WeixinJSBridge?t():h.addEventListener&&h.addEventListener("WeixinJSBridgeReady",t,!1))}if(!e.jWeixin){var p,m={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},v=function(){var e={};for(var t in m)e[m[t]]=t;return e}(),h=e.document,g=h.title,b=navigator.userAgent.toLowerCase(),w=navigator.platform.toLowerCase(),x=!(!w.match("mac")&&!w.match("win")),y=-1!=b.indexOf("wxdebugger"),k=-1!=b.indexOf("micromessenger"),_=-1!=b.indexOf("android"),S=-1!=b.indexOf("iphone")||-1!=b.indexOf("ipad"),C=(O=b.match(/micromessenger\/(\d+\.\d+\.\d+)/)||b.match(/micromessenger\/(\d+\.\d+)/))?O[1]:"",I={initStartTime:u(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},T={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:S?1:_?2:-1,clientVersion:C,url:encodeURIComponent(location.href)},R={},M={_completes:[]},P={state:0,data:{}};f(function(){I.initEndTime=u()});var E=!1,B=[],A=(p={config:function(t){l("config",R=t);var n=!1!==R.check;f(function(){if(n)i(m.config,{verifyJsApiList:d(R.jsApiList)},function(){M._complete=function(e){I.preVerifyEndTime=u(),P.state=1,P.data=e},M.success=function(e){T.isPreVerifyOk=0},M.fail=function(e){M._fail?M._fail(e):P.state=-1};var e=M._completes;return e.push(function(){!function(e){if(!(x||y||R.debug||C<"6.0.2"||T.systemType<0)){var t=new Image;T.appId=R.appId,T.initTime=I.initEndTime-I.initStartTime,T.preVerifyTime=I.preVerifyEndTime-I.preVerifyStartTime,A.getNetworkType({isInnerInvoke:!0,success:function(e){T.networkType=e.networkType;var i="https://open.weixin.qq.com/sdk/report?v="+T.version+"&o="+T.isPreVerifyOk+"&s="+T.systemType+"&c="+T.clientVersion+"&a="+T.appId+"&n="+T.networkType+"&i="+T.initTime+"&p="+T.preVerifyTime+"&u="+T.url;t.src=i}})}}()}),M.complete=function(t){for(var i=0,n=e.length;i<n;++i)e[i]();M._completes=[]},M}()),I.preVerifyStartTime=u();else{P.state=1;for(var e=M._completes,t=0,a=e.length;t<a;++t)e[t]();M._completes=[]}}),A.invoke||(A.invoke=function(t,i,n){e.WeixinJSBridge&&WeixinJSBridge.invoke(t,s(i),n)},A.on=function(t,i){e.WeixinJSBridge&&WeixinJSBridge.on(t,i)})},ready:function(e){0!=P.state?e():(M._completes.push(e),!k&&R.debug&&e())},error:function(e){C<"6.0.2"||(-1==P.state?e(P.data):M._fail=e)},checkJsApi:function(e){i("checkJsApi",{jsApiList:d(e.jsApiList)},(e._complete=function(e){if(_){var t=e.checkResult;t&&(e.checkResult=JSON.parse(t))}e=function(e){var t=e.checkResult;for(var i in t){var n=v[i];n&&(t[n]=t[i],delete t[i])}return e}(e)},e))},onMenuShareTimeline:function(e){n(m.onMenuShareTimeline,{complete:function(){i("shareTimeline",{title:e.title||g,desc:e.title||g,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){n(m.onMenuShareAppMessage,{complete:function(t){"favorite"===t.scene?i("sendAppMessage",{title:e.title||g,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""}):i("sendAppMessage",{title:e.title||g,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){n(m.onMenuShareQQ,{complete:function(){i("shareQQ",{title:e.title||g,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){n(m.onMenuShareWeibo,{complete:function(){i("shareWeiboApp",{title:e.title||g,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){n(m.onMenuShareQZone,{complete:function(){i("shareQZone",{title:e.title||g,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},updateTimelineShareData:function(e){i("updateTimelineShareData",{title:e.title,link:e.link,imgUrl:e.imgUrl},e)},updateAppMessageShareData:function(e){i("updateAppMessageShareData",{title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl},e)},startRecord:function(e){i("startRecord",{},e)},stopRecord:function(e){i("stopRecord",{},e)},onVoiceRecordEnd:function(e){n("onVoiceRecordEnd",e)},playVoice:function(e){i("playVoice",{localId:e.localId},e)},pauseVoice:function(e){i("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){i("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){n("onVoicePlayEnd",e)},uploadVoice:function(e){i("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){i("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){i("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){i("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},(e._complete=function(e){if(_){var t=e.localIds;try{t&&(e.localIds=JSON.parse(t))}catch(e){}}},e))},getLocation:function(e){},previewImage:function(e){i(m.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){i("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){i("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===E?(E=!0,i("getLocalImgData",{localId:e.localId},(e._complete=function(e){if(E=!1,0<B.length){var t=B.shift();wx.getLocalImgData(t)}},e))):B.push(e)},getNetworkType:function(e){i("getNetworkType",{},(e._complete=function(e){e=function(e){var t=e.errMsg;e.errMsg="getNetworkType:ok";var i=e.subtype;if(delete e.subtype,i)e.networkType=i;else{var n=t.indexOf(":"),a=t.substring(n+1);switch(a){case"wifi":case"edge":case"wwan":e.networkType=a;break;default:e.errMsg="getNetworkType:fail"}}return e}(e)},e))},openLocation:function(e){i("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)}},(0,a.default)(p,"getLocation",function(e){i(m.getLocation,{type:(e=e||{}).type||"wgs84"},(e._complete=function(e){delete e.type},e))}),(0,a.default)(p,"hideOptionMenu",function(e){i("hideOptionMenu",{},e)}),(0,a.default)(p,"showOptionMenu",function(e){i("showOptionMenu",{},e)}),(0,a.default)(p,"closeWindow",function(e){i("closeWindow",{},e=e||{})}),(0,a.default)(p,"hideMenuItems",function(e){i("hideMenuItems",{menuList:e.menuList},e)}),(0,a.default)(p,"showMenuItems",function(e){i("showMenuItems",{menuList:e.menuList},e)}),(0,a.default)(p,"hideAllNonBaseMenuItem",function(e){i("hideAllNonBaseMenuItem",{},e)}),(0,a.default)(p,"showAllNonBaseMenuItem",function(e){i("showAllNonBaseMenuItem",{},e)}),(0,a.default)(p,"scanQRCode",function(e){i("scanQRCode",{needResult:(e=e||{}).needResult||0,scanType:e.scanType||["qrCode","barCode"]},(e._complete=function(e){if(S){var t=e.resultStr;if(t){var i=JSON.parse(t);e.resultStr=i&&i.scan_code&&i.scan_code.scan_result}}},e))}),(0,a.default)(p,"openAddress",function(e){i(m.openAddress,{},(e._complete=function(e){var t;(t=e).postalCode=t.addressPostalCode,delete t.addressPostalCode,t.provinceName=t.proviceFirstStageName,delete t.proviceFirstStageName,t.cityName=t.addressCitySecondStageName,delete t.addressCitySecondStageName,t.countryName=t.addressCountiesThirdStageName,delete t.addressCountiesThirdStageName,t.detailInfo=t.addressDetailInfo,delete t.addressDetailInfo,e=t},e))}),(0,a.default)(p,"openProductSpecificView",function(e){i(m.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)}),(0,a.default)(p,"addCard",function(e){for(var t=e.cardList,n=[],a=0,o=t.length;a<o;++a){var s=t[a],r={card_id:s.cardId,card_ext:s.cardExt};n.push(r)}i(m.addCard,{card_list:n},(e._complete=function(e){var t=e.card_list;if(t){for(var i=0,n=(t=JSON.parse(t)).length;i<n;++i){var a=t[i];a.cardId=a.card_id,a.cardExt=a.card_ext,a.isSuccess=!!a.is_succ,delete a.card_id,delete a.card_ext,delete a.is_succ}e.cardList=t,delete e.card_list}},e))}),(0,a.default)(p,"chooseCard",function(e){i("chooseCard",{app_id:R.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},(e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e))}),(0,a.default)(p,"openCard",function(e){for(var t=e.cardList,n=[],a=0,o=t.length;a<o;++a){var s=t[a],r={card_id:s.cardId,code:s.code};n.push(r)}i(m.openCard,{card_list:n},e)}),(0,a.default)(p,"consumeAndShareCard",function(e){i(m.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)}),(0,a.default)(p,"chooseWXPay",function(e){i(m.chooseWXPay,r(e),e)}),(0,a.default)(p,"openEnterpriseRedPacket",function(e){i(m.openEnterpriseRedPacket,r(e),e)}),(0,a.default)(p,"startSearchBeacons",function(e){i(m.startSearchBeacons,{ticket:e.ticket},e)}),(0,a.default)(p,"stopSearchBeacons",function(e){i(m.stopSearchBeacons,{},e)}),(0,a.default)(p,"onSearchBeacons",function(e){n(m.onSearchBeacons,e)}),(0,a.default)(p,"openEnterpriseChat",function(e){i("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)}),(0,a.default)(p,"launchMiniProgram",function(e){i("launchMiniProgram",{targetAppId:e.targetAppId,path:function(e){if("string"==typeof e&&0<e.length){var t=e.split("?")[0],i=e.split("?")[1];return t+=".html",void 0!==i?t+"?"+i:t}}(e.path),envVersion:e.envVersion},e)}),(0,a.default)(p,"miniProgram",{navigateBack:function(e){e=e||{},f(function(){i("invokeMiniProgramAPI",{name:"navigateBack",arg:{delta:e.delta||1}},e)})},navigateTo:function(e){f(function(){i("invokeMiniProgramAPI",{name:"navigateTo",arg:{url:e.url}},e)})},redirectTo:function(e){f(function(){i("invokeMiniProgramAPI",{name:"redirectTo",arg:{url:e.url}},e)})},switchTab:function(e){f(function(){i("invokeMiniProgramAPI",{name:"switchTab",arg:{url:e.url}},e)})},reLaunch:function(e){f(function(){i("invokeMiniProgramAPI",{name:"reLaunch",arg:{url:e.url}},e)})},postMessage:function(e){f(function(){i("invokeMiniProgramAPI",{name:"postMessage",arg:e.data||{}},e)})},getEnv:function(t){f(function(){t({miniprogram:"miniprogram"===e.__wxjs_environment})})}}),p),V=1,j={};return h.addEventListener("error",function(e){if(!_){var t=e.target,i=t.tagName,n=t.src;if(("IMG"==i||"VIDEO"==i||"AUDIO"==i||"SOURCE"==i)&&-1!=n.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var a=t["wx-id"];if(a||(a=V++,t["wx-id"]=a),j[a])return;j[a]=!0,wx.ready(function(){wx.getLocalImgData({localId:n,success:function(e){t.src=e.localData}})})}}},!0),h.addEventListener("load",function(e){if(!_){var t=e.target,i=t.tagName;if(t.src,"IMG"==i||"VIDEO"==i||"AUDIO"==i||"SOURCE"==i){var n=t["wx-id"];n&&(j[n]=!1)}}},!0),t&&(e.wx=e.jWeixin=A),A}var O})},f2f2:function(e,t,i){var n=i("919a");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("63a289ef",n,!0,{sourceMap:!1,shadowMode:!1})},f3cf:function(e,t,i){"use strict";i.r(t);var n=i("49d7"),a=i.n(n);for(var o in n)"default"!==o&&function(e){i.d(t,e,function(){return n[e]})}(o);t["default"]=a.a}}]);