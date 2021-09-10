/* 
    使用一些专门为vue设计的插件，就会独立出一个文件来
    比如vue-awesome-swiper是专门为vue设计的插件
    但swiper不是，swiper是一个库
*/
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
