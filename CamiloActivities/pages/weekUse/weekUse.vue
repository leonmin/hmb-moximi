<template>
	<view class="outBox">
		<view class="title">1.关注魔小秘公众号</view>
		<view class="imageBox">
			<view class="qrimga">
				<image :src="url" mode=""></image>
			</view>
		</view>
		<view class="title marginSix">2.打开“个人中心”—“我的会员”</view>
		<view class="imageBox">
			<view class="vipImage">
				<image src="../../static/huiyuan@2x.png" mode=""></image>
			</view>
		</view>
		<view class="title marginSix">3.选择周卡，点击“分享免费领取”周卡</view>
		<view class="imageBox">
			<view class="camiImage">
				<image src="../../static/zhouka@2x.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				camiData: '',
				url: ''
			}
		},
		onLoad(options) {
			this.camiData = JSON.parse(options.data)
			this.url = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + this.camiData.channelTicket
			console.log('周卡使用的url=>', this.url)
		},
		methods: {
		
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	.outBox {
		padding: 40rpx 30rpx;
	}

	.title {
		color: #111111;
		font-size: 30rpx;
	}

	.imageBox {
		/* border: 1rpx solid #F0AD4E; */
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 28rpx;
	}

	.marginSix {
		margin-top: 50rpx;
	}

	.qrimga {
		width: 314rpx;
		height: 314rpx;
	}
	.qrimga>image {
		width: 314rpx;
		height: 314rpx;
	}
	.vipImage>image {
		width: 418rpx;
		height: 664rpx;
	}

	.camiImage>image {
		width: 445rpx;
		height: 963rpx;
	}
</style>
