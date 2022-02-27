<!--
 * @Author: your name
 * @Date: 2021-04-02 17:14:21
 * @LastEditTime: 2021-04-03 11:37:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\views\detail\childComps\DetailSwiper.vue
-->
<template>
    <swiper class="detail-swiper">
      <swiper-item v-for="item in topImages" :key="item">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name:"DetailSwiper",
  components:{
    Swiper,
    SwiperItem  
  },
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>
<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>