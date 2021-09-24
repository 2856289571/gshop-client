/* 
    管理登录用户数据的vuex子模块
*/

import {
    getUserTempId,
    setToken,
    getToken,
    removeToken,
} from '@/util/userAbout'
import {
    reqRegister,
    reqLogin,
    reqUserInfo,
    reqLogout
} from '@/api'

const state = {
    userTempId:getUserTempId(),  // 储存用户临时标记
    token:getToken(),   // 先从localstorage获取token
    userInfo:{}
}
const mutations = {
    RECEIVE_LOGIN(state,token){
        state.token = token
    },
    RECEIVE_USERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    RESET_USERINFO(state){
        state.token = ''
        state.userInfo = {}
    }
}
const actions = {
    /*
    注册的异步action
    */
    async register ({commit}, userInfo) {
        const result = await reqRegister(userInfo)
        if (result.code!==200) {
            throw new Error(result.data || '注册失败了')
        }
    },
    // 登录的异步action
    async login({commit},userInfo){
        const result = await reqLogin(userInfo)
        if(result.code === 200){
            commit('RECEIVE_LOGIN',result.data.token)
            setToken(result.data.token)
        }else{
            return Promise.reject(new Error('falied'))
        }
    },
    // 根据token获取用户信息的异步action
    async getUserInfo({commit,state}){
        const result = await reqUserInfo()
        if(result.code === 200){
            commit('RECEIVE_USERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('falied'))
        }
    },
    // 清空token和用户信息
    async resetUserInfo({commit}){
        // 先清空localStorage中token信息
        removeToken()   
        // 再清空state中信息
        commit('RESET_USERINFO')
    },
    // 退出登录
    async reqLogout({commit}){
        const result = await reqLogout()
        if(result.code === 200){
            // 如果清空服务器端用户信息后和token，同时也要清空state里的用户信息和token以及localStorage里的token
            removeToken()
            commit('RESET_USERINFO')
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}