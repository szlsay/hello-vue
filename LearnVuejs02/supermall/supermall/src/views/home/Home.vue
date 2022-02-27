<!--
 * @Author: your name
 * @Date: 2021-03-29 16:57:46
 * @LastEditTime: 2021-04-07 17:23:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\views\home\Home.vue
-->
<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"/>

    <scroll class="content" 
      ref="scroll" 
      :probe-type="3" 
      @scroll="contentScroll" 
      :pull-up-load="true"
      @pullingUp="loadMore"
     >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
      <tab-control class="tab-control" 
        :titles="['流行','新款','精选']" 
        @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
     
    </scroll>

    <!--监听组件的监听事件,需要在点击事件加个native修饰符-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
   

  </div>
</template>
<script>
  
  import HomeSwiper from './childComps//HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from "network/home"
  import {debounce} from 'common/utils'
  import {itemListenerMixin,backTopMixin} from 'common/mixin'

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      // BackTop
      
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){ 
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        // isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
        tabIndex:0,
        // itemImgListener:null
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      console.log('home destroyed')
    },
    activated() {
      console.log("activated")
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      //这里如果不刷新的话，有时候切换到分类等其他页面时再回来出现无法滚动问题
      this.$refs.scroll.refresh();
    },
    deactivated() {
      console.log("deactivated")
      //this.saveY=this.$refs.scroll.scroll.y

      //1.保存Y值
      this.saveY=this.$refs.scroll.getScrollY();

      //2.取消全局事件的监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    created(){
     //这里的this指的是这个Home.vue组件
     //getHomeMultidata是methods里的方法
      this.getHomeMultidata();

      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

     
      
      
      
    },
    mounted(){

      //1.图片加载完成的事件监听
      // const refresh=this.debounce(this.$refs.scroll.refresh,200)
      // const refresh=debounce(this.$refs.scroll.refresh,200)

      // //  //3.监听item中图片加载完成
      // //  //对监听的事件进行保存
      // this.itemImgListener=()=>{
      //   console.log('-----------');
      //   // this.$refs.scroll.scroll.refresh();
      //   //this.$refs.scroll.refresh();
      //  // refresh();
      //   refresh()
      // }

      // this.$bus.$on('itemImgLoad',this.itemImgListener)

      //2.获取tabControl的offsetTop
      //console.log(this.$refs.tabControl.offsetTop) 
      //打印发现组件是没有offsetTop这个属性的,如果是普通元素div等则有
      //所以应该去拿组件里的元素
      //所有的组件都有一个属性$el:用于获取组件中的元素
       console.log("获取到的是未加载图片的scrollTop:"+this.$refs.tabControl2.$el.offsetTop);

      //注意这里拿取的offsetTop是没有包含图片高度的
      //所以应该等图片加载完之后拿取最终的offset才是正确的

      this.tabClick(0)
    },
    methods: {
      /**
       * 事件监听相关方法
       */

      // debounce(func,delay){
      //   let timer=null
      //   return function(...args){
      //     if(timer) clearTimeout(timer)
      //     timer=setTimeout(() => {
      //       func.apply(this,args)
      //     }, delay);
      //   }
      // },

      tabClick(index){
        console.log("流行-新款-精选---"+index);
        switch (index) {
          case 0:
            this.currentType='pop'
            break;
          case 1:
            this.currentType='new'
            break;
          case 2:
            this.currentType='sell'
            break;
        }

       // this.showGoods=this.goods[this.currentType].list

        this.$refs.tabControl1.currentIndex=index;
        this.$refs.tabControl2.currentIndex=index;

        
        // if(index!=this.tabIndex){
        //   //this.$refs.scroll.scrollTo(0,this.saveY,0);
        //   //这里如果不刷新的话，有时候切换到分类等其他页面时再回来出现无法滚动问题
        //   //this.$refs.scroll.refresh();
        //   //this.$refs.scroll.scroll.y=0

        // // console.log("////////////////////");
        // // console.log(this.$refs.scroll)
        // this.$refs.scroll.scrollTo(0,-this.tabOffsetTop,0)
      
        // }
        // this.tabIndex=index;
      
      },

      backClick(){
        console.log("========");
        console.log(this.$refs.scroll)
        //点击返回顶部 this.$refs.scroll获取scroll组件实例
        // this.$refs.scroll.scroll.scrollTo(0,0,500);
         this.$refs.scroll.scrollTo(0,0);
      },

      contentScroll(position){

        this.listenShowBackTop(position)

        //注意position.y打印出的来一直是个负值
        //1.判断BackTop是否显示
        //this.isShowBackTop=(-position.y) > 1000
         this.isTabFixed=(-position.y) > this.tabOffsetTop

        //2.决定tabControl是否吸顶(position:fixed)
        //this.isTabFixed=(-position.y)>this.tabOffsetTop

      


      },
      loadMore(){
        console.log("上拉加载更多")
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
         console.log("获取scrollTop:"+this.$refs.tabControl2.$el.offsetTop);
         this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
      },

      /**
       * 网络请求相关方法
       */
      getHomeMultidata(){
         //1.请求多个数据
        getHomeMultidata().then(res=>{
          //注意，这里的getHomeMultidata(),是调用home.js导入的getHomeMultidata方法
          console.log(res);
          this.banners=res.data.banner.list;
          this.recommends=res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        //2.请求商品数据
        const page=this.goods[type].page + 1;
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
           // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()

          // this.$refs.scroll.scroll.finishPullUp()
          //完成上拉加载更多
          //this.$refs.scroll.finishPullUp()
        })
      }
      
    },

  }
</script>
<style scoped>

  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动/
     position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .content {
    overflow: hidden;
    position:absolute;
    top: 44px;
    bottom:49px;
    left:0;
    right:0;
   
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  /* .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */
  /* .tab-control {
    /* position: sticky;
    top: 44px;
    z-index: 9; */
    /* position: relative;
    z-index: 9;
  } */

  /* .content {
    height: calc(100% - 93px);
    margin-top: 44px;
    overflow:hidden;
  } */
</style>
