(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-Login-business-business"],{"0829":function(e,t,i){"use strict";i.r(t);var n=i("ce6f"),o=i("7554");for(var a in o)"default"!==a&&function(e){i.d(t,e,function(){return o[e]})}(a);i("1ab8");var c=i("2877"),l=Object(c["a"])(o["default"],n["a"],n["b"],!1,null,"00ce334e",null);t["default"]=l.exports},"1ab8":function(e,t,i){"use strict";var n=i("2dae"),o=i.n(n);o.a},"2dae":function(e,t,i){var n=i("ea35");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=i("4f06").default;o("42282192",n,!0,{sourceMap:!1,shadowMode:!1})},7554:function(e,t,i){"use strict";i.r(t);var n=i("7fac"),o=i.n(n);for(var a in n)"default"!==a&&function(e){i.d(t,e,function(){return n[e]})}(a);t["default"]=o.a},"7fac":function(e,t,i){"use strict";var n=i("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(i("f499")),a=n(i("89d8")),c=n(i("137e")),l=uni.createInnerAudioContext(),r={components:{uniPopup:c.default},data:function(){return{callData:{time:"48",type:"主动挂断，手机占线"},detailData:[{roleType:1,content:"喂，您好",audioStartTime:0,audioEndTime:0,isClick:!1},{roleType:2,content:"哎，你现在有空吗，然后我们开一个临时的会议。",audioStartTime:1620,audioEndTime:5570,isClick:!1},{roleType:1,content:"好的，那这边请问有别的事情吗？",audioStartTime:0,audioEndTime:0,isClick:!1},{roleType:2,content:"啊，我们这边开一个临时的会议，过来参加一下",audioStartTime:10920,audioEndTime:15350,isClick:!1},{roleType:1,content:"嗯嗯，我清楚了，请问还有别的事吗？",audioStartTime:0,audioEndTime:0,isClick:!1},{roleType:2,content:"嗯，这边过来开会",audioStartTime:21810,audioEndTime:24160,isClick:!1},{roleType:1,content:"开会是吧？要不你把开会时间还有地点告诉我一下？",audioStartTime:0,audioEndTime:0,isClick:!1},{roleType:2,content:"啊，就在就在我们的会议室，然后下午4点，请准时参加好吧",audioStartTime:30300,audioEndTime:35960,isClick:!1},{roleType:1,content:"好的，那除了开会还有什么事情？",audioStartTime:0,audioEndTime:0,isClick:!1},{roleType:2,content:"啊，没有了，谢谢",audioStartTime:39760,audioEndTime:41680,isClick:!1},{roleType:1,content:"嗯，好的，那这边先这样吧，再见。",audioStartTime:0,audioEndTime:0,isClick:!1}],mobileCode:"获取验证码",time:60,mobileTip:"",inputValue:"",smsTip:"",mobile:"",smsCode:"",isDisable:!1,bindmobile:"",isCheck:!1,checked:"agree",recShow:!1,playIcon:!1,iconPlay:!1,currentTime:"00:00",durationTime:"00:00",current:0,loading:!1,paused:!0,seek:!1,duration:100,itemStart:"",recordId:"",totalCur:0,totalStart:0,totalPlay:!1,src:"",startTime:0,itemSrc:"",blackShow:!1}},onLoad:function(){this.initValidate()},methods:{playItemRecord:function(e,t,i){for(var n=uni.createInnerAudioContext(),a=0,c=0;c<this.detailData.length;c++)if(i===c)if(a=c,this.detailData[i].isClick=!this.detailData[i].isClick,this.$forceUpdate(),1==this.detailData[i].isClick){console.log(this.detailData[i].isClick),console.log("开始播放1");var l=this;n.src="https://byrobot-prod.oss-cn-hangzhou.aliyuncs.com/InboundRobotCommunicate/20191231/20191231tPhfkU0000880816_user.wav",console.log("开始播放2");var r=0;n.play(),n.onCanplay(function(){console.log("可以播放"),1!=r&&(n.seek(e/1e3),n.onSeeking(function(){}),n.onSeeked(function(){r=1;setInterval(function(){n.currentTime>=t/1e3&&(n.stop(),n.onStop(),l.paused=!0,l.detailData[a].isClick=!1,l.$forceUpdate())},100);n.onError(function(e){l.title=(0,o.default)(e)})}))}),n.onError(function(){console.log("播放失败")})}else console.log(this.detailData[i].isClick),n.pause(),n.onPause(function(){console.log("暂停")})},playRecord:function(){var e=this;this.playIcon=!this.playIcon;var t=this;if(this.totalPlay=!this.totalPlay,t.recShow=!0,t.totalPlay){this.current=0;var i=0;t=this;l.autoplay=!0,l.src="https://byrobot-prod.oss-cn-hangzhou.aliyuncs.com/InboundRobotCommunicate/20191231/20191231tPhfkU0000880816.wav",l.onTimeUpdate(function(){e.seek||(e.current=l.currentTime)}),l.onPlay(function(){e.duration=l.duration,e.paused=!1,e.loading=!1}),l.onCanplay(function(){1!=i&&(l.seek(t.startTime/1e3),l.onSeeked(function(){i=1}),l.onEnded(function(){console.log("自然播放结束"),t.playIcon=!1}))}),l.onPause(function(){e.paused=!0}),l.onEnded(function(){e.current=0,e.recShow=!1}),l.onSeeked(function(){e.seek=!1})}else l.pause(),l.onPause(function(){t.startTime=1e3*l.currentTime,console.log("播放展厅")})},userAgree:function(){uni.navigateTo({url:"../../../static/privacyAgreement/privacyAgreement"})},privacyAgree:function(){uni.navigateTo({url:"../../../static/userAgreement/userAgreement"})},back:function(){uni.navigateBack({})},initValidate:function(){var e={mobile:{required:!0,tel:!0},smsCode:{required:!0}},t={mobile:{required:"请输入手机号！"},smsCode:{required:"请输入验证码"}};this.WxValidate=new a.default(e,t)},getMobileCode:function(){if(this.bindmobile){if("获取验证码"==this.mobileCode){this.time=60,this.timer();var e=this.$encruption(this.bindmobile),t={mobile:this.bindmobile,elmobi:e};console.log(t),this.$request.url_request(SENDCODE,t,"POST",function(e){uni.showToast({title:"验证码发送成功",icon:"none",duration:1e3})},function(e){})}}else uni.showToast({title:"手机号不可为空",icon:"none",duration:1e3})},timer:function(){this.time>0?(this.time--,this.mobileCode="还剩"+this.time+"s",setTimeout(this.timer,1e3)):(this.time=0,this.mobileCode="获取验证码")},handleLogin:function(e){var t=this;this.isDisable=!0,setTimeout(function(){t.isDisable=!1,t.$forceUpdate()},1e3);var i=e.detail.value;if(!this.WxValidate.checkForm(i)){var n=this.WxValidate.errorList[0];return uni.showToast({title:"".concat(n.msg),icon:"none"}),!1}if(0==this.isCheck)uni.showToast({title:"请阅读隐私协议",icon:"none",duration:1200});else{this.$request.url_request(LOGIN,i,"POST",function(e){0==JSON.parse(e.data).code?uni.navigateTo({url:"../../Welcome/Welcome"}):JSON.parse(e.data).msg&&uni.showToast({title:JSON.parse(e.data).msg,icon:"none",duration:1e3})},function(e){})}},backtohome:function(){uni.navigateTo({url:"../bindMobile"})},open:function(){this.$refs.popup.open()},checkboxChange:function(e){this.isCheck=!this.isCheck}}};t.default=r},ce6f:function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",[i("v-uni-view",{staticClass:"topHead"},[i("v-uni-image",{staticStyle:{width:"111rpx",height:"111rpx"},attrs:{src:"../../../static/loginIntroduce/moxiaomi@2x.png",mode:""}}),i("v-uni-view",{staticClass:"topText"},[i("v-uni-text",[e._v("防骚扰 免漏接")]),i("v-uni-text",[e._v("魔小秘AI助手帮你接电话")])],1)],1),i("v-uni-view",{staticStyle:{height:"170rpx"}}),i("v-uni-view",{staticClass:"detailTitle"},[i("v-uni-view",{staticClass:"leftBox"},[i("v-uni-text",{staticClass:"cuIcon-back",on:{click:function(t){t=e.$handleEvent(t),e.back(t)}}}),i("v-uni-view",{staticClass:"left"},[i("v-uni-text",[e._v("商务")]),i("v-uni-text",[e._v("2019-10-11 22:30 通话"+e._s(e.callData.time)+"s")])],1)],1),i("v-uni-view",[i("v-uni-view",{staticClass:"shiting",on:{click:function(t){t=e.$handleEvent(t),e.playRecord(t)}}},[e.playIcon?i("v-uni-image",{staticClass:"rightImg",attrs:{src:"../../../static/lALPDgQ9rUe7HQxKSg_74_74.png",mode:""}}):i("v-uni-image",{staticClass:"rightImg",attrs:{src:"../../../static/callDetail/bofang-1@2x.png",mode:""}}),i("v-uni-view",[i("v-uni-text",{staticStyle:{color:"#1c75ff","font-size":"24rpx"}},[e._v("听一听")])],1)],1)],1)],1),i("v-uni-view",{staticClass:"chatRrecord"},[i("v-uni-view",{staticClass:"callTip"},[i("v-uni-text",[e._v("通话消息已加密，确保您的隐私安全")])],1),i("v-uni-view",e._l(e.detailData,function(t,n){return i("v-uni-view",{key:n},[1==t.roleType?i("v-uni-view",{staticClass:"chatRight "},[i("v-uni-view",{staticClass:"chatContent"},[i("v-uni-text",[e._v(e._s(t.content))])],1),i("v-uni-view",{staticClass:"callHead"},[i("v-uni-image",{staticStyle:{border:"1rpx solid  #3396FB"},attrs:{src:"../../../static/loginIntroduce/luoli@2x.png",mode:""}})],1)],1):e._e(),2==t.roleType?i("v-uni-view",{staticClass:"chatLeft"},[i("v-uni-view",{staticClass:"callHead"},[i("v-uni-image",{attrs:{src:"../../../static/loginIntroduce/luoli@2x.png",mode:""}})],1),i("v-uni-view",{staticClass:"chatContentLeft"},[i("v-uni-view",[i("v-uni-text",[e._v(e._s(t.content))]),i("v-uni-view",[i("v-uni-image",{attrs:{src:t.isClick?"../../../static/play.png":"../../../static/play1.png",mode:""},on:{click:function(i){i=e.$handleEvent(i),e.playItemRecord(t.audioStartTime,t.audioEndTime,n)}}})],1)],1)],1)],1):e._e()],1)}),1),i("v-uni-view",{staticClass:"endInfo"},[i("v-uni-text",[e._v("魔小秘")]),i("v-uni-text",{staticClass:"moxiaomi"},[e._v("已挂断，本次通话"+e._s(e.callData.time)+"s")]),i("v-uni-text",[e._v("转接类型："+e._s(e.callData.type))])],1)],1),i("v-uni-view",{staticClass:"bto-bar cu-bar foot btnFoot",staticStyle:{bottom:"0px",background:"#FFFFFF"}},[i("v-uni-view",{staticClass:"btn"},[i("v-uni-button",{staticClass:"shili",on:{click:function(t){t=e.$handleEvent(t),e.backtohome(t)}}},[e._v("返回首页(魔小秘)")]),i("v-uni-button",{staticClass:"kaitong",on:{click:function(t){t=e.$handleEvent(t),e.open(t)}}},[e._v("立即开通")])],1)],1),i("uni-popup",{ref:"popup",staticStyle:{"z-index":"999"},attrs:{type:"bottom"}},[i("v-uni-view",{staticClass:"pop"},[i("v-uni-view",{staticClass:"popTitle"},[i("v-uni-text",[e._v("魔小秘AI助理")])],1),i("v-uni-form",{on:{submit:function(t){t=e.$handleEvent(t),e.handleLogin(t)}}},[i("v-uni-view",{staticClass:"loginInput"},[i("v-uni-view",{staticClass:"loginInputItem"},[i("v-uni-view",{staticClass:"mobileInput"},[i("v-uni-input",{attrs:{type:"text",value:e.inputValue,name:"mobile",placeholder:"请输入绑定的手机号"},model:{value:e.bindmobile,callback:function(t){e.bindmobile=t},expression:"bindmobile"}})],1)],1),i("v-uni-view",{staticClass:"loginInputItem"},[i("v-uni-view",{staticClass:"smsCode"},[i("v-uni-input",{attrs:{type:"text",value:"",name:"smsCode",placeholder:"请输入验证码"},model:{value:e.smsCode,callback:function(t){e.smsCode=t},expression:"smsCode"}}),i("v-uni-text",{staticClass:"code",on:{click:function(t){t=e.$handleEvent(t),e.getMobileCode(t)}}},[e._v(e._s(e.mobileCode))])],1)],1)],1),i("v-uni-view",{staticClass:"check"},[i("v-uni-view",[i("v-uni-image",{staticStyle:{width:"32rpx",height:"32rpx"},attrs:{src:e.isCheck?"../../../static/loginIntroduce/yixuanze@2x.png":"../../../static/loginIntroduce/meigouxuan@2x.png",mode:""},on:{click:function(t){t=e.$handleEvent(t),e.checkboxChange(t)}}})],1),i("v-uni-view",[i("v-uni-text",{staticClass:"xieyi"},[e._v("点击立即注册表示同意"),i("v-uni-text",{staticStyle:{color:"#1C75FF"},on:{click:function(t){t=e.$handleEvent(t),e.userAgree(t)}}},[e._v("《用户协议》")]),e._v("&"),i("v-uni-text",{staticStyle:{color:"#1C75FF"},on:{click:function(t){t=e.$handleEvent(t),e.privacyAgree(t)}}},[e._v("《隐私协议》")])],1)],1)],1),i("v-uni-view",{staticClass:"registerBtn  btn-group"},[i("v-uni-button",{staticClass:"cu-btn bg-blue shadow-blur round",attrs:{formType:"submit",disabled:e.isDisable}},[e._v("立即登录")])],1)],1)],1)],1)],1)},o=[];i.d(t,"a",function(){return n}),i.d(t,"b",function(){return o})},ea35:function(e,t,i){t=e.exports=i("2350")(!1),t.push([e.i,'uni-page-body[data-v-00ce334e]{background:#f3f6f7}.shiting[data-v-00ce334e]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}\r\n/* 绑定手机表单 */.check[data-v-00ce334e]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.xieyi[data-v-00ce334e]{color:#999;font-size:%?26?%;margin-left:%?17?%;display:block;margin-top:%?25?%}.loginInputItem[data-v-00ce334e]{margin:%?29?% 0;overflow:hidden}.inputTip[data-v-00ce334e]{color:red;font-size:%?20?%;display:block;margin-top:%?5?%}.mobileInput>uni-input[data-v-00ce334e]{width:100%}.loginInput uni-input[data-v-00ce334e]{outline:none;border-radius:%?10?%;border:1px solid #1c75ff;height:%?78?%;padding:%?10?% %?36?%}.smsCode[data-v-00ce334e]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.smsCode>uni-input[data-v-00ce334e]{width:%?401?%}.code[data-v-00ce334e]{color:#1c75ff;font-size:%?26?%;display:inline-block;margin:0 %?20?%}.registerBtn[data-v-00ce334e]{margin-top:%?20?%;padding:%?10?% 0}.registerBtn>uni-button[data-v-00ce334e]{width:100%;padding:%?40?% 0;font-size:%?30?%;background:-webkit-gradient(linear,left top,right top,from(#1c75ff),color-stop(10%,#1c75ff),color-stop(80%,#5799ff),to(#5799ff));background:-o-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);background:linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 80%,#5799ff);background:-ms-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);background:-webkit-linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 80%,#5799ff);background:-moz-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%)}\r\n/* 弹出层 */.pop[data-v-00ce334e]{background:#fff;padding:%?50?% %?72?%;border-top-left-radius:%?35?%;border-top-right-radius:%?35?%}.popTitle[data-v-00ce334e]{font-size:%?34?%;color:#111;text-align:center}.title[data-v-00ce334e]{font-weight:600;color:#111;font-size:%?48?%;text-align:center;margin:%?19?% 0}.titleTip[data-v-00ce334e]{font-size:%?30?%;color:#111;text-align:center;margin:%?7?% 0}.logoView[data-v-00ce334e]{margin:%?40?% 0}.logoContent[data-v-00ce334e]{width:%?170?%;height:%?170?%;margin:auto}.deliver[data-v-00ce334e]{width:%?40?%;height:%?6?%;background-color:#3296fa;margin:%?70?% auto}.topHead[data-v-00ce334e]{position:fixed;top:0;left:0;z-index:999;width:100%;padding:%?30?%;background:#fff;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.topText[data-v-00ce334e]{color:#111;font-size:%?26?%;margin-left:%?25?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.topText>uni-text[data-v-00ce334e]:first-of-type{font-size:%?36?%;display:block;margin-bottom:%?10?%}.detailTitle[data-v-00ce334e]{border-top:%?2?% solid #e6e6e6;background:#fff;padding:%?20?% %?30?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.leftBox[data-v-00ce334e]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:%?30?%;color:#111}.leftBox>uni-text[data-v-00ce334e]:first-of-type{color:#666;font-size:%?40?%}.left[data-v-00ce334e]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;margin-left:%?20?%}.left>uni-text[data-v-00ce334e]:nth-of-type(2){font-size:%?22?%;color:#777}.rightImg[data-v-00ce334e]{width:%?46?%;height:%?46?%;display:block;margin-top:%?10?%}.record[data-v-00ce334e]{padding:%?39?% %?20?%}.tip[data-v-00ce334e]{font-size:%?22?%;color:#666;text-align:center}.chatRrecord[data-v-00ce334e]{background-color:#f3f6f7}.callTip[data-v-00ce334e]{color:#666;font-size:%?22?%;text-align:center;padding:%?30?% 0}.chatRight[data-v-00ce334e]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;margin:%?40?% 0;padding:0 %?30?%;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}.callHead[data-v-00ce334e]{width:%?80?%;height:%?80?%;border-radius:%?80?%}.callHead>uni-image[data-v-00ce334e]{width:%?80?%;height:%?80?%;border-radius:%?80?%}.chatContent[data-v-00ce334e]{background-color:#fff;max-width:%?380?%;padding:%?22?% %?38?%;border-radius:%?20?%;display:-webkit-flex;display:-webkit-box;display:-ms-flexbox;display:flex;margin-right:%?40?%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;position:relative}.chatContent[data-v-00ce334e]:after{content:"";position:absolute;left:100%;top:%?20?%;width:0;height:0;border:%?15?% solid;border-color:rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0) #fff}.chatContent>uni-text[data-v-00ce334e],.chatContentLeft>uni-view>uni-text[data-v-00ce334e]{color:#222;font-size:%?28?%;margin:0;padding:0}.chatLeft[data-v-00ce334e]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;margin:%?40?% 0;padding:0 %?30?%;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start}.chatContentLeft[data-v-00ce334e]{background-color:#fff;padding:%?22?% %?38?%;max-width:%?380?%;border-radius:%?20?%;display:-webkit-flex;display:-webkit-box;display:-ms-flexbox;display:flex;margin-left:%?40?%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;position:relative}.chatContentLeft[data-v-00ce334e]:after{content:"";position:absolute;right:100%;top:%?20?%;width:0;height:0;border:%?20?% solid;border-color:rgba(0,0,0,0) #fff rgba(0,0,0,0) rgba(0,0,0,0)}.chatContentLeft>uni-view[data-v-00ce334e]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.chatContentLeft>uni-view>uni-view>uni-image[data-v-00ce334e]{width:%?30?%;height:%?30?%}.chatContentLeft>uni-view>uni-view[data-v-00ce334e]{width:%?30?%;height:%?30?%;margin-left:%?10?%}.endInfo[data-v-00ce334e]{text-align:center;padding-bottom:%?150?%}.endInfo>uni-text[data-v-00ce334e]:first-of-type{color:#1c75ff;font-size:%?26?%}.endInfo>uni-text[data-v-00ce334e]:nth-of-type(3){color:#8e8e8f;font-size:%?22?%;display:block;margin-top:%?20?%}.moxiaomi[data-v-00ce334e]{font-size:%?26?%;color:#464747}.endDiv[data-v-00ce334e]{border:%?1?% solid #dd514c;position:fixed;bottom:0;left:0}uni-button[data-v-00ce334e]:after{border:none}.btnFoot[data-v-00ce334e]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:%?28?% %?46?%;z-index:100}.btn[data-v-00ce334e]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.shili[data-v-00ce334e]{border:%?1?% solid #3296fa;background-color:#fff;width:%?309?%;height:%?72?%;border-radius:%?100?%;line-height:%?72?%;color:#1c75ff;margin:0 %?19?%}.kaitong[data-v-00ce334e]{width:%?309?%;height:%?72?%;border-radius:%?100?%;line-height:%?72?%;color:#fff;margin:0 %?19?%;background:-webkit-gradient(linear,left top,right top,from(#1c75ff),color-stop(10%,#1c75ff),color-stop(80%,#5799ff),to(#5799ff));background:-o-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);background:linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 80%,#5799ff);background:-ms-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);background:-webkit-linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 80%,#5799ff);background:-moz-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);-webkit-box-shadow:%?1?% %?1?% %?5?% #1c75ff;box-shadow:%?1?% %?1?% %?5?% #1c75ff}body.?%PAGE?%[data-v-00ce334e]{background:#f3f6f7}',""])}}]);