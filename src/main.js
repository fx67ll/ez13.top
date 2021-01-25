import Vue from 'vue'
import App from './App.vue'

import less from 'less'
import VueRouter from 'vue-router'
import router from './router/router.js'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false

Vue.use(less)
Vue.use(VueRouter)
Vue.use(Antd)

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
