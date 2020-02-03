<template>
	<view>
		<view class="serviceBox">
			<view class="serviceItem" v-for="(item,index) in cardList" :key='index'>
				<view class="imagebox">
					<image :src="item.image" mode=""></image>
				</view>
				<text class="name">{{item.name}}</text>
				<text class="wxnum">{{item.num}}</text>
				<view class="copy">
					<text v-clipboard:copy="item.num" v-clipboard:success="(type) => onCopyResult('success')"
					 v-clipboard:error="(type) => onCopyResult('error')">复制</text>
				</view>
			</view>
		</view>
		<view class="tipbox">
			<text>长按上方任意二维码添加微信好友</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardList:[
					{image: '../../../static/mine/mxm.jpg',name: '秀秀',num: 'xiu1996215'},
					{image: '../../../static/mine/wx.png',name: '小杰',num: 'caix119452'},
					{image: '../../../static/mine/boy.png',name: '猫猫',num: 'dwz123789'}
				]
			}
		},
		methods: {
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
		}
	}
</script>

<style>
	page{
		background: #F3F6F7;
	}
	.serviceBox{
		background: #FFFFFF;
		margin-top: 20rpx;
		padding: 20rpx 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.serviceItem{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.imagebox{
		width: 216rpx;
		height: 216rpx;
	}
	.imagebox>image{
		width: 216rpx;
		height: 216rpx;
		box-shadow: 0rpx 5rpx 25rpx #D0DAE3;
	}
	.name{
		color: #111111;
		font-size: 30rpx;
		margin-top: 20rpx;
	}
	.wxnum{
		color: #333333;
		font-size: 28rpx;
		margin-top: 12rpx;
	}
	.copy{
		border: 1rpx solid #1C75FF;
		border-radius: 100rpx;
		padding: 5rpx 17rpx;
		color: #1C75FF;
		margin-top: 12rpx;
	}
	.tipbox{
		padding: 50rpx 30rpx 20rpx 30rpx;
		font-size: 26rpx;
		color: #999999;
		text-align: center;
		background: #FFFFFF;
	}
</style>
