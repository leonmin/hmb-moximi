<template>
	<view class="addContact">
		<!-- 添加昵称 -->
		<form @submit="addContact">
			<view class="addName">
				<image src="../../../static/addressBook/touxiang@2x.png" mode=""></image>
				<input type="text" placeholder="请输入昵称" name='nickName' v-model="name">
			</view>
			<!-- 分割线 -->
			<view class="divider"></view>
			<!-- 手机号 -->
			<view class="addTel">
				<view>
					<text>手机</text>
					<input v-model="mobile" name='mobile' type="text" value="" placeholder="请输入手机号码" />
				</view>
			<!-- 	<text class="inputRight">(选填)</text> -->
			</view>
			<view class="divider"></view>
			<!-- 添加按钮 -->
			<view class="btn-group addButton">
				<button formType="submit" class="cu-btn bg-blue shadow-blur round addBtn" :disabled="isdisable">完成</button>
			</view>
		</form>

		<!-- 添加成功弹窗 -->
		<view class="cu-modal show" v-show="addShow">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">添加成功</view>
				</view>
			</view>
		</view>
		<mpopup ref="mpopup" :isdistance="true"></mpopup>
	</view>
</template>

<script>
	import WxValidate from '../../../utils/WxValidate.js';
	import mpopup from "../../../components/xuan-popup/xuan-popup.vue"
	import {
		ADDCONTACT
	} from "../../../utils/api.js"
	export default {
		components: {
			mpopup
		},
		data() {
			return {
				name: "",
				mobile: "",
				addShow: "",
				isdisable: false

			}
		},
		onLoad(options) {
			this.mobile = options.mobile
			this.initValidate();
		},
		methods: {
			// 规则校验
			initValidate() {
				// 规则
				const rules = {
					nickName: {
						required: true
					},
					mobile: {
						required: true,
						tel:true
					}
				}
				// 提示
				const messages = {
					nickName: {
						required: "请输入昵称！"
					},
					mobile: {
						required: "请输入手机号"
					}
				}
				this.WxValidate = new WxValidate(rules, messages)
			},
			// 添加联系人列表
			addContact(e) {
				this.isdisable = true
				var _this =this
				setTimeout(function(){
					_this.isdisable = false
					_this.$forceUpdate()
				},1000)
				const params = e.detail.value
					if (!this.WxValidate.checkForm(params)) {
						const error = this.WxValidate.errorList[0]
						// 可以自定义提示
						uni.showToast({
							title: `${error.msg}`,
							icon: 'none'
						});
						return false
					} else {	
						const params = {
								name: this.name,
								mobile: this.mobile
							}
							this.$request.url_request(ADDCONTACT, params, "GET", res => {
								
								console.log(JSON.parse(res.data).code)
								if(JSON.parse(res.data).code == 10000530){
									uni.showToast({
										title:JSON.parse(res.data).msg,
										icon:"none",
										duration:1000
									})
								}else{
										uni.showToast({
									title: "添加成功!",
									icon: "success",
									mask: true,
									duration: 1000
								})
								
								setTimeout(function() {
									uni.hideToast()
									uni.navigateBack({
										
									})
								}, 1000)
								}
								
							
							}, err => {})
						
					}
				}
	}
 }
</script>

<style>
	.addContact {
		margin: 0 30rpx;
	}

	.addName {
		margin-top: 40rpx;
		display: flex;
		align-items: center;
	}

	.addName image {
		width: 100rpx;
		height: 100rpx;
	}

	.addName input {
		margin-left: 20rpx;
		padding: 10rpx 20rpx;
		height: 78rpx;
	}

	.divider {
		border: 1rpx solid #F0F0F0;
		margin: 40rpx 0;
	}

	.addTel {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.addTel view text {
		font-size: 32rpx;
		color: #444444;
	}

	.addTel view {
		display: flex;
		align-items: center;
	}

	.addTel view input {
		margin-left: 20rpx;
		padding: 10rpx 20rpx;
		height: 78rpx;
	}

	.inputRight {
		font-size: 26rpx;
		color: #999999;
	}

	.addButton {
		font-size: 30rpx;
		margin-top: 690rpx;
	}
	.addButton>button{
		background: linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -ms-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -webkit-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
		background: -moz-linear-gradient(left, #1c75ff 0%, #1c75ff 10%, #5799ff 80%, #5799ff 100%);
	}
	.addBtn {
		width: 100%;
		padding: 40rpx 0;
	}
</style>
