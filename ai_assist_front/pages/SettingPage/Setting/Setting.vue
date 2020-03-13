<template>
	<view class="setting" v-if="TransferState">
		<!-- 标题 -->
		<view class="topHead">
			<view class="topHeadLeft">
				<text>开场白设置</text>
				<text class="cuIcon-question questionIcon" @click="openPop"></text>
			</view>
			<view class="topHeadRight" @click="chooseScenario">
				<text>{{PrologueCurrent.name}}</text>
				<text class="cuIcon-triangledownfill downIcon"></text>
			</view>
		</view>
		<!-- banner -->
		<view class="settingBanner">
			<view class="imageshadow"></view>
			<image :src="ttsScene.newAvatarUrl" mode=""></image>
			<view class="bannerText">
				<text>{{PrologueCurrent.customText}}</text>
				<view class="bannerIcon">
					<view class="iconItem" @click="playVoice"><image src="../../../static/setting/bf@2x.png" mode=""></image></view>
					<view class="iconItemRight" @click="modifyText"><image src="../../../static/setting/bianij@2x.png" mode=""></image></view>
				</view>
			</view>
		</view>
		<!-- 音色选择 -->
		<view class="voiceChoose">
			<view class="title"><text>音色选择</text></view>
			<view class="voiceBox clear">
				<view class="voiceItem" :class="ttsScene.sceneDefId==item.sceneDefId?'voiceCheck':'voiceunCheck'" v-for="(item,index) in voiceData" :key='index' @click="checkVoice(index,item)">
					<view class="checkIcon" v-if="ttsScene.sceneDefId==item.sceneDefId"></view>
					<view class="imgHeader"><image :src="item.miniAvatarUrl" mode=""></image></view>
					<view class="voiceItemText">
						<text>{{item.name.split('-')[0]}}</text>
						<text style="color: #333333;font-size: 24rpx;margin-top: 20rpx;">{{item.name.split('-')[1]}}</text>
					</view>
				</view>
			</view>
			<!-- 回复设置 -->
			<view class="voiceSetting">
				<!-- 定制回复 -->
				<view class="customReply" @click="customReplyPage">
					<view class="replyLeft">
						<view class="replyIcon"><image src="../../../static/setting/huifu@2x.png" mode=""></image></view>
						<text class="customReplytext">定制回复</text>
						<text class="cuIcon-question questionIcon" @click.stop="question"></text>
					</view>
					<view class="replyRight">
						<view class="replyItem"><text>快递</text><text>外卖</text><text>拒接</text></view>
						<text class="cuIcon-right rightIcon"></text>
					</view>
				</view>
				<view class="settingDeliver"></view>
				<!-- 拒绝黑名单-->
				<view class="customReply" @click="rejectionBlacklist">
					<view class="replyLeft">
						<view class="replyIcon"><image src="../../../static/setting/jujie@2x.png" mode=""></image></view>
						<text class="customReplytext">拒接白名单</text>
					</view>
					<view class="replyRight">
						<text>设置号码，小秘不接听</text>
						<text class="cuIcon-right rightIcon"></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 启用小秘 -->
		<view class="secretary">
			<view class="secretaryTitle">
				<text>启用场景设置</text>
				<text style="color: #999999; font-size: 26rpx;font-weight: 400;" @click="OpenUnsuccessful">开启不成功？</text>
			</view>
			<view class="secretaryBoxOut">
				<view class="secretaryBox">
					<view class="secretaryItem">
						<view class="secretaryItemImg"><image src="../../../static/setting/guaduan@2x.png" mode=""></image></view>
						<text class="secretaryText">挂断转接</text>
						<view class="secretaryItemBtn open" @click="secretary(0)">开启</view>
					</view>
					<view class="secretaryItem">
						<view class="secretaryItemImg"><image src="../../../static/setting/wuyingda@2x.png" mode=""></image></view>
						<text class="secretaryText">无应答</text>
						<view class="secretaryItemBtn open" @click="secretary(1)">开启</view>
					</view>
					<view class="secretaryItem">
						<view class="secretaryItemImg"><image src="../../../static/setting/wuwangluo@2x.png" mode=""></image></view>
						<text class="secretaryText">无网络</text>
						<view class="secretaryItemBtn open" @click="secretary(2)">开启</view>
					</view>
				</view>
				<view class="secretaryBoxDeliver"></view>
				<view class="closeTotal" @click="closeAll">
					<text>一键关闭</text>
				</view>
			</view>

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
		<!-- 场景选择-->
		<uni-popup ref="scenariopopup" type="bottom" style="z-index: 10000;">
			<view class="scenarioBox">
				<view>
					<view v-for="(item,index) in PrologueList" :key='index' @click="prologueSet(item)">
						<view class="scenarioItem">
							<view class="scenarioItemLeft">
								<view class="scenarioItemCheck">
									<text v-if="PrologueCurrent.id == item.id" class="cuIcon-check"></text>
								</view>
								<text class="scenarioItemName">{{item.name}}</text>
							</view>	
							<view v-if="PrologueCurrent.id !== item.id" class="scenarioCheckIcon" @click.stop="deletePrologue(item)">
								<text class="cuIcon-delete deleteIcon"></text>	
							</view>						
						</view>
						<view class="scenarioDeliver"></view>
					</view>
					<view class="scenarioItem" @click="addScene">
						<view style="margin-left: 40rpx;">
							<text class="cuIcon-add" style="margin-left: -20rpx;"></text>
							<text style="margin-left: 10rpx;">新建</text>
						</view>
						
					</view>
				</view>	
			</view>
		</uni-popup>
		<!-- 挂断转接弹窗 -->
		<uni-popup ref='transfer' type='center' style="z-index: 10000;" :maskClick='false'>
			<view class="popBox">
				<view class="popTitle">挂断转接</view>
				<view class="popContain">
					<text>遇忙呼叫转移，请点击拨打号码</text>
					<text style="color: #1C75FF;">{{this.transferOpenTel}}</text>
					<text>此操作不产生任何费用</text>
				</view>
				<view class="popTip">
					<text>设置成功后会提示</text>
					<text>“设置注册成功”</text>
				</view>
				<view class="popBtn">
					<view class="popBtnLeft" @click="transferClose">停用</view>
					<view class="popBtnRight" @click="transferOpen">开启</view>
				</view>
			</view>
			<view class="closeImage">
				<image src="../../../static/incomeHome/guanbi@2x.png" mode="" @click="closeDue"></image>
			</view>
		</uni-popup>
		<!-- 无应答弹窗 -->
		<uni-popup ref='noAnswer' type='center' style="z-index: 10000;" :maskClick='false'>
			<view class="popBox">
				<view class="popTitle">无应答</view>
				<view class="popContain">
					<text>无人接听呼叫转移，请点击拨打号码</text>
					<text style="color: #1C75FF;">{{noAnswerOpenTel}}</text>
					<text>此操作不产生任何费用</text>
				</view>
				<view class="popTip">
					<text>设置成功后会提示</text>
					<text>“设置注册成功”</text>
				</view>
				<view class="popBtn">
					<view class="popBtnLeft" @click="noAnswerClose">停用</view>
					<view class="popBtnRight" @click="noAnswerOpen">开启</view>
				</view>
			</view>
			<view class="closeImage">
				<image src="../../../static/incomeHome/guanbi@2x.png" mode="" @click="closeDue"></image>
			</view>
		</uni-popup>
		<!-- 无网络弹窗 -->
		<uni-popup ref='noNetwork' type='center' style="z-index: 10000;" :maskClick='false'>
			<view class="popBox">
				<view class="popTitle">无网络</view>
				<view class="popContain">
					<text>无法接通呼叫转移，请点击拨打号码</text>
					<text style="color: #1C75FF;">{{noNetworkOpenTel}}</text>
					<text>此操作不产生任何费用</text>
				</view>
				<view class="popTip">
					<text>设置成功后会提示</text>
					<text>“设置注册成功”</text>
				</view>
				<view class="popBtn">
					<view class="popBtnLeft" @click="noNetworkClose">停用</view>
					<view class="popBtnRight" @click="noNetworkOpen">开启</view>
				</view>
			</view>
			<view class="closeImage">
				<image src="../../../static/incomeHome/guanbi@2x.png" mode="" @click="closeDue"></image>
			</view>
		</uni-popup>
		<!-- 一键关闭弹窗 -->
		<uni-popup ref='turnOff' type='center' style="z-index: 10000;" :maskClick='false'>
			<view class="popBox">
				<view class="popTitle">一键关闭</view>
				<view class="popContain">
					<text>一键关闭呼叫转移，请点击拨打号码</text>
					<text style="color: #1C75FF;">{{turnOffTel}}</text>
					<text>此操作不产生任何费用</text>
				</view>
				<view class="popTip">
					<text>设置成功后会提示</text>
					<text>“设置注册成功”</text>
				</view>
				<view class="popBtn">
					<view class="turnOffButton" @click="turnOffClose">一键关闭</view>
				</view>
			</view>
			<view class="closeImage">
				<image src="../../../static/incomeHome/guanbi@2x.png" mode="" @click="closeDue"></image>
			</view>
		</uni-popup>
		<!-- 开场白弹窗 -->
		<uni-popup ref='openPop' type='center' style="z-index: 10000;" :maskClick='false'>
			<view class="questionBox">
				<view class="questionTitle">开场白说明</view>
				<view class="questionContain">魔小秘第一句说出的内容，起着介绍自己，带动对方；留言或说话的目的~</view>
				<view class="questionBtn" @click="closeDue">我知道了</view>
			</view>
			<view class="closeImage">
			</view>
		</uni-popup>
		<!-- 问号弹窗 -->
		<uni-popup ref='question' type='center' style="z-index: 10000;" :maskClick='false'>
			<view class="questionBox">
				<view class="questionTitle">帮助魔小秘回答</view>
				<view class="questionContain">针对各个场景可以自定义输入回答让魔小秘帮您说~</view>
				<view class="questionBtn" @click="closeDue">我知道了</view>
			</view>
			<view class="closeImage">
			</view>
		</uni-popup>
	</view>
</template>

<script>
	let innerAudioContext = uni.createInnerAudioContext();
	import uniPopup from "../../../components/uni-popup/uni-popup.vue"
	import { TRANSFERCONFIG,TTSPLAID,TTSUPDATE,TTSSCENE,TTSCONVERT,PROLOGUELIST,PROLOGUECURRENT,PROLOGUESET,PROLOGUEDELETE,GETNUMINFO } from '../../../utils/api.js'
	export default {
		components: {uniPopup},
		data() {
			return {
				voiceData:[
					{name: '第一人称',text: '男声'},
					{name: '第一人称',text: '女声'},
					{name: '第三人称',text: '男声'},
					{name: '第三人称',text: '女声'},
				],
				voiceCheck: 0,
				secretaryCheck: 0,
				TransferState: '',//转接状态
				ttsScene: '',//当前音色
				PrologueList: '',//开场白列表
				PrologueCurrent: '',//当前开场白
				isPlay: false,
				telData: '',
				mobileType: '',
				voiceType: '',
				currentUrl: '',
				turnOffTel: '',
				transferOpenTel: '',
				transferCloseTel: '',
				noAnswerCloseTel: '',
				noAnswerOpenTel: '',
				noNetworkCloseTel:'',
				noNetworkOpenTel: '',
				transferTel: ''
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
		onLoad(){
			uni.showToast({
				title:'加载中...',
				icon:'none'
			})
			//转接状态
			this.getTransferConfig()
			// 开场白列表
			this.getPrologueList()
			// 获取音色列表TTSPLAID
			this.getTtsplaid()
			// 查询当前音色
			this.checkTtsScene()
			// 当前开场白
			this.getPrologueCurrent()
			// 获取电话
			this.getNumberInfo()
		},
		methods: {
			// 获取电话
			getNumberInfo() {
				const params = {}
				this.$request.url_request(GETNUMINFO, params, "GET", res => {
					this.telData = JSON.parse(res.data).data.mobile
					this.transferTel = JSON.parse(res.data).data.line
					// 移动
					var isChinaMobile = /1(((3[5-9]|4[7]|5[012789]|7[28]|8[23478]|9[8])\d{8})|((34)[0-8]\d{7}))/
					// 联通
					var isChinaUnion = /1(3[0-2]|4[5]|5[56]|6[6]|7[156]|8[56])\d{8}/
					//电信
					var isChinaTelcom = /1(3[3]|4[9]|5[3]|7[37]|8[019]|9[19])\d{8}/
					if (isChinaMobile.test(this.telData) || isChinaUnion.test(this.telData)){
						console.log('移动或联通')
						this.turnOffTel = '##002#'
						this.transferOpenTel = '**67*'+this.transferTel+'#'
						this.transferCloseTel = '#67#' 
						this.noAnswerCloseTel= '##67#',
						this.noAnswerOpenTel= '**61*'+this.transferTel+'#',
						this.noNetworkCloseTel= '##62#',
						this.noNetworkOpenTel= '**62*'+this.transferTel+'#',
						this.mobileType = 1
						
					} else if (isChinaTelcom.test(this.telData)){
						console.log('电信')
						// this.turnOffTel = '*730'
						this.turnOffTel = '*920'
						this.transferOpenTel = '*900'+this.transferTel+'#'
						this.transferCloseTel = '*900'
						this.noAnswerCloseTel= '*920',
						this.noAnswerOpenTel= '*920'+this.transferTel+'#',
						this.noNetworkCloseTel= '*920',
						this.noNetworkOpenTel= '*68'+this.transferTel+'#',
						this.mobileType =0
					}
				}, err => {})
			},
			// 当前开场白
			getPrologueCurrent(){
				const params = {}
				this.$request.url_request(PROLOGUECURRENT,params,'GET',res=>{
					this.PrologueCurrent = JSON.parse(res.data).data.data
					this.voiceType = this.PrologueCurrent.voiceType
					this.currentUrl = this.PrologueCurrent.customOssUrl
					console.log('开场白类型',this.voiceType)
				},err=>{})
			},
			// 开场白列表
			getPrologueList(){
				const params = {}
				this.$request.url_request(PROLOGUELIST,params,'GET',res=>{
					this.PrologueList = JSON.parse(res.data).data.data.list
				},err=>{})
			},
			// 设置开场白
			prologueSet(item){
				var that = this
				const params = {
					id: item.id
				}
				this.$request.url_request(PROLOGUESET,params,'GET',res=>{
					that.getPrologueCurrent()
					that.$refs.scenariopopup.close()
				},err=>{})
			},
			// 修改开场白
			modifyText(){
				uni.navigateTo({
					url:'../AddScene/AddScene?id='+this.PrologueCurrent.id
				})
			},
			// 删除开场白
			deletePrologue(item){
				var that = this
				const params = {
					id: item.id
				}
				this.$request.url_request(PROLOGUEDELETE,params,'GET',res=>{
					if(JSON.parse(res.data).data.code == 200){
						uni.showToast({
							title:'删除成功',
							icon:'success',
							duration:1200
						})
						that.getPrologueList()
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
			// 转接状态
			getTransferConfig(){
				const params = {}
				this.$request.url_request(TRANSFERCONFIG,params,'GET',res=>{
					uni.hideToast()
					this.TransferState = JSON.parse(res.data).data.data
				},err=>{})
			},
			// 获取音色列表
			getTtsplaid(){
				const params = {}
				this.$request.url_request(TTSPLAID,params,'GET',res=>{
					this.voiceData = JSON.parse(res.data).data.data
				},err=>{})
			},
			// 播放语音
			playVoice(){
				var that = this
				this.isPlay = !this.isPlay
				console.log('是否播放',this.isPlay)
				if(this.isPlay){
					uni.showToast({
						title:'语音生成中',
						icon:'loading'
					})
					if(that.voiceType == 1 || that.voiceType == 0){
						const params = {
							ttsKey: this.ttsScene.ttsKey,
							text: this.PrologueCurrent.customText
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
										
					} else{
						uni.hideToast()
						innerAudioContext.autoplay = true;
						innerAudioContext.src = that.currentUrl;
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
					}
				
				}else{
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
			// 挂断停用
			transferClose(){
				uni.makePhoneCall({
				    phoneNumber: this.transferCloseTel
				});	
				this.$refs.transfer.close()
			},
			// 挂断启用
			transferOpen(){
				uni.makePhoneCall({
				    phoneNumber: this.transferOpenTel
				});
				this.$refs.transfer.close()
			},
			// 无应答停用
			noAnswerClose(){
				uni.makePhoneCall({
				    phoneNumber: this.noAnswerCloseTel
				});	
				this.$refs.noAnswer.close()
			},
			// 无应答启用
			noAnswerOpen(){
				uni.makePhoneCall({
				    phoneNumber: this.noAnswerOpenTel
				});
				this.$refs.noAnswer.close()
			},
			// 无网络停用
			noNetworkClose(){
				uni.makePhoneCall({
				    phoneNumber: this.noNetworkCloseTel
				});
				this.$refs.noNetwork.close()
			},
			// 无网络启用
			noNetworkOpen(){
				uni.makePhoneCall({
				    phoneNumber: this.noNetworkOpenTel
				});
				this.$refs.noNetwork.close()
			},
			// 问题弹窗
			question(){
				this.$refs.question.open()
			},
			openPop(){
				this.$refs.openPop.open()
			},
			// 一键关闭
			closeAll(){
				this.$refs.turnOff.open()
			},
			// 一键关闭开启
			turnOffClose(){
					uni.makePhoneCall({
					    phoneNumber: this.turnOffTel
					});
			},
			// 新增场景
			addScene(){
				this.$refs.scenariopopup.close()
				uni.navigateTo({
					url:'../AddScene/AddScene'
				})
			},
			// 弹窗处理
			secretary(index){
				if(index == 0){
					this.$refs.transfer.open()
				} else if(index ==1){
					this.$refs.noAnswer.open()
				} else if(index == 2){
					this.$refs.noNetwork.open()
				}
			},
			// 关闭弹窗
			closeDue(){
				this.$refs.transfer.close()
				this.$refs.noAnswer.close()
				this.$refs.noNetwork.close()
				this.$refs.turnOff.close()
				this.$refs.question.close()
				this.$refs.openPop.close()
			},
			// 选择音色
			checkVoice(index,item){
				var that = this
				this.voiceCheck = index
				// 设置音色
				const params = {
					ttsKey: item.ttsKey,
					sceneType: item.sceneType,
					sceneDefId: item.sceneDefId
				}
				this.$request.url_request(TTSUPDATE,params,'GET',res=>{
					// 查询当前音色
					that.checkTtsScene()
				},err=>{})				
			},
			//场景选择
			 chooseScenario(){
				 this.$refs.scenariopopup.open()
			 },
			 // 自定义回复
			 customReplyPage(){
				 uni.navigateTo({
				 	url:'../CustomReply/CustomReply'
				 })
			 },
			 // 拒接黑名单
			 rejectionBlacklist(){
				 uni.navigateTo({
				 	url:'../RejectionBlacklist/RejectionBlacklist'
				 })
			 },
			 // 开启不成功
			 OpenUnsuccessful(){
				uni.navigateTo({
					url:'../OpenUnsuccessful/OpenUnsuccessful'
				})
			 }
		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
	.topHead{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.topHeadLeft {
		font-size: 32rpx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.setting {
		padding: 30rpx;
	}

	.questionIcon {
		font-weight: normal;
		color: #C3C3C3;
		margin-left: 15rpx;
	}
	.topHeadRight{
		padding: 10rpx 24rpx;
		color: #FFFFFF;
		text-align: center;
		font-size: 24rpx;
		background:linear-gradient(-90deg,rgba(28,117,255,1),rgba(87,153,255,1));
		box-shadow:0px 10px 15px 0px rgba(133,181,255,0.65);
		border-radius:22rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.downIcon{
		width: 25rpx;
		font-size: 40rpx;
		height: 20rpx;
		line-height: 20rpx;
		text-align: center;
	}
	.settingBanner{
		width:690rpx;
		height:332rpx;
		margin-top: 30rpx;
		border-radius:30rpx;
		position: relative;
		z-index: 10;
	}
	.imageshadow{
		width:690rpx;
		height:332rpx;
		background:linear-gradient(0deg,rgba(41,27,0,1) 0%,rgba(255,255,255,0) 100%);
		opacity:0.7;
		border-radius:30rpx;
		position: absolute;
		top: 0;
		left: 0;
		/* z-index: 9; */
	}
	.settingBanner>image{
		width:690rpx;
		height:332rpx;
		position: absolute;
		border-radius:30rpx;	
		top: 0;
		left: 0;
		z-index: -1;
	}
	.bannerText{
		width:690rpx;
		padding: 0 30rpx;
		position: absolute;
		bottom: 20rpx;
		color: #FFFFFF;
	}
	.bannerIcon{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 10rpx;
	}
	.iconItem{
	}
	.iconItemRight>image{
		width: 36rpx;
		height: 36rpx;
	}
	.iconItem>image{
		width: 43rpx;
		height: 43rpx;
	}
	/* 音色选择 */
	.voiceChoose{
		margin-top: 27rpx;
	}
	.title{
		color: #333333;
		font-size: 32rpx;
		font-weight: 600;
	}
	.voiceBox{
		margin-top: 30rpx;
		overflow-x: scroll;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.clear:after{
		content: '';
		display: block;
		visibility: hidden;
		clear: both;
	}
	.voiceItem{
		width:306rpx;
		height:152rpx;
		padding: 0 23rpx;
		border-radius:15rpx;
		float: left;
		margin-right: 20rpx;
		flex-shrink: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
	}
	.voiceCheck{
		border: 1rpx solid #1C75FF;
	}
	.checkIcon{
		background-image: url(~@/static/setting/check.png);
		background-size: cover;
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		bottom: 0;
		right: 0;
	}
	.voiceunCheck{
		border: 1rpx solid #E3E3E3;
	}
	.imgHeader{
		width:100rpx;
		height:100rpx;
		border-radius:50%;
	}
	.imgHeader>image{
		width:100rpx;
		height:100rpx;
		border-radius:50%;
	}
	.voiceItemText{
		color: #111111;
		display: flex;
		font-size: 28rpx;
		flex-direction: column;
		margin-left: 20rpx;
	}
	.voiceSetting{
		margin-top: 37rpx;
		width:690rpx;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 5rpx 20rpx 0rpx rgba(204,215,232,0.5);
		border-radius:15rpx;
		padding: 37rpx 27rpx;
	}
	.customReply{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.replyLeft{
		font-size: 30rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.replyIcon{
		width: 68rpx;
		height: 67rpx;
	}
	.replyItem>text{
		margin: 5rpx;
	}
	.replyIcon>image{
		margin-top: 13rpx;
		width: 68rpx;
		height: 67rpx;
	}
	.customReplytext{
		 color: #333333;
		 margin-left: 21rpx;
	}
	.replyRight{
		color: #999999;
		font-size: 26rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.rightIcon{
		margin-top: 5rpx;
	}
	.settingDeliver{
		height: 1rpx;
		background: #EDEDED;
		width: 100%;
		margin: 35rpx 0;
	}
	/* 启用小秘 */
	.secretary{
		margin-top: 33rpx;
	}
	.secretaryTitle{
		color: #333333;
		font-size: 32rpx;
		font-weight: 600;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.secretaryBoxOut{
		width:690rpx;
		margin-top: 30rpx;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 5rpx 20rpx 0rpx rgba(204,215,232,0.5);
		border-radius:15rpx;
		padding: 30rpx 50rpx 0 50rpx;
		display: flex;
		flex-direction: column;
	}
	.secretaryBoxDeliver{
		border-top: 1rpx solid #EDEDED;
		margin-top: 40rpx;
	}
	.closeTotal{
		padding: 40rpx 0 30rpx 0;
		text-align: center;
		font-size: 26rpx;
		color: #C7C7C7;
	}
	.secretaryBox{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.secretaryItem{
		display: flex;
		flex-direction: column;
		align-items: center;
		
	}
	.secretaryItemImg{
		width: 132rpx;
		height: 103rpx;
	}
	.secretaryItemImg>image{
		width: 132rpx;
		height: 103rpx;
	}
	.secretaryItemBtn{
		padding: 10rpx 30rpx;
		text-align: center;
		color: #FFFFFF;
		border-radius:100rpx;
	}
	.close{
		background:rgba(220,220,220,1);	
	}
	.open{
		background:linear-gradient(-90deg,rgba(28,117,255,1),rgba(87,153,255,1));
		box-shadow:0rpx 10rpx 15rpx 0px rgba(133,181,255,0.65);
	}
	.secretaryText{
		margin: 30rpx 0;
	}
	.scenarioBox{
		width:750rpx;
		background:rgba(255,255,255,1);
		border-radius:30rpx 30rpx 0rpx 0rpx;
		padding-top: 20rpx;
	}
	.scenarioItem{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		font-size: 30rpx;
		color: #111111;
		padding: 30rpx;
	}
	.scenarioItemLeft{
		display: flex;
		flex-direction: row;
	}
	.scenarioItemName{
		width: 200rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.scenarioItemCheck{
		width: 40rpx;
		text-align: center;
		color: #1C75FF;
	}
	.scenarioCheckIcon{
		margin-left: 20rpx;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
	}
	.scenarioDeliver{
		width: 100%;
		border-top: 1rpx solid #E9E9E9;
	}
	/* 弹窗处理 */
	.popBox{
		width:528rpx;
		height:584rpx;
		background:#FFFFFF;
		border-radius:20rpx;
		overflow: hidden;
		position: relative;
	}
	.closeImage {
		width: 100%;
		height: 60rpx;
		margin-top: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.closeImage>image {
		width: 60rpx;
		height: 60rpx;
	}
	.popTitle{
		font-size: 34rpx;
		color: #111111;
		text-align: center;
		margin-top: 54rpx;
	}
	.popContain{
		margin-top: 53rpx;
		color: #111111;
		font-size: 28rpx;
		text-align: center;
		display: flex;
		flex-direction: column;
	}
	.popContain>text{
		margin: 5rpx 0;
	}
	.popTip{
		width:416rpx;
		height:131rpx;
		background:rgba(245,245,245,1);
		border-radius:5rpx;
		margin: auto;
		margin-top: 47rpx;
		text-align: center;
		font-size: 26rpx;
		color: #111111;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.popBtn{
		width: 100%;
		height: 85rpx;
		margin-top:50rpx;
		position: absolute;
		bottom: 0;
		left: 0;
		font-size: 30rpx;
		color: #111111;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-top: 1rpx solid #EAEAEA;
	}
	.turnOffButton{
		width: 100%;
		height: 85rpx;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		text-align: center;
		line-height: 85rpx;
	}
	.popBtnLeft{
		width: 263rpx;
		height: 85rpx;
		border-right: 1rpx solid #EAEAEA;
		border-bottom-left-radius: 20rpx;
		text-align: center;
		line-height: 85rpx;
	}
	.popBtnRight{
		width: 264rpx;
		height: 85rpx;
		border-bottom-right-radius: 20rpx;
		text-align: center;
		line-height: 85rpx;
		color: #1C75FF;
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
	/* 问题弹窗 */
	.questionBox{
		width:528rpx;
		padding: 50rpx 50rpx;
		background:#FFFFFF;
		border-radius:20rpx;
		overflow: hidden;
		position: relative;
	}
	.questionTitle{
		text-align: center;
		color: #111111;
		font-size: 30rpx;
		font-weight: 600;
	}
	.questionContain{
		margin-top: 40rpx;
		text-align: center;
		font-size: 28rpx;
		color: #666666;
	}
	.questionBtn{
		margin-top: 40rpx;
		color: #FFFFFF;
		padding: 20rpx;
		text-align: center;
		font-size: 30rpx;
		border-radius: 100rpx;
		background: linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -ms-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -webkit-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -moz-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
	}
</style>
