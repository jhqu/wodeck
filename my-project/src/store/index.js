import Vue from 'vue'
import Vuex from 'vuex'
import counter from './modules/counter'
import List from './modules/List'
import Category from './modules/Category'

Vue.use(Vuex)
export default new Vuex.Store( {
  modules:{
    counter,
    List,
    Category

  }
})
