<template>
	<view v-if="phoneNum">
		<view class="title">
			<text>您的专属转接号码是：</text>
		</view>
		<view class="transferNumber">
			<view class="numItem">
				<view class="numInput">
					<text>{{phoneNum}}</text>
				</view>
				<text class="copy"  v-clipboard:copy="phoneNum" v-clipboard:success="(type) => onCopyResult('success')"
							 v-clipboard:error="(type) => onCopyResult('error')">立即复制</text>
			</view>
			<view class="tip">
				<text>您的服务开通号码：<text style="color: #1C75FF;">{{myPhone}}</text></text>
			</view>
		</view>
		<view class="mineList">
			<!-- 启用魔小秘 -->
			<view class="mineList-item" @click="enableNum">
				<view class="listItem-header">
					<image style="width: 39rpx;height: 39rpx;" class="listItem-headerIcon" src="../../../static/excluslveNum/qiyong@2x.png"
					 mode=""></image>
					<view class="listItem-headerTitle">
						启用魔小秘
					</view>
				</view>
				<view class="listItem-footer">
			
					<view class="listItem-footerTitle">
						点击启用
					</view>
					<image style="height: 22rpx; width: 12rpx;margin-left: 18rpx;" class="listItem-footerIcon" src="../../../static/mine/VIPPage/jinru@2x.png"
					 mode=""></image>
				</view>
			</view>
			<!-- 停用魔小秘 -->
			<view class="mineList-item" @click="stopNum">
				<view class="listItem-header">
					<image style="width: 39rpx;height: 39rpx;" class="listItem-headerIcon" src="../../../static/excluslveNum/tingyong@2x.png"
					 mode=""></image>
					<view class="listItem-headerTitle">
						停用魔小秘
					</view>
				</view>
				<view class="listItem-footer">
			
					<view class="listItem-footerTitle">
						点击停用
					</view>
					<image style="height: 22rpx; width: 12rpx;margin-left: 18rpx;" class="listItem-footerIcon" src="../../../static/mine/VIPPage/jinru@2x.png"
					 mode=""></image>
				</view>
			</view>
			<!-- 验证魔小秘 -->
			<view class="mineList-item" @click="validateNum">
				<view class="listItem-header">
					<image style="width: 36rpx;height: 40rpx;" class="listItem-headerIcon" src="../../../static/excluslveNum/yanzheng@2x.png"
					 mode=""></image>
					<view class="listItem-headerTitle">
						验证是否启用
					</view>
				</view>
				<view class="listItem-footer">
			
					<view class="listItem-footerTitle">
						点击验证
					</view>
					<image style="height: 22rpx; width: 12rpx;margin-left: 18rpx;" class="listItem-footerIcon" src="../../../static/mine/VIPPage/jinru@2x.png"
					 mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { GETNUMINFO } from '../../../utils/api.js'
	export default {
		data() {
			return {
				phoneNum: '',
				myPhone: ''
			}
		},
		onLoad() {
			// 获取呼叫转接号码
			this.getPhoneNum()
			uni.showToast({
				title: '加载中..',
				icon: 'none',
				mask: false
			})
		},
		methods: {
			// 启用魔小秘
			enableNum(){
				var callTel
				var that = this
				console.log('电话', this.myPhone)
				// 移动
				var isChinaMobile = /1(((3[5-9]|4[7]|5[012789]|7[28]|8[23478]|9[8])\d{8})|((34)[0-8]\d{7}))/
				// 联通
				var isChinaUnion = /1(3[0-2]|4[5]|5[56]|6[6]|7[156]|8[56])\d{8}/
				//电信
				var isChinaTelcom = /1(3[3]|4[9]|5[3]|7[37]|8[019]|9[19])\d{8}/
				if (isChinaMobile.test(this.myPhone)) {
					// 移动
					callTel = "*67*" + this.phoneNum + "#"
					console.log('移动', callTel)
				} else if (isChinaUnion.test(this.myPhone)) {
					// 联通
					callTel = "**67*" + this.phoneNum + "#"
					console.log('联通', callTel)
				} else if (isChinaTelcom.test(this.myPhone)) {
					// 电信
					callTel = "*90" + this.phoneNum + "#"
					console.log('电信', callTel)
				}
				uni.makePhoneCall({
					phoneNumber: callTel
				})
			},
			// 停用魔小秘
			stopNum(){
				var callTel
				var that = this
				// 移动
				var isChinaMobile = /1(((3[5-9]|4[7]|5[012789]|7[28]|8[23478]|9[8])\d{8})|((34)[0-8]\d{7}))/
				// 联通
				var isChinaUnion = /1(3[0-2]|4[5]|5[56]|6[6]|7[156]|8[56])\d{8}/
				//电信
				var isChinaTelcom = /1(3[3]|4[9]|5[3]|7[37]|8[019]|9[19])\d{8}/
				if (isChinaMobile.test(this.myPhone)) {
					// 移动
					callTel = "##002#"
					console.log('移动', callTel)
				} else if (isChinaUnion.test(this.myPhone)) {
					// 联通
					callTel = "##002#"
					console.log('联通', callTel)
				} else if (isChinaTelcom.test(this.myPhone)) {
					// 电信
					callTel = "*730"
					console.log('电信', callTel)
				}
				uni.makePhoneCall({
					phoneNumber: callTel
				})
			},
			getPhoneNum(){
				const params = {}
				this.$request.url_request(GETNUMINFO,params,'GET',res=>{
					this.phoneNum = JSON.parse(res.data).data.line
					this.myPhone = JSON.parse(res.data).data.mobile
					uni.hideToast()
				},err =>{})
			},
			// 验证魔小秘
			validateNum(){
				uni.makePhoneCall({
					phoneNumber:this.myPhone
				})
			},
			// 复制
			onCopyResult(type) {
				if (type === 'success') {
					uni.showToast({
						title: '复制成功',
						icon: 'none',
						duration: 1000
					})
				} else {}
			},
		}
	}
</script>

<style>
	page{
		background: #F3F6F7;
	}
.title{
	background: #FFFFFF;
	font-size: 32rpx;
	color: #111111;
	padding: 30rpx;
}
.transferNumber{
	background: #FFFFFF;
	padding: 20rpx 30rpx 50rpx 30rpx;
}
.numItem{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.numInput{
	border: 1rpx solid #1C75FF;
	border-radius: 10rpx;
	width: 541rpx;
	padding: 27rpx;
	color: #111111;
	font-size: 36rpx;
}
.copy{
	display: block;
	margin-left: 33rpx;
	color: #1C75FF;
	size: 30rpx;
}
.tip{
	color: #333333;
	font-size: 28rpx;
	margin-top: 26rpx;
}
	.listItem-footerTitle {
		font-size: 26rpx;
		color: #999999;
	}

	.listItem-headerTitle {
		color: #222222;
		font-size: 32rpx;
		margin-left: 18rpx;
	}

	.listItem-footer {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.listItem-header {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.mineList-item {
		height: 112rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		padding-left: 40rpx;
		padding-right: 38rpx;
	}

	.mineList {
		background-color: #FFFFFF;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
</style>
