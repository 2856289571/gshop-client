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