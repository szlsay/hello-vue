/*
 * @Author: your name
 * @Date: 2021-04-09 11:08:30
 * @LastEditTime: 2021-04-09 11:41:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\prostcss.config.js
 */
module.exports = {
  plugins: {
    autoprefixer: {}, // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
    "postcss-px-to-viewport": {

      viewportWidth: 350, // 视窗的宽度，对应的是UI设计稿的宽度
      viewportHeight: 667,//视窗的高度，对应的是UI设计稿的高度（也可以不配置）
      unitPrecision: 5, // 指定'px'转换为视窗单位值得小数位数(很多时候无法整除)
      viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
      selectorBlackList: ['ignore','tab-bar','tab-bar-item'], // 指定不需要转换的类，
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false

      // unitToConvert: "px", // 要转化的单位
      // propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      // fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
      // replace: true, // 是否转换后直接更换属性值
      exclude: [/node_modules/,/TabBar/], // 设置忽略文件，用正则做目录名匹配
      // landscape: false // 是否处理横屏情况
    }
  }
};


//1.在js中使用正则：/正则相关规则/
//2.exclude中存放的元素必须是正则表达式
//3.按照排除的文件写对应的正则:
//正则的规则：
//1> ^abc:标识匹配的内容，必须以什么内容开头(以abc开头)
//2> abc$:表示匹配的内容，必须以什么内容结尾(以abc结尾)
