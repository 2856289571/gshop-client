/* 
    路由器对象
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)

// 缓存原型上的push函数
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 给原型对象上的push指定新函数函数
VueRouter.prototype.push = function (location, onComplete, onAbort) {
  // 判断如果没有指定回调函数, 通过call调用源函数并使用catch来处理错误
  if (onComplete===undefined && onAbort===undefined) {
    return originPush.call(this, location, onComplete, onAbort).catch(() => {})
  } else { // 如果有指定任意回调函数, 通过call调用源push函数处理
    originPush.call(this, location, onComplete, onAbort)
  }
}
// replace同理处理
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  if (onComplete===undefined && onAbort===undefined) {
    return originReplace.call(this, location, onComplete, onAbort).catch(() => {})
  } else {
    originReplace.call(this, location, onComplete, onAbort)
  }
}

const router = new VueRouter({
    // 模式
    /* 
      编译时需要history模式
    */
    mode:'history', // 不带#
    // 应用中的所有路由
    routes,
    
    // 路由跳转时，滚动条回到顶部
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
})

/* 
  设置全局前置守卫
    to    准备去的地方的路由对象
    from  从哪个地方来的路由对象
    next  
      是一个函数
      next()        无条件放行
      next(false)   不放行，停留在原地
      next('/')     代表跳转到哪里
*/
// token校验逻辑
router.beforeEach(async (to, from, next) => {
  // token校验
  let token = store.state.user.token

  if(token){
    // 如果有token，说明已经登录了，或之前登录过
    if(to.path === '/login'){
      // 登录了，还想去登录页，直接跳转到首页
      next('/')
    }else{
      // !!  两个感叹号可以将变量值装换为布尔值
      // 判断是否有用户信息
      let hasUserInfo = !!store.state.user.userInfo.nickName
      if(hasUserInfo){
        // 用户信息存在，放行
        next()
      }else{
        // 登录了，要去其他页面，用户信息不存在，先通过token获取用户信息
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // 没拿到信息，代表token过期
          alert('用户的token过期')
          // 清空token信息和用户信息
          store.dispatch('resetUserInfo')
          // 重定向到登录页面,登录后在跳转到原来想要跳转去的地方
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  }else{
    // 没有登录过
    
    // 后期要判断用户是否去订单相关页面，如果是那么先登录
    // 交易相关 支付相关  用户中心相关  都需要登录才能访问
    if(to.path.indexOf('/trade') === 0 || to.path.startsWith('/pay') || to.path.startsWith('/center')){
      next(`/login?redirect=${to.path}`)
    }else{
      next()
    }
  }
})

export default router