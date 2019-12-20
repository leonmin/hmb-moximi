<template>
	<view class="coupons" v-if="couponsData">
		<view class="couponsContain" v-if="couponsData.userCoupon !== null">
			<view class="couponsItem">
				<image src="../../../static/mine/coupons/youhuiquan@2x.png" mode=""></image>
				<view class="itemLeft">
					<text>{{couponTitle}}</text>
					<text>有效期:{{String(couponDetail.beginTime).split(' ')[0]}}至{{String(couponDetail.endTime).split(' ')[0]}}</text>
					<text>适用范围：{{sku}}会员可用</text>
				</view>
				<view class="itemRight">
					<text>{{discountChange}}</text>
					<text>折</text>
				</view>
			</view>
		</view>
		<view  v-if="couponsData.userCoupon === null">
			<view class="noDataBox">
				<view class="noData">
					<image src="../../../static/quexing/youhuiquan@2x.png" mode=""></image>
					<view>
						<text>暂无可用优惠券</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {BEFORODER} from "../../../utils/api.js"
	export default {
		data() {
			return {
				couponsData:"",
				couponTitle:"",
				discount: "",
				couponsSku:"",
				couponDetail: ''
			}
		},
		computed:{
			discountChange:function(){
				var discount =(this.discount)/10
				return discount		
			},
			sku: function(){
				var result = this.couponsData.sku
				if(result == '100001'){
					result = "月卡"
				} else if (result == '100002'){
					result = "季卡"
				} else if (result == '100002') {
					result = "年卡"
				} else {
					result = "通用"
				}
				return result
			}
		},
		onLoad(options) {
			uni.showToast({
				title:"加载中...",
				icon:'none',
				mask:true
			})
			this.couponsSku = options.sku
			this.initData()
		},
		methods: {
			// 初始化数据
			initData(){
				const params = {
					sku:this.couponsSku
				}
				this.$request.url_request(BEFORODER,params,"POST",res=>{
					this.couponsData = JSON.parse(res.data).data
					console.log('优惠券长度',this.couponsData.userCoupon)
					if(this.couponsData.userCoupon !== null){
						this.couponDetail = JSON.parse(res.data).data.userCoupon
						this.couponTitle = this.couponsData.userCoupon.couponTitle
						this.discount = this.couponsData.userCoupon.discount
					}
						uni.hideToast()
				},err=>{})
			}
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
.coupons{
	margin: 0 30rpx;
}
.couponsContain{
	margin-top: 30rpx;
}
.couponsItem{
	position: relative;
	margin: 5rpx 0;
}
.couponsItem>image{
	width: 748rpx;
	height: 228rpx;
}
.itemLeft{
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	position: absolute;
	height: 228rpx;
	width: 479rpx;
	top: 0;
	left: 0;
}
.itemLeft>text:nth-of-type(1){
	color: #D3AB6A;
	font-size: 34rpx;
}
.itemLeft>text:nth-of-type(2){
	color: #FFFFFF;
	font-size: 26rpx;
	margin: 20rpx 0;
}
.itemLeft>text:nth-of-type(3){
	color: #FFFFFF;
	font-size: 22rpx;
}
.itemRight{
	height: 228rpx;
	width: 229rpx;
	position: absolute;
	text-align: center;
	right: 0;
	top: 0;
}
.itemRight>text{
	font-size: 70rpx;
	color: #FFFFFF;
	font-weight: 600;
	line-height: 228rpx;
}
.itemRight>text:nth-of-type(1){
	margin-right: 5rpx;
}
	.noDataBox{
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 430rpx;
	}
	.noData{
		text-align: center;
	}
	.noData>image{
		width: 285rpx;
		height: 166rpx;
	}
	.noData>view>{
		margin-top: 20rpx;
	}
	.noData>view>text{
		color: #CBDCFE;
		font-size: 28rpx;
	}
</style>
