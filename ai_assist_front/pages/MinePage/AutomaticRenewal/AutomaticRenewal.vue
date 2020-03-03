<template>
	<view v-if="infoData">
		<view class="topHead">
			<view class="topHeadBox">
				<view class="headImage">
					<image src="../../../static/logoHead.png" mode=""></image>
				</view>
				<view class="userInfo">
					<view class="userInfoName">{{infoData.userName}}</view>
					<view class="userTime" v-if="now > infoData.vipEndTime">
						您的会员已到期，请立即续费
					</view>
					<view class="userInfoTime" v-else>到期时间：  {{getDueTime}}</view>
				</view>
			</view>

		</view>
		<view class="positionBox">
			<view class="renewalBox">
				<view class="renewalBoxtop">
					<view class="renewalBoxLeft">
						<view class="renewalBoxtopName">
							<text>连续包月VIP</text>
						</view>
						<view class="renewalBoxtopTime">到期时间：  {{getDueTime}}</view>
					</view>
					<view class="renewalBoxRight" @click="closeRenewal">关闭</view>
				</view>
				<view class="renewalInfo">
					<view class="renewalInfoItem">
						<text class="infoLeft">续费产品</text>
						<text class="infoRight">连续包月VIP</text>
					</view>
					<view class="renewalInfoItem magin50">
						<text class="infoLeft">下次续费金额</text>
						<text class="infoRight">15元/月</text>
					</view>
					<view class="renewalInfoItem magin50">
						<text class="infoLeft">下次续费时间</text>
						<text class="infoRight">2020-03-22</text>
					</view>
					<view class="renewalInfoItem magin50">
						<text class="infoLeft">支付方式</text>
						<text class="infoRight">微信</text>
					</view>
				</view>
			</view>
			<view class="tipBox">*为确保您的会员权益不中断，若您微信余额不足，魔小秘会尝试从您微信绑定的银行卡里为您续费哦～</view>
			<view class="positionDeliver"></view>
			<view class="recommended">
				<view class="recTitle">为您推荐</view>
				<view class="recImage">
					<image src="../../../static/del/banner-2@2x.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 关闭弹窗 -->
		<uni-popup ref='closeRenewal' type='center' style="z-index: 10000;" :maskClick='false'>
			<view class="closeRnenwal">
				<view class="rnenwalTitle">
					<text>若关闭自动续费</text>
					<text>下次续费您将支付18元/月</text>
				</view>
				<view class="renewalDeliver"></view>
				<view class="renewalCard">
					<view class="card card1">
						<view class="cardTitle">连续包月卡</view>
						<view class="cardPrice">
							<text style="font-size: 24rpx;">￥</text>
							<text style="font-size: 42rpx;">15.00</text>
						</view>
						<s class="orignalPrice">
							<view class="orignalPrice">
								<text style="font-size: 17rpx;">￥</text>
								<text style="font-size: 26rpx;">18.00</text>
							</view>
						</s>	
					</view>
					<view class="renewalJT">
						<image src="../../../static/mine/VIPPage/jiantou@2x.png" mode=""></image>
					</view>
					<view class="card card2">
						<view class="cardTitle">月卡</view>
						<view class="cardPrice">
							<text style="font-size: 24rpx;">￥</text>
							<text style="font-size: 42rpx;">18.00</text>
						</view>
						<s class="orignalPrice">
							<view class="orignalPrice">
								<text style="font-size: 17rpx;">￥</text>
								<text style="font-size: 26rpx;">28.00</text>
							</view>
						</s>	
					</view>
				</view>
				<view class="renewalBtngroup">
					<view class="recordBtn leftBtn" @click="confirm">残忍拒绝</view>
					<view class="recordBtn rightBtn" @click="close">我再想想</view>
				</view>
			</view>
		</uni-popup>
		<!-- 确认关闭弹窗 -->
		<uni-popup ref='sureClose' type='center' style="z-index: 10000;" :maskClick='false'>
			<view class="sureBox">
				<view class="sureTitle">
					<text>尊敬的用户</text>
					<text>您已成功取消自动续费功能</text>
				</view>
				<view class="know" @click="closeA">我知道了</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "../../../components/uni-popup/uni-popup.vue"
	import {
		MYINFO
	} from "../../../utils/api.js"
	export default {
		components:{uniPopup},
		data() {
			return {
				infoData: '',
				now: "",
			}
		},
		computed: {
			getDueTime: function() {
				var time = this.infoData.vipEndTime
				var result = String(time).split(" ")[0]
				return result
			}
		},
		onLoad() {
			uni.showToast({
				title: '加载中...',
				icon: 'none',
				mask: true
			})
			// 我的信息
			this.getMyInfo()
			this.getTime()
		},
		methods: {
			// 我的信息
			getMyInfo(){
				const params = {}
				this.$request.url_request(MYINFO, params, "GET", res => {
					this.infoData = JSON.parse(res.data).data
					uni.hideToast()
				}, err => {})
			},
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
			// 关闭续费
			closeRenewal(){
				this.$refs.closeRenewal.open()
			},
			close(){
				this.$refs.closeRenewal.close()
			},
			confirm(){
				this.$refs.closeRenewal.close()
				this.$refs.sureClose.open()
			},
			closeA(){
				this.$refs.sureClose.close()
			}
		}
	}
</script>

<style>
.topHead{
	width: 100%;
	height: 445rpx;
	background-image: url('~@/static/mine/VIPPage/kapianaaa@2x.png');
	background-size: cover;
	padding: 64rpx 76rpx;
}
.topHeadBox{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.headImage{
	width: 110rpx;
	height: 110rpx;
	border-radius: 110rpx;
}
.headImage>image{
	width: 110rpx;
	height: 110rpx;
	border-radius: 110rpx;
}
.userInfo{
	display: flex;
	flex-direction: column;
	margin-left: 25rpx;
}
.userInfoName{
	font-size: 34rpx;
	color: #FFFFFF;
}
.userInfoTime{
	color: #B3B3B3;
	font-size: 24rpx;
	margin-top:15rpx;
	overflow: hidden;
}
.positionBox{
	position: absolute;
	top: 235rpx;
}
.renewalBox{
	width: 690rpx;
	background: #FFFFFF;
	margin: 0 30rpx;
	border-radius:15rpx;
	padding-bottom: 40rpx;
	box-shadow:0px 5px 10px 0px rgba(53,50,51,0.1);
}
.renewalBoxtop{
	width: 100%;
	padding: 30rpx 32rpx;
	background:linear-gradient(-45deg,rgba(207,175,127,1) 0%,rgba(229,198,153,1) 100%);
	border-radius:15rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.renewalBoxtopName{
	font-size: 30rpx;
	color: #423C33;
	font-weight: 600;
}
.renewalBoxtopTime{
	margin-top: 15rpx;
	font-size: 26rpx;
	color: #423C33;
}
.renewalBoxLeft{
	display: flex;
	flex-direction: column;
}
.renewalBoxRight{
	padding: 8rpx 24rpx;
	color: #FFFFFF;
	background:linear-gradient(90deg,rgba(145,120,82,1) 0%,rgba(112,92,63,1) 100%);
	border-radius:50rpx;
}
.renewalInfo{
	margin: 40rpx 33rpx 0 33rpx;
}
.renewalInfoItem{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.infoLeft{
	color: #423C33;
	font-size: 28rpx;
}
.infoRight{
	font-size: 26rpx;
	color: #999999;
}
.magin50{
	margin-top: 50rpx;
}
.tipBox{
	margin: 30rpx;
	font-size: 26rpx;
	color: #999999;
}
.positionDeliver{
	width:100%;
	height:15rpx;
	background:rgba(244,244,244,1);
}
.recommended{
	padding: 40rpx 30rpx;
}
.recTitle{
	font-size: 32rpx;
	color: #333333;
	font-weight: 600;
}
.recImage{
	display: flex;
	justify-content: center;
	margin-top: 30rpx;
}
.recImage>image{
	width: 690rpx;
	height: 260rpx;
}
.closeRnenwal{
	width:508Rpx;
	height:561Rpx;
	background:rgba(255,255,255,1);
	box-shadow:0px 8Rpx 30Rpx 0Rpx rgba(175,210,243,0.2);
	border-radius:15Rpx;
	overflow: hidden;
}
.rnenwalTitle{
	margin-top: 40rpx;
	text-align: center;
	font-size: 30rpx;
	color: #333333;
	display: flex;
	flex-direction: column;
}
.renewalDeliver{
	border-top: 1rpx solid #EAEAEA;
	margin: 40rpx 0 52rpx 0;
}
.renewalCard{
	margin:  0 43rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	position: relative;
}
.card{
	width:164rpx;
	height:217rpx;
	background-size: cover;
	padding: 33rpx 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.card1 {
	background-image: url('~@/static/mine/VIPPage/zhekou-you@2x.png');
}
.card2 {
	background-image: url('~@/static/mine/VIPPage/zhekou-wu@2x.png');
}
.cardTitle{
	font-size: 22rpx;
	color: #333333;
	text-align: center;
}
.cardPrice{
	text-align: center;
	color: #111111;
}
.orignalPrice{
	text-align: center;
	color: #FFFFFF;
}
.renewalJT>image{
	width: 46rpx;
	height: 36rpx;
}
.renewalBtngroup{
	display: flex;
	flex-direction: row;
	position: absolute;
	border-top: 1rpx solid #EAEAEA;
	bottom: 0;
	left: 0;
}
.recordBtn{
	padding: 29rpx 0;
	width: 255rpx;
	text-align: center;
	font-size: 30rpx;
}
.leftBtn{
	color: #111111;
	border-bottom-left-radius: 15rpx;
	border-right: 1rpx solid #EAEAEA;
}
.rightBtn{
	color:rgba(207,175,127,1);
	border-bottom-right-radius: 15rpx;
}
.sureBox{
	width:508rpx;
	height:286rpx;
	background:rgba(255,255,255,1);
	box-shadow:0rpx 8rpx 30rpx 0rpx rgba(175,210,243,0.2);
	border-radius:15rpx;
	overflow: hidden;
}
.sureTitle{
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 30rpx;
	color: #333333;
	margin-top: 63rpx;
}
.know{
	border-top: 1rpx solid #EAEAEA;
	/* height: 87rpx; */
	text-align: center;
	color: #999999;
	padding: 20rpx 0;
	font-size: 30rpx;
	/* line-height: 87rpx; */
	margin-top: 66rpx;
}
	/* 顶部信息 */
	.userTime {
		font-size: 26rpx;
		color: #F3D9AF;
		margin-top: 10rpx;
		max-width: 300rpx;
	}
</style>
