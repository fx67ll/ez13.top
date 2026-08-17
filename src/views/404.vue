<template>
	<div class="fx67ll-404">
		<nav class="shelf">
			<a class="book home-page" href="https://fx67ll.com" target="_blank">个人主页</a>
			<a class="book contact" href="https://fx67ll.xyz/s/messageboard" target="_blank">联系管理员</a>
			<a class="book about-us" href="https://fx67ll.xyz" target="_blank">技术博客</a>
			<a class="book faq" href="" @click="back()">返回上一页</a>
			<span class="book not-found"></span>
			<span class="door left"></span>
			<span class="door right"></span>
		</nav>
		<h1>404</h1>
		<p>糟糕，当前网页不存在，如有需要请留言咨询~</p>
		<fx67ll-footer fontColor="#ffffff" :zIndex="99999"></fx67ll-footer>
	</div>
</template>

<script>
import moment from 'moment';
export default {
	name: 'model404',
	data() {
		return {
		};
	},
	methods: {
		back() {
			if (window.history.length <= 1) {
				this.$router.push({ path: '/' });
				return false;
			} else {
				this.$router.go(-1);
			}
		}
	}
};
</script>

<style lang="less" scoped="scoped">
@import '@a/styles/404.less';

// 页脚组件在深色场景下的定位微调
/deep/ .fx67ll-footer {
	position: absolute;
	bottom: 0;
	font-size: 14px;
}
</style>
