import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from './components/TypeNav'
import store from './store'

// 浏览器不显示非生产环境打包的提示
Vue.config.productionTip = false

// 注册全局组件
Vue.component(TypeNav.name,TypeNav)

/* eslint-disable no-unused-vars */
// const a = 123

new Vue({
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
