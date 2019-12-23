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
			
			
			
			
			
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList:[],
				adviceText: '',
				evaluationData:[{
					uncheck: '../../../static/haveAWord/henbuman@2x.png',
					checked: '../../../static/haveAWord/henbuman1@2x.png',
					text: '很不满'
				},
				{
					uncheck: '../../../static/haveAWord/buman@2x.png',
					checked: '../../../static/haveAWord/buman1@2x.png',
					text: '不满'
				},
				{
					uncheck: '../../../static/haveAWord/yiban@2x.png',
					checked: '../../../static/haveAWord/yiban1@2x.png',
					text: '一般'
				},
				{
					uncheck: '../../../static/haveAWord/manyi@2x.png',
					checked: '../../../static/haveAWord/manyi1@2x.png',
					text: '满意'
				},
				{
					uncheck: '../../../static/haveAWord/henmanyi1@2x.png',
					checked: '../../../static/haveAWord/henmanyi@2x.png',
					text: '很满意'
				}]
			}
		},
		onLoad() {
			this.initData()
		},
		methods: {
			ChooseImage() {
				uni.chooseImage({
					count:4,
					sizeType:['original','compressed'],
					sourceType:['album','camera '],
					success: (res) => {
						console.log(res)
						if(this.imgList.length !== 0){
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else{
							this.imgList = res.tempFilePaths
							console.log(this.imgList)
						}	
					}
				})
			},
			ViewImage(e) {
				uni.previewImage({
					urls:this.imgList,
					current:e.currentTarget.dataset.url
				})
			},
			DelImg(e) {
				console.log('delete',e)
				uni.showModal({
					title:'提示',
					content: '确认移除这张图片?',
					cancelText:'再等等',
					confirmText:'确认',
					success: (res) => {
						if(res.confirm){
							this.imgList.splice(e.currentTarget.dataset.index,1)
						}
					}
				});
			},
		
			
			initData(){
				for(let i =0;i<this.evaluationData.length;i++){
					this.evaluationData[i].isClick = false
					this.evaluationData[this.evaluationData.length-1].isClick = true
				}
			},
			choose(index){
				for(let i =0;i<this.evaluationData.length;i++){
					if(index == i){
						this.evaluationData[index].isClick = !this.evaluationData[index].isClick
					} else{
						this.evaluationData[i].isClick = false
					}
				}
				this.$forceUpdate()
			},
			upLoad(){
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
				            filePath: tempFilePaths[0],
				            name: 'file',
				            formData: {
				                'user': 'test'
				            },
				            success: (uploadFileRes) => {
				                console.log(uploadFileRes.data);
				            }
				        });
				    }
				});
			}
		}
	}
</script>

<style>
.word{
	margin: 0 30rpx;
}
.headText{
	margin: 30rpx 0;
	font-size: 30rpx;
	color: #111111;
}
.evaluation{
	border: 1rpx solid #EEEEEE;
	padding: 40rpx 50rpx;
	border-radius: 20rpx;
	margin-bottom: 20rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.discribe{
	border: 1rpx solid #EEEEEE;
	border-radius: 20rpx;
	padding: 20rpx 20rpx;
}
textarea{
	width: 100%;
	/* border: 1rpx solid #F0AD4E; */
}
.discribeText{
	float: right;
	display: inline-block;
	margin-top: 10rpx;
	font-size: 24rpx;
	color: #222222;
	margin-right: 40rpx;
}
.tip{
	color: #666666;
	font-size: 26rpx;
	margin-left: 20rpx;
}
.evaluationItem{
	/* border: 1rpx solid #F0AD4E; */
	text-align: center;
}
.evaluationItem>image{
	width: 60rpx;
	height: 60rpx;
}
.evaluationItem>item>text{
	font-size: 26rpx;
	color: #111111;
}
.uploadImg{
	margin-top: 20rpx;
}
</style>
