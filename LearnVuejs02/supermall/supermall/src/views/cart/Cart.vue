<!--
 * @Author: your name
 * @Date: 2021-03-29 16:57:46
 * @LastEditTime: 2021-04-08 14:31:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\views\home\Home.vue
-->
<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <!-- <div slot="center">购物车({{$store.state.cartList.length}})</div> -->
        <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!--商品的列表-->
    <cart-list/>

    <!--底部汇总-->
    <cart-bottom-bar/>


  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList'
import {mapGetters} from 'vuex'
import CartBottomBar from './childComps/CartBottomBar.vue'
  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar,
    },
    computed: {
      // cartLength() {
      //   return this.$store.getters.cartLength
      // }

      //两种语法
      //...mapGetters(['cartLenght'])
      // ...mapGetters({
      //   length:'cartLength'
      // })
      ...mapGetters(['cartLength', 'totalCount'] ),
    }
  }
  
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color:#fff;
  }
</style>
