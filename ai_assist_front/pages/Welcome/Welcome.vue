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
			<!-- 限时特惠 -->
			<view class="limitSale">
				<view class="saleTile">
					<text class="fontStyle32 weight">限时特惠</text>
					<text @click="camilo">卡密激活</text>
				</view>
				<view class="saleContain">
					<!-- 周卡 -->
					<view v-for="(item,index) in goodslist" v-if="item.sku == '100004'" :key="index" class="saleItem checkedBg1"
					 :class="saleItem == index?'checkedBg1':'uncheckedBg1'" @click="checkSaleItem(index,item.sku,item.priceDes,item.price)">
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
					<!-- 月卡、季卡、年卡 -->
					<view v-for="(item,index) in goodslist" v-if="item.sku != '100004'" :key="index" class="saleItem checkedBg" :class="saleItem == index?'checkedBg':'uncheckedBg'"
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
					<view class="cu-item pay" style="margin: 0;padding: 0;">
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


			<!--体验卡  -->
			<view class=" cu-bar bto-bar bottomBar foot" v-if="saleItem == 0">
				<view class="bto-bar-header">
					<view class="bto-bar-headerTitle" style="color: #E01212;">
						￥
						<text style="font-size: 40rpx;">{{couponData.payPrice}}</text>
					</view>
				</view>
				<view class="paybtnGroup">
					<view style="margin-right: 12rpx;" class="shareTextBtn" v-if="vipSku == '100004'">
						<text class="shareText" @click="welcomeShare">分享免费领取</text>
					</view>
					<view class="bto-bar-commit" style="padding: 26rpx 0;border-radius: 100rpx;" @click="welcomePay">
						立即支付
					</view>
				</view>

			</view>
			<!-- 月卡、年卡、季卡 -->
			<view class=" cu-bar bto-bar bottomBar foot" v-else>
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
		<view class="imageshadow clear" v-show="imageShadow">
			<image src="../../static/welcome/neirong@2x.png" mode="" class="imageContent"></image>
			<view class="shareClick" @click="closeShadow">
				<image src="../../static/invite/wozhidao@2x.png" mode=""></image>
			</view>
		</view>
	</view>

</template>

<script>
	var curToken
	import {
		CREATEORDER,
		GOODSLIST,
		BEFORODER,
		JSAPI,
		SHARECARD
	} from "../../utils/api.js"
	var jweixin = require('jweixin-module')
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
				saleItem: 1,
				getToken: "",
				payData: "",
				goodslist: "",
				vipSku: "100001",
				payPrice: '',
				savePrice: '',
				couponsInfo: '',
				couponData: '',
				couponId: '',
				imageShadow: false,
				transferData:''
			}
		},
		onLoad(options) {
			if(options.data){
				this.transferData = JSON.parse(options.data)
				console.log(this.transferData)
				this.saleItem = this.transferData.item
				this.couponId = this.transferData.id
				this.vipSku = this.transferData.sku
			}
			// 获取token
			this.initData()
			//卡列表
			this.getCard()
			// 优惠券
			this.getCoupons()
			// 获得JSSDK
			this.getJSAPI()
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
					sku: this.vipSku,
					couponId: this.couponId
				}
				this.$request.url_request(BEFORODER, params, "POST", res => {
					this.couponsInfo = JSON.parse(res.data).data.userCoupon
					this.couponData = JSON.parse(res.data).data
					if (JSON.parse(res.data).data.userCoupon) {
						this.couponId = JSON.parse(res.data).data.userCoupon.id
					} else {
						this.couponId = ''
					}
				}, err => {})
			},
			// 优惠券详情
			welCoupons() {
				// if (this.couponsInfo !== null) {
					var data = {
						sku: this.vipSku,
						item: this.saleItem,
						page: 1
					}
				uni.navigateTo({
					url: "../MinePage/Coupons/Coupons?data=" + JSON.stringify(data)
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
					curToken = uni.getStorageSync('myToken')
					if(!curToken){
						uni.navigateTo({
							url: "../JumpLogin/JumpLogin"
						})
					}
				} else {
					try {
						uni.setStorageSync('myToken', curToken)
					} catch (e) {}
				}
			},
			// 视频播放出错
			videoErrorCallback() {},
			// 周卡分享免费
			welcomeShare() {
				uni.report('welcomeShare', '分享领取')
				var that = this
				this.imageShadow = true
				// 分享到朋友
				jweixin.onMenuShareAppMessage({
					title: '【魔小秘】您的专属智能来电助理', // 分享标题
					desc: '不想接，就挂断，来电助理帮你接听', // 分享描述
					link: 'https://m.checkshirt-ai.com/h5poster/index.html#/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: 'https://ai-assist.oss-cn-beijing.aliyuncs.com/aac/mxmlogo.png', // 分享图标
					type: 'link', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
						// 用户点击了分享后执行的回调函数
						const params = {}
						that.$request.url_request(SHARECARD, params, 'POST', res => {
							that.imageShadow = false
							uni.reLaunch({
								url: 'guideNew/guideNew'
							})
						}, err => {})
					}
				})
				//分享到朋友圈
				jweixin.onMenuShareTimeline({
					title: '【魔小秘】您的专属智能来电助理', // 分享标题
					link: 'https://m.checkshirt-ai.com/h5poster/index.html#/',
					imgUrl: 'https://ai-assist.oss-cn-beijing.aliyuncs.com/aac/mxmlogo.png', // 分享图标
					success: function() {
						// 用户点击了分享后执行的回调函数
						const params = {}
						that.$request.url_request(SHARECARD, params, 'POST', res => {
							that.imageShadow = false
							uni.reLaunch({
								url: 'guideNew/guideNew'
							})
						}, err => {})
					}
				})
			},
			// 关闭遮罩
			closeShadow() {
				this.imageShadow = false
			},
			// 获得JSAPI
			getJSAPI() {
				var that = this
				const params = {}
				this.$request.url_request(JSAPI, params, "GET", res => {
					this.jsData = JSON.parse(res.data).data
					console.log("得到的签名", this.jsData.signature)
					jweixin.config({
							appId: this.jsData.appId,
							timestamp: this.jsData.timestamp,
							nonceStr: this.jsData.nonceStr,
							signature: this.jsData.signature,
							jsApiList: ['updateAppMessageShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline']
						}),
						jweixin.ready(function() {
							console.log("接口处理成功")
						}),
						jweixin.error(function() {
							console.log("接口处理失败")
						})
				}, err => {})
			},
			// 卡密
			camilo() {
				uni.navigateTo({
					url: "../camilo/camilo?type=1"
				})
			},
			// 选择优惠
			checkSaleItem(num, sku, priceD, total) {
				this.saleItem = num
				this.vipSku = sku
				console.log('当前选择的sku', this.vipSku)
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
								url: 'guideNew/guideNew'
							})
							// 使用以上方式判断前端返回,微信团队郑重提示：
							//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
						}
					}
				)
			},
			toastTip() {
				uni.showModal({
					content: '太火爆啦！魔小秘今日注册名额已超限！优惠将于明日00:00重新开启！',
					showCancel: false
				});
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
	.shareTextBtn{
		font-size: 26rpx;
		color: #FFFFFF;
		height: 54rpx;
		padding: 0 10rpx;
		border: 1rpx solid #D5A06E;
		border-radius: 27rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 30rpx;
	}
	.shareText {
		background: linear-gradient(to right, #D5A06E, #B18153);
		-webkit-background-clip: text;
		color: transparent;
		font-size: 24rpx;
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
		/* flex-wrap: nowrap; */
		overflow-x: scroll;
	}

	.saleItem {
		flex-shrink: 0;
		background-size: cover;
		width: 193rpx;
		height: 252rpx;
		text-align: center;
		padding: 30rpx;
		margin: 0 10rpx;
	}

	.checkedBg {
		background-image: url('~@/static/welcome/yueka@2x.png');
		position: relative;
	}

	.uncheckedBg {
		background-image: url('~@/static/welcome/yuka-wei@2x.png');
	}

	.checkedBg1 {
		background-image: url('~@/static/welcome/huiyuan-2@2x.png');
		position: relative;
	}

	.uncheckedBg1 {
		background-image: url('~@/static/welcome/huiyuan-1@2x.png');
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

	.shareBtn {
		font-size: 26rpx;
		color: #FFFFFF;
		width: 200rpx;
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

	.paybtnGroup {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.imageshadow {
		width: 100%;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 1999;
		background-color: rgba(0, 0, 0, 0.8);
	}

	.clear:after {
		content: '';
		display: block;
		visibility: hidden;
		clear: both;
	}

	.imageContent {
		width: 590rpx;
		height: 374rpx;
		float: right;
	}

	.shareClick>image {
		width: 241rpx;
		height: 86rpx;
	}

	.shareClick {
		width: 241rpx;
		height: 86rpx;
		float: right;
		margin-top: 50rpx;
		margin-right: 180rpx;
	}
</style>
