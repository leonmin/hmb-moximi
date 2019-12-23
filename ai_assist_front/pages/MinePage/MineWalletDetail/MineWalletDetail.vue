<template>
	<view>		
		<!-- 顶部信息 -->
		<view class="topHeader">
			<view class="topHeader-Tips">
				邀请使用
			</view>
			<view class="topHeader-Body">
				-20.00
			</view>
		</view>
		
		<!-- 分割线 -->
		<view class="lineView">
			
		</view>
		
		<!-- 主体信息 -->
		<view class="mainBody-View">
			<view class="mainBody-Header">
				提现账号
			</view>
			<view class="mainBody-Footer">
				132****1234
			</view>
		</view>
		
		<view class="mainBody-View">
			<view class="mainBody-Header">
				提现账号
			</view>
			<view class="mainBody-Footer">
				132****1234
			</view>
		</view>
		
		<view class="mainBody-View">
			<view class="mainBody-Header">
				提现金额
			</view>
			<view class="mainBody-Footer">
				132****1234
			</view>
		</view>
		
		<view class="mainBody-View">
			<view class="mainBody-Header">
				提现状态
			</view>
			<view class="mainBody-Footer">
				132****1234
			</view>
		</view>
		
		<!-- 分割线 -->
		<view class="lineView">
			
		</view>
		
		<view class="mainBody-View">
			<view class="mainBody-Header">
				订单号
			</view>
			<view class="mainBody-Footer">
				132****1234
			</view>
		</view>
		
		<view class="mainBody-View">
			<view class="mainBody-Header">
				订单时间
			</view>
			<view class="mainBody-Footer">
				132****1234
			</view>
		</view>
		
	</view>
</template>

<script>
	import {MYCASHLIST} from '../../../utils/api.js'
	export default {
		data() {
			return {
				inviteList: ''
			}
		},
		onLoad() {
			const params = {
				page: 1
			}
			this.$request.url_request(MYCASHLIST,params,'GET',res =>{
				this.inviteList = JSON.parse(res.data).data
				console.log(this.inviteList)
			},err =>{})
		},
		methods: {
			goback(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
	/* 主体信息 */
	.mainBody-Footer {
		color: #000000;
		font-size: 30rpx;
	}
	.mainBody-Header {
		color: #444444;
		font-size: 28rpx;
	}
	.mainBody-View {
		display: flex;
		flex-direction: row;
		
		justify-content: space-between;
		
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}
	
	/* 分割线 */
	.lineView {
		height: 2rpx;
		background-color: #EDEDED;
		
		margin-right: 30rpx;
		margin-left: 30rpx;
	}
	
	/* 顶部信息 */
	.topHeader-Body {
		font-size: 80rpx;
		color: #000000;
		font-weight: bold;
	}
	.topHeader-Tips {
		font-size: 30rpx;
		color: #000000;
		margin-bottom: 20rpx;
	}
	.topHeader {
		height: 375rpx;
		width: 100%;
		
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
	}

</style>
