<template>
	<view>
		<!-- 以下场景支持自定义回复 -->
		<view class="Scene-reply">
			<view class="topTitle">
				<text>以下场景支持自定义回复</text>
			</view>
			<!-- 快递场景 -->
			<view class="Courier">
				<view class="CourierLeft">
					<view class="Courier-img"><image src="../../../static/setting/kuaidi@2x.png" mode=""></image></view>
					<view class="Courier-des">
						<text>快递场景</text>
						<text>接到快递电话，小秘将回复勾选内容</text>
					</view>
				</view>
					<evan-switch :size="25" inactive-color='#E5E5E5' v-model="courierSwitch"></evan-switch>	
			</view>
			<!-- 快递展开 -->
			<view class="courierOpen" v-if="courierSwitch">
				<view class="courierOpenItem" :class="courierOpenIndex == index?'courierOpenItemCheck':'courierOpenItemunCheck'" v-for="(item,index) in courierOpenData" :key='index'>
					<text>{{item.text}}</text>
				</view>
				<view class="courierOpenAdd">
					<text class="cuIcon-add"></text>
				</view>
			</view>
			<view class="deliver"></view>
			<!-- 外卖场景 -->
			<view class="Courier">
				<view class="CourierLeft">
					<view class="Courier-img1"><image src="../../../static/setting/waimai@2x.png" mode=""></image></view>
					<view class="Courier-des">
						<text>外卖场景</text>
						<text>接到外卖电话，小秘将回复勾选内容</text>
					</view>
				</view>
					<evan-switch :size="25" inactive-color='#E5E5E5' v-model="takeOut"></evan-switch>	
			</view>
			<!-- 外卖展开 -->
			<view class="courierOpen" v-if="takeOut">
				<view class="courierOpenItem" :class="takeOutIndex == index?'courierOpenItemCheck':'courierOpenItemunCheck'" v-for="(item,index) in courierOpenData" :key='index'>
					<text>{{item.text}}</text>
				</view>
				<view class="courierOpenAdd">
					<text class="cuIcon-add"></text>
				</view>
			</view>
		</view>
		<!-- 分割 -->
		<view class="pagedeliver"></view>
		<!-- 场景开启 -->
		<view class="sceneOpens">
			<view class="topTitle">
				<text>以下场景开启后，小秘将统一回复“不需要”</text>
			</view>
			<view class="sceneOpenContain">
				<view v-for="(item,index) in sceneOpenData" :key='index'>
					<view class="sceneOpenItem">
						<view class="sceneOpenLeft">
							<view class="sceneOpen-img"><image :src="item.img" mode=""></image></view>
							<view class="sceneOpen-text">
								<text>{{item.name}}</text>
							</view>
						</view>
						<evan-switch :size="25" inactive-color='#E5E5E5' v-model="item.isCheck"></evan-switch>
					</view>
					<view class="sceneDliver"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import evanSwitch from '../../../components/evan-switch/evan-switch.vue'
	export default {
		components:{
			evanSwitch
		},
		data() {
			return {
				courierSwitch: false,
				takeOut: false,
				courierOpenData:[
					{text: '你好，能否麻烦你把快递放在附近的快递点或者自提柜。谢谢'},
					{text: '麻烦直接放在我家门口吧，谢谢'},
					{text: '麻烦放在公司前台或者是门房吧，谢谢'}
				],
				takeOutData:[
					{text: '我现在在忙，能否麻烦你把外卖放到保安那边呢我会去拿的'},
					{text: '麻烦直接放在我家门口吧，谢谢'},
					{text: '麻烦放在公司前台或者是门房吧，谢谢'}
				],
				courierOpenIndex: 0,
				takeOutIndex: 0,
				sceneOpenData:[
					{name: '我不需要买房',isCheck: false,img:'../../../static/setting/maifang@2x.png'},
					{name: '我不需要买保险',isCheck: false,img:'../../../static/setting/baoxian@2x.png'},
					{name: '我不需要参加教育培训',isCheck: false,img:'../../../static/setting/peixun@2x.png'},
					{name: '我不需要购物',isCheck: false,img:'../../../static/setting/gouwu@2x.png'},
					{name: '我不需要买车',isCheck: false,img:'../../../static/setting/maiche@2x.png'},
					{name: '我不需要贷款',isCheck: false,img:'../../../static/setting/daikuan@2x.png'}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
page{
	background: #FFFFFF;
}
/* 头部布局 */
.Scene-reply{
	padding: 50rpx 30rpx;
}
.topTitle{
	font-size: 30rpx;
	color: #111111;
}
.Courier{
	margin-top: 40rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.CourierLeft{
	display: flex;
	flex-direction: row;
}
.Courier-img{
	width: 60rpx;
	height: 60rpx;
}
.Courier-img>image{
	width: 68rpx;
	height: 60rpx;
}
.Courier-img1{
	width: 68rpx;
	height: 60rpx;
}
.Courier-img1>image{
	width: 68rpx;
	height: 60rpx;
}
.Courier-des{
	margin-left: 15rpx;
	font-size: 32rpx;
	color: #111111;
	display: flex;
	flex-direction: column;
}
.Courier-des>text:nth-of-type(2){
	color: #666666;
	font-size: 26rpx;
	margin-top: 20rpx;
}
.deliver{
	height: 1rpx;
	background-color: #E9E9E9;
	width: 100%;
	margin: 40rpx 0;
}
.courierOpen{
	margin-top: 25rpx;
}
.courierOpenItem{
	width:100%;
	border-radius:20rpx;
	font-size: 28rpx;
	color: #222222;
	padding: 30rpx 47rpx;
	margin: 20rpx 0;
}
.courierOpenItemCheck{
	border:3rpx solid #1C75FF;
}
.courierOpenItemunCheck{
	border:2rpx solid rgba(224,224,224,1);
}
.courierOpenAdd{
	width:100%;
	padding: 20rpx 0;
	font-weight: 600;
	font-size: 60rpx;
	color: #E2E4E7;
	text-align: center;
	background:rgba(247,249,251,1);
	border-radius:20rpx;
}
.pagedeliver{
	width:100%;
	height:15px;
	background:rgba(247,247,247,1);
}
.sceneOpens{
	/* border: 1rpx solid #F0AD4E; */
	padding: 50rpx 30rpx;
}
.sceneOpenContain{
	margin-top: 37rpx;
}
.sceneOpenItem{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.sceneOpenLeft{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.sceneOpen-img{
/* 	width: 65rpx;
	height: 65rpx; */
}
.sceneOpen-img>image{
	width: 65rpx;
	height: 65rpx;
}
.sceneOpen-text{
	font-size: 28rpx;
	color: #111111;
	margin-left: 20rpx;
}
.sceneDliver{
	width:100%;
	border-top: 1rpx solid #EEEEEE;
	margin: 40rpx 0;
}
</style>
