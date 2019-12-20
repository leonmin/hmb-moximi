<template>
	<view class="registerSucc">
		<view class="coupons">
			<image src="../../../static/login/RegisterSucc/quan@2x.png" mode=""></image>
			<image src="../../../static/login/RegisterSucc/quan1@2x.png" mode=""></image>
			<view class="couponsName">
				<text>中秋送礼福利</text>
				<text class="couponsTime">有效期至2020-10-10</text>
				<text class="scope">适用范围：月卡会员可用，7日内有效</text>
			</view>
			<view class="discount">
				<text>1折</text>
			</view>
				<view class="useBtn">
					<button class=" round" style="width: 687rpx;padding: 10rpx;">立即使用</button>
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
		/* background-color: #f3d3a0; */
/* 		background: linear-gradient(top, #f3d3a0 0%, #f3d3a0 10%, #f3d3a0  85%, transparent 100%);
		background: -ms-linear-gradient(top #f3d3a0 0%, #f3d3a0 10%, #f3d3a0  85%, transparent 100%);
		background: -webkit-linear-gradient(top, #f3d3a0 0%, #f3d3a0 10%, #f3d3a0  85%, transparent 100%);
		background: -moz-linear-gradient(top, #f3d3a0 0%, #f3d3a0 10%, #f3d3a0  85%, transparent 100%); */
	}
.registerSucc{
	width: 750rpx;
	height:1334rpx;
	background-size:cover;
	background-image: url(~@/static/login/RegisterSucc/beijing2@2x.jpg);
	overflow: hidden;
}
.coupons{
	width: 700rpx;
	margin: auto;
	margin-top: 860rpx;
	position: relative;
	/* box-shadow: 0 1rpx 10rpx #E29B28; */
	/* padding: 0 30rpx; */
}
.coupons>image:nth-of-type(1){
	width: 479rpx;
	height: 168rpx;
}
.coupons>image:nth-of-type(2){
	width: 219rpx;
	height: 168rpx;
}
.couponsName{
	text-align: center;
	width: 479rpx;
	height: 168rpx;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	padding: 20rpx 0;
	flex-direction: column;
	justify-content: space-between;	
}
.couponsName>text:nth-of-type(1){
	color: #D3AB6A;
	font-size: 34rpx;
}
.couponsTime{
	color: #FFFFFF;
	font-size: 26rpx
}
.scope{
	color: #FFFFFF;
	font-size: 22rpx
}
.discount{
	width: 219rpx;
	height: 168rpx;
	text-align: center;
	position: absolute;
	top: 0;
	left:479rpx ;
}
.discount>text{
	color: #FFFFFF;
	font-size: 70rpx;
	line-height: 168rpx;
}
.useBtn{
	margin-top: 100rpx;
}
.useBtn>button{
	color: #FFFFFF;
	font-size: 30rpx;
	box-shadow: 0 5rpx 10rpx #E8C387;
	background: linear-gradient(top, #f2c682 0%, #EDC079 50%, #D8A552  80%, #ce9841 100%);
	background: -ms-linear-gradient(top, #f2c682 0%, #EDC079 50%, #D8A552  80%, #ce9841 100%);
	background: -webkit-linear-gradient(top, #f2c682 0%, #EDC079 50%, #D8A552  80%, #ce9841 100%);
	background: -moz-linear-gradient(top, #f2c682 0%, #EDC079 50%, #D8A552  80%, #ce9841 100%);
}
</style>
