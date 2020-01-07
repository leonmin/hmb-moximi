<template>
	<view>
		<web-view v-if="settingUrl.length != 0" :webview-styles="webviewStyles" :src="settingUrl"></web-view>
	</view>
</template>

<script>
	// import VConsole from '../../utils/vconsole.min.js'
	// let vConsole = new VConsole()
	import { SETTINGURL } from '../../utils/api.js'
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#1c75ff'
					}
				},
			settingUrl: ""
			}
		},
		onLoad() {
			uni.showToast({
				title:'加载中...',
				icon:"none",
				mask:true
			})
			this.getUrl();
			setTimeout(() =>{this.changeWidth()},500)
		},
		methods: {
			changeWidth(){
				document.getElementsByTagName('iframe')[0].classList.add('myIframe')
			},
			getUrl(){	
				const params = {}
				this.$request.url_request(SETTINGURL,params,'POST',res=> {
					 this.settingUrl =JSON.parse(res.data).data.url
					console.log('get url -> ',this.settingUrl)
					uni.hideToast()
				}, err => {})
			}
		}
		
	}
</script>

<style>
page{
	background-color: #FFFFFF;
}
</style>
