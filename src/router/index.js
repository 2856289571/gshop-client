/* 
    路由器对象
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

Vue.use(VueRouter)

export default new VueRouter({
    // 模式
    mode:'history', // 不带#
    // 应用中的所有路由
    routes:[
        {
            path:'/',
            component:Home
        },
        {
            name:'search',
            path:'/search/:keyword',
            component:Search
        },
        {
            path:'/register',
            component:Register
        },
        {
            path:'/login',
            component:Login
        },
    ]
})