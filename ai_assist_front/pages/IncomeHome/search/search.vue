<template>
	<view>
		<!-- 顶部操作条 -->
<!-- 		<view class="cu-bar bg-white">
			<view class="content topBar">
				 搜索
			</view>
		</view> -->
		<view class="cu-bar search" style="margin-top: 10rpx;">
			<view class="search-form searchBar">
				<text class="cuIcon-search"></text>
				<input v-model="key" type="text" placeholder="搜索来电" confirm-type="search" @confirm="search"></input>
			</view>
			<view class="action" >
				<text class="blueStyle" @click="goback">取消</text>
			</view>
		</view>
		<!-- 来电记录 -->
		<view v-if="callData.length>0">
			<view class="cu-bar bg-white solid-bottom ">
				<view class="action"> 来电记录</view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item" v-for="(item,index) in callData" :key="index" @click="getoDetail(item.id)">
					<view class="cu-avatar round large">
						<view style="width: 100rpx;height: 100rpx; border-radius: 100rpx;">
							<image :src="item.avatarUrl" mode="" class="imageHead"></image>
						</view>
						
					</view>
					<view class="content">
						<view class="fontcolor">{{item.callerMobile}}</view>
						<view class="text-gray text-sm flex">
							<text class="text-cut">{{item.contents | formatText}}</text>
						</view>
					</view>
					<view>
						<view class="text-gray text-xs callRecordItem">
							<text>{{item.location}}</text>
							<text>{{item.gmtCreate}}</text>
							<text>通话{{item.voiceTime}}s</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="noDataBox">
			<view class="noData">
				<image src="../../../static/quexing/sousuo@2x.png" mode=""></image>
				<view>
					<text>暂无搜索结果</text>
				</view>
			</view>
		</view>
		<!-- 联系人 -->
		<!-- <view class="contact">
			<view class="cu-bar bg-white solid-bottom ">
				<view class="action"> 联系人</view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item" v-for="(item,index) in callData" :key="index">
					<view class="cu-avatar round large">
						<image :src="item.avatarUrl" mode="" class="imageHead"></image>
					</view>
					<view class="content">
						<view class="fontcolor">{{item.nickName}}</view>
						<view class="text-gray text-sm flex">
							<text class="text-cut">{{item.callerMobile}}</text>
						</view>
					</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import {CALLRECORDLIST} from '../../../utils/api.js'
	import {
		uniSearchBar,
		uniList,
		uniListItem
	} from '../../../components/uni-icons/uni-icons.vue'
	let that;
	export default {
		components: {
			uniSearchBar,
			uniList,
			uniListItem
		},
		beforeCreate() {
			that = this
		},
		filters: {
			formatText:function(value){
				var mainText
				for(let i=0;i<value.length;i++){
					if(value[i].indexOf(that.key) >0){
						mainText = value[i]
					}
				}
				return mainText
			}
		},
		data() {
			return {
				key:"",
				callData:""
			}
		},
		onLoad(obj) {


		},
		methods: {
			// 搜索
			search(){
				const params = {
					searchKey: this.key
				}
				this.$request.url_request(CALLRECORDLIST,params,"GET",res =>{
					console.log(JSON.parse(res.data).data.list)
					this.callData = JSON.parse(res.data).data.list
				},err =>{})
			},
			// 通话详情
			getoDetail(id) {
				uni.navigateTo({
					url:'../callDetails/callDetails?id=' + id
				})
			},
			// 返回上一页
			goback(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style scoped>
	.searchBar {
		border-radius: 15rpx;
	}

	.imageHead {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
	}

	.tel {
		font-size: 40rpx;
	}

	.telTitle {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.duration {
		font-size: 30rpx;
		line-height: 40rpx;
		color: #B9B9B9;
	}

	.duration>text {
		margin-right: 12rpx;
	}

	.itemRight {
		width: 700rpx;
		margin-left: 30rpx;
		overflow: hidden;
	}

	.tip {
		color: #A3A3A3;
		margin-top: 10px;
	}

	.contact {
		background-color: #F3F6F7;
		padding-top: 20rpx;
	}

	.tipTel {
		color: #A3A3A3;
		margin-top: 8rpx;
	}

	.callRecordItem>text {
		margin-right: 10rpx;
	}

	.large {
		width: 100rpx;
		height: 100rpx;
		background-color: transparent;
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
