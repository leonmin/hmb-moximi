<template>
	<view class="setting">
		<!-- 标题 -->
		<view class="topHead">
			<view class="topHeadLeft">
				<text>开场白设置</text>
				<text class="cuIcon-question questionIcon"></text>
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
						<text class="cuIcon-question questionIcon"></text>
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
						<text class="customReplytext">拒接黑名单</text>
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
				<text style="color: #999999; font-size: 26rpx;font-weight: 400;">开启不成功？</text>
			</view>
			<view class="secretaryBox">
				<view class="secretaryItem">
					<view class="secretaryItemImg"><image :src="TransferState.busy == 1?'../../../static/setting/guaduan@2x.png':'../../../static/setting/guaduan1@2x.png'" mode=""></image></view>
					<text class="secretaryText">挂断转接</text>
					<view class="secretaryItemBtn" :class="TransferState.busy == 1?'open':'close'" @click="secretary(0)">{{TransferState.busy == 1?'开启':'关闭'}}</view>
				</view>
				<view class="secretaryItem">
					<view class="secretaryItemImg"><image :src="TransferState.noAnswer == 1?'../../../static/setting/wuyingda@2x.png':'../../../static/setting/wuyingda1@2x.png'" mode=""></image></view>
					<text class="secretaryText">无应答</text>
					<view class="secretaryItemBtn" :class="TransferState.noAnswer == 1?'open':'close'" @click="secretary(1)">{{TransferState.noAnswer == 1?'开启':'关闭'}}</view>
				</view>
				<view class="secretaryItem">
					<view class="secretaryItemImg"><image :src="TransferState.unreachable == 1?'../../../static/setting/wuwangluo@2x.png':'../../../static/setting/wuwangluo1@2x.png'" mode=""></image></view>
					<text class="secretaryText">无网络</text>
					<view class="secretaryItemBtn" :class="TransferState.unreachable == 1?'open':'close'" @click="secretary(2)">{{TransferState.unreachable == 1?'开启':'关闭'}}</view>
				</view>
			</view>
			<view class="closeTotal">
				<text @click="closeAll">一键关闭</text>
			</view>
		</view>
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
					<text style="color: #1C75FF;">*67*057126211610#</text>
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
					<text style="color: #1C75FF;">*61*057126211610#</text>
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
					<text style="color: #1C75FF;">*61*057126211610#</text>
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
	</view>
</template>

<script>
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
				mobileType: ''
			}
		},
		onLoad(){
			//转接状态
			this.getTransferConfig()
			// 获取音色列表TTSPLAID
			this.getTtsplaid()
			// 查询当前音色
			this.checkTtsScene()
			// 开场白列表
			this.getPrologueList()
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
					// 移动
					var isChinaMobile = /1(((3[5-9]|4[7]|5[012789]|7[28]|8[23478]|9[8])\d{8})|((34)[0-8]\d{7}))/
					// 联通
					var isChinaUnion = /1(3[0-2]|4[5]|5[56]|6[6]|7[156]|8[56])\d{8}/
					//电信
					var isChinaTelcom = /1(3[3]|4[9]|5[3]|7[37]|8[019]|9[19])\d{8}/
					if (isChinaMobile.test(this.telData) || isChinaUnion.test(this.telData)){
						console.log('移动或联通')
						this.mobileType = 1
						
					} else if (isChinaTelcom.test(this.telData)){
						console.log('电信')
						this.mobileType =0
					}
				}, err => {})
			},
			// 当前开场白
			getPrologueCurrent(){
				const params = {}
				this.$request.url_request(PROLOGUECURRENT,params,'GET',res=>{
					this.PrologueCurrent = JSON.parse(res.data).data.data
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
					// that.$refs.scenariopopup.close()
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
				uni.showToast({
					title:'语音生成中',
					icon:'loading'
				})
				const params = {
					ttsKey: this.ttsScene.ttsKey,
					text: this.PrologueCurrent.customText
				}
				this.$request.url_request(TTSCONVERT,params,'GET',res=>{
					uni.hideToast()
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
			},
			// 挂断停用
			transferClose(){
				if(this.mobileType == 1){
					uni.makePhoneCall({
					    phoneNumber: '#67#' 
					});	
				} else{
					uni.makePhoneCall({
					    phoneNumber: '*900' 
					});
				}
				this.$refs.transfer.close()
			},
			// 挂断启用
			transferOpen(){
				if(this.mobileType == 1){
					uni.makePhoneCall({
					    phoneNumber: '**67*057126211610#'
					});
				}
				else{
					uni.makePhoneCall({
					    phoneNumber: ' *90057126211610#'
					});
				}
			
				this.$refs.transfer.close()
			},
			// 无应答停用
			noAnswerClose(){
				if(this.mobileType == 1){
				uni.makePhoneCall({
				    phoneNumber: '##67#'
				});					
				}else{
				uni.makePhoneCall({
			    phoneNumber: '*920'
				});		
				}

				this.$refs.noAnswer.close()
			},
			// 无应答启用
			noAnswerOpen(){
				if(this.mobileType == 1){
					uni.makePhoneCall({
					    phoneNumber: '**61*057126211610#'
					});
					
				} else{
					uni.makePhoneCall({
					    phoneNumber: '*92057126211610#'
					});
					
				}

				this.$refs.noAnswer.close()
			},
			// 无网络停用
			noNetworkClose(){
				if(this.mobileType == 1){
					uni.makePhoneCall({
					    phoneNumber: '##62#'
					});
				}else{
					uni.makePhoneCall({
					    phoneNumber: '*920'
					});
				}
				this.$refs.noNetwork.close()
			},
			// 无网络启用
			noNetworkOpen(){
				if(this.mobileType == 1){
					uni.makePhoneCall({
					    phoneNumber: '**62*057126211610#'
					});
				}else{
					uni.makePhoneCall({
					    phoneNumber: '*92057126211610#'
					});
				}
				this.$refs.noNetwork.close()
			},
			// 一件关闭
			closeAll(){
				if(this.mobileType == 1){
					uni.makePhoneCall({
					    phoneNumber: ' ##002#'
					});
				} else{
					uni.makePhoneCall({
					    phoneNumber: '*730'
					});
				}
			},
			// 新增场景
			addScene(){
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
			 }
		}
	}
</script>

<style>
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
	.secretaryBox{
		width:690rpx;
		margin-top: 30rpx;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 5rpx 20rpx 0rpx rgba(204,215,232,0.5);
		border-radius:15rpx;
		padding: 30rpx 50rpx;
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
	.closeTotal{
		padding: 30rpx;
		text-align: center;
		font-size: 30rpx;
		color: #E01212;
	}
</style>
