<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar />
  </div>
</template>
<script>
import MainTabBar from './components/content/mainTabbar/MainTabBar.vue';
export default {
  components: { MainTabBar },
  name: "app",

  data() {
    return {};
  },

  mounted() {},
  methods: {},
};
</script>
<style>
@import "assets/css/base.css";
</style>