<!--
 * @Author: your name
 * @Date: 2021-04-08 09:20:37
 * @LastEditTime: 2021-04-08 09:40:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\views\category\Category.vue
-->

<template>
  <div>
    <h2>分类</h2>
    <!--监听组件的监听事件,需要在点击事件加个native修饰符-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import {backTopMixin} from "common/mixin"
  export default {
    name:"Category",
    mixins:[backTopMixin]
  }
</script>

<style scoped>
</style>
