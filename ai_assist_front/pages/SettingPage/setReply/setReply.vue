<template>
	<view v-if="ttsScene">
		<view class="topDeliver"></view>
		<view class="contain">
			<view class="title">{{num == 1? '设置外卖回复':'设置快递回复'}}</view>
			<view class="containDeliver"></view>
			<view class="containInput">
				<textarea v-model="repyText" maxlength="100"  class="repyText"  />
			</view>
			<view class="bottomTip">
				<view class="bottomTipContain">
					<text >{{repyText.length}}/100</text>
					<text class="cuIcon-notification" @click="playVoice"></text>
				</view>
			</view>
		</view>
		<view class="sureBtn">
			<view class="btnCommit" @click="confirm">确认</view>
		</view>
		<!-- 音乐播放 -->
		<uni-popup ref="musicPlay" type="center" style="z-index: 10000;" @change="musicChange">
			<view class="music active">
			    <i></i>
			    <i></i>
			    <i></i>
			    <i></i>
			    <i></i>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	let innerAudioContext = uni.createInnerAudioContext();
	import uniPopup from "../../../components/uni-popup/uni-popup.vue"
	import {TTSCONVERT,TTSSCENE,SCENEUSERPOST} from '../../../utils/api.js'
	export default {
		components: {uniPopup},
		data() {
			return {
				repyText: '',
				num: '',
				ttsScene: '',
				id: '',
				sceneData: '',
				isPlay: false
			}
		},
		watch:{
			isPlay(e){
				console.log('监听',e)
				if(!e){
					this.$refs.musicPlay.close()
				}
			}
		},
		onLoad(options) {
			uni.showToast({
				title:'加载中...',
				icon:'none'
			})
			if(options.type){
				this.num = options.type
				if(this.num == 1){
					this.repyText = 'TA现在正好在忙,那您能不能把外卖放在(输入我的地址),谢谢'
				} else {
					this.repyText = 'TA现在正好在忙,那您能不能把快递放在(输入我的地址),谢谢'
				}
			} else if(options.data){
				this.sceneData = JSON.parse(options.data)
				this.repyText = this.sceneData.text
				this.num = this.sceneData.sceneType
				this.id = this.sceneData.id
			}
			
			// 查询当前音色
			this.checkTtsScene()
		},
		
		methods: {
			// 确认
			confirm(){
				const params = {
					sceneType: this.num,
					id: this.id,
					content: this.repyText
				}
				this.$request.url_request(SCENEUSERPOST,params,'GET',res=>{
					if(JSON.parse(res.data).data.code ==200){
						uni.showToast({
							title:'设置成功',
							icon:'success',
							duration:1200
						})
						setTimeout(()=>{
							uni.navigateTo({
							url:'../CustomReply/CustomReply'
						})
						},1200)
						
					} else{
						uni.showToast({
							title:JSON.parse(res.data).data.code,
							icon:'none',
							duration:1200	
						})
					}
					
				},err=>{})
			},
			// 查询当前音色
			checkTtsScene(){
				const params = {}
				this.$request.url_request(TTSSCENE,params,'GET',res=>{
					uni.hideToast()
					this.ttsScene = JSON.parse(res.data).data.data
				},err=>{})
			},
			//播放
			playVoice(){
				var that = this
				this.isPlay = !this.isPlay
				console.log('是否播放',this.isPlay)
				if(this.isPlay){
					if(this.isPlay){
						uni.showToast({
							title:'语音生成中',
							icon:'loading'
						})
					const params = {
						ttsKey: this.ttsScene.ttsKey,
						text: this.repyText
					}
					this.$request.url_request(TTSCONVERT,params,'GET',res=>{
						uni.hideToast()
						innerAudioContext.autoplay = true;
						innerAudioContext.src = JSON.parse(res.data).data.data.ossUrl ;
						that.$refs.musicPlay.open()
						innerAudioContext.onPlay(() => {
						  console.log('开始播放');
						});
						innerAudioContext.onEnded(function(){
							that.isPlay = false
							console.log('播放完毕')
							// that.$refs.musicPlay.close()
						})
						innerAudioContext.onError((res) => {
						  console.log(res.errMsg);
						  console.log(res.errCode);
						});
					},err=>{})
				}
				
			} else{
				console.log('进入暂停1')
				innerAudioContext.stop()
				innerAudioContext.pause()
				that.$refs.musicPlay.close()
				innerAudioContext.onPause(function(){
					console.log('播放暂停1')
				})
				}
			},
			// musicChange
			musicChange(e){
				console.log('弹窗',e.show)
				if(!e.show){
					console.log('进入暂停2')
					innerAudioContext.stop()
					innerAudioContext.pause()
					innerAudioContext.onPause(function(){
						console.log('播放暂停2')
					})
				}
			},
		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
.topDeliver{
	width:100%;
	height:20rpx;
	background:rgba(243,246,247,1);
}
.contain{
	padding: 50rpx 30rpx;
}
.title{
	font-size: 30rpx;
	color: #333333;
}
.containDeliver{
	margin: 30rpx 0;
	border-top: 1rpx solid #E9E9E9;
}
.containInput{
	padding: 30rpx 0;
}
.repyText{
	width: 100%;
	height: 200rpx;
	padding: 10rpx;
}
.bottomTip{
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
}
.bottomTipContain{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.bottomTipContain>text:nth-of-type(1){
	color: #999999;
	font-size: 26rpx;
}
.bottomTipContain>text:nth-of-type(2){
	margin-left: 20rpx;
	color: #999999;
	font-size: 36rpx;
}
.sureBtn{
	padding: 0 30rpx;
	margin-top: 500rpx;
}
.btnCommit{
	width: 100%;
	padding: 25rpx;
	text-align: center;
	color: #FFFFFF;
	border-radius: 100rpx;
	box-shadow: 0 0 10rpx #B3C2DB;
	background: linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
	background: -ms-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
	background: -webkit-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
	background: -moz-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
}
	/* 音乐播放 */
	.music {
		width:200rpx;
		height:200rpx;
		position:relative;
		background: #FFFFFF;
		border-radius: 25rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.music i {
		width:10rpx;
		height:5rpx;
		margin: 0 5rpx;
		background-color:#1C75FF;
	}

	.music.active i:nth-of-type(1) {
		-webkit-animation:wave 0.76s linear infinite;
		animation:wave 0.76s linear infinite;
		background-color:#1C75FF;
	}
	.music.active i:nth-of-type(2) {
		-webkit-animation:wave 0.9s linear infinite;
		animation:wave 0.9s linear infinite;
		background-color:#1C75FF;
	}
	.music.active i:nth-of-type(3) {
		-webkit-animation:wave 0.8s linear infinite;
		animation:wave 0.8s linear infinite;
		background-color:#1C75FF;
	}
	.music.active i:nth-of-type(4) {
		-webkit-animation:wave 0.6s linear infinite;
		animation:wave 0.6s linear infinite;
		background-color:#1C75FF;
	}
	.music.active i:nth-of-type(5) {
		-webkit-animation:wave 1s linear infinite;
		animation:wave 1s linear infinite;
		background-color:#1C75FF;
	}
	
	@-webkit-keyframes wave {
		0% {
		height:7rpx
	}
	50% {
		height:50rpx
	}
	100% {
		height:10rpx
	}
	}@keyframes wave {
		0% {
		height:7rpx
	}
	50% {
		height:50rpx
	}
	100% {
		height:10rpx
	}
	}
</style>
