<template>
	<view class="getNeWUser">
		<view class="newContain">
			<view class="title">
				<text>邀请您使用「魔小秘」</text>
			</view>
			<!-- 注册表单 -->
			<form @submit="bindMobile">
				<view class="outDiv">
					<view class="registerView">
						<view class="register">
							<view class="Logintitle">
								<text>魔小秘—您的智能AI秘书为您开启没有骚扰和烦恼的智慧生活</text>
							</view>
							<view class="loginInput">
								<input v-model="mobile" name='mobile' @blur="pickupKeyboard" type="text" value="" placeholder="请输入绑定的手机号" />
								<view>
									<input v-model="smscode" name='smscode' @blur="pickupKeyboard" type="text" value="" placeholder="请输入验证码" />
									<text class="code" @click="getMobileCode">{{mobileCode}}</text>
								</view>

							</view>
							<view class="registerBtn  btn-group">
								<button formType="submit" :disabled="isdisable" class="cu-btn bg-blue shadow-blur round" @click="bindMobile">立即绑定</button>
							</view>
						</view>
					</view>
				</view>

			</form>

		</view>
	</view>
</template>

<script>
	var curToken
	import WxValidate from '../../../utils/WxValidate.js'
	import {
		LOGIN,
		SENDCODE
	} from "../../../utils/api.js"
	export default {
		data() {
			return {
				mobileCode: "获取验证码",
				time: 60,
				mobile: "",
				smscode: "",
				inputValue: "",
				isdisable: false

			}
		},
		onLoad() {
			// 获取token
			this.getUrlToken()
			this.initValidate();
		},
		methods: {
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
						url: "../../JumpLogin/JumpLogin"
					})
				} else {
					console.log('普通用户邀请的token',curToken)
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
			// 规则校验
			initValidate() {
				// 规则
				const rules = {
					mobile: {
						required: true,
						tel: true
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
			// bindMobile绑定手机号
			bindMobile() {
				const params = {
					mobile: this.mobile,
					smsCode: this.smscode
				}
				var that = this
				this.isdisable = true
				setTimeout(function() {
					that.isdisable = false
					that.$forceUpdate()
				}, 1000)
				if (!this.WxValidate.checkForm(params)) {
					const error = this.WxValidate.errorList[0]
					// 可以自定义提示
					uni.showToast({
						title: `${error.msg}`,
						icon: 'none'
					});
					return false
				} else {
					var _this = this
					this.$request.url_request(LOGIN, params, "POST", res => {
						if (JSON.parse(res.data).code == 0) {
							uni.reLaunch({
								url: '../../Welcome/Welcome'
							})
						} else {
							if (JSON.parse(res.data).msg) {
								uni.showToast({
									title: JSON.parse(res.data).msg,
									icon: 'none',
									duration: 1000
								})
							}
						}
					}, err => {})
				}
			},
			// 获取验证码
			getMobileCode() {
				if (this.mobile) {
					if (this.mobileCode == '获取验证码') {
						this.time = 60
						this.timer()
						const params = {
							mobile: this.mobile
						}
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
						title: '手机号不可为空',
						icon: 'none',
						duration: 1000
					});
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
			// 收起键盘
			pickupKeyboard() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				})
			}
		}
	}
</script>

<style>
	page {
		background: #5F89FD;
		padding-bottom: 10rpx;
	}

	.getNeWUser {
		/* height: 1369rpx; */
		
	}

	.newContain {
		width: 100%;
		height: 1206rpx;	
		border: 1rpx solid transparent;
		background-size: cover;
		background-image: url(../../../static/login/getNewUser/bejing@2x.jpg);
		/* overflow: hidden; */
		position: relative;
	}

	/* 顶部欢迎 */
	.title {
		text-align: center;
		font-size: 30rpx;
		margin-top: 30rpx;
		color: #FFFFFF;
	}

	.topclear:after {
		content: '';
		display: block;
	}

	/* 注册表单 */
	.outDiv {
		width: 690rpx;
		/* margin: 30rpx; */
		/* padding: 30rpx 0; */
		position: absolute;
		top: 680rpx;
		left: 50%;
		margin-left: -345rpx;

	}

	.registerView {
		background-color: #FFFFFF;
		width: 690rpx;
		padding: 41rpx 40rpx;
		/* margin: 30rpx; */
		border-radius: 20rpx;
		/* margin-bottom: 50rpx; */
	}

	.Logintitle {
		color: #111111;
		font-size: 26rpx;
		margin:  0 30rpx;
	}

	.loginInput {
		width: 538rpx;
		margin: auto;
		margin-top: 40rpx;
	}

	.loginInput input {
		outline: none;
		width: 538rpx;
		border-radius: 10rpx;
		border: 1px solid #1C75FF;
		height: 78rpx;
		margin: 15rpx 0;
		padding: 17rpx 36rpx;
	}

	.loginInput>view {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.loginInput>view>input:nth-of-type(1) {
		width: 381rpx;
	}

	.code {
		color: #1C75FF;
		font-size: 26rpx;
		margin-left: 30rpx;
	}

	.registerBtn {
		width: 538rpx;
		margin: auto;
		margin-top: 30rpx;
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
