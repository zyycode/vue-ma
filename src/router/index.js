import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../pages/index'
import DetailPage from '../pages/detail'
import DetailAnaPage from '../pages/details/analysis'
import DetailCouPage from '../pages/details/count'
import DetailForPage from '../pages/details/forecast'
import DetailPubPage from '../pages/details/publish'
import OrderList from '../pages/orderList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/orderlist',
      component: OrderList
    },
    {
      path: '/detail',
      component: DetailPage,
      redirect: '/detail/analysis',
      children: [
        {
          path: 'analysis',
          component: DetailAnaPage
        },
        {
          path: 'count',
          component: DetailCouPage
        },
        {
          path: 'forecast',
          component: DetailForPage
        },
        {
          path: 'publish',
          component: DetailPubPage
        }
      ]
    },
    {
      path: '/vue/', redirect: '/' 
    }
  ]
})
