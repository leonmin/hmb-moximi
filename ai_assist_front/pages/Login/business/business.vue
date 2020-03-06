<template>
	<view>
		<view class="topHead">
			<image src="../../../static/loginIntroduce/moxiaomi@2x.png" mode="" style="width: 111rpx;height: 111rpx;"></image>
			<view class="topText">
				<text>防骚扰 免漏接</text>
				<text>魔小秘AI助手帮你接电话</text>
			</view>
		</view>
		<view style="height: 170rpx;"></view>
		<!-- title -->
		<view class="detailTitle">
			<view class="leftBox">
				<text @click="back" class="cuIcon-back"></text>
				<view class="left">
					<text>商务</text>
					<text>2019-10-11 22:30 通话{{callData.time}}s</text>
				</view>
			</view>
			<view>
				<!-- <image @click="playRecord" class="rightImg" src="../../../static/loginIntroduce/bofang-1@2x.png" mode=""></image> -->
				<view class="shiting" @click="playRecord">
					<image v-if='!playIcon' src="../../../static/callDetail/bofang-1@2x.png" mode="" class="rightImg" ></image>
					<image v-else src="../../../static/lALPDgQ9rUe7HQxKSg_74_74.png" mode="" class="rightImg"></image>	
					<view><text style="color: #1c75ff;font-size: 24rpx;">听一听</text></view>
				</view>
				
			</view>
		</view>
		<!-- 通话记录 -->
		<view class="chatRrecord">
			<!-- 消息加密 -->
			<view class="callTip">
				<text>通话消息已加密，确保您的隐私安全</text>
			</view>
			<view>
				<view v-for="(item,index) in detailData" :key="index">
					<!-- 聊天记录右 -->
					<view class="chatRight " v-if="item.roleType == 1">
						<view class="chatContent">
							<text>{{item.content}}</text>
						</view>
						<!-- 头像 -->
						<view class="callHead">
							<image src="../../../static/loginIntroduce/luoli@2x.png" mode="" style="border: 1rpx solid  #3396FB;"></image>
						</view>
					</view>
					<!-- 聊天记录左 -->
					<view class="chatLeft" v-if="item.roleType == 2">
						<view class="callHead">
							<image src="../../../static/loginIntroduce/luoli@2x.png" mode=""></image>
						</view>
						<view class="chatContentLeft">
							<view>
								<text>{{item.content}}</text>
								<view>
									<image :src="item.isClick?'../../../static/play.png':'../../../static/play1.png'" mode="" @click="playItemRecord(item.audioStartTime,item.audioEndTime,index)"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="endInfo">
				<text>魔小秘</text>
				<text class="moxiaomi">已挂断，本次通话{{callData.time}}s</text>
				<text>转接类型：{{callData.type}}</text>
			</view>
		
		</view>
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
								<input type="text" v-model="bindmobile" name="mobile" placeholder="请输入绑定的手机号" />
<!-- 								<input type="text" :value="inputValue" v-model="bindmobile" name="mobile" placeholder="请输入绑定的手机号" /> -->
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
						<text class="xieyi">点击立即注册表示同意<text style="color: #1C75FF;" @click="userAgree">《用户协议》</text>&<text @click="privacyAgree" style="color: #1C75FF;">《隐私协议》</text></text>
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
	let innerAudioContext = uni.createInnerAudioContext();
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				callData:{
					time: '48',
					type: '主动挂断，手机占线'
				},
				detailData:[
					{roleType:1,content:'喂，您好',audioStartTime:0,audioEndTime:0,isClick: false},
					{roleType:2,content:'哎，你现在有空吗，然后我们开一个临时的会议。',audioStartTime:1620,audioEndTime:5570,isClick: false},
					{roleType:1,content:'好的，那这边请问有别的事情吗？',audioStartTime:0,audioEndTime:0,isClick: false},
					{roleType:2,content:'啊，我们这边开一个临时的会议，过来参加一下',audioStartTime:10920,audioEndTime:15350,isClick: false},
					{roleType:1,content:'嗯嗯，我清楚了，请问还有别的事吗？',audioStartTime:0,audioEndTime:0,isClick: false},
					{roleType:2,content:'嗯，这边过来开会',audioStartTime:21810,audioEndTime:24160,isClick: false},
					{roleType:1,content:'开会是吧？要不你把开会时间还有地点告诉我一下？',audioStartTime:0,audioEndTime:0,isClick: false},
					{roleType:2,content:'啊，就在就在我们的会议室，然后下午4点，请准时参加好吧',audioStartTime:30300,audioEndTime:35960,isClick: false},
					{roleType:1,content:'好的，那除了开会还有什么事情？',audioStartTime:0,audioEndTime:0,isClick: false},
					{roleType:2,content:'啊，没有了，谢谢',audioStartTime:39760,audioEndTime:41680,isClick: false},
					{roleType:1,content:'嗯，好的，那这边先这样吧，再见。',audioStartTime:0,audioEndTime:0,isClick: false}
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
					recShow: false,
					playIcon: false,
					iconPlay: false,
					currentTime: '00:00', //当前播放时间
					durationTime: '00:00', //总时长
					current: 0, //slider当前进度
					loading: false, //是否处于读取状态
					paused: true, //是否处于暂停状态
					seek: false, //是否处于拖动状态
					duration: 100,
					itemStart: '',
					recordId: "",
					totalCur: 0,
					totalStart: 0,
					totalPlay: false,
					src: "",
					startTime: 0,
					itemSrc: "",
					blackShow: false
			}
		},
		onLoad() {
			this.initValidate();
		},
		methods: {
			// 点击按钮播放
			playItemRecord(start, end, index) {
				let _inn = uni.createInnerAudioContext();
				var j = 0
				for (let i = 0; i < this.detailData.length; i++) {
					if (index === i) {
						j = i
						this.detailData[index].isClick = !this.detailData[index].isClick
						this.$forceUpdate();
						if (this.detailData[index].isClick == true) {
							console.log(this.detailData[index].isClick)
							console.log('开始播放1');
							var that = this;
							_inn.src = "https://byrobot-prod.oss-cn-hangzhou.aliyuncs.com/InboundRobotCommunicate/20191231/20191231tPhfkU0000880816_user.wav"
							console.log('开始播放2');
							var flag = 0;
							_inn.play();
							_inn.onCanplay(function() {
								console.log('可以播放');
								if (flag == 1) {
									return;
								} else {
									_inn.seek(start / 1000);
									_inn.onSeeking(function() {
										// console.log('正在跳转');
									})
									_inn.onSeeked(function() {
										// console.log('完成跳转');
										flag = 1;
										var inerval = setInterval(() => {
											if (_inn.currentTime >= end / 1000) {
												_inn.stop()
												_inn.onStop()
												that.paused = true
												that.detailData[j].isClick = false
												that.$forceUpdate();
											}
										}, 100)
										_inn.onError((res) => {
											that.title = JSON.stringify(res);
										});
									})
								}
			
							});
							_inn.onError(function() {
								console.log('播放失败');
							})
			
						} else {
							console.log(this.detailData[index].isClick)
							_inn.pause()
							_inn.onPause(function(){
								console.log('暂停')
							})
						}
					}
			
				}
			},
			//播放音频
			playRecord() {
				this.playIcon = !this.playIcon
				var that = this
				this.totalPlay = !this.totalPlay
					that.recShow = true
					if (that.totalPlay) {
						this.current = 0
						var flag = 0
						var that = this
						innerAudioContext.autoplay = true //开始自动播放
						innerAudioContext.src = 'https://byrobot-prod.oss-cn-hangzhou.aliyuncs.com/InboundRobotCommunicate/20191231/20191231tPhfkU0000880816.wav'
						// 音频进度更新事件
						innerAudioContext.onTimeUpdate(() => {
							if (!this.seek) {
								this.current = innerAudioContext.currentTime
							}
						})
						// 音频播放
						innerAudioContext.onPlay(() => {
							this.duration = innerAudioContext.duration
							this.paused = false
							this.loading = false
						})
						innerAudioContext.onCanplay(function() {
							if (flag == 1) {
								return
							} else {
								innerAudioContext.seek(that.startTime / 1000)
								innerAudioContext.onSeeked(function() {
									flag = 1
								})
								innerAudioContext.onEnded(function() {
									console.log('自然播放结束')
									that.playIcon = false
								})
							}
						})
						// 音频暂停
						innerAudioContext.onPause(() => {
							this.paused = true
						})
						// 音频结束
						innerAudioContext.onEnded(() => {
							this.current = 0
							this.recShow = false
						})
						//音频完成更改进度事件
						innerAudioContext.onSeeked(() => {
							this.seek = false
						})
					} else {
						innerAudioContext.pause()
						innerAudioContext.onPause(function() {
							that.startTime = innerAudioContext.currentTime * 1000
							console.log('播放展厅')
						})
					}
			
			},
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
			back(){
				uni.navigateBack({
					
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
			}
		}
	}
</script>

<style>
page{
	background: #F3F6F7;
}
.shiting{
	display: flex;
	flex-direction: column;
	align-items: center;
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
.topHead{
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	width: 100%;
	padding: 30rpx;
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
	display: block;
	margin-bottom: 10rpx;
}
.detailTitle{
	border-top: 2rpx solid #e6e6e6;
	background: #FFFFFF;
	padding: 20rpx 30rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;	
}
.leftBox{
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 30rpx;
	color: #111111;
}
.leftBox>text:nth-of-type(1){
	color: #666666;
	font-size: 40rpx;
}
.left{
	display: flex;
	flex-direction: column;
	margin-left: 20rpx;
}
.left>text:nth-of-type(2){
	font-size: 22rpx;
	color: #777777;
}
.rightImg{
	width: 46rpx;
	height: 46rpx;
	display: block;
	margin-top: 10rpx;
}
.record{
	padding: 39rpx 20rpx;
}
.tip{
	font-size: 22rpx;
	color: #666666;
	text-align: center;
}
.chatRrecord {
		background-color: #F3F6F7;
	}

	.callTip {
		color: #666666;
		font-size: 22rpx;
		text-align: center;
		padding: 30rpx 0;
	}

	.chatRight {
		display: flex;
		flex-direction: row;
		margin: 40rpx 0;
		padding: 0 30rpx;
		justify-content: flex-end;
	}

	.callHead {
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
	}

	.callHead>image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
	}

	.chatContent {
		background-color: white;
		max-width: 380rpx;
		padding: 22rpx 38rpx;
		border-radius: 20rpx;
		display: -webkit-flex;
		display: flex;
		margin-right: 40rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.chatContent:after {
		content: '';
		position: absolute;
		left: 100%;
		top: 20rpx;
		width: 0;
		height: 0;
		border: 15rpx solid;
		border-color: transparent transparent transparent #FFFFFF;
	}

	.chatContent>text,
	.chatContentLeft>view>text {
		color: #222222;
		font-size: 28rpx;
		margin: 0;
		padding: 0;
	}

	.chatLeft {
		display: flex;
		flex-direction: row;
		margin: 40rpx 0;
		padding: 0 30rpx;
		justify-content: flex-start;
	}

	.chatContentLeft {
		background-color: white;
		padding: 22rpx 38rpx;
		max-width: 380rpx;
		border-radius: 20rpx;
		display: -webkit-flex;
		display: flex;
		margin-left: 40rpx;
		flex-direction: column;
		justify-content: center;
		position: relative;
	}

	.chatContentLeft:after {
		content: '';
		position: absolute;
		right: 100%;
		top: 20rpx;
		width: 0;
		height: 0;
		border: 20rpx solid;
		border-color: transparent #FFFFFF transparent transparent;
	}

	.chatContentLeft>view {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.chatContentLeft>view>view>image {
		width: 30rpx;
		height: 30rpx;
	}

	.chatContentLeft>view>view {
		width: 30rpx;
		height: 30rpx;
		margin-left: 10rpx;
	}

	.endInfo {
		text-align: center;
		padding-bottom: 150rpx;
	}

	.endInfo>text:nth-of-type(1) {
		color: #1c75ff;
		font-size: 26rpx;
	}

	.endInfo>text:nth-of-type(3) {
		color: #8E8E8F;
		font-size: 22rpx;
		display: block;
		margin-top: 20rpx;
	}

	.moxiaomi {
		font-size: 26rpx;
		color: #464747;
	}

	.endDiv {
		border: 1rpx solid #DD514C;
		position: fixed;
		bottom: 0;
		left: 0;
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
