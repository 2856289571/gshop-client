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
import { reqBaseCategoryList } from './api/index'
export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  async mounted(){
    // 方法一
    // reqBaseCategoryList().then((result) => {
    //   console.log(result);
    // })
    
    // 方法二
    const result = await reqBaseCategoryList()
    console.log(result);
  }
}
</script>

<style lang="less" scoped>

</style>
