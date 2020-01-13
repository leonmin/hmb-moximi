<template>
	<view>
		<view v-if="listData">
			<view class="costomReplay  radius bg-white addressBook" @click="gotoEditorialOpen">
				<view class="cu-list menu">
					<view class="cu-item arrow">
						<view class="content">
							<image src="../../static/tongxunlu@2x.png" mode="" style="width: 80rpx;height: 80rpx;margin-top: 20rpx;"></image>
							<text class="fontcolor">通讯录-专属开场白</text>
						</view>
					</view>
				</view>
			</view>
			<view class="customContain" v-if="listData.length > 0">
				<view class="columnDisplay contactBox">
					<view class="userList">
						<view class="userListItem" v-for="(item,index) in listData.slice(0,8)" :key="index" @click="userDetail(item.phone,item.avatarUrl)">
							<view>
								<image class="addressHead" :src="item.avatarUrl" mode=""></image>
							</view>
							<text class="bookName">{{formateName(item.name)}}</text>
						</view>
					</view>
				</view>
				<view class="imageDiaplay">
				</view>
			</view>
			<!-- 无数据时 -->
			<view class="customContain" v-if="listData.length <= 0">
				<view class="columnDisplay contactBox">
				<view class="noData">
					<image src="../../static/quexing/laidain@2x.png" mode=""></image>
					<view>
					<text>暂无数据</text>
					</view>
				</view>
				</view>
			</view>
			<view class="imageDisplay">
				<view class="imgView">
					<image src="../../static/tu@2x.png" mode=""></image>
				</view>
				<view class="imgView">
					<image src="../../static/chengshi@2x.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {CONTACTLIST,CONTACTDETAIL} from "../../utils/api.js"
	export default {
		data() {
			return {
				listData: ''
			}
		},
		onShow() {
			// 通讯录列表
			this.getAddressBook()
		},
		onLoad() {
			// 通讯录列表
			// this.getAddressBook()
			uni.showToast({
				title:'加载中...',
				icon:'none',
				mask:true
			})
		},
		onPullDownRefresh() {
			this.getAddressBook()
		},
		methods: {
			formateName(value) {
				var result;
				if(value.length>3){
					result = value.substring(0,3)+ '...'
				} else {
					result = value
				}
				return result
			},
			// 通讯录详情
			userDetail(tel,head) {
				const detail = JSON.stringify({mobile:tel,head:head})
				uni.navigateTo({
					url: 'ContactDetail/ContactDetail?detail='+detail
				})
			},
			getAddressBook() {
				const params = {}
				this.$request.url_request(CONTACTLIST,params,"GET",res =>{
					this.listData = JSON.parse(res.data).data
					uni.hideToast()
					uni.stopPullDownRefresh()
				},err =>{})
			},
			gotoEditorialOpen() {
				uni.navigateTo({
					url:"AddressBook/AddressBook"
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F1F4F6;
	}

	.addressBook {
		margin-top: 10rpx;
		box-shadow: 2rpx -5rpx 15rpx #F3F6F7;
	}

	.customContain {
		padding: 20rpx 30rpx;
	}

	.contactBox {
		border-radius: 20rpx;
		background: #FFFFFF;
		box-shadow: 1rpx 1rpx 20rpx rgba(0, 0, 0, 0.1);
	}

	.userList {
		padding: 20rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.userListItem {
		width: 160rpx;
		text-align: center;
		margin: 5rpx 0;
	}
	.bookName{
		font-size: 28rpx;
	}
/* 	.userListItem>view>image {
		width: 110rpx;
		height: 110rpx;
		border-radius: 110rpx;
	} */
	.addressHead{
		width: 108rpx;
		height: 108rpx;
		border-radius: 110rpx;
	}
	.userListItem>text {
		font-size: 28rpx;
		display: inline-block;
	}

	.imageDiaplay {
		border-radius: 20rpx;
		box-shadow: 1rpx 1rpx 20rpx rgba(0, 0, 0, 0.1);
	}

	.imageDisplay {
		font-size: 0;
		padding: 0;
	}

	.imgView {
		width: 730rpx;
		height: 295rpx;
		margin: auto;
	}

	.imgView>image {
		width: 730rpx;
		height: 295rpx;
	}
	.noData{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 30rpx 0;
		/* margin-top: 450rpx; */
	}
	.noData>image{
		width: 142rpx;
		height: 83rpx;
	}
	.noData>view{
		text-align: center;
		margin-top: 10rpx;
	}
	.noData>view>text{
		font-size: 28rpx;
		color: #CBDCFE;
	}
</style>
