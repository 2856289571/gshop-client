<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cartInfo in cartInfoList" :key="cartInfo.id">
          <li class="cart-list-con1">
            <input 
            type="checkbox" 
            name="chk_list" 
            :checked="cartInfo.isChecked===1?true:false"
            @click="updateOne(cartInfo)"
            >
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{cartInfo.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cartInfo.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="updateSkuNum(cartInfo,-1,true)">-</a>
            <input autocomplete="off" type="text" :value="cartInfo.skuNum" minnum="1" class="itxt" @change="updateSkuNum(cartInfo,$event.target.value*1,false)">
            <a href="javascript:void(0)" class="plus" @click="updateSkuNum(cartInfo,1,true)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartInfo.skuNum * cartInfo.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteOne(cartInfo.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- 多选框只有一个选项时，v-model绑定的是checked值 -->
        <input class="chooseAll" type="checkbox" v-model="isAllCheck">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAll()">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalChecked}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
  export default {
    name: 'ShopCart',
    data(){
      return{
      }
    },
    mounted(){
      // 发送请求时要在请求头上携带用户标识
      this.getCartList()
    },
    computed:{
      // mapState方法是vuex的，要引入vuex才能使用
      // ...mapState({ shopCartList:(state) => state.shopcart.shopCartList }),

      ...mapGetters(['cartInfoList','totalPrice','totalChecked']),

      isAllCheck: {
        get () {
          return this.cartInfoList.every((item) => {
            return item.isChecked === 1
          }) && this.totalChecked > 0
        },
        async set (value) { // 点击改变了全选状态
          try {
            console.log(value);
            const result = await this.$store.dispatch('reqUpdateAnyChecked', value?'1':'0')
            alert('修改所有状态成功')
            this.getCartList()
          } catch (error) {
            alert(error.message)
          }
        }
      },
    },
    methods:{
      /* 
        请求购物车列表方法
      */
      async getCartList(){
        try {
          await this.$store.dispatch('getShopCartList')
        } catch (error) {
          alert(error.message)
        }
      },
      /* 
        修改购物车数量
      */
      async updateSkuNum(cartInfo,disNum,flag){
        if(!flag){
          if(disNum > 0){
            disNum = disNum - cartInfo.skuNum
          }else{
            disNum = 1 - cartInfo.skuNum
          }
        }else{
          if(disNum + cartInfo.skuNum <= 0){
            disNum = 1 - cartInfo.skuNum
          }
        }
        try {
          await this.$store.dispatch('addOrUpdateShopCart',{skuId:cartInfo.skuId,skuNum:disNum})
          this.getCartList()
          alert('修改数量成功')
        } catch (error) {
          alert(error.message)
        }
        

      },
      /* 
        修改选中状态（单个）
      */
      async updateOne(cartInfo){
        try {
          const result = await this.$store.dispatch('reqUpdateIsChecked',{skuId:cartInfo.skuId,isChecked:cartInfo.isChecked===1?'0':'1'})
          alert('修改单个商品状态成功')
          this.getCartList()
        } catch (error) {
          alert(error.message)
        }
      },
      /* 
        删除单个商品
      */
      async deleteOne(skuId){
        try {
          const result = await this.$store.dispatch('reqDeleteOneGood',skuId)
          alert('删除单个商品成功')
          this.getCartList()
        } catch (error) {
          alert(error.message)
        }        
      },
      /* 
        删除多个商品
      */
      async deleteAll(){
        try {
          await this.$store.dispatch('reqDeleteAllGood')
          alert('删除所选商品成功')
          this.getCartList()
        } catch (error) {
          alert(error.message)
        }
      }
    }

  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 10%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 15%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>