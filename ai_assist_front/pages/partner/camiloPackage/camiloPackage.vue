<template>
	<view v-if="cardList">
		<!-- 有数据 -->
		<view>
			<view class="camiItem" @click="camiDetail(item.id)" v-for="(item,index) in cardList" :key='index'>
				<view class="title">
					<text>编号：{{item.serialNumber}}</text>
					<text :class="now<item.endDate?'used':'unused'"> {{now < item.endDate?'可使用':'已过期'}}</text>
				</view>
				<view class="contentCard" :class="now<item.endDate?'useCard':'unuseCard'">
					<view class="cardTitle">
						<view class="nameStyle">
							<view class="titleName">
								<text>名称</text>
							</view>
							<text>：</text>
							<text>{{item.title}}</text>
						</view>
						<view style="font-size: 26rpx;">查看详情</view>
					</view>
					<view class="contentItem">
						<view class="titleName">
							<text>总发行量</text>
						</view>
						<text>：</text>
						<text>{{item.total}}个(已使用：{{item.usedCount}}个)</text>
					</view>
					<view class="contentItem">
						<view class="titleName">
							<text>适用范围</text>
						</view>
						<text>：</text>
						<text>{{item.days | formateType}}</text>
					</view>
					<view class="contentItem">
						<view class="titleName">
							<text>有效期</text>
						</view>
						<text>：</text>
						<text>{{item.beginDate |formateDate}} - {{item.endDate |formateDate}}</text>
					</view>
				</view>
			</view>
			<!--加载更多 -->
			<uni-load-more :status="load" v-if="cardList.length > 9"></uni-load-more>
		</view>

		<!-- 无数据 -->
		<view v-if='cardList.length == 0'>
			<view class="noDataBox">
				<view class="noData">
					<image src="../../../static/quexing/wushujku@2x.png" mode=""></image>
					<view>
						<text>暂无卡密包</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	var timer = null
	import {
		CARDPACK
	} from '../../../utils/api.js'
	import uniLoadMore from '../../../components/uni-load-more/uni-load-more.vue'
	export default {
		components: {
			uniLoadMore
		},
		filters: {
			formateDate: function(value) {
				var first = value.split(" ")[0]
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
			this.getCardList()
		},
		data() {
			return {
				available: true,
				cardList: [],
				page: 1,
				now: '',
				load: 'more'
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
		onLoad() {
			uni.showToast({
				title: '加载中...',
				icon: 'none',
				mask: true
			})
			this.getCardList()
			this.getTime()
		},
		methods: {
			// getCardList
			getCardList() {
				const params = {
					page: this.page
				}
				this.$request.url_request(CARDPACK, params, 'GET', res => {
					this.cardList = JSON.parse(res.data).data.records
					uni.stopPullDownRefresh()
					uni.hideToast()
				}, err => {})
			},
			// 加载更多
			getmore() {
				if (this.load == 'more') {
					this.todayText = 'loading'
					this.$forceUpdate()
					this.page++
					const params = {
						page: this.page
					}
					this.$request.url_request(CARDPACK, params, 'GET', res => {
						if (JSON.parse(res.data).data.records.length <= 0) {
							this.load = 'noMore'
							this.$forceUpdate()
						} else {
							this.cardList = this.cardList.concat(JSON.parse(res.data).data.records)
							this.load = 'more'
							this.$forceUpdate()
						}
					}, err => {})
				}


			},
			// getTime
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
			// 卡密详情
			camiDetail(id) {
				uni.navigateTo({
					url: '../camiDetail/camiDetail?id=' + id
				})
			}
		}
	}
</script>

<style>
	page {
		background: #F3F6F7;
	}

	.camiItem {
		margin: 20rpx 0;
		padding: 30rpx;
		background: #FFFFFF;
	}

	.title {
		font-size: 28rpx;
		color: #111111;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.used {
		color: #1C75FF;
	}

	.unused {
		color: #C6C4C4
	}

	.contentCard {
		margin-top: 30rpx;
		width: 690rpx;
		height: 300rpx;
		padding: 48rpx 22rpx 50rpx 30rpx;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}

	.nameStyle {
		/* border: 1rpx solid #D2F1F0; */
		max-width: 450rpx;
		overflow:hidden; /*超出的部分隐藏起来。*/ 
		white-space:nowrap;/*不换行*/
		text-overflow:ellipsis;/*超出文本以省略号显示 */
	}

	.useCard {
		background-size: cover;
		background-image: url('~@/static/camiloPackage/keyong@2x.png');
	}

	.unuseCard {
		background-size: cover;
		background-image: url('~@/static/camiloPackage/yiguoqi@2x.png');
	}

	.cardTitle {
		/* border: 1rpx solid #F0AD4E; */
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 32rpx;
		color: #FFFFFF;
	}

	.titleName {
		display: inline-block;
		width: 150rpx;
		text-align-last: justify;
	}

	.contentItem {
		font-size: 28rpx;
		color: #FFFFFF;
	}

	.noDataBox {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 450rpx;
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
</style>
