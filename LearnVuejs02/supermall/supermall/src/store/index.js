/*
 * @Author: your name
 * @Date: 2021-03-29 10:33:46
 * @LastEditTime: 2021-04-08 13:20:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

// 2.创建Store对象
// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })

const state={
  cartList:[]
}

const store = new Vuex.Store({
  state,
  //mutations唯一的目的就是修改state中状态
  //mutations中的每个方法尽可能完成的事件比较单一一点
  mutations,
  actions,
  getters

})


//3.挂载Vue实例上
export default store
