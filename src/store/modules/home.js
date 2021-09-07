/* 
    管理首页相关数据的vuex子模块
*/
import {reqBaseCategoryList} from '../../api'

const state = {
    homeData:'我是home',
    categoryList:''
}
const mutations = {
    /* 
        接收保存三级分类列表信息
    */
    GETBASECATEGORYLIST(state,categoryList){
        // 只要前15项数据
        state.categoryList = categoryList.splice(0,15)
    }
}
const actions = {
    async getBaseCategoryList(context,state){
        const {commit} = context
        /* 
            发送请求获取三级分类列表信息
        */
        const result = await reqBaseCategoryList()
        // 如果请求成功，将数据传给mutations
        if(result.code === 200){
            const categoryList = result.data
            commit('GETBASECATEGORYLIST',categoryList)
        }
    }
}
const getters = {}

// vuex子模块不需要构造函数，直接暴露一个含对应属性的对象即可
export default {
    state,
    mutations,
    actions,
    getters
}