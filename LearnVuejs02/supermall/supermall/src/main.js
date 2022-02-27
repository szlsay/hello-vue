/*
 * @Author: your name
 * @Date: 2021-03-29 10:33:46
 * @LastEditTime: 2021-04-09 10:43:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//这里会默认导入toast文件夹下的index.js文件
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus=new Vue();

//安装toast插件
Vue.use(toast);
//执行这句话的时候Vue.use(toast)
//会去调用toast这个对象的install方法，而这个toast对象是index.js里的obj对象

//解决移动端300ms的延迟
FastClick.attach(document.body)

//使用懒加载插件
//js里如何导入一张图片
// Vue.use(VueLazyload)
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.png')
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
