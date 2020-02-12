<template>
	<view v-if="telData">
		<!-- 图片引导 -->
		<view class="imgBox">
			<image src="../../../static/welcome/shouji@2x.png" mode=""></image>
		</view>
		<!--呼叫号码 -->
		<view class="callNum">
			<text>呼叫下方号码，完成开启流程</text>
			<text>该呼叫不收取任何费用</text>
		</view>
		<!-- 号码展示 -->
		<view class="telDisplay">
			<text>{{telData.line}}</text>
			<view class="deliver"></view>
			<text>请用注册号码【 <text style="color: #1C75FF;">{{telData.mobile}}</text>】呼叫</text>
		</view>
		<!-- 呼叫按钮 -->
		<view class="callBtn">
			<button @click="haveACall">立即呼叫，完成设置</button>
		</view>
		<view class="tips">
			<text @click="setFailPage">设置失败？</text>
		</view>
		<!-- 确认弹窗 -->
		<view class="cu-modal" :class="confirmShow?'show':''">
			<view class="cu-dialog" style="border-radius: 20rpx;">
				<view class="padding-xl">
					<text class="eoTipText">最后一步,呼叫自己完成设置</text>
					<text class="telTip">【<text style="color: #1C75FF;">{{telData.mobile}}</text>】即将完成开通</text>
					<view class="cu-bar btn-group eoTipBtn">
						<button class="cu-btn bg-blue shadow-blur round" @click="callSelf">呼叫自己</button>
						<button class="cu-btn bg-white shadowE7 round" @click="reset">重新设置</button>
					</view>
					<view class="failTip">
						<text @click="setFailPage">设置失败</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 跳转弹窗 -->
		<view class="cu-modal" :class="jumpShow?'show':''">
			<view class="cu-dialog" style="border-radius: 20rpx;">
				<view class="padding-xl">
					<text class="eoTipText">是否是AI助手接听</text>
					<view>
						<text class="telTip">【<text style="color: #1C75FF;">{{telData.mobile}}</text>】即将完成开通</text>
					</view>
					<view class="cu-bar btn-group eoTipBtn">
						<button class="cu-btn bg-blue shadow-blur round" @click="gotoSetting">是</button>
						<button class="cu-btn bg-white shadowE7 round" @click="setFail">否</button>
					</view>
					<view class="failTip">
						<text @click="setFailPage">设置失败</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		GETNUMINFO
	} from '../../../utils/api.js'
	export default {
		data() {
			return {
				confirmShow: false,
				jumpShow: false,
				telData: ''
			}
		},
		filters: {
			mobileFilter: function(value) {
				var pat = /(\d{3})\d*(\d{4})/
				var b = value.replace(pat, '$1****$2');
				return b
			},
		},
		onLoad() {
			uni.showToast({
				title: '加载中...',
				icon: 'none'
			})
			this.getNumberInfo()
		},
		methods: {
			getNumberInfo() {
				const params = {}
				this.$request.url_request(GETNUMINFO, params, "GET", res => {
					this.telData = JSON.parse(res.data).data
					uni.hideToast()
					console.log('请求结果', this.telData)
				}, err => {})
			},
			haveACall() {
				var callTel
				var that = this
				console.log('电话', this.telData.mobile)
				// 移动
				var isChinaMobile = /1(((3[5-9]|4[7]|5[012789]|7[28]|8[23478]|9[8])\d{8})|((34)[0-8]\d{7}))/
				// 联通
				var isChinaUnion = /1(3[0-2]|4[5]|5[56]|6[6]|7[156]|8[56])\d{8}/
				//电信
				var isChinaTelcom = /1(3[3]|4[9]|5[3]|7[37]|8[019]|9[19])\d{8}/
				if (isChinaMobile.test(this.telData.mobile)) {
					// 移动
					callTel = "*67*" + this.telData.line + "#"
					console.log('移动', callTel)
				} else if (isChinaUnion.test(this.telData.mobile)) {
					// 联通
					callTel = "**67*" + this.telData.line + "#"
					console.log('联通', callTel)
				} else if (isChinaTelcom.test(this.telData.mobile)) {
					// 电信
					callTel = "*90" + this.telData.line + "#"
					console.log('电信', callTel)
				}
				uni.makePhoneCall({
					phoneNumber: callTel,
					complete: () => {
						setTimeout(() => {
							that.confirmShow = true
						}, 4000)
					}
				})
			},
			callSelf() {
				var that = this
				uni.makePhoneCall({
					phoneNumber: this.telData.mobile,
					complete: () => {
						setTimeout(() => {
							that.confirmShow = false
							that.jumpShow = true
						}, 2000)
					}
				})
			},
			// 重置
			reset() {
				this.confirmShow = false
			},
			// 跳转
			gotoSetting(){
				uni.reLaunch({
					url:'../../SettingPage/SettingPage'
				})
			},
			// 设置失败
			setFail(){
				this.jumpShow = false
				this.confirmShow = true
			},
			// 设置失败页面
			setFailPage(){
				uni.navigateTo({
					url:'../../helpCenter/setFail'
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.imgBox {
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 70rpx 0 50rpx 0;
	}

	.imgBox>image {
		width: 683rpx;
		height: 463rpx;
	}

	.callNum {
		display: flex;
		flex-direction: column;
		padding: 0 47rpx;
	}

	.callNum>text:nth-of-type(1) {
		color: #111111;
		font-size: 36rpx;
		font-weight: 600;
	}

	.callNum>text:nth-of-type(2) {
		color: #1c75ff;
		margin-top: 10rpx;
		font-size: 26rpx;
	}

	.telDisplay {
		padding: 50rpx 47rpx;
		display: flex;
		flex-direction: column;
	}

	.telDisplay>text:nth-of-type(1) {
		color: #111111;
		font-size: 38rpx;
		font-weight: 600;
	}

	.telDisplay>text:nth-of-type(2) {
		color: #111111;
		font-size: 26rpx;
	}

	.deliver {
		border-top: 1rpx solid #DDDDDD;
		margin: 30rpx 0;
	}

	.callBtn {
		margin: 37rpx 47rpx 17rpx 47rpx;
	}

	.callBtn>button,
	.confirmBtn>button {
		font-size: 30rpx;
		color: #FFFFFF;
		border-radius: 100rpx;
		box-shadow: 1rpx 1rpx 5rpx #1C75FF;
		background: linear-gradient(left, #1c75ff 0%, #1c75ff 60%, #5799ff 90%, #5799ff 100%);
		background: -ms-linear-gradient(left, #1c75ff 0%, #1c75ff 60%, #5799ff 90%, #5799ff 100%);
		background: -webkit-linear-gradient(left, #1c75ff 0%, #1c75ff 60%, #5799ff 90%, #5799ff 100%);
		background: -moz-linear-gradient(left, #1c75ff 0%, #1c75ff 60%, #5799ff 90%, #5799ff 100%);
	}

	.tips {
		text-align: center;
		fill: 26rpx;
		color: #999999;
		margin-top: 20rpx;
	}

	.eoTipText {
		color: #111111;
		font-size: 34rpx;
		font-weight: 600;
		display: inline-block;
		margin: 30rpx;
	}
	.telTip{
		font-size: 24rpx;
		color: #666666;
	}
	.confirmBtn {
		border: 1rpx solid red;
		/* margin: 50rpx 76rpx; */
	}

	.reset {
		margin-top: 40rpx;
		
	}

	button::after {
		border: none;
	}

	.padding-xl {
		padding: 50rpx 30rpx !important;
	}
	.eoTipBtn{
		margin-top: 50rpx;
	}
	.failTip{
		text-align: center;
		margin-top: 20rpx;
		font-size: 26rpx;
		color: #999999;
	}
</style>
