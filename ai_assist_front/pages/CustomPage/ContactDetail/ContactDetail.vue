<template>
	<view>
		<!-- <view class="contactDetail"> -->
		<view class="contactDetail" v-if="detailData">
			<!-- 名片夹 -->
			<view class="card">
				<view class="top">
					<view>
						<image :src="head" mode="" style="width: 100rpx;height: 100rpx; border-radius: 100rpx;"></image>
						<text>{{detailData.name}}</text>
					</view>
					<image src="../../../static/contactDetail/gengduo@2x.png" mode="" @click="open"></image>
				</view>
				<view class="bottom">
					<view>
						<text>{{detailData.inboundCount}}</text>
						<text>共接听(次)</text>
					</view>
					<view>
						<text>{{parseInt(changeTime.split(',')[0])}}</text>
						<text>共通话({{changeTime.split(',')[1]}})</text>
					</view>
				</view>
			</view>
			<!-- 电话号码 -->
			<view class="tel">
				<view>
					<image src="../../../static/contactDetail/shouji@2x.png" mode=""></image>
					<text>{{mobile | fomateMobile}}</text>
				</view>
				<image src="../../../static/contactDetail/dianhua@2x.png" mode="" @click="call"></image>
			</view>
			<!-- 分割线 -->
			<view class="divider"></view>
			<!-- 专属开场白 -->
			<view class="set" @click="editRecord">
				<view>
					<image src="../../../static/contactDetail/shezhi@2x.png" mode=""></image>
					<text>专属开场白</text>
				</view>
				<image src="../../../static/contactDetail/bianji@2x.png" mode=""></image>
			</view>

			<!-- 开场白 -->
			<view class="edit" v-if="textShow">
				<view>
					<text>{{ProlgueData?ProlgueData.customText:'这里是自己定义的专属开场白，只针对这个好友设置的哦！'}}</text>
					<!-- <text v-if="ProlgueData.type==2">收听</text> -->
				</view>
				<view>
					<!-- 删除 -->
					<image src="../../../static/contactDetail/shanchu@2x.png" mode="" @click="delText"></image>
					<image src="../../../static/contactDetail/bofang@2x.png" mode="" @click="playUrl"></image>
				</view>
			</view>
			<!-- 弹窗 -->
			<uni-popup ref="popup" type="bottom">
				<view class="bottomPop">
					<!-- 		<view class="popItemBox" @click="addUser"><text>添加到通讯录</text></view>
					<view class="popdiver"></view> -->
					<view class="popItemBox" @click="addBlacklist"><text>拒接来电</text></view>
					<view class="popdiver"></view>
					<view class="popItemBox" @click="delContact"><text>删除</text></view>
				</view>
			</uni-popup>
			<!-- 删除成功弹窗 -->
			<view class="cu-modal show" v-show="delShow">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">删除成功</view>
					</view>
				</view>
			</view>
			<!-- 黑名单成功弹窗 -->
			<view class="cu-modal show" v-show="refuseShow">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">黑名单添加成功</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "../../../components/uni-popup/uni-popup.vue"
	import {
		CONTACTDETAIL,
		DELCONTACT,
		ADDBLACKLIST,
		GETPROLPGUE,
		CANCELPROLPGUE,
		AUDITION
	} from "../../../utils/api.js"
	let innerAudioContext = uni.createInnerAudioContext();
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				mobile: "",
				detailData: "",
				id: "",
				head: "",
				delShow: false,
				name: "",
				refuseShow: false,
				ProlgueData: '',
				textShow: false,
				recordUrl: ''
			}
		},
		computed: {
			changeTime: function() {
				var time = this.detailData.inboundDuration
				var result = 0
				if (time >= 3600 * 24) {
					result = time / 3600 / 24 + ',天'
				} else if (time >= 3600 && time <= 3600 * 24) {
					result = time / 3600 + ',小时'
				} else if (time >= 60 && time < 3600) {
					result = time / 60 + ',分'
				} else {
					result = time + ',秒'
				}
				return result
			}
		},
		filters: {
			fomateMobile: function(value) {
				var pat = /(\d{3})\d*(\d{4})/
				var b = value.replace(pat, '$1****$2');
				return b
			}
		},
		onShow() {
			if (this.mobile) {
				this.initData()
				// 查询自定义开场白
				this.getProlgue()
			}
		},
		onHide() {
			innerAudioContext.stop()
			innerAudioContext.onStop(function() {
				console.log('暂停')
			})
		},
		onLoad(options) {
			uni.showToast({
				title: '加载中...',
				icon: 'none',
				mask: true
			})
			var getdata = JSON.parse(options.detail)
			this.mobile = getdata.mobile
			this.head = getdata.head
			this.initData()
			// 查询自定义开场白
			this.getProlgue()
		},
		onPullDownRefresh() {
			this.initData()
			this.getProlgue()
		},
		methods: {
			// 初始化数据
			initData() {
				const params = {
					mobile: this.mobile
				}
				this.$request.url_request(CONTACTDETAIL, params, "GET", res => {
					this.detailData = JSON.parse(res.data).data
					this.id = JSON.parse(res.data).data.id
					this.name = JSON.parse(res.data).data.name
					uni.stopPullDownRefresh()
					uni.hideToast()
				}, err => {})
			},
			// 打电话
			call() {
				if (this.mobile == '057126211779') {
					uni.showModal({
						content: '当前用户为示例用户，请添加自己的联系人再拨打',
						showCancel: false
					});
				} else {
					uni.makePhoneCall({
						phoneNumber: this.mobile
					})
				}

			},
			// 获取自定义开场白
			getProlgue() {
				const params = {
					mobile: this.mobile
				}
				this.$request.url_request(GETPROLPGUE, params, 'GET', res => {
					this.ProlgueData = JSON.parse(res.data).data
					if (this.ProlgueData) {
						if (this.ProlgueData.customOssUrl || this.ProlgueData.customText) {
							this.textShow = true
							this.recordUrl = this.ProlgueData.customOssUrl
							this.$forceUpdate()
						}
					}

					uni.stopPullDownRefresh()
				}, err => {})
			},
			// 播放试听
			playUrl() {
				console.log(this.ProlgueData.type)
				if (this.ProlgueData.type == 1) {
					if (this.ProlgueData.customText) {
						const params = {
							text: this.ProlgueData.customText
						}
						this.$request.url_request(AUDITION, params, "POST", res => {
							this.recordUrl = JSON.parse(res.data).data.ossUrl
							innerAudioContext.src = this.recordUrl
							innerAudioContext.autoplay = true
							innerAudioContext.play()
							innerAudioContext.onPlay(function() {
								console.log('正在试听')
							})
						}, err => {})
					}

				} else if (this.ProlgueData.type == 2) {
					this.recordUrl = this.ProlgueData.customOssUrl
					innerAudioContext.src = this.recordUrl
					innerAudioContext.autoplay = true
					innerAudioContext.play()
					innerAudioContext.onPlay(function() {
						console.log('开始播放')
					})
				}
			},
			//删除录音
			delText() {
				var _this = this
				uni.showModal({
					title: '提示',
					content: '确认删除开场白？',
					duration: 5000,
					success: function(res) {
						if (res.confirm) {
							const params = {
								mobile: _this.mobile,
							}
							_this.$request.url_request(CANCELPROLPGUE, params, 'GET', res => {
								uni.showToast({
									title: '删除成功',
									icon: 'none',
									mask: true,
									duration: 1200
								});
								_this.textShow = false
							}, err => {})
						} else if (res.cancel) {}

					}
				})
			},
			// 录制开场白
			editRecord() {
				var data = JSON.stringify({
					mobile: this.mobile
				})
				if (this.ProlgueData !== null) {
					if (this.ProlgueData.customText !== null || this.ProlgueData.customText !== '') {
						data = JSON.stringify({
							mobile: this.mobile,
							text: this.ProlgueData.customText
						})
					}
				}
				console.log(data)
				uni.navigateTo({
					url: "../editOpen/editOpen?data=" + data
				})
			},
			// 添加联系人
			addUser() {
				uni.navigateTo({
					url: '../AddContact/AddContact?mobile=' + this.mobile
				})
			},
			// 删除联系人
			delContact() {
				var _this = this
				uni.showModal({
					title: '提示',
					content: '确认删除该联系人？',
					duration: 5000,
					success: function(res) {
						if (res.confirm) {
							const params = {
								contactsId: _this.id
							}
							_this.$request.url_request(DELCONTACT, params, "GET", res => {
								uni.showToast({
									title: "删除成功！",
									icon: "success",
									mask: true,
									duration: 500
								})
								setTimeout(function() {
									uni.hideToast()
									uni.navigateBack({

									})
								}, 500);
							}, err => {})
						} else if (res.cancel) {}

					}
				})
			},
			// 拒绝来电
			addBlacklist() {
				var _this = this
				uni.showModal({
					title: '提示',
					content: '确认加入黑名单？',
					duration: 5000,
					success: function(res) {
						if (res.confirm) {
							const params = {
								mobile: _this.mobile,
								name: _this.name
							}
							_this.$request.url_request(ADDBLACKLIST, params, "GET", res => {
								uni.showToast({
									title: "拒绝成功！",
									icon: 'success',
									duration: 1000
								})
								setTimeout(function() {
									uni.hideToast()
									uni.navigateBack({

									})
								}, 500);
							}, err => {})
						}
					}
				});
			},
			// 更多
			open() {
				this.$refs.popup.open()
			}
		}
	}
</script>

<style>
	.contactDetail {
		/* margin: 0 30rpx; */
	}

	page {
		background-color: #FFFFFF;
	}

	.card {
		width: 690rpx;
		height: 340rpx;
		margin: auto;
		margin: 0 30rpx;
		margin-top: 28rpx;
		padding: 50rpx 30rpx;
		background-size: cover;
		background-image: url("../../../static/contactDetail/beijingkapian@2x.png");
		display: flex;
		flex-direction: column;
	}

	.top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.top>view {
		display: flex;
		align-items: center;
	}

	.top>view>image {
		width: 126rpx;
		height: 126rpx;
	}

	.top>view>text {
		color: #FFFFFF;
		font-size: 36rpx;
		margin-left: 28rpx;
		margin-top: -10rpx;
	}

	.top>image {
		width: 48rpx;
		height: 10rpx;
	}

	.bottom {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 30rpx;
	}

	.bottom>view {
		text-align: center;
	}

	.bottom>view:nth-of-type(1) {
		margin-right: 256rpx;
	}

	.bottom>view>text:nth-of-type(1) {
		font-size: 46rpx;
		color: #FFFFFF;
		display: block;
	}

	.bottom>view>text:nth-of-type(2) {
		font-size: 22rpx;
		color: #DEEBFF;
		display: block;
	}

	.tel {
		margin: 0 30rpx;
		/* margin-top: 58rpx; */
		display: flex;
		padding: 40rpx 0;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.tel>view {
		display: flex;
		align-items: center;
	}

	.tel>view>image {
		width: 50rpx;
		height: 70rpx;
	}

	.tel>view>text {
		font-size: 32rpx;
		color: #111111;
		margin-left: 10rpx;
	}

	.tel>image {
		width: 30rpx;
		height: 35rpx;
	}

	/* 	.divider {
		margin: 0 30rpx;
		border-top: 1rpx solid #F0F0F0;
		margin: 40rpx 0;
	} */

	.set {
		padding: 40rpx 30rpx;
		background-color: #F0F8FF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.set>view {
		display: flex;
		align-items: center;
	}

	.set>view>image {
		width: 64rpx;
		height: 64rpx;
	}

	.set>view>text {
		color: #111111;
		font-size: 32rpx;
		margin-top: -10rpx;
		margin-left: 10rpx;
	}

	.set>image {
		width: 30rpx;
		height: 30rpx;
	}

	.edit {
		margin: 0 30rpx;
		margin-top: 50rpx;
		padding: 40rpx 47rpx;
		border-radius: 15rpx;
		border: 1rpx solid #E8E8E8;
		box-shadow: 1rpx 1rpx 8rpx #E8E8E8;
	}

	.edit>text {
		color: #333333;
		font-size: 26rpx;
	}

	.edit>view {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 40rpx;
	}

	.edit>view>image {
		width: 35rpx;
		height: 35rpx;
	}

	.bottomPop {
		background-color: #FFFFFF;
		width: 750rpx;
		padding: 20rpx 0;
		border-radius: 30rpx 30rpx 0 0;
		text-align: center;
	}

	.popItem {
		font-size: 30rpx;
		color: #111111;
		text-align: center;
	}

	.popdiver {
		border-top: 1rpx solid #F0F0F0;
		/* margin: 28rpx 0; */
	}

	.popItemBox {
		padding: 20rpx 0;
	}
</style>
