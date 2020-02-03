<template>
	<view>
		<view class="topHead">
				<text>设置失败</text>		
		</view>
		<view class="content">
			<view class="item">
				<view class="titleBold"><text>是否开启了VoLTE功能？</text></view>
				<view class="contentItem">
					<text>若一键拨打不成功，大部分是因为三大运营商开通了Volte业务，电信会提示尚未开通此项业务（或者提示出现连接问题或MMI码无效），联通移动会拨号失败.</text>
				</view>
				<view class="contentItemMethod">
					<text>目前对于已开通VoLTE（高清通话）的用户，如需使用，请先退订VoLTE</text>
					<text>联通：编辑短信TDVOLTE，发送至10010；</text>
					<text>电信：编辑短信QXVOLTE，发送至10001；</text>
					<text>移动：编辑短信QXVOLTE，发送至10086；</text>
				</view>
				<view class="contentItem">
					<text>退订成功后，等待10分钟后，再进入魔小秘“接听配置”页面，点击对应的场景开启，重新设置即可</text>
				</view>
			</view>
			<view class="item">
				<view class="titleBold"><text>是否开启呼叫转移功能？？</text></view>
				<view class="contentItem">
					<text>呼叫转移是三大运营商提供的一种服务功能，使用时会产生资费，具体服务费用由运营商收取，收费标准按照手机套餐语音价格收取（一般是0.1元/分钟）。魔小秘的本质是通过设置呼叫转移功能，将特定来电交由AI助理来代接。</text>
					<view><text>所以需要开启魔小秘，必须先开启呼叫转移功能，具体可联系联通 10010、电信 10000、移动 10086的客服热线，让客服直接开通（此功能免费）。</text></view>
				</view>
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
	page{
		background-color: #FFFFFF;
	}
.topHead{
	width: 750rpx;
	height: 117rpx;
	background-size: cover;
	background-image: url(~@/static/helpCenter/bj-1@2x.png);
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 30rpx;
	font-size: 36rpx;
	font-weight: 600;
	color: #FFFFFF;
}
.content{
	padding: 10rpx 30rpx;
}
.item{
	margin: 40rpx 0;
}
.point{
	width: 10rpx;
	height: 10rpx;
	background-color: #222222;
	border-radius: 100rpx;
	margin-top: 10rpx;
	margin-right: 10rpx;
}
.itemText{
	max-width: 680rpx;
	}
	.titleBold{
		font-size: 30rpx;
		font-weight: 600;
	}
	.contentItem{
		margin-top: 20rpx;
	}
	.contentItemMethod{
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
	}
	.contentItemMethod>text{
		margin: 8rpx 0;
	}
</style>
