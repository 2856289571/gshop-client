/* 
    管理购物车数据的vuex小模块
*/
import {
    reqShopCartList,
    addOrUpdateToCart
} from '@/api'

const state = {
    shopCartList:{} // 购物车列表
}
const mutations = {
    SETSHOPCARTLIST(state,shopCartList){
        state.shopCartList = shopCartList
    }
}
const actions = {
    // 添加到购物车
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        const result = await addOrUpdateToCart(skuId,skuNum)
        if(result.code === 200){
            return 'ok'
        }else{
            // 返回一个失败的promise
            return Promise.reject(new Error('添加购物车失败')) 
        }
    },
    async getShopCartList({commit}){
        const result = await reqShopCartList()
        if(result.code === 200){
            commit('SETSHOPCARTLIST',result.data)
        }
    }
}
const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}