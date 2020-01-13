<template>
	<view>
		<view class="noData">
			<image src="../../../static/quexing/wushuju@2x.png" mode=""></image>
			<view>
			<text class="tip">当前账号暂未开通合伙人权限，如有需求请通过公众号联系客服。</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.noData{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 450rpx;
		left: 180rpx;
		/* margin-top: 450rpx; */
	}
	.noData>image{
		width: 285rpx;
		height: 166rpx;
	}
	.noData>view{
		text-align: center;
		margin-top: 30rpx;
	}
	.noData>view>text{
		font-size: 28rpx;
		color: #CBDCFE;
	}
	.tip{
		display: inline-block;
		margin-top: 20rpx;
		max-width: 410rpx;
	}
</style>
