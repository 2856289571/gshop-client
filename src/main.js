import Vue from 'vue'
import App from './App.vue'

// 浏览器不显示非生产环境打包的提示
Vue.config.productionTip = false

/* eslint-disable no-unused-vars */
// const a = 123

new Vue({
  render: h => h(App),
}).$mount('#app')
