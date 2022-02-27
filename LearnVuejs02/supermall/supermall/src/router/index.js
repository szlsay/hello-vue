/*
 * @Author: your name
 * @Date: 2021-03-29 10:33:46
 * @LastEditTime: 2021-04-02 15:22:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: ()=>import('../views/home/Home.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: ()=>import('../views/category/Category.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: ()=>import('../views/cart/Cart.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ()=>import('../views/profile/Profile.vue')
  },
  {
    path: '/detail/:iid',
    name: 'Detail',
    component: () => import('../views/detail/Detail.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
