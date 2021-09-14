import Vue from 'vue'
// 多个组件都要使用该样式，可直接全局引入
// import 'swiper/css/swiper.css'

import App from './App.vue'
import router from './router'
import TypeNav from './components/TypeNav'
import Pagination from './components/Pagination'
import store from './store'

import './plugins/swiper' // 加载swiper的配置
import './mock/mockServer'  // 加载mockServer

// 浏览器不显示非生产环境打包的提示
Vue.config.productionTip = false

// 注册全局组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)


/* eslint-disable no-unused-vars */
// const a = 123

// 创建或指定全局事件总线对象，保存到Vue原型上
// Vue.prototype.$bus = new Vue()

new Vue({
  // 1、创建或指定全局事件总线对象，保存到Vue原型上
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router, // 注册路由器 == 所有组件都可直接访问2个对象:$router与$route
  store,  // 注册vuex   == 所有组件都可直接访问$store
}).$mount('#app')

/* 
  store对象的功能
  读取数据
    store.state.xxx
    store.getters.yyy
  更新数据
    store.dispatch('action名称',data)
    store.commit('mutation名',data)
*/
