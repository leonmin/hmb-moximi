<script>
	var curToken
	var invite = ''
	import qs from 'query-string';
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
			getQueryString1(name) {
				var url = window.location.href
				console.log('合伙人邀请绑定获取的url', url)
				let up = qs.parseUrl(url);
				console.log("parse result ==> ", up);
				return up.query[name]
			},
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
					var queryjp = this.getQueryString1('jp')
					var querypp = this.getQueryString1('pp')
					console.log('截取到的jp',queryjp)
					console.log('截取到的pp',querypp)
					if(queryjp){
						console.log('截取到了pj并保存')
						uni.setStorageSync('myjp',queryjp)
					} else{
						console.log('没有截取jp')
					}
					if(querypp){
						console.log('截取到了pp并保存')
						uni.setStorageSync('mypp',querypp)
					} else{
						console.log('没有截取pp')
					}
					console.log('appvue中截取inviteCode',invite)
					if(invite){
						console.log('截取到了InviteCode')
						uni.setStorageSync('inviteCode',invite)
					} else {
						console.log('没有截取到InviteCode')
						uni.removeStorageSync('inviteCode')
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
