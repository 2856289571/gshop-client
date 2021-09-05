import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 浏览器不显示非生产环境打包的提示
Vue.config.productionTip = false

/* eslint-disable no-unused-vars */
// const a = 123

new Vue({
  render: h => h(App),
  router, // 注册路由器 == 所有组件都可直接访问2个对象:$router与$route
}).$mount('#app')
