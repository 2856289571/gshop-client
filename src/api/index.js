/* 
    包含所有接口请求函数的模块
*/
import ajax from './ajax'
import mockAjax from './mockAjax'

/* export function reqBaseCategoryList(){
    return ajax.get('/product/getBaseCategoryList')
} */
// 简写
// 请求三级分类列表
export const reqBaseCategoryList = () => ajax.get('/product/getBaseCategoryList')
// 请求首页广告轮播
export function reqBanner(){
    return ajax.get('/cms/banner')
}
// 请求mock的楼层信息
export function reqFloorList(){
    return mockAjax.get('/floors')
}
// 请求mock的今日推荐信息
export function reqRecommandList(){
    return mockAjax.get('/recommand')
}
// 请求商品信息列表
export function reqProductList(searchParams){
    return ajax.post('/list',searchParams)
}
// 请求某个商品详细信息
export function reqGoodsInfo(skuId){
    return ajax({
        url:`/item/${skuId}`,
        method:'get',
    })
}
// 添加到购物车
export function addOrUpdateToCart(skuId,skuNum){
    return ajax({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'POST'
    })
}
// 请求购物车列表
export function reqCartList(){
    return ajax({
        url:'/cart/cartList',
        method:'GET'
    })
}
// 切换商品选中状态
export function reqUpdateChecked(skuId,isChecked){
    return ajax({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get'
    })
}
// 删除商品
export function reqDeleteOne(skuId){
    return ajax({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete'
    })
}
// 注册
export const reqRegister = (userInfo) => ajax.post('/user/passport/register', userInfo)
// 登录
export function reqLogin(userInfo){
    return ajax({
        url:'/user/passport/login',
        method:'post',
        data:userInfo
    })
}
// 通过token获取用户信息
export function reqUserInfo(){
    return ajax({
        url:'/user/passport/auth/getUserInfo',
        method:'get'
    })
}
// 退出登录
export function reqLogout(){
    return ajax({
        url:'/user/passport/logout',
        method:'get'
    })
}
// 获取订单交易页信息
export function reqTradeInfo(){
    return ajax({
        url:'/order/auth/trade',
        method:'get'
    })
}
// 提交订单，返回订单编号
export function reqTradeNo(tradeInfo){
    return ajax({
        url:`/order/auth/submitOrder?tradeNo=${tradeInfo.tradeNo}`,
        method:'post',
        data:tradeInfo
    })
}
// 获取订单支付信息
export function reqPayInfo(orderId){
    return ajax({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}
// 查询支付订单状态
export function reqPayStatus(orderId){
    return ajax({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'GET'
    })
}
// 获取我的订单列表
export function reqMyOrderList(page,limit){
    return ajax({
        url:`/order/auth/${page}/${limit}`,
        method:'get'
    })
}