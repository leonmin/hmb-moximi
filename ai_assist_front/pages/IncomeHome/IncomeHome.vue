<template>
	<view class="indexBox">
		<view v-if="itemData">
			<view v-if="isfocus !== 1">
				<uni-notice-bar @click='focus' style="margin: 0;" show-close="true" show-icon="true" text="尚未关注公众号，无法接受来电消息提醒，点击关注 >"></uni-notice-bar>
			</view>
			<view class=" whiteBg">
				<!-- 搜索来电 -->
				<view class="cu-bar search" @click="search">
					<view class="search-form searchBar">
						<text class="cuIcon-search"></text>
						<input type="text" placeholder="搜索来电" confirm-type="search"></input>
					</view>
				</view>
				<!-- 今日、历史来电 -->
				<view class="indexBtn">
					<button class="today" @click="todayBtn" :style="todayStyle">今日来电</button>
					<button class="today" @click="historyBtn" :style="historyStyle">历史来电</button>
				</view>

			</view>
			<!-- 通话列表 -->
			<view class="callList">
				<view v-if="itemData.length == 0">
					<view class="noDataBox">
						<view class="noData">
							<image src="../../static/quexing/laidain@2x.png" mode=""></image>
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
				<uni-load-more :status="istoday? todayText: historyText" v-if="itemData.length !== 0"></uni-load-more>
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
		CALLRECORDLIST,
		SUBSCRIBEINFO
	} from '../../utils/api.js'
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'
	import uniNoticeBar from '../../components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		components: {
			uniSearchBar,
			uniNoticeBar,
			uniIcons,
			uniLoadMore
		},
		filters: {
			formateTel: function(value) {
				var pat = /(\d{3})\d*(\d{4})/
				var b = value.replace(pat, '$1****$2');
				return b
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
				callList: [{}],
				getToken: "",
				itemData: "",
				istoday: 1,
				todayText: 'more',
				historyText: 'more',
				page: 1
			}
		},
		onLoad(options) {
			this.isGuanzhu()
			this.getCurToken()
			this.initData()
			uni.showToast({
				title: '正在加载中...',
				icon:'none',
				mask:true,
				isfocus:''
			})
		},
		onPullDownRefresh() {
			if (this.istoday == 1) {
				this.initData()
			} else if (this.istoday == 0) {
				this.historyBtn()
			}

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
			// 是否关注
			isGuanzhu(){
				const params = {}
				this.$request.url_request(SUBSCRIBEINFO,params,'GET',res =>{
					this.isfocus = JSON.parse(res.data).data
				},err =>{})
			},
			// focus
			focus(){
				uni.navigateTo({
					url:'focus/focus'
				})
			},
			// 截取
			getQueryString(name) {
				var after = window.location.search
				if (after.indexOf('?') === -1) {}
				after = window.location.href.split("?")[1] || after.substr(1);
				console.log('获取路径after',after)
				if (after) {
					var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
					var r = after.match(reg)
					if (r !== null) {
						console.log('截取的结果',decodeURIComponent(r[2]))
						return decodeURIComponent(r[2]);
					} else {
						return null
					}
				}
			},
			// 得到token
			getCurToken() {	
				curToken = this.getQueryString('token')
				console.log('income中的token',curToken)
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
			// 拨打电话
			call(tel) {
				uni.makePhoneCall({
					phoneNumber: tel
				})
			},
			// 初始化数据
			initData() {
				this.istoday = 1
				const params = {
					pageNum:1
				}
				this.$request.url_request(CALLRECORDLISTTODAY, params, "GET", res => {
						this.itemData = JSON.parse(res.data).data.list
						uni.hideToast()
						uni.stopPullDownRefresh()
					},
					err => {});
			},
			// 加载更多
			getmore(){
				if (this.todayText == 'more' || this.historyText == 'more') {
					if(this.istoday == 1){
					this.todayText = 'loading'
					this.$forceUpdate()
					this.page++
					const params = {
						pageNum: this.page
					}
						this.$request.url_request(CALLRECORDLISTTODAY, params, "GET", res => {
							if(JSON.parse(res.data).data.list.length<= 0){
								this.todayText = 'noMore'
								this.$forceUpdate()
							} else{
								this.todayText = 'more'
								this.itemData = this.itemData.concat(JSON.parse(res.data).data.list)
								this.$forceUpdate()
							}	
					}, err => {})
					} else{
						this.page++
						const params = {
							pageNum: this.page
						}
						this.historyText = 'loading'
						this.$request.url_request(CALLRECORDLIST, params, "GET", res => {
							if(JSON.parse(res.data).data.list.length<= 0){
								this.historyText = 'noMore'
								this.$forceUpdate()
							} else{
								this.historyText = 'more'
								this.itemData = this.itemData.concat(JSON.parse(res.data).data.list)
								this.$forceUpdate()
							}	
						}, err => {})
					}
					
				}
			},
			search() {
				uni.navigateTo({
					url: 'search/search'
				})
			},
			// 今日来电
			todayBtn() {
				uni.showToast({
					title: '正在加载中...',
					icon:'none',
					mask:true
				})
				this.historyText = 'more'
				this.historyStyle = ''
				this.todayStyle = 'border:1px solid #1c75ff;color:#1c75ff;box-shadow: 0rpx 1rpx  10rpx #D4DDEC;'
				this.page = 1
				this.initData()
			},
			// 历史来电
			historyBtn() {
				uni.showToast({
					title: '正在加载中...',
					icon:'none',
					mask:true
				})
				this.todayText  = 'more'
				this.page = 1
				this.istoday = 0
				this.todayStyle = ''
				this.historyStyle = 'border:1px solid #1c75ff;color:#1c75ff;box-shadow: 0rpx 1rpx  10rpx #D4DDEC;'
				const params = {
					pageNum:1
				}
				this.$request.url_request(CALLRECORDLIST, params, "GET", res => {
						this.itemData = JSON.parse(res.data).data.list
						uni.hideToast()
						uni.stopPullDownRefresh()
					},
					err => {});
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
		background-color: #F3F6F7;
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
		background-color: #F3F6F7;
		overflow: hidden;
	}

	.callListItem {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		display: flex;
		flex-direction: row;
		/* justify-content: space-between; */
		/* width: 650rpx; */
		margin: 30rpx 30rpx;
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
	.noDataBox{
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 350rpx;
	}
	.noData{
		text-align: center;
	}
	.noData>image{
		width: 285rpx;
		height: 166rpx;
	}
	.noData>view>{
		margin-top: 20rpx;
	}
	.noData>view>text{
		color: #CBDCFE;
		font-size: 28rpx;
	}
</style>
