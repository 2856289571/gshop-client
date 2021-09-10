<template>
  <div id='app'>
      <Header></Header>
      <router-view></router-view>
      <Footer v-show="!$route.meta.isHideFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  async mounted(){
    /* 
      在App里分发action和在需要数据的组件里分发action的区别：
        在App里分发只会发送一次请求，当组件切换时不会重新发送请求
        在需要数据的组件里分发，当组件切换时会重新发送请求
    */
    /* 
      分发请求获取三级分类列表的异步action
    */
    this.$store.dispatch('getBaseCategoryList')
    /* 
      分发请求获取banner的异步action
    */
    this.$store.dispatch('getBanner')
  }
}
</script>

<style lang="less" scoped>

</style>
