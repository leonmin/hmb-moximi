<template>
	<view class="content">
		<!-- 头部布局 -->
		<view class="topHeader">
			<image src="../../static/beijing@2x.png" mode="aspectFit" class="topImage"></image>
			<view class="downBtnGroup">
				<view class="downBox downAndroid" @click="downLoadAndroid">
					<image src="../../static/android@2x.png" mode=""></image>
					<text>Android下载</text>
				</view>
				<view class="downBox downIOS" @click="downLoadIOS">
					<image src="../../static/ios@2x.png" mode=""></image>
					<text>IOS下载</text>
				</view>
			</view>
			<view class="images">
				<image src="../../static/xuni@2x.png" mode="" class="virtualImage"></image>
				<image src="../../static/shezhi@2x.png" mode="" class="openImage"></image>
				<view style="height: 40rpx;"></view>
			</view>
		</view>
		<view class="imageShadow" v-if="imageShadow">
			<image src="../../static/jiantou@2x.png" mode="" class="tipImage"></image>
			<image src="../../static/wozhidao@2x.png" mode="" class="konw" @click="close"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				platform: '',//1.为微信，2.为其他
				imageShadow: false
			}
		},
		onLoad() {
			// 判断在那个平台
			this.getPlatform()
		},
		methods: {
			getPlatform(){
				var that = this
				var ua = navigator.userAgent.toLowerCase();  
				                // alert(ua)  
				                if (ua.search(/MicroMessenger/i) > -1) {  
				                    console.log("---------------weixin browser----------");  
				                   this.platform = 1
				                } else {  
				                    console.log("---------------other browser----------");  
									this.platform = 2
				                }
			},
			// 安卓下载
			downLoadAndroid(){
				console.log('进入安卓下载',this.platform)
				if(this.platform !== 1){
					window.location.href = 'https://ai-assist.oss-cn-beijing.aliyuncs.com/mxmapp/mxmapp.apk'
				} else{
					this.imageShadow = true
				}
				
			},
			// IOS下载
			downLoadIOS(){
				uni.showToast({
					title:'敬请期待',
					icon:'none'
				})
			},
			close(){
				this.imageShadow = false
			}
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
	.topHeader{
	}
	.topImage{
		width: 100%;
		height: 534rpx;
	}
	.downBtnGroup{
		display: flex;
		width: 100%;
		flex-direction: row;
		justify-content: center;
	}
	.downBox{
		width:253rpx;
		padding: 21rpx 0;
		border-radius:10rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
	}
	.downAndroid{
		border:1rpx solid #1C75FF;
		color: #1c75ff;
	}
	.downAndroid>image{
		width: 32rpx;
		height: 32rpx;
		margin-right:10rpx ;
	}
	.downIOS{
		margin-left: 60rpx;
		border: 1rpx solid #D7D7D7;
		color: #D7D7D7;;
	}
	.downIOS>image{
		margin-right: 10rpx;
		width: 35rpx;
		height: 35rpx;
	}
	.images{
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.virtualImage{
		width: 722rpx;
		height: 578rpx;
		margin-top: 59rpx;
	}
	.openImage{
		width: 721rpx;
		height: 602rpx;
		margin-top: 44rpx;
	}
	.imageShadow{
		position: fixed;
		top: 0;
		left:;
		height: 100vh;
		width: 100%;
		background:rgba(0,0,0,1);
		opacity:0.8;
		z-index: 999;
	}
	.tipImage{
		width: 488rpx;
		height: 305rpx;
		float: right;
		margin-right: 50rpx;
		margin-top: 50rpx;
	}
	.konw{
		width: 241rpx;
		height: 86rpx;
		margin-top: 76rpx;
		float: right;
		margin-right: 159rpx;
	}
</style>
