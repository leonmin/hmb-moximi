(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-partner-partnerInviteNew-partnerInviteNew"],{"08e6":function(e,t,a){var i=a("bc2b");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("61143908",i,!0,{sourceMap:!1,shadowMode:!1})},"14a7":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"partner"},[a("v-uni-view",{staticClass:"topHead"},[a("v-uni-view",{staticClass:"Boxtitle"},[a("v-uni-text",[e._v("邀您使用")]),a("v-uni-view",[a("v-uni-text",[e._v("-魔小秘-")])],1)],1),a("v-uni-view",{staticClass:"register"},[a("v-uni-view",{staticClass:"title"},[a("v-uni-text",[e._v("立即使用，开启人工智能时代")])],1),a("v-uni-form",{on:{submit:function(t){t=e.$handleEvent(t),e.handleLogin(t)}}},[a("v-uni-view",{staticClass:"loginInput"},[a("v-uni-view",{staticClass:"loginInputItem"},[a("v-uni-view",{staticClass:"mobileInput"},[a("v-uni-input",{attrs:{type:"text",value:e.inputValue,name:"mobile",placeholder:"请输入绑定的手机号"},on:{blur:function(t){t=e.$handleEvent(t),e.pickupKeyboard(t)}},model:{value:e.bindmobile,callback:function(t){e.bindmobile=t},expression:"bindmobile"}})],1)],1),a("v-uni-view",{staticClass:"loginInputItem"},[a("v-uni-view",{staticClass:"smsCode"},[a("v-uni-input",{attrs:{type:"text",value:"",name:"smsCode",placeholder:"请输入验证码"},on:{blur:function(t){t=e.$handleEvent(t),e.pickupKeyboard(t)}},model:{value:e.smsCode,callback:function(t){e.smsCode=t},expression:"smsCode"}}),a("v-uni-text",{staticClass:"code",on:{click:function(t){t=e.$handleEvent(t),e.getMobileCode(t)}}},[e._v(e._s(e.mobileCode))])],1)],1)],1),a("v-uni-view",{staticClass:"registerBtn  btn-group"},[a("v-uni-button",{staticClass:"cu-btn bg-blue shadow-blur round",attrs:{formType:"submit",disabled:e.isDisable}},[e._v("立即绑定")])],1)],1)],1)],1)],1)},n=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return n})},"39b5":function(e,t,a){"use strict";var i=a("08e6"),n=a.n(i);n.a},"49e1":function(e,t,a){"use strict";a.r(t);var i=a("ce72"),n=a.n(i);for(var r in i)"default"!==r&&function(e){a.d(t,e,function(){return i[e]})}(r);t["default"]=n.a},"5c82":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PUSHCLICK=t.GREENCREATEORDER=t.GREENCARDLIST=t.TASKINFO=t.SCENCESET=t.SETVOICEPROLOGUE=t.SCENEUSERPOST=t.SCENEREFUSEUPDATE=t.SCENEREFUSE=t.SCENELIST=t.SCENESTATUS=t.REFUSECALLSET=t.REFUSECALL=t.BLACKDELETE=t.BLACKADD=t.BLACKLIST=t.PROLOGUEDELETE=t.SETTEXTPROLOGUE=t.PROLOGUEGET=t.PROLOGUESET=t.PROLOGUECURRENT=t.PROLOGUELIST=t.TTSCONVERT=t.TTSSCENE=t.TTSUPDATE=t.TTSPLAID=t.TRANSFERCONFIG=t.QRCODE=t.CARDPACKDETAILS=t.CARDPACK=t.PARTNERCASHLIST=t.PARTNERINVITELIST=t.PARTNERCASHOUT=t.PARTNERBIND=t.PARTNERINVITEDATA=t.PARTNERCASH=t.PARTNERINFO=t.EXCHANGECARD=t.SHARECARD=t.FEEDBACK=t.UPLOADFILE=t.GETNUMINFO=t.SUBSCRIBEINFO=t.INVITELIST=t.INVITEDATA=t.JSAPI=t.APPLYCASHOUT=t.MYCASHLIST=t.CASHLIST=t.MYCASH=t.MYINFO=t.GOODSLIST=t.BEFORODER=t.CREATEORDER=t.ADDBLACKLIST=t.COUPONLIST=t.BANNER=t.DELCALL=t.AUDITION=t.CANCELPROLPGUE=t.GETPROLPGUE=t.TEXTPROLOGUE=t.VOICEPROLOGUE=t.DELCONTACT=t.ADDCONTACT=t.CONTACTDETAIL=t.CONTACTLIST=t.CALLRECORDDETAILS=t.INDEXCOUPON=t.SHOWINDEXTIP=t.SETTINGURL=t.CALLRECORDLIST=t.CALLRECORDLISTTODAY=t.SENDCODE2=t.SENDCODE=t.LOGIN=t.TEST=void 0;var i="",n=i+"/getWangYiNews";t.TEST=n;var r=i+"/app/bindMobile";t.LOGIN=r;var o=i+"/app/sendVerifyCodeS";t.SENDCODE=o;var s=i+"/app/sendVerifyCode";t.SENDCODE2=s;var c=i+"/app/chat/callRecordListToday";t.CALLRECORDLISTTODAY=c;var l=i+"/app/chat/callRecordList";t.CALLRECORDLIST=l;var u=i+"/app/chat/getSettingPageUrl";t.SETTINGURL=u;var d=i+"/app/index/showIndexTips";t.SHOWINDEXTIP=d;var p=i+"/app/index/getCoupon";t.INDEXCOUPON=p;var E=i+"/app/chat/callRecordDetails";t.CALLRECORDDETAILS=E;var T=i+"/app/contact/list";t.CONTACTLIST=T;var v=i+"/app/contact/detail";t.CONTACTDETAIL=v;var C=i+"/app/contact/create";t.ADDCONTACT=C;var f=i+"/app/contact/delete";t.DELCONTACT=f;var b=i+"/app/chat/setVoicePrologue";t.VOICEPROLOGUE=b;var g=i+"/app/chat/setTextPrologue";t.TEXTPROLOGUE=g;var S=i+"/app/chat/getPrologue";t.GETPROLPGUE=S;var L=i+"/app/chat/cancelPrologue";t.CANCELPROLPGUE=L;var O=i+"/app/chat/audition";t.AUDITION=O;var R=i+"/app/chat/delCallRecord";t.DELCALL=R;var A=i+"/app/banner";t.BANNER=A;var I=i+"/app/chat/couponList";t.COUPONLIST=I;var h=i+"/app/blacklist/add";t.ADDBLACKLIST=h;var m=i+"/app/order/createOrder";t.CREATEORDER=m;var N=i+"/app/order/beforeOrder";t.BEFORODER=N;var D=i+"/app/order/goodsCardList";t.GOODSLIST=D;var P=i+"/app/chat/myInfo";t.MYINFO=P;var U=i+"/app/chat/myCash";t.MYCASH=U;var w=i+"/app/chat/cashList";t.CASHLIST=w;var y=i+"/app/chat/myCashList";t.MYCASHLIST=y;var x=i+"/app/chat/applyCashOut";t.APPLYCASHOUT=x;var k=i+"/app/chat/jsapiParams";t.JSAPI=k;var G=i+"/app/chat/myInviteData";t.INVITEDATA=G;var F=i+"/app/chat/inviteUserList";t.INVITELIST=F;var B=i+"/app/chat/subscribeInfo";t.SUBSCRIBEINFO=B;var V=i+"/app/chat/getNumberInfo";t.GETNUMINFO=V;var H=i+"/app/uploadFile";t.UPLOADFILE=H;var K=i+"/app/chat/feedback";t.FEEDBACK=K;var M=i+"/app/order/shareGetWeekCard";t.SHARECARD=M;var _=i+"/app/order/submitExchangeCard";t.EXCHANGECARD=_;var Y=i+"/app/chat/myPartnerInfo";t.PARTNERINFO=Y;var $=i+"/app/chat/myPartnerCash";t.PARTNERCASH=$;var X=i+"/app/chat/myPartnerInviteData";t.PARTNERINVITEDATA=X;var z=i+"/app/bindPartnerMobile";t.PARTNERBIND=z;var J=i+"/app/chat/partnerApplyCashOut";t.PARTNERCASHOUT=J;var W=i+"/app/chat/partnerInviteUserList";t.PARTNERINVITELIST=W;var q=i+"/app/chat/partnerCashList";t.PARTNERCASHLIST=q;var j=i+"/app/chat/cardPack";t.CARDPACK=j;var Q=i+"/app/chat/cardPackDetails";t.CARDPACKDETAILS=Q;var Z=i+"/app/chat/partnerPoster";t.QRCODE=Z;var ee=i+"/user/bysetting/transferConfig";t.TRANSFERCONFIG=ee;var te=i+"/user/bysetting/ttsPlaid";t.TTSPLAID=te;var ae=i+"/user/bysetting/ttsUpdate";t.TTSUPDATE=ae;var ie=i+"/user/bysetting/ttsScene";t.TTSSCENE=ie;var ne=i+"/user/bysetting/ttsConvert";t.TTSCONVERT=ne;var re=i+"/user/bysetting/prologueList";t.PROLOGUELIST=re;var oe=i+"/user/bysetting/prologueCurrent";t.PROLOGUECURRENT=oe;var se=i+"/user/bysetting/prologueSet";t.PROLOGUESET=se;var ce=i+"/user/bysetting/prologueGet";t.PROLOGUEGET=ce;var le=i+"/user/bysetting/setTextPrologue";t.SETTEXTPROLOGUE=le;var ue=i+"/user/bysetting/prologueDelete";t.PROLOGUEDELETE=ue;var de=i+"/user/bysetting/blackList";t.BLACKLIST=de;var pe=i+"/user/bysetting/blackAdd";t.BLACKADD=pe;var Ee=i+"/user/bysetting/blackDetele";t.BLACKDELETE=Ee;var Te=i+"/user/bysetting/refuseCall";t.REFUSECALL=Te;var ve=i+"/user/bysetting/refuseCallSet";t.REFUSECALLSET=ve;var Ce=i+"/user/bysetting/sceneStatus";t.SCENESTATUS=Ce;var fe=i+"/user/bysetting/scenelist";t.SCENELIST=fe;var be=i+"/user/bysetting/sceneRefuse";t.SCENEREFUSE=be;var ge=i+"/user/bysetting/sceneRefuseUpdate";t.SCENEREFUSEUPDATE=ge;var Se=i+"/user/bysetting/sceneUserPost";t.SCENEUSERPOST=Se;var Le=i+"/user/bysetting/setVoicePrologue";t.SETVOICEPROLOGUE=Le;var Oe=i+"/user/bysetting/sceneSet";t.SCENCESET=Oe;var Re=i+"/app/green/taskInfo";t.TASKINFO=Re;var Ae=i+"/app/green/cardList";t.GREENCARDLIST=Ae;var Ie=i+"/app/green/createOrder";t.GREENCREATEORDER=Ie;var he=i+"/push_stats/click";t.PUSHCLICK=he},"846b":function(e,t,a){e.exports=a.p+"static/img/laxin@2x.0378f509.png"},"925b":function(e,t,a){"use strict";a.r(t);var i=a("14a7"),n=a("49e1");for(var r in n)"default"!==r&&function(e){a.d(t,e,function(){return n[e]})}(r);a("39b5");var o=a("2877"),s=Object(o["a"])(n["default"],i["a"],i["b"],!1,null,"5d70a7e4",null);t["default"]=s.exports},b041:function(e,t){e.exports=function(e){return"string"!==typeof e?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),/["'() \t\n]/.test(e)?'"'+e.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':e)}},bc2b:function(e,t,a){var i=a("b041");t=e.exports=a("2350")(!1),t.push([e.i,"uni-page-body[data-v-5d70a7e4]{background:#5e88fd;margin-bottom:%?30?%}.topHead[data-v-5d70a7e4]{overflow:hidden;width:%?750?%;height:%?1206?%;background-size:cover;background-image:url("+i(a("846b"))+")}.Boxtitle[data-v-5d70a7e4]{font-size:%?40?%;color:#fff;text-shadow:%?5?% %?8?% %?6?% #00359e;text-align:right;font-weight:600;margin-right:%?100?%;margin-top:%?100?%}.Boxtitle>uni-view[data-v-5d70a7e4]{margin-top:%?30?%;font-size:%?48?%}.register[data-v-5d70a7e4]{margin:%?520?% %?30?% %?30?% %?30?%;padding:%?40?% %?30?%;border-radius:%?20?%;background-color:#fff}.register .title[data-v-5d70a7e4]{color:#111;font-size:%?30?%;\n\t/* margin-bottom: 28rpx; */text-align:center}\n\n/* 绑定手机表单 */.loginInputItem[data-v-5d70a7e4]{margin:%?25?% 0;overflow:hidden}.inputTip[data-v-5d70a7e4]{color:red;font-size:%?20?%;display:block;margin-top:%?5?%}.mobileInput>uni-input[data-v-5d70a7e4]{width:%?538?%;margin:auto}.loginInput uni-input[data-v-5d70a7e4]{outline:none;border-radius:%?10?%;border:1px solid #1c75ff;height:%?78?%;padding:%?10?% %?36?%;margin:auto}.loginInput>uni-view[data-v-5d70a7e4]{\n\t/* \t\tdisplay: flex;\n\tflex-direction: row;\n\talign-items: center;\n\tjustify-content: space-between; */}.smsCode[data-v-5d70a7e4]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;padding:0 %?40?%}.smsCode>uni-input[data-v-5d70a7e4]{width:%?381?%;margin:auto}.code[data-v-5d70a7e4]{color:#1c75ff;font-size:%?26?%;margin-left:%?30?%}.registerBtn[data-v-5d70a7e4]{margin-top:%?30?%}.registerBtn>uni-button[data-v-5d70a7e4]{width:100%;padding:%?40?% 0;font-size:%?30?%;background:-webkit-gradient(linear,left top,right top,from(#1c75ff),color-stop(10%,#1c75ff),color-stop(80%,#5799ff),to(#5799ff));background:-o-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);background:linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 80%,#5799ff);background:-ms-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);background:-webkit-linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 80%,#5799ff);background:-moz-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%)}body.?%PAGE?%[data-v-5d70a7e4]{background:#5e88fd}",""])},ce72:function(e,t,a){"use strict";var i=a("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("4917"),a("3b2b"),a("28a5"),a("386d");var n,r=i(a("89d8")),o=a("5c82"),s={data:function(){return{mobileCode:"获取验证码",time:60,mobileTip:"",inputValue:"",smsTip:"",mobile:"",smsCode:"",isDisable:!1,bindmobile:""}},onLoad:function(){this.initValidate(),this.getUrlToken()},methods:{getQueryString:function(e){var t=window.location.search;if(t.indexOf("?"),t=window.location.href.split("?")[1]||t.substr(1),t){var a=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),i=t.match(a);return null!==i?decodeURIComponent(i[2]):null}},getUrlToken:function(){if(n=this.getQueryString("token"),n){console.log("合伙人邀请的token",n);try{uni.setStorageSync("myToken",n)}catch(e){uni.showModal({content:e,showCancel:!1})}}else uni.navigateTo({url:"../partnerJumpLogin/partnerJumpLogin"})},initValidate:function(){var e={mobile:{required:!0,tel:!0},smsCode:{required:!0}},t={mobile:{required:"请输入手机号！"},smsCode:{required:"请输入验证码"}};this.WxValidate=new r.default(e,t)},getMobileCode:function(){if(this.bindmobile){if("获取验证码"==this.mobileCode){this.time=60,this.timer();var e=this.$encruption(this.bindmobile),t={mobile:this.bindmobile,elmobi:e};console.log(t),this.$request.url_request(o.SENDCODE,t,"POST",function(e){uni.showToast({title:"验证码发送成功",icon:"none",duration:1e3})},function(e){})}}else uni.showToast({title:"号码不能为空",icon:"none",duration:1e3})},timer:function(){this.time>0?(this.time--,this.mobileCode="还剩"+this.time+"s",setTimeout(this.timer,1e3)):(this.time=0,this.mobileCode="获取验证码")},handleLogin:function(e){var t=this;this.isDisable=!0,setTimeout(function(){t.isDisable=!1,t.$forceUpdate()},1e3);var a=e.detail.value;if(!this.WxValidate.checkForm(a)){var i=this.WxValidate.errorList[0];return uni.showToast({title:"".concat(i.msg),icon:"none"}),!1}this.$request.url_request(o.LOGIN,a,"POST",function(e){0==JSON.parse(e.data).code?uni.navigateTo({url:"../../Welcome/Welcome"}):JSON.parse(e.data).msg&&uni.showToast({title:JSON.parse(e.data).msg,icon:"none",duration:1e3})},function(e){})},pickupKeyboard:function(){uni.pageScrollTo({scrollTop:0,duration:0})}}};t.default=s}}]);