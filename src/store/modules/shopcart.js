/* 
    管理购物车数据的vuex小模块
*/
import {
    reqCartList,
    addOrUpdateToCart,
    reqUpdateChecked,
    reqDeleteOne
} from '@/api'
import { Promise } from 'core-js'

const state = {
    shopCartList:[] // 购物车列表
}
const mutations = {
    SETSHOPCARTLIST(state,shopCartList){
        state.shopCartList = shopCartList
    }
}
const actions = {
    // 添加或修改购物车
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        const result = await addOrUpdateToCart(skuId,skuNum)
        if(result.code === 200){
            return 'ok'
        }else{
            // 返回一个失败的promise
            return Promise.reject(new Error('添加购物车失败')) 
        }
    },
    // 请求购物车列表
    async getShopCartList({commit}){
        const result = await reqCartList()
        if(result.code === 200){
            commit('SETSHOPCARTLIST',result.data)
        }
    },
    // 更新单个商品选中状态
    async reqUpdateIsChecked({commit},{skuId,isChecked}){
        const result = await reqUpdateChecked(skuId,isChecked)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('修改选中状态失败'))
        }
    },
    // 更新多个商品选中状态
    async reqUpdateAnyChecked({commit,dispatch,state,getters},isChecked){
        let promises = []
        getters.cartInfoList.forEach((item) => {
            if(item.isChecked === isChecked){
                return
            }
            let promise = dispatch('reqUpdateIsChecked',{skuId:item.skuId,isChecked})
            promises.push(promise)
        })
        return Promise.all(promises)
    },
    // 删除单个商品
    async reqDeleteOneGood({commit},skuId){
        const result = await reqDeleteOne(skuId)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('删除商品失败'))
        }
    },
    // 删除多个商品
    async reqDeleteAllGood({commit,dispatch,state,getters}){
        let promises = []
        getters.cartInfoList.forEach((item) => {
            if(item.isChecked === 0){
                return
            }
            let promise = dispatch('reqDeleteOneGood',item.skuId)
            promises.push(promise)
        })
        return Promise.all(promises)
    }
}
const getters = {
    // 计算获得购物车列表
    cartInfoList(state){
        // 解决数据没回来时报错undefined
        let shopCartList2 =  state.shopCartList[0] || []

        return shopCartList2.cartInfoList || []
    },

    // 计算所有商品总价格
    totalPrice(state,getters){
        return getters.cartInfoList.reduce((prev,item) => {
            if(item.isChecked === 1){
                prev += item.skuNum * item.skuPrice
            }
            return prev
        },0)
    },

    // 计算已选商品数量
    totalChecked(state,getters){
        return getters.cartInfoList.reduce((prev,item) => {
            if(item.isChecked === 1){
                prev += item.skuNum
            }
            return prev
        },0)
    },

    // 计算是否全选
    // isAllCheck (state, getters) {
    //     // 根据最新的数据结构重新进行计算
    //     return getters.cartInfoList.every(item => item.isChecked)
    // }

}

export default {
    state,
    mutations,
    actions,
    getters
}