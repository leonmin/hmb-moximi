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
				<view class="cu-item" style="margin: 0;padding: 0 30rpx;"  @click="inviteNum">
					<view class="content">
						<text class="fontStyle30">累计邀请人数</text>
						<view>
							<text class="inviteNum">{{infoData.inviteUserCount}}人</text>
							<text class="cuIcon-right" style="color: #C2C2C2;"></text>
						</view>
					</view>
				</view>
<!-- 卡密包 -->
		<view class="cu-item" style="margin: 0;padding: 0 30rpx;"  @click="camiloPackage">
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
<!-- 		<view class="shareBtn">
			<button @click="share">分享给好友</button>
		</view> -->
		<view class="shareBtn">
				<button v-clipboard:copy="infoData.inviteUrl2" v-clipboard:success="(type) => onCopyResult('success')"
							 v-clipboard:error="(type) => onCopyResult('error')">复制链接</button>
		</view>
		<view class="imageshadow" v-if="imageshow">
			<view class="shadowItem">
				<image src="../../static/invite/jiantou@2x.png" mode=""></image>
				<image src="../../static/invite/wozhidao@2x.png" mode="" @click="close"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		PARTNERINFO,
		JSAPI
	} from "../../utils/api.js"
	var jweixin = require('jweixin-module')
	var token
	var curToken
	export default {
		data() {
			return {
				infoData: '',
				imageshow: false
			}
		},
		onShow() {
			this.initData()
		},
		onLoad() {
			uni.showToast({
				title: '加载中...',
				icon: 'none'
			})
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
					console.log(this.infoData)
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
							jsApiList: ['updateAppMessageShareData', 'onMenuShareAppMessage','onMenuShareTimeline']
						}),
						jweixin.ready(function() {
							console.log("接口处理成功")
						}),
						jweixin.error(function() {
							console.log("接口处理失败")
						})
				}, err => {})
			},
			// 分享
			share() {
				console.log('合伙人分享的链接',this.infoData.inviteUrl)
				this.imageshow = true
				this.$forceUpdate()
				var that = this
				// 分享到朋友
				jweixin.onMenuShareAppMessage({
					title: '【魔小秘】您的专属智能来电助理', // 分享标题
					desc: '防骚扰、免漏接、立即开启人工智能时代', // 分享描述
					link: that.infoData.inviteUrl2, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: 'https://ai-assist.oss-cn-beijing.aliyuncs.com/aac/mxmlogo.png', // 分享图标
					type: 'link', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
						// 用户点击了分享后执行的回调函数
						that.imageshow = false
					}
				})
				//分享到朋友圈
				jweixin.onMenuShareTimeline({
					title: '【魔小秘】您的专属智能来电助理', // 分享标题
					link: that.infoData.inviteUrl2,
					imgUrl: 'https://ai-assist.oss-cn-beijing.aliyuncs.com/aac/mxmlogo.png', // 分享图标
					success: function() {
						// 用户点击了分享后执行的回调函数
						that.imageshow = false
					}
				})
			},
			// 复制
			onCopyResult(type) {
				if (type === 'success') {
					uni.showToast({
						title: '复制成功',
						icon: 'none',
						duration: 1000
					})
				} else {}
			},
			close() {
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
			camiloPackage(){
				uni.navigateTo({
					url:'camiloPackage/camiloPackage'
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
	page{
		background-color: #FFFFFF;
	}
	.partner {}

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
	.shareBtn{
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
		position: absolute;
		z-index: 999;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
	.shadowItem{
		padding: 50rpx;
	}
	.shadowItem>image:nth-of-type(1){
		width: 464rpx;
		height: 304rpx;
		display: block;
	}
	.shadowItem>image:nth-of-type(2){
		width: 241rpx;
		height: 86rpx;
		display: block;
		margin-top: 50rpx;
		margin-left: 100rpx;
	}
</style>
