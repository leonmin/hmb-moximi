<template>
	<view class="indexBox">
		<view v-if="itemData">
			<view v-if="isfocus !== 1">
				<uni-notice-bar @click='focus' style="margin: 0;" show-close="true" show-icon="true" text="尚未关注公众号，无法接受来电消息提醒，点击关注 >"></uni-notice-bar>
			</view>
			<view class="uni-padding-wrap" v-if="bannerList.length>0" style="padding: 30rpx 30rpx 0 30rpx;">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
						 circular='true'>
							<swiper-item v-for="(item,index) in bannerList" :key='index' @click="bannerView(item.url,item.bannerType,item.id)">
								<view class="banner">
									<image :src="item.bannerUrl" mode=""></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<!-- 功能板块 -->
			<view class="module">
				<view class="moduleItem" @click="gotoList">
					<view class="badgeNum" v-if="itemData.length > 0">
						<text>{{itemData.length}}</text>
					</view>
					<image src="../../static/incomeHome/laidianjilu@2x.png" mode=""></image>
					<text>来电记录</text>
				</view>
				<view class="moduleItem" v-for="(item,index) in moduleData" :key='index' @click="gotoModule(index)">
					<image :src="item.src" mode=""></image>
					<text>{{item.name}}</text>
				</view>
			</view>
			<!-- 分割 -->
			<view style="height: 20rpx;background-color: #F3F6F7;"></view>
			<!-- 今日来电 -->
			<view class="todayCall">
				<view class="title"><text>今日来电</text></view>
				<!-- 通话列表 -->
				<view class="callList">
					<view v-if="itemData.length == 0">
						<view class="noDataBox">
							<view class="noData">
								<image src="../../static/quexing/wulaidian@2x.png" mode=""></image>
								<view>
									<text>暂无通话</text>
								</view>
							</view>
						</view>
					</view>
					<view v-if="item" class="callListItem" @click="gotoDetails(item.id)" v-for="(item,index) in itemData" :key="index">
						<view class="itemHead">
							<image :src="item.avatarUrl" alt="">
						</view>
						<view class="rightItem">
							<!-- 电话信息 -->
							<view class="mobileFont">
								<text class="mobileFont">{{item.callerMobile | formateTel}}</text>
							</view>
							<view class="durationItem">
								<view class="duration">
									<text v-if="item.location !== null">{{item.location}}</text>
									<text>{{item.gmtCreate |formateDate}}</text>
									<text>通话{{item.voiceTime}}s</text>
								</view>
								<view @click.stop="call(item.callerMobile)">
									<image src="../../static/callDetail/laidian@2x.png" mode=""></image>
								</view>
							</view>
							<!-- 通话消息 -->
							<view class="chatItem">
								<text v-for="(item1,index1) in item.contents.slice(0,2)" :key="index1">{{item1}}</text>
								<text v-if="item.contents.length==0">对方未说话</text>
							</view>
							<!-- 来电类型 -->
							<view class="tipBox">
								<view class="tipItem"><text>{{item.labelName}}</text></view>
							</view>
						</view>
					</view>
					<!--加载更多 -->
					<uni-load-more :status="todayText" v-if="itemData.length > 9"></uni-load-more>
				</view>
			</view>
		</view>
		<!-- 到期弹窗 -->
		<uni-popup ref="popup" type="center" :maskClick="false" style="z-index: 1000;">
			<view :class="dueData.remainDays >= 0 && dueData.ofd == false?'dueView':'dueView1'">
				<view class="dueTitle" v-if="dueData.remainDays >= 0 && dueData.ofd == false">
					<text  v-if="dueData.remainDays > 0">魔小秘AI助手还有<text style="font-size: 50rpx;color: #FFECB9;">{{dueData.remainDays}}</text>天就到期了</text>
					<text  v-else>魔小秘AI助手<text style="font-size: 40rpx;color: #FFECB9;">今天</text>就到期了</text>
					<text style="margin-top: 10rpx;">立即分享领取优惠券续费吧！</text>
				</view>
				<view :class="dueData.remainDays >= 0 && dueData.ofd == false?'DueBtn':'DueBtn1'">
					<view :class="dueData.remainDays >= 0 && dueData.ofd == false?'shareBtn':'shareBtn1'" @click="dueShare">
						<text>分享领取优惠券</text>
					</view>
				</view>
			</view>
			<view class="closeImage">
				<image src="../../static/incomeHome/guanbi@2x.png" mode="" @click="closeDue"></image>
			</view>
		</uni-popup>
		<!-- banner 弹窗 -->
		<uni-popup ref="bannerPop" type="center" :maskClick="false" style="z-index: 1000;">
			<view class="dueView">
				<view class="dueTitle">
					<text>续费福利领不停，魔小秘会员专享</text>
					<text style="margin-top: 10rpx;">全场通用6折优惠券免费领！</text>
				</view>
				<view class="DueBtn" style="margin-top: 290rpx;">
					<view class="shareBtn" @click="dueShare">
						<text>分享领取优惠券</text>
					</view>
				</view>
			</view>
			<view class="closeImage">
				<image src="../../static/incomeHome/guanbi@2x.png" mode="" @click="bannerClose"></image>
			</view>
		</uni-popup>
		<!-- 分享遮罩 -->
		<view class="imageshadow" v-if="imageshow">
			<view class="shadowItem">
				<image src="../../static/incomeHome/neirong@2x.png" mode=""></image>
				<image src="../../static/invite/wozhidao@2x.png" mode="" @click="close"></image>
			</view>
		</view>
	</view>
</template>

<script>
	var timer = null
	var curToken
	import {
		uniSearchBar,
		uniIcons
	} from '../../components/uni-icons/uni-icons.vue'
	import {
		CALLRECORDLISTTODAY,
		SUBSCRIBEINFO,
		BANNER,
		SHOWINDEXTIP,
		INDEXCOUPON,
		JSAPI
	} from '../../utils/api.js'
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'
	import uniNoticeBar from '../../components/uni-notice-bar/uni-notice-bar.vue'
	import uniPopup from "../../components/uni-popup/uni-popup.vue"
	var jweixin = require('jweixin-module')
	export default {
		components: {
			uniSearchBar,
			uniNoticeBar,
			uniIcons,
			uniLoadMore,
			uniPopup
		},
		filters: {
			formateTel: function(value) {
				if (value == '057126211779') {
					var result = '魔小秘(示例电话)'
					return result
				} else {
					var pat = /(\d{3})\d*(\d{4})/
					var b = value.replace(pat, '$1****$2');
					return b
				}
			},
			formateDate: function(value) {
				var first = value.split(" ")[0]
				if (first !== undefined) {
					var second = first.split("-")
					var date = second[1] + "-" + second[2]
					return date
				}
			}
		},
		data() {
			return {
				todayStyle: 'border:1px solid #1c75ff;color:#1c75ff;box-shadow: 0 2rpx  10rpx #D4DDEC;',
				historyStyle: '',
				moduleData: [{
						src: '../../static/incomeHome/jietingpeizhi@2x.png',
						name: '接听配置'
					},
					{
						src: '../../static/incomeHome/yaoqing@2x.png',
						name: '邀请赚钱'
					},
					{
						src: '../../static/incomeHome/qianbao@2x.png',
						name: '我的钱包'
					}
				],
				bannerList: [],
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 3500,
				duration: 700,
				callList: [{}],
				getToken: "",
				itemData: "",
				todayText: 'more',
				page: 1,
				isfocus: '',
				imageshow: false,
				dueData: ''
			}
		},
		onLoad(options) {
			// 是否关注
			this.isGuanzhu()
			// 获得JSSDK
			this.getJSAPI()
			this.getCurToken()
			// banner
			this.getBanner()
			// 初始化数据
			this.initData()
			// 获取会员状态
			this.getmember()
			uni.showToast({
				title: '正在加载中...',
				icon: 'none',
				mask: true,
				isfocus: ''
			})
		},
		onPullDownRefresh() {
			this.initData()
		},
		onReachBottom: function() {
			var _this = this
			if (timer != null) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				_this.getmore();
			}, 1000);
		},

		methods: {
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			// 会员状态
			getmember() {
				var _this = this
				const params = {}
				this.$request.url_request(SHOWINDEXTIP, params, "GET", res => {
					this.dueData = JSON.parse(res.data).data
					if (this.dueData.show) {
						this.open()
					}
				}, err => {})
			},
			open() {
				this.$refs.popup.open()
			},
			closeDue() {
				this.$refs.popup.close()
			},
			// banner 弹窗关闭
			bannerClose(){
				this.$refs.bannerPop.close()
			},
			// 分享领取优惠券
			dueShare() {
				this.imageshow = true
				var that = this
				// 分享到朋友
				jweixin.onMenuShareAppMessage({
					title: '【魔小秘】您的专属智能来电助理', // 分享标题
					desc: '不想接，就挂断，来电助理帮你接听', // 分享描述
					link: 'https://m.checkshirt-ai.com/h5poster/index.html#/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: 'https://ai-assist.oss-cn-beijing.aliyuncs.com/aac/mxmlogo.png', // 分享图标
					type: 'link', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
						// 用户点击了分享后执行的回调函数
						console.log('分享成功')
						that.imageshow = false
						that.$refs.popup.close()
						that.$refs.bannerPop.close()
						const params = {}
						that.$request.url_request(INDEXCOUPON, params, "GET", res => {
							uni.navigateTo({
								url:'../MinePage/MineVipPage/MineVipPage'
							})
						}, err => {})
					}
				})
				//分享到朋友圈
				jweixin.onMenuShareTimeline({
					title: '【魔小秘】您的专属智能来电助理', // 分享标题
					link: 'https://m.checkshirt-ai.com/h5poster/index.html#/',
					imgUrl: 'https://ai-assist.oss-cn-beijing.aliyuncs.com/aac/mxmlogo.png', // 分享图标
					success: function() {
						// 用户点击了分享后执行的回调函数
						that.imageshow = false
						that.$refs.popup.close()
						that.$refs.bannerPop.close()
						const params = {}
						that.$request.url_request(INDEXCOUPON, params, "GET", res => {
							uni.navigateTo({
								url:'../MinePage/MineVipPage/MineVipPage'
							})
						}, err => {})
					}
				})
			},
			// 是否关注
			isGuanzhu() {
				const params = {}
				this.$request.url_request(SUBSCRIBEINFO, params, 'GET', res => {
					this.isfocus = JSON.parse(res.data).data
				}, err => {})
			},
			// focus
			focus() {
				uni.navigateTo({
					url: 'focus/focus'
				})
			},
			// banner
			getBanner() {
				const params = {}
				this.$request.url_request(BANNER, params, 'GET', res => {
					this.bannerList = JSON.parse(res.data).data
					if (this.bannerList.length <= 1) {
						this.indicatorDots = false
					}
				}, err => {})
			},
			// gotoList今日历史记录
			gotoList() {
				uni.report('homeCallList', '来电记录')
				uni.navigateTo({
					url: 'callList'
				})
			},
			// 跳转banner链接
			bannerView(url, type,id) {
				uni.report('homeBanner'+id, 'banner点击')
				if (type == 1) {
					if (url) {
						window.location.href = url
					}
				} else if(type == 2){
					this.$refs.bannerPop.open()
				}

			},
			// 跳转模块
			gotoModule(index) {
				if (index == 0) {
					uni.report('homeSetting', '接听配置')
					uni.switchTab({
						url: '../SettingPage/SettingPage'
					})
				} else if (index == 1) {
					uni.report('homeInvite', '邀请赚钱')
					uni.navigateTo({
						url: '../Login/Invite/Invite'
					})
				} else if (index == 2) {
					uni.report('homeWallet', '我的钱包')
					uni.navigateTo({
						url: '../MinePage/MineWallet/MineWallet'
					})
				}
			},
			// 截取
			getQueryString(name) {
				var after = window.location.search
				if (after.indexOf('?') === -1) {}
				after = window.location.href.split("?")[1] || after.substr(1);
				console.log('获取路径after', after)
				if (after) {
					var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
					var r = after.match(reg)
					if (r !== null) {
						console.log('截取的结果', decodeURIComponent(r[2]))
						return decodeURIComponent(r[2]);
					} else {
						return null
					}
				}
			},
			// 得到token
			getCurToken() {
				curToken = this.getQueryString('token')
				console.log('income中的token', curToken)
				if (!curToken) {
					//localstorage read
					curToken = uni.getStorageSync('myToken')
					console.log('locattion', curToken)
				}

				if (!curToken) {
					console.log('路径和storage的token都为空')
					uni.navigateTo({
						url: "../JumpLogin/JumpLogin"
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
			// 获得JSAPI
			getJSAPI() {
				var that = this
				const params = {}
				this.$request.url_request(JSAPI, params, "GET", res => {
					this.jsData = JSON.parse(res.data).data
					console.log("得到的签名", this.jsData.signature)
					jweixin.config({
							appId: this.jsData.appId,
							timestamp: this.jsData.timestamp,
							nonceStr: this.jsData.nonceStr,
							signature: this.jsData.signature,
							jsApiList: ['updateAppMessageShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline']
						}),
						jweixin.ready(function() {
							console.log("接口处理成功")
						}),
						jweixin.error(function() {
							console.log("接口处理失败")
						})
				}, err => {})
			},
			// 拨打电话
			call(tel) {
				uni.makePhoneCall({
					phoneNumber: tel
				})
			},
			// 初始化数据
			initData() {
				const params = {
					pageNum: 1
				}
				this.$request.url_request(CALLRECORDLISTTODAY, params, "GET", res => {
						this.itemData = JSON.parse(res.data).data.list
						uni.hideToast()
						uni.stopPullDownRefresh()
					},
					err => {});
			},
			// 加载更多
			getmore() {
				if (this.todayText == 'more') {
					this.todayText = 'loading'
					this.$forceUpdate()
					this.page++
					const params = {
						pageNum: this.page
					}
					this.$request.url_request(CALLRECORDLISTTODAY, params, "GET", res => {
						if (JSON.parse(res.data).data.list.length <= 0) {
							this.todayText = 'noMore'
							this.$forceUpdate()
						} else {
							this.todayText = 'more'
							this.itemData = this.itemData.concat(JSON.parse(res.data).data.list)
							this.$forceUpdate()
						}
					}, err => {})
				}
			},
			// 关闭遮罩
			close() {
				this.imageshow = false
			},
			gotoDetails(id) {
				uni.navigateTo({
					url: 'callDetails/callDetails?id=' + id
				})
			},

		}
	}
</script>

<style scoped>
	page {
		/* background-color: #F3F6F7; */
		background-color: #FFFFFF;
	}

	/* 分享遮罩 */
	.imageshadow {
		width: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		height: 100vh;
		position: fixed;
		z-index: 1300;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}

	.shadowItem {
		padding: 50rpx;
	}

	.shadowItem>image:nth-of-type(1) {
		width: 517rpx;
		height: 373rpx;
		display: block;
	}

	.shadowItem>image:nth-of-type(2) {
		width: 241rpx;
		height: 86rpx;
		display: block;
		margin-top: 50rpx;
		margin-left: 100rpx;
	}

	.indexBox {
		overflow: hidden;
	}

	.search {
		background: #FFFFFF;
	}

	.searchBar {
		border-radius: 15rpx;
	}

	.whiteBg {
		background: #FFFFFF;
	}

	/* 今日来电 */
	.indexBtn {
		background: #FFFFFF;
		width: 750rpx;
		margin: auto;
		margin-top: 30rpx;
		padding-bottom: 40rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.noCall>text {
		color: #666666;
		font-size: 30rpx;
	}

	button::after {
		border: none;
	}

	.today {
		width: 317rpx;
		font-size: 28rpx;
		outline: none;
		border: 1px solid #E5E5E5;
		border-radius: 50rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 1rpx 10rpx #E5E5E5;
	}

	.callList {
		/* background-color: #F3F6F7;	 */
		overflow: hidden;
	}

	.callListItem {
		border: 1rpx solid #FFFFFF;
		box-shadow: 2rpx 2rpx 15rpx 5rpx #E8EDEF;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		display: flex;
		flex-direction: row;
		/* justify-content: space-between; */
		/* width: 650rpx; */
		margin: 30rpx;
		padding: 30rpx 40rpx;
	}

	.rightItem {
		padding: 0 20rpx;
		margin-left: 2rpx;
	}

	.mobileFont {
		color: #111111;
		font-size: 32rpx;
	}

	.duration {
		font-size: 26rpx;
		color: #777777;
	}

	.duration>text {
		margin-right: 20rpx;
	}

	.durationItem {
		margin-top: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.durationItem>view>image {
		width: 29rpx;
		height: 35rpx;
	}

	.chatItem {
		border: 1rpx solid #E1E1E1;
		box-shadow: 1rpx 1rpx 15rpx #D8DEE6;
		padding: 30rpx 20rpx;
		/* max-height: 129rpx; */
		width: 483rpx;
		overflow: hidden;
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #222222;
		border-radius: 20rpx;
	}

	.chatItem>text {
		display: -webkit-box;
		-webkit-line-clamp: 1;
		overflow: hidden;
		-webkit-box-orient: vertical;
	}

	.continue {
		font-size: 22rpx;
		color: #999999;
		margin-top: 10rpx;
		display: inline-block;
	}

	.tipBox {
		margin-top: 10rpx;
	}

	.textIcon {
		font-size: 22rpx;
		color: #999999;
		display: inline-block;
	}

	.tipItem {
		padding: 5rpx 16rpx;
		margin: 10rpx;
		font-size: 26rpx;
		text-align: center;
		color: white;
		/* background-color: #1c75ff; */
		background: linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 70%, #5799ff 100%);
		background: -ms-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 70%, #5799ff 100%);
		background: -webkit-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 70%, #5799ff 100%);
		background: -moz-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 70%, #5799ff 100%);
		display: inline-block;
		box-shadow: 0 3rpx 10rpx #85B5ff;
		border-radius: 10rpx;
	}

	.tipItem>text {
		line-height: 40rpx;
	}

	.noDataBox {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 100rpx;
	}

	.noData {
		text-align: center;
	}

	.noData>image {
		width: 265rpx;
		height: 204rpx;
	}

	.noData>view> {
		margin-top: 20rpx;
	}

	.noData>view>text {
		color: #CBDCFE;
		font-size: 28rpx;
	}

	.banner {
		background: #FFFFFF;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.uni-margin-wrap {

		height: 100%;
		margin: 0 0upx;
	}

	.swiper {
		height: 300rpx;
	}

	.banner>image {
		width: 100%;
		height: 295rpx;
	}

	.module {
		/* border: 1rpx solid #F0AD4E; */
		padding: 30rpx 30rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.moduleItem {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		margin: 0 10rpx;
	}

	.moduleItem>image {
		width: 75rpx;
		height: 75rpx;
	}

	.badgeNum {
		border: 1rpx solid #FFFFFF;
		text-align: center;
		padding: 3rpx;
		width: 30rpx;
		height: 30rpx;
		color: #FFFFFF;
		border-radius: 100rpx;
		font-size: 20rpx;
		background-color: #E01212;
		position: absolute;
		top: -10rpx;
		right: 10rpx;
		z-index: 999;
	}

	/* 今日来电 */
	.todayCall {
		background: #FFFFFF;
		color: #111111;
		padding: 20rpx 0;
		/* font-weight: 600; */
	}

	.title {
		padding: 20rpx 30rpx;
		font-size: 34rpx;
	}

	/* 到期弹窗 */
	.dueView {
		width: 560rpx;
		height: 686rpx;
		overflow: hidden;
		background-size: cover;
		background-image: url('~@/static/incomeHome/bj@2x.png');
	}

	.dueView1 {
		width: 560rpx;
		height: 686rpx;
		overflow: hidden;
		background-size: cover;
		background-image: url('~@/static/incomeHome/yiguoqi@2x.png');
	}

	.dueTitle {
		font-size: 30rpx;
		color: #FFFFFF;
		margin-top: 150rpx;
		font-weight: 600;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.closeImage {
		width: 100%;
		height: 60rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.closeImage>image {
		width: 60rpx;
		height: 60rpx;
	}

	.DueBtn {
		margin-top: 270rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;

	}

	.DueBtn1 {
		margin-top: 520rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;

	}

	.shareBtn {
		padding: 20rpx 50rpx;
		color: #FFFFFF;
		font-size: 32rpx;
		border-radius: 100rpx;
		box-shadow: 0rpx 5rpx 25rpx #FF5841;
		background: linear-gradient(bottom, #FF4735 0%, #FF4735 40%, #FF654B 70%, #FF654B 100%);
		background: -ms-linear-gradient(bottom, #FF4735 0%, #FF4735 40%, #FF654B 70%, #FF654B 100%);
		background: -webkit-linear-gradient(bottom, #FF4735 0%, #FF4735 40%, #FF654B 70%, #FF654B 100%);
		background: -moz-linear-gradient(bottom, #FF4735 0%, #FF4735 40%, #FF654B 70%, #FF654B 100%);
	}

	.shareBtn1 {
		padding: 20rpx 50rpx;
		color: #FFFFFF;
		font-size: 32rpx;
		border-radius: 100rpx;
		box-shadow: 0rpx 5rpx 25rpx #4DC0FF;
		background: linear-gradient(top, #4EC2FF, #2E95FF);
		background: -ms-linear-gradient(top, #4EC2FF, #2E95FF);
		background: -webkit-linear-gradient(top, #4EC2FF, #2E95FF);
		background: -moz-linear-gradient(top, #4EC2FF, #2E95FF);
	}
</style>
