import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.name = "st123"
Vue.prototype.test = function () {
  console.log('test-st');
}
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

console.log(router);