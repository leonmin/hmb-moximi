(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-SettingPage-SettingPage"],{"35d5":function(a,t,e){"use strict";e.r(t);var r=e("7d5f"),p=e.n(r);for(var n in r)"default"!==n&&function(a){e.d(t,a,function(){return r[a]})}(n);t["default"]=p.a},4125:function(a,t,e){"use strict";var r=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("v-uni-view",[0!=a.settingUrl.length?e("v-uni-web-view",{attrs:{"webview-styles":a.webviewStyles,src:a.settingUrl}}):a._e()],1)},p=[];e.d(t,"a",function(){return r}),e.d(t,"b",function(){return p})},"5a1f":function(a,t,e){var r=e("ebd69");"string"===typeof r&&(r=[[a.i,r,""]]),r.locals&&(a.exports=r.locals);var p=e("4f06").default;p("4645dc8c",r,!0,{sourceMap:!1,shadowMode:!1})},"5c82":function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CARDPACKDETAILS=t.CARDPACK=t.PARTNERCASHLIST=t.PARTNERINVITELIST=t.PARTNERCASHOUT=t.PARTNERBIND=t.PARTNERINVITEDATA=t.PARTNERCASH=t.PARTNERINFO=t.EXCHANGECARD=t.SHARECARD=t.FEEDBACK=t.UPLOADFILE=t.GETNUMINFO=t.SUBSCRIBEINFO=t.INVITELIST=t.INVITEDATA=t.JSAPI=t.APPLYCASHOUT=t.MYCASHLIST=t.CASHLIST=t.MYCASH=t.MYINFO=t.GOODSLIST=t.BEFORODER=t.CREATEORDER=t.ADDBLACKLIST=t.COUPONLIST=t.BANNER=t.DELCALL=t.AUDITION=t.CANCELPROLPGUE=t.GETPROLPGUE=t.TEXTPROLOGUE=t.VOICEPROLOGUE=t.DELCONTACT=t.ADDCONTACT=t.CONTACTDETAIL=t.CONTACTLIST=t.CALLRECORDDETAILS=t.INDEXCOUPON=t.SHOWINDEXTIP=t.SETTINGURL=t.CALLRECORDLIST=t.CALLRECORDLISTTODAY=t.SENDCODE=t.LOGIN=t.TEST=void 0;var r="",p=r+"/getWangYiNews";t.TEST=p;var n=r+"/app/bindMobile";t.LOGIN=n;var c=r+"/app/sendVerifyCode";t.SENDCODE=c;var T=r+"/app/chat/callRecordListToday";t.CALLRECORDLISTTODAY=T;var o=r+"/app/chat/callRecordList";t.CALLRECORDLIST=o;var i=r+"/app/chat/getSettingPageUrl";t.SETTINGURL=i;var A=r+"/app/index/showIndexTips";t.SHOWINDEXTIP=A;var E=r+"/app/index/getCoupon";t.INDEXCOUPON=E;var s=r+"/app/chat/callRecordDetails";t.CALLRECORDDETAILS=s;var C=r+"/app/contact/list";t.CONTACTLIST=C;var I=r+"/app/contact/detail";t.CONTACTDETAIL=I;var d=r+"/app/contact/create";t.ADDCONTACT=d;var L=r+"/app/contact/delete";t.DELCONTACT=L;var O=r+"/app/chat/setVoicePrologue";t.VOICEPROLOGUE=O;var R=r+"/app/chat/setTextPrologue";t.TEXTPROLOGUE=R;var u=r+"/app/chat/getPrologue";t.GETPROLPGUE=u;var v=r+"/app/chat/cancelPrologue";t.CANCELPROLPGUE=v;var l=r+"/app/chat/audition";t.AUDITION=l;var N=r+"/app/chat/delCallRecord";t.DELCALL=N;var S=r+"/app/banner";t.BANNER=S;var D=r+"/app/chat/couponList";t.COUPONLIST=D;var P=r+"/app/blacklist/add";t.ADDBLACKLIST=P;var f=r+"/app/order/createOrder";t.CREATEORDER=f;var h=r+"/app/order/beforeOrder";t.BEFORODER=h;var g=r+"/app/order/goodsCardList";t.GOODSLIST=g;var U=r+"/app/chat/myInfo";t.MYINFO=U;var b=r+"/app/chat/myCash";t.MYCASH=b;var G=r+"/app/chat/cashList";t.CASHLIST=G;var y=r+"/app/chat/myCashList";t.MYCASHLIST=y;var m=r+"/app/chat/applyCashOut";t.APPLYCASHOUT=m;var H=r+"/app/chat/jsapiParams";t.JSAPI=H;var w=r+"/app/chat/myInviteData";t.INVITEDATA=w;var B=r+"/app/chat/inviteUserList";t.INVITELIST=B;var F=r+"/app/chat/subscribeInfo";t.SUBSCRIBEINFO=F;var M=r+"/app/chat/getNumberInfo";t.GETNUMINFO=M;var V=r+"/app/uploadFile";t.UPLOADFILE=V;var Y=r+"/app/chat/feedback";t.FEEDBACK=Y;var k=r+"/app/order/shareGetWeekCard";t.SHARECARD=k;var x=r+"/app/order/submitExchangeCard";t.EXCHANGECARD=x;var K=r+"/app/chat/myPartnerInfo";t.PARTNERINFO=K;var X=r+"/app/chat/myPartnerCash";t.PARTNERCASH=X;var _=r+"/app/chat/myPartnerInviteData";t.PARTNERINVITEDATA=_;var W=r+"/app/bindPartnerMobile";t.PARTNERBIND=W;var J=r+"/app/chat/partnerApplyCashOut";t.PARTNERCASHOUT=J;var j=r+"/app/chat/partnerInviteUserList";t.PARTNERINVITELIST=j;var q=r+"/app/chat/partnerCashList";t.PARTNERCASHLIST=q;var $=r+"/app/chat/cardPack";t.CARDPACK=$;var z=r+"/app/chat/cardPackDetails";t.CARDPACKDETAILS=z},"7d5f":function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=e("5c82"),p={data:function(){return{webviewStyles:{progress:{color:"#1c75ff"}},settingUrl:""}},onLoad:function(){var a=this;uni.showToast({title:"加载中...",icon:"none",mask:!0}),this.getUrl(),setTimeout(function(){a.changeWidth()},500)},methods:{changeWidth:function(){document.getElementsByTagName("iframe")[0].classList.add("myIframe")},getUrl:function(){var a=this,t={};this.$request.url_request(r.SETTINGURL,t,"POST",function(t){a.settingUrl=JSON.parse(t.data).data.url,console.log("get url -> ",a.settingUrl),uni.hideToast()},function(a){})}}};t.default=p},c4cd:function(a,t,e){"use strict";e.r(t);var r=e("4125"),p=e("35d5");for(var n in p)"default"!==n&&function(a){e.d(t,a,function(){return p[a]})}(n);e("fd93");var c=e("2877"),T=Object(c["a"])(p["default"],r["a"],r["b"],!1,null,"042a66a4",null);t["default"]=T.exports},ebd69:function(a,t,e){t=a.exports=e("2350")(!1),t.push([a.i,"uni-page-body[data-v-042a66a4]{background-color:#fff}body.?%PAGE?%[data-v-042a66a4]{background-color:#fff}",""])},fd93:function(a,t,e){"use strict";var r=e("5a1f"),p=e.n(r);p.a}}]);