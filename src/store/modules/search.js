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
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}