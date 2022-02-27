/*
 * @Author: your name
 * @Date: 2021-04-08 13:19:18
 * @LastEditTime: 2021-04-08 15:27:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\store\getters.js
 */
export default {
  cartLength(state){
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  },
  totalPrice(state) {
    const cartList = state.cartList;
    return '￥' + cartList.filter(item => {
      return item.checked
    }).reduce((preValue, item) => {
      // return preValue + item.count * item.newPrice
      return preValue + item.count * item.realPrice
    }, 0)
  },
  totalCount(state) {
    const cartList = state.cartList;
    return cartList.filter(item => {
      return item.checked
    }).reduce((preValue, item) => {
      return preValue + item.count
    }, 0)
  },
}