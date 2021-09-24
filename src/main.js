import Vue from 'vue'
// 多个组件都要使用该样式，可直接全局引入
// import 'swiper/css/swiper.css'

import App from './App.vue'
import router from './router'
import TypeNav from './components/TypeNav'
import MyPagination from './components/MyPagination'
import store from './store'
// 导入所有暴露的方法收集到对象API上
import * as API from '@/api'

import './plugins/swiper' // 加载swiper的配置
import './plugins/element' // 加载element的配置
import 'element-ui/lib/theme-chalk/index.css';
import './mock/mockServer'  // 加载mockServer
import './plugins/validate'


// 图片懒加载库
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/images/loading.gif'
// 声明使用图片懒加载
/* 
  内部自定义一个指令: v-lazy
  将引入图片的src该为v-lazy即可实现懒加载
*/
Vue.use(VueLazyload, { 
  loading,  // 配置loading图片
})


// 浏览器不显示非生产环境打包的提示
Vue.config.productionTip = false

// 注册全局组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(MyPagination.name,MyPagination)


/* eslint-disable no-unused-vars */
// const a = 123

// 创建或指定全局事件总线对象，保存到Vue原型上
// Vue.prototype.$bus = new Vue()

new Vue({
  // 1、创建或指定全局事件总线对象，保存到Vue原型上
  beforeCreate(){
    Vue.prototype.$bus = this
    /* 
      Vue的原型对象就是组件的原型对象，
      将API挂在Vue原型对象上，则每个组件对象都可以调用到该API
      适用于不用vuex的情况，这时候所有组件都可以通过this.$api来调用方法
    */
    Vue.prototype.$API = API
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
