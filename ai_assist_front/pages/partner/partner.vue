<template>
	<view class="partner" v-if="infoData">
		<!-- 合伙人顶部 -->
		<view class="partnerHeader">
			<view class="titleBox">
				<view class="title">
					<text>嗨！</text>
					<text>{{infoData.mobile}}</text>
				</view>
				<!-- 	<view>
					<button class="exitBtn">立即退出</button>
				</view> -->
			</view>
			<view class="balance">
				<text>当前余额</text>
				<view class="cash">
					<text>¥</text>
					<text>{{infoData.balance}}</text>
				</view>
				<view class="balanceBtn">
					<text @click="tixian">立即提现</text>
					<text>|</text>
					<text @click="balance">余额明细</text>
				</view>
			</view>
		</view>
		<!-- 合伙人邀请人数 -->
		<view class="partnerInvite">
			<view class="cu-list menu">
				<view class="cu-item" style="margin: 0;padding: 0 30rpx;" @click="inviteNum">
					<view class="content">
						<text class="fontStyle30">累计邀请人数</text>
						<view>
							<text class="inviteNum">{{infoData.inviteUserCount}}人</text>
							<text class="cuIcon-right" style="color: #C2C2C2;"></text>
						</view>
					</view>
				</view>
				<!-- 卡密包 -->
				<view class="cu-item" style="margin: 0;padding: 0 30rpx;" @click="camiloPackage">
					<view class="content">
						<text class="fontStyle30">卡密包</text>
						<view>
							<text class="inviteNum">{{infoData.cardCount}} 有效</text>
							<text class="cuIcon-right" style="color: #C2C2C2;"></text>
						</view>
					</view>
				</view>

				<view class="cu-item invite" style="margin: 0;padding: 0 30rpx;">
					<view class="content">
						<text class="fontStyle30">专属邀请链接</text>
						<view class="right">
							<text class="inviteUrl">{{infoData.inviteUrl2}}</text>
							<text class="copy" v-clipboard:copy="infoData.inviteUrl2" v-clipboard:success="(type) => onCopyResult('success')"
							 v-clipboard:error="(type) => onCopyResult('error')">点击复制</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="shareBtn">
			<button @click="popShare">立即分享</button>
		</view>
		<!-- 	<view class="shareBtn">
				<button v-clipboard:copy="infoData.inviteUrl2" v-clipboard:success="(type) => onCopyResult('success')"
							 v-clipboard:error="(type) => onCopyResult('error')">立即分享</button>
		</view> -->
		<!-- 问号弹窗 -->
		<uni-popup ref='share' type='bottom' style="">
			<view class="sharePop">
				<view class="popText">可分享推广海报至微信朋友圈或微信好友也可复制推广链接，手动发放。</view>
				<view class="popDeliver"></view>
				<view class="popBtn">
					<view class="popBtnLeft" @click="share">海报分享</view>
					<button class="popBtnRight" v-clipboard:copy="infoData.inviteUrl2" v-clipboard:success="(type) => onCopyResult('success')"
					 v-clipboard:error="(type) => onCopyResult('error')">复制链接</button>
				</view>
			</view>
		</uni-popup>

		<view class="imageshadow" v-if="QRurl && imageshow" style="z-index: 11000;">
			<view class="shadowItem">
				<image src="../../static/partner/wenzi@2x.png" mode=""></image>
				<image src="../../static/partner/arrow@2x.png" mode=""></image>
				<view class="shareImgae">
					<view class="imageView">
						<image :src="QRurl" mode=""></image>
					</view>
				</view>
				<view class="closeIcon"  @click="close"><image src="../../static/incomeHome/guanbi@2x.png" mode=""></image></view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "../../components/uni-popup/uni-popup.vue"
	import {
		PARTNERINFO,
		JSAPI,
		QRCODE
	} from "../../utils/api.js"
	var jweixin = require('jweixin-module')
	var token
	var curToken
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				infoData: '',
				imageshow: false,
				QRurl: null,
				ctx: '',
				canvasShow: false,
				ctx: '',
				imgeUrl: '',
				canvasHOw: true

			}
		},
		onLoad() {
			uni.showToast({
				title: '加载中...',
				icon: 'none'
			})
			this.initData()
			this.getUrlToken()
			this.getJSAPI()

		},
		onPullDownRefresh() {
			this.initData()
		},
		methods: {
			// 截取
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
			// 获取当前保存token
			getUrlToken() {
				curToken = this.getQueryString('token')
				if (!curToken) {
					uni.navigateTo({
						url: "partnerJumpLogin/partnerJumpLogin"
					})
				} else {
					try {
						uni.setStorageSync('myToken', curToken)
					} catch (e) {
						//TODO handle the exception
						uni.showModal({
							content: e,
							showCancel: false
						});
					}
				}
			},
			// 初始化数据
			initData() {
				const params = {}
				this.$request.url_request(PARTNERINFO, params, 'GET', res => {
					if (JSON.parse(res.data).code == -900401) {
						uni.navigateTo({
							url: 'partnerTip/partnerTip'
						})
					}
					this.infoData = JSON.parse(res.data).data
					console.log('得到的initData=>', this.infoData)
					uni.stopPullDownRefresh()
					uni.hideToast()
				}, err => {}, true)
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
							jsApiList: ['checkJsApi', 'updateAppMessageShareData', 'onMenuShareTimeline', 'onMenuShareAppMessage',
								'onMenuShareTimeline'
							]
						}),
						jweixin.ready(function() { //需在用户可能点击分享按钮前就先调用
							console.log("接口处理成功")
						});
					jweixin.error(function() {
						console.log("接口处理失败")
					})
				}, err => {})
			},
			// 分享按钮
			popShare() {
				this.$refs.share.open()

			},

			//这是一个封装好的方法 
			promisify: api => {
				return (options, ...params) => {
					return new Promise((resolve, reject) => {
						const extras = {
							success: resolve,
							fail: reject
						}
						api({ ...options,
							...extras
						}, ...params)
					})
				}
			},
			// 生成海报
			poster() {
				var _this = this
				var that = this
				const wxGetImageInfo = this.promisify(uni.getImageInfo)
				Promise.all([
					// 图片目前只随机找了几张图片，后期可自行替换
					wxGetImageInfo({
						src: 'https://ai-assist.oss-cn-beijing.aliyuncs.com/poster/haibao%402x.jpg' // 背景图片
					}),
					wxGetImageInfo({
						src: that.QRurl // 二维码图片
					})
				]).then(res => {
					console.log('res', res)
					// const ctx = uni.createCanvasContext('shareCanvas'
					if (!_this.ctx) {
						_this.ctx = uni.createCanvasContext('shareCanvas');
					}
					console.log('8888', _this.ctx)

					const bgH = res[0].height
					const bgW = res[0].width
					let phoneData = uni.getSystemInfoSync();
					let win_w = phoneData.windowWidth;
					let win_h = phoneData.windowHeight;

					console.log('win_w = ' + win_w + 'win_h = ' + win_h)
					let w_h = 470 / 837;
					let h_w = 837 / 470;
					let scale_w = win_w / 750;
					let scale_h = win_h / 1334;
					let card_left = 140 / 750 * win_w;
					let card_w = (win_w - card_left * 2);
					let card_h = card_w * h_w;
					_this.ctx.fillRect(0, 0, card_w, card_h); //canvas画布大小
					console.log('card_h=>', card_h, '----card_w=>', card_w)
					console.log(451 / 1334 * win_h)
					console.log(1057 / 1334 * win_h)

					//	开始绘制
					//	背景
					_this.ctx.drawImage(res[0].path, card_left, 451 / 1334 * win_h, card_w, card_h);
					//	头像 
					_this.ctx.drawImage(res[1].path, 165 / 750 * win_w, 1057 / 1334 * win_h, 172 / 750 * win_w, 172 / 750 * win_w);
					_this.imageshow = true
					setTimeout(function() {
						_this.ctx.draw(true, (ret) => {
							//	开始绘制
							console.log('success', ret);
							that.tempFileImage()
							uni.hideLoading();
							// _this.finishDraw = true;
							_this.imageshow = true
						});

					}, 600);

				})

			},
			tempFileImage() {
				let that = this
				let phoneData = uni.getSystemInfoSync();
				let win_w = phoneData.windowWidth;
				let win_h = phoneData.windowHeight;

				let w_h = 470 / 837;
				let h_w = 837 / 470;
				let scale_w = win_w / 750;
				let scale_h = win_h / 1334;
				let card_left = 140 / 750 * win_w;
				let card_w = (win_w - card_left * 2);
				let card_h = card_w * h_w;
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: 600,
					height: 1000,
					canvasId: 'shareCanvas',
					success: (res) => {
						console.log('绘制res', res)
						that.imgeUrl = res.tempFilePath
						uni.hideLoading()
						that.canvasHOw = false

					},
					fail: function() {
						//TODO
					}
				})
			},

			// 分享
			share() {
				var _this = this
				uni.showLoading({
					title:'海报生成中',
					mask:false
				})
				const params = {}
				this.$request.url_request(QRCODE, params, 'GET', res => {
					if(JSON.parse(res.data).code == 0){
						this.QRurl = JSON.parse(res.data).data.poster
						setTimeout(()=>{
							_this.$refs.share.close()
							_this.imageshow = true
							_this.$forceUpdate()
							uni.hideLoading()
						},1000)
						console.log('返回的二维码', this.QRurl)
					} else{
						uni.hideLoading()
						uni.showToast({
							title:'海报生成失败，请返回重试',
							icon:'none',
							duration:1200
						})
					}
				}, err => {})
				
				// console.log('合伙人分享的链接', this.infoData.inviteUrl)
				// this.imageshow = true
				// this.$forceUpdate()
				// var that = this

				// // 分享到朋友
				// jweixin.onMenuShareAppMessage({
				// 	title: '【魔小秘】您的专属智能来电助理', // 分享标题
				// 	desc: '防骚扰、免漏接、立即开启人工智能时代', // 分享描述
				// 	link: that.infoData.inviteUrl2, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				// 	imgUrl: 'https://ai-assist.oss-cn-beijing.aliyuncs.com/aac/mxmlogo.png', // 分享图标
				// 	type: 'link', // 分享类型,music、video或link，不填默认为link
				// 	dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				// 	success: function() {
				// 		// 用户点击了分享后执行的回调函数
				// 		that.imageshow = false
				// 		that.$refs.share.close()
				// 	}
				// })
				// //分享到朋友圈
				// jweixin.onMenuShareTimeline({
				// 	title: '【魔小秘】您的专属智能来电助理', // 分享标题
				// 	link: that.infoData.inviteUrl2,
				// 	imgUrl: 'https://ai-assist.oss-cn-beijing.aliyuncs.com/aac/mxmlogo.png', // 分享图标
				// 	success: function() {
				// 		// 用户点击了分享后执行的回调函数
				// 		that.imageshow = false
				// 		that.$refs.share.close()
				// 	}
				// })
			},
			// 复制
			onCopyResult(type) {
				if (type === 'success') {
					uni.showToast({
						title: '复制成功',
						icon: 'none',
						duration: 1000
					})
					this.$refs.share.close()
				} else {}
			},
			close() {
				this.$refs.share.close()
				this.imageshow = false
			},
			//  余额
			balance() {
				uni.navigateTo({
					url: "balanceSubsidiary/balanceSubsidiary"
				})
			},
			// tixian
			tixian() {
				uni.navigateTo({
					url: 'partnerDraw/partnerDraw'
				})
			},
			// 卡密包
			camiloPackage() {
				uni.navigateTo({
					url: 'camiloPackage/camiloPackage'
				})
			},
			// 邀请人数
			inviteNum() {
				uni.navigateTo({
					url: "partnerInvite/partnerInvite"
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.partner {}

	.ddd {
		width: 100%;
		height: 100vh;
		/* height: 200rpx; */
		/* background-color: #ffffff; */
	}

	/* 合伙人顶部 */
	.partnerHeader {
		width: 750rpx;
		height: 749rpx;
		padding: 40rpx 30rpx;
		color: #FFFFFF;
		background-size: cover;
		background-image: url(~@/static/partner/beijing@2x.jpg);
	}

	.titleBox {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.title {
		font-size: 36rpx;
	}

	.exitBtn {
		font-size: 26rpx;
		outline: none;
		width: 160rpx;
		height: 63rpx;
		color: #FFFFFF;
		border-radius: 10rpx;
		border: 1px solid #FFFFFF;
		background-color: transparent;
	}

	/* 当前y余额 */
	.balance {
		margin-top: 65rpx;
		text-align: center;
	}

	.balance>text:nth-of-type(1) {
		font-size: 26rpx;
	}

	.cash {
		margin-top: 34rpx;
	}

	.cash>text:nth-of-type(1) {
		font-size: 34rpx;
	}

	.cash>text:nth-of-type(2) {
		font-size: 40rpx;
		margin-left: 8rpx;
	}

	.balanceBtn {
		margin-top: 47rpx;
		font-size: 28rpx;
	}

	.balanceBtn>text:nth-of-type(2) {
		margin: 0 33rpx;
	}

	/* 合伙人邀请人数 */
	.partnerInvite {
		/* margin: 20rpx 0; */
		padding: 20rpx 0;
	}

	.content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.menu {
		/* margin: 0 30rpx; */
	}

	.inviteNum {
		color: #E01212;
		font-size: 30rpx;
	}

	.inviteUrl {
		max-width: 400rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		-webkit-line-clamp: 1;
		color: #000000;
		font-size: 30rpx;
	}

	.deliver {
		border-top: 1rpx solid #F4F4F4;
		margin: 30rpx 30rpx;
	}

	.invite {
		margin-top: 20rpx !important;
	}

	.right {
		display: flex;
		flex-direction: column;
		text-align: right
	}

	.copy {
		color: #1C75FF;
		font-size: 28rpx;
	}

	.shareBtn {
		background: #FFFFFF;
	}

	.shareBtn>button {
		/* width: 100%; */
		color: #FFFFFF;
		border-radius: 100rpx;
		font-size: 30rpx;
		margin: 0 30rpx;
		background: linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -ms-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -webkit-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -moz-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
	}

	.imageshadow {
		width: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		height: 100vh;
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.shadowItem {
		padding: 0 50rpx;
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.shadowItem>image:nth-of-type(1) {
		width: 276rpx;
		height: 93rpx;
		display: block;
	}

	.shadowItem>image:nth-of-type(2) {
		width: 42rpx;
		height: 55rpx;
		display: block;
		margin-top: 30rpx;
	}

	/* 分享pop */
	.sharePop {
		background: #FFFFFF;
		padding: 40rpx 0;
		border-radius: 30rpx 30rpx 0rpx 0rpx;
	}

	.popText {
		font-size: 34rpx;
		color: #333333;
		margin: 0 38rpx;
		margin-top: 40rpx;
	}

	.popDeliver {
		border-top: 1rpx solid #E9E9E9;
		margin-top: 79rpx;
	}

	.popBtn {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 40rpx;
		justify-content: center;
	}

	button::after {
		border: none;
	}

	.popBtnLeft,
	.popBtnRight {
		border-radius: 36rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 72rpx;
		margin: 0 30rpx;
	}

	.popBtnLeft {
		color: #1C75FF;
		width: 281rpx;
		height: 72rpx;
		border: 1rpx solid rgba(50, 150, 250, 1);
	}

	.popBtnRight {
		width: 281rpx;
		height: 72rpx;
		background: linear-gradient(-90deg, rgba(28, 117, 255, 1), rgba(87, 153, 255, 1));
	}

	.shareImgae {
		position: relative;
	}

	.imageView {
		width: 481rpx;
		height: 841rpx;
		border-radius: 10rpx;
		margin-top: 38rpx;
	}

	.imageView>image {
		border-radius: 10rpx;
		width: 481rpx;
		height: 841rpx;
	}
	.closeIcon{
		width: 50rpx;
		height: 50rpx;
		margin-top: 33rpx;
	}
	.closeIcon>image{
		width: 50rpx;
		height: 50rpx;
	}

</style>
