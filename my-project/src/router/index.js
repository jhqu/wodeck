import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/Index";
import Newlist from '@/components/Newlist'
import SearchNew from '../components/SearchNew'
import ResultPage from '../components/ResultPage'
Vue.use(Router)

export default new Router({
  routes: [
   {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Newlist',
      name: 'Newlist',
      component: Newlist
    },
    {
      path: '/search',
      name: 'SearchNew',
      component: SearchNew
    },
    {
      path: '/result',
      name: 'ResultPage',
      component: ResultPage
    }
  ]
})
