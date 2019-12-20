<template>
	<view class="balance">
		<view v-if="list.length > 0" v-for="(item,index) in list" :key='index'>
			<view class="balanceItem">
				<view class="left">
					<view>
						<text class="name">{{item.changeType | typeFormate}}</text>
					</view>
					<text class="time">{{item.addTime}}</text>
				</view>
				<view class="price">
					<text>{{item.changeBalance/100}}</text>
				</view>
			</view>
			<view class="deliver"></view>
		</view>
		<view v-if="list.length <= 0" class="noData">
			<image src="../../../static/quexing/wushuju@2x.png" mode=""></image>
			<view>
				<text>暂无数据</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		PARTNERCASHLIST
	} from '../../../utils/api.js'
	export default {
		data() {
			return {
				listData: '',
				list: ''
			}
		},
		filters: {
			typeFormate: function(value) {
				var result
				if (value == 1) {
					result = '普通邀请会员首次购买'
				} else if (value == 2) {
					result = '普通邀请会员续费购买'
				} else if (value == 3) {
					result = '合伙人邀请会员首次购买'
				} else if (value == 4) {
					result = '合伙人邀请会员续费购买'
				} else if (value == 5) {
					result = '合伙人提现'
				} else if (value == 6) {
					result = '合伙人提现失败'
				} else if (value == 7) {
					result = '普通收益提现'
				} else if (value == 8) {
					result = '普通收益提现失败'
				} else if (value == 9) {
					result = '卡密收益'
				}
				return result
			}
		},
		onLoad() {
			uni.showToast({
				title: '加载中...',
				icon: 'none',
				duration: 1000
			})
			this.initData()
		},
		methods: {
			initData() {
				const params = {}
				this.$request.url_request(PARTNERCASHLIST, params, 'GET', res => {
					this.listData = JSON.parse(res.data).data
					this.list = JSON.parse(res.data).data.records
					uni.hideToast()
				}, err => {})
			}
		}
	}
</script>

<style>
	.balance {
		margin: 0 30rpx;
	}

	.balanceItem {
		padding: 31rpx 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.left {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.name {
		font-size: 28rpx;
		color: #333333;
		margin-top: 40rpx;
	}

	.status {
		font-size: 26rpx;
		margin-left: 20rpx;
	}

	.statusfail {
		color: #E01212;
	}

	.statusCheck {
		color: #FEA500;
	}

	.statusSucc {
		color: #1C75FF;
	}

	.reason {
		margin: 9rpx;
		color: #E01212;
		font-size: 22rpx;
	}

	.time {
		color: #999999;
		font-size: 24rpx;
		margin: 9rpx;
	}

	.price {
		color: #333333;
		font-size: 36rpx;
	}

	.deliver {
		border-top: 1rpx solid #EDEDED;
	}

	.noData {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 450rpx;
		left: 240rpx;
	}

	.noData>image {
		width: 285rpx;
		height: 166rpx;
	}

	.noData>view {
		text-align: center;
		margin-top: 30rpx;
	}

	.noData>view>text {
		font-size: 28rpx;
		color: #CBDCFE;
	}
</style>
