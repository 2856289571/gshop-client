<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hiddeFirst" @mouseenter="showFirst">
        <h2 class="all">全部商品分类</h2>
        <transition name="slide">
          <div class="sort" v-show="isShowFirst">
          <!-- 事件委托 -->
          <div class="all-sort-list2" @click="toSearch">
            <!-- 当标识和下标相同时，添加类名，让对应元素显示 -->
            <div
              class="item"
              @mouseenter="showSubList(index)"
              :class="{ active: isCurrentIndex === index }"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
            >
              <h3>
                <a
                  href="javascript:"
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
                <!-- 声明式路由导航（一般数量过多时，不会采用声明式路由导航，因为会导致路由对象过多，加载变慢） -->
                <!-- <router-link :to="`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`">{{c1.categoryName}}</router-link> -->
                <!-- <router-link :to="{name:'search',path:'/search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}}">{{c1.categoryName}}</router-link> -->
                <!-- 编程式路由导航（直接使用该方法会导致绑定的事件过多） -->
                <!-- <a href="javascript:" @click="$router.push(`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`)">{{c1.categoryName}}</a> -->
                <!-- <a href="javascript:" @click="$router.push({name:'search',path:'/search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}})">{{c1.categoryName}}</a> -->
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dt>
                      <a
                        href="javascript:"
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                      <!-- <router-link :to="{name:'search',path:'/search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}}">{{c2.categoryName}}</router-link> -->
                      <!-- <a href="javascript:" @click="$router.push({name:'search',path:'/search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}})">{{c2.categoryName}}</a> -->
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          href="javascript:"
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                        <!-- <router-link :to="{name:'search',path:'/search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}}">{{c3.categoryName}}</router-link> -->
                        <!-- <a href="javascript:" @click="$router.push({name:'search',path:'/search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}})">{{c3.categoryName}}</a> -->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import _ from 'lodash'  // 全部引入lodash库
import throttle from "lodash/throttle"; // 按需引入lodash库
export default {
  name: "TypeNav",

  data() {
    return {
      // 设置标识需要展示的列表项
      isCurrentIndex: -2,
      // 标识一级分类列表是否显示
      isShowFirst: false,
    }
  },

  created() {
    if (this.$route.path === "/") {
      this.isShowFirst = true;
    }
  },

  mounted() {
    // mounted里一般放异步的东西
    // if(this.$route.path === '/'){
    //   this.isShowFirst = true
    // }
  },

  computed: {
    // 方法一
    /* categoryList(){
      return this.$store.state.home.categoryList
    } */
    /* 
      方法二
        因为用了vuex多模块化编程，所以不能给mapState传一个字符串数组
        需要传一个对象，且形式如下，才能将数据映射到computed中
    */
    ...mapState({
      // categoryList:(state) => {
      //   return state.home.categoryList
      // }
      categoryList: (state) => state.home.categoryList,
    }),
  },

  methods: {
    /* 
      跳转到搜索
    */
    toSearch(event) {
      // 取出data自定义属性
      const { categoryname, category1id, category2id, category3id } = event.target.dataset;

      // 准备query参数
      const query = {
        categoryName: categoryname,
      };
      if (category1id) {
        query.category1Id = category1id;
      } else if (category2id) {
        query.category2Id = category2id;
      } else if (category3id) {
        query.category3Id = category3id;
      }

      const location = {
        name: "search",
        path: "/search",
        query,
        // 当传递query参数时，也将地址栏的params参数保留下来传递，不要删除
        params:this.$route.params
      }
      if (categoryname) {
        if(this.$route.name === 'search'){ // 如果是search界面
          this.$router.replace(location);
        }else{
          this.$router.push(location);
        }

      }
      

      this.hiddeFirst()
    },
    /* 
      显示指定下标的子分类列表
    */
    showSubList: throttle(
      function (index) {
        /* 
        将isCurrentIndex分为-2（移出），-1（移进），索引值（选中）三个部分
        当为移出时不能修改isCurrentIndex
        当为移进或者选中时可以修改isCurrentIndex
        这样当鼠标快速出时，最后一次回调被节流函数延迟调用，但isCurrentIndex变为了-2，无法进入if修改isCurrentIndex
      */
        if (this.isCurrentIndex !== -2) {
          this.isCurrentIndex = index;
        }
      },
      100,
      {
        leading: true, // 默认为true,第一次是否立即调用
        /* 
        trailing:true出现问题：鼠标快速移出时，会延迟触发最后一次导致移出时还显示
        trailing:false出现问题：鼠标在选项里快速移动然后停止时，不会会延迟触发最后一次导致鼠标悬停的地方和显示的地方不对应
      */
        trailing: true, // 默认为true,最后一次是否延迟调用
      }
    ),
    /* 
      显示一级列表
    */
    showFirst() {
      this.isCurrentIndex = -1;
      this.isShowFirst = true;
    },
    /* 
      隐藏一级列表
    */
    hiddeFirst() {
      this.isCurrentIndex = -2;
      // 如果不是首页，隐藏一级列表
      if (this.$route.path !== "/") {
        this.isShowFirst = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      &.slide-enter-active, &.slide-leave-active{
        transition: all 0.3s;
      }
      // 设置进入首状态和离开末状态
      &.slide-enter, &.slide-leave-to{
        opacity: 0;
        height: 0;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.active {
            background-color: #ccc;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
