<template>
	<view v-if="SceneStatus">
		<!-- 以下场景支持自定义回复 -->
		<view class="Scene-reply" >
			<view class="topTitle">
				<text>以下场景支持自定义回复</text>
			</view>
			<!-- 快递场景 -->
			<view class="Courier">
				<view class="CourierLeft">
					<view class="Courier-img"><image src="../../../static/setting/kuaidi@2x.png" mode=""></image></view>
					<view class="Courier-des">
						<text>{{courierData.name}}</text>
						<text>{{courierData.notice}}</text>
					</view>
				</view>
				<view :class="courierSwitch?'arrowIcon1':'arrowIcon'" @click="arrowChange(1)"><text class="cuIcon-unfold"></text></view>
			</view>
			<!-- 快递展开 -->
			<view class="courierOpen" v-if="courierSwitch">
				<view class="courierOpenItem" :class="item.active?'courierOpenItemCheck':'courierOpenItemunCheck'" v-for="(item,index) in takeOutOpenData" :key='index' @click="checkcourier(item)">
					<text>{{item.text}}</text>
					<text v-if="item.activeType == 1" class="cuIcon-write" @click.stop="modify(item)"></text>
				</view>
				<view class="courierOpenAdd" @click="addReply(2)">
					<text class="cuIcon-add"></text>
				</view>
			</view>
			<view class="deliver"></view>
			<!-- 外卖场景 -->
			<view class="Courier">
				<view class="CourierLeft">
					<view class="Courier-img1"><image src="../../../static/setting/waimai@2x.png" mode=""></image></view>
					<view class="Courier-des">
						<text>{{takeoutData.name}}</text>
						<text>{{takeoutData.notice}}</text>
					</view>
				</view>
					<view :class="takeOut?'arrowIcon1':'arrowIcon'" @click="arrowChange(2)"><text class="cuIcon-unfold"></text></view>
			</view>
			<!-- 外卖展开 -->
			<view class="courierOpen" v-if="takeOut">
				<view class="courierOpenItem" :class="item.active?'courierOpenItemCheck':'courierOpenItemunCheck'" v-for="(item,index) in courierOpenData" :key='index' @click="checkcourier(item)">
					<text>{{item.text}}</text>
					<text v-if="item.activeType == 1" class="cuIcon-write" @click.stop="modify(item)"></text>
				</view>
				<view class="courierOpenAdd"  @click="addReply(1)">
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
				<!-- 房 -->
				<view>
					<view class="sceneOpenItem">
						<view class="sceneOpenLeft">
							<view class="sceneOpen-img"><image src="../../../static/setting/maifang@2x.png" mode=""></image></view>
							<view class="sceneOpen-text">
								<text>我不需要买房</text>
							</view>
						</view>
						<evan-switch :size="25" inactive-color='#E5E5E5' v-model="estateType" @change="sceneChange('estateType',estateType)"></evan-switch>
					</view>
					<view class="sceneDliver"></view>
				</view>
				<!-- 保险 -->
				<view>
					<view class="sceneOpenItem">
						<view class="sceneOpenLeft">
							<view class="sceneOpen-img"><image src="../../../static/setting/baoxian@2x.png" mode=""></image></view>
							<view class="sceneOpen-text">
								<text>我不需要买保险</text>
							</view>
						</view>
						<evan-switch :size="25" inactive-color='#E5E5E5' v-model="insureType"  @change="sceneChange('insureType',insureType)"></evan-switch>
					</view>
					<view class="sceneDliver"></view>
				</view>
				<!-- 教育 -->
				<view>
					<view class="sceneOpenItem">
						<view class="sceneOpenLeft">
							<view class="sceneOpen-img"><image src="../../../static/setting/peixun@2x.png" mode=""></image></view>
							<view class="sceneOpen-text">
								<text>我不需要参加教育培训</text>
							</view>
						</view>
						<evan-switch :size="25" inactive-color='#E5E5E5' v-model="educateType" @change="sceneChange('educateType',educateType)"></evan-switch>
					</view>
					<view class="sceneDliver"></view>
				</view>
				<!-- 购物 -->
				<view>
					<view class="sceneOpenItem">
						<view class="sceneOpenLeft">
							<view class="sceneOpen-img"><image src="../../../static/setting/gouwu@2x.png" mode=""></image></view>
							<view class="sceneOpen-text">
								<text>我不需要购物</text>
							</view>
						</view>
						<evan-switch :size="25" inactive-color='#E5E5E5' v-model="shoppingType" @change="sceneChange('shoppingType',shoppingType)"></evan-switch>
					</view>
					<view class="sceneDliver"></view>
				</view>
				<!-- 买车 -->
				<view>
					<view class="sceneOpenItem">
						<view class="sceneOpenLeft">
							<view class="sceneOpen-img"><image src="../../../static/setting/maiche@2x.png" mode=""></image></view>
							<view class="sceneOpen-text">
								<text>我不需要买车</text>
							</view>
						</view>
						<evan-switch :size="25" inactive-color='#E5E5E5' v-model="carType" @change="sceneChange('carType',carType)"></evan-switch>
					</view>
					<view class="sceneDliver"></view>
				</view>
				<!-- 贷款 -->
				<view>
					<view class="sceneOpenItem">
						<view class="sceneOpenLeft">
							<view class="sceneOpen-img"><image src="../../../static/setting/daikuan@2x.png" mode=""></image></view>
							<view class="sceneOpen-text">
								<text>我不需要贷款</text>
							</view>
						</view>
						<evan-switch :size="25" inactive-color='#E5E5E5' v-model="loansType" @change="sceneChange('loansType',loansType)"></evan-switch>
					</view>
					<view class="sceneDliver"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import evanSwitch from '../../../components/evan-switch/evan-switch.vue'
	import {SCENESTATUS,SCENELIST,SCENEREFUSE,SCENEREFUSEUPDATE,SCENEUSERPOST,SCENCESET } from '../../../utils/api.js'
	export default {
		components:{
			evanSwitch
		},
		data() {
			return {
				courierData: '',
				takeoutData: '',
				courierSwitch: false,
				takeOut: false,
				SceneStatus: '',//自定义场景
				courierOpenData:[],
				takeOutOpenData:[],
				SceneRefuse: [],
				carType: '',
				educateType: '',
				estateType: '',
				insureType: '',
				loansType: '',
				shoppingType: ''
			}
		},
		onLoad() {
			uni.showToast({
				title:'加载中...',
				icon:'none'
			})
			// 获取场景列表
			this.getSceneStatus()
			// 获取外卖场景列表回复
			this.getcourierSceneList()
			// 获取快递场景列表回复
			this.getTakeoutSceneList()
			// 查询拒接场景
			this.getSceneRefuse()
		},
		methods: {
			// arrowChange
			arrowChange(num){
				if(num ==1){
					this.courierSwitch = !this.courierSwitch
				} else if (num == 2){
					this.takeOut = !this.takeOut
				}
			},
			// 获取场景列表
			getSceneStatus(){
				const params = {}
				this.$request.url_request(SCENESTATUS,params,'GET',res=>{
					uni.hideToast()
					this.SceneStatus = JSON.parse(res.data).data.data
					this.courierData = this.SceneStatus[0]
					this.takeoutData = this.SceneStatus[1]
				},err=>{})
			},
			// 获取外卖场景列表回复
			getcourierSceneList(){
				const params = {
					sceneType: 1
				}
				this.$request.url_request(SCENELIST,params,'GET',res=>{
					this.courierOpenData = JSON.parse(res.data).data.data.list
				},err=>{})
			},
			// 获取快递场景列表回复
			getTakeoutSceneList(){
				const params = {
					sceneType: 2
				}
				this.$request.url_request(SCENELIST,params,'GET',res=>{
					this.takeOutOpenData = JSON.parse(res.data).data.data.list
				},err=>{})
			},
			// 保存快递回复
			checkcourier(item){
				var that = this
				const params = {
					sceneType: item.sceneType,
					id: item.id,
					activeType: item.activeType
				}
				this.$request.url_request(SCENCESET,params,'GET',res=>{
					that.getTakeoutSceneList()
					that.getcourierSceneList()
				},err=>{})

			},
			// 查询拒接场景
			getSceneRefuse(){
				const params = {}
				this.$request.url_request(SCENEREFUSE,params,'GET',res=>{
					this.SceneRefuse = JSON.parse(res.data).data.data
					this.estateType = this.SceneRefuse.estateType == 1? true:false
					this.insureType = this.SceneRefuse.insureType == 1? true:false
					this.educateType = this.SceneRefuse.educateType == 1? true:false
					this.shoppingType = this.SceneRefuse.shoppingType == 1? true:false
					this.carType = this.SceneRefuse.carType == 1? true:false
					this.loansType = this.SceneRefuse.loansType == 1? true:false
					
				},err=>{})
			},
			// 场景关闭开启
			sceneChange(type,open){
				var that = this
				const params = {
					type: type,
					status: open == true? 1: 0,
					accountId: this.SceneRefuse.accountId
				}
				console.log(params)
				this.$request.url_request(SCENEREFUSEUPDATE,params,'GET',res=>{
					that.getSceneRefuse()
				},err=>{})
			},
			// 回复修改
			modify(item){
				uni.navigateTo({
					url:'../setReply/setReply?data='+JSON.stringify(item) 
				})
			},
			// 添加回复
			addReply(type){
				uni.navigateTo({
					url:'../setReply/setReply?type='+type
				})
			},
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
	align-items: center;
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
.arrowIcon{
	font-size: 32rpx;
	color: #111111;
	transition: all linear .2s;
	-moz-transition:all linear .2s;	
	-webkit-transition:all linear .2s;
	-o-transition:all linear .2s;
}
.arrowIcon1{
	font-size: 32rpx;
	color: #111111;
	transform:rotate(180deg);
	-ms-transform:rotate(180deg); 	/* IE 9 */
	-moz-transform:rotate(180deg); 	/* Firefox */
	-webkit-transform:rotate(180deg); /* Safari 和 Chrome */
	-o-transform:rotate(180deg); 
	transition: all linear .2s;
	-moz-transition:all linear .2s;	
	-webkit-transition:all linear .2s;
	-o-transition:all linear .2s;
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
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
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
