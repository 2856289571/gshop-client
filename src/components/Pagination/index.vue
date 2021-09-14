<template>
  <div class="pagination">
      <button :disabled="myCurrentPage===1" @click="setCurrentPage(myCurrentPage-1)">上一页</button>
      <button v-if="startEnd.start!==1" @click="setCurrentPage(1)">1</button>
      <button disabled v-if="startEnd.start>2">...</button>
      <button
      v-for="item in startEndArr"
      :key="item"
      :class="{active:item===myCurrentPage}"
      @click="setCurrentPage(item)"
      >{{item}}</button>
      <button disabled v-if="startEnd.end<totalPage-1">...</button>
      <button v-if="startEnd.end!==totalPage" @click="setCurrentPage(totalPage)">{{totalPage}}</button>
      <button :disabled="myCurrentPage===totalPage" @click="setCurrentPage(myCurrentPage+1)">下一页</button>
      <button disabled>共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data(){
      return{
          myCurrentPage:this.currentPage    // 初始值由父组件决定
      }
  },
  props:{
    // :currentPage="options.pageNo"
    // :pageSize="options.pageSize"
    // :total="total"
    // :showPageNo="5"
    test:{
        type:Number
    },
    currentPage:{
        type:Number,
        default:1
    },
    pageSize:{
        type:Number,
        default:10
    },
    total:{
        type:Number,
        default:0
    },
    showPageNo:{
        type:Number,
        default:5,
        // validator    验证数据
        validator:function(value){
            return value % 2 !== 0
        }
    }
  },
  computed:{
    //   总页数
      totalPage(){
          const {total,pageSize} = this
        //   Math.ceil()    向上取整
          return Math.ceil(total / pageSize)
      },
          /* 
      计算出连续页码的start和end [3, 7]  {start: 3, end: 7}
      start最小值为1
      end最大值为totalPages
      start到end的数量最大是showPageNo: 
        end = start + showPageNo - 1
        start = end - showPageNo + 1
      */
      startEnd () {
        // 取出依赖(相关)数据
        const {myCurrentPage, showPageNo, totalPage} = this

        let start, end
        // 计算产生需要的结果数据
        // 计算start
        /* 
        myCurrentPage, showPageNo, totalPages
          4                 5           8          23[4]56
        */
        start = myCurrentPage - Math.floor(showPageNo/2) // 4 - 2
        /* 
        myCurrentPage, showPageNo, totalPages
          2                 5           8          1[2]345
        start上面算出的是0, 应该为1
        */
        // 当当前页码比较小时, start值就会小于1, 小于了最小值
        if (start<1) {
          start = 1
        }

        // 计算end
        // 根据start和showPageNo来计算end
        /* 
        myCurrentPage, showPageNo, totalPages
          2                 5           8          1[2]345
        start上面算出为1
        */
        end = start + showPageNo -1  // 1 + 5 - 1

        //  end最大值为totalPages, 如果超过了, 修正为totalPages
        /* 
        myCurrentPage, showPageNo, totalPages
          8                5           9        567[8]9
        start上面算出为 6  ==> 9 - 5 + 1 = 5
        end上面算出为  10  ==> 9
        */
        if (end>totalPage) {
          // 修正end
          end = totalPage
          // 修正start
          start = end - showPageNo + 1  // 前提是totalPages>=showPageNo
          /* 
          myCurrentPage, showPageNo, totalPages
            4                6           5        123[4]5
          start上面算出为 5 - 6 + 1 = 0
          end上面算出为  5
          */
          // 如果totalPages<showPageNo ==> 上面的计算start是小于1的
          if (start<1) {
            start = 1
          }
        }
        // 返回结果数据
        return {
          start,
          end
        }
      },
    //   连续展示页码数组
    startEndArr(){
        const {start,end} = this.startEnd
        let arr = []
        for(let page = start; page <= end; page ++){
            arr.push(page)
        }
        return arr
    }
  },
  methods:{
      setCurrentPage(page){
        //   重复点击当前页码无效
          if(this.myCurrentPage === page){
              return
          }
          this.myCurrentPage = page
          this.$emit('currentChange',page)
      }
  },
  watch:{
    //   监听currentPage
    /* 
        当父组件传来的currentPage改变时，myCurrentPage也跟着改变
        比如当父组件切换到其他商品类别时，页码（currentPage）应该改为1
        此时myCurrentPage应该与currentPage同步
    */
      currentPage(value){
          return this.myCurrentPage = value
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
