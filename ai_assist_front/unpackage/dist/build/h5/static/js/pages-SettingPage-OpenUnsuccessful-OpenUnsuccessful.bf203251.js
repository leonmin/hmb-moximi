(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-SettingPage-OpenUnsuccessful-OpenUnsuccessful"],{"3ffb":function(t,a,e){"use strict";var i=e("6725"),s=e.n(i);s.a},"441a":function(t,a,e){"use strict";e.r(a);var i=e("8566"),s=e("5cd1");for(var n in s)"default"!==n&&function(t){e.d(a,t,function(){return s[t]})}(n);e("3ffb");var r,v=e("f0c5"),o=Object(v["a"])(s["default"],i["b"],i["c"],!1,null,"3478a062",null,!1,i["a"],r);a["default"]=o.exports},"4c20":function(t,a,e){a=t.exports=e("2350")(!1),a.push([t.i,".outBox[data-v-3478a062]{padding:%?40?% %?30?%}.title[data-v-3478a062]{font-size:%?34?%;color:#111;font-weight:600}.deliver[data-v-3478a062]{border-top:%?1?% solid #e9e9e9;margin:%?40?% 0}.subTitle[data-v-3478a062]{font-size:%?32?%;color:#111;font-weight:600}.content[data-v-3478a062]{margin-top:%?10?%}.contenItem[data-v-3478a062]{margin-top:%?30?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}.dot[data-v-3478a062]{width:%?30?%;height:%?30?%;overflow:hidden}.dot>uni-view[data-v-3478a062]{width:%?12?%;height:%?12?%;margin-top:%?8?%;border-radius:%?100?%;background:#111}.context[data-v-3478a062]{margin-left:%?20?%;color:666666}.tipStyle[data-v-3478a062]{color:666666;font-weight:600}.how[data-v-3478a062]{margin-top:%?40?%}.tel[data-v-3478a062]{font-size:%?26?%;color:#666;margin:%?30?% 0}.setMethod[data-v-3478a062]{color:#111;font-size:%?30?%;font-weight:600}.imgContent[data-v-3478a062]{margin-top:%?40?%}.imgContentTitle[data-v-3478a062]{font-size:%?28?%;color:#212121}.imgBox[data-v-3478a062]{margin-top:%?40?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.mtop[data-v-3478a062]{margin:%?50?% 0}.tips[data-v-3478a062]{margin-top:%?50?%}",""])},5765:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=e("5c82"),s={data:function(){return{phoneNum:"",myPhone:""}},onLoad:function(){uni.showToast({title:"加载中..",icon:"none",mask:!1}),this.getPhoneNum()},methods:{getPhoneNum:function(){var t=this,a={};this.$request.url_request(i.GETNUMINFO,a,"GET",function(a){t.phoneNum=JSON.parse(a.data).data.line,t.myPhone=JSON.parse(a.data).data.mobile,uni.hideToast()},function(t){})}}};a.default=s},"5c82":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.PUSHCLICK=a.GREENCREATEORDER=a.GREENCARDLIST=a.TASKINFO=a.SCENCESET=a.SETVOICEPROLOGUE=a.SCENEUSERPOST=a.SCENEREFUSEUPDATE=a.SCENEREFUSE=a.SCENELIST=a.SCENESTATUS=a.REFUSECALLSET=a.REFUSECALL=a.BLACKDELETE=a.BLACKADD=a.BLACKLIST=a.PROLOGUEDELETE=a.SETTEXTPROLOGUE=a.PROLOGUEGET=a.PROLOGUESET=a.PROLOGUECURRENT=a.PROLOGUELIST=a.TTSCONVERT=a.TTSSCENE=a.TTSUPDATE=a.TTSPLAID=a.TRANSFERCONFIG=a.QRCODE=a.CARDPACKDETAILS=a.CARDPACK=a.PARTNERCASHLIST=a.PARTNERINVITELIST=a.PARTNERCASHOUT=a.PARTNERBIND=a.PARTNERINVITEDATA=a.PARTNERCASH=a.PARTNERINFO=a.EXCHANGECARD=a.SHARECARD=a.FEEDBACK=a.UPLOADFILE=a.GETNUMINFO=a.SUBSCRIBEINFO=a.INVITELIST=a.INVITEDATA=a.JSAPI=a.APPLYCASHOUT=a.MYCASHLIST=a.CASHLIST=a.MYCASH=a.MYINFO=a.GOODSLIST=a.BEFORODER=a.CREATEORDER=a.ADDBLACKLIST=a.COUPONLIST=a.BANNER=a.DELCALL=a.AUDITION=a.CANCELPROLPGUE=a.GETPROLPGUE=a.TEXTPROLOGUE=a.VOICEPROLOGUE=a.DELCONTACT=a.ADDCONTACT=a.CONTACTDETAIL=a.CONTACTLIST=a.CALLRECORDDETAILS=a.INDEXCOUPON=a.SHOWINDEXTIP=a.SETTINGURL=a.CALLRECORDLIST=a.CALLRECORDLISTTODAY=a.SENDCODE2=a.SENDCODE=a.LOGIN=a.TEST=void 0;var i="",s=i+"/getWangYiNews";a.TEST=s;var n=i+"/app/bindMobile";a.LOGIN=n;var r=i+"/app/sendVerifyCodeS";a.SENDCODE=r;var v=i+"/app/sendVerifyCode";a.SENDCODE2=v;var o=i+"/app/chat/callRecordListToday";a.CALLRECORDLISTTODAY=o;var c=i+"/app/chat/callRecordList";a.CALLRECORDLIST=c;var C=i+"/app/chat/getSettingPageUrl";a.SETTINGURL=C;var E=i+"/app/index/showIndexTips";a.SHOWINDEXTIP=E;var u=i+"/app/index/getCoupon";a.INDEXCOUPON=u;var p=i+"/app/chat/callRecordDetails";a.CALLRECORDDETAILS=p;var l=i+"/app/contact/list";a.CONTACTLIST=l;var T=i+"/app/contact/detail";a.CONTACTDETAIL=T;var d=i+"/app/contact/create";a.ADDCONTACT=d;var S=i+"/app/contact/delete";a.DELCONTACT=S;var g=i+"/app/chat/setVoicePrologue";a.VOICEPROLOGUE=g;var A=i+"/app/chat/setTextPrologue";a.TEXTPROLOGUE=A;var R=i+"/app/chat/getPrologue";a.GETPROLPGUE=R;var L=i+"/app/chat/cancelPrologue";a.CANCELPROLPGUE=L;var O=i+"/app/chat/audition";a.AUDITION=O;var w=i+"/app/chat/delCallRecord";a.DELCALL=w;var I=i+"/app/banner";a.BANNER=I;var N=i+"/app/chat/couponList";a.COUPONLIST=N;var h=i+"/app/blacklist/add";a.ADDBLACKLIST=h;var P=i+"/app/order/createOrder";a.CREATEORDER=P;var D=i+"/app/order/beforeOrder";a.BEFORODER=D;var m=i+"/app/order/goodsCardList";a.GOODSLIST=m;var f=i+"/app/chat/myInfo";a.MYINFO=f;var b=i+"/app/chat/myCash";a.MYCASH=b;var x=i+"/app/chat/cashList";a.CASHLIST=x;var U=i+"/app/chat/myCashList";a.MYCASHLIST=U;var y=i+"/app/chat/applyCashOut";a.APPLYCASHOUT=y;var G=i+"/app/chat/jsapiParams";a.JSAPI=G;var _=i+"/app/chat/myInviteData";a.INVITEDATA=_;var B=i+"/app/chat/inviteUserList";a.INVITELIST=B;var F=i+"/app/chat/subscribeInfo";a.SUBSCRIBEINFO=F;var k=i+"/app/chat/getNumberInfo";a.GETNUMINFO=k;var H=i+"/app/uploadFile";a.UPLOADFILE=H;var M=i+"/app/chat/feedback";a.FEEDBACK=M;var V=i+"/app/order/shareGetWeekCard";a.SHARECARD=V;var K=i+"/app/order/submitExchangeCard";a.EXCHANGECARD=K;var Y=i+"/app/chat/myPartnerInfo";a.PARTNERINFO=Y;var z=i+"/app/chat/myPartnerCash";a.PARTNERCASH=z;var X=i+"/app/chat/myPartnerInviteData";a.PARTNERINVITEDATA=X;var j=i+"/app/bindPartnerMobile";a.PARTNERBIND=j;var J=i+"/app/chat/partnerApplyCashOut";a.PARTNERCASHOUT=J;var W=i+"/app/chat/partnerInviteUserList";a.PARTNERINVITELIST=W;var q=i+"/app/chat/partnerCashList";a.PARTNERCASHLIST=q;var Q=i+"/app/chat/cardPack";a.CARDPACK=Q;var $=i+"/app/chat/cardPackDetails";a.CARDPACKDETAILS=$;var Z=i+"/app/chat/partnerPoster";a.QRCODE=Z;var tt=i+"/user/bysetting/transferConfig";a.TRANSFERCONFIG=tt;var at=i+"/user/bysetting/ttsPlaid";a.TTSPLAID=at;var et=i+"/user/bysetting/ttsUpdate";a.TTSUPDATE=et;var it=i+"/user/bysetting/ttsScene";a.TTSSCENE=it;var st=i+"/user/bysetting/ttsConvert";a.TTSCONVERT=st;var nt=i+"/user/bysetting/prologueList";a.PROLOGUELIST=nt;var rt=i+"/user/bysetting/prologueCurrent";a.PROLOGUECURRENT=rt;var vt=i+"/user/bysetting/prologueSet";a.PROLOGUESET=vt;var ot=i+"/user/bysetting/prologueGet";a.PROLOGUEGET=ot;var ct=i+"/user/bysetting/setTextPrologue";a.SETTEXTPROLOGUE=ct;var Ct=i+"/user/bysetting/prologueDelete";a.PROLOGUEDELETE=Ct;var Et=i+"/user/bysetting/blackList";a.BLACKLIST=Et;var ut=i+"/user/bysetting/blackAdd";a.BLACKADD=ut;var pt=i+"/user/bysetting/blackDetele";a.BLACKDELETE=pt;var lt=i+"/user/bysetting/refuseCall";a.REFUSECALL=lt;var Tt=i+"/user/bysetting/refuseCallSet";a.REFUSECALLSET=Tt;var dt=i+"/user/bysetting/sceneStatus";a.SCENESTATUS=dt;var St=i+"/user/bysetting/scenelist";a.SCENELIST=St;var gt=i+"/user/bysetting/sceneRefuse";a.SCENEREFUSE=gt;var At=i+"/user/bysetting/sceneRefuseUpdate";a.SCENEREFUSEUPDATE=At;var Rt=i+"/user/bysetting/sceneUserPost";a.SCENEUSERPOST=Rt;var Lt=i+"/user/bysetting/setVoicePrologue";a.SETVOICEPROLOGUE=Lt;var Ot=i+"/user/bysetting/sceneSet";a.SCENCESET=Ot;var wt=i+"/app/green/taskInfo";a.TASKINFO=wt;var It=i+"/app/green/cardList";a.GREENCARDLIST=It;var Nt=i+"/app/green/createOrder";a.GREENCREATEORDER=Nt;var ht=i+"/push_stats/click";a.PUSHCLICK=ht},"5cd1":function(t,a,e){"use strict";e.r(a);var i=e("5765"),s=e.n(i);for(var n in i)"default"!==n&&function(t){e.d(a,t,function(){return i[t]})}(n);a["default"]=s.a},6725:function(t,a,e){var i=e("4c20");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var s=e("4f06").default;s("22947f98",i,!0,{sourceMap:!1,shadowMode:!1})},8566:function(t,a,e){"use strict";var i,s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"outBox"},[e("v-uni-view",{staticClass:"title"},[t._v("设置不成功怎么办？（手动设置教程）")]),e("v-uni-view",{staticClass:"deliver"}),e("v-uni-view",{staticClass:"why"},[e("v-uni-view",{staticClass:"subTitle"},[t._v("1.为什么设置会不成功？")]),e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"contenItem"},[e("v-uni-view",{staticClass:"dot"},[e("v-uni-view")],1),e("v-uni-view",{staticClass:"context"},[t._v("首先，您需要确保"),e("v-uni-text",{staticClass:"tipStyle"},[t._v("注册魔小秘的手机号已开通【呼叫转移】服务；")])],1)],1),e("v-uni-view",{staticClass:"contenItem"},[e("v-uni-view",{staticClass:"dot"},[e("v-uni-view")],1),e("v-uni-view",{staticClass:"context"},[t._v("其次，如果您已经开通Volte（高清通话）功能，"),e("v-uni-text",{staticClass:"tipStyle"},[t._v("需要确保【移动数据流量】开关已开启；")])],1)],1),e("v-uni-view",{staticClass:"contenItem"},[e("v-uni-view",{staticClass:"dot"},[e("v-uni-view")],1),e("v-uni-view",{staticClass:"context"},[t._v("然后，打开"),e("v-uni-text",{staticClass:"tipStyle"},[t._v("公众号-【设置】界面，重新进行拨号设置；")])],1)],1),e("v-uni-view",{staticClass:"contenItem"},[e("v-uni-view",{staticClass:"dot"},[e("v-uni-view")],1),e("v-uni-view",{staticClass:"context"},[t._v("最后，如果问题仍未解决，您可以选择"),e("v-uni-text",{staticClass:"tipStyle"},[t._v("【手动设置】")]),t._v("或者"),e("v-uni-text",{staticClass:"tipStyle"},[t._v("联系客服协助开通！")])],1)],1)],1)],1),e("v-uni-view",{staticClass:"how"},[e("v-uni-view",{staticClass:"subTitle"},[t._v("2.如何进行手动设置？")]),e("v-uni-view",{staticClass:"tel"},[t._v("您的专属转接号码："),e("v-uni-text",{staticStyle:{"font-weight":"600","font-size":"28rpx"}},[t._v(t._s(t.phoneNum))])],1),e("v-uni-view",{staticClass:"setMethod"},[t._v("iPhone（苹果）用户设置方式")]),e("v-uni-view",{staticClass:"imgContent"},[e("v-uni-view",{attrs:{imgContentTitle:!0}},[t._v("01.打开【设置】-【电话】")]),e("v-uni-view",{staticClass:"imgBox"},[e("v-uni-image",{staticStyle:{width:"541rpx",height:"960rpx"},attrs:{src:"../../../static/setting/ios1-0527.png",mode:""}})],1)],1),e("v-uni-view",{staticClass:"imgContent"},[e("v-uni-view",{attrs:{imgContentTitle:!0}},[t._v("02.进入【呼叫转移】")]),e("v-uni-view",{staticClass:"imgBox"},[e("v-uni-image",{staticStyle:{width:"544rpx",height:"967rpx"},attrs:{src:"../../../static/setting/ios2-0527.png",mode:""}})],1)],1),e("v-uni-view",{staticClass:"imgContent"},[e("v-uni-view",{attrs:{imgContentTitle:!0}},[t._v("03.选择所需的【呼叫转移】场景")]),e("v-uni-view",{staticClass:"imgBox"},[e("v-uni-image",{staticStyle:{width:"592rpx",height:"661rpx"},attrs:{src:"../../../static/setting/ios3-0527.png",mode:""}})],1)],1),e("v-uni-view",{staticClass:"imgContent"},[e("v-uni-view",{attrs:{imgContentTitle:!0}},[t._v("04.输入【小助理号码】即可")]),e("v-uni-view",{staticClass:"tel"},[t._v("您的专属转接号码："),e("v-uni-text",{staticStyle:{"font-weight":"600","font-size":"28rpx"}},[t._v(t._s(t.phoneNum))])],1),e("v-uni-view",{staticClass:"imgBox"},[e("v-uni-image",{staticStyle:{width:"544rpx",height:"380rpx"},attrs:{src:"../../../static/setting/ios4-0527.png",mode:""}})],1)],1),e("v-uni-view",{staticClass:"setMethod mtop"},[t._v("Android（安卓）用户设置方式（以华为EMUI系统为例）")]),e("v-uni-view",{staticClass:"imgContent"},[e("v-uni-view",{attrs:{imgContentTitle:!0}},[t._v("01.打开【电话】-右上角【设置】")]),e("v-uni-view",{staticClass:"imgBox"},[e("v-uni-image",{staticStyle:{width:"600rpx",height:"1300rpx"},attrs:{src:"../../../static/setting/android1-0517.png",mode:""}})],1)],1),e("v-uni-view",{staticClass:"imgContent"},[e("v-uni-view",{attrs:{imgContentTitle:!0}},[t._v("02.进入【呼叫转移】")]),e("v-uni-view",{staticClass:"imgBox"},[e("v-uni-image",{staticStyle:{width:"600rpx",height:"1300rpx"},attrs:{src:"../../../static/setting/android2.jpg",mode:""}})],1)],1),e("v-uni-view",{staticClass:"imgContent"},[e("v-uni-view",{attrs:{imgContentTitle:!0}},[t._v("03.选择所需的【呼入转移场景】")]),e("v-uni-view",{staticClass:"imgBox"},[e("v-uni-image",{staticStyle:{width:"600rpx",height:"408rpx"},attrs:{src:"../../../static/setting/android3-0527.png"}})],1)],1),e("v-uni-view",{staticClass:"imgContent"},[e("v-uni-view",{attrs:{imgContentTitle:!0}},[t._v("04.输入【小助理号码】即可】")]),e("v-uni-view",{staticClass:"tel"},[t._v("您的专属转接号码："),e("v-uni-text",{staticStyle:{"font-weight":"600","font-size":"28rpx"}},[t._v(t._s(t.phoneNum))])],1),e("v-uni-view",{staticClass:"imgBox"},[e("v-uni-image",{staticStyle:{width:"600rpx",height:"448rpx"},attrs:{src:"../../../static/setting/android4-0527.png"}})],1)],1)],1),e("v-uni-view",{staticClass:"tips"},[e("v-uni-view",{staticClass:"subTitle"},[t._v("3.温馨提示")]),e("v-uni-view",{staticClass:"contenItem"},[e("v-uni-view",{staticClass:"dot"},[e("v-uni-view")],1),e("v-uni-view",{staticClass:"context"},[t._v("如果以上方法均不成功，请拨打运营商电话，询问是否开通呼叫转移功能，并要求运营商帮忙设置，将呼叫转移至【小助理号码】；")])],1),e("v-uni-view",{staticClass:"contenItem"},[e("v-uni-view",{staticClass:"dot"},[e("v-uni-view")],1),e("v-uni-view",{staticClass:"context"},[t._v("实在没招了，"),e("v-uni-text",{staticClass:"tipStyle"},[t._v("打开【魔小秘】公众号-【在线客服】，直接联系客服求助吧！")])],1)],1),e("v-uni-view",{staticClass:"contenItem"},[e("v-uni-view",{staticClass:"dot"},[e("v-uni-view")],1),e("v-uni-view",{staticClass:"context"},[t._v("请确保手机处于正常使用状态，欠费状态下无法使用该服务；")])],1)],1)],1)},n=[];e.d(a,"b",function(){return s}),e.d(a,"c",function(){return n}),e.d(a,"a",function(){return i})}}]);