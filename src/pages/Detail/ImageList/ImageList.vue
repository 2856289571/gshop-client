<template>
  <!-- <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="../images/s1.png">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div> -->
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide 
    class="swiper-slide" 
    v-for="(skuImage,index) in skuImageList" 
    :key="skuImage.id"

    >
      <img 
      :src="skuImage.imgUrl"
      @click="setCurrentImg(index)"
      :class="{active:defaultIndex===index}"
       />
    </swiper-slide>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>

  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    props:{
       skuImageList:{
         type:Array
       }
    },
    data(){
      return{
        defaultIndex:0, // 默认显示的img下标
        // 使用vue-awesome-swiper，配置对象直接在data即可，不用newswiper,也不用用ref标识轮播列表
        swiperOptions:{

          slidesPerView: 3,//一行显示几个个
          slidesPerGroup : 2,//设置多少个为一组

          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        }
      }
    },
    methods:{
      /* 
        设置当前显示的img
      */
      setCurrentImg(index){
        this.defaultIndex = index
        this.$bus.$emit('setTopImg',index)
      }
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      // width: 56px;
      // height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        // &:hover {
        //   border: 2px solid #f60;
        //   padding: 1px;
        // }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>