<script>
	var token
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			token = uni.getStorageSync('myToken');
			if(!token){
				uni.reLaunch({
					url:'pages/JumpLogin/JumpLogin'
				})
			}
			console.log('app.vue中的token',token)
		},
		onHide: function() {
			console.log('App Hide')
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
