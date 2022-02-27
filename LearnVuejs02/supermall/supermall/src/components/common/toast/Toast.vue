<!--
 * @Author: your name
 * @Date: 2021-04-08 17:22:36
 * @LastEditTime: 2021-04-09 08:58:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\components\common\toast\Toast.vue
-->

<template>
  <!-- <div class="toast" v-if="isShow" >
    <div>{{ message }}</div>
  </div> -->
  <div class="toast" v-show="isShow" >
    <div>{{ message }}</div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    props: {
      //Toast封装，普通方式的封装是组件方式通过props，传值
      //还可以通过插件方式封装
      // message: {
      //   type: String,
      //   default() {
      //     return "";
      //   },
      // },
      // // isShow: {
      // //   type: Boolean,
      // //   default() {
      // //     return false;
      // //   },
      // // },
      // show: {
      //   type: Boolean,
      //   default() {
      //     return false;
      //   },
      // },
    },

    data(){
      return {
        message:'',
        isShow:false
      }
    },
    methods: {
      show(message='默认文字',duration=2000){

        //以前这样写的
        //duration=duration || 2000
        this.isShow=true;
        this.message=message;

        setTimeout(()=>{
          this.isShow=false;
          this.message=''
        },duration)
      }
    },
  }

</script>

<style scoped>
.toast {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, .75);
  color: #fff;
  border-radius: 15px;
}
</style>