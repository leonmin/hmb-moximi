<template>
	<view v-if="myInviteData">
		<view class="topHead">
			<view class="itemNum">
				<text>今日邀请</text>
				<text>{{myInviteData.todayInviteUserCount}}</text>
			</view>
			<view class="divider"></view>
			<view class="itemNum">
				<text>总共</text>
				<text>{{myInviteData.inviteUserCount}}</text>
			</view>
		</view>
		<view class="diliver"></view>
		<view class="InviteList">
			<view class="inviteTitle">
				<view><text>用户昵称</text></view>
				<view><text>邀请时间</text></view>
			</view>
			<view class="deliver"></view>
			<view class="list">
				<view class="listItem" v-for="(item,index) in listData" :key='index'>
					<view><text>{{item.mobile | mobilechange}}</text></view>
					<view><text>{{item.addTime | datechange}}</text></view>
				</view>
			</view>
			<view v-if="listData.length <= 0" class="noData">
				<image src="../../../static/quexing/wushujku@2x.png" mode=""></image>
				<view>
					<text>暂无数据</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		INVITELIST,
		INVITEDATA
	} from '../../../utils/api.js'
	export default {
		data() {
			return {
				listData: '',
				myInviteData: ''
			}
		},
		onLoad() {
			uni.showToast({
				title: '加载中...',
				icon: "none",
				mask: true
			})
			// 邀请明细
			this.inviteList()
			this.myInvite()
		},
		onPullDownRefresh() {
			this.inviteList()
			this.myInvite()
		},
		filters: {
			mobilechange: function(value) {
				var b =''
				if (value) {
					var pat = /(\d{3})\d*(\d{4})/
					b = value.replace(pat, '$1****$2');
					return b
				} else {
					b = '未绑定'
					return b
				}

			},
			datechange: function(value) {
				if (value) {
					var first = value.split(" ")[0]
					if (first !== undefined) {
						return first
					}
				} else {
					return ''
				}

			}
		},
		methods: {
			myInvite() {
				const params = {}
				this.$request.url_request(INVITEDATA, params, 'GET', res => {
					this.myInviteData = JSON.parse(res.data).data
					uni.hideToast()
					uni.stopPullDownRefresh()
				}, err => {})
			},
			inviteList() {
				const params = {
					pageNum: 1,
					pageSize: 20
				}
				this.$request.url_request(INVITELIST, params, 'GET', res => {
					this.listData = JSON.parse(res.data).data
					uni.hideToast()
					uni.stopPullDownRefresh()
				}, err => {})
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.topHead {
		width: 750rpx;
		height: 284rpx;
		background-size: cover;
		background-image: url(~@/static/partner/bj@2x.png);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.diliver {
		height: 20rpx;
		background-color: #F3F6F7;
	}

	.itemNum {
		display: flex;
		flex-direction: column;
		color: #FFFFFF;
		text-align: center;
		width: 250rpx;
	}

	.itemNum>text:nth-of-type(1) {
		font-size: 30rpx;
	}

	.itemNum>text:nth-of-type(2) {
		font-size: 64rpx;
	}

	.divider {
		width: 3rpx;
		height: 79rpx;
		background-color: #FFFFFF;
	}

	.InviteList {
		background-color: #FFFFFF;
		padding: 50rpx 0 22rpx 0;
		overflow: hidden;
	}

	.inviteTitle {
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 0 38rpx;

	}

	.inviteTitle>view {
		width: 300rpx;
		/* border: 1rpx solid; */
		text-align: center;
	}

	.inviteTitle>view>text {
		font-size: 30rpx;
		color: #333333;
	}

	.deliver {
		border-top: 1rpx solid #EDEDED;
		margin-top: 40rpx;
		margin-bottom: 50rpx;
	}

	.list {
		/* 	margin-top: 30rpx; */
	}

	.listItem {
		color: #111111;
		font-size: 30rpx;
		margin: 30rpx 38rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.listItem>view {
		/* border: 1rpx sienna solid; */
		width: 300rpx;
		text-align: center;
		margin: 30rpx 0;
	}

	.noData {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.noData>image {
		display: block;
		margin-top: 50rpx;
		width: 265rpx;
		height: 204rpx;
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
