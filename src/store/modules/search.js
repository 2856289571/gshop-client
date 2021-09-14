/* 
    管理search页面状态的子模块
*/

import { reqProductList } from "@/api"

const state = {
    productList:{}  // 查看接口文档，看看返回的是什么数据类型
}
const mutations = {
    GETPRODUCTLIST(state,productList){
        return state.productList = productList
    }
}
const actions = {
    async getProductList(context,searchParams){
        // 浅拷贝 --- 因为不想删除search组件中的options中的属性
        searchParams = {...searchParams}
        // 删除searchParams中的空串或数组属性（优化请求参数，提高性能）
        /* 
            Object.keys(对象)   遍历对象，返回对象属性名组成的数组
            Object.keys(obj)和forEach(item)配合使用可以遍历对象的值,如obj(item)
            delete  删除对象属性或者变量
        */
        Object.keys(searchParams).forEach((key) => {
            if(searchParams[key] === '' || (Array.isArray(searchParams[key]) && searchParams[key].length === 0)){
                delete searchParams[key]
            }
        })

        let {commit} = context
        const result = await reqProductList(searchParams)
        if(result.code === 200){
            commit('GETPRODUCTLIST',result.data)
        }
    }
}
const getters = {
    // 商品分页列表
    goodsList(state){
        // 通过计算属性处理返回的数据，是的即使数据为空也不会报错
        return state.productList.goodsList || []
    },
    // 品牌列表
    trademarkList(state){
        return state.productList.trademarkList || []
    },
    // 属性列表
    attrsList(state){
        return state.productList.attrsList || []
    },
    // 总商品数
    total(state){
        return state.productList.total || 0
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}