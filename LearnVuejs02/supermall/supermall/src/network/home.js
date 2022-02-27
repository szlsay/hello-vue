/*
 * @Author: your name
 * @Date: 2021-03-30 09:20:25
 * @LastEditTime: 2021-03-30 15:47:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\network\home.js
 */
import {request} from "./request";
export function getHomeMultidata() {
  return request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return request({
    url:'/home/data',
    params: {
      type,
      page
    }
  })
}