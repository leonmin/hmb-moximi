<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			this.getCode()
			console.log('App Show')
			
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			//
			getCode() {
				/*
				 *	正式
				 * */
				var mainURL = "https://m.checkshirt-ai.com"
				
				/*
				 *	测试
				 * */
				// var mainURL = "http://m.t.checkshirt-ai.com"
				
				var inviteCode = ''
				var partnerId = 0
				inviteCode = this.getQueryString('inviteCode')
				console.log('APPVUE链接截取的invitecode', inviteCode)
				var redirectIp = mainURL + '/app/login';
				window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5136cb5c7d21f3d1&redirect_uri=" +
					redirectIp + "&response_type=code&scope=snsapi_userinfo&partner=" + partnerId + "&state=" + inviteCode +
					"#wechat_redirect"
			},
			// 截取
			getQueryString(name) {
				var url = window.location.href
				console.log('APPVUE获取的url', url)
				var after = url.split("?")[1]
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				if (after) {
					var r = after.match(reg)
					if (r !== null) {
						console.log('APPVUE截取的结果1', decodeURIComponent(r[2]))
						return decodeURIComponent(r[2]);
					} else {
						var a = url.split('?')[2]
						if (a) {
							var s = a.match(reg)
							if (s !== null) {
								console.log('APPVUE截取的结果2', decodeURIComponent(s[2]))
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
	/*每个页面公共css */
</style>
