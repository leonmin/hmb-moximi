<template>
	<view>
		<!-- 顶部信息栏 -->
		<view class="topHeader">
			<view class="headerItem">
				<!-- 未返回头像url -->
				<image src="../../static/logoHead.png" mode=""></image>
				<view class="headerTime">
					<text>{{myInfo.userName}}</text>
					<text :class="myInfo.vipEndTime? 'daoqi' : 'xufei' ">{{myInfo.vipEndTime?"到期时间"+myInfo.vipEndTime.split(' ')[0] : '立即续费'}}</text>
				</view>
			</view>
		</view>
		<!-- 卡密输入栏 -->
		<view class="camiloInput">
			<input type="text" v-model="myCamilo" value="" placeholder="****_****_****_****" />
			<text class="camiloText">卡密为16位，数字+大小写英文组合</text>
		</view>
		<!-- 兑换按钮 -->
		<view class="exchange">
			<button @click="exchange" :disabled="isdisable">立即兑换</button>
		</view>
		<view class="deliver"></view>
		<!-- 兑换码说明 -->
		<view class="tips">
			<text class="tipTitle">卡密说明</text>
			<view class="tipBox">
				<text>1.卡密请在有效期内激活使用，否则视为无效。</text>
				<text>2.卡密只供一次充值使用，一旦激活，卡密立即失效</text>
				<text>3.卡密不绑定用户，请勿发给他人，防止造成损失</text>
				<text>4.本公司在法律允许范围内拥有卡密最终解释权。</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		EXCHANGECARD,
		MYINFO
	} from '@/utils/api.js'
	export default {
		data() {
			return {
				isData: false,
				myInfo: '',
				myCamilo: '',
				isdisable: false,
				type: ''
			}
		},
		onLoad(options) {
			this.type = options.type
			// 我的信息
			this.getInfo()
		},
		methods: {
			getInfo() {
				const params = {}
				this.$request.url_request(MYINFO, params, 'GET', res => {
					this.myInfo = JSON.parse(res.data).data
				}, err => {})
			},
			// 兑换
			exchange() {
				this.isdisable = true
				var _this = this
				setTimeout(function() {
					_this.isdisable = false
					_this.$forceUpdate()
				}, 1000)
				if (this.myCamilo == '') {
					uni.showToast({
						title: '卡密不能为空',
						icon: 'success',
						duration: 1000
					})
				} else {
					var _this = this
					const params = {
						card: this.myCamilo
					}
					_this.$request.url_request(EXCHANGECARD, params, 'GET', res => {
						if (JSON.parse(res.data).code == 0) {
							uni.showToast({
								title: '兑换成功',
								icon: 'success',
								duration: 1000
							})
							if (_this.type == 1) {
								setTimeout(() => {
									uni.reLaunch({
										url: '../Welcome/guideNew/guideNew'
									})
								},1000)
							} else {
								setTimeout(() => {
									_this.getInfo()
								}, 1000)
							}

						} else {
							if (JSON.parse(res.data).msg) {
								uni.showToast({
									title: JSON.parse(res.data).msg,
									icon: 'none',
									duration: 1200
								})
							}
						}
					}, err => {})
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	/* 顶部信息栏 */
	.topHeader {
		margin: 30rpx;
		width: 690rpx;
		height: 235rpx;
		padding: 0 46rpx;
		background-size: cover;
		background-image: url(~@/static/camilo/kapian@2x.png);
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.topHeader>view>image {
		width: 107rpx;
		height: 107rpx;
		border-radius: 150rpx;
		border: 1rpx solid #1C75FF;
	}

	.headerItem {
		color: #FFFFFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}

	.headerTime {
		display: flex;
		flex-direction: column;
		margin-left: 25rpx;
	}

	.headerTime>text:nth-of-type(1) {
		font-size: 34rpx;
	}

	.daoqi {
		font-size: 24rpx;
		margin-top: 18rpx;
		display: inline-block;
		color: #b3b3b3;
	}

	.xufei {
		color: #F3D9AF;
		margin-top: 18rpx;
		display: inline-block;
		color: 26rpx;
	}

	/* 卡密输入栏 */
	.camiloInput {
		margin-top: 56rpx;
		padding: 0 30rpx;
	}

	.camiloInput input {
		margin: auto;
		/* width: 684rpx; */
		border: 1rpx solid #1C75FF;
		border-radius: 10rpx;
		height: 86rpx;
		padding: 10rpx 20rpx;
	}

	.camiloText {
		display: inline-block;
		color: #333333;
		font-size: 30rpx;
		margin: 29rpx 0;
	}

	/* 兑换按钮 */
	.exchange {
		margin: 50rpx 0;
		padding: 0 30rpx;
	}

	button::after {
		border: none;
	}

	.exchange button {
		height: 78rpx;
		border-radius: 100rpx;
		color: #FFFFFF;
		font-size: 34rpx;
		background: linear-gradient(left, #efd1b3 0%, #efd1b3 10%, #e0ba94 80%, #e0ba94 100%);
		background: -ms-linear-gradient(left, #efd1b3 0%, #efd1b3 10%, #e0ba94 80%, #e0ba94 100%);
		background: -webkit-linear-gradient(left, #efd1b3 0%, #efd1b3 10%, #e0ba94 80%, #e0ba94 100%);
		background: -moz-linear-gradient(left, #efd1b3 0%, #efd1b3 10%, #e0ba94 80%, #e0ba94 100%);
	}

	.deliver {
		height: 15rpx;
		background-color: #F3F6F7;
	}

	/* 兑换码说明 */
	.tips {
		padding: 54rpx 30rpx;
		text-align: center;
	}

	.tipTitle {
		font-size: 36rpx;
		color: #111111;
	}

	.tipBox {
		border: 1rpx solid #FFFFFF;
		margin-top: 50rpx;
		box-shadow: 1rpx 1rpx 15rpx #d7dde7;
		padding: 40rpx;
		text-align: left;
		border-radius: 18rpx;
	}

	.tipBox>text {
		color: #111111;
		font-size: 30rpx;
		display: block;
		margin: 18rpx 0;
	}
</style>
