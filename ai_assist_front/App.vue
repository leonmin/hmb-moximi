<script>
	var curToken
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			this.getCurToken()
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			// 截取
			getQueryString(name) {
				var after = window.location.search
				if (after.indexOf('?') === -1) {}
				after = window.location.href.split("?")[1] || after.substr(1);
				console.log('获取路径after',after)
				if (after) {
					var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
					var r = after.match(reg)
					if (r !== null) {
						console.log('截取的结果',decodeURIComponent(r[2]))
						return decodeURIComponent(r[2]);
					} else {
						return null
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
