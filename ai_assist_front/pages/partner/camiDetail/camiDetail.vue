<template>
	<view v-if="cardDetails">
		<view class="topBox">
			<view class="topTitle">
				<text>编号：{{cardDetails.serialNumber}}</text>
				<text style="font-weight: 400;font-size: 28rpx;">{{now < cardDetails.endDate?'未过期':'已过期'}}</text>
			</view>
			<!-- 卡密信息 -->
			<view class="cardInfo">
				<view class="infoItem nameStyle">
					<view class="titleName" style="font-weight: 600;">
						<text>名称</text>
					</view>
					<text>：</text>
					<text>{{cardDetails.title}}</text>
				</view>
				<view class="infoItem">
					<view class="titleName">
						<text>总发行量</text>
					</view>
					<text>：</text>
					<text>{{cardDetails.total}}个（已使用：{{cardDetails.usedCount}}）</text>
				</view>
				<view class="infoItem">
					<view class="titleName">
						<text>使用范围</text>
					</view>
					<text>：</text>
					<text>{{cardDetails.days | formateType}}</text>
				</view>
				<view class="infoItem">
					<view class="titleName">
						<text>有效期</text>
					</view>
					<text>：</text>
					<text>{{cardDetails.beginDate | formateDate}} - {{cardDetails.endDate |formateDate}}</text>
				</view>
			</view>
		</view>
		<!-- 卡密详情 -->
		<view class="infoList">
			<view class="cardInfoItem" v-for="(item,index) in infoList" :key='index'>
				<view class="firstLine">
					<view class="firstText">
						<text>{{item.cardKey |formateCami}}</text>
						<text style='margin-left: 10rpx;font-size: 22rpx;' :class="item.username == null? 'unuse':'used'">({{item.username == null?'未使用':'已使用'}})</text>
					</view>
					<view v-if='now < cardDetails.endDate' :class="item.username == null? 'copy': 'copy1'" v-clipboard:copy="item.cardKey" v-clipboard:success="(type) => onCopyResult('success')"
					 v-clipboard:error="(type) => onCopyResult('error')">
						<text>复制卡密</text>
					</view>
				</view>
				<view class="secondLine" v-if="item.username !== null">
					<view style="color: #333333;">
						<text style="font-size: 26rpx;">{{item.username}}</text>
						<text style="font-size: 24rpx;margin-left: 10rpx;">{{item.mobile |formateTel}}</text>
					</view>
					<view style="font-size: 22rpx;color: #999999;">
						<text>{{item.usedTime}}</text>
					</view>
				</view>
				<view class="deliver"></view>
			</view>
		</view>
		<!-- 加载更多 -->
		<uni-load-more :status="load" v-if='infoList.length > 9'></uni-load-more>
	</view>
</template>

<script>
	var timer = null
	import {
		CARDPACKDETAILS
	} from '../../../utils/api.js'
	import uniLoadMore from '../../../components/uni-load-more/uni-load-more.vue'
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				cardId: '',
				cardDetails: '',
				infoList: [],
				page: 1,
				load: 'more',
				now: ''

			}
		},
		filters: {
			formateTel: function(value) {			
					var pat = /(\d{3})\d*(\d{4})/
					var b = value.replace(pat, '$1****$2');
					return b
			},
			formateCami: function(value) {
					var pat = /([a-zA-Z0-9]{4})[a-zA-Z0-9]*([a-zA-Z0-9]{4})/
					var b = value.replace(pat, '$1********$2');
					return b
			},
			formateDate: function(value) {
				var first = String(value).split(" ")[0]
				if (first !== undefined) {
					return first
				}
			},
			formateType(value) {
				var result
				if (value == 30) {
					result = '月卡'
				} else if (value == 90) {
					result = '季卡'
				} else if (value == 360) {
					result = '年卡'
				}
				return result
			}
		},
		onPullDownRefresh() {
			this.page = 1
			this.getDetail()
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
		onLoad(options) {
			uni.showToast({
				title:'加载中...',
				icon:'none',
				mask:true
			})
			this.cardId = options.id
			this.getDetail()
			this.getTime()
		},
		methods: {
			// 详情
			getDetail() {
				const params = {
					page: this.page,
					packId: this.cardId
				}
				this.$request.url_request(CARDPACKDETAILS, params, 'GET', res => {
					uni.hideToast()
					this.cardDetails = JSON.parse(res.data).data.card
					this.infoList = JSON.parse(res.data).data.details.records
					uni.stopPullDownRefresh()
				}, err => {})
			},
			//加载更多
			getmore() {
				if (this.load == 'more') {
					this.load == 'loading'
					this.$forceUpdate()
					this.page++
					const params = {
						page: this.page,
						packId: this.cardId
					}
					this.$request.url_request(CARDPACKDETAILS, params, 'GET', res => {
						if (JSON.parse(res.data).data.details.records.length <= 0) {
							this.load = 'moMore'
							this.$forceUpdate()
						} else {
							// this.cardDetails = JSON.parse(res.data).data.card
							this.infoList = this.infoList.concat(JSON.parse(res.data).data.details.records)
							this.load = 'more'
							this.$forceUpdate()
						}
						uni.stopPullDownRefresh()
					}, err => {})
				}
			},
			// 获取当前时间
		getTime() {
			var myDate = new Date();
			var year = myDate.getFullYear();
			var month = myDate.getMonth() + 1;
			var date = myDate.getDate();
			var h = myDate.getHours();
			var m = myDate.getMinutes();
			var s = myDate.getSeconds();
			this.now = year + '-' + this.conver(month) + "-" + this.conver(date) + " " + this.conver(h) + ':' + this.conver(m) +
				":" + this.conver(s);
			console.log(this.now)
		},
		conver(s) {
			return s < 10 ? '0' + s : s;
		},
			// 复制
			onCopyResult(type) {
				if (type === 'success') {
					uni.showToast({
						title: '复制成功',
						icon: 'none',
						duration: 1000
					})
				} else {}
			},
		}
	}
</script>

<style>
	page {
		background: #F3F6F7;
	}

	.topBox {
		width: 100%;
		height: 400rpx;
		background: linear-gradient(top, #2584FF 0%, #2584FF 10%, #F3F6F7 85%, #F3F6F7 100%);
		background: -ms-linear-gradient(top, #2584FF 0%, #2584FF 10%, #F3F6F7 85%, #F3F6F7 100%);
		background: -webkit-linear-gradient(top, #2584FF 0%, #2584FF 10%, #F3F6F7 85%, #F3F6F7 100%);
		background: -moz-linear-gradient(top, #2584FF 0%, #2584FF 10%, #F3F6F7 85%, #F3F6F7 100%);
	}

	.topTitle {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 50rpx 30rpx 0 30rpx;
		color: #FFFFFF;
		font-size: 30rpx;
		align-items: center;
		font-weight: 600;
	}

	.cardInfo {
		background: #FFFFFF;
		height: 279rpx;
		padding: 40rpx 30rpx;
		margin: 0 30rpx;
		margin-top: 30rpx;
		border-radius: 15rpx;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}

	.titleName {
		display: inline-block;
		width: 150rpx;
		text-align-last: justify;
	}

	.infoItem {
		font-size: 28rpx;
		color: #333333;
	}

	.infoList {
		background: #FFFFFF;
		margin: 20rpx 30rpx;
		padding: 40rpx 30rpx;
		border-radius: 15rpx;
	}

	.cardInfoItem {
		/* border: 1rpx solid #F0AD4E; */

	}

	.firstLine {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.firstText {
		font-size: 30rpx;
		color: #333333;
	}

	.copy {
		border: 1rpx solid #1C75FF;
		color: #1C75FF;
		padding: 10rpx 22rpx;
		border-radius: 100rpx;
	}

	.copy1 {
		border: 1rpx solid #D3D3D3;
		color: #AFAFAF;
		padding: 10rpx 20rpx;
		border-radius: 100rpx;
	}

	.unuse {
		color: #1C75FF;
	}

	.used {
		color: #666666;
	}

	.secondLine {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.nameStyle {
		/* border: 1rpx solid #D2F1F0; */
		max-width: 450rpx;
		overflow:hidden; /*超出的部分隐藏起来。*/ 
		white-space:nowrap;/*不换行*/
		text-overflow:ellipsis;/*超出文本以省略号显示 */
	}
	.deliver {
		border-top: 1rpx solid #F1F1F1;
		margin: 30rpx 0;
	}
</style>
