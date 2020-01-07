<template>
	<view class="word">
		<view class="headText">
			<text>你对魔小秘的整体感受</text>
		</view>
		<view class="evaluation">
			<view class="evaluationItem" v-for="(item,index) in evaluationData" :key="index" @click="choose(index)">
				<image :src="item.isClick?item.checked:item.uncheck" mode=""></image>
				<view>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<view class="headText">
			<text>详细描述</text>
		</view>
		<view class="discribe clear">
			<textarea maxlength="200" v-model="adviceText" name="" id="" cols="30" rows="10" placeholder='写下您的建议，我们一起调教TA'></textarea>
			<text class="discribeText">{{adviceText.length}}/200</text>
		</view>
		<view class="headText">
			<text>上传凭证</text>
			<text class="tip">(最多4张)</text>

			<view class="grid col-4 grid-square flex-sub uploadImg">
				<view class="bg-img" v-for="(item,index) in imgList" :key='index' @click.stop="ViewImage" :data-url='item'>
					<image :src="item" mode='aspectFill'></image>
					<view class="cu-tag bg-red" @click.stop="DelImg" :data-index="index">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="solids" @click.stop="ChooseImage" v-if="imgList.length<4">
					<text class="cuIcon-cameraadd"></text>
				</view>
			</view>
		</view>
		<!-- 提交按钮 -->
		<view class="submitBtn">
			<button @click="feedback">写完啦</button>
		</view>
	</view>
</template>

<script>
	var token
	import {
		UPLOADFILE,
		FEEDBACK
	} from '../../../utils/api.js'
	// import VConsole from '../../../utils/vconsole.min.js'
	// var vconsole = new VConsole()
	export default {
		data() {
			return {
				imgList: [],
				adviceText: '',
				satisfaction:5, //满意度
				newList: '',
				evaluationData: [{
						uncheck: '../../../static/haveAWord/henbuman@2x.png',
						checked: '../../../static/haveAWord/henbuman1@2x.png',
						satisfaction:1,
						text: '很不满'
					},
					{
						uncheck: '../../../static/haveAWord/buman@2x.png',
						checked: '../../../static/haveAWord/buman1@2x.png',
						satisfaction:2,
						text: '不满'
					},
					{
						uncheck: '../../../static/haveAWord/yiban@2x.png',
						checked: '../../../static/haveAWord/yiban1@2x.png',
						satisfaction:3,
						text: '一般'
					},
					{
						uncheck: '../../../static/haveAWord/manyi@2x.png',
						checked: '../../../static/haveAWord/manyi1@2x.png',
						satisfaction:4,
						text: '满意'
					},
					{
						uncheck: '../../../static/haveAWord/henmanyi1@2x.png',
						checked: '../../../static/haveAWord/henmanyi@2x.png',
						satisfaction:5,
						text: '很满意'
					}
				]
			}
		},
		onLoad() {
			this.initData()
			token = uni.getStorageSync('myToken')
		},
		methods: {
			// 用户反馈
			feedback(){
				const params = {
					satisfaction: this.satisfaction,
					content: this.adviceText,
					attachArray: this.imgList,
					attach: this.imgList.join(",")
				}
				console.log(params)
				this.$request.url_requestSimple(FEEDBACK,params,'POST',res =>{
					uni.showToast({
						title:'反馈成功！',
						icon:'success',
						duration:1200
					})
					setTimeout(() =>{
						uni.reLaunch({
							url:'../MinePage'
						})
					},1200)
				},err =>{})
				
			},
			ChooseImage() {
				var _this = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera '],
					success: (res) => {
							// 上传图片
							uni.uploadFile({
								url: UPLOADFILE,
								filePath: res.tempFilePaths[0],
								header: {
									"AI-Chat-Token": token
								},
								name: 'file',
								success: (uploadFileRes) => {
									_this.imgList.push((JSON.parse(uploadFileRes.data).data))
									console.log(_this.newList)
									// _this.imgList = _this.imgList.concat(res.tempFilePaths)
								},
								fail: (size) => {
									// console.log(size)
									uni.showModal({
										content: '图片上传失败，请重试！',
										showCancel: false
									});
								}
							})
							console.log('imglist有数据是', this.imgList)
					}
				})
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				})
			},
			DelImg(e) {
				console.log('delete', e)
				uni.showModal({
					title: '提示',
					content: '确认移除这张图片?',
					cancelText: '再等等',
					confirmText: '确认',
					success: (res) => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				});
			},
			initData() {
				for (let i = 0; i < this.evaluationData.length; i++) {
					this.evaluationData[i].isClick = false
					this.evaluationData[this.evaluationData.length - 1].isClick = true
				}
			},
			choose(index) {
				this.satisfaction = this.evaluationData[index].satisfaction
				for (let i = 0; i < this.evaluationData.length; i++) {
					if (index == i) {
						this.evaluationData[index].isClick = !this.evaluationData[index].isClick
					} else {
						this.evaluationData[i].isClick = false
					}
				}
				this.$forceUpdate()
			},
		}
	}
</script>

<style>
	.word {
		margin: 0 30rpx;
	}

	.headText {
		margin: 30rpx 0;
		font-size: 30rpx;
		color: #111111;
	}

	.evaluation {
		border: 1rpx solid #EEEEEE;
		padding: 40rpx 50rpx;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.discribe {
		border: 1rpx solid #EEEEEE;
		border-radius: 20rpx;
		padding: 20rpx 20rpx;
	}

	textarea {
		width: 100%;
		/* border: 1rpx solid #F0AD4E; */
	}

	.discribeText {
		float: right;
		display: inline-block;
		margin-top: 10rpx;
		font-size: 24rpx;
		color: #222222;
		margin-right: 40rpx;
	}

	.tip {
		color: #666666;
		font-size: 26rpx;
		margin-left: 20rpx;
	}

	.evaluationItem {
		/* border: 1rpx solid #F0AD4E; */
		text-align: center;
	}

	.evaluationItem>image {
		width: 60rpx;
		height: 60rpx;
	}

	.evaluationItem>item>text {
		font-size: 26rpx;
		color: #111111;
	}

	.uploadImg {
		margin-top: 20rpx;
	}
	button::after{border: none;}
	.submitBtn>button{
		/* margin-top: 10rpx; */
		color: #FFFFFF;
		font-size: 30rpx;
		padding: 8rpx 0;
		border-radius: 100rpx;
		box-shadow: 0 2rpx 2rpx #1C75FF;
		background-color: #1C75FF; /* 不支持线性的时候显示 */
		background-image: linear-gradient(to right, #5799FF , #1C75FF);
		background-image: -moz-linear-gradient(to right, #5799FF , #1C75FF);
		background-image: -webkit-linear-gradient(to right, #5799FF , #1C75FF);
		}
</style>
