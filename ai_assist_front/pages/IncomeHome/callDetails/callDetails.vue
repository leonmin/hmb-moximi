<template>
	<view>
		<view v-if="detailData">
			<!-- 顶部栏 -->
			<view class="cu-bar bg-white">
				<view class="action">
					<!-- <text class="cuIcon-back text-gray" @click="goback"></text> -->
					<view>
						<text class="telText">{{detailData.callerMobile | formateTel}}</text>
						<view class="callDetails">
							<text v-if="detailData.location !== null">{{detailData.location}}</text>
							<text>{{detailData.gmtCreate}}</text>
							<text>通话{{detailData.voiceTime}}s</text>
						</view>
					</view>
				</view>
			</view>
			<view class="chatRrecord">
				<!-- 消息加密 -->
				<view class="callTip">
					<text>通话消息已加密，确保您的隐私安全</text>
				</view>
				<view>
					<view v-for="(item,index) in detailData.recordMessageList" :key="index">
						<!-- 聊天记录右 -->
						<view class="chatRight " v-if="item.roleType == 1">
							<view class="chatContent">
								<text>{{item.content}}</text>
							</view>
							<!-- 头像 -->
							<view class="callHead">
								<image src="../../../static/logoHead.png" mode="" style="border: 1rpx solid  #3396FB;"></image>
							</view>
						</view>
						<!-- 聊天记录左 -->
						<view class="chatLeft" v-if="item.roleType == 2">
							<view class="callHead">
								<image :src="detailData.avatarUrl" mode=""></image>
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
				<view class="endInfo" v-if='detailData.recordMessageList.length > 0'>
					<text>魔小秘</text>
					<text class="moxiaomi">已挂断，本次通话{{detailData.voiceTime}}s</text>
					<text>转接类型：{{detailData.appCnTransferReason? detailData.appCnTransferReason : '暂无'}}</text>
				</view>
				<!-- 添加联系人 -->
				<view class="add" @click="addContact">
					<image src="../../../static/callDetail/jiahaoyou@2x.png" mode=""></image>
				</view>
				<!-- 加入黑名单 -->
				<view class="del" @click="addBlack">
					<image src="../../../static/callDetail/heimingdan@2x.png" mode=""></image>
				</view>

			</view>
			<!-- 底部录音播放 -->
			<view class="recordView">
				<view class="recordContain">
					<view class="recordIcon" @click="playRecord">
						<image v-if='!playIcon' src="../../../static/callDetail/bofang-1@2x.png" mode=""></image>
						<image v-else src="../../../static/lALPDgQ9rUe7HQxKSg_74_74.png" mode=""></image>
						<view>
							<text>播放</text>
						</view>
					</view>
					<view class="recordIcon" @click="callPhone">
						<image src="../../../static/callDetail/laidian@2x.png" mode=""></image>
						<view>
							<text>回电</text>
						</view>
					</view>
				</view>
				<!-- 分割线 -->
				<view v-show="recShow">
					<view class="recordSplit"></view>
					<view class="recordProgress">
						<text>{{currentTime}}</text>
						<slider class="sliderPro" :value="current" :max="duration" @changing="seek=true,current=$event.detail.value"
						 @change="sliderChange" activeColor="#5598FF" backgroundColor="#E3E8EA" block-color="#1C75FF" block-size="15" />
						<text>{{durationTime}}</text>
					</view>
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	
	let innerAudioContext = uni.createInnerAudioContext();
	// let innerAudioContext = uni.createInnerAudioContext();
	import dragball from '../../../components/drag-ball/drag-ball.vue'
	import {
		CALLRECORDDETAILS,
		ADDBLACKLIST
	} from "../../../utils/api.js"
	export default {
		components: {
			dragball
		},
		filters: {
			formateTel: function(value) {
				var pat = /(\d{3})\d*(\d{4})/
				var mobile = String(value).replace(pat, '$1****$2');
				return mobile
			}
		},
		data() {
			return {
				audioAction: {
					method: 'pause'
				},
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
				detailData: "",
				totalCur: 0,
				totalStart: 0,
				totalPlay: false,
				src: "",
				startTime: 0,
				itemSrc: "",
				blackShow: false
			}
		},
		onLoad(options) {
			this.recordId = JSON.parse(options.id); // 字符串转对象
			this.initData()
		},
		onHide() {
			innerAudioContext.stop()
		},
		onUnload() {
			innerAudioContext.stop()
		},
		watch: {
			//监听总时长改变
			duration(e) {
				this.durationTime = this.format(e)
			},
			//监听当前进度改变
			current(e) {
				this.currentTime = this.format(e)
			}
		},
		methods: {
			// 初始化数据
			initData() {
				const params = {
					recordId: this.recordId
				}
				this.$request.url_request(CALLRECORDDETAILS, params, "GET", res => {
					this.detailData = JSON.parse(res.data).data
					this.src = JSON.parse(res.data).data.audioOssUrl;
					for (let i = 0; i < this.detailData.recordMessageList.length; i++) {
						this.detailData.recordMessageList[i].isClick = false;
					}
					this.itemSrc = JSON.parse(res.data).data.userAudioOssUrl
					this.$forceUpdate();
				}, err => {})
			},
			// 拨打电话
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: this.detailData.callerMobile
				})
			},
			// 点击按钮播放
			playItemRecord(start, end, index) {
				let _inn = uni.createInnerAudioContext();
				var j = 0
				for (let i = 0; i < this.detailData.recordMessageList.length; i++) {
					if (index === i) {
						j = i
						this.detailData.recordMessageList[index].isClick = !this.detailData.recordMessageList[index].isClick
						this.$forceUpdate();
						if (this.detailData.recordMessageList[index].isClick == true) {
							console.log(this.detailData.recordMessageList[index].isClick)
							console.log('开始播放1');
							var that = this;
							_inn.src = this.itemSrc
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
												that.detailData.recordMessageList[j].isClick = false
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
							console.log(this.detailData.recordMessageList[index].isClick)
							_inn.pause()
							_inn.onPause(function(){
								console.log('暂停')
							})
						}
					}

				}
			},
			// 进度条滑动
			sliderChange(e) {
				innerAudioContext.seek(e.detail.value)
			},
			//格式化时长
			format(num) {
				return '0'.repeat(2 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 - String(
					Math.floor(num % 60)).length) + Math.floor(num % 60)
			},
			//播放音频
			playRecord() {
				this.playIcon = !this.playIcon
				var that = this
				this.totalPlay = !this.totalPlay
				if (this.src == '') {
					uni.showToast({
						title: '暂无通话录音',
						icon: 'none',
						duration: 1000
					})
				} else {
					that.recShow = true
					if (that.totalPlay) {
						this.current = 0
						var flag = 0
						var that = this
						innerAudioContext.autoplay = true //开始自动播放
						innerAudioContext.src = this.src
						// 音频进度更新事件
						innerAudioContext.onTimeUpdate(() => {
							if (!this.seek) {
								this.current = innerAudioContext.currentTime
							}
						})
						// 音频播放
						innerAudioContext.onPlay(() => {
							this.durationTime = this.format(innerAudioContext.duration) //当前总时长
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


				}

			},
			//添加联系人
			addContact() {
				uni.navigateTo({
					url: "../../CustomPage/AddContact/AddContact?mobile=" + this.detailData.callerMobile
				})
			},
			// 添加黑名单
			addBlack() {
				var _this = this
				uni.showModal({
					title: '提示',
					content: '确认加入黑名单？',
					duration: 5000,
					success: function(res) {
						if (res.confirm) {
							const params = {
								mobile: _this.detailData.callerMobile,
								name: _this.detailData.nickName
							}
							_this.$request.url_request(ADDBLACKLIST, params, "GET", res => {
								uni.showToast({
									title: '添加成功',
									icon: 'success',
									duration: 1000
								})
							}, err => {})
						} else if (res.cancel) {}

					}
				})
			},
			// 返回上页
			goback() {
				innerAudioContext.stop()
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F3F6F7;
	}

	.telText {
		color: #111111;
		font-size: 30rpx;
	}

	.callDetails {
		font-size: 22rpx;
		color: #777777;
	}

	.callDetails>text {
		margin-right: 20rpx;
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

	.playItem {
		width: 100%;
		border: 1rpx solid #DD514C;

	}

	.endItem>image {
		width: 50rpx;
		height: 50rpx;
		display: block;
		margin-bottom: 10rpx;
	}

	.recordView {
		background-color: #FFFFFF;
		/* padding: 20rpx 0; */
		justify-content: center;
		width: 750rpx;
		position: fixed;
		bottom: 0;
	}

	.recordContain {
		/* padding: 20rpx 180rpx; */
		/* height: 154rpx; */
		padding: 10rpx 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.recordIcon {
		margin: 0 140rpx;
		font-size: 0;
	}

	.recordIcon>image {
		width: 56rpx;
		height: 56rpx;
	}

	.recordIcon>view>text {
		color: #333333;
		font-size: 26rpx;
	}

	.recordSplit {
		border-top: 1rpx solid #EDEDED;
		margin: 30rpx 0;
	}

	.recordProgress {
		width: 750rpx;
		/* height: 106rpx; */
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx 20rpx 20rpx;
	}

	.sliderPro {
		width: 500rpx;
	}

	.recordProgress>text {
		color: #333333;
		font-size: 28rpx;
		/* margin: 0 10rpx; */
	}

	.add {
		width: 100rpx;
		height: 100rpx;
		position: fixed;
		right: 30rpx;
		top: 660rpx;
	}

	.del {
		width: 100rpx;
		height: 100rpx;
		position: fixed;
		right: 30rpx;
		top: 790rpx;
	}

	.add>image,
	.del>image {
		width: 100rpx;
		height: 100rpx;
	}
</style>
