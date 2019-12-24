<template>
	<view class="guide">
				<view class="title">
					<text>启用魔小秘来电服务</text>
				</view>
				<view class="setting">
					<text>启用魔小秘来电服务是通过拨打一串号码进行设置，参照下方演示，教你如何启用</text>
					<text style="color: #1C75FF;">挂断转接、无应答、无网络</text>
					<text>场景的设置：</text>
				</view>
				<!-- 视频播放 -->
				<view class="wel-video myVideoBox">
					<video class="myVideo" src="https://ai-assist.oss-cn-beijing.aliyuncs.com/aac/recVideoV1.mp4" @error="videoErrorCallback"
					 loop="true" autoplay='true'></video>
				</view>
				<!-- 二维码 -->
				<view class="erweima">
					<image src="../../../static/erweima.jpg" mode=""></image>
					<view>
						<text>长按识别二维码，关注公众号“魔小秘”</text>
					</view>
				</view>
		
				<view class="foot1">
					<text>拨打</text>
					<text style="color: #1C75FF;">不会通话</text>
					<text>，也</text>
					<text style="color: #1C75FF;">不会收取任何费用</text>
					<text>，设置后可随时取消，请放心设置</text>
				</view>
				<view style="height: 200rpx;"></view>

		<view class="bto-bar cu-bar foot btnFoot" style="bottom: 0px; background: #FFFFFF;">
					<view class="tipBottom">
						<view class="btn">
							<button @click="setting">前往配置</button>
						</view>
						<view class="tips">
							<text>来电主动挂断、无应答、无网络时小秘接听</text>
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
			// 视频播放出错
			videoErrorCallback() {},
			setting() {
				uni.switchTab({
					url: "../../SettingPage/SettingPage"
				})
			},
		}
	}
</script>

<style>
	.guide {
		
	}
	.title {
		font-size: 38rpx;
		font-weight: 600;
		text-align: center;
		color: #111111;
		padding: 20rpx 0;
	}

	.setting {
		margin: 44rpx 30rpx;
		font-size: 30rpx;
		color: #111111;
	}
	.myVideoBox{
		margin: 0 30rpx;
	}
	.myVideo {
		width: 100%;
		height: 350rpx;
		border-radius: 20rpx;
		margin: 40rpx 0;
	}

	.foot1 {
		margin: 0 30rpx;
		color: #111111;
		font-size: 30rpx;
		margin-top: 48rpx;
	}

	button::after {
		border: none;
	}

	.btn {
		/* margin-top: 190rpx; */
	}

	.btn>button {
		width: 100%;
		border-radius: 100rpx;
		color: #FFFFFF;
		box-shadow: 1rpx 1rpx 10rpx #1C75FF;
		font-size: 30rpx;
		background: linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -ms-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -webkit-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -moz-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
	}

	.tips {
		text-align: center;
		font-size: 28rpx;
		color: #BEBEBE;
		margin: 10rpx;
	}

	.erweima {
		margin-top: 50rpx;
		font-size: 20rpx;
		color: #999999;
		text-align: center;
	}

	.erweima>image {
		width: 180rpx;
		height: 180rpx;
	}
	.btnFoot{
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.tipBottom{
		padding: 10rpx 0;
	}
</style>
