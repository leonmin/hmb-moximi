<template>
	<view class="content">

	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {
			// this.getCode()
		},
		methods: {
			// 
			getCode() {
				/*
				 *	正式
				 * */
				// var mainURL = "https://m.checkshirt-ai.com"
				
				/*
				 *	测试
				 * */
				var mainURL = "http://m.t.checkshirt-ai.com"
				
				var inviteCode = ''
				var partnerId = 0
				inviteCode = this.getQueryString('inviteCode')
				console.log('tans链接截取的invitecode', inviteCode)
				var redirectIp = mainURL + '/app/login';
				window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5136cb5c7d21f3d1&redirect_uri=" +
					redirectIp + "&response_type=code&scope=snsapi_userinfo&partner=" + partnerId + "&state=" + inviteCode +
					"#wechat_redirect"
			},
			// 截取
			getQueryString(name) {
				var url = window.location.href
				var url ='http://m.t.checkshirt-ai.com/trans/index.html?partner=0&inviteCode=48d820f3e6da4f81a685707bbc0b2376.0&from=singlemessage&isappinstalled=0'
				console.log('tans获取的url', url)
				var after = url.split("?")[1]
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				if (after) {
					var r = after.match(reg)
					if (r !== null) {
						console.log('tans截取的结果1', decodeURIComponent(r[2]))
						return decodeURIComponent(r[2]);
					} else {
						var a = url.split('?')[2]
						if (a) {
							var s = a.match(reg)
							if (s !== null) {
								console.log('tans截取的结果2', decodeURIComponent(s[2]))
								return decodeURIComponent(s[2])
							} else {
								return null
							}
						}
					}
				}
			}
		}
	}
</script>

<style>

</style>
