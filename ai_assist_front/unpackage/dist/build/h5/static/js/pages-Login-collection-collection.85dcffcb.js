(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-Login-collection-collection"],{3773:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"topHead"},[i("v-uni-image",{staticStyle:{width:"111rpx",height:"111rpx"},attrs:{src:"../../../static/loginIntroduce/moxiaomi@2x.png",mode:""}}),i("v-uni-view",{staticClass:"topText"},[i("v-uni-text",[t._v("防骚扰 免漏接")]),i("v-uni-text",[t._v("魔小秘AI助手帮你接电话")])],1)],1),i("v-uni-view",{staticStyle:{height:"170rpx"}}),i("v-uni-view",{staticClass:"detailTitle"},[i("v-uni-view",{staticClass:"leftBox"},[i("v-uni-text",{staticClass:"cuIcon-back",on:{click:function(e){e=t.$handleEvent(e),t.back(e)}}}),i("v-uni-view",{staticClass:"left"},[i("v-uni-text",[t._v("催收")]),i("v-uni-text",[t._v("2019-10-11 22:30 通话"+t._s(t.callData.time)+"s")])],1)],1),i("v-uni-view",[i("v-uni-view",{staticClass:"shiting",on:{click:function(e){e=t.$handleEvent(e),t.playRecord(e)}}},[t.playIcon?i("v-uni-image",{staticClass:"rightImg",attrs:{src:"../../../static/lALPDgQ9rUe7HQxKSg_74_74.png",mode:""}}):i("v-uni-image",{staticClass:"rightImg",attrs:{src:"../../../static/callDetail/bofang-1@2x.png",mode:""}}),i("v-uni-view",[i("v-uni-text",{staticStyle:{color:"#1c75ff","font-size":"24rpx"}},[t._v("听一听")])],1)],1)],1)],1),i("v-uni-view",{staticClass:"chatRrecord"},[i("v-uni-view",{staticClass:"callTip"},[i("v-uni-text",[t._v("通话消息已加密，确保您的隐私安全")])],1),i("v-uni-view",t._l(t.detailData,function(e,n){return i("v-uni-view",{key:n},[1==e.roleType?i("v-uni-view",{staticClass:"chatRight "},[i("v-uni-view",{staticClass:"chatContent"},[i("v-uni-text",[t._v(t._s(e.content))])],1),i("v-uni-view",{staticClass:"callHead"},[i("v-uni-image",{staticStyle:{border:"1rpx solid  #3396FB"},attrs:{src:"../../../static/loginIntroduce/luoli@2x.png",mode:""}})],1)],1):t._e(),2==e.roleType?i("v-uni-view",{staticClass:"chatLeft"},[i("v-uni-view",{staticClass:"callHead"},[i("v-uni-image",{attrs:{src:"../../../static/loginIntroduce/luoli@2x.png",mode:""}})],1),i("v-uni-view",{staticClass:"chatContentLeft"},[i("v-uni-view",[i("v-uni-text",[t._v(t._s(e.content))]),i("v-uni-view",[i("v-uni-image",{attrs:{src:e.isClick?"../../../static/play.png":"../../../static/play1.png",mode:""},on:{click:function(i){i=t.$handleEvent(i),t.playItemRecord(e.audioStartTime,e.audioEndTime,n)}}})],1)],1)],1)],1):t._e()],1)}),1),i("v-uni-view",{staticClass:"endInfo"},[i("v-uni-text",[t._v("魔小秘")]),i("v-uni-text",{staticClass:"moxiaomi"},[t._v("已挂断，本次通话"+t._s(t.callData.time)+"s")]),i("v-uni-text",[t._v("转接类型："+t._s(t.callData.type))])],1)],1),i("v-uni-view",{staticClass:"bto-bar cu-bar foot btnFoot",staticStyle:{bottom:"0px",background:"#FFFFFF"}},[i("v-uni-view",{staticClass:"btn"},[i("v-uni-button",{staticClass:"shili",on:{click:function(e){e=t.$handleEvent(e),t.backtohome(e)}}},[t._v("返回首页(魔小秘)")]),i("v-uni-button",{staticClass:"kaitong",on:{click:function(e){e=t.$handleEvent(e),t.open(e)}}},[t._v("立即开通")])],1)],1),i("uni-popup",{ref:"popup",staticStyle:{"z-index":"999"},attrs:{type:"bottom"}},[i("v-uni-view",{staticClass:"pop"},[i("v-uni-view",{staticClass:"popTitle"},[i("v-uni-text",[t._v("魔小秘AI助理")])],1),i("v-uni-form",{on:{submit:function(e){e=t.$handleEvent(e),t.handleLogin(e)}}},[i("v-uni-view",{staticClass:"loginInput"},[i("v-uni-view",{staticClass:"loginInputItem"},[i("v-uni-view",{staticClass:"mobileInput"},[i("v-uni-input",{attrs:{type:"text",value:t.inputValue,name:"mobile",placeholder:"请输入绑定的手机号"},model:{value:t.bindmobile,callback:function(e){t.bindmobile=e},expression:"bindmobile"}})],1)],1),i("v-uni-view",{staticClass:"loginInputItem"},[i("v-uni-view",{staticClass:"smsCode"},[i("v-uni-input",{attrs:{type:"text",value:"",name:"smsCode",placeholder:"请输入验证码"},model:{value:t.smsCode,callback:function(e){t.smsCode=e},expression:"smsCode"}}),i("v-uni-text",{staticClass:"code",on:{click:function(e){e=t.$handleEvent(e),t.getMobileCode(e)}}},[t._v(t._s(t.mobileCode))])],1)],1)],1),i("v-uni-view",{staticClass:"check"},[i("v-uni-view",[i("v-uni-image",{staticStyle:{width:"32rpx",height:"32rpx"},attrs:{src:t.isCheck?"../../../static/loginIntroduce/yixuanze@2x.png":"../../../static/loginIntroduce/meigouxuan@2x.png",mode:""},on:{click:function(e){e=t.$handleEvent(e),t.checkboxChange(e)}}})],1),i("v-uni-view",[i("v-uni-text",{staticClass:"xieyi"},[t._v("点击立即注册表示同意"),i("v-uni-text",{staticStyle:{color:"#1C75FF"},on:{click:function(e){e=t.$handleEvent(e),t.userAgree(e)}}},[t._v("《用户协议》")]),t._v("&"),i("v-uni-text",{staticStyle:{color:"#1C75FF"},on:{click:function(e){e=t.$handleEvent(e),t.privacyAgree(e)}}},[t._v("《隐私协议》")])],1)],1)],1),i("v-uni-view",{staticClass:"registerBtn  btn-group"},[i("v-uni-button",{staticClass:"cu-btn bg-blue shadow-blur round",attrs:{formType:"submit",disabled:t.isDisable}},[t._v("立即登录")])],1)],1)],1)],1)],1)},o=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return o})},"3c47":function(t,e,i){var n=i("9156");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("3a6c86d4",n,!0,{sourceMap:!1,shadowMode:!1})},6965:function(t,e,i){"use strict";var n=i("3c47"),o=i.n(n);o.a},"6b85":function(t,e,i){"use strict";i.r(e);var n=i("3773"),o=i("e75f");for(var a in o)"default"!==a&&function(t){i.d(e,t,function(){return o[t]})}(a);i("6965");var c=i("2877"),l=Object(c["a"])(o["default"],n["a"],n["b"],!1,null,"fc714ff0",null);e["default"]=l.exports},9156:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,'uni-page-body[data-v-fc714ff0]{background:#f3f6f7}.shiting[data-v-fc714ff0]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}\r\n/* 绑定手机表单 */.check[data-v-fc714ff0]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.xieyi[data-v-fc714ff0]{color:#999;font-size:%?26?%;margin-left:%?17?%;display:block;margin-top:%?25?%}.loginInputItem[data-v-fc714ff0]{margin:%?29?% 0;overflow:hidden}.inputTip[data-v-fc714ff0]{color:red;font-size:%?20?%;display:block;margin-top:%?5?%}.mobileInput>uni-input[data-v-fc714ff0]{width:100%}.loginInput uni-input[data-v-fc714ff0]{outline:none;border-radius:%?10?%;border:1px solid #1c75ff;height:%?78?%;padding:%?10?% %?36?%}.smsCode[data-v-fc714ff0]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.smsCode>uni-input[data-v-fc714ff0]{width:%?401?%}.code[data-v-fc714ff0]{color:#1c75ff;font-size:%?26?%;display:inline-block;margin:0 %?20?%}.registerBtn[data-v-fc714ff0]{margin-top:%?20?%;padding:%?10?% 0}.registerBtn>uni-button[data-v-fc714ff0]{width:100%;padding:%?40?% 0;font-size:%?30?%;background:-webkit-gradient(linear,left top,right top,from(#1c75ff),color-stop(10%,#1c75ff),color-stop(80%,#5799ff),to(#5799ff));background:-o-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);background:linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 80%,#5799ff);background:-ms-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);background:-webkit-linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 80%,#5799ff);background:-moz-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%)}\r\n/* 弹出层 */.pop[data-v-fc714ff0]{background:#fff;padding:%?50?% %?72?%;border-top-left-radius:%?35?%;border-top-right-radius:%?35?%}.popTitle[data-v-fc714ff0]{font-size:%?34?%;color:#111;text-align:center}.title[data-v-fc714ff0]{font-weight:600;color:#111;font-size:%?48?%;text-align:center;margin:%?19?% 0}.titleTip[data-v-fc714ff0]{font-size:%?30?%;color:#111;text-align:center;margin:%?7?% 0}.logoView[data-v-fc714ff0]{margin:%?40?% 0}.logoContent[data-v-fc714ff0]{width:%?170?%;height:%?170?%;margin:auto}.deliver[data-v-fc714ff0]{width:%?40?%;height:%?6?%;background-color:#3296fa;margin:%?70?% auto}.topHead[data-v-fc714ff0]{position:fixed;top:0;left:0;z-index:999;width:100%;padding:%?30?%;background:#fff;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.topText[data-v-fc714ff0]{color:#111;font-size:%?26?%;margin-left:%?25?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.topText>uni-text[data-v-fc714ff0]:first-of-type{font-size:%?36?%;display:block;margin-bottom:%?10?%}.detailTitle[data-v-fc714ff0]{border-top:%?2?% solid #e6e6e6;background:#fff;padding:%?20?% %?30?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.leftBox[data-v-fc714ff0]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:%?30?%;color:#111}.leftBox>uni-text[data-v-fc714ff0]:first-of-type{color:#666;font-size:%?40?%}.left[data-v-fc714ff0]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;margin-left:%?20?%}.left>uni-text[data-v-fc714ff0]:nth-of-type(2){font-size:%?22?%;color:#777}.rightImg[data-v-fc714ff0]{width:%?46?%;height:%?46?%;display:block;margin-top:%?10?%}.record[data-v-fc714ff0]{padding:%?39?% %?20?%}.tip[data-v-fc714ff0]{font-size:%?22?%;color:#666;text-align:center}.chatRrecord[data-v-fc714ff0]{background-color:#f3f6f7}.callTip[data-v-fc714ff0]{color:#666;font-size:%?22?%;text-align:center;padding:%?30?% 0}.chatRight[data-v-fc714ff0]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;margin:%?40?% 0;padding:0 %?30?%;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}.callHead[data-v-fc714ff0]{width:%?80?%;height:%?80?%;border-radius:%?80?%}.callHead>uni-image[data-v-fc714ff0]{width:%?80?%;height:%?80?%;border-radius:%?80?%}.chatContent[data-v-fc714ff0]{background-color:#fff;max-width:%?380?%;padding:%?22?% %?38?%;border-radius:%?20?%;display:-webkit-flex;display:-webkit-box;display:-ms-flexbox;display:flex;margin-right:%?40?%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;position:relative}.chatContent[data-v-fc714ff0]:after{content:"";position:absolute;left:100%;top:%?20?%;width:0;height:0;border:%?15?% solid;border-color:rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0) #fff}.chatContent>uni-text[data-v-fc714ff0],.chatContentLeft>uni-view>uni-text[data-v-fc714ff0]{color:#222;font-size:%?28?%;margin:0;padding:0}.chatLeft[data-v-fc714ff0]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;margin:%?40?% 0;padding:0 %?30?%;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start}.chatContentLeft[data-v-fc714ff0]{background-color:#fff;padding:%?22?% %?38?%;max-width:%?380?%;border-radius:%?20?%;display:-webkit-flex;display:-webkit-box;display:-ms-flexbox;display:flex;margin-left:%?40?%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;position:relative}.chatContentLeft[data-v-fc714ff0]:after{content:"";position:absolute;right:100%;top:%?20?%;width:0;height:0;border:%?20?% solid;border-color:rgba(0,0,0,0) #fff rgba(0,0,0,0) rgba(0,0,0,0)}.chatContentLeft>uni-view[data-v-fc714ff0]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.chatContentLeft>uni-view>uni-view>uni-image[data-v-fc714ff0]{width:%?30?%;height:%?30?%}.chatContentLeft>uni-view>uni-view[data-v-fc714ff0]{width:%?30?%;height:%?30?%;margin-left:%?10?%}.endInfo[data-v-fc714ff0]{text-align:center;padding-bottom:%?150?%}.endInfo>uni-text[data-v-fc714ff0]:first-of-type{color:#1c75ff;font-size:%?26?%}.endInfo>uni-text[data-v-fc714ff0]:nth-of-type(3){color:#8e8e8f;font-size:%?22?%;display:block;margin-top:%?20?%}.moxiaomi[data-v-fc714ff0]{font-size:%?26?%;color:#464747}.endDiv[data-v-fc714ff0]{border:%?1?% solid #dd514c;position:fixed;bottom:0;left:0}uni-button[data-v-fc714ff0]:after{border:none}.btnFoot[data-v-fc714ff0]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:%?28?% %?46?%;z-index:100}.btn[data-v-fc714ff0]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.shili[data-v-fc714ff0]{border:%?1?% solid #3296fa;background-color:#fff;width:%?309?%;height:%?72?%;border-radius:%?100?%;line-height:%?72?%;color:#1c75ff;margin:0 %?19?%}.kaitong[data-v-fc714ff0]{width:%?309?%;height:%?72?%;border-radius:%?100?%;line-height:%?72?%;color:#fff;margin:0 %?19?%;background:-webkit-gradient(linear,left top,right top,from(#1c75ff),color-stop(10%,#1c75ff),color-stop(80%,#5799ff),to(#5799ff));background:-o-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);background:linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 80%,#5799ff);background:-ms-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);background:-webkit-linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 80%,#5799ff);background:-moz-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);-webkit-box-shadow:%?1?% %?1?% %?5?% #1c75ff;box-shadow:%?1?% %?1?% %?5?% #1c75ff}body.?%PAGE?%[data-v-fc714ff0]{background:#f3f6f7}',""])},a9ab:function(t,e,i){"use strict";var n=i("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(i("f499")),a=n(i("89d8")),c=n(i("137e")),l=uni.createInnerAudioContext(),r={components:{uniPopup:c.default},data:function(){return{callData:{time:"67",type:"主动挂断，手机占线"},detailData:[{roleType:1,content:"喂，您好",audioStartTime:0,audioEndTime:0,isClick:!1},{roleType:2,content:"需要什么时候还呐",audioStartTime:0,audioEndTime:2040,isClick:!1},{roleType:1,content:"这个我也不太确定，我稍后给您回个电话。",audioStartTime:0,audioEndTime:0,isClick:!1},{roleType:2,content:"你借款已逾期了，赶紧处理",audioStartTime:8030,audioEndTime:11230,isClick:!1},{roleType:1,content:"您好，刚才没听清，请问你们这边是什么平台啊？",audioStartTime:0,audioEndTime:0,isClick:!1},{roleType:2,content:"哦，我这边是跨年贷的",audioStartTime:16520,audioEndTime:19190,isClick:!1},{roleType:1,content:"这次欠款具体多少钱呢？",audioStartTime:0,audioEndTime:0,isClick:!1},{roleType:2,content:"现在本金5000",audioStartTime:23890,audioEndTime:26440,isClick:!1},{roleType:1,content:"请问下最终还款日期是几号啊？",audioStartTime:0,audioEndTime:0,isClick:!1},{roleType:2,content:"昨天就已经到期了。",audioStartTime:32170,audioEndTime:34910,isClick:!1},{roleType:1,content:"账单可以分期么？能否宽限几天呢？",audioStartTime:0,audioEndTime:0,isClick:!1},{roleType:2,content:"今天已经逾期了。",audioStartTime:34910,audioEndTime:36930,isClick:!1},{roleType:1,content:"好的，那这边请问有别的事情吗？",audioStartTime:0,audioEndTime:0,isClick:!1},{roleType:2,content:"不能",audioStartTime:38030,audioEndTime:39740,isClick:!1},{roleType:1,content:"喂。在吗？",audioStartTime:0,audioEndTime:0,isClick:!1},{roleType:1,content:"喂，您能听到我的说话吗？",audioStartTime:0,audioEndTime:0,isClick:!1},{roleType:1,content:"喂，在吗？我这边听不见您的声音，先挂了，再见。",audioStartTime:0,audioEndTime:0,isClick:!1}],mobileCode:"获取验证码",time:60,mobileTip:"",inputValue:"",smsTip:"",mobile:"",smsCode:"",isDisable:!1,bindmobile:"",isCheck:!1,checked:"agree",recShow:!1,playIcon:!1,iconPlay:!1,currentTime:"00:00",durationTime:"00:00",current:0,loading:!1,paused:!0,seek:!1,duration:100,itemStart:"",recordId:"",totalCur:0,totalStart:0,totalPlay:!1,src:"",startTime:0,itemSrc:"",blackShow:!1}},onLoad:function(){this.initValidate()},methods:{playItemRecord:function(t,e,i){for(var n=uni.createInnerAudioContext(),a=0,c=0;c<this.detailData.length;c++)if(i===c)if(a=c,this.detailData[i].isClick=!this.detailData[i].isClick,this.$forceUpdate(),1==this.detailData[i].isClick){console.log(this.detailData[i].isClick),console.log("开始播放1");var l=this;n.src="https://byrobot-prod.oss-cn-hangzhou.aliyuncs.com/InboundRobotCommunicate/20191231/20191231N3mAbc0000881013_user.wav",console.log("开始播放2");var r=0;n.play(),n.onCanplay(function(){console.log("可以播放"),1!=r&&(n.seek(t/1e3),n.onSeeking(function(){}),n.onSeeked(function(){r=1;setInterval(function(){n.currentTime>=e/1e3&&(n.stop(),n.onStop(),l.paused=!0,l.detailData[a].isClick=!1,l.$forceUpdate())},100);n.onError(function(t){l.title=(0,o.default)(t)})}))}),n.onError(function(){console.log("播放失败")})}else console.log(this.detailData[i].isClick),n.pause(),n.onPause(function(){console.log("暂停")})},playRecord:function(){var t=this;this.playIcon=!this.playIcon;var e=this;if(this.totalPlay=!this.totalPlay,e.recShow=!0,e.totalPlay){this.current=0;var i=0;e=this;l.autoplay=!0,l.src="https://byrobot-prod.oss-cn-hangzhou.aliyuncs.com/InboundRobotCommunicate/20191231/20191231N3mAbc0000881013.wav",l.onTimeUpdate(function(){t.seek||(t.current=l.currentTime)}),l.onPlay(function(){t.duration=l.duration,t.paused=!1,t.loading=!1}),l.onCanplay(function(){1!=i&&(l.seek(e.startTime/1e3),l.onSeeked(function(){i=1}),l.onEnded(function(){console.log("自然播放结束"),e.playIcon=!1}))}),l.onPause(function(){t.paused=!0}),l.onEnded(function(){t.current=0,t.recShow=!1}),l.onSeeked(function(){t.seek=!1})}else l.pause(),l.onPause(function(){e.startTime=1e3*l.currentTime,console.log("播放展厅")})},userAgree:function(){uni.navigateTo({url:"../../../static/privacyAgreement/privacyAgreement"})},privacyAgree:function(){uni.navigateTo({url:"../../../static/userAgreement/userAgreement"})},back:function(){uni.navigateBack({})},initValidate:function(){var t={mobile:{required:!0,tel:!0},smsCode:{required:!0}},e={mobile:{required:"请输入手机号！"},smsCode:{required:"请输入验证码"}};this.WxValidate=new a.default(t,e)},getMobileCode:function(){if(this.bindmobile){if("获取验证码"==this.mobileCode){this.time=60,this.timer();var t=this.$encruption(this.bindmobile),e={mobile:this.bindmobile,elmobi:t};console.log(e),this.$request.url_request(SENDCODE,e,"POST",function(t){uni.showToast({title:"验证码发送成功",icon:"none",duration:1e3})},function(t){})}}else uni.showToast({title:"手机号不可为空",icon:"none",duration:1e3})},timer:function(){this.time>0?(this.time--,this.mobileCode="还剩"+this.time+"s",setTimeout(this.timer,1e3)):(this.time=0,this.mobileCode="获取验证码")},handleLogin:function(t){var e=this;this.isDisable=!0,setTimeout(function(){e.isDisable=!1,e.$forceUpdate()},1e3);var i=t.detail.value;if(!this.WxValidate.checkForm(i)){var n=this.WxValidate.errorList[0];return uni.showToast({title:"".concat(n.msg),icon:"none"}),!1}if(0==this.isCheck)uni.showToast({title:"请阅读隐私协议",icon:"none",duration:1200});else{this.$request.url_request(LOGIN,i,"POST",function(t){0==JSON.parse(t.data).code?uni.navigateTo({url:"../../Welcome/Welcome"}):JSON.parse(t.data).msg&&uni.showToast({title:JSON.parse(t.data).msg,icon:"none",duration:1e3})},function(t){})}},backtohome:function(){uni.navigateTo({url:"../bindMobile"})},open:function(){this.$refs.popup.open()},checkboxChange:function(t){this.isCheck=!this.isCheck}}};e.default=r},e75f:function(t,e,i){"use strict";i.r(e);var n=i("a9ab"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,function(){return n[t]})}(a);e["default"]=o.a}}]);