<template>
	<div class="test-box">
		<div class="test-cardbox">
			<div class="test-card"></div>
			<div class="test-card"></div>
			<div class="test-card"></div>
		</div>
		<a-button class="test-back-btn" @click="goBack">返回</a-button>
	</div>
</template>

<script>
export default {
	name: 'test',
	components: {},
	data() {
		return {};
	},
	created() {},
	mounted() {},
	methods: {
		goBack(){
			this.$router.go(-1);
		}
	}
};
</script>

<style lang="less" scoped="scoped">
	@import '../../assets/less/global.less';
	.test-box{
		width: 100%;
		height: 100%;
		.test-back-btn{
			margin: 20px;
			position: absolute;
			top: 0;
			right: 0;
		}
		.test-cardbox{
			width: 800px;
			height: 500px;
			border: 1px solid red;
			margin: 0 auto;
			position: relative;
			top: 20px;
			.flexbox();
			.flexitem-jb();
			.test-card{
				width: 30%;
				height: 100%;
				border: 1px solid red;
			}
		}
	}
</style>
