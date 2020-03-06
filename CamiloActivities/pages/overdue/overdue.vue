<template>
	<view class="outBox">
		<view class="topImage">
			<image src="../../static/beijing@2x-2.png" mode=""></image>
		</view>
		<view class="contentBox clear">
			<view :class="isReceive == 1?'tipImage':'tipImage2'">
				<image :src="isReceive == 1?'../../static/neirong@2x-2.png':'../../static/neirong-1@2x.png'" mode=""></image>
			</view>
			<view class="contentView">
				<view class="itemTop" v-if="isReceive == 1">
					<text>关注魔小秘微信公众号</text>
					<text style="margin-top: 10rpx;">可使用免费周卡使用魔小秘</text>
					<text class="weekTip" @click="weekUse">免费周卡使用教程</text>
				</view>
				<view class="itemTop" v-else>
					<text>关注魔小秘微信公众号 </text>
					<text style="margin-top: 10rpx;">查看最新的优惠活动吧</text>
				</view>
			</view>
			<view class="itemSecond">
				<view class="qrcode">
					<image :src="url" mode=""></image>
				</view>
				<view class="qrTip">扫描二维码快来使用吧</view>
			</view>
			<view :class="isReceive == 1?'zhuangshi':'zhuang'">
				<image src="../../static/zhuangshi@2x.png" mode=""></image>
			</view>
			<view :class="isReceive == 1?'zhuangshi1':'zhuang1'">
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
				cami: '',
				isReceive: '',
				bindData: '',
				url: ''
			}
		},
		onLoad(options) {
			console.log('获取的',JSON.parse(options.check))
			this.bindData = JSON.parse(options.check)
			this.isReceive = this.bindData.check
			this.url = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + this.bindData.channelTicket
		},
		methods: {
			weekUse(){
				uni.navigateTo({
					url:'../weekUse/weekUse?data='+JSON.parse(this.bindData)
				})
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

	.clear:after {
		content: '';
		visibility: hidden;
		display: block;
		clear: both;
	}

	.tipImage {
		width: 100%;
		height: 91rpx;
		text-align: center;
		margin-top: 80rpx;
	}

	.tipImage2 {
		width: 100%;
		height: 91rpx;
		text-align: center;
		margin-top: 80rpx;
	}

	.tipImage2>image {
		width: 700rpx;
		height: 91rpx;
	}

	.tipImage>image {
		width: 701rpx;
		height: 91rpx;
	}

	.contentView {
		position: relative;
	}

	.itemTop {
		padding: 80rpx 140rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 10rpx 15rpx 0rpx rgba(220, 231, 255, 0.8);
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 20rpx;
		margin-top: 55rpx;
		font-size: 36rpx;
		color: #111111;
	}
	.weekTip{
		margin-top: 44rpx;
		color: #1C75FF;
		font-size: 32rpx;
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
	.qrcode>image{
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
		top: 520rpx;
		left: 80rpx;
	}

	.zhuangshi1>image {
		width: 26rpx;
		height: 123rpx;
		position: absolute;
		top: 520rpx;
		right: 80rpx;
	}
	.zhuang>image {
		width: 26rpx;
		height: 123rpx;
		position: absolute;
		top: 435rpx;
		left: 80rpx;
	}
	
	.zhuang1>image {
		width: 26rpx;
		height: 123rpx;
		position: absolute;
		top: 435rpx;
		right: 80rpx;
	}
</style>
