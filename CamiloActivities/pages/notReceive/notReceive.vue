<template>
	<view class="outBox">
		<view class="topImage">
			<image src="../../static/beijing@2x-2.png" mode=""></image>
		</view>
		<view class="contentBox clear">
			<view class="rightTip" @click="howCami">如何使用卡密</view>
			<view :class="isReceive==1?'tipImage':'tipImage2'">
				<image :src="isReceive==1?'../../static/neirong-2@2x.png':'../../static/neirong@2x.png'" mode=""></image>
			</view>
			<view class="contentView">
				<view class="itemTop">
					<view class="input">
						<view type="text" v-model="cami" class="inputBox">{{cami|formateCami}}
						</view>
						<text class="copyText" @click="copy" data-clipboard-action="copy" :data-clipboard-text="cami">立即复制</text>
					</view>
					<view class="tipTime">有效期限：{{bindData.receiveTime.split(' ')[0]}} - {{bindData.endTime.split(' ')[0]}}</view>
					<view class="tipRed">
						<view>注意：</view>
						<view class="tipDetail">
							<text>1.此卡密仅限{{bindData.endTime.split(' ')[0]}}前使用，否则将失效；</text>
							<text>2.此卡密只能被领取卡密手机号所使用，给予他人 使用无效</text>
						</view>
					</view>
				</view>
				<view class="itemSecond">
					<view class="qrcode">
						<image :src="url" mode=""></image>
					</view>
					<view class="qrTip">扫描二维码快来使用吧</view>
				</view>
				<view :class="isReceive==1?'zhuangshi':'zhuang'">
					<image src="../../static/zhuangshi@2x.png" mode=""></image>
				</view>
				<view :class="isReceive==1?'zhuangshi1':'zhuang1'">
					<image src="../../static/zhuangshi@2x.png" mode=""></image>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cami: 'naihdiash',
				isReceive: '',
				bindData: '',
				url: ''
			}
		},
		filters: {
			formateCami: function(value) {
				var pat = /([a-zA-Z0-9]{4})[a-zA-Z0-9]*([a-zA-Z0-9]{4})/
				var b = value.replace(pat, '$1********$2');
				return b
			},
		},
		onLoad(options) {
			console.log('获取的', JSON.parse(options.check))
			this.bindData = JSON.parse(options.check)
			this.isReceive = this.bindData.check
			this.cami = this.bindData.cardKey
			this.url = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + this.bindData.channelTicket
			console.log('二维码=》', this.url)
		},
		methods: {
			// howCami如何使用卡密
			howCami() {
				uni.navigateTo({
					url: '../CamiloUse/CamiloUse?data='+JSON.stringify(this.bindData)
				})
			},
			copy() {
				let clipboard = new this.clipboard(".copyText");
				clipboard.on('success', function() {
					uni.showToast({
						title: '复制成功',
						icon: 'none'
					})
				});
				clipboard.on('error', function() {
					uni.showToast({
						title: '复制成功',
						icon: 'none'
					})
				});
			}
		}
	}
</script>

<style>
	page {
		background: #F1F5F9;
	}

	.outBox {
		position: relative;
	}

	.topImage>image {
		width: 100%;
		height: 454rpx;
	}

	.contentBox {
		width: 750rpx;
		position: absolute;
		top: 25rpx;
	}

	.rightTip {
		padding: 12rpx 25rpx 12rpx 18rpx;
		background: rgba(255, 189, 29, 1);
		border-radius: 25rpx 0rpx 0rpx 25rpx;
		float: right;
		color: #FFFFFF;
		font-size: 26rpx;
	}

	.clear:after {
		content: '';
		visibility: hidden;
		display: block;
		clear: both;
	}

	.tipImage {
		width: 100%;
		height: 87rpx;
		text-align: center;
		margin-top: 80rpx;
	}

	.tipImage2 {
		width: 100%;
		height: 76rpx;
		text-align: center;
		margin-top: 80rpx;
	}

	.tipImage2>image {
		width: 709rpx;
		height: 76rpx;
	}

	.tipImage>image {
		width: 684rpx;
		height: 87rpx;
	}

	.contentView {
		position: relative;
	}

	.itemTop {
		padding: 60rpx 30rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 10rpx 15rpx 0rpx rgba(220, 231, 255, 0.8);
		border-radius: 20rpx;
		margin: 0 20rpx;
		margin-top: 55rpx;
	}

	.input {
		display: flex;
		flex-direction: row;
		align-items: center;

	}

	.inputBox {
		width: 460rpx;
		padding: 20rpx;
		border-radius: 10rpx;
		background: rgba(255, 255, 255, 1);
		border: 1rpx solid rgba(28, 117, 255, 1);
		color: #111111;
		font-size: 34rpx;
	}

	.copyText {
		font-size: 30rpx;
		color: rgba(28, 117, 255, 1);
		margin-left: 25rpx;
	}

	.tipTime {
		color: #333333;
		font-size: 30rpx;
		margin-top: 41rpx;
	}

	.tipRed {
		margin-top: 26rpx;
		font-size: 26rpx;
		color: #FD1010;
		display: flex;
		flex-direction: row;
	}

	.tipRed>view:nth-of-type(1) {
		width: 100rpx;
	}

	.tipDetail {
		display: flex;
		flex-direction: column;
	}

	.itemSecond {
		margin: 20rpx;
		padding: 30rpx;
		margin-top: 30rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 10rpx 15rpx 0rpx rgba(220, 231, 255, 0.8);
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.qrcode {
		width: 400rpx;
		height: 400rpx;
	}

	.qrcode>image {
		width: 400rpx;
		height: 400rpx;
	}

	.qrTip {
		font-size: 34rpx;
		color: #333333;
		margin-top: 10rpx;
	}

	.zhuangshi>image {
		width: 26rpx;
		height: 123rpx;
		position: absolute;
		top: 370rpx;
		left: 80rpx;
	}

	.zhuangshi1>image {
		width: 26rpx;
		height: 123rpx;
		position: absolute;
		top: 370rpx;
		right: 80rpx;
	}

	.zhuang>image {
		width: 26rpx;
		height: 123rpx;
		position: absolute;
		top: 365rpx;
		left: 80rpx;
	}

	.zhuang1>image {
		width: 26rpx;
		height: 123rpx;
		position: absolute;
		top: 365rpx;
		right: 80rpx;
	}
</style>
