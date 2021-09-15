// 应用中的所有路由
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
const routes = [
    {
        path:'/AddCartSuccess',
        component:AddCartSuccess,
    },
    {
        path:'/detail/:skuId',
        component:Detail,
    },
    {
        path:'/',
        component:Home
    },
    {
        name:'search',
        // 在:keyword后面添加?代表该params参数可有可无
        path:'/search/:keyword?',
        component:Search,
        // props:true, // 只映射函数模式
        props(route){
            return{
                keyword3:route.params.keyword,
                keyword4:route.query.keyword2
            }
        }
    },
    {
        path:'/register',
        component:Register,
        meta:{
            isHideFooter:true
        }
    },
    {
        path:'/login',
        component:Login,
        // meta属性可存储关于该路由的自定义信息
        meta:{
            isHideFooter:true
        }
    },
]
export default routes