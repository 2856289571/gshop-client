import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        test:111111
    },
    mutations:{

    },
    actions:{

    },
    getters:{

    },
    // home的state将会映射到该state中
    modules:{
        home,
        user
    }
})
