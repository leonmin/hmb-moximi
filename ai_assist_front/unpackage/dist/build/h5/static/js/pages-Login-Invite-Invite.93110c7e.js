(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-Login-Invite-Invite"],{"0546":function(e,t,i){var n=i("b041");t=e.exports=i("2350")(!1),t.push([e.i,"uni-page-body[data-v-74fbe040]{background-color:#fff}.invitation[data-v-74fbe040]{position:relative}uni-page-body[data-v-74fbe040]{padding-bottom:%?20?%}.topHead[data-v-74fbe040]{width:%?750?%;height:%?701?%;background-size:cover;background-image:url("+n(i("e917"))+");z-index:-20}.itemNum[data-v-74fbe040]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;color:#fff;text-align:center;width:%?250?%;margin-top:%?100?%}.inviteCash[data-v-74fbe040]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.info[data-v-74fbe040]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;overflow:hidden;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.itemNum>uni-text[data-v-74fbe040]:first-of-type{font-size:%?30?%}.itemNum>uni-view[data-v-74fbe040]:first-of-type{font-size:%?64?%;margin-top:%?20?%}.divider[data-v-74fbe040]{width:%?3?%;height:%?79?%;background-color:#fff;margin-top:%?100?%}.btn>uni-button[data-v-74fbe040]{background:rgba(0,0,0,0);border:%?2?% solid #fff;color:#fff;font-size:%?28?%;width:%?177?%;height:%?60?%;line-height:%?60?%;border-radius:%?100?%;margin-top:%?50?%}uni-button[data-v-74fbe040]:after{border:none}.introduce[data-v-74fbe040]{border:%?1?% solid #fff;margin:%?30?%;-webkit-box-shadow:%?2?% %?2?% %?15?% #e4e7eb;box-shadow:%?2?% %?2?% %?15?% #e4e7eb;padding:0 %?34?%;border-radius:%?20?%;padding-bottom:%?40?%;z-index:-30}.item[data-v-74fbe040]{margin:%?30?% 0}.title[data-v-74fbe040]{color:#333;font-size:%?32?%;font-weight:600}.item>uni-view[data-v-74fbe040]{margin-top:%?20?%}.item>uni-view>uni-image[data-v-74fbe040]{width:%?22?%;height:%?22?%;margin:0 %?10?%}.item>uni-view>uni-text[data-v-74fbe040]{color:#333;font-size:%?32?%}.shareBtn>uni-button[data-v-74fbe040]{width:100%;color:#fff;border-radius:%?100?%;font-size:%?30?%;background:-webkit-gradient(linear,left top,right top,from(#1c75ff),color-stop(10%,#1c75ff),color-stop(80%,#5799ff),to(#5799ff));background:-o-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);background:linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 80%,#5799ff);background:-ms-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%);background:-webkit-linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 80%,#5799ff);background:-moz-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 80%,#5799ff 100%)}.imageshadow[data-v-74fbe040]{width:100%;background-color:rgba(0,0,0,.8);height:100vh;position:absolute;z-index:999;top:0;left:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}.shadowItem[data-v-74fbe040]{padding:%?50?%}.shadowItem>uni-image[data-v-74fbe040]:first-of-type{width:%?464?%;height:%?304?%;display:block}.shadowItem>uni-image[data-v-74fbe040]:nth-of-type(2){width:%?241?%;height:%?86?%;display:block;margin-top:%?50?%;margin-left:%?100?%}body.?%PAGE?%[data-v-74fbe040]{background-color:#fff}",""])},"0b10":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.inviteData?i("v-uni-view",{staticClass:"invitation"},[i("v-uni-view",{staticClass:"topHead"},[i("v-uni-view",{staticClass:"info"},[i("v-uni-view",{staticClass:"itemNum"},[i("v-uni-text",[e._v("获利提成")]),i("v-uni-view",{staticClass:"inviteCash"},[i("v-uni-text",{staticStyle:{"font-size":"45rpx","margin-right":"5rpx"}},[e._v("¥")]),i("v-uni-text",[e._v(e._s(e.inviteData.inviteTotalProfit/100))])],1)],1),i("v-uni-view",{staticClass:"divider"}),i("v-uni-view",{staticClass:"itemNum"},[i("v-uni-text",[e._v("邀请用户")]),i("v-uni-view",[i("v-uni-text",[e._v(e._s(e.inviteData.inviteUserCount))])],1)],1)],1),i("v-uni-view",{staticClass:"btn"},[i("v-uni-button",{on:{click:function(t){t=e.$handleEvent(t),e.checkDetail(t)}}},[e._v("查看详情")])],1)],1),i("v-uni-view",{staticClass:"introduce"},[i("v-uni-view",{staticClass:"item"},[i("v-uni-text",{staticClass:"title"},[e._v("为好友节省")]),i("v-uni-view",[i("v-uni-image",{attrs:{src:"../../../static/invite/xing@2x.png",mode:""}}),i("v-uni-text",[e._v("受邀好友可获得一张折扣优惠券")])],1)],1),i("v-uni-view",{staticClass:"item"},[i("v-uni-text",{staticClass:"title"},[e._v("自己可获取")]),i("v-uni-view",[i("v-uni-image",{attrs:{src:"../../../static/invite/xing@2x.png",mode:""}}),i("v-uni-text",[e._v("受邀好友续费可享受10%支付金额返利")])],1)],1),i("v-uni-view",{staticClass:"shareBtn"},[i("v-uni-button",{on:{click:function(t){t=e.$handleEvent(t),e.share(t)}}},[e._v("分享给好友")])],1)],1),e.imageshow?i("v-uni-view",{staticClass:"imageshadow"},[i("v-uni-view",{staticClass:"shadowItem"},[i("v-uni-image",{attrs:{src:"../../../static/invite/jiantou@2x.png",mode:""}}),i("v-uni-image",{attrs:{src:"../../../static/invite/wozhidao@2x.png",mode:""},on:{click:function(t){t=e.$handleEvent(t),e.close(t)}}})],1)],1):e._e()],1):e._e()},a=[];i.d(t,"a",function(){return n}),i.d(t,"b",function(){return a})},"3ae7":function(e,t,i){var n=i("0546");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("4cf35bf6",n,!0,{sourceMap:!1,shadowMode:!1})},"4ca9":function(e,t,i){"use strict";var n=i("3ae7"),a=i.n(n);a.a},"5c82":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CARDPACKDETAILS=t.CARDPACK=t.PARTNERCASHLIST=t.PARTNERINVITELIST=t.PARTNERCASHOUT=t.PARTNERBIND=t.PARTNERINVITEDATA=t.PARTNERCASH=t.PARTNERINFO=t.EXCHANGECARD=t.SHARECARD=t.FEEDBACK=t.UPLOADFILE=t.GETNUMINFO=t.SUBSCRIBEINFO=t.INVITELIST=t.INVITEDATA=t.JSAPI=t.APPLYCASHOUT=t.MYCASHLIST=t.CASHLIST=t.MYCASH=t.MYINFO=t.GOODSLIST=t.BEFORODER=t.CREATEORDER=t.ADDBLACKLIST=t.COUPONLIST=t.BANNER=t.DELCALL=t.AUDITION=t.CANCELPROLPGUE=t.GETPROLPGUE=t.TEXTPROLOGUE=t.VOICEPROLOGUE=t.DELCONTACT=t.ADDCONTACT=t.CONTACTDETAIL=t.CONTACTLIST=t.CALLRECORDDETAILS=t.INDEXCOUPON=t.SHOWINDEXTIP=t.SETTINGURL=t.CALLRECORDLIST=t.CALLRECORDLISTTODAY=t.SENDCODE=t.LOGIN=t.TEST=void 0;var n="",a=n+"/getWangYiNews";t.TEST=a;var o=n+"/app/bindMobile";t.LOGIN=o;var r=n+"/app/sendVerifyCode";t.SENDCODE=r;var c=n+"/app/chat/callRecordListToday";t.CALLRECORDLISTTODAY=c;var s=n+"/app/chat/callRecordList";t.CALLRECORDLIST=s;var d=n+"/app/chat/getSettingPageUrl";t.SETTINGURL=d;var l=n+"/app/index/showIndexTips";t.SHOWINDEXTIP=l;var u=n+"/app/index/getCoupon";t.INDEXCOUPON=u;var f=n+"/app/chat/callRecordDetails";t.CALLRECORDDETAILS=f;var p=n+"/app/contact/list";t.CONTACTLIST=p;var g=n+"/app/contact/detail";t.CONTACTDETAIL=g;var v=n+"/app/contact/create";t.ADDCONTACT=v;var m=n+"/app/contact/delete";t.DELCONTACT=m;var h=n+"/app/chat/setVoicePrologue";t.VOICEPROLOGUE=h;var I=n+"/app/chat/setTextPrologue";t.TEXTPROLOGUE=I;var T=n+"/app/chat/getPrologue";t.GETPROLPGUE=T;var b=n+"/app/chat/cancelPrologue";t.CANCELPROLPGUE=b;var w=n+"/app/chat/audition";t.AUDITION=w;var S=n+"/app/chat/delCallRecord";t.DELCALL=S;var A=n+"/app/banner";t.BANNER=A;var C=n+"/app/chat/couponList";t.COUPONLIST=C;var k=n+"/app/blacklist/add";t.ADDBLACKLIST=k;var y=n+"/app/order/createOrder";t.CREATEORDER=y;var x=n+"/app/order/beforeOrder";t.BEFORODER=x;var E=n+"/app/order/goodsCardList";t.GOODSLIST=E;var L=n+"/app/chat/myInfo";t.MYINFO=L;var P=n+"/app/chat/myCash";t.MYCASH=P;var O=n+"/app/chat/cashList";t.CASHLIST=O;var N=n+"/app/chat/myCashList";t.MYCASHLIST=N;var R=n+"/app/chat/applyCashOut";t.APPLYCASHOUT=R;var D=n+"/app/chat/jsapiParams";t.JSAPI=D;var _=n+"/app/chat/myInviteData";t.INVITEDATA=_;var M=n+"/app/chat/inviteUserList";t.INVITELIST=M;var U=n+"/app/chat/subscribeInfo";t.SUBSCRIBEINFO=U;var V=n+"/app/chat/getNumberInfo";t.GETNUMINFO=V;var B=n+"/app/uploadFile";t.UPLOADFILE=B;var j=n+"/app/chat/feedback";t.FEEDBACK=j;var J=n+"/app/order/shareGetWeekCard";t.SHARECARD=J;var G=n+"/app/order/submitExchangeCard";t.EXCHANGECARD=G;var W=n+"/app/chat/myPartnerInfo";t.PARTNERINFO=W;var H=n+"/app/chat/myPartnerCash";t.PARTNERCASH=H;var z=n+"/app/chat/myPartnerInviteData";t.PARTNERINVITEDATA=z;var F=n+"/app/bindPartnerMobile";t.PARTNERBIND=F;var Q=n+"/app/chat/partnerApplyCashOut";t.PARTNERCASHOUT=Q;var q=n+"/app/chat/partnerInviteUserList";t.PARTNERINVITELIST=q;var Y=n+"/app/chat/partnerCashList";t.PARTNERCASHLIST=Y;var X=n+"/app/chat/cardPack";t.CARDPACK=X;var $=n+"/app/chat/cardPackDetails";t.CARDPACKDETAILS=$},"84e0":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i("5c82"),a=i("ecd9"),o={data:function(){return{inviteUrl:"",jsData:"",maskShow:!1,inviteData:"",imageshow:!1}},onLoad:function(e){uni.showToast({title:"加载中...",icon:"none",mask:!0}),this.inviteUrl=e.invite,this.getUrl(),this.getJSAPI(),this.myInvite()},onPullDownRefresh:function(){this.myInvite()},methods:{myInvite:function(){var e=this,t={};this.$request.url_request(n.INVITEDATA,t,"GET",function(t){e.inviteData=JSON.parse(t.data).data,uni.hideToast(),uni.stopPullDownRefresh()},function(e){})},getUrl:function(){var e=this,t={};this.$request.url_request(n.MYINFO,t,"GET",function(t){e.inviteUrl=JSON.parse(t.data).data.inviteUrl},function(e){})},getJSAPI:function(){var e=this,t={};this.$request.url_request(n.JSAPI,t,"GET",function(t){e.jsData=JSON.parse(t.data).data,console.log("得到的签名",e.jsData.signature),a.config({appId:e.jsData.appId,timestamp:e.jsData.timestamp,nonceStr:e.jsData.nonceStr,signature:e.jsData.signature,jsApiList:["updateAppMessageShareData","onMenuShareAppMessage","onMenuShareTimeline"]}),a.ready(function(){console.log("接口处理成功")}),a.error(function(){console.log("接口处理失败")})},function(e){})},share:function(){this.imageshow=!0,this.$forceUpdate();var e=this;a.onMenuShareAppMessage({title:"【魔小秘】您的专属智能来电助理",desc:"快来领取你的优惠券",link:e.inviteUrl,imgUrl:"https://ai-assist.oss-cn-beijing.aliyuncs.com/aac/mxmlogo.png",type:"link",dataUrl:"",success:function(){e.imageshow=!1}}),a.onMenuShareTimeline({title:"【魔小秘】您的专属智能来电助理",link:e.inviteUrl,imgUrl:"https://ai-assist.oss-cn-beijing.aliyuncs.com/aac/mxmlogo.png",success:function(){e.imageshow=!1}})},checkDetail:function(){uni.navigateTo({url:"inviteDetail"})},close:function(){this.imageshow=!1}}};t.default=o},b041:function(e,t){e.exports=function(e){return"string"!==typeof e?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),/["'() \t\n]/.test(e)?'"'+e.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':e)}},b54a:function(e,t,i){"use strict";i("386b")("link",function(e){return function(t){return e(this,"a","href",t)}})},cbfd:function(e,t,i){"use strict";i.r(t);var n=i("0b10"),a=i("f3b3");for(var o in a)"default"!==o&&function(e){i.d(t,e,function(){return a[e]})}(o);i("4ca9");var r=i("2877"),c=Object(r["a"])(a["default"],n["a"],n["b"],!1,null,"74fbe040",null);t["default"]=c.exports},e917:function(e,t,i){e.exports=i.p+"static/img/bj@2x.546888d8.jpg"},ecd9:function(e,t,i){"use strict";var n=i("288e"),a=n(i("bd86"));i("28a5"),i("7f7f"),i("b54a"),i("4917");var o=n(i("f499"));i("a481"),function(t,i){e.exports=i(t)}(window,function(e,t){function i(t,i,n){e.WeixinJSBridge?WeixinJSBridge.invoke(t,r(i),function(e){s(t,e,n)}):l(t,n)}function n(t,i,n){e.WeixinJSBridge?WeixinJSBridge.on(t,function(e){n&&n.trigger&&n.trigger(e),s(t,e,i)}):l(t,n||i)}function r(e){return(e=e||{}).appId=E.appId,e.verifyAppId=E.appId,e.verifySignType="sha1",e.verifyTimestamp=E.timestamp+"",e.verifyNonceStr=E.nonceStr,e.verifySignature=E.signature,e}function c(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function s(e,t,i){"openEnterpriseChat"==e&&(t.errCode=t.err_code),delete t.err_code,delete t.err_desc,delete t.err_detail;var n=t.errMsg;n||(n=t.err_msg,delete t.err_msg,n=function(e,t){var i=e,n=v[i];n&&(i=n);var a="ok";if(t){var o=t.indexOf(":");"confirm"==(a=t.substring(o+1))&&(a="ok"),"failed"==a&&(a="fail"),-1!=a.indexOf("failed_")&&(a=a.substring(7)),-1!=a.indexOf("fail_")&&(a=a.substring(5)),"access denied"!=(a=(a=a.replace(/_/g," ")).toLowerCase())&&"no permission to execute"!=a||(a="permission denied"),"config"==i&&"function not exist"==a&&(a="ok"),""==a&&(a="fail")}return i+":"+a}(e,n),t.errMsg=n),(i=i||{})._complete&&(i._complete(t),delete i._complete),n=t.errMsg||"",E.debug&&!i.isInnerInvoke&&alert((0,o.default)(t));var a=n.indexOf(":");switch(n.substring(a+1)){case"ok":i.success&&i.success(t);break;case"cancel":i.cancel&&i.cancel(t);break;default:i.fail&&i.fail(t)}i.complete&&i.complete(t)}function d(e){if(e){for(var t=0,i=e.length;t<i;++t){var n=e[t],a=g[n];a&&(e[t]=a)}return e}}function l(e,t){if(!(!E.debug||t&&t.isInnerInvoke)){var i=v[e];i&&(e=i),t&&t._complete&&delete t._complete,console.log('"'+e+'",',t||"")}}function u(){return(new Date).getTime()}function f(t){S&&(e.WeixinJSBridge?t():m.addEventListener&&m.addEventListener("WeixinJSBridgeReady",t,!1))}if(!e.jWeixin){var p,g={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},v=function(){var e={};for(var t in g)e[g[t]]=t;return e}(),m=e.document,h=m.title,I=navigator.userAgent.toLowerCase(),T=navigator.platform.toLowerCase(),b=!(!T.match("mac")&&!T.match("win")),w=-1!=I.indexOf("wxdebugger"),S=-1!=I.indexOf("micromessenger"),A=-1!=I.indexOf("android"),C=-1!=I.indexOf("iphone")||-1!=I.indexOf("ipad"),k=(M=I.match(/micromessenger\/(\d+\.\d+\.\d+)/)||I.match(/micromessenger\/(\d+\.\d+)/))?M[1]:"",y={initStartTime:u(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},x={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:C?1:A?2:-1,clientVersion:k,url:encodeURIComponent(location.href)},E={},L={_completes:[]},P={state:0,data:{}};f(function(){y.initEndTime=u()});var O=!1,N=[],R=(p={config:function(t){l("config",E=t);var n=!1!==E.check;f(function(){if(n)i(g.config,{verifyJsApiList:d(E.jsApiList)},function(){L._complete=function(e){y.preVerifyEndTime=u(),P.state=1,P.data=e},L.success=function(e){x.isPreVerifyOk=0},L.fail=function(e){L._fail?L._fail(e):P.state=-1};var e=L._completes;return e.push(function(){!function(e){if(!(b||w||E.debug||k<"6.0.2"||x.systemType<0)){var t=new Image;x.appId=E.appId,x.initTime=y.initEndTime-y.initStartTime,x.preVerifyTime=y.preVerifyEndTime-y.preVerifyStartTime,R.getNetworkType({isInnerInvoke:!0,success:function(e){x.networkType=e.networkType;var i="https://open.weixin.qq.com/sdk/report?v="+x.version+"&o="+x.isPreVerifyOk+"&s="+x.systemType+"&c="+x.clientVersion+"&a="+x.appId+"&n="+x.networkType+"&i="+x.initTime+"&p="+x.preVerifyTime+"&u="+x.url;t.src=i}})}}()}),L.complete=function(t){for(var i=0,n=e.length;i<n;++i)e[i]();L._completes=[]},L}()),y.preVerifyStartTime=u();else{P.state=1;for(var e=L._completes,t=0,a=e.length;t<a;++t)e[t]();L._completes=[]}}),R.invoke||(R.invoke=function(t,i,n){e.WeixinJSBridge&&WeixinJSBridge.invoke(t,r(i),n)},R.on=function(t,i){e.WeixinJSBridge&&WeixinJSBridge.on(t,i)})},ready:function(e){0!=P.state?e():(L._completes.push(e),!S&&E.debug&&e())},error:function(e){k<"6.0.2"||(-1==P.state?e(P.data):L._fail=e)},checkJsApi:function(e){i("checkJsApi",{jsApiList:d(e.jsApiList)},(e._complete=function(e){if(A){var t=e.checkResult;t&&(e.checkResult=JSON.parse(t))}e=function(e){var t=e.checkResult;for(var i in t){var n=v[i];n&&(t[n]=t[i],delete t[i])}return e}(e)},e))},onMenuShareTimeline:function(e){n(g.onMenuShareTimeline,{complete:function(){i("shareTimeline",{title:e.title||h,desc:e.title||h,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){n(g.onMenuShareAppMessage,{complete:function(t){"favorite"===t.scene?i("sendAppMessage",{title:e.title||h,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""}):i("sendAppMessage",{title:e.title||h,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){n(g.onMenuShareQQ,{complete:function(){i("shareQQ",{title:e.title||h,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){n(g.onMenuShareWeibo,{complete:function(){i("shareWeiboApp",{title:e.title||h,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){n(g.onMenuShareQZone,{complete:function(){i("shareQZone",{title:e.title||h,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},updateTimelineShareData:function(e){i("updateTimelineShareData",{title:e.title,link:e.link,imgUrl:e.imgUrl},e)},updateAppMessageShareData:function(e){i("updateAppMessageShareData",{title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl},e)},startRecord:function(e){i("startRecord",{},e)},stopRecord:function(e){i("stopRecord",{},e)},onVoiceRecordEnd:function(e){n("onVoiceRecordEnd",e)},playVoice:function(e){i("playVoice",{localId:e.localId},e)},pauseVoice:function(e){i("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){i("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){n("onVoicePlayEnd",e)},uploadVoice:function(e){i("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){i("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){i("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){i("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},(e._complete=function(e){if(A){var t=e.localIds;try{t&&(e.localIds=JSON.parse(t))}catch(e){}}},e))},getLocation:function(e){},previewImage:function(e){i(g.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){i("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){i("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===O?(O=!0,i("getLocalImgData",{localId:e.localId},(e._complete=function(e){if(O=!1,0<N.length){var t=N.shift();wx.getLocalImgData(t)}},e))):N.push(e)},getNetworkType:function(e){i("getNetworkType",{},(e._complete=function(e){e=function(e){var t=e.errMsg;e.errMsg="getNetworkType:ok";var i=e.subtype;if(delete e.subtype,i)e.networkType=i;else{var n=t.indexOf(":"),a=t.substring(n+1);switch(a){case"wifi":case"edge":case"wwan":e.networkType=a;break;default:e.errMsg="getNetworkType:fail"}}return e}(e)},e))},openLocation:function(e){i("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)}},(0,a.default)(p,"getLocation",function(e){i(g.getLocation,{type:(e=e||{}).type||"wgs84"},(e._complete=function(e){delete e.type},e))}),(0,a.default)(p,"hideOptionMenu",function(e){i("hideOptionMenu",{},e)}),(0,a.default)(p,"showOptionMenu",function(e){i("showOptionMenu",{},e)}),(0,a.default)(p,"closeWindow",function(e){i("closeWindow",{},e=e||{})}),(0,a.default)(p,"hideMenuItems",function(e){i("hideMenuItems",{menuList:e.menuList},e)}),(0,a.default)(p,"showMenuItems",function(e){i("showMenuItems",{menuList:e.menuList},e)}),(0,a.default)(p,"hideAllNonBaseMenuItem",function(e){i("hideAllNonBaseMenuItem",{},e)}),(0,a.default)(p,"showAllNonBaseMenuItem",function(e){i("showAllNonBaseMenuItem",{},e)}),(0,a.default)(p,"scanQRCode",function(e){i("scanQRCode",{needResult:(e=e||{}).needResult||0,scanType:e.scanType||["qrCode","barCode"]},(e._complete=function(e){if(C){var t=e.resultStr;if(t){var i=JSON.parse(t);e.resultStr=i&&i.scan_code&&i.scan_code.scan_result}}},e))}),(0,a.default)(p,"openAddress",function(e){i(g.openAddress,{},(e._complete=function(e){var t;(t=e).postalCode=t.addressPostalCode,delete t.addressPostalCode,t.provinceName=t.proviceFirstStageName,delete t.proviceFirstStageName,t.cityName=t.addressCitySecondStageName,delete t.addressCitySecondStageName,t.countryName=t.addressCountiesThirdStageName,delete t.addressCountiesThirdStageName,t.detailInfo=t.addressDetailInfo,delete t.addressDetailInfo,e=t},e))}),(0,a.default)(p,"openProductSpecificView",function(e){i(g.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)}),(0,a.default)(p,"addCard",function(e){for(var t=e.cardList,n=[],a=0,o=t.length;a<o;++a){var r=t[a],c={card_id:r.cardId,card_ext:r.cardExt};n.push(c)}i(g.addCard,{card_list:n},(e._complete=function(e){var t=e.card_list;if(t){for(var i=0,n=(t=JSON.parse(t)).length;i<n;++i){var a=t[i];a.cardId=a.card_id,a.cardExt=a.card_ext,a.isSuccess=!!a.is_succ,delete a.card_id,delete a.card_ext,delete a.is_succ}e.cardList=t,delete e.card_list}},e))}),(0,a.default)(p,"chooseCard",function(e){i("chooseCard",{app_id:E.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},(e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e))}),(0,a.default)(p,"openCard",function(e){for(var t=e.cardList,n=[],a=0,o=t.length;a<o;++a){var r=t[a],c={card_id:r.cardId,code:r.code};n.push(c)}i(g.openCard,{card_list:n},e)}),(0,a.default)(p,"consumeAndShareCard",function(e){i(g.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)}),(0,a.default)(p,"chooseWXPay",function(e){i(g.chooseWXPay,c(e),e)}),(0,a.default)(p,"openEnterpriseRedPacket",function(e){i(g.openEnterpriseRedPacket,c(e),e)}),(0,a.default)(p,"startSearchBeacons",function(e){i(g.startSearchBeacons,{ticket:e.ticket},e)}),(0,a.default)(p,"stopSearchBeacons",function(e){i(g.stopSearchBeacons,{},e)}),(0,a.default)(p,"onSearchBeacons",function(e){n(g.onSearchBeacons,e)}),(0,a.default)(p,"openEnterpriseChat",function(e){i("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)}),(0,a.default)(p,"launchMiniProgram",function(e){i("launchMiniProgram",{targetAppId:e.targetAppId,path:function(e){if("string"==typeof e&&0<e.length){var t=e.split("?")[0],i=e.split("?")[1];return t+=".html",void 0!==i?t+"?"+i:t}}(e.path),envVersion:e.envVersion},e)}),(0,a.default)(p,"miniProgram",{navigateBack:function(e){e=e||{},f(function(){i("invokeMiniProgramAPI",{name:"navigateBack",arg:{delta:e.delta||1}},e)})},navigateTo:function(e){f(function(){i("invokeMiniProgramAPI",{name:"navigateTo",arg:{url:e.url}},e)})},redirectTo:function(e){f(function(){i("invokeMiniProgramAPI",{name:"redirectTo",arg:{url:e.url}},e)})},switchTab:function(e){f(function(){i("invokeMiniProgramAPI",{name:"switchTab",arg:{url:e.url}},e)})},reLaunch:function(e){f(function(){i("invokeMiniProgramAPI",{name:"reLaunch",arg:{url:e.url}},e)})},postMessage:function(e){f(function(){i("invokeMiniProgramAPI",{name:"postMessage",arg:e.data||{}},e)})},getEnv:function(t){f(function(){t({miniprogram:"miniprogram"===e.__wxjs_environment})})}}),p),D=1,_={};return m.addEventListener("error",function(e){if(!A){var t=e.target,i=t.tagName,n=t.src;if(("IMG"==i||"VIDEO"==i||"AUDIO"==i||"SOURCE"==i)&&-1!=n.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var a=t["wx-id"];if(a||(a=D++,t["wx-id"]=a),_[a])return;_[a]=!0,wx.ready(function(){wx.getLocalImgData({localId:n,success:function(e){t.src=e.localData}})})}}},!0),m.addEventListener("load",function(e){if(!A){var t=e.target,i=t.tagName;if(t.src,"IMG"==i||"VIDEO"==i||"AUDIO"==i||"SOURCE"==i){var n=t["wx-id"];n&&(_[n]=!1)}}},!0),t&&(e.wx=e.jWeixin=R),R}var M})},f3b3:function(e,t,i){"use strict";i.r(t);var n=i("84e0"),a=i.n(n);for(var o in n)"default"!==o&&function(e){i.d(t,e,function(){return n[e]})}(o);t["default"]=a.a}}]);