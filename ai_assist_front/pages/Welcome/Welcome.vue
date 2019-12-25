<template>
	<view>
		<view class="welcome">
			<!-- 首页标题文字 -->
			<view class="welTitle">
				<text>欢迎使用魔小秘</text>
				<text>您知道魔小秘是怎么工作的吗</text>
			</view>
			<view style="width: 700rpx;">
				<text class="font301">魔小秘是针对不同场景设置呼叫转移为您接听电话的，比如这四种场景：</text>
			</view>
			<!-- 场景描述view -->
			<view class="wel-sceneDes">
				<view class="sceneDesContain" v-for="(item,index) in sceneDesItem" :key="index">
					<view class="sceneDesItem">
						<image :src="item.icon" mode=""></image>
						<text>{{item.text}}</text>
					</view>
				</view>
			</view>
			<!-- 		视频播放
			<view class="wel-video">
				<video class="myVideo" src="https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
				 @error="videoErrorCallback"></video>
			</view> -->
			<!-- 限时特惠 -->
			<view class="limitSale">
				<view class="saleTile">
					<text class="fontStyle32 weight">限时特惠</text>
					<text @click="camilo">卡密激活</text>
				</view>
				<view class="saleContain">
					<view v-for="(item,index) in goodslist" :key="index" class="saleItem checkedBg" :class="saleItem == index?'checkedBg':'uncheckedBg'"
					 @click="checkSaleItem(index,item.sku,item.priceDes,item.price)">
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

		</view>
		<!-- 优惠券-->
		<view>
			<view class="coupons welcome">
				<view class="cu-list menu">
					<view class="cu-item" style="margin: 0;padding: 0;" @click="welCoupons">
						<view class="content">
							<text class="fontStyle30">优惠券</text>
							<view>
								<text class="greyTextXs" v-if="couponsInfo == null">暂无可用</text>
								<text class="greyTextXs" v-else>1张可用</text>
								<text class="cuIcon-right" style="color: #C2C2C2;"></text>
							</view>
						</view>
					</view>
					<view class="cu-item pay"  style="margin: 0;padding: 0;">
						<view class="content">
							<text class="fontStyle30">支付方式</text>
							<view>
								<text class="greyTextXs">微信支付</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 110rpx;">

			</view>
			<!-- 立即支付 -->
			<view class="welcome">
				<view class="smLine"></view>
			</view>

			<view class=" cu-bar bto-bar bottomBar foot">
				<view class="bto-bar-header">
					<view class="bto-bar-headerTitle" style="color: #E01212;">
						￥
						<text style="font-size: 40rpx;">{{couponData.payPrice}}</text>
					</view>
					<view v-if="couponData.couponPrice !== '0.00'" style="color: #999999; font-size: 22rpx; margin-left: 15rpx;">
						已节约{{couponData.couponPrice}}元
					</view>
				</view>
				<view class="bto-bar-commit" style="padding: 26rpx 0;border-radius: 100rpx;" @click="welcomePay">
					立即支付
				</view>
			</view>

		</view>
	</view>

</template>

<script>
	var curToken
	import {
		CREATEORDER,
		GOODSLIST,
		BEFORODER
	} from "../../utils/api.js"
	export default {
		data() {
			return {
				sceneDesItem: [{
						text: "专业反骚扰；有效应对骚扰类电话，让ta不敢再打扰",
						icon: "../../static/welcome/fansaorao@2x.png"
					},
					{
						text: "反暴力催收；有效应对暴力催收电话，并且可留存证据",
						icon: "../../static/welcome/baolicuishou@2x.png"
					},
					{
						text: "探明电话来意；有效探明陌生电话来电目的节省时间。",
						icon: "../../static/welcome/gexinghuiying@2x.png"
					},
					{
						text: "智能代接；会议期间，可由机器人代接电话实时查看聊天内容。",
						icon: "../../static/welcome/zhinengdaijie@2x.png"
					}
				],
				saleItem: 0,
				getToken: "",
				payData: "",
				goodslist: "",
				vipSku: "100001",
				payPrice: '',
				savePrice: '',
				couponsInfo: '',
				couponData: '',
				couponId: ''
			}
		},
		onLoad() {
			// 获取token
			this.initData()
			//卡列表
			this.getCard()
			// 优惠券
			this.getCoupons()
		},
		computed: {
			savePriceC: function() {
				var result = this.savePrice - this.payPrice
				return result
			}
		},
		methods: {
			// 卡列表
			getCard() {
				const params = {}
				this.$request.url_request(GOODSLIST, params, "GET", res => {
					this.goodslist = JSON.parse(res.data).data
					this.payPrice = JSON.parse(res.data).data[0].priceDes
					this.savePrice = JSON.parse(res.data).data[0].price
				}, err => {})
			},
			// 获取优惠券信息
			getCoupons() {
				const params = {
					sku: this.vipSku
				}
				this.$request.url_request(BEFORODER, params, "POST", res => {
					this.couponsInfo = JSON.parse(res.data).data.userCoupon
					this.couponData = JSON.parse(res.data).data
					if(JSON.parse(res.data).data.userCoupon){
						this.couponId = JSON.parse(res.data).data.userCoupon.id
					} else {
						this.couponId = ''
					}
				}, err => {})
			},
			// 优惠券详情
			welCoupons() {
				// if (this.couponsInfo !== null) {
				uni.navigateTo({
					url: "../MinePage/Coupons/Coupons?sku=" + this.vipSku
				})
				// }
			},
			getQueryString(name) {
				var after = window.location.search
				if (after.indexOf('?') === -1) {}
				after = window.location.href.split("?")[1] || after.substr(1);
				if (after) {
					var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
					var r = after.match(reg)
					if (r !== null) {
						return decodeURIComponent(r[2]);
					} else {
						return null
					}
				}
			},
			// 获取token
			initData() {
				curToken = this.getQueryString('token')
				if (!curToken) {
					uni.navigateTo({
						url: "../JumpLogin/JumpLogin"
					})
				} else {
					try {
						uni.setStorageSync('myToken', curToken)
					} catch (e) {}
				}
				// uni.setStorage({
				// 	key:'myToken',
				// 	data:this.getQueryString('token')
				// })
			},
			// 视频播放出错
			videoErrorCallback() {},
			// 卡密
			camilo() {
				uni.navigateTo({
					url:"../camilo/camilo?type=1"
				})
			},
			// 选择优惠
			checkSaleItem(num, sku, priceD, total) {
				this.saleItem = num
				this.vipSku = sku
				this.getCoupons()
				this.payPrice = priceD
				this.savePrice = total
			},
			// 支付
			welcomePay() {
				const params = {
					sku: this.vipSku,
					couponId: this.couponId
				}
				this.$request.url_request(CREATEORDER, params, "POST", res => {
					this.payData = JSON.parse(res.data)
					if (typeof WeixinJSBridge == "undefined") {
						if (document.addEventListener) {
							document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
						} else if (document.attachEvent) {
							document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
							document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
						}
					} else {
						this.onBridgeReady();
					}

				}, err => {})
			},
			// 支付
			onBridgeReady() {
				var _this = this
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
								// url: 'guide/guide'
								url:'guideNew/guideNew'
							})
							// 使用以上方式判断前端返回,微信团队郑重提示：
							//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
						}
					}
				)
			}
		},
	}
</script>

<style>
	page {
		background-color: #F4F4F4;
	}

	.welcome {
		padding: 0 30rpx;
		overflow: hidden;
		background-color: #FFFFFF;
	}

	.welTitle {
		text-align: center;
		padding-top: 42rpx;
	}

	.welTitle>text:nth-of-type(1) {
		color: #111111;
		font-size: 46rpx;
		font-weight: 600;
		display: block
	}

	.welTitle>text:nth-of-type(2) {
		color: #999999;
		font-size: 30rpx;
		display: block;
		margin-top: 18rpx;
		margin-bottom: 49rpx;
	}

	.wel-sceneDes {
		margin: 50rpx 0;
	}

	.sceneDesContain {
		box-sizing: border-box;
		border-radius: 10rpx;
		margin: 30rpx 0;
		padding: 3rpx;
		background-image: -webkit-linear-gradient(left, #6CA6FF 0%, #6CA6FF 30%, #996CFF 60%, #996CFF 90%);
	}

	.sceneDesItem {
		border-radius: 10rpx;
		padding: 30rpx 20rpx 10rpx 20rpx;
		display: flex;
		align-items: center;
		background-color: #FAFCFF;
		overflow: hidden;
	}

	.sceneDesItem>image {
		width: 80rpx;
		height: 80rpx;
	}

	.sceneDesItem>text {
		max-width: 560rpx;
		color: #333333;
		font-size: 28rpx;
		margin-left: 10rpx;
		margin-top: -30rpx;
	}

	.wel-video {
		width: 100%;
		border-radius: 10rpx;
	}

	.myVideo {
		width: 100%;
		height: 292rpx;
		border-radius: 20rpx;
	}

	.limitSale {
		margin: 30rpx 0 50rpx 0;
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

	.coupons {
		margin-top: 15rpx;
	}

	.content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.content>view {
		display: flex;
		align-items: center;
	}

	.content>view>text:nth-of-type(1) {
		margin-right: 10rpx;
	}

	/* 立即支付 */
	.bto-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		font-weight: 400;
	}

	.bto-bar-header {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 30rpx;
	}

	. .bto-bar-headerTitle {
		color: #E01212;
		font-size: 26rpx;
		font-weight: 400;
	}

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

	.bottomBar {
		background-color: #FFFFFF;
		padding: 30rpx 0;
	}
</style>
