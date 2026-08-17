// 全局状态管理骨架，界面本地配置不经过 vuex，使用 src/utils/localConfig.js 管理
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  // 存储全局变量
  state: {},
  // 类似computed计算属性，用于从store的state中派生出一些状态，例如过滤并计算，目前来说用不到
  getters: {},
  // 专注于同步修改State，官方推荐大写mutations操作
  mutations: {},
  // 专注于业务代码，可以进行异步操作
  actions: {},
});
export default store;
