<template>
  <div>
    Search组件
    <h2>{{this.$route.params.keyword}}</h2>
    <h2>{{this.$route.query.keyword2}}</h2>
  </div>
</template>

<script>
export default {
  name: 'Search',
}
</script>

<style lang="less" scoped>

</style>
