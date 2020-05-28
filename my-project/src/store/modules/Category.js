import ajax from '@/ajax/Category'
const state = {
  categories:[]
}

const getters = {
  categories:state =>state.categories
}
const mutations = {
  setCateList(state,categories){
    state.categories = categories
  }
}
const actions = {
  getCateList({commit}, payload){
    ajax.getCateList(categories =>{
      commit('setCateList',categories)
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
