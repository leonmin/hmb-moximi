<template>
	<view class="getNeWUser">
		<view class="newContain">
			<view class="erweima">
				<image src="../../../static/erweima.jpg" mode=""></image>
			</view>
			<view class="text">
				长按关注公众号“魔小秘”
			</view>
		</view>
	</view>
</template>

<script>
	var curToken
	import WxValidate from '../../../utils/WxValidate.js'
	import {
		LOGIN,
		SENDCODE
	} from "../../../utils/api.js"
	export default {
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
		}
	}
</script>

<style>
	page {
		background: #5F89FD;
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
		background-image: url(../../../static/login/getNewUser/bejing@2x.jpg);
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
	}
	.text{
		text-align: center;
		font-size: 28rpx;
		color: #111111;
		margin-top: 20rpx;
	}
</style>
