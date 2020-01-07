<template>
	<view class="">
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: '111'
			}
		},
		onLoad() {
			this.getAuth()
		},
		methods: {
			// 授权
			getAuth(){
				var hrefUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5136cb5c7d21f3d1&redirect_uri="+ this.$url.mainURL + "/app/login&response_type=code&scope=snsapi_userinfo#wechat_redirect";
				window.location.href = hrefUrl;
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
