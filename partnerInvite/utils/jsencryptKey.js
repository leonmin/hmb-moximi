import Vue from 'vue'
import JsEncrypt from 'jsencrypt'

Vue.prototype.$encruption = function(obj){
	let encrypt = new JSEncrypt()
	encrypt.setPublicKey(
	'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCzhuy0c70yLooCcg1oV8s/FdniStnpeHZfJr7LECTRBw9Str0W7RJ1cMBbbQtBfcsBQ/rQxGVulC3Quj53zqQSiHJvVISnWaRd3Ebv9hFYpeGRg4xgZbOB4M1zTq0i0rk7U65s+enTTHIY+QQRnbObYjlk1abRcGJnHgQG4T6vJQIDAQAB'
	)
	return encrypt.encrypt(obj)
}