<template>
	<view class="outBox">
		<view class="title">设置不成功怎么办？（手动设置教程）</view>
		<view class="deliver"></view>
		<!-- 为什么 -->
		<view class="why">
			<view class="subTitle">1.为什么设置会不成功？</view>
			<view class="content">
				<view class="contenItem">
					<view class="dot"><view></view></view>
					<view class="context">
						首先，您需要确保<text class="tipStyle">注册魔小秘的手机号已开通【呼叫转移】服务；</text>
					</view>
				</view>
				<view class="contenItem">
					<view class="dot"><view></view></view>
					<view class="context">
						其次，如果您已经开通Volte（高清通话）功能，<text class="tipStyle">需要确保【移动数据流量】开关已开启；</text>
					</view>
				</view>
				<view class="contenItem">
					<view class="dot"><view></view></view>
					<view class="context">
						然后，打开<text class="tipStyle">公众号-【设置】界面，重新进行拨号设置；</text>
					</view>
				</view>
				<view class="contenItem">
					<view class="dot"><view></view></view>
					<view class="context">
						最后，如果问题仍未解决，您可以选择<text class="tipStyle">【手动设置】</text>或者<text class="tipStyle">联系客服协助开通！</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 如何 -->
		<view class="how">
			<view class="subTitle">2.如何进行手动设置？</view>
			<view class="tel">您的专属转接号码：<text style="font-weight: 600;font-size: 28rpx;">{{phoneNum}}</text></view>
			<view class="setMethod">iPhone（苹果）用户设置方式</view>
			<view class="imgContent">
				<view imgContentTitle>01.打开【设置】-【电话】</view>
				<view class="imgBox"><image src="../../../static/setting/ios1-0527.png" mode="" style="width:541rpx;height: 960rpx;"></image></view>
			</view>
			<view class="imgContent">
				<view imgContentTitle>02.进入【呼叫转移】</view>
				<view class="imgBox"><image src="../../../static/setting/ios2-0527.png" mode="" style="width:544rpx;height: 967rpx;"></image></view>
			</view>
			<view class="imgContent">
				<view imgContentTitle>03.选择所需的【呼叫转移】场景</view>
				<view class="imgBox"><image src="../../../static/setting/ios3-0527.png" mode="" style="width:592rpx;height: 661rpx;"></image></view>
			</view>
			<view class="imgContent">
				<view imgContentTitle>04.输入【小助理号码】即可</view>
				<view class="tel">您的专属转接号码：<text style="font-weight: 600;font-size: 28rpx;">{{phoneNum}}</text></view>
				<view class="imgBox"><image src="../../../static/setting/ios4-0527.png" mode="" style="width:544rpx;height: 380rpx;"></image></view>
			</view>
			<view class="setMethod mtop">Android（安卓）用户设置方式（以华为EMUI系统为例）</view>
			<view class="imgContent">
				<view imgContentTitle>01.打开【电话】-右上角【设置】</view>
				<view class="imgBox"><image src="../../../static/setting/android1-0517.png" mode="" style="width:600rpx;height: 1300rpx;"></image></view>
			</view>
			<view class="imgContent">
				<view imgContentTitle>02.进入【呼叫转移】</view>
				<view class="imgBox"><image src="../../../static/setting/android2.jpg" mode="" style="width:600rpx;height: 1300rpx;"></image></view>
			</view>
			<view class="imgContent">
				<view imgContentTitle>03.选择所需的【呼入转移场景】</view>
				<view class="imgBox"><image src="../../../static/setting/android3-0527.png" style="width:600rpx;height:408rpx;"></image></view>
			</view>
			<view class="imgContent">
				<view imgContentTitle>04.输入【小助理号码】即可】</view>
				<view class="tel">您的专属转接号码：<text style="font-weight: 600;font-size: 28rpx;">{{phoneNum}}</text></view>
				<view class="imgBox"><image src="../../../static/setting/android4-0527.png" style="width:600rpx;height:448rpx;"></image></view>
			</view>
		</view>
		<!-- 温馨提示 -->
		<view class="tips">
			<view class="subTitle">3.温馨提示</view>
			<view class="contenItem">
				<view class="dot"><view></view></view>
				<view class="context">
					如果以上方法均不成功，请拨打运营商电话，询问是否开通呼叫转移功能，并要求运营商帮忙设置，将呼叫转移至【小助理号码】；
				</view>
			</view>
			<view class="contenItem">
				<view class="dot"><view></view></view>
				<view class="context">
					实在没招了，<text class="tipStyle">打开【魔小秘】公众号-【在线客服】，直接联系客服求助吧！</text>
				</view>
			</view>
			<view class="contenItem">
				<view class="dot"><view></view></view>
				<view class="context">
					请确保手机处于正常使用状态，欠费状态下无法使用该服务；
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { GETNUMINFO } from '../../../utils/api.js'
	export default {
		data() {
			return {
				phoneNum: '',
				myPhone: ''
			}
		},
		onLoad() {
			uni.showToast({
				title: '加载中..',
				icon: 'none',
				mask: false
			})
			// 获取呼叫转接号码
			this.getPhoneNum()
		},
		methods: {
			getPhoneNum(){
				const params = {}
				this.$request.url_request(GETNUMINFO,params,'GET',res=>{
					this.phoneNum = JSON.parse(res.data).data.line
					this.myPhone = JSON.parse(res.data).data.mobile
					uni.hideToast()
				},err =>{})
			},
		}
	}
</script>

<style>
.outBox{
	padding: 40rpx 30rpx;
}
.title{
	font-size: 34rpx;
	color: #111111;
	font-weight: 600;
}
.deliver{
	border-top: 1rpx solid #E9E9E9;
	margin: 40rpx 0;
}
.why{
}
.subTitle{
	font-size: 32rpx;
	color: #111111;
	font-weight: 600;
}
.content{
	margin-top: 10rpx;
}
.contenItem{
	margin-top: 30rpx;
	display: flex;
	flex-direction: row;
}
.dot{
	width: 30rpx;
	height: 30rpx;
	overflow: hidden;
}
.dot>view{
	width: 12rpx;
	height: 12rpx;
	margin-top: 8rpx;
	border-radius: 100rpx;
	background: #111111;
}
.context{
	margin-left: 20rpx;
	color: 666666;
}
.tipStyle{
	color: 666666;
	font-weight: 600;
}
.how{
	margin-top: 40rpx;
}
.tel{
	font-size: 26rpx;
	color: #666666;
	margin: 30rpx 0;
}
.setMethod{
	color: #111111;
	font-size: 30rpx;
	font-weight: 600;
}
.imgContent{
	margin-top: 40rpx;
}
.imgContentTitle{
	font-size: 28rpx;
	color: #212121;
}
.imgBox{
	margin-top: 40rpx;
	display: flex;
	flex-direction: row;
	justify-content: center;
}
.mtop{
	margin: 50rpx 0;
}
.tips{
	margin-top: 50rpx;
}
</style>
