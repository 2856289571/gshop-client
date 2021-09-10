/* 
    管理首页相关数据的vuex子模块
*/
import {
    reqBaseCategoryList,
    reqBanner,
    reqFloorList, 
    reqRecommandList
} from '../../api'

const state = {
    homeData:'我是home',
    // 获取到的categoryList是数组，初始化时最好就初始为数组，类型不要改变
    categoryList:[],
    bannerList:[],
    floorList:[],
    recommandList:[]
}
const mutations = {
    /* 
        接收保存三级分类列表信息
    */
    GETBASECATEGORYLIST(state,categoryList){
        // 只要前15项数据
        state.categoryList = categoryList.splice(0,15)
    },
    GETBANNER(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    },
    GETRECOMMANDLIST(state,recommandList){
        state.recommandList = recommandList
    }
}
const actions = {
    /* 
        发送请求获取三级分类列表信息
    */
    async getBaseCategoryList(context,state){
        const {commit} = context

        const result = await reqBaseCategoryList()
        // 如果请求成功，将数据传给mutations
        if(result.code === 200){
            const categoryList = result.data
            commit('GETBASECATEGORYLIST',categoryList)
        }
    },
    /* 
        获取首页广告轮播
    */
    async getBanner(context,state){
        const {commit} = context
        const result = await reqBanner()
        if(result.code === 200){
            const bannerList = result.data
            commit('GETBANNER',bannerList)
        }
    },
    /* 
        获取楼层信息数据
    */
   async getFloorList(context,state){
       let {commit} = context
       const result = await reqFloorList()
       if(result.code === 200){
            commit('GETFLOORLIST',result.data)
       }
   },
   async getRecommandList(context,state){
        let {commit} = context
        const result = await reqRecommandList()
        if(result.code === 200){
            commit('GETRECOMMANDLIST',result.data)
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