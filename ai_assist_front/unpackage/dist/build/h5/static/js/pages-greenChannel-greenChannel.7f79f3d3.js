(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-greenChannel-greenChannel"],{"3f97":function(e,t,i){"use strict";i.r(t);var a=i("4988"),n=i.n(a);for(var o in a)"default"!==o&&function(e){i.d(t,e,function(){return a[e]})}(o);t["default"]=n.a},4988:function(e,t,i){"use strict";var a=i("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(i("e814")),o=i("5c82"),s=i("ecd9"),r={data:function(){return{ischeck:!1,saleItem:0,greenSku:"",taskInfo:"",goodslist:"",payData:"",progress:"",imageshow:!1}},onLoad:function(){uni.showToast({title:"加载中...",icon:"none"}),this.getTaskInfo(),this.getCardList(),this.getJSAPI()},methods:{getTaskInfo:function(){var e=this,t={};this.$request.url_request(o.TASKINFO,t,"GET",function(t){e.taskInfo=JSON.parse(t.data).data,e.progress=(0,n.default)(e.completeCount/e.destCount)},function(e){})},getCardList:function(){var e=this,t={};this.$request.url_request(o.GREENCARDLIST,t,"GET",function(t){uni.hideToast(),e.goodslist=JSON.parse(t.data).data,e.greenSku=e.goodslist[0].sku},function(e){})},checkSaleItem:function(e,t,i,a){this.saleItem=e,this.greenSku=t},pay:function(){var e=this,t={sku:this.greenSku};this.$request.url_request(o.GREENCREATEORDER,t,"POST",function(t){e.payData=JSON.parse(t.data),"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",e.onBridgeReady,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",e.onBridgeReady),document.attachEvent("onWeixinJSBridgeReady",e.onBridgeReady)):e.onBridgeReady()},function(e){})},onBridgeReady:function(){WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:this.payData.appId,timeStamp:this.payData.timeStamp,nonceStr:this.payData.nonceStr,package:this.payData.packageValue,signType:this.payData.signType,paySign:this.payData.paySign},function(e){"get_brand_wcpay_request:ok"==e.err_msg&&uni.reLaunch({url:"../MinePage"})})},getJSAPI:function(){var e=this,t={};this.$request.url_request(o.JSAPI,t,"GET",function(t){e.jsData=JSON.parse(t.data).data,console.log("得到的签名",e.jsData.signature),s.config({appId:e.jsData.appId,timestamp:e.jsData.timestamp,nonceStr:e.jsData.nonceStr,signature:e.jsData.signature,jsApiList:["updateAppMessageShareData","onMenuShareAppMessage","onMenuShareTimeline"]}),s.ready(function(){console.log("接口处理成功")}),s.error(function(){console.log("接口处理失败")})},function(e){})},greenShare:function(){console.log(11),this.imageshow=!0;var e=this;s.onMenuShareAppMessage({title:"【魔小秘】您的专属智能来电助理",desc:"不想接，就挂断，来电助理帮你接听",link:"https://m.checkshirt-ai.com/h5poster/index.html#/",imgUrl:"https://ai-assist.oss-cn-beijing.aliyuncs.com/aac/mxmlogo.png",type:"link",dataUrl:"",success:function(){e.imageshow=!1}}),s.onMenuShareTimeline({title:"【魔小秘】您的专属智能来电助理",link:"https://m.checkshirt-ai.com/h5poster/index.html#/",imgUrl:"https://ai-assist.oss-cn-beijing.aliyuncs.com/aac/mxmlogo.png",success:function(){e.imageshow=!1}})},close:function(){this.imageshow=!1}}};t.default=r},6756:function(e,t,i){var a=i("b041");t=e.exports=i("2350")(!1),t.push([e.i,"uni-page-body[data-v-11f4c774]{background:#fff}.banner>uni-image[data-v-11f4c774]{width:100%;height:%?240?%}.taskBox[data-v-11f4c774]{padding:%?60?% %?30?%}.taskTitle[data-v-11f4c774]{font-size:%?34?%;color:#111;font-weight:600}.taskDes[data-v-11f4c774]{margin-top:%?27?%;font-size:%?30?%;color:#333;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.progress[data-v-11f4c774]{margin-top:%?39?%;width:100%;height:%?34?%;background:#fff1de;border:%?1?% solid #f5b418;-webkit-box-shadow:%?-1?% %?0?% %?15?% %?0?% rgba(252,195,57,.4);box-shadow:%?-1?% %?0?% %?15?% %?0?% rgba(252,195,57,.4);border-radius:%?17?%;position:relative}.taskEnd[data-v-11f4c774]{margin-top:%?30?%;font-size:%?28?%;color:#555;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.taskEnd>uni-image[data-v-11f4c774]{width:%?380?%;height:%?35?%}.bg-yellow[data-v-11f4c774]{border-radius:%?100?%}.division[data-v-11f4c774]{width:100%;height:%?20?%;background:#f3f6f7}.discountBox[data-v-11f4c774]{padding:%?50?% %?30?%}.discountTitle[data-v-11f4c774]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;font-size:%?34?%}.discountTitle>uni-text[data-v-11f4c774]:first-of-type{font-weight:600}.discountTitle>uni-text[data-v-11f4c774]:nth-of-type(2){font-size:%?28?%}.unlock[data-v-11f4c774]{color:#999}.lock[data-v-11f4c774]{color:#111}.lock>uni-text[data-v-11f4c774]:nth-of-type(2){background:-webkit-gradient(linear,left top,right top,from(#d5a06e),to(#b18153));background:-o-linear-gradient(left,#d5a06e,#b18153);background:linear-gradient(90deg,#d5a06e,#b18153);-webkit-background-clip:text;color:rgba(0,0,0,0)}.saleContain[data-v-11f4c774]{margin-top:%?57?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.saleItem[data-v-11f4c774]{\n\t/* flex-shrink:0; */background-size:cover;width:%?193?%;height:%?252?%;text-align:center;padding:%?30?%}.checkedBg[data-v-11f4c774]{background-image:url("+a(i("bd98"))+");position:relative}.uncheckedBg[data-v-11f4c774]{background-image:url("+a(i("e795"))+")}.price[data-v-11f4c774]{margin:%?36?% 0;font-size:%?40?%;color:#111}.orignalPrice[data-v-11f4c774]{font-size:%?20?%;color:#fff}.orignalPrice1[data-v-11f4c774]{font-size:%?20?%;color:#c3c3c3}.submitBtn[data-v-11f4c774]{margin:0 %?30?%;width:%?690?%;padding:%?21?% 0;text-align:center;background:-webkit-gradient(linear,right top,left top,from(#e0ba94),to(#efd1b3));background:-o-linear-gradient(right,#e0ba94,#efd1b3);background:linear-gradient(-90deg,#e0ba94,#efd1b3);border-radius:39px;color:#fff;margin-top:%?20?%}.payBtn[data-v-11f4c774]{margin:0 %?30?%;border:%?1?% solid #f0ad4e}.imageshadow[data-v-11f4c774]{width:100%;background-color:rgba(0,0,0,.8);height:100vh;position:fixed;z-index:999;top:0;left:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}.shadowItem[data-v-11f4c774]{padding:%?50?%}.shadowItem>uni-image[data-v-11f4c774]:first-of-type{width:%?464?%;height:%?304?%;display:block}.shadowItem>uni-image[data-v-11f4c774]:nth-of-type(2){width:%?241?%;height:%?86?%;display:block;margin-top:%?50?%;margin-left:%?100?%}.bto-bar-commit[data-v-11f4c774]{font-size:%?26?%;color:#fff;width:%?156?%;height:%?54?%;background:-webkit-gradient(linear,right top,left top,from(#e0ba94),to(#efd1b3));background:-o-linear-gradient(right,#e0ba94,#efd1b3);background:linear-gradient(-90deg,#e0ba94,#efd1b3);border-radius:%?27?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;margin-right:%?30?%}.bto-bar-headerTitle[data-v-11f4c774]{color:#e01212;font-size:%?26?%;font-weight:400}.bto-bar-header[data-v-11f4c774]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;margin-left:%?30?%}.bto-bar[data-v-11f4c774]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:%?32?%;font-weight:400}body.?%PAGE?%[data-v-11f4c774]{background:#fff}",""])},"7c9d":function(e,t,i){"use strict";i.r(t);var a=i("ef83"),n=i("3f97");for(var o in n)"default"!==o&&function(e){i.d(t,e,function(){return n[e]})}(o);i("8a47");var s=i("2877"),r=Object(s["a"])(n["default"],a["a"],a["b"],!1,null,"11f4c774",null);t["default"]=r.exports},"8a47":function(e,t,i){"use strict";var a=i("a7f4"),n=i.n(a);n.a},a7f4:function(e,t,i){var a=i("6756");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("d2cdbf08",a,!0,{sourceMap:!1,shadowMode:!1})},ef83:function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.taskInfo?i("v-uni-view",[i("v-uni-view",{staticClass:"banner"},[i("v-uni-image",{attrs:{src:"../../static/greenChannel/zhuashurenw@2x.png",mode:""}})],1),i("v-uni-view",{staticClass:"taskBox"},[i("v-uni-view",{staticClass:"taskTitle"},[e._v("任务情况")]),i("v-uni-view",{staticClass:"taskDes"},[i("v-uni-text",[e._v("邀请好友激活魔小秘会员")]),i("v-uni-text",[e._v("("+e._s(e.taskInfo.completeCount)+"/"+e._s(e.taskInfo.destCount)+")")])],1),i("v-uni-view",{staticClass:"cu-progress round sm striped progress"},[i("v-uni-view",{staticClass:"bg-yellow",style:{width:e.progress+"%"}})],1),i("v-uni-view",{staticClass:"taskEnd"},[e.taskInfo.completeCount==e.taskInfo.destCount?i("v-uni-image",{attrs:{src:"../../static/greenChannel/xufei@2x.png",mode:""}}):i("v-uni-text",[e._v("完成任务，可获取永久续费折扣福利")])],1)],1),i("v-uni-view",{staticClass:"division"}),i("v-uni-view",{staticClass:"discountBox"},[i("v-uni-view",{staticClass:"discountTitle",class:e.taskInfo.completeCount==e.taskInfo.destCount?"lock":"unlock"},[i("v-uni-text",[e._v("折扣专区")]),i("v-uni-text",[e._v(e._s(e.taskInfo.completeCount==e.taskInfo.destCount?"已解锁":"尚未解锁"))])],1),i("v-uni-view",{staticClass:"saleContain"},e._l(e.goodslist,function(t,a){return i("v-uni-view",{key:a,staticClass:"saleItem checkedBg",class:e.saleItem==a?"checkedBg":"uncheckedBg",on:{click:function(i){i=e.$handleEvent(i),e.checkSaleItem(a,t.sku,t.priceDes,t.price)}}},[i("v-uni-text",{staticClass:"fontStyle30"},[e._v(e._s(t.cardTitle))]),i("v-uni-view",{staticClass:"price"},[i("v-uni-text",{staticStyle:{"font-size":"30rpx"}},[e._v("￥")]),i("v-uni-text",[e._v(e._s(t.greenPrice))])],1),i("s",{class:e.saleItem==a?"orignalPrice":"orignalPrice1"},[i("v-uni-view",[i("v-uni-text",{staticStyle:{"font-size":"20rpx"}},[e._v("￥")]),i("v-uni-text",{staticStyle:{"font-size":"28rpx"}},[e._v(e._s(t.oldPriceDes))])],1)],1)],1)}),1)],1),e.taskInfo.completeCount==e.taskInfo.destCount?i("v-uni-view",{staticClass:"bto-bar cu-bar foot",staticStyle:{bottom:"0px",background:"#FFFFFF"}},[i("v-uni-view",{staticClass:"bto-bar-header"},[i("v-uni-view",{staticClass:"bto-bar-headerTitle"},[e._v("￥"),i("v-uni-text",{staticStyle:{"font-size":"40rpx"}},[e._v("12")])],1)],1),i("v-uni-view",{staticClass:"bto-bar-commit",on:{click:function(t){t=e.$handleEvent(t),e.pay(t)}}},[e._v("立即支付")])],1):i("v-uni-view",{staticClass:"submitBtn",on:{click:function(t){t=e.$handleEvent(t),e.greenShare(t)}}},[e._v("立即完成任务")]),e.imageshow?i("v-uni-view",{staticClass:"imageshadow"},[i("v-uni-view",{staticClass:"shadowItem"},[i("v-uni-image",{attrs:{src:"../../static/greenChannel/wanctip@2x.png",mode:""}}),i("v-uni-image",{attrs:{src:"../../static/invite/wozhidao@2x.png",mode:""},on:{click:function(t){t=e.$handleEvent(t),e.close(t)}}})],1)],1):e._e()],1):e._e()},n=[];i.d(t,"a",function(){return a}),i.d(t,"b",function(){return n})}}]);