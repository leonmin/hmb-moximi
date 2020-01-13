<template>
	<view>
		<!-- <view class="box"> -->
		<view v-if="infoData" class="box">
			<!-- 头部视图 -->
			<image class="mineHeader" src="../../static/mine/bj@2x.png">
				<view class="mineHeader-image">
					<!-- 用户信息 -->
					<view class="mineHeader-userInfo">
						<image style="width: 79rpx; height: 107rpx; position: absolute; top: 90rpx; left: 15rpx;" src="../../static/mine/zhuanghsi@2x.png"
						 mode=""></image>
						<image class="mineHeader-userHeader" src="../../static/logoHead.png" mode=""></image>
						<view class="mineHeader-userName">
							{{infoData.userName}}
						</view>
						<view class="mineHeader-phone">
							{{infoData.mobile}}
						</view>

						<!-- 使用简介 -->
						<view class="mineHeader-useInter">
							<view class="mineHeader-userInterSub flex-sub">
								<view class="mineHeader-userInterTitle" v-if="infoData">
									{{infoData.totalUsedDays}}<text class="mineHeader-userInterSubTitle">天</text>
								</view>
								<view class="mineHeader-userInterTitle" v-else>
									0<text class="mineHeader-userInterSubTitle">天</text>
								</view>
								<view class="mineHeader-userInterDesc">
									使用助理
								</view>
							</view>
							<view class="mineHeader-userInterSub flex-sub">
								<view class="mineHeader-userInterTitle" v-if="infoData">
									{{infoData.totalCallCount}}<text class="mineHeader-userInterSubTitle">通</text>
								</view>
								<view class="mineHeader-userInterTitle" v-else>
									0<text class="mineHeader-userInterSubTitle">通</text>
								</view>
								<view class="mineHeader-userInterDesc">
									接听电话
								</view>
							</view>
							<view class="mineHeader-userInterSub flex-sub">
								<view class="mineHeader-userInterTitle" v-if="infoData">
									{{parseInt(changeTime.split(',')[0])}}<text class="mineHeader-userInterSubTitle">{{changeTime.split(',')[1]}}</text>
								</view>
								<view v-else class="mineHeader-userInterTitle">
									0<text class="mineHeader-userInterSubTitle">秒</text>
								</view>
								<view class="mineHeader-userInterDesc">
									节约时间
								</view>
							</view>
						</view>
						<!-- vip 会员卡 -->
						<view class="mineHeader-vipHeader" @click="mineVipClick()">
							<image style="width:100%; height: 110rpx; 110rpx; position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: 0;"
							 src="../../static/mine/kapianjihuo@2x.png" mode="aspectFill"></image>
							<view class="vip-header" style="z-index: 1;">
								<image class="vip-logo" src="../../static/mine/huiyuan-jihuo@2x.png" mode=""></image>
								<view class="vip-desc">
									VIP会员
								</view>
							</view>
							<view v-if="infoData.vipEndTime !==null || infoData.vipEndTime !== '' " class="vip-time" style="z-index: 1;">
								<span style='margin-right: 10rpx;'>{{getTime}}</span>到期
							</view>
							<view v-else class="vip-time" style="z-index: 1;">已到期</view>
						</view>
					</view>
				</view>
			</image>


			<!-- 周简介 -->
			<view class="mineTraduce">
				<view class="">
					本周累计为您接听了{{infoData.weekCallCount}}通电话，为您节省了{{ Math.floor(weekTime.split(',')[0]*100)/100 }}{{weekTime.split(',')[1]}}，击败了{{ Math.floor(infoData.beatPercent*100)/100 }}%的用户，立即分享鼓励一下吧！
				</view>
				<view class="mineTraduce-Share" style="width: 110rpx; margin-left: 32rpx;">
					<view class="" style="width: 2rpx; background-color: #CCCCCC;height: 61rpx;">

					</view>
					<image style="width: 50rpx; height: 50rpx;margin-left: 15rpx;" src="../../static/mine/fenxiang@2x.png" mode=""
					 @click="weekShare"></image>
				</view>
			</view>

			<!-- 模块 -->
			<view class="module">
				<view class="moduleItem" @click="mineVipClick">
					<image src="../../static/mine/huangguan.png" mode="" style="width: 56rpx;height: 44rpx;"></image>
					<text class="moduleText">我的会员</text>
				</view>
				<view class="moduleItem" @click="helpCenter">
					<image src="../../static/mine/bangzhu@2x.png" mode="" style="width: 46rpx;height: 45rpx;"></image>
					<text class="moduleText">帮助中心</text>
				</view>
				<view class="moduleItem" @click="haveAWord">
					<image src="../../static/mine/woyouhuahsuo@2x.png" mode="" style="width: 43rpx;height: 44rpx;"></image>
					<text class="moduleText">我有话说</text>
				</view>
				<view class="moduleItem" @click="focus">
					<image src="../../static/mine/lijiguanzhu@2x.png" mode="" style="width: 53rpx;height: 42rpx;"></image>
					<text class="moduleText">立即关注</text>
				</view>
			</view>

			<!-- 底部菜单 -->
			<view class="mineList">
				<view class="mineList-item" @click="exclusiveNum">
					<view class="listItem-header">
						<image style="width: 36rpx;height: 36rpx;" class="listItem-headerIcon" src="../../static/mine/zhuanshuzhuanjie@2x.png"
						 mode=""></image>
						<view class="listItem-headerTitle">
							专属转接号码 
						</view>
					</view>
					<view class="listItem-footer">
				
						<view class="listItem-footerTitle">
							{{phoneNum}}
						</view>
						<image style="height: 22rpx; width: 12rpx;margin-left: 18rpx;" class="listItem-footerIcon" src="../../static/mine/VIPPage/jinru@2x.png"
						 mode=""></image>
					</view>
				</view>
				
				<view class="mineList-item" @click="mineWalletClick()">
					<view class="listItem-header">
						<image style="width: 36rpx;height: 36rpx;" class="listItem-headerIcon" src="../../static/mine/qianbao-@2x.png"
						 mode=""></image>
						<view class="listItem-headerTitle">
							我的钱包
						</view>
					</view>
					<view class="listItem-footer">

						<view class="listItem-footerTitle" style="color: #E01212;">
							￥{{infoData.balance}}
						</view>
						<image style="height: 22rpx; width: 12rpx;margin-left: 18rpx;" class="listItem-footerIcon" src="../../static/mine/VIPPage/jinru@2x.png"
						 mode=""></image>
					</view>
				</view>

				<view class="mineList-item" @click="saveMoney">
					<view class="listItem-header">
						<image style="width: 36rpx;height: 36rpx;" class="listItem-headerIcon" src="../../static/mine/haoyou@2x.png" mode=""></image>
						<view class="listItem-headerTitle">
							为好友省钱
						</view>
					</view>

					<view class="listItem-footer">
						<view class="listItem-footerTitle">
							已邀请{{infoData.inviteUserCount}}人
						</view>
						<image style="height: 22rpx; width: 12rpx;margin-left: 18rpx;" class="listItem-footerIcon" src="../../static/mine/VIPPage/jinru@2x.png"
						 mode=""></image>
					</view>
				</view>
			</view>
			<view class="imageshadow" v-if="imageshow">
				<view class="shadowItem">
					<image src="../../static/invite/jiantou@2x.png" mode=""></image>
					<image src="../../static/invite/wozhidao@2x.png" mode="" @click="close"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		MYINFO,
		JSAPI,
		GETNUMINFO
	} from "../../utils/api.js"
	var jweixin = require('jweixin-module')
	export default {
		data() {
			return {
				infoData: "",
				imageshow: false,
				screenHight: '',
				phoneNum: ''
			}
		},
		computed: {
			getTime: function() {
				var time = this.infoData.vipEndTime
				var result = String(time).split(" ")[0]
				return result
			},
			changeTime: function() {
				var time = this.infoData.totalCallTime
				var result = 0
				if (time >= 3600 * 24) {
					result = time / 3600 / 24 + ',天'
				} else if (time >= 3600 && time <= 3600 * 24) {
					result = time / 3600 + ',小时'
				} else if (time >= 60 && time < 3600) {
					result = time / 60 + ',分钟'
				} else {
					result = time + ',秒'
				}
				return result
			},
			weekTime: function() {
				var time = this.infoData.weekCallTime
				var result = 0
				if (time >= 3600 * 24) {
					result = time / 3600 / 24 + ',天'
				} else if (time >= 3600 && time <= 3600 * 24) {
					result = time / 3600 + ',小时'
				} else if (time >= 60 && time < 3600) {
					result = time / 60 + ',分钟'
				} else {
					result = time + ',秒'
				}
				return result
			}
		},
		onLoad() {
			// 初始化数据
			this.initData()
			// 获得JSSDK
			this.getJSAPI()
			// 获取呼叫转接号码
			this.getPhoneNum()
			uni.showToast({
				title: '正在加载中..',
				icon: 'none',
				mask: false
			})
		},
		onPullDownRefresh() {
			this.initData()
		},
		methods: {
			// 初始化数据
			initData() {
				const params = {}
				this.$request.url_request(MYINFO, params, "GET", res => {
					this.infoData = JSON.parse(res.data).data
					uni.hideToast()
					uni.stopPullDownRefresh()
				}, err => {})
			},
			// 获取呼叫转接号码
			getPhoneNum(){
				const params = {}
				this.$request.url_request(GETNUMINFO,params,'GET',res=>{
					this.phoneNum = JSON.parse(res.data).data.line
				},err =>{})
			},
			// 我的钱包
			mineWalletClick() {
				uni.navigateTo({
					url: 'MineWallet/MineWallet'
				})
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
			weekShare() {
				console.log(11)
				this.imageshow = true
				var that = this
				// 分享到朋友
				jweixin.onMenuShareAppMessage({
					title: '【魔小秘】您的专属智能来电助理', // 分享标题
					desc: '不想接，就挂断，来电助理帮你接听', // 分享描述
					link: that.$url.shareURL, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
					link: that.$url.shareURL,
					imgUrl: 'https://ai-assist.oss-cn-beijing.aliyuncs.com/aac/mxmlogo.png', // 分享图标
					success: function() {
						// 用户点击了分享后执行的回调函数
						that.imageshow = false
					}
				})



			},
			// 我的会员
			mineVipClick() {
				uni.navigateTo({
					url: "MineVipPage/MineVipPage"
				})
			},
			// 专属号码
			exclusiveNum(){
				uni.navigateTo({
					url:'exclusiveNum/exclusiveNum'
				})
			},
			// focus
			focus() {
				uni.navigateTo({
					url: '../IncomeHome/focus/focus'
				})
			},
			close() {
				this.imageshow = false
			},
			// 为好友省钱
			saveMoney() {
				uni.navigateTo({
					url: "../Login/Invite/Invite?invite=" + this.infoData.inviteUrl
				})
			},
			// 帮助中心
			helpCenter() {
				uni.navigateTo({
					url: '../helpCenter/helpCenter'
				})
			},
			aaa(){
				uni.showModal({
					content: '请到公众号菜单关于我们->联系客服',
					showCancel: false
				});
			},
			haveAWord() {
				uni.navigateTo({
					url: 'haveASaying/haveASaying'
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F1F4F6;
	}

	/* 底部菜单 */
	.listItem-footerTitle {
		font-size: 22rpx;
		color: #999999;
	}

	.listItem-headerTitle {
		color: #222222;
		font-size: 28rpx;
		margin-left: 18rpx;
	}

	.listItem-footer {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.listItem-header {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.mineList-item {
		height: 112rpx;
		width: 100%;

		display: flex;
		flex-direction: row;
		justify-content: space-between;

		padding-left: 40rpx;
		padding-right: 38rpx;
	}

	.mineList {
		background-color: #FFFFFF;
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 20rpx;

	}

	/* 周使用简介 */
	.mineTraduce-Share {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		height: 61rpx;
	}

	.mineTraduce {
		border-radius: 20rpx;
		background-color: #FFFFFF;
		height: 126rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 268rpx;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		padding-left: 40rpx;
		padding-right: 38rpx;

		font-size: 24rpx;
		color: #111111;
	}

	/* 使用简介 */
	.mineHeader-userInterSubTitle {
		font-size: 22rpx;
		font-weight: normal;
	}

	.mineHeader-userInterTitle {
		font-size: 40rpx;
		color: #1C75FF;
		font-weight: 400;
	}

	.mineHeader-userInterDesc {
		font-size: 22rpx;
		color: #999999;
	}

	.mineHeader-userInterSub {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.mineHeader-useInter {
		margin-top: 50rpx;
		height: 110rpx;
		width: 100%;
		/* margin-left: 30rpx; */
		/* margin-right: 30rpx; */

		display: flex;
		flex-direction: row;
	}
	/* 会员信息 */
	.vip-desc {
		margin-left: 15rpx;
		font-size: 32rpx;
		font-weight: bold;
	}

	.vip-header {
		display: flex;
		flex-direction: row;
	}

	.vip-logo {
		width: 39rpx;
		height: 37rpx;
	}

	.mineHeader-vipHeader {
		position: relative;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		color: rgba(228, 192, 133, 1);
		font-size: 26rpx;

		padding-left: 40rpx;
		padding-right: 40rpx;

		height: 110rpx;
		width: 100%;
		background-color: #3D3D40;
		/* margin-left: 30rpx; */
		/* margin-right: 30rpx; */
		border-radius: 20rpx;
	}

	/* 用户信息 */
	.mineHeader-phone {
		color: #333333;
		font-size: 26rpx;
	}

	.mineHeader-userName {
		color: #333333;
		font-size: 34rpx;
		font-weight: bold;
		margin-top: 25rpx;
	}

	.mineHeader-userInfo {
		position: absolute;
		width: 100%;
		top: -75rpx;

		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.mineHeader-userHeader {
		/* position: absolute; */
		height: 148rpx;
		width: 148rpx;

		border-radius: 74rpx;
		border: 4px solid rgba(255, 255, 255, 0.6);
	}

	/* 头部视图 */
	.mineHeader-image {
		position: absolute;
		top: 148rpx;
		height: 433rpx;
		width: calc(100% - 60rpx);
		background-color: #FFFFFF;

		margin-left: 30rpx;
		margin-right: 30rpx;

		border-radius: 20rpx;
		/* filter: blur(1px); */
	}

	.mineHeader {
		width: 100%;
		height: 330rpx;
		/* background-image: url('../../static/mine/bj@2x.png'); */
		/* background-color: #007AFF; */
		/* padding: 130rpx 5% 40rpx; */
		position: relative;
	}

	.imageshadow {
		width: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		height: 100vh;
		position: absolute;
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
		width: 464rpx;
		height: 304rpx;
		display: block;
	}

	.shadowItem>image:nth-of-type(2) {
		width: 241rpx;
		height: 86rpx;
		display: block;
		margin-top: 50rpx;
		margin-left: 100rpx;
	}

	.module {
		margin: 20rpx 30rpx 0 30rpx;
		border-radius: 25rpx;
		background: #FFFFFF;
		padding: 45rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.moduleItem {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.moduleText {
		display: block;
		margin-top: 20rpx;
		size: 26rpx;
		color: #111111;
	}
</style>
