import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/merchantList',
    meta: { title: '用户中心', icon: 'dashboard' },
    children: [
      {
        path: '/merchantList',
        name: 'merchantList',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '用户列表' }
      },
      {
        path: '/lowerDetails',
        name: 'lowerDetails',
        component: () => import('@/views/dashboard/userDetails'),
        hidden: true,
        meta: { title: '下级用户明细' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /*
  促销
   */
  {
    path: '/promotion',
    component: Layout,
    redirect: '/promotion/coupon/couponList',
    name: 'promotion',
    meta: { title: '促销', icon: 'nested', roles: ['admin'] },
    children: [
      {
        path: 'coupon',
        name: 'coupon',
        redirect: '/promotion/coupon/couponList',
        meta: { title: '优惠券' },
        component: () => import('@/views/promotion/coupon/coupon'),
        children: [
          {
            path: 'couponList',
            name: 'couponList',
            component: () => import('@/views/promotion/coupon/couponList'),
            meta: { title: '优惠券列表' }
          },
          {
            path: 'couponsDetails',
            name: 'couponsDetails',
            hidden: true,
            meta: { title: '优惠券详情' },
            component: () => import('@/views/promotion/coupon/couponsDetails')
          },
          {
            path: 'couponListAdd',
            name: 'couponListAdd',
            component: () => import('@/views/promotion/coupon/couponListAdd'),
            meta: { title: '优惠券添加' }
          }
        ]
      },
      {
        path: '/cardPass',
        name: 'cardPass',
        redirect: '/cardPass/cardPassList',
        meta: { title: '卡密' },
        component: () => import('@/views/promotion/cardPass/cardPass'),
        children: [
          {
            path: 'cardPassList',
            name: 'cardPassList',
            component: () => import('@/views/promotion/cardPass/cardPassList'),
            meta: { title: '卡密列表' }
          },
          {
            path: 'cardPassAdd',
            name: 'cardPassAdd',
            component: () => import('@/views/promotion/cardPass/cardPassAdd'),
            meta: { title: '卡密添加' }
          },
          {
            path: 'cardPassDetail',
            name: 'cardPassDetail',
            component: () => import('@/views/promotion/cardPass/cardPassDetail'),
            meta: { title: '卡密详情' },
            hidden: true
          }
        ]
      }
    ]
  },
  // 订单中心
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'oder',
    meta: { title: '订单中心', icon: 'table' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/order/order'),
        meta: { title: '订单明细' }
      }
    ]
  },
  /*
 提现管理
  */
  {
    path: '/api',
    component: Layout,
    redirect: '/api/applyWithdraw',
    name: 'Api',
    meta: { title: '财务审核', icon: 'example' },
    children: [
      {
        path: 'applyWithdraw',
        name: 'applyWithdraw',
        component: () => import('@/views/financial/index'),
        meta: { title: '提现申请审核' }
      },
      {
        path: 'reviewDetails',
        name: 'reviewDetails',
        hidden: true,
        component: () => import('@/views/financial/reviewDetails'),
        meta: { title: '提现审核详情' }
      }
    ]
  },
  /*
数据统计
 */
  // {
  //   path: '/stat',
  //   component: Layout,
  //   meta: {
  //     title: '数据统计',
  //     icon: 'nested',
  //     roles: ['admin']
  //   },
  //   children: [
  //     {
  //       path: 'platform',
  //       name: 'platform',
  //       component: () => import('@/views/stat/platform'),
  //       meta: {
  //         title: '平台数据统计'
  //       }
  //     },
  //     {
  //       path: 'financial',
  //       name: 'financial',
  //       component: () => import('@/views/stat/financial'),
  //       meta: {
  //         title: '财务数据统计'
  //       }
  //     }
  //   ]
  // },
  /* 配置中心*/
  {
    path: '/configCentre',
    component: Layout,
    redirect: '/configCentre/memberCardRenew',
    name: 'configCentre',
    meta: {
      title: '配置中心',
      icon: 'nested',
      roles: ['admin']
    },
    children: [
      {
        path: 'memberCardRenew',
        name: 'memberCardRenew',
        component: () => import('@/views/configCentre/memberCardRenew'),
        meta: { title: '会员卡续费配置' }
      },
      {
        path: 'pushMoney',
        name: 'pushMoney',
        component: () => import('@/views/configCentre/pushMoney'),
        meta: { title: '提成设置' }
      }
    ]
  },
  // 合伙人
  {
    path: '/partner',
    component: Layout,
    redirect: '/partner/partnerList',
    name: 'partner',
    meta: {
      title: '合伙人中心',
      icon: 'nested',
      roles: ['admin']
    },
    children: [
      {
        path: 'partnerList',
        name: 'partnerList',
        component: () => import('@/views/partner/partnerList'),
        meta: { title: '合伙人列表' }
      },
      {
        path: 'addPartner',
        name: 'addPartner',
        component: () => import('@/views/partner/addPartner'),
        meta: { title: '合伙人添加' }
      },
      {
        path: 'partnerDetail',
        name: 'partnerDetail',
        component: () => import('@/views/partner/partnerDetail'),
        meta: { title: '合伙人详情' },
        hidden: true
      },
      {
        path: 'partnerBelowList',
        name: 'partnerBelowList',
        component: () => import('@/views/partner/partnerBelowList'),
        meta: { title: '合伙人下级用户明细' },
        hidden: true
      }
    ]
  },
  // 运营
  {
    path: '/operation',
    component: Layout,
    redirect: '/operation/couponOperation',
    name: 'operation',
    meta: {
      title: '运营',
      icon: 'example',
      roles: ['admin']
    },
    children: [
      {
        path: 'couponOperation',
        name: 'couponOperation',
        component: () => import('@/views/operation/couponOperation'),
        meta: { title: '优惠券运营' }
      },
      {
        path: 'couponOperationLook',
        name: 'couponOperationLook',
        component: () => import('@/views/operation/couponOperationLook'),
        meta: { title: '查看' },
        hidden: true
      }
    ]
  },
  // {
  //   path: '/tenant',
  //   component: Layout,
  //   redirect: '/tenant/list',
  //   name: 'Tenant',
  //   meta: {
  //     title: '充值管理',
  //     icon: 'nested',
  //     roles: ['admin']
  //   },
  //   children: [{
  //     path: 'list',
  //     component: () => import('@/views/user/list'), // Parent router-view
  //     name: 'List',
  //     meta: {
  //       title: '用户列表',
  //       icon: 'nested',
  //       roles: ['admin']
  //     }
  //   },
  //   {
  //     path: 'recharge',
  //     component: () => import('@/views/user/recharge'), // Parent router-view
  //     name: 'Recharge',
  //     hidden: true,
  //     meta: {
  //       title: '充值',
  //       icon: 'nested',
  //       roles: ['admin']
  //     }
  //   },
  //   {
  //     path: 'rechargeDetail',
  //     component: () => import('@/views/user/rechargeDetail'), // Parent router-view
  //     name: 'rechargeDetail',
  //     hidden: true,
  //     meta: {
  //       title: '充值详情',
  //       roles: ['admin']
  //     }
  //   },
  //   {
  //     path: 'bill',
  //     component: () => import('@/views/user/bill'), // Parent router-view
  //     name: 'Nested',
  //     meta: {
  //       title: '充值审核',
  //       icon: 'nested',
  //       roles: ['admin']
  //     }
  //   },
  //   // {
  //   //   path: 'realNameAuth/:realNameAuthType',
  //   //   component: () => import('@/views/user/realNameAuth'), // Parent router-view
  //   //   name: 'RealNameAuth',
  //   //   hidden: true,
  //   //   meta: {
  //   //     title: '',
  //   //     icon: 'nested',
  //   //     roles: ['admin']
  //   //   }
  //   // },
  //   // {
  //   //   path: 'realNameAuth/1',
  //   //   meta: {
  //   //     icon: 'nested',
  //   //     title: '个人实名认证审核'
  //   //   }
  //   // },
  //   // {
  //   //   path: 'realNameAuth/2',
  //   //   meta: {
  //   //     icon: 'nested',
  //   //     title: '企业实名认证审核'
  //   //   }
  //   // },
  //   {
  //     path: 'userDetails',
  //     component: () => import('@/views/user/userDetails'), // Parent router-view
  //     name: 'DserDetails',
  //     hidden: true,
  //     meta: {
  //       title: '用户详情',
  //       icon: 'nested',
  //       roles: ['admin']
  //     }
  //   }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
