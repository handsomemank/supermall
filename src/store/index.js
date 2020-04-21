import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getter'

// 安装插件
Vue.use(Vuex)

// 创建store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations,
    // mucation唯一的目的就是修改state中的状态
    // mucation中的而每一个方法尽可能完成的事件单一
  actions,
  getters
})

// 3 挂载Vue实例上
export default store