// 应用中的所有路由

/* 
    采用import函数引入路由组件，是动态import引入模块, 被引入的模块会被单独打包
    初始时函数不会执行, 第一次访问才会执行, 也就是说只有一次请求对应的路由路径才会请求加载单独打包的js
*/
const Home = () => import('@/pages/Home')
const Login = () => import('@/pages/Login')
const Register = () => {
    return import('@/pages/Register')
}
const Search = () => import('@/pages/Search')
const Detail = () => import('@/pages/Detail')
const AddCartSuccess = () => import('@/pages/AddCartSuccess')
const ShopCart = () => import('@/pages/ShopCart')
const Trade = () => import('@/pages/Trade')
const Pay = () => import('@/pages/Pay')
const PaySuccess = () => import('@/pages/PaySuccess')
const Center = () => import('@/pages/Center')
const MyOrder = () => import('@/pages/Center/MyOrder')
const GroupOrder = () => import('@/pages/Center/GroupOrder')

/* 
    默认的引入路由组件方式，是将所有组件打成一个大包，
    这样会导致一进入页面，即使只是访问其中一两个组件，也会加载全部组件
*/
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// import MyOrder from '@/pages/Center/MyOrder'
// import GroupOrder from '@/pages/Center/GroupOrder'
import store from '@/store'
const routes = [
    {
        path:'/center',
        component:Center,
        // 重定向方法二
        redirect:'/center/myorder',
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            // 重定向方法一
            // {
            //     path: '',
            //     redirect:'myorder'
            // }
        ]
    },
    {
        path:'/paysuccess',
        component:PaySuccess,
        // 只有从pay页面才能跳转到paysuccess页面
        beforeEnter:(to,from,next) => {
            if(from.path === '/paysuccess'){
                next()
            }else{
                next('/')
            }
        }
    },
    {
        path:'/pay',
        component:Pay,
        // 只有从trade页面才能跳转到pay页面
        beforeEnter:(to,from,next) => {
            if(from.path === '/trade'){
                next()
            }else{
                next('/')
            }
        }
    },
    {
        path:'/trade',
        component:Trade,
        // 只有从shopcart页面才能跳转到trade页面
        beforeEnter:(to,from,next) => {
            if(from.path === '/shopcart'){
                next()
            }else{
                next('/')
            }
        }
    },
    {
        path:'/shopcart',
        component:ShopCart,
    },
    {
        path:'/addcartsuccess',
        component:AddCartSuccess,
        beforeEnter:(to,from,next) => {
            // 只有携带skuNum和sessionStorage内部有skuInfo数据  才能看到添加购物车成功界面
            if(to.query.skuNum && sessionStorage.getItem('SKUINFO_KEY')){
                next()
            }else{
                next('/')
            }
        }
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
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 没登录才能看到登录界面
            let token = store.state.user.token
            if(token){
                next('/')
            }else{
                next()
            }
        }
    },
]
export default routes