<template>
  <div class="spec-preview">
    <img :src="defaultImgs.imgUrl" />
    <div class="event" @mousemove="move" ref="maskWarpper"></div>
    <div class="big">
      <img :src="defaultImgs.imgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    data(){
      return{
        defaultIndex:0  // 设置顶部默认图片下标
      }
    },
    props:['skuImageList'],
    mounted(){
      this.$bus.$on('setTopImg',(index) => {
        this.defaultIndex = index
      })
    },
    beforeDestroy(){
      this.$bus.$off('setTopImg')
    },
    computed:{
      // 重新计算图片列表，
      /* 
        因为有可能数据没回来，
        图片数组是个空数组，
        如果这时候在空数组里面取图片（“[][0]”结果是报错），
        结果是undefined报错，
        所以当数据没请求回来时给[][]设置为[]这样去值时就不会报错，
        当值回来时就会更新数组正常显示 

        这种情况常见于a.b.c读取数据，当b为空时
        或者a[b].c读取数据，当a为空时
        都会报错undefined
        所以数据没有时，要将a[b]设为{}

        总而言之，当多层嵌套读取数据时，都要先计算，当没有数据时，返回一个空对象或空数组，避免报错
      */
      defaultImgs(){
        // 如果数据没回来，先设为空对象，避免undefined错误
        return this.skuImageList[this.defaultIndex] || {}
      },
    },
    methods:{
      // 鼠标移动显示大图
      move(event){
        /* 
          offsetX：当鼠标事件发生时，鼠标相对于事件源x轴的位置
          offsetY：当鼠标事件发生时，鼠标相对于事件源y轴的位置
          offsetHeight: 盒子内容+padding+border的高
          offsetWidth: 盒子内容+padding+border的宽
        */
        let {mask,maskWarpper,bigImg} = this.$refs
        let mousex = event.offsetX
        let mousey = event.offsetY
        let maskX = mousex - mask.offsetWidth / 2
        let maskY = mousey - mask.offsetHeight / 2
        let maskWarpperWidth = maskWarpper.offsetWidth
        let maskWarpperHeight = maskWarpper.offsetHeight

        // 限制x轴边界
        if(maskX < 0){
          maskX = 0
        }else if(maskX > maskWarpperWidth - mask.offsetWidth){
          maskX = maskWarpperWidth - mask.offsetWidth
        }

        // 限制y轴边界
        if(maskY < 0){
          maskY = 0
        }else if(maskY > maskWarpperHeight - mask.offsetHeight){
          maskY = maskWarpperHeight - mask.offsetHeight
        }

        // 设置样式时要加'px'
        // 设置遮罩随鼠标移动
        mask.style.left = maskX + 'px'
        mask.style.top = maskY + 'px'

        // 设置大图随鼠标移动
        // 因为大图刚好是原图的2倍，所以*2
        bigImg.style.left = - maskX * 2 + 'px'
        bigImg.style.top = - maskY * 2 + 'px'
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>