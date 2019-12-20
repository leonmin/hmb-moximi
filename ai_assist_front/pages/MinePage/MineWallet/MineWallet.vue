<template>
	<view v-if="myWalletData">
		<!-- 顶部信息 -->
		<view class="topHeader">
			<view class="restTips">
				余额
			</view>
			<view class="userMoney">
				<text style="font-size: 40rpx;">￥</text>{{myWalletData.balance}}
			</view>

			<view class="userDraw" @click="withDrawClick()">
				立即提现
			</view>
		</view>

		<!-- 今日获得信息 -->
		<view class="today-view">
			<view class="today-header">
				<image class="today-headerIcon" src="../../../static/huode-@2x.png" mode=""></image>
				<view class="">
					今日获得
				</view>
			</view>
			<view class="today-money" style="color: #E01212; font-size: 28rpx; font-weight: 400;">
				￥{{myWalletData.todayIncom}}
			</view>
		</view>

		<!-- 钱包明细 -->
		<view class="money-detail">
			<view class="money-detailHeader">
				钱包明细
			</view>
			<view class="deli">
				
			</view>
			<view>
				<view v-for="(item,index) in cashListData" :key="index" v-if="item.changeBalance">
					<view class="money-listItem">
						<view class="listItem-header">
							<view class="listItem-Desc">
								{{item.changeType | typeFormate}}
							</view>
							<view class="listItem-Time">
								{{item.addTime}}
							</view>
						</view>
						<view class="listItem-footer">
							{{item.changeBalance/100}}
						</view>
					</view>
					<view class="deliver"></view>
				</view>
				<!-- <view class="loading">{{loadingText}}</view> -->
				<uni-load-more :status="loadingText" v-if="cashListData.length >= 10"></uni-load-more>
			</view>
	<!-- 		<view v-if="cashListData.length = 0" class="noData">
				<image src="../../../static/quexing/wushuju@2x.png" mode=""></image>
				<view>
					<text>暂无数据</text>
				</view>
			</view> -->


		</view>
	</view>
</template>

<script>
	var timer = null
	import {
		MYCASH,
		CASHLIST
	} from "../../../utils/api.js"
	import uniLoadMore from '../../../components/uni-load-more/uni-load-more.vue'
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				myWalletData: "",
				mineWithDraw: "",
				cashListData: '',
				loadingText: 'more',
				page: 1
			}
		},
		filters:{
			typeFormate:function(value){
				var result
				if(value == 1){
					result = '普通邀请会员首次购买'
				} else if(value ==2 ){
					result = '普通邀请会员续费购买'
				} else if (value ==3){
					result = '合伙人邀请会员首次购买'
				} else if(value ==4){
					result = '合伙人邀请会员续费购买'
				} else if(value ==5){
					result = '合伙人提现'
				} else if(value ==6){
					result = '合伙人提现失败'
				} else if(value ==7){
					result = '普通收益提现'
				} else if(value ==8){
					result = '普通收益提现失败'
				} else if(value ==9){
					result = '卡密收益'
				}
				return result
			}
		},
		onShow() {
			uni.showToast({
				title: '加载中...',
				icon: 'none',
				mask: true
			})
			// 初始化数据
			this.initData()
			// 零钱明细
			this.cashlist()
		},
		onLoad() {},
		onPullDownRefresh() {
			this.initData()
			this.cashlist()
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
			// 初始化数据
			initData() {
				const params = {}
				this.$request.url_request(MYCASH, params, "GET", res => {
					this.myWalletData = JSON.parse(res.data).data
					this.mineWithDraw = JSON.parse(res.data).data.balance
					uni.hideToast()
					uni.stopPullDownRefresh()
				}, err => {})
			},
			// cashlist 零钱明细
			cashlist() {
				const params = {
					page: 1
				}
				this.$request.url_request(CASHLIST, params, "GET", res => {
					this.cashListData = JSON.parse(res.data).data.records
					uni.stopPullDownRefresh()
				}, err => {})
			},
			// 加载更多
			getmore() {
				if (this.loadingText == 'more') {
					this.loadingText = 'loading'
					this.$forceUpdate()
					this.page++
					const params = {
						page: this.page
					}
					this.$request.url_request(CASHLIST, params, "GET", res => {
						if (JSON.parse(res.data).data.records.length <= 0) {
							uni.hideNavigationBarLoading();
							this.loadingText = 'noMore'
							this.$forceUpdate()
						} else {
							this.loadingText = 'more'
							this.$forceUpdate()
							this.cashListData = this.cashListData.concat(JSON.parse(res.data).data.records)
						}
					}, err => {})
				}


			},
			walletDetailClick() {
				uni.navigateTo({
					url: '../MineWalletDetail/MineWalletDetail'
				})
			},
			// 提现
			withDrawClick() {
				uni.navigateTo({
					url: "../MineWithDraw/MineWithDraw"
				})
			},
			goback() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>
	page {
		
		background-color: #FFFFFF;
	}

	/* 钱包明细 */
	.listItem-footer {
		color: #333333;
		font-size: 36rpx;

		font-weight: 400;
	}

	.deliver {
		border-top: 1rpx solid #EDEDED;
		margin: 10rpx;
	}
.deli{
background-color: #F1F4F6;
padding: 10rpx 0;
}
	.listItem-Time {
		color: #999999;
		font-size: 24rpx;
		margin-top: 16rpx;
	}

	.listItem-Desc {
		color: #333333;
		font-size: 28rpx;
	}

	.money-listItem {
		height: 140rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		padding-left: 30rpx;
		padding-right: 30rpx;
	}

	.money-detail {
		margin-top: 15rpx;
		background-color: #FFFFFF;
	}

	.money-detailHeader {
		height: 140rpx;
		background-color: #FFFFFF;

		display: flex;
		align-items: center;
		justify-content: center;

		font-size: 32rpx;
		color: #333333;
	}

	/* 今日获取信息 */
	.today-header {
		font-size: 30rpx;
		color: #333333;

		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.today-headerIcon {
		height: 44rpx;
		width: 41rpx;
		margin-right: 10rpx;
	}

	.today-view {
		height: 108rpx;
		background-color: #FFFFFF;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		padding-left: 30rpx;
		padding-right: 30rpx;
	}

	/* 顶部信息 */
	.userDraw {
		margin-top: 60rpx;
		width: 184rpx;
		height: 55rpx;

		border: 1px solid #FFFFFF;
		border-radius: 26.5rpx;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.userMoney {
		font-size: 60rpx;
		font-weight: bold;
		margin-top: 30rpx;
		height: 45rpx;
	}

	.restTips {
		margin-top: 48rpx;
		font-size: 26rpx;
		font-weight: 400;
	}

	.topHeader {
		color: #FFFFFF;
		width: 100%;
		height: 331rpx;
		background: linear-gradient(0deg, rgba(28, 117, 255, 1) 0%, rgba(102, 162, 255, 1) 100%);

		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.loading {
		text-align: center;
		padding: 20rpx 0;
	}
	.noData{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 120rpx;
	}
	.noData>image{
		width: 285rpx;
		height: 166rpx;
	}
	.noData>view{
		text-align: center;
		margin-top: 30rpx;
	}
	.noData>view>text{
		font-size: 28rpx;
		color: #CBDCFE;
	}
</style>
