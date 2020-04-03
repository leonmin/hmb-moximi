<template>
	<view class="editOpen" v-if="ttsScene">
		<view class="editOpenContain shadowE7">
			<!-- 场景名称 -->
			<view class="toptitle">
				<text class="fontStyle30">名称</text>
				<input type="text" v-model="sceneName" class="sceneName" placeholder="输入场景名称" />
			</view>
			<view class="deliverline"></view>
			<view class="flexDisplay">
				<view>
					<text class="fontStyle30">开场白</text>
				</view>
				<text class="cuIcon-notification iconSize" v-if="isleft"></text>
				<!-- <text class="greyTextXs" v-if="recComplete">00:03</text> -->
				<text class="greyTextXs" style="color: #1C75FF; font-size: 28rpx;" v-if="recComplete" @click="playRecord">试听</text>
			</view>
			<view class="openContent" :class="isRight?'greyText':''">
				<textarea maxlength="100" bindinput="textareaAInput" v-if="isDisable" v-model="openInput" placeholder="请输入自定义开场白"></textarea>
				<textarea maxlength="100" bindinput="textareaAInput" v-else disabled placeholder='Tips:请在录音结尾处加上"有什么是你可以先和我的「小秘」说"'></textarea>
			</view>
			<view class="openBtn">
				<view>
					<view class="btnLeft" :class="isleft?'blueBg':'blueColor'" @click="xiaomishuo">
						<text class="cuIcon-writefill"></text>
						<text>小秘说</text>
					</view>
					<view class="btnRight" :class="isRight?'blueBg':'blueColor'" @click="gotoSelfRecord">
						<text class="cuIcon-voicefill"></text>
						<text>自己录</text>
					</view>
				</view>
				<view class="greyText" v-if="isleft">
					<text>{{openInput?openInput.length : 0}}/100</text>
				</view>
			</view>
		</view>
		<!-- 小秘说按钮 -->
		<view class="bottomBtn cu-bar btn-group" v-if="isleft">
			<button class="cu-btn bg-white shadowE7 round" @click="delXiaomi">删除</button>
			<button class="cu-btn bg-blue shadow-blur round" @click="saveXiaomi">保存</button>
		</view>
		<!-- 自己录布局 -->
		<view v-if="isRight" class="selfRec">
			<view class="recordBtn cu-bar btn-group">
				<button class="cu-btn bg-white shadowE7 round" @click="delRec">删除</button>
				<button class="cu-btn bg-blue shadowE7 round" :class="isSave?'saveBlue':''" @click="confirmSave">保存</button>
			</view>
			<view class="positionRela">
				<view class="recordView">
					<!-- 进度条 -->
					<!-- <view class="progerss" v-show="progerssShow"></view> -->
					<view class="jishi" v-if="isJishi"><text>正在录音{{jishi}}秒</text></view>
					<!-- <view class="recordTip" :style="recordTipShow">按住我开始录音</view> -->
					<view :class="recordTipShow?'recordTip':'recordTip1'"><text v-if="recordTipShow">按住我开始录音</text></view>

					<view class="container" :class="isRec?'isRec':''">
						<view class="wave ripple danger">
							<view class="circle"></view>
							<view class="circle"></view>
							<view class="circle"></view>
							<!-- 录音按钮 -->
							<view class="recordCircle" @touchstart="startRec" @touchend="stopRec">
								<text class="cuIcon-voicefill recordIcon" v-if="isPlay"></text>
								<text class="cuIcon-playfill recordIcon" v-else="!isPlay"></text>
							</view>
						</view>
					</view>
					<view class="startRecord">
						<text>{{recStatus}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 小秘弹窗 -->
		<view class="cu-modal" :class="xiaomiSucc?'show':''">
			<view class="cu-dialog" style="border-radius: 20rpx;">
				<view class="padding-xl">
					<text class="eoTipText">确认开场白？</text>
					<view class="cu-bar btn-group eoTipBtn">
						<button class="cu-btn bg-white shadowE7 round" @click="cancelXiaomi">取消</button>
						<button class="cu-btn bg-blue shadow-blur round" @click="confirmXiaomi">确定</button>
					</view>
				</view>
			</view>
		</view>

		<!-- 确认弹窗 -->
		<view class="cu-modal" :class="confirmShow?'show':''">
			<view class="cu-dialog" style="border-radius: 20rpx;">
				<view class="padding-xl">
					<text class="eoTipText">场景对话还未保存，确认要放弃吗？</text>
					<view class="cu-bar btn-group eoTipBtn">
						<button class="cu-btn bg-white shadowE7 round" @click="cancelSave">取消</button>
						<button class="cu-btn bg-blue shadow-blur round" @click="confirmCancel">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 确认录音弹窗 -->
		<view class="cu-modal" :class="failShow?'show':''">
			<view class="cu-dialog" style="border-radius: 20rpx;">
				<view class="padding-xl">
					<text class="eoTipText">确认保存录音？</text>
					<view class="cu-bar btn-group eoTipBtn">
						<button class="cu-btn bg-white shadowE7 round" @click="cancelSave">取消</button>
						<button class="cu-btn bg-blue shadow-blur round" @click="saveRecord">确定</button>
					</view>
				</view>
			</view>
		</view>
		<mpopup ref="mpopup" :isdistance="true"></mpopup>
	</view>
</template>

<script>
	import {
		uniIcons
	} from '../../../components/uni-icons/uni-icons.vue'
	import {
		JSAPI,
		VOICEPROLOGUE,
		TEXTPROLOGUE,
		SETTEXTPROLOGUE,
		PROLOGUEGET,
		SETVOICEPROLOGUE,
		TTSSCENE
	} from "../../../utils/api.js"
	var jweixin = require('jweixin-module')
	var jishiInterval;
	import mpopup from "../../../components/xuan-popup/xuan-popup.vue"
	var RECTIME
	export default {
		components: {
			uniIcons,
			mpopup
		},
		data() {
			return {
				openInput: "",
				recStatus: "按住我开始录音",
				recComplete: false,
				isleft: true,
				isRight: false,
				progerssShow: false,
				recordTipShow:true,
				isRec: false,
				ttsScene: '',
				isSave: false,
				isPlay: true,
				confirmShow: false,
				failShow: false,
				jsData: "",
				isDisable: true,
				localId: "",
				sceneName: '', //场景名称
				serverId: '',
				jishi: 0,
				xiaomiSucc: false,
				mobile: '',
				isJishi: false,
				startTime: '', //录音开始时间
				endTime: '', // 录音结束时间
				timeConsum: 0, //总耗时
				sceneId: '', //场景id
				PrologueGet: '', //场景详情
				ttsKey: '',
				sceneType: '',
				sceneDefId: '',

			}
		},
		onLoad(options) {
			uni.showToast({
				title: '加载中...',
				icon: 'none'
			})
			if (options.id) {
				this.sceneId = options.id
				// 编辑场景
				this.prologueGet()
			}
			// 得到JSSDK
			this.getJsAPI()
			// 查询当前音色
			this.checkTtsScene()
		},
		methods: {
			// 查询当前音色
			checkTtsScene() {
				const params = {}
				this.$request.url_request(TTSSCENE, params, 'GET', res => {
					uni.hideToast()
					this.ttsScene = JSON.parse(res.data).data.data
					console.log('sdadada', this.ttsScene)
				}, err => {})
			},
			// 编辑场景
			prologueGet() {
				const params = {
					id: this.sceneId
				}
				this.$request.url_request(PROLOGUEGET, params, 'GET', res => {
					this.PrologueGet = JSON.parse(res.data).data.data
					this.sceneName = this.PrologueGet.name
					this.openInput = this.PrologueGet.customText
					this.ttsKey = this.PrologueGet.ttsKey,
						this.sceneType = this.PrologueGet.sceneType
					this.sceneDefId = this.PrologueGet.sceneDefId
				}, err => {})
			},
			// 获得jssdk
			getJsAPI() {
				var that = this
				const params = {}
				this.$request.url_request(JSAPI, params, "GET", res => {
					this.jsData = JSON.parse(res.data).data
					console.log("开场白得到的签名", this.jsData.signature)
					jweixin.config({
							appId: this.jsData.appId,
							timestamp: this.jsData.timestamp,
							nonceStr: this.jsData.nonceStr,
							signature: this.jsData.signature,
							jsApiList: ['startRecord', 'stopRecord', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice',
								'onVoicePlayEnd'
							]
						}),
						jweixin.ready(function() {
							console.log("接口处理成功")
						}),
						jweixin.error(function() {
							console.log("接口处理失败")
						})
				}, err => {})
			},
			// 小秘说
			xiaomishuo() {
				this.isDisable = true
				console.log('自己录', this.isDisable)
				this.xiaomiSucc = false
				this.isleft = true,
					this.isRight = false
			},
			// 小秘取消
			cancelXiaomi() {
				this.xiaomiSucc = false
			},
			// 小米说保存
			saveXiaomi() {
				this.xiaomiSucc = true
			},
			// 小米说确认保存
			confirmXiaomi() {
				const params = {
					customText: this.openInput,
					name: this.sceneName,
					id: this.sceneId,
					ttsKey: this.ttsKey,
					sceneType: this.sceneType,
					sceneDefId: this.sceneDefId
				}
				this.$request.url_request(SETTEXTPROLOGUE, params, 'GET', res => {
					if (JSON.parse(res.data).code == 200) {
						uni.showToast({
							title: '保存成功！',
							icon: 'success',
							mask: true,
							duration: 1000
						})
						this.xiaomiSucc = false
						setTimeout(() => {
							uni.reLaunch({
								url: '../Setting/Setting'
							})
						}, 1000)
					} else {
						if (JSON.parse(res.data).resultMsg !== null || JSON.parse(res.data).resultMsg !== '') {
							this.xiaomiSucc = false
							uni.showToast({
								title: JSON.parse(res.data).resultMsg,
								icon: 'none',
								duration: 1200
							})
						}
					}
				}, err => {
					console.log("文本保存失败")
				})

			},
			// 小米说删除
			delXiaomi() {},
			// 自己录
			gotoSelfRecord() {
				console.log('自己录', this.isDisable)
				this.isDisable = false
				this.btnShow = false,
					this.isleft = false,
					this.isRight = true
			},
			// 开始录音
			startRec() {
				var that = this
				this.isJishi = true
				this.jishi = 0
				this.startTime = new Date().getTime()
				this.progerssShow = true,
					this.recordTipShow = false,
					this.isRec = true,
					this.recStatus = "放开我停止录音",
					this.isPlay = true,
					console.log("开始录音")
				// 开始录音
				jweixin.startRecord()
				// 录音计时
				jishiInterval = setInterval(() => {
					that.jishi++
				}, 1000)

			},
			// 停止录音
			stopRec() {
				clearInterval(jishiInterval)
				this.isJishi = false
				this.endTime = new Date().getTime()
				this.timeConsum = this.endTime - this.startTime
				console.log(this.timeConsum)
				var that = this
				if (this.timeConsum / 1000 < 3) {
					uni.showModal({
						content: '录音不足3秒',
						showCancel: false
					});
				} else {
					var _this = this
					this.isSave = true,
						this.recComplete = true
					jweixin.stopRecord({
						success: function(res) {
							_this.localId = res.localId;
							uni.showToast({
								title: '录音完成',
								icon: 'none',
								mask: true,
								duration: 1000
							})
						}
					});
				}

				this.progerssShow = false,
					this.recordTipShow = true
					this.isRec = false,
					this.recStatus = "按住我开始录音",
					this.isPlay = false
			},
			// 录音试听
			playRecord() {
				var _this = this
				console.log("试听的localId", this.localId)
				if (this.localId == '') {
					uni.showModal({
						content: '请先录制一段声音！',
						showCancel: false
					});
				} else {
					jweixin.playVoice({
						localId: _this.localId,
					})
				}

			},

			// 删除录音
			delRec() {
				if (this.localId == '') {
					this.failShow = false
					uni.showModal({
						content: '请先录音！',
						showCancel: false
					});
				} else {
					this.isJishi = false
					this.confirmShow = true
				}
			},
			// 保存录音
			confirmSave() {
				if (this.localId == '') {
					this.failShow = false
					uni.showModal({
						content: '请先录音！',
						showCancel: false
					});
				} else {
					this.isJishi = false
					this.failShow = true
				}

			},
			// 上传语音 保存录音
			saveRecord() {
				var _this = this
				if (this.localId == '') {
					this.failShow = false
					uni.showModal({
						content: '请先录音！',
						showCancel: false
					});
				} else {
					console.log('得到的录音时间', this.timeConsum)
					jweixin.uploadVoice({
						localId: _this.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
						isShowProgressTips: 1, // 默认为1，显示进度提示
						success: function(res) {
							_this.serverId = res.serverId; // 返回音频的服务器端ID
							const params = {
								serverId: _this.serverId,
								voiceLength: _this.timeConsum,
								name: _this.sceneName,
								id: _this.sceneId,
								ttsKey: _this.ttsScene.ttsKey,
								sceneType: _this.ttsScene.sceneType,
								sceneDefId: _this.ttsScene.sceneDefId,
								customText: "自定义语音开场白"
							}
							console.log('录音参数', params)
							_this.$request.url_request(SETVOICEPROLOGUE, params, 'GET', res => {
								if (JSON.parse(res.data).code == 200) {
									console.log("录音上传成功！")
									uni.showToast({
										title: '保存成功!',
										icon: 'success',
										duration: 1000
									})
									setTimeout(() => {
										uni.reLaunch({
											url: '../Setting/Setting'
										})
									}, 1000)
									_this.confirmShow = false,
										_this.failShow = false
									_this.isJishi = false
								} else {
									if (JSON.parse(res.data).resultMsg !== null || JSON.parse(res.data).resultMsg !== '') {
										this.xiaomiSucc = false
										uni.showToast({
											title: JSON.parse(res.data).resultMsg,
											icon: 'none',
											duration: 1200
										})
									}
								}

							}, err => {

								uni.showToast({
									title: '保存失败!',
									icon: 'none',
									duration: 1000
								})
								console.log("录音上传失败！")
							})
						}
					});
					this.confirmShow = false,
						this.failShow = false
				}
			},
			// 取消录音
			cancelSave() {
				this.isJishi = false
				this.confirmShow = false,
					this.failShow = false
			},
			confirmCancel() {
				this.isJishi = false
				this.confirmShow = false
			},
			// 返回上一页
			goback() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.toptitle {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.sceneName {
		margin-left: 20rpx;
		height: 60rpx;
		padding: 10rpx 20rpx;
	}

	.editOpen {}

	.editOpenContain {
		background-color: #FFFFFF;
		padding: 40rpx 30rpx;
	}

	.openContent {
		margin: 30rpx 0;
		height: 150rpx;
	}

	.openContent>textarea {
		width: 100%;
		font-size: 28rpx;
		height: 160rpx;
	}

	.btnLeft,
	.btnRight {
		padding: 16rpx 20rpx;
		text-align: center;
		border: 1rpx solid #1C75FF;
		display: inline-block;
		width: 200rpx;
		font-size: 26rpx;
	}

	.btnLeft {
		border-radius: 100rpx 0 0 100rpx;
	}

	.btnRight {
		border-radius: 0 100rpx 100rpx 0;
		color: #FFFFFF;
	}

	.btnLeft>text:nth-of-type(1) {
		margin-right: 10rpx;
	}

	.btnRight>text:nth-of-type(1) {
		margin-right: 10rpx;
	}

	.blueBg {
		background: linear-gradient(left, #5799ff 0%, #5799ff 10%, #1c75ff 70%, #1c75ff 100%);
		background: -ms-linear-gradient(left, #5799ff 0%, #5799ff 10%, #1c75ff 70%, #1c75ff 100%);
		background: -webkit-linear-gradient(left, #5799ff 0%, #5799ff 10%, #1c75ff 70%, #1c75ff 100%);
		background: -moz-linear-gradient(left, #5799ff 0%, #5799ff 10%, #1c75ff 70%, #1c75ff 100%);
		color: #FFFFFF;
	}

	.blueColor {
		color: #1C75FF;
	}


	.openBtn {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.deliverline {
		border-top: 1rpx solid #E9E9E9;
		margin: 50rpx 0;
	}

	.bottomBtn {
		margin: auto;
		width: 100%;
		bottom: 20rpx;
		position: absolute;
		padding: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.recordBtn>button {
		padding: 40rpx 0;
		font-size: 34rpx;
	}

	.bottomBtn>button {
		padding: 36rpx 121rpx;
	}

	.bottomBtn>button:nth-of-type(1) {
		color: #9D9D9D;
	}

	.recordBtn {
		padding: 50rpx 0;
		width: 100%;
		background-color: #F1F4F6;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.recordBtn>button:nth-of-type(1) {
		color: #9D9D9D;
	}

	.recordView {
		background-color: #FFFFFF;
		padding: 40rpx 100rpx;
	}

	.positionRela {
		position: relative;
	}

	.jishi {
		text-align: center;
	}

	.recordTip {
		background-color: #A0C5FF;
		color: #EBF2FF;
		width: 280rpx;
		margin: auto;
		font-size: 26rpx;
		border-radius: 14rpx;
		padding: 10rpx 0;
		text-align: center;
		position: relative;
	}

	.recordTip:after {
		content: '';
		position: absolute;
		top: 100%;
		left: 44%;
		width: 0;
		height: 0;
		border: 16rpx solid;
		border-color: #A0C5FF transparent transparent transparent;
	}

	.recordCircle {
		background: linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 70%, #5799ff 100%);
		background: -ms-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 70%, #5799ff 100%);
		background: -webkit-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 70%, #5799ff 100%);
		background: -moz-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 70%, #5799ff 100%);
		width: 200rpx;
		height: 200rpx;
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
		border-radius: 100rpx;
		z-index: 999;
	}

	.recordIcon {
		font-size: 100rpx;
		color: #FFFFFF;
	}

	/* 录音效果 */
	.container {
		/* position: absolute; */
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 250rpx;
		height: 250rpx;
		margin: 10rpx auto;
	}

	.isRec>.wave {
		position: relative;
		width: 200rpx;
		height: 200rpx;
		z-index: 8;
	}

	.isRec .circle {
		position: absolute;
		border-radius: 50%;
		opacity: 0;

	}

	/* 波纹效果 */
	.isRec .circle {
		width: 200rpx;
		/* 减去边框的大小 */
		height: 200rpx;
		/* 减去边框的大小 */

	}

	.isRec .circle:first-child {
		animation: circle-opacity 2s infinite;
	}

	.isRec .circle:nth-child(2) {
		animation: circle-opacity 2s infinite;
		animation-delay: .3s;
	}

	.isRec .circle:nth-child(3) {
		animation: circle-opacity 2s infinite;
		animation-delay: .6s;
	}

	.isRec>.wave.ripple.danger .circle {
		background-color: #CDE1FF;
	}

	/* 波动效果 */
	.isRec .circle:first-child {
		animation: circle-opacity 2s infinite;
	}

	@keyframes circle-opacity {
		from {
			opacity: 1;
			transform: scale(1);
		}

		to {
			opacity: 0;
			transform: scale(1.5);
		}
	}

	.startRecord {
		color: #A4A4A4;
		font-size: 26rpx;
		text-align: center;
		margin-bottom: 20rpx;
	}
	.recordTip1{
		color: #EBF2FF;
		width: 280rpx;
		margin: auto;
		font-size: 26rpx;
		border-radius: 14rpx;
		padding: 10rpx 0;
		text-align: center;
		position: relative;
	}
	.selfRec {
		/* position: absolute; */
		bottom: 0;
		width: 100%;
	}

	/* 进度条 */
	.progerss {
		position: absolute;
		left: 0;
		top: 0;
		border: 3rpx solid #1C75FF;
		width: 80%;
	}

	.saveBlue {
		background: linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 70%, #5799ff 100%);
		background: -ms-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 70%, #5799ff 100%);
		background: -webkit-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 70%, #5799ff 100%);
		background: -moz-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 70%, #5799ff 100%);
		color: #FFFFFF;
	}

	.eoTipText {
		color: #111111;
		font-size: 34rpx;
		font-weight: 600;
		display: inline-block;
		margin: 30rpx;
	}

	.eoTipBtn {
		margin: 40rpx 0 10rpx 0;
	}

	.eoTipBtn>button {
		padding: 38rpx 0;
	}


	/* 录音播放效果 */
	@keyframes yuying1 {
		0% {
			height: 0%;
		}

		20% {
			height: 50%;
		}

		50% {
			height: 100%;
		}

		80% {
			height: 50%;
		}

		100% {
			height: 0%;
		}
	}

	.playContainer {
		width: 90rpx;
		height: 30rpx;
		margin: auto;
	}

	.playContainer .one {
		animation: yuying1 0.8s infinite 0.3s;
		-webkit-animation: yuying1 0.8s infinite 0.3s;
	}

	.playContainer .two {
		animation: yuying1 0.8s infinite 0.4s;
		-webkit-animation: yuying1 0.8s infinite 0.4s;
	}

	.playContainer .three {
		animation: yuying1 0.8s infinite 0.5s;
		-webkit-animation: yuying1 0.8s infinite 0.5s;
	}

	.playContainer .four {
		animation: yuying1 0.8s infinite 0.6s;
		-webkit-animation: yuying1 0.8s infinite 0.6s;
	}

	.playContainer .five {
		animation: yuying1 0.8s infinite 0.7s;
		-webkit-animation: yuying1 0.8s infinite 0.7s;
	}

	.one,
	.two,
	.three,
	.four,
	.five {
		width: 6rpx;
		height: 100%;
		margin-left: 10rpx;
		border-radius: 50rpx;
		background-color: #1c75ff;
		vertical-align: middle;
		display: inline-block;
	}

	.two,
	.three,
	.four {}
</style>
