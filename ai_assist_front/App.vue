<script>
	var curToken
	var invite = ''
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			this.getInviteCode()
			this.getCurToken()
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			// 截取
			getQueryString(name) {
				var url = window.location.href
				console.log('APPVUE获取的url',url)
				var after = url.split("?")[1]
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				if (after) {
					var r = after.match(reg)
					if (r !== null) {
						console.log('appVUE截取的结果1',decodeURIComponent(r[2]))
						return decodeURIComponent(r[2]);
					} else {
						var a = url.split('?')[2]
						if(a){
							var s = a.match(reg)
							if(s !==null){
								console.log('appvue截取的结果2',decodeURIComponent(s[2]))
								return decodeURIComponent(s[2])
							} else {
								return null
							}
						}
					}
				}
			},
			// 得到token
			getCurToken() {	
				curToken = this.getQueryString('token')
				console.log('appvue路径中的token',curToken)
				if(!curToken) 
				{
					//localstorage read
					curToken = uni.getStorageSync('myToken')
					console.log('本地保存的token',curToken)
				}
				
				if(!curToken) {
					console.log('路径和storage的token都为空')
					uni.navigateTo({
						url:"pages/JumpLogin/JumpLogin"
					})
				} else {
					try{
						uni.setStorageSync('myToken',curToken)
					}catch(e){
						//TODO handle the exception
						uni.showModal({
							content: e,
							showCancel: false
						});
					}
				}			
			},
			// 获取invitecode
			getInviteCode(){
					invite = this.getQueryString('inviteCode')
					console.log('appvue中截取inviteCode',invite)
					if(invite){
						console.log('截取到了InviteCode')
						uni.setStorageSync('inviteCode',invite)
					} else {
						console.log('没有截取到InviteCode')
						uni.setStorageSync('inviteCode','')
					}
			}
			
		}
	}
</script>
<style>
	/*每个页面公共css */
	.itemHead>image{
		width: 100rpx;
		height: 100rpx;
		border-radius: 100px;
		overflow: hidden;
	}
	.flexDisplay{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.fontcolor{
		color:#333333
	}
	.blueStyle{
		color: #1C75FF;
	}
</style>
