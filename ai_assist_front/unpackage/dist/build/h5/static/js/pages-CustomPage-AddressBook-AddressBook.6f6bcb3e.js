(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-CustomPage-AddressBook-AddressBook"],{"0bfd":function(t,a,e){"use strict";e.r(a);var i=e("8064"),r=e("20f7");for(var n in r)"default"!==n&&function(t){e.d(a,t,function(){return r[t]})}(n);e("b316");var s=e("2877"),o=Object(s["a"])(r["default"],i["a"],i["b"],!1,null,"2ac31452",null);a["default"]=o.exports},"1ef4":function(t,a,e){"use strict";var i=e("288e");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=i(e("f499")),n=e("5c82"),s={data:function(){return{list:[],dataList:[],listCur:[],boxTop:"",barTop:"",hidden:!1,offsettop:"",barHeight:"",listCurID:"A",searchInput:"",listData:""}},onShow:function(){uni.showToast({title:"加载中...",icon:"none",mask:!0}),this.getAddressBook()},onLoad:function(){},onPullDownRefresh:function(){},methods:{initData:function(){for(var t=0;t<26;t++)this.list.push({letter:String.fromCharCode(65+t),data:[]})},getAddressBook:function(){var t,a=this,e={};this.list=[],this.initData(),this.$request.url_request(n.CONTACTLIST,e,"GET",function(e){uni.stopPullDownRefresh(),a.listData=JSON.parse(e.data).data;for(var i=0;i<a.listData.length;i++){t=a.listData[i].pinyin.substring(0,1).toUpperCase();for(var r=0;r<=25;r++)t==a.list[r].letter&&a.list[r].data.push(a.listData[i])}uni.hideToast()},function(t){})},search:function(){console.log(this.searchInput),console.log(this.listData)},getCur:function(t){this.hidden=!0,this.listCur=this.list[t].letter,this.listCurID=this.list[t].letter},setCur:function(t){this.hidden=!1,this.listCur=this.list[t].letter},tMove:function(t){this.hidden=!0,console.log(t.detail.id)},tStart:function(){this.hidden=!0},tEnd:function(){this.hidden=!1,this.listCurID=this.listCur},addContact:function(){uni.navigateTo({url:"../AddContact/AddContact"})},contactDetail:function(t,a){var e=(0,r.default)({mobile:t,head:a});uni.navigateTo({url:"../ContactDetail/ContactDetail?detail="+e})}}};a.default=s},"20f7":function(t,a,e){"use strict";e.r(a);var i=e("1ef4"),r=e.n(i);for(var n in i)"default"!==n&&function(t){e.d(a,t,function(){return i[t]})}(n);a["default"]=r.a},"2d9c":function(t,a,e){var i=e("694c");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var r=e("4f06").default;r("fc7a2f24",i,!0,{sourceMap:!1,shadowMode:!1})},"5c82":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.GREENCREATEORDER=a.GREENCARDLIST=a.TASKINFO=a.SCENCESET=a.SETVOICEPROLOGUE=a.SCENEUSERPOST=a.SCENEREFUSEUPDATE=a.SCENEREFUSE=a.SCENELIST=a.SCENESTATUS=a.REFUSECALLSET=a.REFUSECALL=a.BLACKDELETE=a.BLACKADD=a.BLACKLIST=a.PROLOGUEDELETE=a.SETTEXTPROLOGUE=a.PROLOGUEGET=a.PROLOGUESET=a.PROLOGUECURRENT=a.PROLOGUELIST=a.TTSCONVERT=a.TTSSCENE=a.TTSUPDATE=a.TTSPLAID=a.TRANSFERCONFIG=a.CARDPACKDETAILS=a.CARDPACK=a.PARTNERCASHLIST=a.PARTNERINVITELIST=a.PARTNERCASHOUT=a.PARTNERBIND=a.PARTNERINVITEDATA=a.PARTNERCASH=a.PARTNERINFO=a.EXCHANGECARD=a.SHARECARD=a.FEEDBACK=a.UPLOADFILE=a.GETNUMINFO=a.SUBSCRIBEINFO=a.INVITELIST=a.INVITEDATA=a.JSAPI=a.APPLYCASHOUT=a.MYCASHLIST=a.CASHLIST=a.MYCASH=a.MYINFO=a.GOODSLIST=a.BEFORODER=a.CREATEORDER=a.ADDBLACKLIST=a.COUPONLIST=a.BANNER=a.DELCALL=a.AUDITION=a.CANCELPROLPGUE=a.GETPROLPGUE=a.TEXTPROLOGUE=a.VOICEPROLOGUE=a.DELCONTACT=a.ADDCONTACT=a.CONTACTDETAIL=a.CONTACTLIST=a.CALLRECORDDETAILS=a.INDEXCOUPON=a.SHOWINDEXTIP=a.SETTINGURL=a.CALLRECORDLIST=a.CALLRECORDLISTTODAY=a.SENDCODE=a.LOGIN=a.TEST=void 0;var i="",r=i+"/getWangYiNews";a.TEST=r;var n=i+"/app/bindMobile";a.LOGIN=n;var s=i+"/app/sendVerifyCode";a.SENDCODE=s;var o=i+"/app/chat/callRecordListToday";a.CALLRECORDLISTTODAY=o;var c=i+"/app/chat/callRecordList";a.CALLRECORDLIST=c;var E=i+"/app/chat/getSettingPageUrl";a.SETTINGURL=E;var l=i+"/app/index/showIndexTips";a.SHOWINDEXTIP=l;var u=i+"/app/index/getCoupon";a.INDEXCOUPON=u;var d=i+"/app/chat/callRecordDetails";a.CALLRECORDDETAILS=d;var C=i+"/app/contact/list";a.CONTACTLIST=C;var T=i+"/app/contact/detail";a.CONTACTDETAIL=T;var v=i+"/app/contact/create";a.ADDCONTACT=v;var p=i+"/app/contact/delete";a.DELCONTACT=p;var A=i+"/app/chat/setVoicePrologue";a.VOICEPROLOGUE=A;var S=i+"/app/chat/setTextPrologue";a.TEXTPROLOGUE=S;var R=i+"/app/chat/getPrologue";a.GETPROLPGUE=R;var L=i+"/app/chat/cancelPrologue";a.CANCELPROLPGUE=L;var f=i+"/app/chat/audition";a.AUDITION=f;var O=i+"/app/chat/delCallRecord";a.DELCALL=O;var h=i+"/app/banner";a.BANNER=h;var I=i+"/app/chat/couponList";a.COUPONLIST=I;var D=i+"/app/blacklist/add";a.ADDBLACKLIST=D;var N=i+"/app/order/createOrder";a.CREATEORDER=N;var g=i+"/app/order/beforeOrder";a.BEFORODER=g;var P=i+"/app/order/goodsCardList";a.GOODSLIST=P;var b=i+"/app/chat/myInfo";a.MYINFO=b;var U=i+"/app/chat/myCash";a.MYCASH=U;var y=i+"/app/chat/cashList";a.CASHLIST=y;var w=i+"/app/chat/myCashList";a.MYCASHLIST=w;var x=i+"/app/chat/applyCashOut";a.APPLYCASHOUT=x;var G=i+"/app/chat/jsapiParams";a.JSAPI=G;var m=i+"/app/chat/myInviteData";a.INVITEDATA=m;var k=i+"/app/chat/inviteUserList";a.INVITELIST=k;var B=i+"/app/chat/subscribeInfo";a.SUBSCRIBEINFO=B;var F=i+"/app/chat/getNumberInfo";a.GETNUMINFO=F;var _=i+"/app/uploadFile";a.UPLOADFILE=_;var H=i+"/app/chat/feedback";a.FEEDBACK=H;var V=i+"/app/order/shareGetWeekCard";a.SHARECARD=V;var K=i+"/app/order/submitExchangeCard";a.EXCHANGECARD=K;var M=i+"/app/chat/myPartnerInfo";a.PARTNERINFO=M;var Y=i+"/app/chat/myPartnerCash";a.PARTNERCASH=Y;var X=i+"/app/chat/myPartnerInviteData";a.PARTNERINVITEDATA=X;var j=i+"/app/bindPartnerMobile";a.PARTNERBIND=j;var $=i+"/app/chat/partnerApplyCashOut";a.PARTNERCASHOUT=$;var J=i+"/app/chat/partnerInviteUserList";a.PARTNERINVITELIST=J;var W=i+"/app/chat/partnerCashList";a.PARTNERCASHLIST=W;var z=i+"/app/chat/cardPack";a.CARDPACK=z;var q=i+"/app/chat/cardPackDetails";a.CARDPACKDETAILS=q;var Q=i+"/user/bysetting/transferConfig";a.TRANSFERCONFIG=Q;var Z=i+"/user/bysetting/ttsPlaid";a.TTSPLAID=Z;var tt=i+"/user/bysetting/ttsUpdate";a.TTSUPDATE=tt;var at=i+"/user/bysetting/ttsScene";a.TTSSCENE=at;var et=i+"/user/bysetting/ttsConvert";a.TTSCONVERT=et;var it=i+"/user/bysetting/prologueList";a.PROLOGUELIST=it;var rt=i+"/user/bysetting/prologueCurrent";a.PROLOGUECURRENT=rt;var nt=i+"/user/bysetting/prologueSet";a.PROLOGUESET=nt;var st=i+"/user/bysetting/prologueGet";a.PROLOGUEGET=st;var ot=i+"/user/bysetting/setTextPrologue";a.SETTEXTPROLOGUE=ot;var ct=i+"/user/bysetting/prologueDelete";a.PROLOGUEDELETE=ct;var Et=i+"/user/bysetting/blackList";a.BLACKLIST=Et;var lt=i+"/user/bysetting/blackAdd";a.BLACKADD=lt;var ut=i+"/user/bysetting/blackDetele";a.BLACKDELETE=ut;var dt=i+"/user/bysetting/refuseCall";a.REFUSECALL=dt;var Ct=i+"/user/bysetting/refuseCallSet";a.REFUSECALLSET=Ct;var Tt=i+"/user/bysetting/sceneStatus";a.SCENESTATUS=Tt;var vt=i+"/user/bysetting/scenelist";a.SCENELIST=vt;var pt=i+"/user/bysetting/sceneRefuse";a.SCENEREFUSE=pt;var At=i+"/user/bysetting/sceneRefuseUpdate";a.SCENEREFUSEUPDATE=At;var St=i+"/user/bysetting/sceneUserPost";a.SCENEUSERPOST=St;var Rt=i+"/user/bysetting/setVoicePrologue";a.SETVOICEPROLOGUE=Rt;var Lt=i+"/user/bysetting/sceneSet";a.SCENCESET=Lt;var ft=i+"/app/green/taskInfo";a.TASKINFO=ft;var Ot=i+"/app/green/cardList";a.GREENCARDLIST=Ot;var ht=i+"/app/green/createOrder";a.GREENCREATEORDER=ht},"694c":function(t,a,e){a=t.exports=e("2350")(!1),a.push([t.i,"uni-page-body[data-v-2ac31452]{background-color:#fff}.search[data-v-2ac31452]{margin-top:%?15?% 0;background:#fff}.searchBar[data-v-2ac31452]{border-radius:%?15?%}.displayItem[data-v-2ac31452]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}\n/* 添加联系人 */.addContact[data-v-2ac31452]{background-color:#fff;padding:%?30?% %?30?% 0 %?30?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.addContact uni-image[data-v-2ac31452]{width:%?80?%;height:%?80?%}.addContact uni-text[data-v-2ac31452]{color:#111;font-size:%?32?%;margin-top:%?-10?%;margin-left:%?10?%}.letterStyle[data-v-2ac31452]{color:#1c75ff;font-size:%?32?%}\n/* 分割线 */.divider[data-v-2ac31452]{border-top:%?1?% solid #f0f0f0;margin:%?40?% %?30?%}body.?%PAGE?%[data-v-2ac31452]{background-color:#fff}",""])},8064:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",[t.list?e("v-uni-view",{staticClass:"addressBook"},[e("v-uni-view",{staticClass:"addContact",on:{click:function(a){a=t.$handleEvent(a),t.addContact(a)}}},[e("v-uni-image",{attrs:{src:"../../../static/addressBook/tianjia-@2x.png",mode:""}}),e("v-uni-text",[t._v("添加联系人")])],1),e("v-uni-view",{staticClass:"divider"}),e("v-uni-view",[e("v-uni-scroll-view",{staticClass:"indexes",staticStyle:{height:"80vh"},attrs:{"scroll-y":"","scroll-into-view":t.listCurID,"scroll-with-animation":"true","enable-back-to-top":"true"}},[t._l(t.list,function(a,i){return a.data.length>0?[e("v-uni-view",{key:i+"_0",staticClass:"padding letterStyle",attrs:{id:a.letter,"data-index":"item"}},[t._v(t._s(a.letter))]),t._l(a.data,function(a,r){return e("v-uni-view",{key:r+"_"+i+"_1",staticClass:"cu-list menu-avatar no-padding",on:{click:function(e){e=t.$handleEvent(e),t.contactDetail(a.phone,a.avatarUrl)}}},[e("v-uni-view",{staticClass:"cu-item displayItem"},[e("v-uni-view",{staticClass:"cu-avatar round lg"},[e("v-uni-image",{staticStyle:{width:"100rpx",height:"100rpx","border-radius":"100rpx"},attrs:{src:a.avatarUrl,mode:""}})],1),e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"text-grey"},[t._v(t._s(a.name))]),e("v-uni-view",{staticClass:"text-gray text-sm"},[t._v("暂无通话")])],1)],1)],1)})]:t._e()})],2),e("v-uni-view",{staticClass:"indexBar"},[e("v-uni-view",{staticClass:"indexBar-box",on:{touchstart:function(a){a=t.$handleEvent(a),t.tStart(a)},touchend:function(a){a=t.$handleEvent(a),t.tEnd(a)},touchmove:function(a){a=t.$handleEvent(a),t.tMove(a)}}},t._l(t.list,function(a,i){return 0!==a.data.length?e("v-uni-view",{staticClass:"indexBar-item",on:{touchstart:function(a){a=t.$handleEvent(a),t.getCur(i)},touchend:function(a){a=t.$handleEvent(a),t.setCur(i)}}},[t._v(t._s(a.letter))]):t._e()}),1)],1),e("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.hidden,expression:"hidden"}],staticClass:"indexToast"},[t._v(t._s(t.listCur))])],1)],1):t._e()],1)},r=[];e.d(a,"a",function(){return i}),e.d(a,"b",function(){return r})},b316:function(t,a,e){"use strict";var i=e("2d9c"),r=e.n(i);r.a}}]);