<template>
  <div class="pagination">
    <button :disabled="myCurrentPage===1" @click="serCurrentPage(myCurrentPage-1)">上一页</button>
    <button v-if="startEnd.start!==1" @click="serCurrentPage(1)">1</button>
    <button disabled v-if="startEnd.start > 2">···</button>

    <button 
    v-for="item in startEndArr" 
    :key="item"
    :class="{active: item===myCurrentPage}"
    @click="serCurrentPage(item)"
    >{{item}}</button>
    
    <button disabled v-if="startEnd.end < totalPages - 1">···</button>
    <button v-if="startEnd.end < totalPages" @click="serCurrentPage(totalPages)">{{totalPages}}</button>
    <button :disabled="myCurrentPage===totalPages" @click="serCurrentPage(myCurrentPage+1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props:{
    currentPage:{    // 当前显示页码
        type:Number,
        default:1
    },
    pageSize:{      // 每页数量
        type:Number,
        default:10
    },
    total:{         // 总商品数量
        type:Number,
        default:0
    },
    showPageNo:{    // 连续展示页码数量
        type:Number,
        default:5,
        // validator    验证数据是否符合
        validator:function(value){
            return value % 2 != 0
        }
    }
  },
  data(){
      return{
          myCurrentPage:this.currentPage    // 初始值由父组件决定
      }
  },
  methods:{
      /* 
        设置新的当前页码
      */
    serCurrentPage(page){
      this.myCurrentPage = page

      this.$emit('currentChange',page)
    },
  },
  computed:{
      totalPages(){ // 总页数
        return Math.ceil(this.total / this.pageSize)
      },
      startEnd(){   // 连续页码数的开始页码与结束页码
        const {myCurrentPage, showPageNo, totalPages} = this
        let start, end
        start = myCurrentPage - (showPageNo-1)/2
        if (start<1)  start = 1
        end = start + showPageNo - 1
        if (end>totalPages) {
            end = totalPages
            start = end - showPageNo + 1
            if (start<1)  start = 1
        }
        return {start,end}
      },
        // 连续页码数组  
      startEndArr(){
          const arr = []
          const {start,end} = this.startEnd
          for(let page = start; page <= end; page ++ ){
              arr.push(page)
          }
          return arr
      }
  }
}
</script>

<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
