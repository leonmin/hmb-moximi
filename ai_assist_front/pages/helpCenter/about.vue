<template>
	<view>
		<view class="topHead">
				<text>关于魔小秘</text>		
		</view>
		<view class="content">
			<view class="item">
				<view class="point"></view>
				<view class="itemText">
					<text>【魔小秘】是一款为您代接来电，屏蔽骚扰电话的智能来电助理产品。 </text>
				</view>
			</view>
			<view class="item">
				<view class="point"></view>
				<view class="itemText">
					<text>小秘书将会自动为您接听电话，让你生活更舒心、让工作更安心，消除您对接听来电的焦虑感！</text>
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
