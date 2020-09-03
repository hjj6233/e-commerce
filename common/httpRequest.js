import configdata from './config'
import cache from './cache'

module.exports = {
	config: function(name) {
		var info = null;
		if (name) {
			var name2 = name.split("."); //字符分割
			if (name2.length > 1) {
				info = configdata[name2[0]][name2[1]] || null;
			} else {
				info = configdata[name] || null;
			}
			if (info == null) {
				let web_config = cache.get("web_config");
				if (web_config) {
					if (name2.length > 1) {
						info = web_config[name2[0]][name2[1]] || null;
					} else {
						info = web_config[name] || null;
					}
				}
			}
		}
		return info;
	},
	getP: function(url, data, header) {
		url = this.config("APIHOST2") + url;
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "GET",
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					error.call(self, e)
				}
			})
		})
	},
	postP: function(url, data, header) {
		header = header || "application/json";
		var header2 = 'application/x-www-form-urlencoded'
		var header3 = 'multipart/form-data'
		url = this.config("APIHOST2") + url;
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				requestType: "form",
				method: "POST",
				header: {
					"content-type": header
				},
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					error.call(self, e)
				}
			})
		})
	},
	postForm: function(url, data, header) {
		url = this.config("APIHOST2") + url;
		return new Promise((succ, error) => {
			uni.uploadFile({
				url: url,
				filePath: 'http://192.168.254.195/pages/member/register',
				name: 'file',
				formData: data,
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					error.call(self, e)
				}
		});
		})
	},
	post: function(url, data, header) {
		header = header || "application/x-www-form-urlencoded";
		url = this.config("APIHOST") + url;
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "POST",
				header: {
					"content-type": header
				},
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					error.call(self, e)
				}
			})
		})
	},
	postT: function(url, data, header) {
		header = header || "application/x-www-form-urlencoded";
		url = this.config("APIHOST1") + url;
		let token = uni.getStorageSync("token");
		if (token) {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "POST",
					header: {
						"content-type": header,
						"token": token
					},
					success: function(result) {
						console.error(result);
						succ.call(self, result.data)
					},
					fail: function(e) {
						error.call(self, e)
					}
				})
			})
		} else {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "POST",
					header: {
						"content-type": header,
					},
					success: function(result) {
						succ.call(self, result.data)
					},
					fail: function(e) {
						error.call(self, e)
					}
				})
			})
		}
	},

	postJson: function(url, data, header) {
		header = header || "application/json";
		url = this.config("APIHOST1") + url;
		let token = uni.getStorageSync("token");
		if (token) {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "POST",
					header: {
						"content-type": header,
						"token": token
					},
					success: function(result) {
						console.error(result);
						succ.call(self, result.data)
					},
					fail: function(e) {
						error.call(self, e)
					}
				})
			})
		} else {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "POST",
					header: {
						"content-type": header,
					},
					success: function(result) {
						succ.call(self, result.data)
					},
					fail: function(e) {
						error.call(self, e)
					}
				})
			})
		}
	},
	getT: function(url, data, header) {
		header = header || "application/x-www-form-urlencoded";
		url = this.config("APIHOST1") + url;
		let token = uni.getStorageSync("token");
		if (token) {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "GET",
					header: {
						"content-type": header,
						"token": token
					},
					success: function(result) {
						succ.call(self, result.data)
					},
					fail: function(e) {
						error.call(self, e)
					}
				})
			})
		} else {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "GET",
					header: {
						"content-type": header
					},
					success: function(result) {
						succ.call(self, result.data)
					},
					fail: function(e) {
						error.call(self, e)
					}
				})
			})
		}

	},
	posts: function(url, data, header) {
		header = header || "application/x-www-form-urlencoded";
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "POST",
				header: {
					"content-type": header
				},
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					error.call(self, e)
				}
			})
		})
	},
	postF: function(url, data, header) {
		header = header || "application/json";
		url = this.config("APIHOST") + url;
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "POST",
				header: {
					"content-type": header
				},
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					error.call(self, e)
				}
			})
		})
	},
	postFs: function(url, data, header) {
		header = header || "application/json";
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "POST",
				header: {
					"content-type": header
				},
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					error.call(self, e)
				}
			})
		})
	},
	get: function(url, data, header) {
		header = header || "application/x-www-form-urlencoded";
		url = this.config("APIHOST") + url;
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "GET",
				header: {
					"content-type": header
				},
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					error.call(self, e)
				}
			})
		})
	},
	getJd: function(url, data, header) {
		header = header || "application/x-www-form-urlencoded";
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "GET",
				header: {
					"content-type": header
				},
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					error.call(self, e)
				}
			})
		})
	},
	get1: function(url, data, header) {
		header = header || "application/json";
		url = this.config("APIHOST") + url;
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "GET",
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					error.call(self, e)
				}
			})
		})
	}
}
