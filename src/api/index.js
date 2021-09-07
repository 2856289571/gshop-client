/* 
    包含所有接口请求函数的模块
*/
import ajax from './ajax'

/* export function reqBaseCategoryList(){
    return ajax.get('/product/getBaseCategoryList')
} */
// 简写
export const reqBaseCategoryList = () => ajax.get('/product/getBaseCategoryList')