<template>
  <div>
    <TypeNav></TypeNav>
    <!--list-content-->
    <div class="main">
        <div class="py-container">
            <!--bread-->
            <div class="bread">
                <ul class="fl sui-breadcrumb">
                    <li>
                        <a href="#">全部结果</a>
                    </li>
                </ul>
                <ul class="fl sui-tag">
                    <li class="with-x" v-if="options.categoryName">
                      {{options.categoryName}}
                      <i @click="removeCategoryName">×</i>
                    </li>
                    <li class="with-x" v-if="options.keyword">
                      {{options.keyword}}
                      <i @click="removeKeyword">×</i>
                    </li>
                    <li class="with-x" v-if="options.trademark">
                      {{this.tmName}}
                      <i @click="removeTrademark">×</i>
                    </li>
                    <li class="with-x" v-for="(prop,attrIndex) in options.props" :key="prop">
                      {{prop}}
                      <i @click="removeProps(attrIndex)">×</i>
                    </li>
                </ul>
            </div>
            <!-- props组件通信和自定义事件组件通信 -->
            <SearchSelector 
            :searchTm="searchTm"
            @searchProp="searchProp"
            ></SearchSelector>
            <!--details-->
            <div class="details clearfix">
                <div class="sui-navbar">
                    <div class="navbar-inner filter">
                        <ul class="sui-nav">
                            <li :class="{active:orderList[0] === '1'}">
                                <a href="javascript:;" @click="setOrder('1')" >
                                  综合
                                  <!-- order:"", // 排序方式 1: 综合,2: 价格 asc: 升序,desc: 降序 示例: "1:desc" -->
                                  <i class="iconfont" v-if="orderList[0] === '1'" :class="orderList[1] === 'desc' ? 'icon-down' : 'icon-up'"></i>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">销量</a>
                            </li>
                            <li>
                                <a href="javascript:;">新品</a>
                            </li>
                            <li>
                                <a href="javascript:;">评价</a>
                            </li>
                            <li :class="{active:orderList[0] === '2'}">
                                <a href="javascript:;" @click="setOrder('2')" >
                                  价格
                                  <i class="iconfont" v-if="orderList[0] === '2'" :class="orderList[1] === 'desc' ? 'icon-down' : 'icon-up' "></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="goods-list">
                    <ul class="yui3-g">
                        <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                            <div class="list-wrap">
                                <div class="p-img">
                                    <!-- <a href="javascript:void(0);">
                                        <img :src="item.defaultImg" />
                                    </a> -->
                                    <Router-Link :to="`/detail/${item.id}`">
                                        <img :src="item.defaultImg" />
                                    </Router-Link>
                                </div>
                                <div class="price">
                                    <strong>
                                            <em>¥</em>
                                            <i>{{item.price}}</i>
                                        </strong>
                                </div>
                                <div class="attr">
                                    <!-- <a href="javascript:void(0);"  title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">
                                      {{item.title}}
                                    </a> -->
                                    <Router-Link :to="`/detail/${item.id}`">
                                        {{item.title}}
                                    </Router-Link>
                                </div>
                                <div class="commit">
                                    <i class="command">已有<span>2000</span>人评价</i>
                                </div>
                                <div class="operate">
                                    <a href="javascript:void(0);" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <Pagination
                :currentPage="options.pageNo"
                :pageSize="options.pageSize"
                :total="total"
                :showPageNo="5"
                @currentChange="getProductList"
                ></Pagination>
            </div>
            <!--hotsale-->
            <div class="clearfix hot-sale">
                <h4 class="title">热卖商品</h4>
                <div class="hot-list">
                    <ul class="yui3-g">
                        <li class="yui3-u-1-4">
                            <div class="list-wrap">
                                <div class="p-img">
                                    <img src="./images/search/like_01.png" />
                                </div>
                                <div class="attr">
                                    <em>Apple苹果iPhone 6s (A1699)</em>
                                </div>
                                <div class="price">
                                    <strong>
                                            <em>¥</em>
                                            <i>4088.00</i>
                                        </strong>
                                </div>
                                <div class="commit">
                                    <i class="command">已有700人评价</i>
                                </div>
                            </div>
                        </li>
                        <li class="yui3-u-1-4">
                            <div class="list-wrap">
                                <div class="p-img">
                                    <img src="./images/search/like_03.png" />
                                </div>
                                <div class="attr">
                                    <em>金属A面，360°翻转，APP下单省300！</em>
                                </div>
                                <div class="price">
                                    <strong>
                                            <em>¥</em>
                                            <i>4088.00</i>
                                        </strong>
                                </div>
                                <div class="commit">
                                    <i class="command">已有700人评价</i>
                                </div>
                            </div>
                        </li>
                        <li class="yui3-u-1-4">
                            <div class="list-wrap">
                                <div class="p-img">
                                    <img src="./images/search/like_04.png" />
                                </div>
                                <div class="attr">
                                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                                </div>
                                <div class="price">
                                    <strong>
                                            <em>¥</em>
                                            <i>4068.00</i>
                                        </strong>
                                </div>
                                <div class="commit">
                                    <i class="command">已有20人评价</i>
                                </div>
                            </div>
                        </li>
                        <li class="yui3-u-1-4">
                            <div class="list-wrap">
                                <div class="p-img">
                                    <img src="./images/search/like_02.png" />
                                </div>
                                <div class="attr">
                                    <em>Apple苹果iPhone 6s (A1699)</em>
                                </div>
                                <div class="price">
                                    <strong>
                                            <em>¥</em>
                                            <i>4088.00</i>
                                        </strong>
                                </div>
                                <div class="commit">
                                    <i class="command">已有700人评价</i>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchSelector from './SearchSelector'
export default {
  name: 'Search',
  data(){
    return{
      options:{
        category1Id:"",	  // 一级分类ID
        category2Id:"",	  // 二级分类ID
        category3Id:"",   // 三级分类ID
        categoryName:"",	// 分类名称
        keyword:"",	      // 搜索关键字

        props:[],	        // 商品属性的数组: ["属性ID:属性值:属性名"]示例: ["2:6.0～6.24英寸:屏幕尺寸"]
        // trademark:"",     // 品牌: "ID:品牌名称"示例: "1:苹果"
        order:"1:desc",         // 排序方式 1: 综合,2: 价格 asc: 升序,desc: 降序 示例: "1:desc"

        pageNo:1,         // 当前页码
        pageSize:10,      // 每页数量
      },
    }
  },
  // 再注册路由时定义了函数模式的props，所以可以在这里使用
  // props:[
  //   'keyword3',
  //   'keyword4'
  // ],
  computed:{
    // ...mapState({
    //   goodsList:state => state.search.productList.goodsList
    // })
    /* 
      mapGetters可直接通过goodsList映射数据，即使是多模块的vuex
    */
    ...mapGetters(['goodsList','total']),
    tmName(){
      return this.options.trademark.split(':')[1] || ''
    },
    orderList(){
      return this.options.order.split(':')
    }
  },
  components:{
    SearchSelector
  },
  watch:{
    $route:{
      // 通过immediate属性可以让回调立即执行一次，就可以完全不用在生命周期钩子里发送该请求了
      immediate:true,
      handler(){
        /* 
          不能在生命周期钩子里发送该请求，因为只会执行一次
          需要监视路由信息是否变化，如果变化，重新发送请求
        */
        this.updateOptions()
        this.getProductList()
      }
    }
  },
  methods:{
    /* 
      更新options的数据
    */
    updateOptions(){
      /* 
        请求体参数列表
          category1Id:""	// 一级分类ID
          category2Id:""	// 二级分类ID
          category3Id:""  // 三级分类ID
          categoryName:""	// 分类名称
          keyword:""	    // 搜索关键字
          props:[]	      // 商品属性的数组: ["属性ID:属性值:属性名"]示例: ["2:6.0～6.24英寸:屏幕尺寸"]
          trademark:""    // 品牌: "ID:品牌名称"示例: "1:苹果"
          order:""        // 排序方式 1: 综合,2: 价格 asc: 升序,desc: 降序 示例: "1:desc"
          pageNo:1        // 页码
          pageSize:10     // 每页数量
      */
      const {category1Id,category2Id,category3Id,categoryName} = this.$route.query
      const {keyword} = this.$route.params
      this.options = {
        /* 
          es6新语法，在一个对象内存放同样的属性，后面的会将前面的覆盖 
          通过该语法，可简便的更新对象属性值
        */
        ...this.options,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        keyword
      }
    },
    /* 
      根据options数据发送请求获取商品信息
    */
    getProductList(page=1){
      // 每次发请求前设置pageNo为1
      this.options.pageNo = page
      // 分发请求商品信息的actions
      this.$store.dispatch('getProductList',this.options)
    },
    /* 
      清空category
    */
    removeCategoryName(){
      this.options.category1Id = ''
      this.options.category2Id = ''
      this.options.category3Id = ''
      this.options.categoryName = ''

      // 重新跳转到search，不再携带对应参数
      // this.$router.push({
      this.$router.replace({
        name:'search',
        params:this.$route.params
      })

    },
    /* 
      清空keyword
    */
    removeKeyword(){
      this.options.keyword = ''

      // this.$router.push({
      this.$router.replace({
        name:'search',
        query:this.$route.query
      })

      // 3、触发全局事件总线上绑定的事件
      this.$bus.$emit('removeKeyword')
    },
    /* 
      搜索品牌事件
    */
    searchTm(trademark){
      // 判断trademark是否相同，如果相同不再发送请求
      if(this.options.trademark === trademark){
        return
      }

      /* 
        data或state中所有层次的属性数据都输响应式的
        响应式数据对象：data或state中对象类型的属性：比如options
        给响应式数据对象添加新属性
      */
      // 假设该trademark在options初始化时没有定义，现在用这种方法添加的属性将不会是响应式的 
      // this.options.trademark = trademark
      // 用this.$set()添加的属性才会是响应式的
      this.$set(this.options,"trademark",trademark)

      // 根据更新的options重新发请求获取数据
      this.getProductList()
    },
    /* 
      清空Trademark
    */
    removeTrademark(){
      // this.options.trademark = ''
      // 用this.$delete()添加的属性才会是响应式的
      this.$delete(this.options,'trademark')

      this.getProductList()
    },
    /* 
      根据属性搜索事件
    */
    searchProp(prop){
      if(this.options.props.includes(prop)){
        return
      }
      // 添加一个prop
      this.options.props.push(prop)
      // 发送请求
      this.getProductList()
    },
    /* 
      清空props
    */
    removeProps(attrIndex){
      // 清除options的props中对应的项
      // 方法一
      // this.options.props = this.options.props.filter((item,index) => {
      //   return attrIndex !== index
      // })
      // 方法2
      this.options.props.splice(attrIndex,1)
      this.getProductList()
    },
    /* 
      设置order
    */
    setOrder(orderFlag){
      // 数组解构
      let [flag,type] = this.orderList

      // 判断是点击当前按钮还是点击其他按钮
      if(flag === orderFlag){
        type = type === 'desc' ? 'asc' : 'desc'
      }else{
        flag = orderFlag
        type = 'desc'
      }
      this.options.order = `${flag}:${type}`
      this.getProductList()
    },
    /* 
      根据页码获取数据
    */
  //  currentChange(page){
  //   //  this.options.pageNo = page
  //    this.getProductList(page)
  //  }
  }
}
</script>

<style lang="less" scoped>
.main{
  margin: 10px 0;
  .py-container{
      width: 1200px;
      margin: 0 auto;
      .bread{
          margin-bottom: 5px;
          overflow: hidden;
          .sui-breadcrumb{
              padding: 3px 15px;
              margin: 0;
              font-weight: 400;
              border-radius: 3px;
              float:left;
              li{
                  display: inline-block;
                  line-height: 18px;
                  a{
                      color: #666;
                      text-decoration: none;
                      &:hover{
                          color: #4cb9fc;
                      }
                  }
              }
          }
          .sui-tag{
              margin-top: -5px;
              list-style: none;
              font-size: 0;
              line-height: 0;
              padding: 5px 0 0;
              margin-bottom: 18px;
              float: left;
              .with-x{
                  font-size: 12px;
                  margin: 0 5px 5px 0;
                  display: inline-block;
                  overflow: hidden;
                  color: #000;
                  background: #f7f7f7;
                  padding: 0 7px;
                  height: 20px;
                  line-height: 20px;
                  border: 1px solid #dedede;
                  white-space: nowrap;
                  transition:color 400ms;
                  cursor: pointer;
                  i{
                      margin-left: 10px;
                      cursor: pointer;
                      font: 400 14px tahoma;
                      display: inline-block;
                      height: 100%;
                      vertical-align: middle;
                  }
                  &:hover{
                      color: #28a3ef;
                  }
              }
          }
      }
      
      .details{
          margin-bottom: 5px;
          .sui-navbar{
              overflow: visible;
              margin-bottom: 0;
              .filter{
                  min-height: 40px;
                  padding-right: 20px;
                  background: #fbfbfb;
                  border: 1px solid #e2e2e2;
                  padding-left: 0;
                  border-radius: 0;
                  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
                  .sui-nav{
                      position: relative;
                      left: 0;
                      display: block;
                      float: left;
                      margin: 0 10px 0 0;
                      li{
                          float: left;
                          line-height: 18px;
                          a{
                              display: block;
                              cursor: pointer;
                              padding: 11px 15px;
                              color: #777;
                              text-decoration: none;
                          }
                          &.active{
                              a{
                                  background: #e1251b;
                                  color: #fff;
                              }
                          }
                      }
                  }
              }
          }
          .goods-list{
              margin: 20px 0;
              ul{
                  display:flex;
                  flex-wrap:wrap;
                  li{
                      height: 100%;
                      width: 20%;
                      margin-top: 10px;
                      line-height: 28px;
                      .list-wrap{
                          .p-img{
                              padding-left: 15px;
                              width: 215px;
                              height: 255px;
                              a{
                                  color: #666;
                                  img{
                                      max-width: 100%;
                                      height: auto;
                                      vertical-align: middle;
                                  }
                              }
                          }
                          .price{
                              padding-left: 15px;
                              font-size: 18px;
                              color: #c81623;
                              strong{
                                  font-weight: 700;
                                  i{
                                      margin-left: -5px;
                                  }
                              }
                          }
                          .attr{
                              padding-left: 15px;
                              width: 85%;
                              overflow: hidden;
                              margin-bottom: 8px;
                              min-height: 38px;
                              cursor: pointer;
                              line-height: 1.8;
                              display: -webkit-box;
                              -webkit-box-orient: vertical;
                              -webkit-line-clamp: 2;
                              a{
                                  color: #333;
                                  text-decoration: none;
                              }
                          }
                          .commit{
                              padding-left: 15px;
                              height: 22px;
                              font-size: 13px;
                              color: #a7a7a7;
                              span{
                                  font-weight: 700;
                                  color: #646fb0;
                              }
                          }
                          .operate{
                              padding: 12px 15px;
                              .sui-btn{
                                  display: inline-block;
                                  padding: 2px 14px;
                                  box-sizing: border-box;
                                  margin-bottom: 0;
                                  font-size: 12px;
                                  line-height: 18px;
                                  text-align: center;
                                  vertical-align: middle;
                                  cursor: pointer;
                                  border-radius: 0;
                                  background-color: transparent;
                                  margin-right: 15px;
                              }
                              .btn-bordered{
                                  min-width: 85px;
                                  background-color: transparent;
                                  border: 1px solid #8c8c8c;
                                  color: #8c8c8c;
                                  &:hover{
                                      border: 1px solid #666;
                                      color: #fff!important;
                                      background-color: #666;
                                      text-decoration: none;
                                  }
                              }
                              .btn-danger{
                                  border: 1px solid #e1251b;
                                  color: #e1251b;
                                  &:hover{
                                      border: 1px solid #e1251b;
                                      background-color: #e1251b;
                                      color:white!important;
                                      text-decoration: none;
                                  }
                              }
                          }
                      }
                  }
              }
          }
          .page{
              width: 733px;
              height: 66px;
              overflow: hidden;
              float:right;
              .sui-pagination{
                  margin: 18px 0;
                  ul{
                      margin-left: 0;
                      margin-bottom: 0;
                      vertical-align: middle;
                      width: 490px;
                      float: left;
                      li{
                          line-height: 18px;
                          display: inline-block;
                          a{
                              position: relative;
                              float: left;
                              line-height: 18px;
                              text-decoration: none;
                              background-color: #fff;
                              border: 1px solid #e0e9ee;
                              margin-left: -1px;
                              font-size: 14px;
                              padding: 9px 18px;
                              color: #333;
                          }
                          &.active{
                              a{
                                  background-color: #fff;
                                  color: #e1251b;
                                  border-color: #fff;
                                  cursor: default;
                              }
                          }
                          &.prev{
                              a{
                                  background-color: #fafafa;
                              }
                          }
                          &.disabled{
                              a{
                                  color: #999;
                                  cursor: default;
                              }
                          }
                          &.dotted{
                              span{
                                  margin-left: -1px;
                                  position: relative;
                                  float: left;
                                  line-height: 18px;
                                  text-decoration: none;
                                  background-color: #fff;
                                  font-size: 14px;
                                  border: 0;
                                  padding: 9px 18px;
                                  color: #333;
                              }
                          }
                          &.next{
                              a{
                                  background-color: #fafafa;
                              }
                          }
                      }
                  }
                  div{
                      color: #333;
                      font-size: 14px;
                      float: right;
                      width: 241px;
                  }
              }
          }
      }
      .hot-sale{
          margin-bottom: 5px;
          border: 1px solid #ddd;
          .title{
              font-weight: 700;
              font-size: 14px;
              line-height: 21px;
              border-bottom: 1px solid #ddd;
              background: #f1f1f1;
              color: #333;
              margin: 0;
              padding: 5px 0 5px 15px;
          }
          .hot-list{
              padding: 15px;
              ul{
                  display:flex;
                  li{
                      width:25%;
                      height: 100%;
                      .list-wrap{
                          .p-img,.price,.attr,.commit{
                              padding-left: 15px;
                          }
                          .p-img{
                              img{
                                  max-width: 100%;
                                  vertical-align: middle;
                                  border: 0;
                              }
                          }
                          .attr{
                              width: 85%;
                              display: -webkit-box;
                              -webkit-box-orient: vertical;
                              -webkit-line-clamp: 2;
                              overflow: hidden;
                              margin-bottom: 8px;
                              min-height: 38px;
                              cursor: pointer;
                              line-height: 1.8;
                          }
                          .price{
                              font-size: 18px;
                              color: #c81623;
                              strong{
                                  font-weight: 700;
                                  i{
                                      margin-left: -5px;
                                  }
                              }
                          }
                          .commit{
                              height:22px;
                              font-size: 13px;
                              color: #a7a7a7;
                          }
                      }
                  }
              }
          }
      }
  }
}
</style>
