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
						<text style="font-size: 40rpx;">￥</text>{{myWalletData.balance}}
					</view>
				</view>

				<!-- 提现输入框 -->
				<form @submit="withdrawal">
					<view class="input-view">
					<view class="input-count">
						<input v-model="alipayAccount" @blur="pickupKeyboard" class="input-conteent" name="alipayAccount" placeholder="支付宝账号" type="text" value="" />
					</view>
					<view class="input-money">
						<input v-model="idCard" @blur="pickupKeyboard" class="input-conteent" name="idCard" placeholder="身份证账号" type="text" value="" />
					</view>
					<view class="input-money">
						<input v-model="realName" @blur="pickupKeyboard" class="input-conteent" name="realName" placeholder="真实姓名" type="text" value="" />
					</view>
					<view class="input-money">
						<input v-model="cash" @blur="pickupKeyboard" class="input-conteent" name="cash" placeholder="提现金额" type="text" value="" />
						<view class="total-money" @click="totalCash">
							全部
						</view>
					</view>
					<view class="agree" @click="checkAgree">
						<view class="agreeView">
							<image :src=" isCheck?'../../../static/mine/gouxuan@2x.png':'../../../static/mine/weigouxuan@2x.png'" mode=""></image>
							<text style="font-size: 22rpx;color: #333333;margin-left: 10rpx;">我自愿准守并同意<text style="color: #1C75FF;" @click.stop="cooperation">《共享经济合作伙伴协议》</text></text>
						</view>
					</view>
				<view class="registerBtn  btn-group">
					<button formType="submit" class="cu-btn bg-blue shadow-blur round input-commit" :disabled="isDisable">立即提现</button>
				</view>
				</view>
			
				</form>
				
			</view>
		</view>
		
		<view class="withDrawTips">
			提现说明
		</view>
		<view class="withDrawContent">
			<view class="withDrawContent-title">
				1.提现金额不低于1元
			</view>
			<view class="withDrawContent-title">
				2.活动推广期间每月提现次数不限
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
	import {
		PARTNERCASH,
		PARTNERCASHOUT
	} from "../../../utils/api.js"
	import WxValidate from '../../../utils/WxValidate.js';
	export default {
		components:{mpopup},
		data() {
			return {
				mineWithDraw: "",
				myWalletData: '',
				cash:"",
				alipayAccount:"",
				idCard: '',
				realName: '',
				message:"",
				isDisable: false,
				isCheck:false
			}
		},
		onLoad() {
			uni.showToast({
				title: '加载中...',
				icon: 'none',
				mask: true
			})
			// 初始化数据
			this.initData()
			this.initValidate();
		},
		methods: {
			// 规则校验
			initValidate() {
				// 规则
				const rules = {
					alipayAccount: {
						required: true
					},
					cash: {
						required: true
						// checkcash: true
					},
					idCard: {
						required:true,
						idcard: true
					},
					realName: {
						required:true
					}
				}
				// 提示
				const messages = {
					alipayAccount: {
						required: "请输入提现账号！"
					},
					cash: {
						required: "请输入提现金额",
						checkcash: '提现金额不得小于100元'
					},
					idCard: {
						required: "请输入身份证号码",
						checkcashTen: '请输入身份证号码'
					},
					realName: {
						required:"请输入真实姓名"
					}
					
				}
				this.WxValidate = new WxValidate(rules, messages)
			},
			// 初始化数据
			initData() {
				const params = {}
				this.$request.url_request(PARTNERCASH, params, "GET", res => {
					this.myWalletData = JSON.parse(res.data).data
					this.mineWithDraw = JSON.parse(res.data).data.balance
					uni.hideToast()
					uni.stopPullDownRefresh()
				}, err => {})
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
					console.log(params)
					if(!this.isCheck){
						uni.showToast({
							title:'请阅读并同意共享经济合作伙伴协议！',
							icon:'none'
						})
					} else{
					this.$request.url_request(PARTNERCASHOUT,params,"GET",res=>{
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

					
				}	
				
			},
			// 协议
			cooperation(){
				uni.navigateTo({
					url:'../../../static/cooperationAgree/cooperationAgree'
				})
			},
			// totalCash全部
			totalCash(){
				this.cash = this.mineWithDraw
			},
			// 协议
			checkAgree(){
				this.isCheck = !this.isCheck
				this.$forceUpdate()
			},
			// 收起键盘
			pickupKeyboard(){
				uni.pageScrollTo({
					scrollTop:0,
					duration:0
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
		box-shadow: 1rpx 1rpx 10rpx #EDEDED;
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
		padding-top: 540rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		
		font-size: 32rpx;
		font-weight: 400;
		color: #111111;
	}

	/* 输入框 */
	.input-commit {	
		margin-top: 23rpx;
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
	.agree{
		margin-top: 44rpx;
		display: flex;
		justify-content: center;
	}
	.agreeView{
		display: flex;
		align-items: center;
	}
	.agreeView>image{
		width: 24rpx;
		height: 24rpx;
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
		margin-top: 20rpx;
		border-radius: 10rpx;
	}

	.input-count {
		height: 80rpx;
		margin-left: 110rpx;
		margin-right: 110rpx;

		border: 1px solid #1C75FF;
		margin-top: 40rpx;
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
		margin-top: 50rpx;
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
		padding-bottom: 20px;
		/* bottom: 30rpx; */
		/* height: 708rpx; */
	}

	.mineHeader {
		height: 329rpx;
		width: 100%;
		/* background-color: #007AFF; */
		background-size: cover;
		background-image: url(../../../static/mine/bj@2x.png);
		/* padding: 130rpx 5% 40rpx; */
		position: relative;
	}
</style>
