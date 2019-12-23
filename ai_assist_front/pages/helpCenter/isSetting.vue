<template>
	<view>
		<view class="topHead">
				<text>如何查询是否设置成功？如何一键取消？</text>		
		</view>
		<view class="first">
			<text>【中国移动、联通、电信】用户看这里：</text>
		</view>
		<view class="content">
			<view class="item">
				<view class="point"></view>
				<view class="itemText">
					<text>验证【挂断转接】拨打*#67#</text>
				</view>
			</view>
			<view class="item">
				<view class="point"></view>
				<view class="itemText">
					<text>验证【无应答】拨打*#61#</text>
				</view>
			</view>
			<view class="item">
				<view class="point"></view>
				<view class="itemText">
					<text>验证【无网络】拨打*#62#</text>
				</view>
			</view>
			<view class="item">
				<view class="point"></view>
				<view class="itemText">
					<text>验证【取消所有呼叫转移】拨打##002#</text>
				</view>
			</view>
		</view>
		<view class="foot">
			<text>注：上述拨号操作仅作为查询，不会产生任何通话费用。</text>
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
