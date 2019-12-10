import Vue from 'vue'
import Vuex from 'vuex'
// Vue.use(Vuex)
if (!window.Vuex) Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    categoryId: 0
  },
  mutations: {
    handleCategoryId: (state, value) => {
      state.categoryId = value
    }
  },
  getters: {
    getCategoryId: state => {
      return state.categoryId
    }
  },
  actions: {
  },
  modules: {
  }
})
