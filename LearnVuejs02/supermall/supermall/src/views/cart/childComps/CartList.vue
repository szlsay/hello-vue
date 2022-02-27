<!--
 * @Author: your name
 * @Date: 2021-04-08 13:10:31
 * @LastEditTime: 2021-04-08 14:35:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\views\cart\childComps\CartList.vue
-->
<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :item-info="item"
      >
      </cart-list-item>
    </scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem";
export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated () {
    this.$refs.scroll.refresh()
  }
};
</script>
<style scoped>
.cart-list {
  height: 100vh;
}
.content {
  height: calc(100%-44px);
  overflow: hidden;
  margin-top: 44px;
  height: calc(100% - 183px);
}
</style>