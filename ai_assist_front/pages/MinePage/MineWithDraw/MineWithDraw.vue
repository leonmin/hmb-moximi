<template>
	<view v-if="myWalletData">
		<view class="mineHeader">
			<view class="mineHeader-body">
				<!-- 头部提示 -->
				<view class="mineHeader-header">
					<view class="mineHeader-tips">
						可提现
					</view>
					<view class="mineHeader-money">
						<text style="font-size: 40rpx;">￥</text>{{mineWithDraw}}
					</view>
				</view>

				<!-- 提现输入框 -->
				<form @submit="withdrawal">
					<view class="input-view">
					<view class="input-count">
						<input v-model="alipayAccount" @blur="pickupKeyboard" class="input-conteent" name="alipayAccount" placeholder="支付宝账号" type="text" value="" />
					</view>
					<view class="input-money">
						<input v-model="cash" @blur="pickupKeyboard" class="input-conteent" name="cash" placeholder="提现金额" type="text" value="" />
						<view class="total-money" @click="totalCash">
							全部
						</view>
					</view>
				<view class="registerBtn  btn-group">
					<button formType="submit" class="cu-btn bg-blue shadow-blur round input-commit" :disabled="isDisable">立即提现</button>
				</view>
<!-- 					<view class="input-commit" formType="submit">
						立即提现
					</view> -->

				</view>
			
				</form>
				
			</view>
		</view>
		
		<view class="withDrawTips">
			提现说明
		</view>
		<view class="withDrawContent">
			<view class="withDrawContent-title">
				1.提现金额不低于10元
			</view>
			<view class="withDrawContent-title">
				2.每月提现次数有限，每月可提现3次
			</view>
			<view class="withDrawContent-title">
				3.提现提交后，24小时内到账
			</view>
		</view>
		<!-- 弹窗 -->
		 <mpopup  ref="mpopup" :isdistance="true"></mpopup> 
	</view>
</template>

<script>
	import mpopup from "../../../components/xuan-popup/xuan-popup.vue"
	import { APPLYCASHOUT,MYCASH } from "../../../utils/api.js"
	import WxValidate from '../../../utils/WxValidate.js';
	export default {
		components:{mpopup},
		data() {
			return {
				mineWithDraw:"",
				myWalletData: '',
				cash:"",
				alipayAccount:"",
				message:"",
				isDisable: false
			}
		},
		onLoad() {
			uni.showToast({
				title:'加载中...',
				icon:'none',
				mask:true
			})
			this.mycash();
			this.initValidate();
		},
		methods: {
			// 初始化数据
			mycash(){
				const params = {}
				this.$request.url_request(MYCASH, params, "GET", res => {
					this.myWalletData = JSON.parse(res.data).data
					this.mineWithDraw = JSON.parse(res.data).data.balance
					uni.hideToast()
				}, err => {})
			},
			// 规则校验
			initValidate() {
				// 规则
				const rules = {
					alipayAccount: {
						required: true
					},
					cash: {
						required: true,
						checkcashTen: true
					}
				}
				// 提示
				const messages = {
					alipayAccount: {
						required: "请输入提现账号！"
					},
					cash: {
						required: "请输入提现金额",
						checkcashTen: '提现金额不得小于10元'
					}
				}
				this.WxValidate = new WxValidate(rules, messages)
			},
			// 提现
			withdrawal(e){
				this.isDisable = true
				var _this = this
				setTimeout(function(){
					_this.isDisable = false
					_this.$forceUpdate()
				},1000)
				const params = e.detail.value
				if (!this.WxValidate.checkForm(params)) {
					const error = this.WxValidate.errorList[0]
					// 可以自定义提示
					uni.showToast({
						title: `${error.msg}`,
						icon: 'none'
					});
					return false
				} else {
					this.$request.url_request(APPLYCASHOUT,params,"GET",res=>{
						console.log(JSON.parse(res.data))
						var result = JSON.parse(res.data)
						if(result.code == 0){
							uni.showToast({
								title:"提现申请提交成功！",
								icon:"success",
								mask:true,
								duration:1200
							})
							setTimeout(() =>{
								uni.navigateBack({
								})
							},1200)
						} else if(result.code ==500){
							uni.showToast({
								title:result.msg,
								icon:"none",
								mask:true,
								duration:1200
							})
						}
					
					},err=>{})	
					
				}	
				
			},
			// totalCash全部
			totalCash(){
				this.cash = this.mineWithDraw
			},
			// 收起键盘
			pickupKeyboard(){
				uni.pageScrollTo({
					scrollTop:0,
					duration:0
				})
			},
			goback(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F1F4F6;
	}
	.withDrawContent-title {
		margin-top: 30rpx;
	}
	.withDrawContent-title:first-of-type {
	    margin-top: 0rpx;
	}

	.withDrawContent {
		margin-top: 30rpx;
		
		background-color: #FFFFFF;
		margin-left: 30rpx;
		margin-right: 30rpx;
		border-radius: 20rpx;
		
		padding: 40rpx;
		color: #333333;
		font-size: 28rpx;
	}
	/* 提现说明 */
	.withDrawTips {
		padding-top: 440rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		
		font-size: 32rpx;
		font-weight: 400;
		color: #111111;
	}

	/* 输入框 */
	.input-commit {	
		margin-top: 60rpx;
		margin-left: 110rpx;
		margin-right: 110rpx;
		
		height:78rpx;
		background:linear-gradient(-90deg,rgba(28,117,255,1),rgba(87,153,255,1));
		box-shadow:0px 5rpx 10rpx 0px rgba(133,181,255,0.65);
		border-radius:39rpx;
		color: #FFFFFF;
		
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.total-money {
		position: absolute;
		top: 18rpx;
		right: -80rpx;

		font-size: 26rpx;
		color: #1C75FF;
	}

	.input-conteent {
		height: 100%;
		font-size: 28rpx;

		margin-left: 30rpx;
	}

	.input-money {
		position: relative;
		height: 80rpx;
		margin-left: 110rpx;
		margin-right: 110rpx;

		border: 1px solid #1C75FF;
		margin-top: 30rpx;
		border-radius: 10rpx;
	}

	.input-count {
		height: 80rpx;
		margin-left: 110rpx;
		margin-right: 110rpx;

		border: 1px solid #1C75FF;
		margin-top: 100rpx;
		border-radius: 10rpx;
	}

	.input-view {}

	/* 头部信息 */
	.mineHeader-money {
		font-size: 60rpx;
		color: #1C75FF;
		margin-top: 30rpx;
	}

	.mineHeader-tips {
		font-size: 30rpx;
		color: #111111;
		margin-top: 77rpx;
	}

	.mineHeader-header {
		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.mineHeader-body {
		border-radius: 20rpx;

		position: absolute;

		background-color: #FFFFFF;

		top: 30rpx;
		left: 30rpx;
		right: 30rpx;
		/* bottom: 30rpx; */
		height: 700rpx;
	}

	.mineHeader {
		height: 330rpx;
		background-color: #007AFF;
		/* padding: 130rpx 5% 40rpx; */
		position: relative;
	}
</style>
