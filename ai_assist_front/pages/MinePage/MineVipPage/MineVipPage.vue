<template>
	<view v-if="infoData">
		<!-- 顶部信息 -->
		<view class="topHeader">
			<image class="userHeader" src="../../../static/logoHead.png" mode="" style="border-radius: 150rpx;"></image>
			<view class="userInfo">
				<view class="userName">
					{{infoData.userName}}
				</view>
				<view class="userTime" v-if="infoData.vipEndTime == null">
					立即续费	
				</view>
				<view class="userTime" v-if="infoData.vipEndTime !== null">
					会员到期时间      {{getTime}}
				</view>
			</view>
		</view>

			<!-- 限时特惠 -->
			<view class="limitSale">
				<view class="saleTile">
					<text class="fontStyle32 weight">限时特惠</text>
					<text @click="camolo">卡密激活</text>
				</view>
				<view class="saleContain">
					<view v-for="(item,index) in goodslist" :key="index" class="saleItem checkedBg" :class="saleItem == index?'checkedBg':'uncheckedBg'" @click="checkSaleItem(index,item.sku,item.priceDes,item.price)">
						<text class="fontStyle30">{{item.cardTitle}}</text>
						<view class="price">
							<text style="font-size: 30rpx;">￥</text>
							<text>{{item.priceDes}}</text>
						</view>
						<s :class="saleItem == index?'orignalPrice':'orignalPrice1'">
							<view>
								<text style="font-size: 20rpx;">￥</text>
								<text style="font-size: 28rpx;">{{item.oldPriceDes}}</text>
							</view>
						</s>
					</view>
				</view>
			</view>



	
		<!-- 权益列表 -->
		<view class="levelEquity-list">
			<view class="levelPage-list-header">
				<text class="fontStyle32 weight">会员权益</text>
			</view>

			<!-- 宫格分类 -->
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view style="margin-top: -30rpx;" class="cu-item" @click="gridClick(index)" v-for="(item,index) in topCate" :key="index"
				 v-if="index<gridCol*2">
					<image style="width: 110rpx; height: 110rpx;" :src="item.icon" mode=""></image>
					<text style="margin-top: -5rpx;">{{item.title}}</text>
				</view>
			</view>
		</view>

		<!-- 分割线 -->
		<view class="lineView">

		</view>

		<!-- 优惠券 -->
		<view class="vip-item" @click="couponsDetail">
			<view class="vip-itemTitle">
				优惠券
			</view>
			<view class="vip-itemFooter" style="display: flex;flex-direction: row; align-items: center;">
				<view class="vip-itemFooterTitle">
					<span v-if="this.couponData.userCoupon == '' || this.couponData.userCoupon == null ">暂无可用</span>
					<span v-else>1张可用</span>
				</view>
				<image  v-if="this.couponData.userCoupon !== null " style="height: 23rpx; width: 15rpx; margin-left: 15rpx;" src="../../../static/mine/VIPPage/jinru@2x.png"
				 mode=""></image>
			</view>
		</view>
		<view class="lineView-line">

		</view>

		<!-- 优惠券 -->
		<view class="vip-item">
			<view class="vip-itemTitle">
				支付方式
			</view>
			<view class="vip-itemFooter" style="display: flex;flex-direction: row; align-items: center;">
				<view class="vip-itemFooterTitle">
					微信支付
				</view>
		<!-- 		<image style="height: 23rpx; width: 15rpx; margin-left: 15rpx;" src="../../../static/mine/VIPPage/jinru@2x.png"
				 mode=""></image> -->
			</view>
		</view>
		<view class="block"></view>
		<view class="lineView-line">

		</view>

		<view class="bto-bar cu-bar foot" style="bottom: 0px; background: #FFFFFF;">
			<view class="bto-bar-header">
				<view class="bto-bar-headerTitle">
					￥
					<text style="font-size: 40rpx;">{{couponData.payPrice}}</text>
				</view>
				<view v-if="couponData.couponPrice !== '0.00'" style="color: #999999; font-size: 22rpx; margin-left: 15rpx;">
					已节约{{couponData.couponPrice}}元
				</view>
			</view>
			<view class="bto-bar-commit" @click="vipPay">
				立即支付
			</view>
		<!-- 	<view class="bto-bar-commit" @click="toastTip">
				立即支付
			</view> -->
		</view>

		<!-- 弹框 -->
		<view class="cu-modal" :class="modalName=='Image'?'show':''">
			<view class="cu-dialog" style="background-color: rgba(1, 1, 1, 0);">
				<image style="width: 490rpx; height: 554rpx;" src="../../../static/mine/VIPPage/beimian@2x.png" mode="">
					<view class="tipsView">
						<view class="tipsTitle">
							{{modalData[imageIndex].title}}
						</view>
						<view class="tipsContent">
							{{modalData[imageIndex].content}}
						</view>

						<view class="tipsClose" @click="tipsCloseClick()">
							关闭
						</view>
					</view>
				</image>
			</view>
		</view>
	</view>
</template>

<script>
	import {GOODSLIST,BEFORODER,CREATEORDER,MYINFO} from "../../../utils/api.js"
	export default {
		data() {
			return {
				modalName: null,
				saleItem: 0,
				levelModel: null,
				gridBorder: false,
				gridCol: 4,
				vipSku:"100001",
				goodslist:"",
				topCate: [{
						title: "智能代接",
						icon: "../../../static/mine/VIPPage/daijie@2x.png"
					},
					{
						title: "智能识别",
						icon: "../../../static/mine/VIPPage/shibie@2x.png"
					},
					{
						title: "个性回应",
						icon: "../../../static/mine/VIPPage/huiying@2x.png"
					},
					{
						title: "场景覆盖",
						icon: "../../../static/mine/VIPPage/fugai@2x.png"
					}
				],
				modalData:[{
					title: '智能代接',
					content: '骚扰来电、飞行、无服务、无网络模式开会、睡觉、玩游戏等不方便接听'
				},
				{
					title: '智能识别',
					content: '房产推销、股票推荐、贷款推销、教育推销、保险推销智能识别，一键拒接。'
				},
				{
					title: '个性回应',
					content: '自定开场白、回复音色；快递、外卖场景自定义回复'
				},
				{
					title: '场景覆盖',
					content: '快递、外卖、推销、广告、金融、催收'
				}
				],
				payPrice: '',
				savePrice: '',
				infoData:'',
				couponData: '',
				imageIndex: 0,
				couponId: ''
			}
		},
		computed:{
			getTime: function() {
				var time = this.infoData.vipEndTime
				var result = String(time).split(" ")[0]
				return result
			}
		},
		onLoad() {
			uni.showToast({
				title:'加载中...',
				icon:'none',
				mask:true
			})
			//卡列表
			this.getCard()
			// 优惠券
			this.getCoupons()
			// 我的信息
			this.getMyInfo()
		},
		methods: {
			// 卡列表
			getCard(){
				const params = {}
				this.$request.url_request(GOODSLIST,params,"GET",res =>{
					this.goodslist = JSON.parse(res.data).data
					this.payPrice = JSON.parse(res.data).data[0].priceDes
					this.savePrice = JSON.parse(res.data).data[0].price
				},err =>{})
			},
			// 卡密激活
			camolo() {
				uni.navigateTo({
					url:'../../camilo/camilo?type=2'
				})
			},
			// 获取优惠券信息
			getCoupons(){
				const params = {
					sku:this.vipSku,
				}
				this.$request.url_request(BEFORODER,params,"POST",res =>{
					this.couponData = JSON.parse(res.data).data
					if(this.couponData.userCoupon){
						this.couponId = this.couponData.userCoupon.id
					} else {
						this.couponId = ''
					}
				},err =>{})
			},
			// 获取我的信息
			getMyInfo(){
				const params = {}
				this.$request.url_request(MYINFO,params,"GET",res=>{
					this.infoData = JSON.parse(res.data).data
					uni.hideToast()
				},err=>{})
			},
			gridClick(index) {
				this.imageIndex = index
				this.modalName = "Image";
			},
			tipsCloseClick() {
				this.modalName = "";
			},
			checkSaleItem(index,sku,priceD,total) {
				this.saleItem = index;
				this.vipSku = sku
				this.getCoupons()
				this.payPrice = priceD
				this.savePrice = total
				
			},
			goback(){
				uni.navigateBack({
					delta:1
				})
			},
			// 优惠券详情
			couponsDetail(){
				uni.navigateTo({
					url:"../Coupons/Coupons?sku="+this.vipSku
				})
			},
			// 支付
			vipPay() {
				console.log("优惠券id",this.couponId)
				const params = {
					sku: this.vipSku,
					couponId: this.couponId
				}
				this.$request.url_request(CREATEORDER, params, "POST", res => {
					this.payData = JSON.parse(res.data)
					if (typeof WeixinJSBridge == "undefined"){
					   if( document.addEventListener ){
					       document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
					   }else if (document.attachEvent){
					       document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady); 
					       document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
					   }
					}else{
					   this.onBridgeReady();
					}
					
				}, err => {})
			},
			//  支付
			onBridgeReady(){
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": this.payData.appId, //公众号名称，由商户传入     
						"timeStamp": this.payData.timeStamp, //时间戳，自1970年以来的秒数     
						"nonceStr": this.payData.nonceStr, //随机串     
						"package": this.payData.packageValue,
						"signType": this.payData.signType, //微信签名方式：     
						"paySign": this.payData.paySign //微信签名 
					},
					function(res) {
						if (res.err_msg == "get_brand_wcpay_request:ok") {
								uni.reLaunch({
									url:'../MinePage'
								})
							// 使用以上方式判断前端返回,微信团队郑重提示：
							//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
						}
					}
				)
			},
			toastTip(){
				uni.showModal({
					content: '太火爆啦！魔小秘今日注册名额已超限！优惠将于明日00:00重新开启！',
					showCancel: false
				});
			}
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
	.limitSale {
		margin: 30rpx 30rpx 30rpx 30rpx;
	}
	
	.saleTile {
		margin: 30rpx 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.saleTile>text:nth-of-type(2) {
		font-size: 26rpx;
		color: #333333;
	}
	
	.saleContain {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.saleItem {
		background-size: cover;
		width: 200rpx;
		height: 248rpx;
		text-align: center;
		padding: 30rpx;
	}
	
	.checkedBg {
		background-image: url('~@/static/welcome/huiyuan@2x.png');
		position: relative;
	}
	
	.checkedBg:after {
		content: "折扣";
		font-size: 22rpx;
		color: #FFFFFF;
		width: 100rpx;
		position: absolute;
		left: 126rpx;
		top: 14rpx;
		transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		/* IE 9 */
		-moz-transform: rotate(45deg);
		/* Firefox */
		-webkit-transform: rotate(45deg);
		/* Safari 和 Chrome */
		-o-transform: rotate(45deg);
	}
	
	.uncheckedBg {
		background-image: url('~@/static/welcome/huiyuan1@2x.png');
	}
	
	.price {
		margin: 36rpx 0;
		font-size: 40rpx;
		color: #111111;
	}
	
	.orignalPrice {
		font-size: 20rpx;
		color: #FFFFFF;
	}
	
	.orignalPrice1 {
		font-size: 20rpx;
		color: #C3C3C3;
	}
	
	
	
	
	/* 弹窗 */
	.tipsClose {
		width: 150rpx;
		height: 60rpx;

		border-radius: 30rpx;
		background: linear-gradient(0deg, rgba(233, 197, 162, 1), rgba(227, 190, 153, 1));
		box-shadow: 0px 3rpx 9rpx 0px rgba(212, 177, 141, 0.6);
		
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		
		margin-top: 40rpx;
	}

	.cu-dialog {
		position: relative;
	}

	.tipsContent {
		color: #111111;
		font-size: 30rpx;
		font-weight: 400;

		margin-top: 60rpx;
	}

	.tipsTitle {
		color: #111111;
		font-size: 34rpx;
		font-weight: 400;
	}

	.tipsView {
		position: absolute;
		top: 90rpx;

		margin-left: 160rpx;
		margin-right: 160rpx;
		
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.block{
		/* border: 1rpx solid #4CD964; */
		height: 120rpx;
	}
	/* 底部Bar */
	.bto-bar-commit {
		font-size: 26rpx;
		color: #FFFFFF;
		width: 156rpx;
		height: 54rpx;

		background: linear-gradient(-90deg, rgba(224, 186, 148, 1), rgba(239, 209, 179, 1));
		border-radius: 27rpx;

		display: flex;
		justify-content: center;
		align-items: center;

		margin-right: 30rpx;
	}

	.bto-bar-headerTitle {
		color: #E01212;
		font-size: 26rpx;
		font-weight: 400;
	}

	.bto-bar-header {
		display: flex;
		flex-direction: row;
		align-items: center;

		margin-left: 30rpx;
	}

	.bto-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;

		font-size: 32rpx;
		font-weight: 400;
	}

	/* 细分割线 */
	.lineView-line {
		height: 2rpx;
		background-color: #F4F4F4;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	/* 底部Item */
	.vip-itemFooterTitle {
		font-size: 26rpx;
		color: #999999;
	}

	.vip-itemTitle {
		color: #333333;
		font-size: 30rpx;
		font-weight: 400;
	}

	.vip-item {
		height: 108rpx;
		display: flex;
		justify-content: space-between;

		align-items: center;

		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	/* 分割线 */
	.lineView {
		height: 20rpx;
		background-color: #F4F4F4;
	}

	/* 会员权益 */
	.cu-item {
		display: flex;
		align-items: center;
	}

	/* 顶部信息 */
	.userTime {
		font-size: 26rpx;
		color: #CB9D50;
		margin-top: 10rpx;
	}

	.userName {
		font-size: 34rpx;
		font-weight: 400;
	}

	.userInfo {
		margin-left: 25rpx;
	}

	.userHeader {
		width: 110rpx;
		height: 110rpx;
		margin-left: 50rpx;
	}

	.topHeader {
		margin-top: 20rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		height: 235rpx;
		background-image: url(~@/static/mine/VIPPage/kapian@2x.png);
		background-size: cover;
	/* 	border-radius: 20rpx;
		background-color: #282827; */
		display: flex;
		align-items: center;
		color: #FFFFFF;
	}


	.moneyTips {
		font-size: 40rpx;
	}

	.levelPage-list-tips {
		background-color: #FFFFFF;
		width: 100%;
		font-size: 24rpx;
		font-weight: 400;
		color: rgba(96, 105, 114, 1);

		height: 80rpx;
		display: flex;
		align-items: center;
		padding-left: 40rpx;
		padding-right: 40rpx;
	}

	.levelPage-list-tipsContent {
		width: 100%;
	}

	.levelPage-list-title {
		font-size: 30rpx;
		font-weight: 400;
		color: #333333;
	}

	.levelPage-list-money {
		margin-top: 20rpx;
		font-size: 40rpx;
		font-weight: 400;
		color: #111111;
	}

	.levelPage-list-old-se {
		margin-top: 20rpx;
		font-size: 20rpx;
		font-weight: bold;
		color: #C3C3C3;

		text-decoration: line-through;
	}

	.levelPage-list-old {
		margin-top: 20rpx;
		font-size: 20rpx;
		font-weight: bold;
		color: #FFFFFF;

		text-decoration: line-through;
	}

	.levelPage-list-body {
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;

		padding-left: 40rpx;
		padding-right: 40rpx;
		padding-bottom: 10rpx;
	}

	.levelPage-list-item {
		height: 248rpx;
		width: 200rpx;

		background: linear-gradient(-45deg, rgba(228, 188, 150, 1) 0%, rgba(249, 228, 206, 1) 100%);
		;
		border: 2rpx solid rgba(221, 188, 155, 1);
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.levelPage-list-item-un {
		height: 240rpx;
		width: 200rpx;

		background: rgba(255, 255, 255, 1);
		border: 2rpx solid rgba(221, 188, 155, 1);
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.levelPage-list-header {
		height: 100rpx;
		background-color: #FFFFFF;

		font-size: 32rpx;
		font-weight: 500;
		color: rgba(29, 32, 35, 1);

		display: flex;
		align-items: center;

		padding-left: 30rpx;
		margin-top: -5rpx;
	}
</style>
