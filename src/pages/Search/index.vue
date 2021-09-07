<template>
  <div>
    <TypeNav></TypeNav>
    Search组件
    <h2>{{this.$route.params.keyword}}</h2>
    <h2>{{this.$route.query.keyword2}}</h2>
    <h2>{{keyword3}}</h2>
    <h2>{{keyword4}}</h2>
  </div>
</template>

<script>
export default {
  name: 'Search',
  // 再注册路由时定义了函数模式的props，所以可以在这里使用
  props:[
    'keyword3',
    'keyword4'
  ]
}
</script>

<style lang="less" scoped>

</style>
