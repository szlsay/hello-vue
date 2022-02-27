/*
 * @Author: your name
 * @Date: 2021-03-26 15:20:41
 * @LastEditTime: 2021-03-31 10:37:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learnaxios\src\network\request.js
 */
import axios from 'axios'



// //==========第一种==========
// export function request(config,success,failure){
//   //1.创建axios的实例
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })

//   //发送真正的网络请求
//   instance(config)
//     .then(res => {
//       //.then结果在这里就不对了，因为别人不可能在这里处理结果
//       //想办法把结果给调用者传出去，怎么回调出去呢
//       //在request方法里，让别人传入一个success函数，failure失败函数
//       //console.log(res);
//       success(res);
//     })
//     .catch(err => {
//       //console.log(err);
//       failure(err);
//     })
// }



//==========第二种==========
// export function request(config){
//   //1.创建axios的实例
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })

//   //发送真正的网络请求
//   instance(config.baseConfig)
//     .then(res => {
//       config.success(res);
//     })
//     .catch(err => {
//       config.failure(err);
//     })
// }


//==========Promise==========
// export function request(config){
//  return new Promise((resolve,reject)=>{
//     //1.创建axios的实例
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })

//   //发送真正的网络请求
//   instance(config)
//     .then(res => {
//       resolve(res)
//     })
//     .catch(err => {
//      reject(err)
//     })
//  })
// }


//==========Promise==========
export function request(config){
 
     //1.创建axios的实例
   const instance = axios.create({
    //  baseURL: 'http://123.207.32.32:8000',
     baseURL:"http://152.136.185.210:7878/api/hy66",
     timeout: 5000
   })

   //2.axios的拦截器 axios.interceptors全局拦截 instance.interceptors实例拦截
   //2.1请求拦截的作用
   instance.interceptors.request.use(config=>{
     console.log(config);
     //1.比如config中的一些信息不符合服务器的要求
     //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
     //3.某些网络请求(比如登录(token)),必须携带一些特殊的信息
     return config;
   },err=>{
      console.log(err);
   })


   //2.2.响应拦截的作用
   instance.interceptors.response.use(res=>{
     //console.log(res);
     return res.data;
   },err=>{
     console.log(err);
   })
 
   //3.发送真正的网络请求
   return instance(config)
   //instance(config)查看源码发现返回的就是一个Promise对象，
   //所以我们不需要再封装一个Promise
  
 }


