<template>
	<view class="holdon" >
		<image  class="ball" :style="'right:'+(moveX == 0 & x>0? x:moveX)+'rpx;bottom:'+(moveY == 0 & y>0? y:moveY)+'rpx'"	 
				 :src="image"  mode="aspectFill">
		</image>
	</view>
</template>

<script>
	export default {
		props: {
			x: {
				type: Number,
				default:0
			},
			y: {
				type: Number,
				default:0
			},
			image:{
				type:String,
				default: ''
			}
		},
		data() {
			return {
				start:[0,0],
				moveY:0,
				moveX:0
			}
		},
		methods: {
			drag_start(event){
				this.start[0]= event.touches[0].clientX-event.target.offsetLeft;
				this.start[1]= event.touches[0].clientY-event.target.offsetTop;
			},
			drag_hmove(event){
					let	 tag 	 = event.touches;
					this.moveX	 = tag[0].clientX-this.start[0];
					this.moveY	 = tag[0].clientY-this.start[1];
			}
		}}
</script>

<style lang="less">
	.holdon{
		width: 100rpx;
		height: 100rpx;
	}
	.ball{
		width: 100rpx;height:100rpx;
		// background:linear-gradient(to bottom, #F8F8FF,#87CEFA);
		border-radius: 50%;
		// box-shadow: 0 0 15rpx #87CEFA;
		color: #fff;
		font-size: 30rpx;
		display: flex;justify-content: center;align-items: center;
		position: fixed !important;
		z-index: 10;
	}
</style>
