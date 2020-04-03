<template>
	<view>
		<view class="topHeader">
		</view>
		<!-- 注册表单 -->
		<view class="register">
			<text class="title">绑定手机，启用服务</text>
			<form @submit="handleLogin">
				<view class="loginInput">
					<view class="loginInputItem">
						<view class="mobileInput">
							<!-- <input type="text" @blur="pickupKeyboard" :value="inputValue" v-model="bindmobile" name="mobile" placeholder="请输入绑定的手机号" /> -->
							<input type="text" @blur="pickupKeyboard" v-model="bindmobile" name="mobile" placeholder="请输入绑定的手机号" />
						</view>
					</view>
					<view class="loginInputItem">
						<view class="smsCode">
							<input type="text" @blur="pickupKeyboard" value="" name="smsCode" v-model="smsCode" placeholder="请输入验证码" />
							<text class="code" @click="getMobileCode">{{mobileCode}}</text>
						</view>
					</view>
				</view>
				<view class="registerBtn  btn-group">
					<button formType="submit" :disabled="isDisable" class="cu-btn bg-blue shadow-blur round">立即绑定</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import WxValidate from '../../../utils/WxValidate.js'
	import { PARTNERBIND,SENDCODE } from "../../../utils/api.js"
	var curToken
	export default {
		data() {
			return {
				mobileCode: "获取验证码",
				time: 60,
				mobileTip: "",
				inputValue: "",
				smsTip: "",
				mobile: "",
				smsCode: "",
				isDisable: false,
				bindmobile:''
			}
		},
		onLoad() {
			this.initValidate();
			this.getUrlToken();
		},
		methods: {
			// 登录
			handleLogin(e) {
				var that = this
				this.isDisable = true
				setTimeout(function(){
					that.isDisable = false
					that.$forceUpdate()
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
						const params = {
							mobile: e.detail.value.mobile,
							smsCode: e.detail.value.smsCode,
							partner: 1
						}
						this.$request.url_request(PARTNERBIND,params,'POST',res => {
							if(JSON.parse(res.data).code == 0){
								uni.reLaunch({
									url:'../partner'
								})
							} else{
								uni.showToast({
									title:JSON.parse(res.data).msg,
									icon:'none',
									duration:1000
								})
							}
						},err =>{})
				}
			},
			// 规则校验
			initValidate() {
				// 规则
				const rules = {
					mobile: {
						required: true,
						tel:true
					},
					smsCode: {
						required: true
					}
				}
				// 提示
				const messages = {
					mobile: {
						required: "请输入手机号！"
					},
					smsCode: {
						required: "请输入验证码"
					}
				}
				this.WxValidate = new WxValidate(rules, messages)
			},
			// 获取验证码
			getMobileCode() {
				if (this.bindmobile) {
					if (this.mobileCode == '获取验证码') {
						this.time = 60
						this.timer()
						var jiamiMobile = this.$encruption(this.bindmobile)
						const params = {
							mobile:this.bindmobile,
							elmobi: jiamiMobile
						}
						console.log(params)
						this.$request.url_request(SENDCODE, params, 'POST', res => {
							uni.showToast({
								title: '验证码发送成功',
								icon: 'none',
								duration: 1000
							})
						}, err => {})
					}

				} else {
					uni.showToast({
						title: '号码不能为空',
						icon: 'none',
						duration: 1000
					})
				}
			},
			timer() {
				if (this.time > 0) {
					this.time--;
					this.mobileCode = "还剩" + this.time + "s"
					setTimeout(this.timer, 1000);
				} else {
					this.time = 0;
					this.mobileCode = "获取验证码";
				}
			},
			// 截取
			getQueryString(name) {
				var after = window.location.search
				if (after.indexOf('?') === -1) {}
				after = window.location.href.split("?")[1] || after.substr(1);
				if (after) {
					var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
					var r = after.match(reg)
					if (r !== null) {
						return decodeURIComponent(r[2]);
					} else {
						return null
					}
				}
			},
			// 获取当前保存token
			getUrlToken() {
				curToken = this.getQueryString('token')
				if (!curToken) {
					uni.navigateTo({
						url: "../partnerJumpLogin/partnerJumpLogin"
					})
				} else {
					try {
						uni.setStorageSync('myToken', curToken)
					} catch (e) {
						//TODO handle the exception
						uni.showModal({
							content: e,
							showCancel: false
						});
					}
				}
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
.topHeader{
	width: 750rpx;
	height: 715rpx;
	background-size: cover;
	background-image: url(../../../static/partner/partnerBind/hehuor@2x.jpg);
	overflow: hidden;
}
.textContain{
	overflow: hidden;
	margin-top: 172rpx;
	margin-left: 30rpx;
}
.item{
	color: #FFFFFF;
	font-size: 34rpx;
	display: flex;
	align-items: center;
	margin: 31rpx 0;
}
.item>image{
	width: 18rpx;
	height: 18rpx;
}
.item>text{
	margin-left: 15rpx;
}
/* 绑定手机号 */
.register {
		margin: 64rpx 107rpx 50rpx 107rpx;
	}

	.register .title {
		color: #111111;
		font-size: 30rpx;
		margin-bottom: 28rpx;
	}

	/* 绑定手机表单 */
	.loginInputItem {
		margin: 29rpx 0;
		overflow: hidden;
	}

	.inputTip {
		color: red;
		font-size: 20rpx;
		display: block;
		margin-top: 5rpx;
	}

	.mobileInput>input {
		width: 538rpx;
	}

	.loginInput input {
		outline: none;
		border-radius: 10rpx;
		border: 1px solid #1C75FF;
		height: 78rpx;
		padding: 10rpx 36rpx;
	}

	.loginInput>view {
		/* 		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between; */
	}

	.smsCode {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.smsCode>input {
		width: 381rpx;
	}

	.code {
		color: #1C75FF;
		font-size: 26rpx;
		display: inline-block
	}

	.registerBtn {
		margin-top: 20rpx;
		padding: 30rpx 0;
	}

	.registerBtn>button {
		width: 100%;
		padding: 40rpx 0;
		font-size: 30rpx;
		background: linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -ms-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -webkit-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -moz-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
	}
</style>
