<!--
 * @Author: your name
 * @Date: 2021-03-30 16:47:39
 * @LastEditTime: 2021-04-06 17:05:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\components\content\goods\GoodsList.vue
-->
<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :goods-item="item" :key="index">

    </goods-list-item>
  </div>
</template>

<script >
import GoodsListItem from './GoodsListItem'

export default {
  components: { GoodsListItem },
  name:"GoodsList",
  comments: {
    GoodsListItem
  },
  props:{
    goods: {
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>
