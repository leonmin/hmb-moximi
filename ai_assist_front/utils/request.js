import commonURL from "utils/commonURL.js"

function jyRequest(url, parm, method, successCallback, errorCallback) {
	var token
	try {
		token = uni.getStorageSync('myToken');

	} catch (e) {
		console.log('获取错误', e)
		//TODO handle the exception
	}
	uni.request({
		url: url,
		dataType: 'text',
		method: method,
		data: parm,
		header: {
			// 'content-type': 'application/json', 
			'content-type': 'application/x-www-form-urlencoded',
			"AI-Chat-Token": token
		},
		success: (res) => {
			if (res.statusCode == 200) {
				var data = JSON.parse(res.data)
				if (data.code == 0 || data.code == 4001001 || data.code < 0) {
					if (data.msg !== null) {
						uni.showToast({
							title: data.msg,
							icon: 'none',
							duration: 1000
						})
					}



				}
				successCallback(res);
			} else {
				uni.showToast({
					title: '网络连接异常',
					icon: 'none',
					duration: 2000
				})
				errorCallback(null);
			}

		},
		fail: (error) => {
			console.log(error);
			errorCallback(error);
		}
	})
}

function jyRequestSimple(url, parm, method, successCallback, errorCallback) {
	var token
	uni.getStorage({
		key: "myToken",
		success: (res) => {
			token = res.data
		}
	})
	uni.request({
		url: url,
		dataType: 'text',
		method: method,
		data: parm,
		header: {
			// 'content-type': 'application/json', 
			'content-type': 'application/x-www-form-urlencoded',
			"AI-Chat-Token": token
		},
		success: (res) => {
			var data = JSON.parse(res.data);
			if (data.status == 200) {
				successCallback(res)
			} else {
				uni.showToast({
					title: data.msg,
					icon: 'none'
				})
				errorCallback(null);
			}
		},
		fail: (error) => {
			errorCallback(error);
		}
	})
}

export default {
	url_request: function(url, param, way, successCallback, errorCallback) {
		return jyRequest(url, param, way, successCallback, errorCallback);
	},
	url_requestSimple: function(url, param, way, successCallback, errorCallback) {
		return jyRequestSimple(url, param, way, successCallback, errorCallback);
	}
}
