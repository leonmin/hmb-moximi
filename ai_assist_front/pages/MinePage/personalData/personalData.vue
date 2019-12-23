<template>
	<view>
		<view class="headItem">
			<view class="imagBox">
				<image class="headImg" src="../../../static/logoHead.png" mode=""></image>
				<image src="../../../static/personalData/paizhao@2x.png" class="cameraIcon" mode=""></image>
			</view>
		</view>
		<view class="list">
			<view class="listItem" @click="nickName">
				<view>
					<text>昵称</text>
				</view>
				<view class="listRight">
					<text>李某</text>
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="deliver"></view>
			<view class="listItem" @click="chooseSex">
				<view>
					<text>性别</text>
				</view>
				<view class="listRight">
					<text>女</text>
					<text class="cuIcon-right"></text>
				</view>
			</view>
		</view>
		<!-- 账号绑定 -->
		<view class="countBind">
			<text>账号绑定</text>
		</view>
		<!-- 账号绑定列表 -->
		<view class="bindList">
			<view class="listItem bindItem">
				<view class="listLeft">
					<image src="../../../static/personalData/shouji@2x.png" mode=""></image>
					<text>手机</text>
				</view>
				<view>
					<text>18382240965</text>
				</view>
			</view>
			<view class="deliver"></view>
			<view class="listItem bindItem">
				<view class="listLeft">
					<image src="../../../static/personalData/weixin@2x.png" mode=""></image>
					<text>微信</text>
				</view>
				<view>
					<text>Anigx</text>
				</view>
			</view>
		</view>
		<!-- 底部弹窗 -->
		<uni-popup ref="popup" type="bottom">
			<view class="sexBox">
				<view class="sexItem">
					<text>男</text>
				</view>
				<view class="deliverPop"></view>
				<view class="sexItem">
					<text>女</text>
				</view>
			</view>
		</uni-popup>
		<!-- 确认弹窗 -->
		<view class="cu-modal" :class="confirmShow?'show':''">
			<view class="cu-dialog" style="border-radius: 20rpx;">
				<view class="padding-xl">
					<text class="eoTipText">我的昵称</text>
					<view>
						<input class="nickNameInput" type="text" value="" />
					</view>
					<view class="cu-bar btn-group eoTipBtn">
						<button class="cu-btn bg-white shadowE7 round" @click="cancelSave">取消</button>
						<button class="cu-btn bg-blue shadow-blur round" @click="confirmCancel">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "../../../components/uni-popup/uni-popup.vue"
	export default {
		components:{
			uniPopup
		},
		data() {
			return {
				confirmShow:false
			}
		},
		methods: {
			// 修改昵称
			nickName(){
				this.confirmShow = true
			},
			confirmCancel(){
				this.confirmShow = false
			},
			cancelSave(){
				this.confirmShow = false
			},
			chooseSex(){
				this.$refs.popup.open()
			}
		}
	}
</script>

<style>
	page {
		background-color: #F3F6F7;
	}

	.headItem {
		background-color: #FFFFFF;
		padding: 50rpx 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.headImg {
		width: 183rpx;
		height: 183rpx;
		border-radius: 200rpx;
		position: relative;
	}
	.imagBox{
		position: relative;
	}
	.cameraIcon{
		width: 57rpx;
		height: 57rpx;
		border-radius: 100rpx;
		position: absolute;
		right: 0;
		bottom: 10rpx;
	}

	.list {
		background-color: #FFFFFF;
		padding: 0 30rpx;
	}

	.listItem {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 47rpx 0;
		color: #111111;
		font-size: 28rpx;
	}
	.listLeft{
		display: flex;
		align-items: center;
	}
	.listLeft>text{
		margin-left: 20rpx;
	}
	.listLeft>image {
		width: 55rpx;
		height: 55rpx;
		border-radius: 55rpx;
	}

	.listRight>text:nth-of-type(1) {
		margin-right: 40rpx;
	}

	.listRight>text:nth-of-type(2) {
		color: #999999;
		font-size: 34rpx;
	}

	.deliver {
		border-top: 1rpx solid #EDEDED;
	}

	.countBind {
		color: #111111;
		font-size: 30rpx;
		padding: 37rpx 30rpx;
		background-color: #F3F6F7;
	}

	.bindList {
		background-color: #FFFFFF;
		padding: 0 30rpx;
	}
	.bindItem{
		padding: 35rpx 0;
	}
	.sexBox{
		background-color: #FFFFFF;
		border-top-left-radius: 35rpx;
		border-top-right-radius: 35rpx;
	}
	.sexItem{
		padding: 30rpx;
		text-align: center;
	}
	.deliverPop{
		border-top: 2rpx solid #E9E9E9;
	}
	.eoTipText {
		color: #111111;
		font-size: 34rpx;
		font-weight: 600;
		display: inline-block;
		margin: 30rpx;
	}
	
	.eoTipBtn {
		margin: 40rpx 0 10rpx 0;
	}
	
	.eoTipBtn>button {
		padding: 38rpx 0;
	}
	.nickNameInput{
		text-align: left;
		border-bottom: 1rpx solid #e8e8e8;
		height: 60rpx;
		padding: 10rpx 30rpx;
	}
</style>
