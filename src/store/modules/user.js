/* 
    管理登录用户数据的vuex子模块
*/

import {getUserTempId} from '@/util/userAbout'

const state = {
    userTempId:getUserTempId()  // 储存用户临时标记
}
const mutations = {}
const actions = {}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}