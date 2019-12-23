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
			//	暂时直接进入项目
			// uni.switchTab({
			// 	url:"../IncomeHome/IncomeHome"
			// })
			// uni.redirectTo({
			// 	url:"../Login/bindMobile"
			// })
		},
		methods: {
			// 授权
			getAuth(){
				// if(!this.code){
				// 	window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5136cb5c7d21f3d1&redirect_uri=http://m.checkshirt-ai.com/app/login&response_type=code&scope=snsapi_userinfo&state=db15da066b4541b2818e7f11666d4d31#wechat_redirect"
				// }else{
				// 	uni.redirectTo({
				// 		url:"../Login/bindMobile"
				// 	})
				// }
				window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5136cb5c7d21f3d1&redirect_uri=http://m.checkshirt-ai.com/app/login&response_type=code&scope=snsapi_userinfo&state=db15da066b4541b2818e7f11666d4d31#wechat_redirect"
			},
			// 截取code
			getQueryString(name){
				var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r!=null)return unescape(r[2]); return null;
			}
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
