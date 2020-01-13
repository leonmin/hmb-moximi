<template>
	<view class="jumpLogin">
		<view class="content">
			<view class="logo">
				<image src="../../static/moxiaomiLOGO.png" mode=""></image>
			</view>
			<view class="loader">
				<view class="loader-inner ball-pulse">
					<view></view>
					<view></view>
					<view></view>
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
		onLoad() {
			this.getCode()
		},
		methods: {
			// 截取
			getQueryString(name) {
				var url = window.location.href
				console.log('jumpLogin获取的url',url)
				var after = url.split("?")[1];
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				if (after) {
					var r = after.match(reg)
					if (r !== null) {
						console.log('一个问号时截取code', decodeURIComponent(r[2]))
						return decodeURIComponent(
						r[2]);
					} else {
						var a = url.split("?")[2]
						if (a) {
							var s = a.match(reg)
							if (s !== null) {
								console.log('两个问号时截取code', decodeURIComponent(s[2]))
								return decodeURIComponent(s[2]);
							} else {
								return null
							}
						}

					}
				}
			},
			getCode() {
				var inviteCode = ''
				var partnerId = 0
				inviteCode = this.getQueryString('inviteCode')
				console.log('链接截取的invitecode',inviteCode)
				if (!inviteCode) {
					console.log('从本地获取invitecode')
					// inviteCode = ''
					inviteCode = uni.getStorageSync('inviteCode')
				}
				partnerId = this.getQueryString('partner')
				console.log('获取的inviteCode', inviteCode)
				// var redirectIp = 'https://m.checkshirt-ai.com/app/login'
				var redirectIp = this.$url.mainURL + '/app/login';
				window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5136cb5c7d21f3d1&redirect_uri=" +
					redirectIp + "&response_type=code&scope=snsapi_userinfo&partner="+partnerId+"&state=" + inviteCode + "#wechat_redirect"
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.jumpLogin {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
	}

	.content {
		justify-content: center;
		align-items: center;
		margin-top: 450rpx;
	}
	.logo>image{
		width: 130rpx;
		height:179rpx ;
	}
	
	
	.loader{
		margin-top: 10rpx;
	}
	.loader-inner{
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.ball-pulse>view:nth-child(0) {
		-webkit-animation: scale 0.75s 0s infinite cubic-bezier(.2, .68, .18, 1.08);
		-moz-animation: scale 0.75s 0s infinite cubic-bezier(.2, .68, .18, 1.08);
		-ms-animation: scale 0.75s 0s infinite cubic-bezier(.2, .68, .18, 1.08);
		animation: scale 0.75s 0s infinite cubic-bezier(.2, .68, .18, 1.08);
	}
	
	.ball-pulse>view:nth-child(1) {
		-webkit-animation: scale 0.75s 0.12s infinite cubic-bezier(.2, .68, .18, 1.08);
		-moz-animation:scale 0.75s 0.12s infinite cubic-bezier(.2, .68, .18, 1.08);
		-ms-animation:scale 0.75s 0.12s infinite cubic-bezier(.2, .68, .18, 1.08);
		animation: scale 0.75s 0.12s infinite cubic-bezier(.2, .68, .18, 1.08);
	}
	
	.ball-pulse>view:nth-child(2) {
		-webkit-animation: scale 0.75s 0.24s infinite cubic-bezier(.2, .68, .18, 1.08);
		-moz-animation:scale 0.75s 0.24s infinite cubic-bezier(.2, .68, .18, 1.08);
		-ms-animation:scale 0.75s 0.24s infinite cubic-bezier(.2, .68, .18, 1.08);
		animation: scale 0.75s 0.24s infinite cubic-bezier(.2, .68, .18, 1.08);
	}
	
	.ball-pulse>view:nth-child(3) {
		-webkit-animation: scale 0.75s 0.36s infinite cubic-bezier(.2, .68, .18, 1.08);
		-moz-animation:scale 0.75s 0.36s infinite cubic-bezier(.2, .68, .18, 1.08);
		-ms-animation:scale 0.75s 0.36s infinite cubic-bezier(.2, .68, .18, 1.08);
		animation: scale 0.75s 0.36s infinite cubic-bezier(.2, .68, .18, 1.08);
	}
	
	.ball-pulse>view {
		background-color: #3296fa;
		width: 10px;
		height: 10px;
		border-radius: 100%;
		margin: 2px;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		display: inline-block;
	}
	
	@-webkit-keyframes scale {
		0% {
			-webkit-transform: scale(1);
			transform: scale(1);
			opacity: 1;
		}
	
		45% {
			-webkit-transform: scale(0.1);
			transform: scale(0.1);
			opacity: 0.7;
		}
	
		80% {
			-webkit-transform: scale(1);
			transform: scale(1);
			opacity: 1;
		}
	}
	
	@keyframes scale {
		0% {
			-webkit-transform: scale(1);
			transform: scale(1);
			opacity: 1;
		}
	
		45% {
			-webkit-transform: scale(0.1);
			transform: scale(0.1);
			opacity: 0.7;
		}
	
		80% {
			-webkit-transform: scale(1);
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
