<template>
  <div id="app">
	  <router-view></router-view>
	  <!-- <Index></Index> -->
  </div>
</template>

<script>
// import Index from './view/index.vue'

export default {
  name: 'app',
  // components: {
  //   Index
  // }
}
</script>

<style>
html,body{
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
}
#app {
	width: 100%;
	height: 100%;
}
</style>
