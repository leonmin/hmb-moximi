<template>
	<view>
		<!-- 顶部提示 -->
		<view class="topHeader">
			<text> 以下类型来电，魔小秘将会进行主动挂断，不会接听但仍会记录并通知您</text>
		</view>
		<!-- 拒接黑名单 -->
		<view class="blacklistBox">
			<view class="blacklist-title"><text>拒接黑名单</text></view>
			<view class="blacklist-contain">
				<!-- 诈骗电话 -->
				<view class="blacklist-contain-item">
					<view class="blacklist-contain-left">
						<view class="blacklist-left-img"><image src="../../../static/setting/zhapian@2x.png" mode=""></image></view>
						<view class="blacklist-left-text"><text>诈骗电话</text></view>
					</view>
					<evan-switch :size="25" inactive-color='#E5E5E5' v-model="zhapian"></evan-switch>
				</view>
				<view class="deliver"></view>
				<!-- 钉钉电话会议 -->
				<view class="blacklist-contain-item">
					<view class="blacklist-contain-left">
						<view class="blacklist-left-img"><image src="../../../static/setting/dingding@2x.png" mode=""></image></view>
						<view class="blacklist-left-text"><text>钉钉电话会议</text></view>
					</view>
					<evan-switch :size="25" inactive-color='#E5E5E5' v-model="dingding"></evan-switch>
				</view>
			</view>
		</view>
		<!-- 分割线 -->
		<view class="fenge"></view>
		<!-- 黑名单列表 -->
		<view class="blackList">
			<view class="blackListTitle">
				<text>拒接号码</text>
				<view style="font-size: 26rpx; color: #1C75FF;" @click="addBlack">
					<text class="cuIcon-add" style="font-weight: 600;"></text>
					<text>添加号码</text>
				</view>
			</view>
			<!-- 列表 -->
			<view class="listBox">
				<!-- 无数据 -->
				<view class="noDataBox" v-if="listData.length ==0">
					<view class="noData">
						<image src="../../../static/quexing/wushujku@2x.png" mode=""></image>
						<view>
							<text>暂无数据</text>
						</view>
					</view>
				</view>
				<view v-for="(item,index) in listData" :key='index'>
					<view class="listItem">
						<view class="listItemLeft">
							<view class="listItemImg"><image :src="item.avatarUrl" mode=""></image></view>
							<view class="listItemName">
								<view class="mobileDetail">
									<text v-if="item.name !== ''">{{item.name}}</text>
									<text>{{item.mobile}}</text>
								</view>
							</view>
						</view>
						<view @click="deleteBlack(item)"><text class="cuIcon-delete laji"></text></view>
					</view>
					<view class="listDeliver"><view></view></view>
				</view>
			</view>
		</view>
		<!-- 删除黑名单弹框 -->
		<uni-popup ref="deleteBlack" type="center" style="z-index: 10000;">
			<view class="deleteBlackBox">
				<view class="deleteBlack-title"><text>是否取消拒接来电</text></view>
				<view class="deleteBlack-btn">
					<view class="deleteBlack-cacel" @click="deleteBlackCacel">取消</view>
					<view class="deleteBlack-sure" @click="deleteBlackSure">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import evanSwitch from '../../../components/evan-switch/evan-switch.vue'
	import uniPopup from "../../../components/uni-popup/uni-popup.vue"
	import {BLACKLIST,BLACKADD,BLACKDELETE} from '../../../utils/api.js'
	export default {
		components:{evanSwitch,uniPopup},
		data() {
			return {
				zhapian: false,
				dingding: false,
				pageSize: 0,
				pageNum: 10,
				deleteMobile: '',
				listData:[]
			}
		},
		onLoad() {
			//获取黑名单列表
			this.getBlackList()
		},
		methods: {
			//获取黑名单列表
			getBlackList(){
				const params ={
					pageSize: this.pageSize,
					pageNum: this.pageNum,
				}
				this.$request.url_request(BLACKLIST,params,'GET',res=>{
					this.listData = JSON.parse(res.data).data.data.list
				},err=>{})
			},
			// 取消删除黑名单
			deleteBlackCacel(){
				this.$refs.deleteBlack.close()
			},
			// 删除黑名单
			deleteBlack(item){
				this.$refs.deleteBlack.open()
				this.deleteMobile = item.mobile
			},
			// 确认删除黑名单
			deleteBlackSure(){
				var that = this
				const params = {
					mobile: this.deleteMobile
				}
				this.$request.url_request(BLACKDELETE,params,'GET',res=>{
					console.log(JSON.parse(res.data).data.code)
					if(JSON.parse(res.data).data.code == 200){
						that.$refs.deleteBlack.close()
						that.getBlackList()
					} else{
						uni.showToast({
							title:JSON.parse(res.data).data.resultMsg,
							icon:'none',
							duration:1200
						})
					}
				},err=>{})
			},
			// 添加黑名单
			addBlack(){
				uni.navigateTo({
					url:'../addBlack/addBlack'
				})
			}
		}
	}
</script>

<style>
page{
	background-color: #FFFFFF;
}
.topHeader{
	background: #F3F6F7;
	padding: 30rpx;
	font-size: 26rpx;
	color: #333333;
}
.blacklistBox{
	padding: 50rpx 30rpx;
}
.blacklist-title{
	font-size: 30rpx;
	color: #333333;
}
.blacklist-contain{
	margin-top: 40rpx;
}
.blacklist-contain-item{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.blacklist-contain-left{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.blacklist-left-img{
	width: 65rpx;
	height: 65rpx;
}
.blacklist-left-img>image{
	width: 65rpx;
	height: 65rpx;
}
.blacklist-left-text{
	font-size: 30rpx;
	color: #111111;
	margin-left: 20rpx;
}
.deliver{
	width: 100%;
	border-top: 1rpx solid #EEEEEE;
	margin: 40rpx 0;
}
.fenge{
	width:100%;
	height:20rpx;
	background:rgba(243,246,247,1);
}
.blackList{
	padding: 50rpx 30rpx;
}
.blackListTitle{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	font-size: 30rpx;
	color: #333333;
}
.listBox{
	margin-top: 40rpx;
	/* border: 1rpx solid #F0AD4E; */
}
.listItem{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.listItemLeft{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.listItemImg{
	width: 100rpx;
	height: 100rpx;
	border-radius: 100rpx;
}
.listItemImg>image{
	width: 100rpx;
	height: 100rpx;
	border-radius: 100rpx;
}
.listItemName{
	display: flex;
	flex-direction: column;
	margin-left: 20rpx;
	align-items: center;
}
.mobileDetail{
	height: 100rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.mobileDetail>text:nth-of-type(1){
	font-size: 32rpx;
	color: #111111;
}
.mobileDetail>text:nth-of-type(2){
	font-size: 24rpx;
	color: #999999;
	margin-top: 10rpx;
}
.laji{
	color: #999999;
	font-size: 46rpx;
}
.listDeliver{
	display: flex;
	justify-content: flex-end;
}
.listDeliver>view{
	border-top: 1rpx solid #E9E9E9;
	width: 570rpx;
	margin: 30rpx 0;
}
/* 删除黑名单 */
.deleteBlackBox{
	width:626rpx;
	background:rgba(255,255,255,1);
	border-radius:20rpx;
	padding: 97rpx 30rpx 70rpx 58rpx;
	overflow: hidden;
}
.deleteBlack-title{
	font-size: 34rpx;
	color: #111111;
	text-align: center;
}
.deleteBlack-btn{
	margin-top: 86rpx;
	font-size: 30rpx;
	text-align: center;
	display: flex;
	flex-direction: row;
	justify-content: center;
	color: #FFFFFF;
}
.deleteBlack-cacel,.deleteBlack-sure{
	padding: 14rpx 75rpx;
	border-radius: 100rpx;
}
.deleteBlack-cacel{
	border:1px solid #D7D7D7;
	color: #333333;
}
.deleteBlack-sure{
	color: #FFFFFF;
	background:linear-gradient(-90deg,rgba(28,117,255,1),rgba(87,153,255,1));
	margin-left: 68rpx;
}
	.noDataBox {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 100rpx;
	}

	.noData {
		text-align: center;
	}

	.noData>image {
		width: 265rpx;
		height: 204rpx;
	}

	.noData>view> {
		margin-top: 20rpx;
	}

	.noData>view>text {
		color: #CBDCFE;
		font-size: 28rpx;
	}
</style>
