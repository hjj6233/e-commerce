<template>
	<view class="s-page-wrapper is-100vh">
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="is-33vh has-mgt-10">
			<view class="is-flex is-column is-justify-center  is-align-center is-height-100">
				<image src="../../static/img/common/logo.jpg" mode="aspectFit" class="logoimg"></image>
			</view>
		</view>
		<view class="content">
			<view class="has-mglr-10">
				<view class="has-mgtb-10">
					<!-- <input type="number" maxlength="11" v-model="login.phone" placeholder="请输入手机号" class="is-input1 " @input="BindInput" data-val="phone" /> -->
					<wInput v-model="phoneData" type="number" maxlength="11" placeholder="请输入手机号"></wInput>
				</view>
				<view v-if="isCodeLogin" class="has-mgtb-10">
					<wInput v-model="verCode" type="number" maxlength="6" placeholder="请输入验证码" isShowCode ref="runCode" @setCode="sendMsg1()"></wInput>
				</view>
				<view v-else="isCodeLogin" class="has-mgtb-10">
					<!-- <input  type="password" v-model="login.password" placeholder="请输入登录密码" class="is-input1"  @input="BindInput" data-val="password"/> -->
					<wInput v-model="password" type="password" :isShowPass="true" placeholder="请输入登录密码"></wInput>
				</view>
				<view class="loginbtn has-radius has-mgtb-20">
					<button :loading="loading" @tap="defaultHandlerLogin"> {{ loading ? "登录中...":"登 录"}} </button>
				</view>
			</view>
		</view>
		<!-- <view class="has-mgtb-20 content">
			<navigator url="#" class=" has-radius is-right is-grey has-mgr-20" hover-class="">
				<text>忘记密码？</text><text class="is-blue">点击找回</text>
			</navigator>
		</view> -->
		<view class="has-mgtb-20 bottom-wrap is-blue">
			<text class="mr-space" @tap="changeLoginType">{{loginName}}</text> | 
			<text class="mrl-space" @tap="findPassword">忘记密码？</text> | 
			<text class="ml-space" @tap="goRegister">立即注册</text>
		</view>
	</view>
</template>

<script>
	import wInput from '../../components/watch-login/watch-input.vue' //input
	
	export default {
		components: {
			wInput
		},
		onShareAppMessage(res) {
			return {
				title: '购物先领券，一年省一半',
				path: '/pages/index/index'
			}
		},
		data() {
			return {
				isCodeLogin: true,
				loading: false,
				phoneData:"",
				password:"",
				group: "taoPieAndroid",
				verCode: "",
				loginName: "密码登录"
			};
		},
		methods:{
			navBack() {
				uni.navigateBack();
			},
			defaultHandlerLogin(){
				if (this.loading) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length != 11) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '手机号不正确'
					});
					return false;
				}
				if (!this.isCodeLogin && this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '密码不能低于六位'
					});
					return false;
				}
				// if (this.isCodeLogin && this.verCode != this.getVerCode) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		position: 'bottom',
				// 		title: '验证码不正确'
				// 	});
				// 	return false;
				// }
				var url,params;
				this.loading = true;
				// setTimeout((e=>{
				// 	this.login.loading = false;
				// }),1500);
				// console.log(JSON.stringify(this.login));
				if(this.isCodeLogin) {
					url = "/api/tao-pie/v1/site/mobile-login"
					params = {
						mobile: this.phoneData,
						group: this.group,
						code: this.verCode
					}
				} else {
					url = "/api/tao-pie/v1/site/login"
					params = {
						mobile: this.phoneData,
						group: this.group,
						password: this.password
					}
				}
				this.$Request.postP(url,params).then(res => {
					if (res.message === 'OK') {
						uni.showModal({
							showCancel: false,
							title: '登录成功',
							content: '获取用户信息成果',
						});
						// uni.navigateTo({
						// 	url: '/pages/member/user'
						// });
					} else {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res.message
						});
						this.$queue.logout();
					}
					this.loading = false;
				}).catch(err => {
					uni.showModal({
						showCancel: false,
						title: '登录失败',
						content: err.message,
					});
					this.loading = false;
				});
			},
			changeLoginType(){
				this.isCodeLogin = !this.isCodeLogin
				if(this.isCodeLogin) {
					this.loginName = '密码登录'
				} else {
					this.loginName = '验证码登录'
				}
			},
			goRegister(){
				uni.navigateTo({
					url: '/pages/member/register'
				});
			},
			sendMsg1() {
				const {
					phoneData
				} = this;
				if (!phoneData) {
					this.$queue.showToast("请输入手机号");
				} else if (phoneData.length !== 11) {
					this.$queue.showToast("请输入正确的手机号");
				} else {
					uni.showLoading({
						title: "正在发送验证码..."
					});
					this.$Request.postP('/api/tao-pie/v1/site/sms-code', {
						mobile: phoneData,
						usage: 'login'
					})
					.then(res => {
						if (res.message === 'OK') {
							uni.hideLoading();
							if (res.data) {
								this.getVerCode = res.data
							}
							this.$queue.showToast('验证码发送成功请注意查收');
							this.$refs.runCode.$emit('runCode');
						} else {
							uni.hideLoading();
							uni.showModal({
								showCancel: false,
								title: '短信发送失败',
								content: res.message ? res.message : '请一分钟后再获取验证码',
							});
						}
					});
				}
			},
			findPassword() {
				
			}
			// BindInput:function(e){
			// 	var dataval = e.currentTarget.dataset.val;
			// 	this.login[dataval] = e.detail.value;
			// }
		}
	}
</script>

<style>
	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}
	.back-btn {
		position: absolute;
		left: 20px;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 20px;
		font-size: 20px;
		opacity: 0.8;
		color: $font-color-dark;
	}
	.content {
		width: 85%;
		margin: 0 auto;
	}
	.loginbtn button {
		margin-top: 20rpx;
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		color: #ffffff;
		font-size: 32rpx;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		margin: 0;
		font-family: inherit;
		background: #f35;
		opacity: 0.8;
	}
	button:after {
		border: 2rpx solid #f2f2f2;
	}
	.logoimg {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		top: 40px;
	}
	.is-input1 {
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		padding: 12rpx;
		color: #353535;
		font-size: 32rpx;
		box-sizing: border-box;
		appearance: none;
		border: 2rpx solid #e5e5e5;
		box-shadow: none;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		padding-left: 30rpx;
		margin: 0;
		font-family: inherit;
		background: #fff;
		resize: none;
	}
	.bottom-wrap {
		text-align: center;
		/* background: #f0f6ff;
		padding: 20rpx 0; */
	}
	.mr-space {
		margin-right: 20rpx;
	}
	.ml-space {
		margin-left: 20rpx;
	}
	.mrl-space {
		margin: 20rpx;
	}
</style>
