<template>
	<view class="invitation" v-if="inviteData">
		<view class="topHead">
			<view class="info">
				<view class="itemNum">
					<text>获利提成</text>
					<view class="inviteCash">
						<text style="font-size: 45rpx; margin-right: 5rpx;">¥</text>
						<text>{{inviteData.inviteTotalProfit/100}}</text>
					</view>
				</view>
				<view class="divider"></view>
				<view class="itemNum">
					<text>邀请用户</text>
					<view>
						<text>{{inviteData.inviteUserCount}}</text>
					</view>
				</view>
			</view>

			<view class="btn">
				<button @click="checkDetail">查看详情</button>
			</view>
		</view>
		<view class="introduce">
			<view class="item">
				<text class="title">为好友节省</text>
				<view>
					<image src="../../../static/invite/xing@2x.png" mode=""></image>
					<text> 受邀好友可获得一张折扣优惠券 </text>
				</view>
			</view>
			<view class="item">
				<text class="title">自己可获取</text>
				<view>
					<image src="../../../static/invite/xing@2x.png" mode=""></image>
					<text> 受邀好友续费可享受10%支付金额返利 </text>
				</view>
			</view>
			<view class="shareBtn">
				<button @click="share">分享给好友</button>
			</view>
		</view>

			<view class="imageshadow" v-if="imageshow">
				<view class="shadowItem">
					<image src="../../../static/invite/jiantou@2x.png" mode=""></image>
					<image src="../../../static/invite/wozhidao@2x.png" mode="" @click="close"></image>
				</view>
			</view>

	</view>
</template>

<script>
	import {
		JSAPI,
		MYINFO,
		INVITEDATA
	} from "../../../utils/api.js"
	var jweixin = require('jweixin-module')
	export default {
		data() {
			return {
				inviteUrl: "",
				jsData: "",
				maskShow: false,
				inviteData: '',
				imageshow: false
			}
		},
		onLoad(options) {
			uni.showToast({
				title: '加载中...',
				icon: 'none',
				mask: true
			})
			this.inviteUrl = options.invite
			// 获得inviteUrl
			this.getUrl()
			// 获得JSSDK
			this.getJSAPI()
			// 我的邀请数据
			this.myInvite()
		},
		onPullDownRefresh() {
			this.myInvite()
		},
		methods: {
			// myInvite()
			myInvite() {
				const params = {}
				this.$request.url_request(INVITEDATA, params, 'GET', res => {
					this.inviteData = JSON.parse(res.data).data
					uni.hideToast()
					uni.stopPullDownRefresh()
				}, err => {})
			},
			// 获得URL
			getUrl() {
				const params = {}
				this.$request.url_request(MYINFO, params, "GET", res => {
					this.inviteUrl = JSON.parse(res.data).data.inviteUrl
				}, err => {})
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
							jsApiList: ['updateAppMessageShareData', 'onMenuShareAppMessage']
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
				this.imageshow = true
				this.$forceUpdate()
				var that = this
				// 分享到朋友
				jweixin.onMenuShareAppMessage({
					title: '【魔小秘】您的专属智能来电助理', // 分享标题
					desc: '快来领取你的优惠券', // 分享描述
					link: that.inviteUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: 'https://ai-assist.oss-cn-beijing.aliyuncs.com/aac/mxmlogo.png', // 分享图标
					type: 'link', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
						// 用户点击了分享后执行的回调函数
						that.maskShow = false
					}
				})
				//分享到朋友圈
				jweixin.onMenuShareTimeline({
					title: '【魔小秘】您的专属智能来电助理', // 分享标题
					link: that.inviteUrl,
					imgUrl: 'https://ai-assist.oss-cn-beijing.aliyuncs.com/aac/mxmlogo.png', // 分享图标
					success: function() {
						// 用户点击了分享后执行的回调函数
						that.maskShow = false
					}
				})

				// jweixin.updateAppMessageShareData({
				// 	title:"魔小秘",
				// 	desc:"我现在正在使用魔小秘，快来加入吧！",
				// 	link:this.inviteUrl,
				// 	imgUrl: 'https://img2.imgtn.bdimg.com/it/u=3312143108,1363335916&fm=26&gp=0.jpg',
				// 	success:function(){
				// 		uni.showModal({
				// 			content: JSON.stringify(success),
				// 			showCancel: false
				// 		});
				// 	}
				// })
			},
			// 邀请详情
			checkDetail() {
				uni.navigateTo({
					url: 'inviteDetail'
				})
			},
			close() {
				this.imageshow = false
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.invitation {
		position: relative;
	}

	page {
		padding-bottom: 20rpx;
	}

	.topHead {
		width: 750rpx;
		height: 701rpx;
		background-size: cover;
		background-image: url(~@/static/invite/bj@2x.jpg);
		z-index: -20;
	}
	.itemNum {
		display: flex;
		flex-direction: column;
		color: #FFFFFF;
		text-align: center;
		width: 250rpx;
		margin-top: 100rpx;
	}
	.inviteCash{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.info {
		display: flex;
		overflow: hidden;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.itemNum>text:nth-of-type(1) {
		font-size: 30rpx;
	}

	.itemNum>view:nth-of-type(1) {
		font-size: 64rpx;
		margin-top: 20rpx;
	}

	.divider {
		width: 3rpx;
		height: 79rpx;
		background-color: #FFFFFF;
		margin-top: 100rpx;
	}

	.btn>button {
		background: transparent;
		border: 2rpx solid #FFFFFF;
		color: #FFFFFF;
		font-size: 28rpx;
		width: 177rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 100rpx;
		margin-top: 50rpx;

	}

	button::after {
		border: none;
	}

	.introduce {
		border: 1rpx solid #FFFFFF;
		margin: 30rpx;
		box-shadow: 2rpx 2rpx 15rpx #e4e7eb;
		padding: 0 34rpx;
		border-radius: 20rpx;
		padding-bottom: 40rpx;
		z-index: -30;
	}

	.item {
		margin: 30rpx 0;
	}

	.title {
		color: #333333;
		font-size: 32rpx;
		font-weight: 600;
	}

	.item>view {
		margin-top: 20rpx;
	}

	.item>view>image {
		width: 22rpx;
		height: 22rpx;
		margin: 0 10rpx;
	}

	.item>view>text {
		color: #333333;
		font-size: 32rpx;
	}

	.shareBtn>button {
		width: 100%;
		color: #FFFFFF;
		border-radius: 100rpx;
		font-size: 30rpx;
		background: linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -ms-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -webkit-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -moz-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
	}

	.inviteContain {}
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
