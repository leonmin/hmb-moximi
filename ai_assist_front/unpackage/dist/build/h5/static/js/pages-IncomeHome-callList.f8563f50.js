(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-IncomeHome-callList"],{"1bd0":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"indexBox"},[t.itemData?i("v-uni-view",[i("v-uni-view",{staticClass:" whiteBg"},[i("v-uni-view",{staticClass:"cu-bar search",on:{click:function(e){e=t.$handleEvent(e),t.search(e)}}},[i("v-uni-view",{staticClass:"search-form searchBar"},[i("v-uni-text",{staticClass:"cuIcon-search"}),i("v-uni-input",{attrs:{type:"text",placeholder:"搜索来电","confirm-type":"search"}})],1)],1),i("v-uni-view",{staticClass:"indexBtn"},[i("v-uni-button",{staticClass:"today",style:t.todayStyle,on:{click:function(e){e=t.$handleEvent(e),t.todayBtn(e)}}},[t._v("今日来电")]),i("v-uni-button",{staticClass:"today",style:t.historyStyle,on:{click:function(e){e=t.$handleEvent(e),t.historyBtn(e)}}},[t._v("历史来电")])],1)],1),i("v-uni-view",{staticClass:"callList"},[0==t.itemData.length?i("v-uni-view",[i("v-uni-view",{staticClass:"noDataBox"},[i("v-uni-view",{staticClass:"noData"},[i("v-uni-image",{attrs:{src:"../../static/quexing/wulaidian@2x.png",mode:""}}),i("v-uni-view",[i("v-uni-text",[t._v("暂无通话")])],1)],1)],1)],1):t._e(),t._l(t.itemData,function(e,a){return e?i("v-uni-view",{key:a,staticClass:"callListItem",on:{click:function(i){i=t.$handleEvent(i),t.gotoDetails(e.id)}}},[i("v-uni-view",{staticClass:"itemHead"},[i("v-uni-image",{attrs:{src:e.avatarUrl,alt:""}})],1),i("v-uni-view",{staticClass:"rightItem"},[i("v-uni-view",{staticClass:"mobileFont"},[i("v-uni-text",{staticClass:"mobileFont"},[t._v(t._s(t._f("formateTel")(e.callerMobile)))])],1),i("v-uni-view",{staticClass:"durationItem"},[i("v-uni-view",{staticClass:"duration"},[null!==e.location?i("v-uni-text",[t._v(t._s(e.location))]):t._e(),i("v-uni-text",[t._v(t._s(t._f("formateDate")(e.gmtCreate)))]),i("v-uni-text",[t._v("通话"+t._s(e.voiceTime)+"s")])],1),i("v-uni-view",{on:{click:function(i){i.stopPropagation(),i=t.$handleEvent(i),t.call(e.callerMobile)}}},[i("v-uni-image",{attrs:{src:"../../static/callDetail/laidian@2x.png",mode:""}})],1)],1),i("v-uni-view",{staticClass:"chatItem"},[t._l(e.contents.slice(0,2),function(e,a){return i("v-uni-text",{key:a},[t._v(t._s(e))])}),0==e.contents.length?i("v-uni-text",[t._v("对方未说话")]):t._e()],2),i("v-uni-view",{staticClass:"tipBox"},[i("v-uni-view",{staticClass:"tipItem"},[i("v-uni-text",[t._v(t._s(e.labelName))])],1)],1)],1)],1):t._e()}),t.itemData.length>9?i("uni-load-more",{attrs:{status:t.istoday?t.todayText:t.historyText}}):t._e()],2)],1):t._e()],1)},o=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return o})},"1e3c":function(t,e,i){"use strict";i.r(e);var a=i("1bd0"),o=i("3474");for(var n in o)"default"!==n&&function(t){i.d(e,t,function(){return o[t]})}(n);i("205b");var r=i("2877"),s=Object(r["a"])(o["default"],a["a"],a["b"],!1,null,"cdef58ba",null);e["default"]=s.exports},"205b":function(t,e,i){"use strict";var a=i("92cc"),o=i.n(a);o.a},3474:function(t,e,i){"use strict";i.r(e);var a=i("8790"),o=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e["default"]=o.a},"46f5":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,"uni-page-body[data-v-cdef58ba]{\n\t/* background-color: #F3F6F7; */background-color:#fff}.indexBox[data-v-cdef58ba]{overflow:hidden}.search[data-v-cdef58ba]{background:#fff}.searchBar[data-v-cdef58ba]{border-radius:%?15?%}.whiteBg[data-v-cdef58ba]{background:#fff}\n\n/* 今日来电 */.indexBtn[data-v-cdef58ba]{background:#fff;width:%?750?%;margin:auto;margin-top:%?30?%;padding-bottom:%?40?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.noCall>uni-text[data-v-cdef58ba]{color:#666;font-size:%?30?%}uni-button[data-v-cdef58ba]:after{border:none}.today[data-v-cdef58ba]{width:%?317?%;font-size:%?28?%;outline:none;border:1px solid #e5e5e5;border-radius:%?50?%;background:#fff;-webkit-box-shadow:%?0?% %?1?% %?10?% #e5e5e5;box-shadow:%?0?% %?1?% %?10?% #e5e5e5}.callList[data-v-cdef58ba]{\n\t/* background-color: #F3F6F7;\t */overflow:hidden}.callListItem[data-v-cdef58ba]{border:%?1?% solid #fff;-webkit-box-shadow:%?2?% %?2?% %?15?% %?5?% #e8edef;box-shadow:%?2?% %?2?% %?15?% %?5?% #e8edef;background-color:#fff;border-radius:%?20?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;\n\t/* justify-content: space-between; */\n\t/* width: 650rpx; */margin:%?30?%;padding:%?30?% %?40?%}.rightItem[data-v-cdef58ba]{padding:0 %?20?%;margin-left:%?2?%}.mobileFont[data-v-cdef58ba]{color:#111;font-size:%?32?%}.duration[data-v-cdef58ba]{font-size:%?26?%;color:#777}.duration>uni-text[data-v-cdef58ba]{margin-right:%?20?%}.durationItem[data-v-cdef58ba]{margin-top:%?10?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.durationItem>uni-view>uni-image[data-v-cdef58ba]{width:%?29?%;height:%?35?%}.chatItem[data-v-cdef58ba]{border:%?1?% solid #e1e1e1;-webkit-box-shadow:%?1?% %?1?% %?15?% #d8dee6;box-shadow:%?1?% %?1?% %?15?% #d8dee6;padding:%?30?% %?20?%;\n\t/* max-height: 129rpx; */width:%?483?%;overflow:hidden;margin-top:%?20?%;font-size:%?28?%;color:#222;border-radius:%?20?%}.chatItem>uni-text[data-v-cdef58ba]{display:-webkit-box;-webkit-line-clamp:1;overflow:hidden;-webkit-box-orient:vertical}.continue[data-v-cdef58ba]{font-size:%?22?%;color:#999;margin-top:%?10?%;display:inline-block}.tipBox[data-v-cdef58ba]{margin-top:%?10?%}.textIcon[data-v-cdef58ba]{font-size:%?22?%;color:#999;display:inline-block}.tipItem[data-v-cdef58ba]{padding:%?5?% %?16?%;margin:%?10?%;font-size:%?26?%;text-align:center;color:#fff;\n\t/* background-color: #1c75ff; */background:-webkit-gradient(linear,left top,right top,from(#1c75ff),color-stop(10%,#1c75ff),color-stop(70%,#5799ff),to(#5799ff));background:-o-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 70%,#5799ff 100%);background:linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 70%,#5799ff);background:-ms-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 70%,#5799ff 100%);background:-webkit-linear-gradient(left,#1c75ff,#1c75ff 10%,#5799ff 70%,#5799ff);background:-moz-linear-gradient(left,#1c75ff 0,#1c75ff 10%,#5799ff 70%,#5799ff 100%);display:inline-block;-webkit-box-shadow:0 %?3?% %?10?% #85b5ff;box-shadow:0 %?3?% %?10?% #85b5ff;border-radius:%?10?%}.tipItem>uni-text[data-v-cdef58ba]{line-height:%?40?%}.noDataBox[data-v-cdef58ba]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;margin-top:%?260?%}.noData[data-v-cdef58ba]{text-align:center}.noData>uni-image[data-v-cdef58ba]{width:%?265?%;height:%?204?%}.noData>uni-view[data-v-cdef58ba]>{margin-top:%?20?%}.noData>uni-view>uni-text[data-v-cdef58ba]{color:#cbdcfe;font-size:%?28?%}.banner[data-v-cdef58ba]{background:#fff;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.banner>uni-image[data-v-cdef58ba]{width:100%;height:%?295?%}.module[data-v-cdef58ba]{padding:%?30?% %?30?%;background-color:#fff;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.moduleItem[data-v-cdef58ba]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;position:relative;margin:0 %?10?%}.moduleItem>uni-image[data-v-cdef58ba]{width:%?75?%;height:%?75?%}.badgeNum[data-v-cdef58ba]{border:%?1?% solid #fff;text-align:center;padding:%?3?%;width:%?30?%;height:%?30?%;color:#fff;border-radius:%?100?%;font-size:%?20?%;background-color:#e01212;position:absolute;top:%?-10?%;right:%?10?%;z-index:999}\n\n/* 今日来电 */.todayCall[data-v-cdef58ba]{border:%?1?% solid #f0ad4e;background:#fff;color:#111;padding:%?20?% %?30?%\n\t/* font-weight: 600; */}.title[data-v-cdef58ba]{border:%?1?% solid #f0ad4e;padding:%?20?% 0;font-size:%?34?%}body.?%PAGE?%[data-v-cdef58ba]{background-color:#fff}",""])},8790:function(t,e,i){"use strict";var a=i("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("28a5"),i("a481");var o=i("781f"),n=i("5c82"),r=a(i("1b5b")),s=a(i("7aed")),c=null,d={components:{uniSearchBar:o.uniSearchBar,uniNoticeBar:s.default,uniIcons:o.uniIcons,uniLoadMore:r.default},filters:{formateTel:function(t){if("057126211779"==t){var e="魔小秘(示例电话)";return e}var i=/(\d{3})\d*(\d{4})/,a=t.replace(i,"$1****$2");return a},formateDate:function(t){var e=t.split(" ")[0];if(void 0!==e){var i=e.split("-"),a=i[1]+"-"+i[2];return a}}},data:function(){return{todayStyle:"border:1px solid #1c75ff;color:#1c75ff;box-shadow: 0 2rpx  10rpx #D4DDEC;",historyStyle:"",moduleData:[{src:"../../static/incomeHome/jietingpeizhi@2x.png",name:"接听配置"},{src:"../../static/incomeHome/yaoqing@2x.png",name:"立即邀请"},{src:"../../static/incomeHome/qianbao@2x.png",name:"我的钱包"}],callList:[{}],getToken:"",itemData:"",istoday:1,todayText:"more",historyText:"more",page:1}},onLoad:function(t){this.initData(),uni.showToast({title:"正在加载中...",icon:"none",mask:!0,isfocus:""})},onPullDownRefresh:function(){1==this.istoday?this.initData():0==this.istoday&&this.historyBtn()},onReachBottom:function(){var t=this;null!=c&&clearTimeout(c),c=setTimeout(function(){t.getmore()},1e3)},methods:{gotoList:function(){uni.navigateTo({url:"callList"})},gotoModule:function(t){console.log(t),0==t?uni.switchTab({url:"../SettingPage/SettingPage"}):1==t?uni.navigateTo({url:"../Login/Invite/Invite"}):2==t&&uni.navigateTo({url:"../MinePage/MineWallet/MineWallet"})},call:function(t){uni.makePhoneCall({phoneNumber:t})},initData:function(){var t=this;this.istoday=1;var e={pageNum:1};this.$request.url_request(n.CALLRECORDLISTTODAY,e,"GET",function(e){t.itemData=JSON.parse(e.data).data.list,uni.hideToast(),uni.stopPullDownRefresh()},function(t){})},getmore:function(){var t=this;if("more"==this.todayText||"more"==this.historyText)if(1==this.istoday){this.todayText="loading",this.$forceUpdate(),this.page++;var e={pageNum:this.page};this.$request.url_request(n.CALLRECORDLISTTODAY,e,"GET",function(e){JSON.parse(e.data).data.list.length<=0?(t.todayText="noMore",t.$forceUpdate()):(t.todayText="more",t.itemData=t.itemData.concat(JSON.parse(e.data).data.list),t.$forceUpdate())},function(t){})}else{this.page++;var i={pageNum:this.page};this.historyText="loading",this.$request.url_request(n.CALLRECORDLIST,i,"GET",function(e){JSON.parse(e.data).data.list.length<=0?(t.historyText="noMore",t.$forceUpdate()):(t.historyText="more",t.itemData=t.itemData.concat(JSON.parse(e.data).data.list),t.$forceUpdate())},function(t){})}},search:function(){uni.navigateTo({url:"search/search"})},todayBtn:function(){uni.showToast({title:"正在加载中...",icon:"none",mask:!0}),this.historyText="more",this.historyStyle="",this.todayStyle="border:1px solid #1c75ff;color:#1c75ff;box-shadow: 0rpx 1rpx  10rpx #D4DDEC;",this.page=1,this.initData()},historyBtn:function(){var t=this;uni.showToast({title:"正在加载中...",icon:"none",mask:!0}),this.todayText="more",this.page=1,this.istoday=0,this.todayStyle="",this.historyStyle="border:1px solid #1c75ff;color:#1c75ff;box-shadow: 0rpx 1rpx  10rpx #D4DDEC;";var e={pageNum:1};this.$request.url_request(n.CALLRECORDLIST,e,"GET",function(e){t.itemData=JSON.parse(e.data).data.list,uni.hideToast(),uni.stopPullDownRefresh()},function(t){})},gotoDetails:function(t){uni.navigateTo({url:"callDetails/callDetails?id="+t})}}};e.default=d},"92cc":function(t,e,i){var a=i("46f5");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=i("4f06").default;o("03bfbdce",a,!0,{sourceMap:!1,shadowMode:!1})}}]);