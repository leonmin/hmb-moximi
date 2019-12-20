<template>
	<view>
		<view class="topHead">
				<text>手机停机后还能正常使用吗？</text>		
		</view>
		<view class="first">
			<text>手机停机后，用户在一定时间内是可以接听电话（透支话费）。但是呼叫转移是无法使用的，因此魔小秘来电助手也会停止工作哟！</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
.topHead{
	width: 750rpx;
	height: 117rpx;
	background-size: cover;
	background-image: url(~@/static/helpCenter/bj-1@2x.png);
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 30rpx;
	font-size: 36rpx;
	font-weight: 600;
	color: #FFFFFF;
}
.content{
	padding: 10rpx 30rpx;
}
.item{
	font-size: 28rpx;
	color: #222222;
	display: flex;
	flex-direction: row;
	margin: 30rpx 0;
}
.point{
	width: 10rpx;
	height: 10rpx;
	background-color: #222222;
	border-radius: 100rpx;
	margin-top: 10rpx;
	margin-right: 10rpx;
}
.itemText{
	max-width: 680rpx;
	}
	.first{
		margin: 0 30rpx;
		margin-top: 40rpx;
		color: #222222;
		font-size: 28rpx;
	}
	
</style>
