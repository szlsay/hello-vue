/*
 * @Author: your name
 * @Date: 2021-04-01 15:34:07
 * @LastEditTime: 2021-04-06 15:11:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\common\utils.js
 */
export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}


//将时间戳转化成时间格式字符串(常用)
//1535694719(秒)
//1.将时间戳转化成Date对象 const date=new Date(1535694719*1000)
//2.将Date转成对应字符串
export function formatDate(date,fmt){
  //1.获取年份
  //y+ ->1个或者多个y
  //y* ->0个或者多个y
  //y? ->0个或者1个y

  //yyyy-MM-dd
  if(/(y+)/.test(fmt)){
    fmt=fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));
    //fmt=fmt.replace('yyyy',(2019).substr(0))
  }
  let o={
    'M+':date.getMonth()+1,
    'd+':date.getDate(),
    'h+':date.getHours(),
    'm+':date.getMinutes(),
    's+':date.getSeconds()
  }

  for (let k in o){
    if(new RegExp(`(${k})`).test(fmt)){
      let str=o[k]+'';
      fmt=fmt.replace(RegExp.$1,(RegExp.$1.length===1)? str:padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00'+str).substr(str.length);
}

