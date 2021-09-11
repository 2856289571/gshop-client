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
// 请求商品信息
export function reqProductList(searchParams){
    return ajax.post('/list',searchParams)
}