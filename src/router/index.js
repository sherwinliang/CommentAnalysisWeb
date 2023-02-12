import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import TrendCharts from '@/components/TrendCharts'
import SaleCharts from '@/components/SaleCharts'
import DataManage from '@/components/DataManage'
import RangeAnalysis from '@/components/RangeAnalysis'
import UserMana from '@/components/UserMana'
import CategoryAnalysis from '@/components/CategoryAnalysis'
import Chart3D from '@/components/chart3D'
import Chart3D2 from '@/components/chart3D2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      hidden: true,
      component: Login
    }, {
      path: '/home',
      name: '',
      component: Home,
      hidden: true
    }, {
      path: '/home',
      component: Home,
      name: '数据分析',
      iconCls: 'fa fa-file-text-o',
      children: [
        {
          path: '/analysis/sales',
          name: '商品销量排行',
          component: SaleCharts,
          meta: {
            keepAlive: true
          }
        }, {
          path: '/analysis/trend',
          name: '商品评分趋势',
          component: TrendCharts,
          meta: {
            keepAlive: false
          }
        }, {
          path: '/analysis/statistics',
          name: '商品评分统计',
          component: RangeAnalysis,
          meta: {
            keepAlive: false
          }
        }, {
          path: '/analysis/category',
          name: '商品类型-销量分析',
          component: CategoryAnalysis,
          meta: {
            keepAlive: false
          }
        }
      ]
    }, {
      path: '/home',
      component: Home,
      name: '用户管理',
      children: [
        {
          path: '/user',
          iconCls: 'fa fa-user-o',
          name: '用户管理',
          component: UserMana
        }
      ]
    }, {
      path: '/home',
      component: Home,
      name: '评论管理',
      children: [
        {
          path: '/dataManage',
          iconCls: 'fa fa-reorder',
          name: '评论管理',
          component: DataManage
        }
      ]
    }, {
      path: '/home',
      component: Home,
      name: '词云图',
      children: [
        {
          path: '/chart3D',
          iconCls: 'el-icon-search',
          name: '词云图',
          component: Chart3D
        }
      ]
    }
  ]
})
