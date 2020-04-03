<template>
	<view class="getNeWUser">
		<view class="newContain">
			<view class="erweima">
				<image src="../../static/erweima.jpg" mode=""></image>
			</view>
		<view class="text">
			长按识别上方二维码
		</view>
		<view class="text">
			立即享受“私人秘书”服务
		</view>
		</view>
	</view>
</template>

<script>
	var curToken
	import WxValidate from '../../utils/WxValidate.js'
	import {
		LOGIN,
		SENDCODE
	} from "../../utils/api.js"
	export default {
		data() {
			return {
			}
		},
		onLoad() {
			uni.getSystemInfo({
			    success: function (res) {
			        console.log(res.windowHeight);
			    }
			});
		},
		methods: {
		}
	}
</script>

<style>
	page {
		background: #6089FD;
		padding-bottom: 10rpx;
	}

	.getNeWUser {
		/* height: 1369rpx; */
		
	}

	.newContain {
		width: 100%;
		height: 1206rpx;	
		border: 1rpx solid transparent;
		background-size: cover;
		background-image: url(../../static/bejing@2x.jpg);
		/* overflow: hidden; */
		position: relative;
	}
	.erweima{
		margin-top: 700rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.erweima>image{
		width: 300rpx;
		height: 300rpx;
		border: 12rpx solid rgba(255, 255, 255, 0.5);
		border-radius: 10rpx;
	}
	.text{
		text-align: center;
		font-size: 28rpx;
		color: #FFFFFF;
		margin-top: 20rpx;
	}
</style>
