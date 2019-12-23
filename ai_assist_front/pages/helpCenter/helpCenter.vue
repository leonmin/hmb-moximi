<template>
	<view>
		<view class="topHead">
				<text>帮助中心</text>
				<text>每个问题小秘都尽心地为您解决 </text>		
		</view>
		<view class="content">
			<view class="item" @click="about">
				<text>魔小秘是什么？</text>
				<view class="deliver"></view>
			</view>
			<view class="item" @click="callForward">
				<text>什么是呼叫转移？为什么要开通？</text>
				<view class="deliver"></view>
			</view>
			<view class="item" @click="isSetting">
				<text>如何查询是否设置成功？如何一键取消？</text>
				<view class="deliver"></view>
			</view>
			<view class="item" @click='downTime'>
				<text>手机停机后还能正常使用吗？</text>
				<view class="deliver"></view>
			</view>
			<view class="item" @click="ensureSafe">
				<text>魔小秘如何保障数据安全？</text>
				<view class="deliver"></view>
			</view>
			<view class="item" @click="feedback">
				<text>如何反馈问题？</text>
				<view class="deliver"></view>
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
			// 关于魔小秘
			about(){
				uni.navigateTo({
					url: 'about'
				})
			},
			// 呼叫转移
			callForward(){
				uni.navigateTo({
					url: 'callForwarding'
				})
			},
			isSetting(){
				uni.navigateTo({
					url:"isSetting"
				})
			},
			downTime(){
				uni.navigateTo({
					url:"downtime"
				})
			},
			ensureSafe(){
				uni.navigateTo({
					url: 'ensureSafety'
				})
			},
			feedback(){
				uni.navigateTo({
					url: 'feedBack'
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
.topHead{
	width: 750rpx;
	height: 199rpx;
	background-size: cover;
	background-image: url(~@/static/helpCenter/bj-1@2x.png);
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 30rpx;
	color: #FFFFFF;
}
.topHead>text:nth-of-type(1){
	font-weight: 600;
	font-size: 36rpx;
}
.topHead>text:nth-of-type(2){
	font-size: 30rpx;
	margin-top: 28rpx;
}
.content{
	margin: 58rpx 30rpx;
}
.item{
	color: #222222;
	font-size: 28rpx;
}

.deliver{
	margin: 40rpx 0;
	border-top: 1rpx solid #F4F4F4;
}
</style>
