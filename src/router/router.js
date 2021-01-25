import Vue from 'vue'
import Router from 'vue-router'

import index from '../view/index.vue'
import test from '../view/test/index.vue'

Vue.use(Router)

const router = new Router({
	linkActiveClass: 'active', // 指定路由选中时的样式类名
	hashbang: true, // 将路径格式化为#!开头
	history: true, // 启用HTML5 history模式，可以使用pushState和replaceState来管理记录
	routes: [
		{
		    path: '/',
		    component: index
		},
		{
		    path: '/test',
		    component: test
		}
	]
})
router.beforeEach((to, from, next) => {
	next()
})
export default router
