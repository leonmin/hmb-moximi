(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-CustomPage-editOpen-editOpen"],{"0f28":function(t,i,a){"use strict";a.r(i);var e=a("19d3"),n=a.n(e);for(var o in e)"default"!==o&&function(t){a.d(i,t,function(){return e[t]})}(o);i["default"]=n.a},"19d3":function(t,i,a){"use strict";var e=a("288e");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,a("6b54"),a("a481");var n=e(a("795b")),o={data:function(){return{popup_list:[],distance:65}},props:{isdistance:{type:Boolean,default:!0}},methods:{init:function(t){return"success"==t.type?(t.icon="../../static/xuan-popup/success.png",t.typeClass="mpopup-success",t):"warn"==t.type?(t.icon="../../static/xuan-popup/warn.png",t.typeClass="mpopup-warn",t):"info"==t.type?(t.icon="../../static/xuan-popup/info.png",t.typeClass="mpopup-info",t):"err"==t.type?(t.icon="../../static/xuan-popup/err.png",t.typeClass="mpopup-err",t):"loading"==t.type?(t.icon="../../static/xuan-popup/loading.png",t.typeClass="mpopup-loading",t):void 0},open:function(t){this.isdistance||(this.distance=0);var i=this.guid();t.uuid=i,t.animator="fade_Down","boolean"!=typeof t.isClick&&(t.isClick=!1);var a=this.init(t);this.popup_list.push(a),a.isClick?this.$emit("uuidCallback",a.uuid):this.disappear(a.uuid,a.timeout)},disappear:function(t,i){var a=this;this.fade_out_animator(t,i).then(function(t){setTimeout(function(){for(var i=0;i<a.popup_list.length;i++)a.popup_list[i].uuid==t&&(a.popup_list.splice(i,1),a.$forceUpdate())},250)})},fade_out_animator:function(t,i){var a=this;return i&&"number"==typeof i||(i=3e3),new n.default(function(e){setTimeout(function(){for(var i=0;i<a.popup_list.length;i++)a.popup_list[i].uuid==t&&(a.popup_list[i].animator="fade_Top",e(t))},i)})},close:function(t,i){var a=this;i&&!this.popup_list[i].isClick||this.remove_element(t).then(function(i){setTimeout(function(){for(var e=0;e<a.popup_list.length;e++)a.popup_list[e].uuid==i&&(a.popup_list.splice(e,1),a.$emit("closeCallback",t),a.$forceUpdate())},250)})},remove_element:function(t){var i=this;return new n.default(function(a){for(var e=0;e<i.popup_list.length;e++)if(i.popup_list[e].uuid==t){i.popup_list[e].animator="fade_Top",a(t);break}})},update:function(t){for(var i=0;i<this.popup_list.length;i++)if(this.popup_list[i].uuid==t.uuid){this.popup_list[i].type=t.type,this.init(this.popup_list[i]),this.popup_list[i].content=t.content;break}},guid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var i=16*Math.random()|0,a="x"==t?i:3&i|8;return a.toString(16)})}}};i.default=o},"353d":function(t,i,a){"use strict";a.r(i);var e=a("e2f5"),n=a("f3cf");for(var o in n)"default"!==o&&function(t){a.d(i,t,function(){return n[t]})}(o);a("efea");var s,c=a("f0c5"),r=Object(c["a"])(n["default"],e["b"],e["c"],!1,null,"523a78ab",null,!1,e["a"],s);i["default"]=r.exports},"5deb":function(t,i,a){i=t.exports=a("2350")(!1),i.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.mpopup[data-v-4b6b38ea]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;text-align:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;min-height:45px;width:%?550?%;-webkit-transition:all .5s;transition:all .5s;position:fixed;left:0;right:0;margin:0 auto;border-radius:5px;z-index:998}.mpopup .pic[data-v-4b6b38ea]{display:-webkit-box;display:-webkit-flex;display:flex;text-align:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:15px;height:15px;margin:auto 20px auto 0}.mpopup .pic .icon[data-v-4b6b38ea]{width:100%;height:auto}.mpopup .text[data-v-4b6b38ea]{margin:auto 20px auto 0;width:65%;font-size:16px}.mpopup-success[data-v-4b6b38ea]{background:#f0f9eb;border:1px solid #e1f3d8;color:#67c23a}.mpopup-err[data-v-4b6b38ea]{background:#fef0f0;border:1px solid #fde2e2;color:#f56c6c}.mpopup-warn[data-v-4b6b38ea]{background:#fdf6ec;border:1px solid #faecd8;color:#e6a23c}.mpopup-info[data-v-4b6b38ea]{background:#edf2fc;border:1px solid #ebeef5;color:#909399}.mpopup-loading[data-v-4b6b38ea]{background:#e2f5ff;border:1px solid #ceeeff;color:#5cbaff}.mpopup-loading uni-image[data-v-4b6b38ea]{-webkit-animation:rotate360-data-v-4b6b38ea 1.5s ease infinite;animation:rotate360-data-v-4b6b38ea 1.5s ease infinite}.fade_Down[data-v-4b6b38ea]{-webkit-animation:fadeInDown-data-v-4b6b38ea .6s both;animation:fadeInDown-data-v-4b6b38ea .6s both}.fade_Top[data-v-4b6b38ea]{-webkit-animation:fadeInTop-data-v-4b6b38ea .5s forwards;animation:fadeInTop-data-v-4b6b38ea .5s forwards}\n/*从上到下*/@-webkit-keyframes fadeInDown-data-v-4b6b38ea{0%{opacity:0;-webkit-transform:translateY(-100px);transform:stranslate(0,-100px)}to{opacity:1;-webkit-transform:translateY(10px);transform:stranslate(0,10px)}}@keyframes fadeInDown-data-v-4b6b38ea{0%{opacity:0;-webkit-transform:translateY(-100px);transform:stranslate(0,-100px)}to{opacity:1;-webkit-transform:translateY(10px);transform:stranslate(0,10px)}}\n/*从下到上*/@-webkit-keyframes fadeInTop-data-v-4b6b38ea{0%{opacity:1;-webkit-transform:translateY(10px);transform:stranslate(0,10px)}to{opacity:0;-webkit-transform:translateY(-100px);transform:stranslate(0,-100px)}}@keyframes fadeInTop-data-v-4b6b38ea{0%{opacity:1;-webkit-transform:translateY(10px);transform:stranslate(0,10px)}to{opacity:0;-webkit-transform:translateY(-100px);transform:stranslate(0,-100px)}}@-webkit-keyframes rotate360-data-v-4b6b38ea{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes rotate360-data-v-4b6b38ea{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}',""])},6619:function(t,i,a){"use strict";var e=a("288e");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n,o=e(a("f499")),s=a("781f"),c=a("5c82"),r=e(a("dd71")),l=a("64c5"),u={components:{uniIcons:s.uniIcons,mpopup:r.default},data:function(){return{openInput:"",recStatus:"按住我开始录音",recComplete:!1,isleft:!0,isRight:!1,progerssShow:!1,recordTipShow:{opacity:"1"},isRec:!1,isSave:!1,isPlay:!0,confirmShow:!1,failShow:!1,jsData:"",isDisable:!0,localId:"",serverId:"",jishi:0,xiaomiSucc:!1,mobile:"",isJishi:!1,startTime:"",endTime:"",timeConsum:0}},onLoad:function(t){var i=JSON.parse(t.data);this.mobile=i.mobile,this.openInput=i.text,this.getJsAPI()},methods:{getJsAPI:function(){var t=this,i={};this.$request.url_request(c.JSAPI,i,"GET",function(i){t.jsData=JSON.parse(i.data).data,console.log("开场白得到的签名",t.jsData.signature),l.config({appId:t.jsData.appId,timestamp:t.jsData.timestamp,nonceStr:t.jsData.nonceStr,signature:t.jsData.signature,jsApiList:["startRecord","stopRecord","playVoice","pauseVoice","stopVoice","uploadVoice","onVoicePlayEnd"]}),l.ready(function(){console.log("接口处理成功")}),l.error(function(){console.log("接口处理失败")})},function(t){})},xiaomishuo:function(){this.isDisable=!0,console.log("自己录",this.isDisable),this.xiaomiSucc=!1,this.isleft=!0,this.isRight=!1},cancelXiaomi:function(){this.xiaomiSucc=!1},saveXiaomi:function(){this.xiaomiSucc=!0},confirmXiaomi:function(){var t=this,i={mobile:this.mobile,text:this.openInput};this.$request.url_request(c.TEXTPROLOGUE,i,"GET",function(i){uni.showToast({title:"保存成功！",icon:"success",mask:!0,duration:1e3}),t.xiaomiSucc=!1;(0,o.default)({mobile:t.mobile});setTimeout(function(){uni.navigateBack({})},1e3)},function(t){console.log("文本保存失败")})},delXiaomi:function(){},gotoSelfRecord:function(){console.log("自己录",this.isDisable),this.isDisable=!1,this.btnShow=!1,this.isleft=!1,this.isRight=!0},startRec:function(){var t=this;this.isJishi=!0,this.jishi=0,this.startTime=(new Date).getTime(),this.progerssShow=!0,this.recordTipShow.opacity="0",this.isRec=!0,this.recStatus="放开我停止录音",this.isPlay=!0,console.log("开始录音"),l.startRecord(),n=setInterval(function(){t.jishi++},1e3)},stopRec:function(){clearInterval(n),this.isJishi=!1,this.endTime=(new Date).getTime(),this.timeConsum=this.endTime-this.startTime,console.log(this.timeConsum);if(this.timeConsum/1e3<3)uni.showModal({content:"录音不足3秒",showCancel:!1});else{var t=this;this.isSave=!0,this.recComplete=!0,l.stopRecord({success:function(i){t.localId=i.localId,uni.showToast({title:"录音完成",icon:"none",mask:!0,duration:1e3})}})}this.progerssShow=!1,this.recordTipShow.opacity="1",this.isRec=!1,this.recStatus="按住我开始录音",this.isPlay=!1},playRecord:function(){var t=this;console.log("试听的localId",this.localId),""==this.localId?uni.showModal({content:"请先录制一段声音！",showCancel:!1}):l.playVoice({localId:t.localId})},delRec:function(){""==this.localId?(this.failShow=!1,uni.showModal({content:"请先录音！",showCancel:!1})):(this.isJishi=!1,this.confirmShow=!0)},confirmSave:function(){""==this.localId?(this.failShow=!1,uni.showModal({content:"请先录音！",showCancel:!1})):(this.isJishi=!1,this.failShow=!0)},saveRecord:function(){var t=this;""==this.localId?(this.failShow=!1,uni.showModal({content:"请先录音！",showCancel:!1})):(console.log("得到的录音时间",this.timeConsum),l.uploadVoice({localId:t.localId,isShowProgressTips:1,success:function(i){t.serverId=i.serverId;var a={mobile:t.mobile,serverId:t.serverId,voiceLength:t.timeConsum};t.$request.url_request(c.VOICEPROLOGUE,a,"GET",function(i){console.log("录音上传成功！"),uni.showToast({title:"保存成功!",icon:"success",duration:1e3}),setTimeout(function(){uni.navigateBack({})},1e3),t.confirmShow=!1,t.failShow=!1,t.isJishi=!1},function(t){uni.showToast({title:"保存失败!",icon:"none",duration:1e3}),console.log("录音上传失败！")})}}),this.confirmShow=!1,this.failShow=!1)},cancelSave:function(){this.isJishi=!1,this.confirmShow=!1,this.failShow=!1},confirmCancel:function(){this.isJishi=!1,this.confirmShow=!1},goback:function(){uni.navigateBack({delta:1})}}};i.default=u},"6bb6":function(t,i,a){"use strict";var e,n=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",{staticClass:"popup_list"},t._l(t.popup_list,function(i,e){return a("v-uni-view",{key:i.uuid,attrs:{id:i.uuid}},[a("v-uni-view",{staticClass:"mpopup",class:[i.animator,i.typeClass],style:{background:i.color,top:e*t.distance+45+"px"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.close(i.uuid,e)}}},[a("v-uni-view",{staticClass:"pic"},[a("v-uni-image",{staticClass:"icon",attrs:{mode:"aspectFit",src:i.icon}})],1),a("v-uni-text",{staticClass:"text",style:{color:i.colortext}},[t._v(t._s(i.content))])],1)],1)}),1)},o=[];a.d(i,"b",function(){return n}),a.d(i,"c",function(){return o}),a.d(i,"a",function(){return e})},"9d45":function(t,i,a){"use strict";var e=a("cd4a"),n=a.n(e);n.a},cd4a:function(t,i,a){var e=a("5deb");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=a("4f06").default;n("d6c8433a",e,!0,{sourceMap:!1,shadowMode:!1})},dd71:function(t,i,a){"use strict";a.r(i);var e=a("6bb6"),n=a("0f28");for(var o in n)"default"!==o&&function(t){a.d(i,t,function(){return n[t]})}(o);a("9d45");var s,c=a("f0c5"),r=Object(c["a"])(n["default"],e["b"],e["c"],!1,null,"4b6b38ea",null,!1,e["a"],s);i["default"]=r.exports},ddee:function(t,i,a){i=t.exports=a("2350")(!1),i.push([t.i,'uni-page-body[data-v-523a78ab]{background-color:#fff}.editOpenContain[data-v-523a78ab]{background-color:#fff;padding:%?40?% %?30?%}.openContent[data-v-523a78ab]{margin:%?30?% 0;height:%?150?%}.openContent>uni-textarea[data-v-523a78ab]{width:100%;font-size:%?28?%;height:%?160?%}.btnLeft[data-v-523a78ab],.btnRight[data-v-523a78ab]{padding:%?16?% %?20?%;text-align:center;border:%?1?% solid #1c75ff;display:inline-block;width:%?200?%;font-size:%?26?%}.btnLeft[data-v-523a78ab]{border-radius:%?100?% 0 0 %?100?%}.btnRight[data-v-523a78ab]{border-radius:0 %?100?% %?100?% 0;color:#fff}.btnLeft>uni-text[data-v-523a78ab]:first-of-type{margin-right:%?10?%}.btnRight>uni-text[data-v-523a78ab]:first-of-type{margin-right:%?10?%}.blueBg[data-v-523a78ab]{background:linear-gradient(left,#5799ff,#5799ff 10%,#1c75ff 70%,#1c75ff);background:-ms-linear-gradient(left,#5799ff 0,#5799ff 10%,#1c75ff 70%,#1c75ff 100%);background:-webkit-linear-gradient(left,#5799ff,#5799ff 10%,#1c75ff 70%,#1c75ff);background:-moz-linear-gradient(left,#5799ff 0,#5799ff 10%,#1c75ff 70%,#1c75ff 100%);color:#fff}.blueColor[data-v-523a78ab]{color:#1c75ff}.openBtn[data-v-523a78ab]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.bottomBtn[data-v-523a78ab]{margin:auto;width:100%;bottom:%?10?%;position:absolute;padding:%?30?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.recordBtn>uni-button[data-v-523a78ab]{padding:%?40?% 0;font-size:%?34?%}.bottomBtn>uni-button[data-v-523a78ab]:first-of-type{color:#9d9d9d}.recordBtn[data-v-523a78ab]{padding:%?50?% 0;width:100%;background-color:#f1f4f6;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.recordBtn>uni-button[data-v-523a78ab]:first-of-type{color:#9d9d9d}.recordView[data-v-523a78ab]{background-color:#fff;padding:%?40?% %?100?%}.positionRela[data-v-523a78ab]{position:relative}.jishi[data-v-523a78ab]{text-align:center}.recordTip[data-v-523a78ab]{background-color:#a0c5ff;color:#ebf2ff;width:%?280?%;margin:auto;font-size:%?26?%;border-radius:%?14?%;padding:%?10?% 0;text-align:center;position:relative}.recordTip[data-v-523a78ab]:after{content:"";position:absolute;top:100%;left:44%;width:0;height:0;border:%?16?% solid;border-color:#a0c5ff transparent transparent transparent}.recordCircle[data-v-523a78ab]{background:linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 70%,#5799ff);background:-ms-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 70%,#5799ff 100%);background:-webkit-linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 70%,#5799ff);background:-moz-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 70%,#5799ff 100%);width:%?200?%;height:%?200?%;display:-webkit-box;display:-webkit-flex;display:flex;position:relative;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-radius:%?100?%;z-index:999}.recordIcon[data-v-523a78ab]{font-size:%?100?%;color:#fff}\n\n/* 录音效果 */.container[data-v-523a78ab]{\n\t/* position: absolute; */position:relative;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:%?250?%;height:%?250?%;margin:%?10?% auto}.isRec>.wave[data-v-523a78ab]{position:relative;width:%?200?%;height:%?200?%;z-index:8}.isRec .circle[data-v-523a78ab]{position:absolute;border-radius:50%;opacity:0}\n\n/* 波纹效果 */.isRec .circle[data-v-523a78ab]{width:%?200?%;\n\t/* 减去边框的大小 */height:%?200?%\n\t/* 减去边框的大小 */}.isRec .circle[data-v-523a78ab]:first-child{-webkit-animation:circle-opacity-data-v-523a78ab 2s infinite;animation:circle-opacity-data-v-523a78ab 2s infinite}.isRec .circle[data-v-523a78ab]:nth-child(2){-webkit-animation:circle-opacity-data-v-523a78ab 2s infinite;animation:circle-opacity-data-v-523a78ab 2s infinite;-webkit-animation-delay:.3s;animation-delay:.3s}.isRec .circle[data-v-523a78ab]:nth-child(3){-webkit-animation:circle-opacity-data-v-523a78ab 2s infinite;animation:circle-opacity-data-v-523a78ab 2s infinite;-webkit-animation-delay:.6s;animation-delay:.6s}.isRec>.wave.ripple.danger .circle[data-v-523a78ab]{background-color:#cde1ff}\n\n/* 波动效果 */.isRec .circle[data-v-523a78ab]:first-child{-webkit-animation:circle-opacity-data-v-523a78ab 2s infinite;animation:circle-opacity-data-v-523a78ab 2s infinite}@-webkit-keyframes circle-opacity-data-v-523a78ab{0%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}to{opacity:0;-webkit-transform:scale(1.5);transform:scale(1.5)}}@keyframes circle-opacity-data-v-523a78ab{0%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}to{opacity:0;-webkit-transform:scale(1.5);transform:scale(1.5)}}.startRecord[data-v-523a78ab]{color:#a4a4a4;font-size:%?26?%;text-align:center;margin-bottom:%?20?%}.selfRec[data-v-523a78ab]{\n\t/* position: absolute; */bottom:0;width:100%}\n\n/* 进度条 */.progerss[data-v-523a78ab]{position:absolute;left:0;top:0;border:%?3?% solid #1c75ff;width:80%}.saveBlue[data-v-523a78ab]{background:linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 70%,#5799ff);background:-ms-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 70%,#5799ff 100%);background:-webkit-linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 70%,#5799ff);background:-moz-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 70%,#5799ff 100%);color:#fff}.eoTipText[data-v-523a78ab]{color:#111;font-size:%?34?%;font-weight:600;display:inline-block;margin:%?30?%}.eoTipBtn[data-v-523a78ab]{margin:%?40?% 0 %?10?% 0}.eoTipBtn>uni-button[data-v-523a78ab]{padding:%?38?% 0}\n\n/* 录音播放效果 */@-webkit-keyframes yuying1-data-v-523a78ab{0%{height:0%}20%{height:50%}50%{height:100%}80%{height:50%}to{height:0%}}@keyframes yuying1-data-v-523a78ab{0%{height:0%}20%{height:50%}50%{height:100%}80%{height:50%}to{height:0%}}.playContainer[data-v-523a78ab]{width:%?90?%;height:%?30?%;margin:auto}.playContainer .one[data-v-523a78ab]{animation:yuying1-data-v-523a78ab .8s infinite .3s;-webkit-animation:yuying1-data-v-523a78ab .8s infinite .3s}.playContainer .two[data-v-523a78ab]{animation:yuying1-data-v-523a78ab .8s infinite .4s;-webkit-animation:yuying1-data-v-523a78ab .8s infinite .4s}.playContainer .three[data-v-523a78ab]{animation:yuying1-data-v-523a78ab .8s infinite .5s;-webkit-animation:yuying1-data-v-523a78ab .8s infinite .5s}.playContainer .four[data-v-523a78ab]{animation:yuying1-data-v-523a78ab .8s infinite .6s;-webkit-animation:yuying1-data-v-523a78ab .8s infinite .6s}.playContainer .five[data-v-523a78ab]{animation:yuying1-data-v-523a78ab .8s infinite .7s;-webkit-animation:yuying1-data-v-523a78ab .8s infinite .7s}.five[data-v-523a78ab],.four[data-v-523a78ab],.one[data-v-523a78ab],.three[data-v-523a78ab],.two[data-v-523a78ab]{width:%?6?%;height:100%;margin-left:%?10?%;border-radius:%?50?%;background-color:#1c75ff;vertical-align:middle;display:inline-block}body.?%PAGE?%[data-v-523a78ab]{background-color:#fff}',""])},e024:function(t,i,a){var e=a("ddee");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=a("4f06").default;n("b4fc3324",e,!0,{sourceMap:!1,shadowMode:!1})},e2f5:function(t,i,a){"use strict";var e,n=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",{staticClass:"editOpen"},[a("v-uni-view",{staticClass:"editOpenContain shadowE7"},[a("v-uni-view",{staticClass:"flexDisplay"},[a("v-uni-view",[a("v-uni-text",{staticClass:"fontStyle30"},[t._v("开场白")])],1),t.isleft?a("v-uni-text",{staticClass:"cuIcon-notification iconSize"}):t._e(),t.recComplete?a("v-uni-text",{staticClass:"greyTextXs",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.playRecord.apply(void 0,arguments)}}},[t._v("试听")]):t._e()],1),a("v-uni-view",{staticClass:"openContent",class:t.isRight?"greyText":""},[t.isDisable?a("v-uni-textarea",{attrs:{maxlength:"100",bindinput:"textareaAInput",placeholder:"您好，我现在正在忙，您有什么事情可以简要的说明一下。"},model:{value:t.openInput,callback:function(i){t.openInput=i},expression:"openInput"}}):a("v-uni-textarea",{attrs:{maxlength:"100",bindinput:"textareaAInput",disabled:!0,placeholder:"在这里录下你想传达的留言"}})],1),a("v-uni-view",{staticClass:"openBtn"},[a("v-uni-view",[a("v-uni-view",{staticClass:"btnLeft",class:t.isleft?"blueBg":"blueColor",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.xiaomishuo.apply(void 0,arguments)}}},[a("v-uni-text",{staticClass:"cuIcon-writefill"}),a("v-uni-text",[t._v("小秘说")])],1),a("v-uni-view",{staticClass:"btnRight",class:t.isRight?"blueBg":"blueColor",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.gotoSelfRecord.apply(void 0,arguments)}}},[a("v-uni-text",{staticClass:"cuIcon-voicefill"}),a("v-uni-text",[t._v("自己录")])],1)],1),t.isleft?a("v-uni-view",{staticClass:"greyText"},[a("v-uni-text",[t._v(t._s(t.openInput?t.openInput.length:0)+"/100")])],1):t._e()],1)],1),t.isleft?a("v-uni-view",{staticClass:"bottomBtn cu-bar btn-group"},[a("v-uni-button",{staticClass:"cu-btn bg-white shadowE7 round",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.delXiaomi.apply(void 0,arguments)}}},[t._v("删除")]),a("v-uni-button",{staticClass:"cu-btn bg-blue shadow-blur round",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.saveXiaomi.apply(void 0,arguments)}}},[t._v("保存")])],1):t._e(),t.isRight?a("v-uni-view",{staticClass:"selfRec"},[a("v-uni-view",{staticClass:"recordBtn cu-bar btn-group"},[a("v-uni-button",{staticClass:"cu-btn bg-white shadowE7 round",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.delRec.apply(void 0,arguments)}}},[t._v("删除")]),a("v-uni-button",{staticClass:"cu-btn bg-blue shadowE7 round",class:t.isSave?"saveBlue":"",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.confirmSave.apply(void 0,arguments)}}},[t._v("保存")])],1),a("v-uni-view",{staticClass:"positionRela"},[a("v-uni-view",{staticClass:"recordView"},[t.isJishi?a("v-uni-view",{staticClass:"jishi"},[a("v-uni-text",[t._v("正在录音"+t._s(t.jishi)+"秒")])],1):t._e(),a("v-uni-view",{staticClass:"recordTip",style:t.recordTipShow},[t._v("按住我开始录音")]),a("v-uni-view",{staticClass:"container",class:t.isRec?"isRec":""},[a("v-uni-view",{staticClass:"wave ripple danger"},[a("v-uni-view",{staticClass:"circle"}),a("v-uni-view",{staticClass:"circle"}),a("v-uni-view",{staticClass:"circle"}),a("v-uni-view",{staticClass:"recordCircle",on:{touchstart:function(i){arguments[0]=i=t.$handleEvent(i),t.startRec.apply(void 0,arguments)},touchend:function(i){arguments[0]=i=t.$handleEvent(i),t.stopRec.apply(void 0,arguments)}}},[t.isPlay?a("v-uni-text",{staticClass:"cuIcon-voicefill recordIcon"}):a("v-uni-text",{staticClass:"cuIcon-playfill recordIcon"})],1)],1)],1),a("v-uni-view",{staticClass:"startRecord"},[a("v-uni-text",[t._v(t._s(t.recStatus))])],1)],1)],1)],1):t._e(),a("v-uni-view",{staticClass:"cu-modal",class:t.xiaomiSucc?"show":""},[a("v-uni-view",{staticClass:"cu-dialog",staticStyle:{"border-radius":"20rpx"}},[a("v-uni-view",{staticClass:"padding-xl"},[a("v-uni-text",{staticClass:"eoTipText"},[t._v("确认开场白？")]),a("v-uni-view",{staticClass:"cu-bar btn-group eoTipBtn"},[a("v-uni-button",{staticClass:"cu-btn bg-white shadowE7 round",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.cancelXiaomi.apply(void 0,arguments)}}},[t._v("取消")]),a("v-uni-button",{staticClass:"cu-btn bg-blue shadow-blur round",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.confirmXiaomi.apply(void 0,arguments)}}},[t._v("确定")])],1)],1)],1)],1),a("v-uni-view",{staticClass:"cu-modal",class:t.confirmShow?"show":""},[a("v-uni-view",{staticClass:"cu-dialog",staticStyle:{"border-radius":"20rpx"}},[a("v-uni-view",{staticClass:"padding-xl"},[a("v-uni-text",{staticClass:"eoTipText"},[t._v("场景对话还未保存，确认要放弃吗？")]),a("v-uni-view",{staticClass:"cu-bar btn-group eoTipBtn"},[a("v-uni-button",{staticClass:"cu-btn bg-white shadowE7 round",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.cancelSave.apply(void 0,arguments)}}},[t._v("取消")]),a("v-uni-button",{staticClass:"cu-btn bg-blue shadow-blur round",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.confirmCancel.apply(void 0,arguments)}}},[t._v("确定")])],1)],1)],1)],1),a("v-uni-view",{staticClass:"cu-modal",class:t.failShow?"show":""},[a("v-uni-view",{staticClass:"cu-dialog",staticStyle:{"border-radius":"20rpx"}},[a("v-uni-view",{staticClass:"padding-xl"},[a("v-uni-text",{staticClass:"eoTipText"},[t._v("确认保存录音？")]),a("v-uni-view",{staticClass:"cu-bar btn-group eoTipBtn"},[a("v-uni-button",{staticClass:"cu-btn bg-white shadowE7 round",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.cancelSave.apply(void 0,arguments)}}},[t._v("取消")]),a("v-uni-button",{staticClass:"cu-btn bg-blue shadow-blur round",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.saveRecord.apply(void 0,arguments)}}},[t._v("确定")])],1)],1)],1)],1),a("mpopup",{ref:"mpopup",attrs:{isdistance:!0}})],1)},o=[];a.d(i,"b",function(){return n}),a.d(i,"c",function(){return o}),a.d(i,"a",function(){return e})},efea:function(t,i,a){"use strict";var e=a("e024"),n=a.n(e);n.a},f3cf:function(t,i,a){"use strict";a.r(i);var e=a("6619"),n=a.n(e);for(var o in e)"default"!==o&&function(t){a.d(i,t,function(){return e[t]})}(o);i["default"]=n.a}}]);