/* 
    管理detail页码数据的vuex子模块
*/
import {
    reqGoodsInfo,
} from '../../api'

const state = {
    goodsInfo:{},
    // categoryView:{}  // getters的属性不用在这里声明
}
const mutations = {
    SETGOODSINFO(state,goodsInfo){
        state.goodsInfo = goodsInfo
    },
}
const actions = {
    async getGoodsInfo({commit},skuId){
        const result = await reqGoodsInfo(skuId)
        if(result.code === 200){
            commit('SETGOODSINFO',result.data)
        }
    }
}
const getters = {
    // 面包屑导航信息
    categoryView(state){
        return state.goodsInfo.categoryView || {}
    },
    // 商品介绍信息
    skuInfo(state){
        return state.goodsInfo.skuInfo || {}
    },
    // 商品销售属性
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList || []
    },

}

export default {
    state,
    mutations,
    actions,
    getters
}