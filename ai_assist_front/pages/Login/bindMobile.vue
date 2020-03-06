<template>
	<view>
		<!-- 标题 -->
		<view class="title">
			<text>防骚扰 免漏接</text>
		</view>
		<view class="titleTip">
			<text>魔小秘AI助手帮你接电话</text>
		</view>
		<!-- logo -->
		<view class="logoView">
			<view class="logoContent">
				<image src="../../static/loginIntroduce/moxiaomi@2x.png" mode="" style="width: 170rpx;height: 170rpx;"></image>
			</view>
		</view>
		<view v-for="(item,index) in loginData" :key='index'>
			<!-- 分割 -->
			<view class="deliver"></view>
			<!-- 场景 -->
			<view class="contenItem">
				<view>
					<text>{{item.title}}</text>
				</view>
				<view>
					<text>{{item.titleTip}}</text>
				</view>
				<view>
					<text>{{item.text1}}</text>
				</view>
				<view>
					<text>{{item.text2}}</text>
				</view>
				<!-- 图片组 -->
				<view class="iconGroup">
					<view class="groupItem" v-for="(item1,index1) in item.iconGroup" :key='index1'>
						<image :src="item1.img" mode="" style="width: 90rpx;height: 90rpx;"></image>
						<text>{{item1.name}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="deliver"></view>
		<!-- 推送示例 -->
		<view class="push">
			<view class="pushTitle">
				<text>通话消息及时推送</text>
				<text>接听内容转成文字，重要信息一目了然</text>
				<text>（阿里云云盾处理，所有数据完全加密，保障数据安全）</text>
			</view>
			<view class="pushImg">
				<image src="../../static/loginIntroduce/zuo@2x.png" mode=""></image>
				<image src="../../static/loginIntroduce/you@2x.png" mode=""></image>
			</view>
		</view>
		<view style="height: 120rpx;"></view>
		<!-- 按钮 -->
		<view class="bto-bar cu-bar foot btnFoot" style="bottom: 0px; background: #FFFFFF;">
			<view class="btn">
				<!-- <button class="shili" @click="tonghuashili">通话示例(魔小秘)</button> -->
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
								<!-- <input type="text" :value="inputValue" v-model="bindmobile" name="mobile" @blur="pickupKeyboard" placeholder="请输入绑定的手机号" /> -->
								<input type="text" v-model="bindmobile" name="mobile" @blur="pickupKeyboard" placeholder="请输入绑定的手机号" />
							</view>
						</view>
						<view class="loginInputItem">
							<view class="smsCode">
								<input type="text" @blur="pickupKeyboard" value="" name="smsCode" v-model="smsCode" placeholder="请输入验证码" />
								<text class="code" @click="getMobileCode">{{mobileCode}}</text>
							</view>
						</view>
					</view>
					<!-- 多选 -->
					<view class="check">
						<view>
							<image :src="isCheck?'../../static/loginIntroduce/yixuanze@2x.png':'../../static/loginIntroduce/meigouxuan@2x.png'" mode="" @click="checkboxChange" style="width: 32rpx;height: 32rpx;"></image>
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
	import WxValidate from '../../utils/WxValidate.js'
	import uniPopup from "../../components/uni-popup/uni-popup.vue"
	import {
		LOGIN,
		SENDCODE,
		MYINFO
	} from "../../utils/api.js"
	var curToken
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				loginData: [{
						title: '50+',
						titleTip: '场景',
						text1: '陌生电话放心挂断',
						text2: '大数据识别，骚扰电话无处遁形',
						iconGroup: [{
								img: '../../static/loginIntroduce/baoxiantuixiao@2x.png',
								name: '保险推销'
							},
							{
								img: '../../static/loginIntroduce/fangchan@2x.png',
								name: '房产中介'
							},
							{
								img: '../../static/loginIntroduce/licai@2x.png',
								name: '贷款理财'
							},
							{
								img: '../../static/loginIntroduce/cuishou@2x.png',
								name: '催收骚扰'
							}
						]
					},
					{
						title: '20+',
						titleTip: '情景',
						text1: '生活服务电话智能代接',
						text2: '“放门口”、“放快递柜”、“定位准确”',
						iconGroup: [{
								img: '../../static/loginIntroduce/waimai@2x.png',
								name: '外卖'
							},
							{
								img: '../../static/loginIntroduce/kuaidi@2x.png',
								name: '快递'
							},
							{
								img: '../../static/loginIntroduce/dache@2x.png',
								name: '打车'
							}
						]
					},
					{
						title: '40+',
						titleTip: '行业',
						text1: '飞行模式/无服务也不漏接',
						text2: '安心放心，重要来电不错过、不遗漏',
						iconGroup: [{
								img: '../../static/loginIntroduce/kaihui@2x.png',
								name: '开会'
							},
							{
								img: '../../static/loginIntroduce/xiuxi@2x.png',
								name: '休息'
							},
							{
								img: '../../static/loginIntroduce/guanji@2x.png',
								name: '关机'
							}
						]
					}
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
				checked: 'agree',
				vip: ''

			}
		},
		onLoad() {
			this.initValidate();
			this.getUrlToken();
		},
		methods: {
			userAgree(){
				uni.navigateTo({
					url:'../../static/privacyAgreement/privacyAgreement'
				})
			},
			privacyAgree(){
				uni.navigateTo({
					url:'../../static/userAgreement/userAgreement'
				})
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
				console.log('绑定手机中的token',curToken)
				if(!curToken) 
				{
					//localstorage read
					curToken = uni.getStorageSync('myToken')
					console.log('locattion',curToken)
				}
				
				if(!curToken) {
					console.log('路径和storage的token都为空')
					uni.navigateTo({
						url:"../JumpLogin/JumpLogin"
					})
				} else {
					try{
						uni.setStorageSync('myToken',curToken)
					}catch(e){
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
				// const params = e.detail.value
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
					var _this = this
					this.$request.url_request(LOGIN, params, "POST", res => {
						if (JSON.parse(res.data).code == 0) {
							const params1 = {}
							_this.$request.url_request(MYINFO,params1,'GET',res=>{
								_this.vip = JSON.parse(res.data).data.vip
								if(_this.vip){
									uni.reLaunch({
										url:'../IncomeHome/IncomeHome'
									})
								} else{
									uni.navigateTo({
										url: '../Welcome/Welcome'
									})
								}			
							},err=>{})
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
					
				}
			},
			tonghuashili(){
				uni.navigateTo({
					url:'callList/callList'
				})
			},
			open() {
				this.$refs.popup.open()
			},
			checkboxChange(value) {
				this.isCheck = !this.isCheck
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
	/* 绑定手机表单 */
	.check {
		display: flex;
		flex-direction: row;
		/* align-items: center; */
	}
	.xieyi{
		color: #999999;
		font-size: 26rpx;
		margin-left: 17rpx;
		display: block;
		/* margin-top: -2rpx; */
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
		text-align: center;
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

	/* 场景 */
	.contenItem {
		color: #111111;
		text-align: center;
	}

	.contenItem>view:nth-of-type(1) {
		font-size: 54rpx;
		font-weight: 600;
	}

	.contenItem>view:nth-of-type(2) {
		font-size: 34rpx;
		font-weight: 600;
		margin: 20rpx 0 28rpx 0;
	}

	.contenItem>view:nth-of-type(3),
	.contenItem>view:nth-of-type(4) {
		font-size: 30rpx;
	}

	.contenItem>view:nth-of-type(4) {
		margin-top: 10rpx;
	}

	.iconGroup {
		width: 550rpx;
		margin: 30rpx auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.groupItem {
		display: flex;
		flex-direction: column;
		align-items: center;
		/* margin: 0 35rpx; */
	}

	/* 推送示例 */
	.push {}

	.pushTitle {
		text-align: center;
		color: #111111;
		font-size: 28rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		line-height: 48rpx;
	}

	.pushTitle>text:nth-of-type(1) {
		font-weight: 600;
		font-size: 38rpx;
		display: inline-block;
		margin-bottom: 20rpx;
	}

	.pushImg {
		padding: 48rpx 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.pushImg>image {
		border-right: 1rpx solid #B6CEF7;
		border-radius: 5rpx;
		width: 339rpx;
		height: 466rpx;
		margin: 0 10rpx;
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
		width: 100%;
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
		width: 100%;
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
