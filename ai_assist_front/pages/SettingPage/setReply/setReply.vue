<template>
	<view>
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
	</view>
</template>

<script>
	import {TTSCONVERT,TTSSCENE,SCENEUSERPOST} from '../../../utils/api.js'
	export default {
		data() {
			return {
				repyText: '',
				num: '',
				ttsScene: '',
				id: '',
				sceneData: ''
			}
		},
		onLoad(options) {
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
						uni.navigateTo({
							url:'../CustomReply/CustomReply'
						})
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
					this.ttsScene = JSON.parse(res.data).data.data
				},err=>{})
			},
			//播放
			playVoice(){
				const params = {
					ttsKey: this.ttsScene.ttsKey,
					text: this.repyText
				}
				this.$request.url_request(TTSCONVERT,params,'GET',res=>{
					const innerAudioContext = uni.createInnerAudioContext();
					innerAudioContext.autoplay = true;
					innerAudioContext.src = JSON.parse(res.data).data.data.ossUrl ;
					innerAudioContext.onPlay(() => {
					  console.log('开始播放');
					});
					innerAudioContext.onError((res) => {
					  console.log(res.errMsg);
					  console.log(res.errCode);
					});
				},err=>{})
			}
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
</style>
