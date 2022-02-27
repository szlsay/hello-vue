/*
 * @Author: your name
 * @Date: 2021-04-06 16:24:11
 * @LastEditTime: 2021-04-07 17:08:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\common\mixin.js
 */
import {debounce} from './utils';
import { BACK_POSITION } from 'common/const'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin= {
  data(){
    return {
      itemImgListener:null,
      newRefresh:null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener);
    console.log("我是混入中的内容")
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop:false
    }
  },
  methods: {
    backTop() {
      this.$$refs.scroll.scrollTo(0, 0, 300)
    },
    listenShowBackTop(position){
      this.isShowBackTop=-position.y >BACK_POSITION
    }
  }
}
