<template>
	<view>
		<view class="logoDisplay">
			<image src="../../../static/aboutMXM/moxiaomi@2x.png" mode=""></image>
		</view>
		<view class="logoTitle">
			<text>魔小秘</text>
		</view>
		<view class="tips">
			<text>「魔小秘」是新一代的人工智能接听小助手，在您不想、不能、不方便接听来电的时候，小秘将会帮您接听～</text>
		</view>
		<view class="version">
			<text>V1.0.0</text>
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
.logoDisplay{
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding-top: 191rpx;
}
.logoDisplay>image{
	width: 165rpx;
	height: 175rpx;
}
.logoTitle{
	text-align: center;
	margin:44rpx 0;
	font-weight: 600;
	color: #111111;
	font-size: 34rpx;
}
.tips{
	padding: 0 30rpx;
	text-align: center;
	font-size: 26rpx;
	color: #555555;
	line-height: 40rpx;
}
.version{
	color: #555555;
	font-size: 30rpx;
	text-align: center;
	margin-top: 36rpx;
}
</style>
