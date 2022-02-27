/*
 * @Author: your name
 * @Date: 2021-04-08 17:55:57
 * @LastEditTime: 2021-04-09 08:49:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\components\common\toast\index.js
 */

import Toast from './Toast'
const obj = {}

obj.install = function (Vue) {
  console.log('执行main.js的Vue.use(toast)的时候===也会来执行install函数===');
  console.log("install函数会把Vue传过来");
  console.log(Vue);

  // console.log(Toast.$el)
  // document.body.appendChild(Toast.$el);

  //1.创建组件构造器
  const toastContrustor=Vue.extend(Toast);

  //2.new的方式,根据组件构造器，可以创造出来一个组件对象
  const toast=new toastContrustor();

  //3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  //4.此时toast.$el对应的就是div,document.body.appendChild(Toast.$el)才有值，不是underfind
  document.body.appendChild(toast.$el);

  Vue.prototype.$toast=toast;

}

export default obj