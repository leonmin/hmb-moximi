<template>
	<view>
		<view class="topHeader">
					<!-- 注册表单 -->
		<view class="register">
			<text class="title">绑定手机，启用服务</text>
			<form @submit="handleLogin">
				<view class="loginInput">
					<view class="loginInputItem">
						<view class="mobileInput">
							<input type="text" @blur="pickupKeyboard" :value="inputValue" v-model="bindmobile" name="mobile" placeholder="请输入绑定的手机号" />
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
					<button formType="submit" :disabled="isDisable" class="cu-btn bg-blue shadow-blur round">立即启用</button>
				</view>
			</form>
		</view>
		</view>

	</view>
</template>

<script>
	import qs from 'query-string';
	import WxValidate from '../../utils/WxValidate.js'
	import {
		PARTNERBIND,
		SENDCODE
	} from '../../utils/api.js'
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
				bindmobile: '',
				inivite: ''
			}
		},
		onLoad() {
			this.initValidate();
			this.getUrl()
		},
		methods: {
			// 截取
			getQueryString(name) {
				var url = window.location.href
				console.log('合伙人邀请绑定获取的url', url)
				let up = qs.parseUrl(url);
				console.log("parse result ==> ", up);
				return up.query[name]
			},
			// getUrl
			getUrl() {
				this.inivite = this.getQueryString('invite')
				console.log('链接截取的invitecode', this.inivite)

			},
			// 获取验证码
			getMobileCode() {
				if (this.bindmobile) {
					if (this.mobileCode == '获取验证码') {
						this.time = 60
						this.timer()
						var jiamiMobile = this.$encruption(this.bindmobile)
						const params = {
							mobile: this.bindmobile,
							elmobi: jiamiMobile
						}
						console.log(this.bindmobile)
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
			// 登录
			handleLogin(e) {
				var that = this
				this.isDisable = true
				setTimeout(function() {
					that.isDisable = false
					that.$forceUpdate()
				}, 1000)
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
						invite: this.inivite,
						partner: 1
					}
					this.$request.url_request(PARTNERBIND, params, 'POST', res => {
							uni.reLaunch({
								url: '../focus/focus'
							})
					}, err => {})
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
		background: #6089FD;
	}
	.topHeader {
		width: 750rpx;
		height: 1236rpx;
		background-size: cover;
		background-image: url(../../static/bejing@2x.jpg);
		overflow: hidden;
	}
	.Boxtitle{
		font-size: 40rpx;
		color: #FFFFFF;
		text-shadow: 5rpx 8rpx 6rpx #00359E;
		text-align: right;
		font-weight: 600;
		margin-right: 100rpx;
		margin-top: 100rpx;
	}
	.Boxtitle>view{
		margin-top: 30rpx;
		 font-size: 48rpx;
	}

	.textContain {
		overflow: hidden;
		margin-top: 172rpx;
		margin-left: 30rpx;
	}

	.item {
		color: #FFFFFF;
		font-size: 34rpx;
		display: flex;
		align-items: center;
		margin: 31rpx 0;
	}

	.item>image {
		width: 18rpx;
		height: 18rpx;
	}

	.item>text {
		margin-left: 15rpx;
	}

	/* 绑定手机号 */
	.register {
		margin: 0 30rpx;
		padding: 30rpx 50rpx;
		border-radius: 25rpx;
		background: #FFFFFF;
		margin-top: 750rpx;
	}

	.register .title {
		color: #111111;
		font-size: 30rpx;
		margin-bottom: 28rpx;
	}

	/* 绑定手机表单 */
	.loginInputItem {
		margin: 20rpx 0;
		overflow: hidden;
	}

	.inputTip {
		color: red;
		font-size: 20rpx;
		display: block;
		margin-top: 5rpx;
	}

	.mobileInput>input {
		/* width: 518rpx; */
	}

	.loginInput input {
		outline: none;
		border-radius: 10rpx;
		border: 1px solid #1C75FF;
		height: 68rpx;
		padding: 10rpx 36rpx;
	}

	.smsCode {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}

	.smsCode>input {
		width: 301rpx;
	}

	.code {
		color: #1C75FF;
		font-size: 26rpx;
		display: inline-block;
		margin-left: 20rpx;
	}

	.registerBtn {
		margin-top: 10rpx;
		padding: 20rpx 0;
	}

	button::after {
		border: none;
	}

	.registerBtn>button {
		width: 100%;
		color: #FFFFFF;
		border-radius: 100rpx;
		font-size: 30rpx;
		background: linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -ms-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -webkit-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -moz-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
	}
</style>
