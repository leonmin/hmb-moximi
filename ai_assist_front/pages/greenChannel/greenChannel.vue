<template>
	<view v-if="taskInfo">
		<!-- banner展示 -->
		<view class="banner">
			<image src="../../static/greenChannel/zhuashurenw@2x.png" mode=""></image>
		</view>
		<!-- 任务展示 -->
		<view class="taskBox">
			<view class="taskTitle">任务情况</view>
			<view class="taskDes">
				<text>邀请好友激活魔小秘会员</text>
				<text>({{taskInfo.completeCount}}/{{taskInfo.destCount}})</text>
			</view>
			<view class="cu-progress round sm striped progress">
				<view class="bg-yellow" :style="{'width': progress+'%'}"></view>
			</view>
			<view class="taskEnd">
				<image v-if="taskInfo.completeCount >= taskInfo.destCount" src="../../static/greenChannel/xufei@2x.png" mode=""></image>
				<text v-else>完成任务，可获取永久续费折扣福利</text>
			</view>
		</view>
		<view class="division"></view>
		<!-- 折扣专区 -->
		<view class="discountBox" v-if="taskInfo.completeCount >= taskInfo.destCount">
			<view class="discountTitle" :class="taskInfo.completeCount >= taskInfo.destCount? 'lock':'unlock'">
				<text>折扣专区</text>
				<text>{{taskInfo.completeCount >= taskInfo.destCount? '已解锁':'尚未解锁'}}</text>
			</view>
			<view class="saleContain">
				<view v-for="(item,index) in goodslist" :key="index" class="saleItem checkedBg" :class="saleItem == index?'checkedBg':'uncheckedBg'"
				 @click="checkSaleItem(index,item.sku,item.greenPrice,item.price)">
					<text class="fontStyle30">{{item.cardTitle}}</text>
					<view class="price">
						<text style="font-size: 30rpx;">￥</text>
						<text>{{item.greenPrice | priceChange}}</text>
					</view>
					<s :class="saleItem == index?'orignalPrice':'orignalPrice1'">
						<view>
							<text style="font-size: 20rpx;">￥</text>
							<text style="font-size: 28rpx;">{{item.oldPriceDes}}</text>
						</view>
					</s>
				</view>
			</view>
		</view>
		<!-- 折扣专区未解锁 -->
		<view class="discountBox" v-if="taskInfo.completeCount < taskInfo.destCount">
			<view class="discountTitle" :class="taskInfo.completeCount >= taskInfo.destCount? 'lock':'unlock'">
				<text>折扣专区</text>
				<text>{{taskInfo.completeCount >= taskInfo.destCount? '已解锁':'尚未解锁'}}</text>
			</view>
			<view class="saleContain">
				<view v-for="(item,index) in goodslist" :key="index" class="oldsaleItem oldcheckedBg" :class="saleItem == index?'oldcheckedBg':'olduncheckedBg'">
					<text class="fontStyle30">{{item.cardTitle}}</text>
					<view class="price">
						<text style="font-size: 30rpx;">￥</text>
						<text>{{item.greenPrice | priceChange}}</text>
					</view>
					<s :class="saleItem == index?'orignalPrice':'orignalPrice1'">
						<view>
							<text style="font-size: 20rpx;">￥</text>
							<text style="font-size: 28rpx;">{{item.oldPriceDes}}</text>
						</view>
					</s>
				</view>
			</view>
		</view>
		<!-- 按钮 -->
		<!-- 支付 -->
		<view class="bto-bar cu-bar foot" style="bottom: 0px; background: #FFFFFF;" v-if='taskInfo.completeCount >= taskInfo.destCount'>
			<view class="bto-bar-header">
				<view class="bto-bar-headerTitle">
					￥
					<text style="font-size: 40rpx;">{{payPrice}}</text>
				</view>
			</view>
			<view class="bto-bar-commit" @click="pay">
				立即支付
			</view>
		</view>
		<!-- 分享 -->
		<view class="submitBtn" @click="greenShare" v-else>
			立即完成任务
		</view>
		<view style="height: 60rpx;"></view>
		<!-- 分享 -->
		<view class="imageshadow" v-if="imageshow">
			<view class="shadowItem">
				<image src="../../static/greenChannel/wenz@2x.png" mode=""></image>
				<image src="../../static/invite/wozhidao@2x.png" mode="" @click="close"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		TASKINFO,
		GREENCARDLIST,
		GREENCREATEORDER,
		JSAPI,
		MYINFO
	} from '../../utils/api.js'
	var jweixin = require('jweixin-module')
	export default {
		data() {
			return {
				ischeck: false,
				saleItem: 0,
				greenSku: "",
				taskInfo: '',
				goodslist: "",
				payData: '',
				progress: '',
				imageshow: false,
				inviteUrl: '',
				payPrice: ''
			}
		},
		filters:{
			priceChange:(value)=>{
				return value/100
			}
		},
		onLoad() {
			uni.showToast({
				title: '加载中...',
				icon: 'none',
			})
			// 任务进度
			this.getTaskInfo()
			// 绿色通道卡列表
			this.getCardList()
			// 获得JSSDK
			this.getJSAPI()
			// 我的邀请数据
			this.getUrl()
		},
		methods: {
			// 获得URL
			getUrl() {
				const params = {}
				this.$request.url_request(MYINFO, params, "GET", res => {
					this.inviteUrl = JSON.parse(res.data).data.inviteUrl
				}, err => {})
			},
			// 任务进度
			getTaskInfo() {
				const params = {}
				this.$request.url_request(TASKINFO, params, 'GET', res => {
					this.taskInfo = JSON.parse(res.data).data
					// this.progress = parseInt(this.taskInfo.completeCount / this.taskInfo.destCount)*100
					this.progress = parseInt(this.taskInfo.completeCount / this.taskInfo.destCount*100)
				}, err => {})
			},
			// 绿色通道卡列表
			getCardList() {
				const params = {}
				this.$request.url_request(GREENCARDLIST, params, 'GET', res => {
					uni.hideToast()
					this.goodslist = JSON.parse(res.data).data
					this.greenSku = this.goodslist[0].sku
					this.payPrice = this.goodslist[0].greenPrice/100
				}, err => {})
			},
			// 选择优惠
			checkSaleItem(index, sku, greenPrice, total) {
				this.saleItem = index;
				this.greenSku = sku
				this.payPrice = greenPrice/100

			},
			// 支付
			pay() {
				uni.report('greenPay', '绿色通道页面支付')
				const params = {
					sku: this.greenSku
				}
				this.$request.url_request(GREENCREATEORDER, params, "POST", res => {
					this.payData = JSON.parse(res.data)
					if (typeof WeixinJSBridge == "undefined") {
						if (document.addEventListener) {
							document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
						} else if (document.attachEvent) {
							document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
							document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
						}
					} else {
						this.onBridgeReady();
					}

				}, err => {})

			},
			//  支付
			onBridgeReady() {
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": this.payData.appId, //公众号名称，由商户传入     
						"timeStamp": this.payData.timeStamp, //时间戳，自1970年以来的秒数     
						"nonceStr": this.payData.nonceStr, //随机串     
						"package": this.payData.packageValue,
						"signType": this.payData.signType, //微信签名方式：     
						"paySign": this.payData.paySign //微信签名 
					},
					function(res) {
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							uni.reLaunch({
								url: '../MinePage'
							})
							// 使用以上方式判断前端返回,微信团队郑重提示：
							//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
						}
					}
				)
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
			// weekShare
			greenShare() {
				uni.report('greenShare', '绿色通道页面完成任务')
				console.log(11)
				this.imageshow = true
				var that = this
				// 分享到朋友
				jweixin.onMenuShareAppMessage({
					title: '【魔小秘】您的专属智能来电助理', // 分享标题
					desc: '快来领取你的优惠券', // 分享描述
					link: that.inviteUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: 'https://ai-assist.oss-cn-beijing.aliyuncs.com/aac/mxmlogo.png', // 分享图标
					type: 'link', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
						// 用户点击了分享后执行的回调函数
						that.imageshow = false
					}
				})
				//分享到朋友圈
				jweixin.onMenuShareTimeline({
					title: '【魔小秘】您的专属智能来电助理', // 分享标题
					link: that.inviteUrl,
					imgUrl: 'https://ai-assist.oss-cn-beijing.aliyuncs.com/aac/mxmlogo.png', // 分享图标
					success: function() {
						// 用户点击了分享后执行的回调函数
						that.imageshow = false
					}
				})
			},
			close() {
				this.imageshow = false
			},
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	.banner>image {
		width: 100%;
		height: 240rpx;
	}

	.taskBox {
		padding: 60rpx 30rpx;
	}

	.taskTitle {
		font-size: 34rpx;
		color: rgba(17, 17, 17, 1);
		font-weight: 600;
	}

	.taskDes {
		margin-top: 27rpx;
		font-size: 30rpx;
		color: rgba(51, 51, 51, 1);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.progress {
		margin-top: 39rpx;
		width: 100%;
		height: 34rpx;
		background: rgba(255, 241, 222, 1);
		border: 1rpx solid rgba(245, 180, 24, 1);
		box-shadow: -1rpx 0rpx 15rpx 0rpx rgba(252, 195, 57, 0.4);
		border-radius: 17rpx;
		position: relative;
	}

	.taskEnd {
		margin-top: 30rpx;
		font-size: 28rpx;
		color: rgba(85, 85, 85, 1);
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.taskEnd>image {
		width: 380rpx;
		height: 35rpx;
	}

	.bg-yellow {
		border-radius: 100rpx;
	}

	.division {
		width: 100%;
		height: 20rpx;
		background: rgba(243, 246, 247, 1);
	}

	.discountBox {
		padding: 50rpx 30rpx;
	}

	.discountTitle {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 34rpx;
	}

	.discountTitle>text:nth-of-type(1) {
		font-weight: 600;
	}

	.discountTitle>text:nth-of-type(2) {
		font-size: 28rpx;
	}

	.unlock {
		color: #999999;
	}

	.lock {
		color: #111111;
	}

	.lock>text:nth-of-type(2) {
		background: linear-gradient(to right, #D5A06E, #B18153);
		-webkit-background-clip: text;
		color: transparent;
	}

	.saleContain {
		margin-top: 57rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.saleItem {
		/* flex-shrink:0; */
		background-size: cover;
		width: 193rpx;
		height: 252rpx;
		text-align: center;
		padding: 30rpx;
	}
	.oldsaleItem {
		/* flex-shrink:0; */
		background-size: cover;
		width: 204rpx;
		height: 252rpx;
		text-align: center;
		padding: 30rpx;
	}
	.checkedBg {
		background-image: url('~@/static/welcome/yueka@2x.png');
		position: relative;
	}

	.uncheckedBg {
		background-image: url('~@/static/welcome/yuka-wei@2x.png');
	}
	.oldcheckedBg {
		background-image: url('~@/static/greenChannel/zhekou-xuanz@2x.png');
		position: relative;
	}

	.olduncheckedBg {
		background-image: url('~@/static/greenChannel/zhihui-weixuanz@2x.png');
	}
	.price {
		margin: 36rpx 0;
		font-size: 40rpx;
		color: #111111;
	}

	.orignalPrice {
		font-size: 20rpx;
		color: #FFFFFF;
	}

	.orignalPrice1 {
		font-size: 20rpx;
		color: #C3C3C3;
	}

	.submitBtn {
		margin: 0 30rpx;
		width: 690rpx;
		padding: 21rpx 0;
		text-align: center;
		background: linear-gradient(-90deg, #FAB26C, #FED4AB);
		border-radius: 39px;
		color: #FFFFFF;
		margin-top: 20rpx;
	}

	.payBtn {
		margin: 0 30rpx;
		border: 1rpx solid #F0AD4E;

	}

	.imageshadow {
		width: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		height: 100vh;
		position: fixed;
		z-index: 999;
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
		width: 645rpx;
		height: 343rpx;
		display: block;
	}

	.shadowItem>image:nth-of-type(2) {
		width: 241rpx;
		height: 86rpx;
		display: block;
		margin-top: 50rpx;
		margin-left: 200rpx;
	}

	.bto-bar-commit {
		font-size: 26rpx;
		color: #FFFFFF;
		width: 156rpx;
		height: 54rpx;
		background: linear-gradient(-90deg, rgba(224, 186, 148, 1), rgba(239, 209, 179, 1));
		border-radius: 27rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 30rpx;
	}

	.bto-bar-headerTitle {
		color: #E01212;
		font-size: 26rpx;
		font-weight: 400;
	}

	.bto-bar-header {
		display: flex;
		flex-direction: row;
		align-items: center;

		margin-left: 30rpx;
	}

	.bto-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		font-weight: 400;
	}
</style>
