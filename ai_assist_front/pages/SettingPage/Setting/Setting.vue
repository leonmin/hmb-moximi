<template>
	<view class="setting">
		<!-- 标题 -->
		<view class="topHead">
			<view class="topHeadLeft">
				<text>开场白设置</text>
				<text class="cuIcon-question questionIcon"></text>
			</view>
			<view class="topHeadRight" @click="chooseScenario">
				<text>默认</text>
				<text class="cuIcon-triangledownfill downIcon"></text>
			</view>
		</view>
		<!-- banner -->
		<view class="settingBanner">
			<view class="bannerText">
				<text>您好，我现在正在忙，您有什么事情可以简要说明一下。</text>
				<view class="bannerIcon">
					<view class="iconItem"><image src="../../../static/setting/bf@2x.png" mode=""></image></view>
					<view class="iconItemRight"><image src="../../../static/setting/bianij@2x.png" mode=""></image></view>
				</view>
			</view>
		</view>
		<!-- 音色选择 -->
		<view class="voiceChoose">
			<view class="title"><text>音色选择</text></view>
			<view class="voiceBox clear">
				<view class="voiceItem" :class="voiceCheck==index?'voiceCheck':'voiceunCheck'" v-for="(item,index) in voiceData" :key='index' @click="checkVoice(index)">
					<view class="checkIcon" v-if="voiceCheck == index"></view>
					<view class="imgHeader"></view>
					<view class="voiceItemText">
						<text>{{item.name}}</text>
						<text>{{item.text}}</text>
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
				<view class="secretaryItem" v-for="(item,index) in secretaryData" :key='index'>
					<view class="secretaryItemImg"><image :src="item.check" mode=""></image></view>
					<text class="secretaryText">{{item.name}}</text>
					<view class="secretaryItemBtn open"@click="secretary(index)">开启</view>
				</view>
			</view>
			<view class="closeTotal">
				<text>一键关闭</text>
			</view>
		</view>
		<!-- 场景选择-->
		<uni-popup ref="scenariopopup" type="bottom" style="z-index: 10000;">
			<view class="scenarioBox">
				<view>
					<view class="scenarioItem"><text>默认</text></view>
					<view class="scenarioDeliver"></view>
					<view class="scenarioItem"><text>旅游</text></view>
					<view class="scenarioDeliver"></view>
					<view class="scenarioItem"><text>开会</text></view>
					<view class="scenarioDeliver"></view>
					<view class="scenarioItem" @click="addScene">
						<text class="cuIcon-add"></text>
						<text>新建</text></view>
				</view>	
			</view>
		</uni-popup>
		<!-- 挂断转接弹窗 -->
		<uni-popup ref='transfer' type='center' style="z-index: 10000;" :maskClick='false'>
			<view class="popBox">
				<view class="popTitle">挂断转接</view>
				<view class="popContain">
					<text>遇忙呼叫转移，请点击拨打号码</text>
					<text style="color: #1C75FF;">**67*057156335846#</text>
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
					<text style="color: #1C75FF;">**61*057156335846#</text>
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
					<text style="color: #1C75FF;">**62*057156335846#</text>
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
	import { TRANSFERCONFIG } from '../../../utils/api.js'
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
				secretaryData: [
					{name:'挂断转接',check:'../../../static/setting/guaduan@2x.png',uncheck: '../../../static/setting/guaduan1@2x.png'},
					{name:'无应答',check:'../../../static/setting/wuyingda@2x.png',uncheck: '../../../static/setting/wuyingda1@2x.png'},
					{name:'无网络',check:'../../../static/setting/wuwangluo@2x.png',uncheck: '../../../static/setting/wuwangluo1@2x.png'}
				],
				secretaryCheck: 0
			}
		},
		onLoad(){
			//转接状态
			this.getTransferConfig()
		},
		methods: {
			// 转接状态
			getTransferConfig(){
				const params = {}
				this.$request.url_request(TRANSFERCONFIG,params,'GET',res=>{},err=>{})
			},
			// 挂断停用
			transferClose(){},
			// 挂断启用
			transferOpen(){},
			// 无应答停用
			noAnswerClose(){},
			// 无应答启用
			noAnswerOpen(){},
			// 无网络停用
			noNetworkClose(){},
			// 无网络启用
			noNetworkClose(){},
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
			checkVoice(index){
				this.voiceCheck = index
				
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
		background:linear-gradient(0deg,rgba(41,27,0,1) 0%,rgba(255,255,255,0) 100%);
		opacity:0.7;
		margin-top: 30rpx;
		border-radius:30rpx;
		position: relative;
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
		border: 1rpx solid #F0AD4E;
	}
	.voiceItemText{
		display: flex;
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
		text-align: center;
		font-size: 30rpx;
		color: #111111;
		padding: 30rpx;
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
