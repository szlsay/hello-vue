<!--
 * @Author: your name
 * @Date: 2021-03-30 16:49:09
 * @LastEditTime: 2021-04-09 10:14:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\components\content\goods\GoodsListItem.vue
-->
<template>
  <!-- <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.show.img" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div> -->
    <div class="goods-item" @click="itemClick">

    <!-- <img :src="showImage" alt="" @load="imageLoad"> -->
    <!--改为图片懒加载模式-->
     <img v-lazy="showImage" alt="" @load="imageLoad">

    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script >
export default {
  name:"GoodsListItem",
  props: {
    goodsItem:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  computed:{
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imageLoad(){
      // console.log('imageLoad');
      // console.log(this.$bus);
      this.$bus.$emit('itemImageLoad')

      //首页，商品详情页的推荐内容都调用了此组件
      //第一种解决办法：通过路由判断
      // if(this.$route.path.indexOf('/home')){
      //   this.$bus.$emit('homeItemImgLoad')
      // }else if(this.$route.path.indexOf('/detail')){
      //   this.$bus.$emit('detailItemImageLoad')
      // }

      //第二种在首页离开的时候，取消全局事件的监听$off()
    },
    itemClick(){
      console.log("跳转到详情页")
      this.$router.push('/detail/'+this.goodsItem.iid);
      // this.$router.push({
      //   path:'/detail',
      //   query:{
      //     id:111
      //   }
      // })
    }
  },
}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
