<template>
	<view>
		<view class="addressBook" v-if="list">
			<!-- 搜索联系人 -->
<!-- 			<view class="cu-bar search">
				<view class="search-form searchBar">
					<text class="cuIcon-search"></text>
					<input type="text" v-model="searchInput" placeholder="请输入手机号" confirm-type="search" @confirm="search"></input>
				</view>
			</view> -->
			<!-- 添加联系人 -->
			<view class="addContact" @click="addContact">
				<image src="../../../static/addressBook/tianjia-@2x.png" mode=""></image>
				<text>添加联系人</text>
			</view>
			<!-- 分割线 -->
			<view class="divider"></view>
			<!-- 通讯录列表 -->
			<view>
				<scroll-view scroll-y class="indexes" :scroll-into-view="listCurID" style="height:80vh" scroll-with-animation="true" enable-back-to-top="true">
					<block v-for="(item,index) in list" :key="index"  v-if="item.data.length > 0">
						<!-- 横向item -->
						<view :id="item.letter" class="padding letterStyle" data-index="item">{{item.letter}}</view>
						<view class="cu-list menu-avatar no-padding" v-for="(item1,index1) in item.data" :key="index1" @click="contactDetail(item1.phone,item1.avatarUrl)">
							<view class="cu-item displayItem">
								<view class="cu-avatar round lg">
									<image :src="item1.avatarUrl" mode="" style="width: 100rpx;height: 100rpx; border-radius: 100rpx;"></image>
								</view>
								<view class="content">
									<view class="text-grey">{{item1.name}}</view>
									<view class="text-gray text-sm">
										暂无通话
									</view>
								</view>
							</view>
						</view>
					</block>
				</scroll-view>
				<!-- 纵向列表 -->
				<view class="indexBar" >
					<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove="tMove">
						<view v-if="item.data.length !==0" class="indexBar-item" v-for="(item,index) in list" @touchstart="getCur(index)" @touchend="setCur(index)" >{{item.letter}}</view>
					</view>
				</view>
				<!--选择显示-->
				<view class="indexToast" v-show="hidden">
					{{listCur}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {CONTACTLIST,CONTACTDETAIL} from "../../../utils/api.js"
	export default {
		data() {
			return {
				list:[],
				dataList:[],
				listCur: [],
				boxTop: "",
				barTop: "",
				hidden: false,
				offsettop: "",
				barHeight: "",
				listCurID: "A",
				searchInput: '',
				listData: ''
			}
		},
		onShow() {
			// this.initData()
			uni.showToast({
				title:'加载中...',
				icon:'none',
				mask:true
			})
			// 通讯录列表
			this.getAddressBook()
		},
		onLoad() {
			// this.initData()
			// 通讯录列表
			// this.getAddressBook()
		},
		onPullDownRefresh() {
		},
		methods: {
			// 初始化数据
			initData() {
				// for (let i = 0; i < 26; i++) {
				// 	this.list[i] = String.fromCharCode(65 + i)
				// }
				// this.listCur = this.list[0]
				var initList = []
				for (let i =0;i<26;i++) {
					this.list.push({letter:String.fromCharCode(65 + i),data:[]})
				}
			},
			// 通讯录列表
			getAddressBook(){
				const params = {}
				var upperCase;
				this.list = []
				this.initData()
				this.$request.url_request(CONTACTLIST,params,"GET",res =>{
					uni.stopPullDownRefresh()
					 this.listData = JSON.parse(res.data).data
					for(let i=0;i<this.listData.length;i++){
						upperCase = this.listData[i].pinyin.substring(0,1).toUpperCase()
						for(let j=0;j<=25;j++){
							if(upperCase == this.list[j].letter){
								this.list[j].data.push(this.listData[i])
							}
						}
					}
						uni.hideToast()
				},err =>{})
			},
			// 搜索
			search(){
				console.log(this.searchInput)
				console.log(this.listData)
			},
			// 获取文字信息
			getCur(e) {
				this.hidden = true
				this.listCur = this.list[e].letter
				this.listCurID = this.list[e].letter
			},
			setCur(e) {
				this.hidden = false
				this.listCur = this.list[e].letter
			},
			// 滑动选择item
			tMove(e) {
				this.hidden = true
				console.log(e.detail.id)
			},
			// 触发全部开始选择
			tStart() {
				this.hidden = true
			},
			//触发结束选择
			tEnd() {
			    this.hidden = false,
			    this.listCurID = this.listCur
			},
			// 添加联系人
			addContact() {
				uni.navigateTo({
					url: "../AddContact/AddContact"
				})
			},
			// 通讯录详情
			contactDetail(tel,head) {
				const detail = JSON.stringify({mobile:tel,head:head})
				uni.navigateTo({
					url: "../ContactDetail/ContactDetail?detail="+detail
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
	.search {
		margin-top: 15rpx 0;
		background: #FFFFFF;
	}

	.searchBar {
		border-radius: 15rpx;
	}
	.displayItem{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	/* 添加联系人 */
	.addContact {
		background-color: #FFFFFF;
		padding: 30rpx 30rpx 0 30rpx;
		display: flex;
		align-items: center;
	}

	.addContact image {
		width: 80rpx;
		height: 80rpx;
	}

	.addContact text {
		color: #111111;
		font-size: 32rpx;
		margin-top: -10rpx;
		margin-left: 10rpx;
	}
	.letterStyle{
		color: #1C75FF;
		font-size: 32rpx;
	}
	/* 分割线 */
	.divider {
		border-top: 1rpx solid #F0F0F0;
		margin: 40rpx 30rpx;
	}
</style>
