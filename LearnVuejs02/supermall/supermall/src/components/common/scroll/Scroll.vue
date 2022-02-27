<!--
 * @Author: your name
 * @Date: 2021-03-31 13:11:18
 * @LastEditTime: 2021-04-02 15:05:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\components\common\scroll\Scroll.vue
-->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    name:"Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll:null
      }
    },
    mounted(){
      //1.创建BScroll对象
      this.scroll=new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

     
      //2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll',(position)=>{
          // console.log("=====监听滚动位置=====");
          // console.log("scrollY=="+this.scroll.y);
          // console.log("=====滚动时=====")
          // console.log(position)
          this.$emit('scroll',position);
        })

       

      
      }
     
      console.log("===new出来的BScroll对象=====")
      console.log(this.scroll);


      //3.监听上拉事件
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
        //console.log('上拉加载更多')
        this.$emit('pullingUp')
      })
      }
      
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      refresh() {
        console.log('=====Scroll.vue=====refresh=====')
        this.scroll && this.scroll.refresh()
      },
      finishPullUp(){
          this.scroll && this.scroll.finishPullUp()
      },
      getScrollY(){
        return this.scroll? this.scroll.y:0
      }
    }
  }
</script>
<style scoped>
</style>