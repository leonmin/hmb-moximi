(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-Login-bindMobile"],{"01e1":function(n,t,e){"use strict";var i=e("1977"),a=e.n(i);a.a},1977:function(n,t,e){var i=e("369f");"string"===typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);var a=e("4f06").default;a("4a7ed9e9",i,!0,{sourceMap:!1,shadowMode:!1})},"2d86":function(n,t,e){"use strict";var i=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-view",[e("v-uni-view",{staticClass:"title"},[e("v-uni-text",[n._v("防骚扰 免漏接")])],1),e("v-uni-view",{staticClass:"titleTip"},[e("v-uni-text",[n._v("魔小秘AI助手帮你接电话")])],1),e("v-uni-view",{staticClass:"logoView"},[e("v-uni-view",{staticClass:"logoContent"},[e("v-uni-image",{staticStyle:{width:"170rpx",height:"170rpx"},attrs:{src:"../../static/loginIntroduce/moxiaomi@2x.png",mode:""}})],1)],1),n._l(n.loginData,function(t,i){return e("v-uni-view",{key:i},[e("v-uni-view",{staticClass:"deliver"}),e("v-uni-view",{staticClass:"contenItem"},[e("v-uni-view",[e("v-uni-text",[n._v(n._s(t.title))])],1),e("v-uni-view",[e("v-uni-text",[n._v(n._s(t.titleTip))])],1),e("v-uni-view",[e("v-uni-text",[n._v(n._s(t.text1))])],1),e("v-uni-view",[e("v-uni-text",[n._v(n._s(t.text2))])],1),e("v-uni-view",{staticClass:"iconGroup"},n._l(t.iconGroup,function(t,i){return e("v-uni-view",{key:i,staticClass:"groupItem"},[e("v-uni-image",{staticStyle:{width:"90rpx",height:"90rpx"},attrs:{src:t.img,mode:""}}),e("v-uni-text",[n._v(n._s(t.name))])],1)}),1)],1)],1)}),e("v-uni-view",{staticClass:"deliver"}),e("v-uni-view",{staticClass:"push"},[e("v-uni-view",{staticClass:"pushTitle"},[e("v-uni-text",[n._v("通话消息及时推送")]),e("v-uni-text",[n._v("接听内容转成文字，重要信息一目了然")]),e("v-uni-text",[n._v("（阿里云云盾处理，所有数据完全加密，保障数据安全）")])],1),e("v-uni-view",{staticClass:"pushImg"},[e("v-uni-image",{attrs:{src:"../../static/loginIntroduce/zuo@2x.png",mode:""}}),e("v-uni-image",{attrs:{src:"../../static/loginIntroduce/you@2x.png",mode:""}})],1)],1),e("v-uni-view",{staticStyle:{height:"120rpx"}}),e("v-uni-view",{staticClass:"bto-bar cu-bar foot btnFoot",staticStyle:{bottom:"0px",background:"#FFFFFF"}},[e("v-uni-view",{staticClass:"btn"},[e("v-uni-button",{staticClass:"kaitong",on:{click:function(t){t=n.$handleEvent(t),n.open(t)}}},[n._v("立即开通")])],1)],1),e("uni-popup",{ref:"popup",staticStyle:{"z-index":"999"},attrs:{type:"bottom"}},[e("v-uni-view",{staticClass:"pop"},[e("v-uni-view",{staticClass:"popTitle"},[e("v-uni-text",[n._v("魔小秘AI助理")])],1),e("v-uni-form",{on:{submit:function(t){t=n.$handleEvent(t),n.handleLogin(t)}}},[e("v-uni-view",{staticClass:"loginInput"},[e("v-uni-view",{staticClass:"loginInputItem"},[e("v-uni-view",{staticClass:"mobileInput"},[e("v-uni-input",{attrs:{type:"text",value:n.inputValue,name:"mobile",placeholder:"请输入绑定的手机号"},model:{value:n.bindmobile,callback:function(t){n.bindmobile=t},expression:"bindmobile"}})],1)],1),e("v-uni-view",{staticClass:"loginInputItem"},[e("v-uni-view",{staticClass:"smsCode"},[e("v-uni-input",{attrs:{type:"text",value:"",name:"smsCode",placeholder:"请输入验证码"},model:{value:n.smsCode,callback:function(t){n.smsCode=t},expression:"smsCode"}}),e("v-uni-text",{staticClass:"code",on:{click:function(t){t=n.$handleEvent(t),n.getMobileCode(t)}}},[n._v(n._s(n.mobileCode))])],1)],1)],1),e("v-uni-view",{staticClass:"check"},[e("v-uni-view",[e("v-uni-image",{staticStyle:{width:"32rpx",height:"32rpx"},attrs:{src:n.isCheck?"../../static/loginIntroduce/yixuanze@2x.png":"../../static/loginIntroduce/meigouxuan@2x.png",mode:""},on:{click:function(t){t=n.$handleEvent(t),n.checkboxChange(t)}}})],1),e("v-uni-view",[e("v-uni-text",{staticClass:"xieyi"},[n._v("点击立即注册表示同意"),e("v-uni-text",{staticStyle:{color:"#1C75FF"},on:{click:function(t){t=n.$handleEvent(t),n.userAgree(t)}}},[n._v("《用户协议》")]),n._v("&"),e("v-uni-text",{staticStyle:{color:"#1C75FF"},on:{click:function(t){t=n.$handleEvent(t),n.privacyAgree(t)}}},[n._v("《隐私协议》")])],1)],1)],1),e("v-uni-view",{staticClass:"registerBtn  btn-group"},[e("v-uni-button",{staticClass:"cu-btn bg-blue shadow-blur round",attrs:{formType:"submit",disabled:n.isDisable}},[n._v("立即登录")])],1)],1)],1)],1)],2)},a=[];e.d(t,"a",function(){return i}),e.d(t,"b",function(){return a})},"369f":function(n,t,e){t=n.exports=e("2350")(!1),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* 绑定手机表单 */.check[data-v-41d8d220]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row\n\t/* align-items: center; */}.xieyi[data-v-41d8d220]{color:#999;font-size:%?26?%;margin-left:%?17?%;display:block\n\t/* margin-top: -2rpx; */}.loginInputItem[data-v-41d8d220]{margin:%?29?% 0;overflow:hidden}.inputTip[data-v-41d8d220]{color:red;font-size:%?20?%;display:block;margin-top:%?5?%}.mobileInput>uni-input[data-v-41d8d220]{width:100%}.loginInput uni-input[data-v-41d8d220]{outline:none;border-radius:%?10?%;border:1px solid #1c75ff;height:%?78?%;padding:%?10?% %?36?%}.smsCode[data-v-41d8d220]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.smsCode>uni-input[data-v-41d8d220]{width:%?401?%}.code[data-v-41d8d220]{color:#1c75ff;font-size:%?26?%;display:inline-block;margin:0 %?20?%}.registerBtn[data-v-41d8d220]{margin-top:%?20?%;padding:%?10?% 0}.registerBtn>uni-button[data-v-41d8d220]{width:100%;padding:%?40?% 0;font-size:%?30?%;background:-webkit-gradient(linear,left top,right top,from(#1c75ff),color-stop(10%,#1c75ff),color-stop(80%,#5799ff),to(#5799ff));background:-o-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);background:linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 80%,#5799ff);background:-ms-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);background:-webkit-linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 80%,#5799ff);background:-moz-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%)}\n/* 弹出层 */.pop[data-v-41d8d220]{background:#fff;padding:%?50?% %?72?%;border-top-left-radius:%?35?%;border-top-right-radius:%?35?%}.popTitle[data-v-41d8d220]{font-size:%?34?%;color:#111;text-align:center}.title[data-v-41d8d220]{font-weight:600;color:#111;font-size:%?48?%;text-align:center;margin:%?19?% 0}.titleTip[data-v-41d8d220]{font-size:%?30?%;color:#111;text-align:center;margin:%?7?% 0}.logoView[data-v-41d8d220]{margin:%?40?% 0}.logoContent[data-v-41d8d220]{width:%?170?%;height:%?170?%;margin:auto}.deliver[data-v-41d8d220]{width:%?40?%;height:%?6?%;background-color:#3296fa;margin:%?70?% auto}\n/* 场景 */.contenItem[data-v-41d8d220]{color:#111;text-align:center}.contenItem>uni-view[data-v-41d8d220]:first-of-type{font-size:%?54?%;font-weight:600}.contenItem>uni-view[data-v-41d8d220]:nth-of-type(2){font-size:%?34?%;font-weight:600;margin:%?20?% 0 %?28?% 0}.contenItem>uni-view[data-v-41d8d220]:nth-of-type(3),.contenItem>uni-view[data-v-41d8d220]:nth-of-type(4){font-size:%?30?%}.contenItem>uni-view[data-v-41d8d220]:nth-of-type(4){margin-top:%?10?%}.iconGroup[data-v-41d8d220]{width:%?550?%;margin:%?30?% auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.groupItem[data-v-41d8d220]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center\n\t/* margin: 0 35rpx; */}\n/* 推送示例 */.pushTitle[data-v-41d8d220]{text-align:center;color:#111;font-size:%?28?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;line-height:%?48?%}.pushTitle>uni-text[data-v-41d8d220]:first-of-type{font-weight:600;font-size:%?38?%;display:inline-block;margin-bottom:%?20?%}.pushImg[data-v-41d8d220]{padding:%?48?% 0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.pushImg>uni-image[data-v-41d8d220]{border-right:%?1?% solid #b6cef7;border-radius:%?5?%;width:%?339?%;height:%?466?%;margin:0 %?10?%}uni-button[data-v-41d8d220]:after{border:none}.btnFoot[data-v-41d8d220]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:%?28?% %?46?%;z-index:100}.btn[data-v-41d8d220]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.shili[data-v-41d8d220]{border:%?1?% solid #3296fa;background-color:#fff;width:%?309?%;height:%?72?%;border-radius:%?100?%;line-height:%?72?%;color:#1c75ff;margin:0 %?19?%}.kaitong[data-v-41d8d220]{width:100%;height:%?72?%;border-radius:%?100?%;line-height:%?72?%;color:#fff;margin:0 %?19?%;background:-webkit-gradient(linear,left top,right top,from(#1c75ff),color-stop(10%,#1c75ff),color-stop(80%,#5799ff),to(#5799ff));background:-o-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);background:linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 80%,#5799ff);background:-ms-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);background:-webkit-linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 80%,#5799ff);background:-moz-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);-webkit-box-shadow:%?1?% %?1?% %?5?% #1c75ff;box-shadow:%?1?% %?1?% %?5?% #1c75ff}",""])},"5c82":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CARDPACKDETAILS=t.CARDPACK=t.PARTNERCASHLIST=t.PARTNERINVITELIST=t.PARTNERCASHOUT=t.PARTNERBIND=t.PARTNERINVITEDATA=t.PARTNERCASH=t.PARTNERINFO=t.EXCHANGECARD=t.SHARECARD=t.FEEDBACK=t.UPLOADFILE=t.GETNUMINFO=t.SUBSCRIBEINFO=t.INVITELIST=t.INVITEDATA=t.JSAPI=t.APPLYCASHOUT=t.MYCASHLIST=t.CASHLIST=t.MYCASH=t.MYINFO=t.GOODSLIST=t.BEFORODER=t.CREATEORDER=t.ADDBLACKLIST=t.COUPONLIST=t.BANNER=t.DELCALL=t.AUDITION=t.CANCELPROLPGUE=t.GETPROLPGUE=t.TEXTPROLOGUE=t.VOICEPROLOGUE=t.DELCONTACT=t.ADDCONTACT=t.CONTACTDETAIL=t.CONTACTLIST=t.CALLRECORDDETAILS=t.INDEXCOUPON=t.SHOWINDEXTIP=t.SETTINGURL=t.CALLRECORDLIST=t.CALLRECORDLISTTODAY=t.SENDCODE=t.LOGIN=t.TEST=void 0;var i="",a=i+"/getWangYiNews";t.TEST=a;var o=i+"/app/bindMobile";t.LOGIN=o;var r=i+"/app/sendVerifyCode";t.SENDCODE=r;var c=i+"/app/chat/callRecordListToday";t.CALLRECORDLISTTODAY=c;var l=i+"/app/chat/callRecordList";t.CALLRECORDLIST=l;var s=i+"/app/chat/getSettingPageUrl";t.SETTINGURL=s;var d=i+"/app/index/showIndexTips";t.SHOWINDEXTIP=d;var u=i+"/app/index/getCoupon";t.INDEXCOUPON=u;var f=i+"/app/chat/callRecordDetails";t.CALLRECORDDETAILS=f;var p=i+"/app/contact/list";t.CONTACTLIST=p;var v=i+"/app/contact/detail";t.CONTACTDETAIL=v;var b=i+"/app/contact/create";t.ADDCONTACT=b;var g=i+"/app/contact/delete";t.DELCONTACT=g;var m=i+"/app/chat/setVoicePrologue";t.VOICEPROLOGUE=m;var x=i+"/app/chat/setTextPrologue";t.TEXTPROLOGUE=x;var h=i+"/app/chat/getPrologue";t.GETPROLPGUE=h;var w=i+"/app/chat/cancelPrologue";t.CANCELPROLPGUE=w;var C=i+"/app/chat/audition";t.AUDITION=C;var k=i+"/app/chat/delCallRecord";t.DELCALL=k;var T=i+"/app/banner";t.BANNER=T;var I=i+"/app/chat/couponList";t.COUPONLIST=I;var A=i+"/app/blacklist/add";t.ADDBLACKLIST=A;var E=i+"/app/order/createOrder";t.CREATEORDER=E;var y=i+"/app/order/beforeOrder";t.BEFORODER=y;var L=i+"/app/order/goodsCardList";t.GOODSLIST=L;var O=i+"/app/chat/myInfo";t.MYINFO=O;var R=i+"/app/chat/myCash";t.MYCASH=R;var S=i+"/app/chat/cashList";t.CASHLIST=S;var N=i+"/app/chat/myCashList";t.MYCASHLIST=N;var D=i+"/app/chat/applyCashOut";t.APPLYCASHOUT=D;var P=i+"/app/chat/jsapiParams";t.JSAPI=P;var _=i+"/app/chat/myInviteData";t.INVITEDATA=_;var U=i+"/app/chat/inviteUserList";t.INVITELIST=U;var F=i+"/app/chat/subscribeInfo";t.SUBSCRIBEINFO=F;var G=i+"/app/chat/getNumberInfo";t.GETNUMINFO=G;var z=i+"/app/uploadFile";t.UPLOADFILE=z;var j=i+"/app/chat/feedback";t.FEEDBACK=j;var V=i+"/app/order/shareGetWeekCard";t.SHARECARD=V;var H=i+"/app/order/submitExchangeCard";t.EXCHANGECARD=H;var M=i+"/app/chat/myPartnerInfo";t.PARTNERINFO=M;var B=i+"/app/chat/myPartnerCash";t.PARTNERCASH=B;var $=i+"/app/chat/myPartnerInviteData";t.PARTNERINVITEDATA=$;var Y=i+"/app/bindPartnerMobile";t.PARTNERBIND=Y;var J=i+"/app/chat/partnerApplyCashOut";t.PARTNERCASHOUT=J;var W=i+"/app/chat/partnerInviteUserList";t.PARTNERINVITELIST=W;var q=i+"/app/chat/partnerCashList";t.PARTNERCASHLIST=q;var K=i+"/app/chat/cardPack";t.CARDPACK=K;var X=i+"/app/chat/cardPackDetails";t.CARDPACKDETAILS=X},"7a94":function(n,t,e){"use strict";e.r(t);var i=e("adcb"),a=e.n(i);for(var o in i)"default"!==o&&function(n){e.d(t,n,function(){return i[n]})}(o);t["default"]=a.a},"7fcd":function(n,t,e){"use strict";e.r(t);var i=e("2d86"),a=e("7a94");for(var o in a)"default"!==o&&function(n){e.d(t,n,function(){return a[n]})}(o);e("01e1");var r=e("2877"),c=Object(r["a"])(a["default"],i["a"],i["b"],!1,null,"41d8d220",null);t["default"]=c.exports},adcb:function(n,t,e){"use strict";var i=e("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,e("4917"),e("3b2b"),e("28a5"),e("386d");var a,o=i(e("89d8")),r=i(e("137e")),c=e("5c82"),l={components:{uniPopup:r.default},data:function(){return{loginData:[{title:"50+",titleTip:"场景",text1:"陌生电话放心挂断",text2:"大数据识别，骚扰电话无处遁形",iconGroup:[{img:"../../static/loginIntroduce/baoxiantuixiao@2x.png",name:"保险推销"},{img:"../../static/loginIntroduce/fangchan@2x.png",name:"房产中介"},{img:"../../static/loginIntroduce/licai@2x.png",name:"贷款理财"},{img:"../../static/loginIntroduce/cuishou@2x.png",name:"催收骚扰"}]},{title:"20+",titleTip:"情景",text1:"生活服务电话智能代接",text2:"“放门口”、“放快递柜”、“定位准确”",iconGroup:[{img:"../../static/loginIntroduce/waimai@2x.png",name:"外卖"},{img:"../../static/loginIntroduce/kuaidi@2x.png",name:"快递"},{img:"../../static/loginIntroduce/dache@2x.png",name:"打车"}]},{title:"40+",titleTip:"行业",text1:"飞行模式/无服务也不漏接",text2:"安心放心，重要来电不错过、不遗漏",iconGroup:[{img:"../../static/loginIntroduce/kaihui@2x.png",name:"开会"},{img:"../../static/loginIntroduce/xiuxi@2x.png",name:"休息"},{img:"../../static/loginIntroduce/guanji@2x.png",name:"关机"}]}],mobileCode:"获取验证码",time:60,mobileTip:"",inputValue:"",smsTip:"",mobile:"",smsCode:"",isDisable:!1,bindmobile:"",isCheck:!1,checked:"agree"}},onLoad:function(){this.initValidate(),this.getUrlToken()},methods:{userAgree:function(){uni.navigateTo({url:"../../static/privacyAgreement/privacyAgreement"})},privacyAgree:function(){uni.navigateTo({url:"../../static/userAgreement/userAgreement"})},getQueryString:function(n){var t=window.location.search;if(t.indexOf("?"),t=window.location.href.split("?")[1]||t.substr(1),t){var e=new RegExp("(^|&)"+n+"=([^&]*)(&|$)"),i=t.match(e);return null!==i?decodeURIComponent(i[2]):null}},getUrlToken:function(){if(a=this.getQueryString("token"),console.log("绑定手机中的token",a),a||(a=uni.getStorageSync("myToken"),console.log("locattion",a)),a)try{uni.setStorageSync("myToken",a)}catch(n){uni.showModal({content:n,showCancel:!1})}else console.log("路径和storage的token都为空"),uni.navigateTo({url:"../JumpLogin/JumpLogin"})},initValidate:function(){var n={mobile:{required:!0,tel:!0},smsCode:{required:!0}},t={mobile:{required:"请输入手机号！"},smsCode:{required:"请输入验证码"}};this.WxValidate=new o.default(n,t)},getMobileCode:function(){if(this.bindmobile){if("获取验证码"==this.mobileCode){this.time=60,this.timer();var n={mobile:this.bindmobile};console.log(this.bindmobile),this.$request.url_request(c.SENDCODE,n,"POST",function(n){uni.showToast({title:"验证码发送成功",icon:"none",duration:1e3})},function(n){})}}else uni.showToast({title:"手机号不可为空",icon:"none",duration:1e3})},timer:function(){this.time>0?(this.time--,this.mobileCode="还剩"+this.time+"s",setTimeout(this.timer,1e3)):(this.time=0,this.mobileCode="获取验证码")},handleLogin:function(n){var t=this;this.isDisable=!0,setTimeout(function(){t.isDisable=!1,t.$forceUpdate()},1e3);var e=n.detail.value;if(!this.WxValidate.checkForm(e)){var i=this.WxValidate.errorList[0];return uni.showToast({title:"".concat(i.msg),icon:"none"}),!1}if(0==this.isCheck)uni.showToast({title:"请阅读隐私协议",icon:"none",duration:1200});else{this.$request.url_request(c.LOGIN,e,"POST",function(n){0==JSON.parse(n.data).code?uni.navigateTo({url:"../Welcome/Welcome"}):JSON.parse(n.data).msg&&uni.showToast({title:JSON.parse(n.data).msg,icon:"none",duration:1e3})},function(n){})}},tonghuashili:function(){uni.navigateTo({url:"callList/callList"})},open:function(){this.$refs.popup.open()},checkboxChange:function(n){this.isCheck=!this.isCheck}}};t.default=l}}]);