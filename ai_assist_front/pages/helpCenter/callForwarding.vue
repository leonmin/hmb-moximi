<template>
	<view>
		<view class="topHead">
				<text>什么是呼叫转移？为什么要开通？</text>		
		</view>
		<view class="content">
			<view class="item">
				<view class="point"></view>
				<view class="itemText">
					<text>呼叫转移，是一项传统通信业务。当您不方便接听或无法接听电话（如关机、无信号等）时，可以选择将来电转移到其他号码上。 </text>
				</view>
			</view>
			<view class="item">
				<view class="point"></view>
				<view class="itemText">
					<text>【魔小秘】需要借助“呼叫转移服务”为您接听电话，所以只有您成功开通“呼叫转移服务”够，我们才能为您正常服务哟！</text>
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
</style>
