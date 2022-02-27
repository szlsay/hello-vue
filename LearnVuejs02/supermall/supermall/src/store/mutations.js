/*
 * @Author: your name
 * @Date: 2021-04-08 11:37:55
 * @LastEditTime: 2021-04-08 14:27:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\store\mutations.js
 */
import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'
export default {
  // addCart(state,payload){
  //payload新添加的商品
  // let oldProduct=null;
  // for(let item of state.cartList){
  //   if(item.iid === payload.iid){
  //     oldProduct=item;
  //   }
  // }
  //2.判断oldProduct
  // if (oldProduct) {
  //   oldProduct.count += 1;
  // } else {
  //   payload.count = 1;
  //   state.cartList.push(payload);
  // }

  //数组常用的方法优哪些?
  //push/pop/unshift/shift/sort/reverse/map/filter/reduce/join
  // let index = state.cartList.indexOf(payload);
  // if(index === -1){
  //   let oldProduct = state.cartList[index];
  //   oldProduct.count +=1;
  // }else {
  //   payload.count =1;
  //   state.cartList.push(payload);
  // }


  //第三种写法
  //查找之前数组中是否有该商品
  // let oldProduct = state.cartList.find(function (item){
  //   return item.iid===payload.iid
  // })

  // if(oldProduct){
  //   oldProduct.count +=1;
  // }else {
  //   payload.count = 1;
  //   state.cartList.push(payload);
  // }
  // }

  // addCounter(state, payload){
  //   payload.count++;
  // },
  // addToCart(state, payload){
  //   state.cartList.push(payload);
  // }
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    payload.checked=true;
    state.cartList.push(payload);
  }
}