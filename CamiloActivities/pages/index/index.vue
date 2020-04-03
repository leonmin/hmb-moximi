<template>
	<view class="content">
		<view class="topImage">
			<image src="../../static/beijing@2x.png"></image>
		</view>
		<view class="bindForm">
			<view class="topText">
				<text>绑定手机号，立即领取</text>
				<text>什么是魔小秘？</text>
			</view>
			<form @submit="handleLogin">
				<view class="loginInput">
					<view class="loginInputItem">
						<view class="mobileInput">
							<input type="text" @blur="pickupKeyboard" :value="inputValue" v-model="bindmobile" class="uni-input" name="mobile" placeholder="请输入绑定的手机号" />
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
					<button formType="submit" :disabled="isDisable" class="cu-btn bg-blue shadow-blur round">立即领取</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import WxValidate from '../../utils/WxValidate.js'
	import {
		BIND,
		SENDCODE
	} from '../../utils/api.js'
	import qs from 'query-string'
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
				inivite: '',
				cardId: '',
				bindData: ''
			}
		},
		onLoad() {
			this.getUrl()
			this.initValidate();

		},
		methods: {
			// 截取
			getQueryString(name) {
				var url = window.location.href
				// var url = 'http://m.t.checkshirt-ai.com/s-a-1/index.html?c=33b4af79df27a81b3f3cd26c9c1b9acf#/'
				// var url = 'https://m.checkshirt-ai.com/s-a-1/index.html?c=9c532d1a00419b3094e2bfcb5bde2e48'
				console.log('卡密获得链接=>', url)
				let up = qs.parseUrl(url);
				console.log("parse result ==> ", up);
				return up.query[name]
			},
			getUrl() {
				this.cardId = this.getQueryString('c')
				console.log('卡密链接截取的卡密id=>', this.cardId)
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
						mobile: this.bindmobile,
						activity: 1,
						cardId: this.cardId,
						smsCode: this.smsCode
					}
					this.$request.url_request(BIND, params, 'POST', res => {
						console.log('跳转判断code=>',JSON.parse(res.data).code)
						this.bindData = JSON.parse(res.data).data
						console.log('请求的数据',this.bindData)
						if (JSON.parse(res.data).code == 0) {
							// 未领取 未使用
							this.bindData.check = 1
							uni.reLaunch({
								url: '../notReceive/notReceive?check=' + JSON.stringify(this.bindData)
							})
						} else if (JSON.parse(res.data).code == 1) {
							// 已领取已使用
							this.bindData.check = 2
							uni.reLaunch({
								url: '../overdue/overdue?check=' +  JSON.stringify(this.bindData)
							})
						} else if (JSON.parse(res.data).code == 2) {
							// 
							this.bindData.check = 1
							uni.reLaunch({
								url: '../overdue/overdue?check=' + JSON.stringify(this.bindData)
							})
						} else if (JSON.parse(res.data).code == 3) {
							// 已领取 未使用 未过期
							this.bindData.check = 2
							uni.reLaunch({
								url: '../notReceive/notReceive?check=' + JSON.stringify(this.bindData)
							})
						}
					}, err => {})
				}
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
	.topImage>image {
		width: 750rpx;
		height: 693rpx;
	}

	.bindForm {
		padding: 50rpx 100rpx;
	}

	.topText>text:nth-of-type(1) {
		font-size: 30rpx;
		color: #111111;
	}

	.topText>text:nth-of-type(2) {
		font-size: 26rpx;
		color: #999999;
		margin-left: 16rpx;
	}

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
