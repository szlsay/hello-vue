<!--
 * @Author: your name
 * @Date: 2021-04-02 15:07:32
 * @LastEditTime: 2021-04-09 08:55:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\views\detail\Detail.vue
-->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">

      <!-- <ul>
        <li v-for="item in $store.state.cartList" :key="item.title">
          {{item}}
        </li>
      </ul> -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <!-- <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/> -->
      <detail-goods-info
        :detail-info="detailInfo"
        @detailImageLoad="detailImageLoad"
      />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />


    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
     <!--监听组件的监听事件,需要在点击事件加个native修饰符-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

    <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from './childComps/DetailBottomBar'
// import BackTop from 'components/content/backTop/BackTop'

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import Scroll from "components/common/scroll/Scroll.vue";
import GoodsList from "components/content/goods/GoodsList";
// import Toast from 'components/common/toast/Toast'
import { debounce } from "common/utils";
import { itemListenerMixin,backTopMixin } from "common/mixin";

// import {BACK_POSITION} from 'common/const'


export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast,
    // BackTop
     },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      // itemImgListener:null
      themeTopYs: [0, 1000, 2000, 3000],
      getThemeTopY:null,
      currentIndex:0,
      // isShowBackTop:false
      message:'',
      show:false
    };
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;

    //2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      //1.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //2.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      //3.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //4.获取参数信息
      this.itemParams = data.itemParams;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      /*
      //1.第一次获取，值不对
      //值不对的原因:this.$refs.params.$el压根没有渲染
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);

      this.$nextTick(() => {
        //2.第二次获取：值不对
        //值不对的原因：图片没有计算在内
        //根据最新的数据，对应的DOM已经渲染处理
        //但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片）
        //offsetTop值不对的时候，都是因为图片的问题

        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
      });
      */
    });

    //3.请求推荐数据
    getRecommend().then((res) => {
      console.log("===推荐数据===");
      console.log(res);
      this.recommends = res.data.list;
    });


    //4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作防抖)
    this.getThemeTopY=debounce(()=>{
      this.themeTopYs=[];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs)
    },100)
  },
  mounted() {
    // let newRefresh=debounce(this.$refs.scroll.refresh,100);
    // this.itemImgListener=()=>{
    //   newRefresh()
    // }
    // this.$bus.$on('itemImgLoad',this.itemImgListener)
    //下面的代码写在这里不对
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
    // console.log(this.themeTopYs)
  },
  updated() {
    //除了在updated里写，还可以用$nextTick()
    // this.themeTopYs=[];
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs)
  },
  destroyed() {
    console.log("destroyed");
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },

  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    },

    detailImageLoad() {
      //混入mixin
      this.newRefresh();
      //等待图片加载完成获取
      this.getThemeTopY();
    



      // this.themeTopYs=[];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs)
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position){
      // console.log("====position====");
      // console.log(position)
      //1.获取y值
      const positionY=-position.y;

      //2.positionY和主题中的值进行对比
      //[0,7938,9120,9452]

      // positionY 在 0 和 7938 之间，index=0
      // positionY 在 =7938 和 9120 之间，index=1
      // positionY 在 =9120 和 9452 之间，index=2

      // positionY 超过 =9452 值，index=3



      // for(let i in this.themeTopYs){
      //   console.log(i);//这里的i是个字符串类型
      //   console.log(i+1);
      //   if(positionY>this.themeTopYs[i]&&positionY<this.themeTopYs[i+1]){
      //     console.log(i)
      //   }
      // }

      let length=this.themeTopYs.length;
      // for(let i=0;i<this.themeTopYs.length;i++){
      //   // if((i<length-1 && positionY>this.themeTopYs[i] && positionY<this.themeTopYs[i+1])||(i===length-1 && positionY >this.themeTopYs[i])){
      //   //   console.log(i);
      //   //   this.currentIndex=i;
      //   // }


      //   //2.防止频繁打印
      //   //  if(this.currentIndex!=i && ((i<length-1 && positionY >= this.themeTopYs[i] && positionY<this.themeTopYs[i+1])||(i===length-1 && positionY >= this.themeTopYs[i]))){
      //   //   console.log(i);
      //   //   this.currentIndex=i;
      //   //   this.$refs.nav.currentIndex=this.currentIndex;
      //   // }
      // }

      for(let i=0;i<this.themeTopYs.length-1;i++){
        console.log("js中最大值"+Number.MAX_VALUE);
        //给themeTopYs添加一个最大值进行解决
        //注意此时遍历只需要遍历到this.themeTopYs.length-1
        if(this.currentIndex !==i && (positionY >=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])){
          this.currentIndex=i;
          this.$refs.nav.currentIndex=this.currentIndex
        }
        
      }

      //3.是否显示回到顶部
      // this.isShowBackTop= -position.y > BACK_POSITION
      this.listenShowBackTop(position)
        

        
    },
    // backTop(){
    //   this.$$refs.scroll.scrollTo(0,0,300)
    // }

    addToCart(){
      //1.获取购物车需要展示的信息
      // const product= {};
      // product.image=this.topImages[0];
      // product.title=this.goods.title;
      // product.desc=this.goods.desc;
      // product.price=this.goods.realPrice;
      // product.iid=this.iid;

      const product = {}
                product.image = this.topImages[0]
                product.title = this.goods.title
                product.desc = this.goods.desc
                product.price = this.goods.newPrice
                product.iid = this.iid
                product.realPrice = this.goods.realPrice

      //2.将商品添加到购物车
      this.$store.dispatch('addCart',product).then(res=>{
        console.log(res);
        
        // this.show=true;
        // this.message=res;
        // setTimeout(()=>{
        //   this.show=false;
        //   this.message=""
        // },1500)


        this.$toast.show(res);
        console.log("===$toast===");
        console.log(this.$toast)

        
      })
    }
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;

}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 49px);
  background: #fff;
  overflow: hidden;
}
</style>