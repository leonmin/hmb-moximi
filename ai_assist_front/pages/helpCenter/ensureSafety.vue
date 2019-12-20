<template>
	<view>
		<view class="topHead">
				<text>魔小秘如何保障数据安全？</text>		
		</view>
		<view class="content">
			<view class="item">
				<view class="point"></view>
				<view class="itemText">
					<text>我们数据都会存放在阿里云上，阿里与我们一起保障数据的安全；</text>
				</view>
			</view>
			<view class="item">
				<view class="point"></view>
				<view class="itemText">
					<text>通话数据都会经过加密处理，只有客户自己的账号可以查看，根源上保障信息安全；</text>
				</view>
			</view>
			<view class="item">
				<view class="point"></view>
				<view class="itemText">
					<text>通话内容一般不会涉及重要隐私，我们会不断加强用户数据的安全防范能力。</text>
				</view>
			</view>
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
	.foot{
		margin: 0 30rpx;
		color: #222222;
		font-size: 28rpx;
	}
</style>
