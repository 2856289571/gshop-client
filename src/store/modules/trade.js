/* 
  管理支付页面的vuex模块
*/
import {reqTradeInfo} from '@/api'
const state = {
  tradeInfo:{},
}
const mutations = {
  RECEIVE_TRADEINFO(state,tradeInfo){
    state.tradeInfo = tradeInfo
  }
}
const actions = {
  async getTradeInfo({commit}){
    const result = await reqTradeInfo()
    if(result.code === 200){
      commit('RECEIVE_TRADEINFO',result.data)
    }
  }
}
const getters = {
  detailArrayList(state){
    return state.tradeInfo.detailArrayList || []
  },
  totalNum(state){
    return state.tradeInfo.totalNum
  },
  totalAmount(state){
    return state.tradeInfo.totalAmount
  },
  tradeNo(state){
    return state.tradeInfo.tradeNo
  }
}

export default{
  state,
  mutations,
  actions,
  getters
}