(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-Login-Invite-InviteNewUser"],{"1aa9":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"login"},[a("v-uni-view",{staticClass:"topImage"},[a("v-uni-image",{attrs:{src:"../../../static/login/getNewUser/bj@2x.jpg",mode:""}}),a("v-uni-view",{staticClass:"topText"})],1),a("v-uni-view",{staticClass:"register"},[a("v-uni-view",{staticClass:"title"},[a("v-uni-text",[e._v("魔小秘—您的智能AI秘书为您开启没有骚扰和烦恼的智慧生活")])],1),a("v-uni-form",{on:{submit:function(t){t=e.$handleEvent(t),e.handleLogin(t)}}},[a("v-uni-view",{staticClass:"loginInput"},[a("v-uni-view",{staticClass:"loginInputItem"},[a("v-uni-view",{staticClass:"mobileInput"},[a("v-uni-input",{attrs:{type:"text",value:e.inputValue,name:"mobile",placeholder:"请输入绑定的手机号"},on:{blur:function(t){t=e.$handleEvent(t),e.pickupKeyboard(t)}},model:{value:e.bindmobile,callback:function(t){e.bindmobile=t},expression:"bindmobile"}})],1)],1),a("v-uni-view",{staticClass:"loginInputItem"},[a("v-uni-view",{staticClass:"smsCode"},[a("v-uni-input",{attrs:{type:"text",value:"",name:"smsCode",placeholder:"请输入验证码"},on:{blur:function(t){t=e.$handleEvent(t),e.pickupKeyboard(t)}},model:{value:e.smsCode,callback:function(t){e.smsCode=t},expression:"smsCode"}}),a("v-uni-text",{staticClass:"code",on:{click:function(t){t=e.$handleEvent(t),e.getMobileCode(t)}}},[e._v(e._s(e.mobileCode))])],1)],1)],1),a("v-uni-view",{staticClass:"registerBtn  btn-group"},[a("v-uni-button",{staticClass:"cu-btn bg-blue shadow-blur round",attrs:{formType:"submit",disabled:e.isDisable}},[e._v("领取福利")])],1)],1)],1)],1)},n=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return n})},3125:function(e,t,a){"use strict";a.r(t);var i=a("6c41"),n=a.n(i);for(var r in i)"default"!==r&&function(e){a.d(t,e,function(){return i[e]})}(r);t["default"]=n.a},"3bee":function(e,t,a){"use strict";var i=a("57b6"),n=a.n(i);n.a},"51b0":function(e,t,a){"use strict";a.r(t);var i=a("1aa9"),n=a("3125");for(var r in n)"default"!==r&&function(e){a.d(t,e,function(){return n[e]})}(r);a("3bee");var o=a("2877"),s=Object(o["a"])(n["default"],i["a"],i["b"],!1,null,"5cc1a8be",null);t["default"]=s.exports},"57b6":function(e,t,a){var i=a("ff77");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("f95090bc",i,!0,{sourceMap:!1,shadowMode:!1})},"5c82":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SCENCESET=t.SETVOICEPROLOGUE=t.SCENEUSERPOST=t.SCENEREFUSEUPDATE=t.SCENEREFUSE=t.SCENELIST=t.SCENESTATUS=t.REFUSECALLSET=t.REFUSECALL=t.BLACKDELETE=t.BLACKADD=t.BLACKLIST=t.PROLOGUEDELETE=t.SETTEXTPROLOGUE=t.PROLOGUEGET=t.PROLOGUESET=t.PROLOGUECURRENT=t.PROLOGUELIST=t.TTSCONVERT=t.TTSSCENE=t.TTSUPDATE=t.TTSPLAID=t.TRANSFERCONFIG=t.CARDPACKDETAILS=t.CARDPACK=t.PARTNERCASHLIST=t.PARTNERINVITELIST=t.PARTNERCASHOUT=t.PARTNERBIND=t.PARTNERINVITEDATA=t.PARTNERCASH=t.PARTNERINFO=t.EXCHANGECARD=t.SHARECARD=t.FEEDBACK=t.UPLOADFILE=t.GETNUMINFO=t.SUBSCRIBEINFO=t.INVITELIST=t.INVITEDATA=t.JSAPI=t.APPLYCASHOUT=t.MYCASHLIST=t.CASHLIST=t.MYCASH=t.MYINFO=t.GOODSLIST=t.BEFORODER=t.CREATEORDER=t.ADDBLACKLIST=t.COUPONLIST=t.BANNER=t.DELCALL=t.AUDITION=t.CANCELPROLPGUE=t.GETPROLPGUE=t.TEXTPROLOGUE=t.VOICEPROLOGUE=t.DELCONTACT=t.ADDCONTACT=t.CONTACTDETAIL=t.CONTACTLIST=t.CALLRECORDDETAILS=t.INDEXCOUPON=t.SHOWINDEXTIP=t.SETTINGURL=t.CALLRECORDLIST=t.CALLRECORDLISTTODAY=t.SENDCODE=t.LOGIN=t.TEST=void 0;var i="",n=i+"/getWangYiNews";t.TEST=n;var r=i+"/app/bindMobile";t.LOGIN=r;var o=i+"/app/sendVerifyCode";t.SENDCODE=o;var s=i+"/app/chat/callRecordListToday";t.CALLRECORDLISTTODAY=s;var c=i+"/app/chat/callRecordList";t.CALLRECORDLIST=c;var l=i+"/app/chat/getSettingPageUrl";t.SETTINGURL=l;var u=i+"/app/index/showIndexTips";t.SHOWINDEXTIP=u;var p=i+"/app/index/getCoupon";t.INDEXCOUPON=p;var d=i+"/app/chat/callRecordDetails";t.CALLRECORDDETAILS=d;var E=i+"/app/contact/list";t.CONTACTLIST=E;var T=i+"/app/contact/detail";t.CONTACTDETAIL=T;var f=i+"/app/contact/create";t.ADDCONTACT=f;var b=i+"/app/contact/delete";t.DELCONTACT=b;var v=i+"/app/chat/setVoicePrologue";t.VOICEPROLOGUE=v;var C=i+"/app/chat/setTextPrologue";t.TEXTPROLOGUE=C;var g=i+"/app/chat/getPrologue";t.GETPROLPGUE=g;var S=i+"/app/chat/cancelPrologue";t.CANCELPROLPGUE=S;var L=i+"/app/chat/audition";t.AUDITION=L;var A=i+"/app/chat/delCallRecord";t.DELCALL=A;var O=i+"/app/banner";t.BANNER=O;var I=i+"/app/chat/couponList";t.COUPONLIST=I;var R=i+"/app/blacklist/add";t.ADDBLACKLIST=R;var m=i+"/app/order/createOrder";t.CREATEORDER=m;var h=i+"/app/order/beforeOrder";t.BEFORODER=h;var N=i+"/app/order/goodsCardList";t.GOODSLIST=N;var P=i+"/app/chat/myInfo";t.MYINFO=P;var D=i+"/app/chat/myCash";t.MYCASH=D;var U=i+"/app/chat/cashList";t.CASHLIST=U;var y=i+"/app/chat/myCashList";t.MYCASHLIST=y;var w=i+"/app/chat/applyCashOut";t.APPLYCASHOUT=w;var x=i+"/app/chat/jsapiParams";t.JSAPI=x;var k=i+"/app/chat/myInviteData";t.INVITEDATA=k;var G=i+"/app/chat/inviteUserList";t.INVITELIST=G;var F=i+"/app/chat/subscribeInfo";t.SUBSCRIBEINFO=F;var V=i+"/app/chat/getNumberInfo";t.GETNUMINFO=V;var B=i+"/app/uploadFile";t.UPLOADFILE=B;var H=i+"/app/chat/feedback";t.FEEDBACK=H;var K=i+"/app/order/shareGetWeekCard";t.SHARECARD=K;var M=i+"/app/order/submitExchangeCard";t.EXCHANGECARD=M;var _=i+"/app/chat/myPartnerInfo";t.PARTNERINFO=_;var j=i+"/app/chat/myPartnerCash";t.PARTNERCASH=j;var Y=i+"/app/chat/myPartnerInviteData";t.PARTNERINVITEDATA=Y;var X=i+"/app/bindPartnerMobile";t.PARTNERBIND=X;var J=i+"/app/chat/partnerApplyCashOut";t.PARTNERCASHOUT=J;var W=i+"/app/chat/partnerInviteUserList";t.PARTNERINVITELIST=W;var $=i+"/app/chat/partnerCashList";t.PARTNERCASHLIST=$;var q=i+"/app/chat/cardPack";t.CARDPACK=q;var z=i+"/app/chat/cardPackDetails";t.CARDPACKDETAILS=z;var Q=i+"/user/bysetting/transferConfig";t.TRANSFERCONFIG=Q;var Z=i+"/user/bysetting/ttsPlaid";t.TTSPLAID=Z;var ee=i+"/user/bysetting/ttsUpdate";t.TTSUPDATE=ee;var te=i+"/user/bysetting/ttsScene";t.TTSSCENE=te;var ae=i+"/user/bysetting/ttsConvert";t.TTSCONVERT=ae;var ie=i+"/user/bysetting/prologueList";t.PROLOGUELIST=ie;var ne=i+"/user/bysetting/prologueCurrent";t.PROLOGUECURRENT=ne;var re=i+"/user/bysetting/prologueSet";t.PROLOGUESET=re;var oe=i+"/user/bysetting/prologueGet";t.PROLOGUEGET=oe;var se=i+"/user/bysetting/setTextPrologue";t.SETTEXTPROLOGUE=se;var ce=i+"/user/bysetting/prologueDelete";t.PROLOGUEDELETE=ce;var le=i+"/user/bysetting/blackList";t.BLACKLIST=le;var ue=i+"/user/bysetting/blackAdd";t.BLACKADD=ue;var pe=i+"/user/bysetting/blackDetele";t.BLACKDELETE=pe;var de=i+"/user/bysetting/refuseCall";t.REFUSECALL=de;var Ee=i+"/user/bysetting/refuseCallSet";t.REFUSECALLSET=Ee;var Te=i+"/user/bysetting/sceneStatus";t.SCENESTATUS=Te;var fe=i+"/user/bysetting/scenelist";t.SCENELIST=fe;var be=i+"/user/bysetting/sceneRefuse";t.SCENEREFUSE=be;var ve=i+"/user/bysetting/sceneRefuseUpdate";t.SCENEREFUSEUPDATE=ve;var Ce=i+"/user/bysetting/sceneUserPost";t.SCENEUSERPOST=Ce;var ge=i+"/user/bysetting/setVoicePrologue";t.SETVOICEPROLOGUE=ge;var Se=i+"/user/bysetting/sceneSet";t.SCENCESET=Se},"6c41":function(e,t,a){"use strict";var i=a("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("4917"),a("3b2b"),a("28a5"),a("386d");var n,r=i(a("89d8")),o=a("5c82"),s={data:function(){return{mobileCode:"获取验证码",time:60,mobileTip:"",inputValue:"",smsTip:"",mobile:"",smsCode:"",isDisable:!1,bindmobile:""}},onLoad:function(){this.initValidate(),this.getUrlToken()},methods:{initValidate:function(){var e={mobile:{required:!0,tel:!0},smsCode:{required:!0}},t={mobile:{required:"请输入手机号！"},smsCode:{required:"请输入验证码"}};this.WxValidate=new r.default(e,t)},getMobileCode:function(){if(this.bindmobile){if("获取验证码"==this.mobileCode){this.time=60,this.timer();var e={mobile:this.bindmobile};console.log(this.bindmobile),this.$request.url_request(o.SENDCODE,e,"POST",function(e){uni.showToast({title:"验证码发送成功",icon:"none",duration:1e3})},function(e){})}}else uni.showToast({title:"手机号不可为空",icon:"none",duration:1e3})},timer:function(){this.time>0?(this.time--,this.mobileCode="还剩"+this.time+"s",setTimeout(this.timer,1e3)):(this.time=0,this.mobileCode="获取验证码")},handleLogin:function(e){var t=this;this.isDisable=!0,setTimeout(function(){t.isDisable=!1,t.$forceUpdate()},1e3);var a=e.detail.value;if(!this.WxValidate.checkForm(a)){var i=this.WxValidate.errorList[0];return uni.showToast({title:"".concat(i.msg),icon:"none"}),!1}this.$request.url_request(o.LOGIN,a,"POST",function(e){0==JSON.parse(e.data).code?uni.navigateTo({url:"../../Welcome/Welcome"}):JSON.parse(e.data).msg&&uni.showToast({title:JSON.parse(e.data).msg,icon:"none",duration:1e3})},function(e){})},getQueryString:function(e){var t=window.location.search;if(t.indexOf("?"),t=window.location.href.split("?")[1]||t.substr(1),t){var a=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),i=t.match(a);return null!==i?decodeURIComponent(i[2]):null}},getUrlToken:function(){if(n=this.getQueryString("token"),n)try{uni.setStorageSync("myToken",n)}catch(e){uni.showModal({content:e,showCancel:!1})}else uni.navigateTo({url:"../../JumpLogin/JumpLogin"})},pickupKeyboard:function(){uni.pageScrollTo({scrollTop:0,duration:0})}}};t.default=s},ff77:function(e,t,a){t=e.exports=a("2350")(!1),t.push([e.i,"uni-page-body[data-v-5cc1a8be]{background-color:#fff}.topImage[data-v-5cc1a8be]{position:relative}.topImage>uni-image[data-v-5cc1a8be]{width:%?750?%;height:%?727?%}.topText[data-v-5cc1a8be]{position:absolute;top:%?100?%;left:0}.topTextItem[data-v-5cc1a8be]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;margin:%?50?% %?30?%}.topTextItem>uni-image[data-v-5cc1a8be]{width:%?15?%;height:%?15?%}.topFontLar[data-v-5cc1a8be]{color:#fff;font-size:%?36?%;font-weight:700;margin-left:%?20?%}.fontThin[data-v-5cc1a8be]{color:#fefefe;font-size:%?26?%;margin:0 %?30?%}.register[data-v-5cc1a8be]{margin:%?20?% %?107?% %?50?% %?107?%}.register .title[data-v-5cc1a8be]{color:#111;font-size:%?26?%;margin-top:%?30?%;letter-spacing:%?3?%;margin-bottom:%?28?%}\n/* 绑定手机表单 */.loginInputItem[data-v-5cc1a8be]{margin:%?29?% 0;overflow:hidden}.inputTip[data-v-5cc1a8be]{color:red;font-size:%?20?%;display:block;margin-top:%?5?%}.mobileInput>uni-input[data-v-5cc1a8be]{width:%?538?%}.loginInput uni-input[data-v-5cc1a8be]{outline:none;border-radius:%?10?%;border:1px solid #1c75ff;height:%?78?%;padding:%?10?% %?36?%}.loginInput>uni-view[data-v-5cc1a8be]{\n\t/* \t\tdisplay: flex;\n\tflex-direction: row;\n\talign-items: center;\n\tjustify-content: space-between; */}.smsCode[data-v-5cc1a8be]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.smsCode>uni-input[data-v-5cc1a8be]{width:%?381?%}.code[data-v-5cc1a8be]{color:#1c75ff;font-size:%?26?%;display:inline-block}.registerBtn[data-v-5cc1a8be]{margin-top:%?20?%;padding:%?30?% 0}.registerBtn>uni-button[data-v-5cc1a8be]{width:100%;padding:%?40?% 0;font-size:%?30?%;background:-webkit-gradient(linear,left top,right top,from(#1c75ff),color-stop(10%,#1c75ff),color-stop(80%,#5799ff),to(#5799ff));background:-o-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);background:linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 80%,#5799ff);background:-ms-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);background:-webkit-linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 80%,#5799ff);background:-moz-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%)}body.?%PAGE?%[data-v-5cc1a8be]{background-color:#fff}",""])}}]);