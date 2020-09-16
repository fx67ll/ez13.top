<template>
	<div class="index-box"><a-button class="index-test-btn" @click="goTest">ez13</a-button></div>
</template>

<script>
import _ from 'underscore';
import moment from 'moment';
import $ from 'jquery';
export default {
	name: 'ez13',
	components: {},
	data() {
		return {};
	},
	created() {},
	mounted() {},
	methods: {
		goTest() {
			this.$router.push({ path: '/test' });
		}
	}
};
</script>

<style lang="less" scoped="scoped">
	@import '../assets/less/global.less';
	.index-box {
		width: 100%;
		height: 100%;
	}
	.index-test-btn {
		margin: 20px;
		float: right;
	}
</style>
