<template>
	<view>
		<!-- tophead -->
		<view class="topHead">
			<image src="../../../static/loginIntroduce/moxiaomi@2x.png" mode="" style="width: 111rpx;height: 111rpx;"></image>
			<view class="topText">
				<text>防骚扰 免漏接</text>
				<text>魔小秘AI助手帮你接电话</text>
			</view>
		</view>
		<view style="height: 160rpx;"></view>
		<!-- 通话列表示例 -->
		<view class="callList" v-for="(item,index) in listData" :key='index' @click="detail(index)">
			<view><image src="../../../static/loginIntroduce/nvhai@2x.png" mode="" style="width: 120rpx;height: 120rpx;"></image></view>
			<view class="rightItem">
				<text class="title">{{item.title}}</text>
				<view class="callTime">
					<text>10-29 通话30s</text>
					<text>查看详情</text>
				</view>
				<view class="tipItem">
					<view class="tipstyle" v-for="(item1,index1) in item.tip" :key='index1'>{{item1}}</view>
				</view>
			</view>
		</view>
		<view style="height: 160rpx;"></view>
		<!-- 按钮 -->
		<view class="bto-bar cu-bar foot btnFoot" style="bottom: 0px; background: #FFFFFF;">
			<view class="btn">
				<button class="shili" @click="backtohome">返回首页(魔小秘)</button>
				<button class="kaitong" @click="open">立即开通</button>
			</view>
		</view>
		<!-- 开通弹窗 -->
		<uni-popup ref="popup" type="bottom" style="z-index: 999;">
			<view class="pop">
				<view class="popTitle"><text>魔小秘AI助理</text></view>
				<form @submit="handleLogin">
					<view class="loginInput">
						<view class="loginInputItem">
							<view class="mobileInput">
								<!-- <input type="text" :value="inputValue" v-model="bindmobile" name="mobile" placeholder="请输入绑定的手机号" /> -->
								<input type="text" v-model="bindmobile" name="mobile" placeholder="请输入绑定的手机号" />
							</view>
						</view>
						<view class="loginInputItem">
							<view class="smsCode">
								<input type="text" value="" name="smsCode" v-model="smsCode" placeholder="请输入验证码" />
								<text class="code" @click="getMobileCode">{{mobileCode}}</text>
							</view>
						</view>
					</view>
					<!-- 多选 -->
					<view class="check">
						<view>
							<image :src="isCheck?'../../../static/loginIntroduce/yixuanze@2x.png':'../../../static/loginIntroduce/meigouxuan@2x.png'" mode="" @click="checkboxChange" style="width: 32rpx;height: 32rpx;"></image>
						</view>
					<view>
						<text class="xieyi">点击立即注册表示同意<text style="color: #1C75FF;" @click="userAgree">《用户协议》</text>&<text style="color: #1C75FF;" @click="privacyAgree">《隐私协议》</text></text>
					</view>
					</view>
					<view class="registerBtn  btn-group">
						<button formType="submit" :disabled="isDisable" class="cu-btn bg-blue shadow-blur round">立即登录</button>
					</view>
				</form>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import WxValidate from '../../../utils/WxValidate.js'
	import uniPopup from "../../../components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				listData:[
					{title:'广告推销',tip:['房产','推广','保险','车险']},
					{title:'外卖快递',tip:['外卖','快递','生活服务']},
					{title:'商务电话',tip:['开会','预约','商务']},
					{title: '贷款催收',tip:['催收','推广','贷款']}
				],
				mobileCode: "获取验证码",
				time: 60,
				mobileTip: "",
				inputValue: "",
				smsTip: "",
				mobile: "",
				smsCode: "",
				isDisable: false,
				bindmobile: '',
				isCheck: false,
				checked: 'agree'
			}
		},
		onLoad() {
			this.initValidate();
		},
		methods: {
			userAgree(){
				uni.navigateTo({
					url:'../../../static/privacyAgreement/privacyAgreement'
				})
			},
			privacyAgree(){
				uni.navigateTo({
					url:'../../../static/userAgreement/userAgreement'
				})
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
					if(this.isCheck == false){
						uni.showToast({
							title:'请阅读隐私协议',
							icon:'none',
							duration:1200
						})
					} else{
						
					}
					var _this = this
					this.$request.url_request(LOGIN, params, "POST", res => {
						if (JSON.parse(res.data).code == 0) {
							uni.navigateTo({
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
					}, err => {
			
					});
				}
			},
			backtohome(){
				uni.navigateTo({
					url:'../bindMobile'
				})
			},
			open() {
				this.$refs.popup.open()
			},
			checkboxChange(value) {
				this.isCheck = !this.isCheck
			},
			detail(index){
				console.log(index)
				if(index == 0){
					uni.navigateTo({
					url:'../callListDetail/callListDetail'
				})
				} else if(index == 1){
					uni.navigateTo({
						url:'../Courier/Courier'
					})
				} else if(index == 2){
					uni.navigateTo({
						url:'../business/business'
					})
				} else if(index == 3){
					uni.navigateTo({
						url:'../collection/collection'
					})
				}
				
			}
		}
	}
</script>

<style>
page{
	background: #F3F6F7;
}
/* 绑定手机表单 */
	.check {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.xieyi{
		color: #999999;
		font-size: 26rpx;
		margin-left: 17rpx;
		display: block;
		margin-top: 25rpx;
	}
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
		width: 100%;
	}

	.loginInput input {
		outline: none;
		border-radius: 10rpx;
		border: 1px solid #1C75FF;
		height: 78rpx;
		padding: 10rpx 36rpx;
	}

	.loginInput>view {}

	.smsCode {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.smsCode>input {
		width: 401rpx;
	}

	.code {
		color: #1C75FF;
		font-size: 26rpx;
		display: inline-block;
		margin: 0 20rpx;
	}

	.registerBtn {
		margin-top: 20rpx;
		padding: 10rpx 0;
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

	/* 弹出层 */
	.pop {
		background: #FFFFFF;
		padding: 50rpx 72rpx;
		border-top-left-radius: 35rpx;
		border-top-right-radius: 35rpx;
	}

	.popTitle {
		font-size: 34rpx;
		color: #111111;
		text-align: center;
	}

	.title {
		font-weight: 600;
		color: #111111;
		font-size: 48rpx;
		margin: 19rpx 0;
	}

	.titleTip {
		font-size: 30rpx;
		color: #111111;
		text-align: center;
		margin: 7rpx 0;
	}

	.logoView {
		margin: 40rpx 0;
	}

	.logoContent {
		width: 170rpx;
		height: 170rpx;
		margin: auto;
	}

	.deliver {
		width: 40rpx;
		height: 6rpx;
		background-color: #3296FA;
		margin: 70rpx auto;
	}
.topHead{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	padding: 30rpx;
	z-index: 999;
	background: #FFFFFF;
	display: flex;
	flex-direction: row;
	
}
.topText{
	color: #111111;
	font-size: 26rpx;
	margin-left: 25rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	
}
.topText>text:nth-of-type(1){
	font-size: 36rpx;
	font-weight: 600;
	display: block;
	margin-bottom: 10rpx;
}
.callList{
	border-radius: 25rpx;
	box-shadow: 1rpx 1rpx 6rpx #EDEDED;
	background-color: #FFFFFF;
	padding: 20rpx 39rpx;
	margin: 25rpx 30rpx 0 39rpx ;
	display: flex;
	flex-direction: row;
}
.title{
	color: #111111;
	font-size: 32rpx;
	font-weight: 600;
}
.rightItem{
	width: 100%;
	margin-left: 15rpx;
	display: flex;
	flex-direction: column;
}
.callTime{
	margin-top: 15rpx;
	font-size: 26rpx;
	color: #777777;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.callTime>text:nth-of-type(2){
	color: #999999;
}
.tipItem{
	margin-top: 28rpx;
	display: flex;
	flex-direction: row;
}
.tipstyle{
	color: #FFFFFF;
	border-radius: 10rpx;
	margin-right: 19rpx;
	padding: 9rpx 15rpx;
	background: linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
	background: -ms-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
	background: -webkit-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
	background: -moz-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
	box-shadow: 1rpx 1rpx 5rpx #1C75FF;
}
button::after {
		border: none;
	}

	.btnFoot {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 28rpx 46rpx;
		z-index: 100;
	}

	.btn {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.shili {
		border: 1rpx solid #3296FA;
		background-color: #FFFFFF;
		width: 309rpx;
		height: 72rpx;
		border-radius: 100rpx;
		line-height: 72rpx;
		color: #1C75FF;
		margin: 0 19rpx;
	}

	.kaitong {
		width: 309rpx;
		height: 72rpx;
		border-radius: 100rpx;
		line-height: 72rpx;
		color: #FFFFFF;
		margin: 0 19rpx;
		background: linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -ms-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -webkit-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -moz-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		box-shadow: 1rpx 1rpx 5rpx #1C75FF;
	}
</style>
