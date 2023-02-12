import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import SaleCharts from '@/components/SaleCharts'
import DataManage from '@/components/DataManage'
import UserMana from '@/components/UserMana'
import Chart3D from '@/components/chart3D'
import CategoryCharts from '@/components/CategoryCharts'
import TrendCharts from '@/components/TrendCharts'
import AverageCharts from '@/components/AverageCharts'
import CategoryTrendCharts from '@/components/CategoryTrendCharts'
import PercentageCharts from '@/components/PercentageCharts'
import CommentNumTrendCharts from '@/components/CommentNumTrendCharts'

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
      name: '销量分析',
      iconCls: 'fa fa-file-text-o',
      children: [
        {
          path: '/analysis/sales',
          name: '商品销量分析',
          component: SaleCharts
        }, {
          path: '/analysis/categories',
          name: '商品类别销量分析',
          component: CategoryCharts
        }
      ]
    }, {
      path: '/home',
      component: Home,
      name: '平均评分分析',
      iconCls: 'fa fa-file-text-o',
      children: [
        {
          path: '/analysis/average',
          name: '各商品平均分分析',
          component: AverageCharts
        }, {
          path: '/analysis/year-trend',
          name: '商品年度趋势分析',
          component: TrendCharts
        }, {
          path: '/analysis/categories-trend',
          name: '商品类别年度趋势分析',
          component: CategoryTrendCharts
        }
      ]
    }, {
      path: '/home',
      component: Home,
      name: '评论占比分析',
      iconCls: 'fa fa-file-text-o',
      children: [
        {
          path: '/analysis/percentage',
          name: '评论占比分析',
          component: PercentageCharts
        }
      ]
    }, {
      path: '/home',
      component: Home,
      name: '评论数变化趋势分析',
      iconCls: 'fa fa-file-text-o',
      children: [
        {
          path: '/analysis/comment-num-trend',
          name: '评论数变化趋势分析',
          component: CommentNumTrendCharts
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
