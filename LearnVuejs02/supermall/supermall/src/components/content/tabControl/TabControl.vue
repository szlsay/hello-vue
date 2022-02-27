<!--
 * @Author: your name
 * @Date: 2021-03-30 14:07:59
 * @LastEditTime: 2021-03-30 21:39:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\components\content\mainTabbar\tabControl\TabControl.vue
-->
<template>
  <div class="tab-control">
    <div class="tab-control-item"  v-for="(item,index) in titles" :key="item"
      :class="{active:index===currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script >
export default {
  name:"TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      currentIndex:0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex=index;
      this.$emit('tabClick',index);
    }
  },
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span {
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>

