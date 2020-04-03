<template>
	<view class="coupons" v-if="couponsData">
		<view class="couponsContain">
			<view class="couponsItem" v-for="(item,index) in couponsData" :key='index' @click="getCoupon(item.couponTitle,item.id)">
				<image src="../../../static/mine/coupons/youhuiquan@2x.png" mode=""></image>
				<view class="itemLeft">
					<text>{{item.couponTitle}}</text>
					<text>有效期:{{String(item.beginTime).split(' ')[0]}}至{{String(item.endTime).split(' ')[0]}}</text>
					<text>适用范围：{{item.sku |formateSku}}会员可用</text>
				</view>
				<view class="itemRight">
					<text>{{item.discount/10}}</text>
					<text>折</text>
				</view>
			</view>
		</view>
		<view  v-if="couponsData.length == 0">
			<view class="noDataBox">
				<view class="noData">
					<image src="../../../static/quexing/wuquan@2x.png" mode=""></image>
					<view>
						<text>暂无可用优惠券</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {BEFORODER,COUPONLIST} from "../../../utils/api.js"
	export default {
		data() {
			return {
				couponsData:"",
				couponTitle:"",
				discount: "",
				couponsSku:"",
				couponDetail: '',
				page: ''
			}
		},
		filters:{
			formateSku: function(value){
				var result
				if(value == '100001'){
					result = "月卡"
				} else if (value == '100002'){
					result = "季卡"
				} else if (value == '100003') {
					result = "年卡"
				} else if(value == '0') {
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
			this.transferData = JSON.parse(options.data)
			console.log(this.transferData)
			this.page = this.transferData.page
			this.couponsSku = this.transferData.sku
			this.initData()
		},
		methods: {
			// 初始化数据
			initData(){
				const params = {
					sku: this.couponsSku
				}
				this.$request.url_request(COUPONLIST,params,'GET',res =>{
					this.couponsData = JSON.parse(res.data).data
					console.log('优惠券列表',this.couponsData)
					uni.hideToast()
				},err =>{})
			},
			// 选择优惠券
			getCoupon(title,id){
				console.log('标题',title)
				console.log('id',id)
				var data = {
					title: title,
					id: id,
					sku: this.couponsSku,
					item:this.transferData.item
				}
				if(this.page == 1){
					uni.navigateTo({
						url:"../../Welcome/Welcome?data="+ JSON.stringify(data)
					})
				} else{
					uni.navigateTo({
						url:'../MineVipPage/MineVipPage?data='+ JSON.stringify(data)
					})
				}
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
		width: 265rpx;
		height: 204rpx;
	}
	.noData>view>{
		margin-top: 20rpx;
	}
	.noData>view>text{
		color: #CBDCFE;
		font-size: 28rpx;
	}
</style>
