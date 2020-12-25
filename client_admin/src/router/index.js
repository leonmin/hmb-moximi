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
    redirect: 'release/channel'
  }

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/ofdInfo',
  //   meta: { title: '用户中心', icon: 'user' },
  //   children: [
  //     {
  //       path: '/ofdInfo',
  //       name: 'ofdInfo',
  //       component: () => import('@/views/dashboard/ofdInfo'),
  //       meta: { title: '用户信息' }
  //     },
  //     {
  //       path: '/merchantList',
  //       name: 'merchantList',
  //       component: () => import('@/views/dashboard/index'),
  //       meta: { title: '用户列表' }
  //     },
  //     {
  //       path: '/lowerDetails',
  //       name: 'lowerDetails',
  //       component: () => import('@/views/dashboard/userDetails'),
  //       hidden: true,
  //       meta: { title: '下级用户明细' }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /**
   * 投放管理
   */
  {
    path: '/release',
    component: Layout,
    redirect: '/release/channel',
    name: 'release',
    meta: { title: '投放管理', icon: 'channel', roles: ['admin'] },
    children: [
      {
        path: 'channel',
        name: 'release/channel',
        meta: { title: '投放渠道管理' },
        component: () => import('@/views/mo-release/channel')
      },
      {
        path: 'analyse',
        name: 'release/analyse',
        meta: { title: '投放数据分析' },
        component: () => import('@/views/mo-release/analyse')
      }
    ]
  },
  /**
   * 广告管理
   */
  {
    path: '/advert',
    component: Layout,
    redirect: '/advert/advertiser',
    name: 'advert',
    meta: { title: '广告管理', icon: 'sale', roles: ['admin'] },
    children: [
      {
        path: 'advertiser',
        name: 'advertiser',
        meta: { title: '广告主管理' },
        component: () => import('@/views/mo-advert/advertiser')
      },
      {
        path: 'analyse',
        name: 'analyse',
        meta: { title: '广告数据分析' },
        component: () => import('@/views/mo-advert/analyse')
      }
    ]
  },
  /**
   * 产品配置
   */
  {
    path: '/config',
    component: Layout,
    redirect: '/config/banner',
    name: 'config',
    meta: { title: '产品配置', icon: 'config', roles: ['admin'] },
    children: [
      {
        path: 'banner',
        name: 'cbanner',
        meta: { title: '轮播图配置' },
        component: () => import('@/views/mo-config/banner')
      },
      {
        path: 'notice',
        name: 'notice',
        meta: { title: '公告配置' },
        component: () => import('@/views/mo-config/notice')
      },
      {
        path: 'bonus',
        name: 'bonus',
        meta: { title: '团队分红配置' },
        component: () => import('@/views/mo-config/bonus')
      },
      {
        path: 'task',
        name: 'task',
        meta: { title: '任务管理' },
        component: () => import('@/views/mo-config/task')
      },
      {
        path: 'site',
        name: 'site',
        meta: { title: '位置管理' },
        component: () => import('@/views/mo-config/site')
      },
      {
        path: 'pet',
        name: 'pet',
        meta: { title: '魔宠配置' },
        component: () => import('@/views/mo-config/pet')
      },
      {
        path: 'withdraw',
        name: 'withdraw',
        meta: { title: '提现配置' },
        component: () => import('@/views/mo-config/withdraw')
      },
      {
        path: 'green',
        name: 'green',
        meta: { title: '绿色通道统计' },
        component: () => import('@/views/greenChannel/greenChannelStat')
      },
      {
        path: 'couponopt',
        name: 'coupon-operation',
        meta: { title: '优惠券运营' },
        component: () => import('@/views/operation/couponOperation')
      },
      {
        path: 'coupons',
        name: 'coupons',
        meta: { title: '优惠券' },
        component: () => import('@/views/promotion/coupon/coupon'),
        children: [
          {
            path: 'list',
            name: 'coupon-list',
            component: () => import('@/views/promotion/coupon/couponList'),
            meta: { title: '优惠券列表' }
          },
          {
            path: 'add',
            name: 'coupon-add',
            component: () => import('@/views/promotion/coupon/couponListAdd'),
            meta: { title: '优惠券添加' }
          }
        ]
      },
      {
        path: 'cards',
        name: 'cards',
        meta: { title: '卡密' },
        component: () => import('@/views/promotion/cardPass/cardPass'),
        children: [
          {
            path: 'list',
            name: 'cards-list',
            component: () => import('@/views/promotion/cardPass/cardPassList'),
            meta: { title: '卡密列表' }
          },
          {
            path: 'add',
            name: 'cards-add',
            component: () => import('@/views/promotion/cardPass/cardPassAdd'),
            meta: { title: '卡密添加' }
          }
        ]
      },
      {
        path: 'activity',
        name: 'activity',
        meta: { title: '活动卡密' },
        component: () =>
          import('@/views/promotion/cardPass-activity/cardPassActivity'),
        children: [
          {
            path: 'list',
            name: 'activity-list',
            component: () =>
              import('@/views/promotion/cardPass-activity/cardPassActivityList'),
            meta: { title: '活动卡密列表' }
          },
          {
            path: 'add',
            name: 'activity-add',
            component: () =>
              import('@/views/promotion/cardPass-activity/cardPassActivityAdd'),
            meta: { title: '活动卡密添加' }
          }
        ]
      },
      {
        path: 'partners',
        name: 'partners',
        meta: { title: '合伙人' },
        redirect: '/config/cards/list',
        component: () => import('@/views/promotion/cardPass/cardPass'),
        children: [
          {
            path: 'list',
            name: 'partners-list',
            component: () => import('@/views/partner/partnerList'),
            meta: { title: '合伙人列表' }
          },
          {
            path: 'add',
            name: 'partners-add',
            component: () => import('@/views/partner/addPartner'),
            meta: { title: '合伙人添加' }
          }
        ]
      },
      {
        path: 'centers',
        name: 'centers',
        meta: { title: '配置中心' },
        component: () => import('@/views/promotion/cardPass/cardPass'),
        children: [
          {
            path: 'renew',
            name: 'centers-renew',
            component: () => import('@/views/configCentre/memberCardRenew'),
            meta: { title: '会员卡续费配置' }
          },
          {
            path: 'royalty',
            name: 'centers-royalty',
            component: () => import('@/views/configCentre/pushMoney'),
            meta: { title: '提成设置' }
          },
          {
            path: 'coupon',
            name: 'centers-coupon',
            component: () => import('@/views/configCentre/couponGiveOut'),
            meta: { title: '优惠券发放配置' }
          },
          {
            path: 'sensitive',
            name: 'coupon-sensitvie',
            component: () => import('@/views/configCentre/sensitiveConfig'),
            meta: { title: '敏感词配置' }
          }
        ]
      }
    ]
  },
  /**
   * 用户数数据
   */
  {
    path: '/person',
    component: Layout,
    redirect: '/person/newuser',
    name: 'person',
    meta: { title: '用户数据', icon: 'partner', roles: ['admin'] },
    children: [
      {
        path: 'newuser',
        name: 'newuser',
        meta: { title: '新用户统计表' },
        component: () => import('@/views/mo-person/newuser')
      },
      {
        path: 'alluser',
        name: 'alluser',
        meta: { title: '总用户统计表' },
        component: () => import('@/views/mo-person/alluser')
      },
      {
        path: 'detail',
        name: 'detail',
        meta: { title: '用户明细' },
        component: () => import('@/views/mo-person/detail')
      }
    ]
  },

  /**
   * 产品数据
   */
  {
    path: '/product',
    component: Layout,
    redirect: '/product/order-detail',
    name: 'product',
    meta: { title: '产品数据', icon: 'data', roles: ['admin'] },
    children: [
      {
        path: 'order-detail',
        name: 'order-detail',
        meta: { title: '魔小秘订单明细' },
        component: () => import('@/views/mo-product/order-detail')
      },
      {
        path: 'order-analyse',
        name: 'order-analyse',
        meta: { title: '魔小秘订单统计' },
        component: () => import('@/views/mo-product/order-analyse')
      },
      {
        path: 'analyse-answer',
        name: 'analyse-answer',
        meta: { title: '魔小秘接听统计' },
        component: () => import('@/views/mo-product/analyse-answer')
      },
      {
        path: 'analyse-vip',
        name: 'analyse-vip',
        meta: { title: '魔小秘会员统计' },
        component: () => import('@/views/mo-product/analyse-vip')
      },
      {
        path: 'analyse-bonus',
        name: 'analyse-bonus',
        meta: { title: '好友分红统计' },
        component: () => import('@/views/mo-product/analyse-bonus')
      },
      {
        path: 'analyse-task',
        name: 'analyse-task',
        meta: { title: '任务统计' },
        component: () => import('@/views/mo-product/analyse-task')
      },
      {
        path: 'analyse-mb',
        name: 'analyse-mb',
        meta: { title: '魔币统计' },
        component: () => import('@/views/mo-product/analyse-mb')
      },
      {
        path: 'analyse-mz',
        name: 'analyse-mz',
        meta: { title: '魔钻统计' },
        component: () => import('@/views/mo-product/analyse-mz')
      },
      {
        path: 'analyse-pet',
        name: 'analyse-pet',
        meta: { title: '魔宠统计' },
        component: () => import('@/views/mo-product/analyse-pet')
      }
      // {
      //   path: 'analyse-push',
      //   name: 'analyse-push',
      //   meta: { title: '推送统计' },
      //   component: () => import('@/views/mo-product/analyse-push')
      // }
    ]
  },
  /**
   * 财务数据
   */
  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/income-analyse',
    name: 'finance',
    meta: { title: '财务统计', icon: 'yunying', roles: ['admin'] },
    children: [
      {
        path: 'income-analyse',
        name: 'income-analyse',
        meta: { title: '收支统计' },
        component: () => import('@/views/mo-finance/income-analyse')
      },
      {
        path: 'withdraw-detail',
        name: 'withdraw-detail',
        meta: { title: '提现明细' },
        component: () => import('@/views/mo-finance/withdraw-detail')
      },
      {
        path: 'withdraw-analyse',
        name: 'withdraw-analyse',
        meta: { title: '提现统计' },
        component: () => import('@/views/mo-finance/withdraw-analyse')
      }
    ]
  },
  // {
  //   path: '/finace/income-analyse',
  //   component: Layout,
  //   redirect: '/finance/income-analyse',
  //   name: 'xxxxx',
  //   meta: { title: '----', icon: 'sale', roles: ['admin'] }
  // },

  /*
  促销
   */
  //   {
  //     path: '/promotion',
  //     component: Layout,
  //     redirect: '/promotion/coupon/couponList',
  //     name: 'promotion',
  //     meta: { title: '促销', icon: 'sale', roles: ['admin'] },
  //     children: [
  //       {
  //         path: 'coupon',
  //         name: 'coupon',
  //         redirect: '/promotion/coupon/couponList',
  //         meta: { title: '优惠券' },
  //         component: () => import('@/views/promotion/coupon/coupon'),
  //         children: [
  //           {
  //             path: 'couponList',
  //             name: 'couponList',
  //             component: () => import('@/views/promotion/coupon/couponList'),
  //             meta: { title: '优惠券列表' }
  //           },
  //           {
  //             path: 'couponsDetails',
  //             name: 'couponsDetails',
  //             hidden: true,
  //             meta: { title: '优惠券详情' },
  //             component: () => import('@/views/promotion/coupon/couponsDetails')
  //           },
  //           {
  //             path: 'couponListAdd',
  //             name: 'couponListAdd',
  //             component: () => import('@/views/promotion/coupon/couponListAdd'),
  //             meta: { title: '优惠券添加' }
  //           }
  //         ]
  //       },
  //       {
  //         path: '/cardPass',
  //         name: 'cardPass',
  //         redirect: '/cardPass/cardPassList',
  //         meta: { title: '卡密' },
  //         component: () => import('@/views/promotion/cardPass/cardPass'),
  //         children: [
  //           {
  //             path: 'cardPassList',
  //             name: 'cardPassList',
  //             component: () => import('@/views/promotion/cardPass/cardPassList'),
  //             meta: { title: '卡密列表' }
  //           },
  //           {
  //             path: 'cardPassAdd',
  //             name: 'cardPassAdd',
  //             component: () => import('@/views/promotion/cardPass/cardPassAdd'),
  //             meta: { title: '卡密添加' }
  //           },
  //           {
  //             path: 'cardPassDetail',
  //             name: 'cardPassDetail',
  //             component: () =>
  //               import('@/views/promotion/cardPass/cardPassDetail'),
  //             meta: { title: '卡密详情' },
  //             hidden: true
  //           }
  //         ]
  //       },
  //       {
  //         path: '/cardPassActivity',
  //         name: 'cardPassActivity',
  //         redirect: '/cardPassActivity/cardPassActivityList',
  //         meta: { title: '活动卡密' },
  //         component: () =>
  //           import('@/views/promotion/cardPass-activity/cardPassActivity'),
  //         children: [
  //           {
  //             path: 'cardPassActivityList',
  //             name: 'cardPassActivityList',
  //             component: () =>
  //               import('@/views/promotion/cardPass-activity/cardPassActivityList'),
  //             meta: { title: '活动卡密列表' }
  //           },
  //           {
  //             path: 'cardPassActivityAdd',
  //             name: 'cardPassActivityAdd',
  //             component: () =>
  //               import('@/views/promotion/cardPass-activity/cardPassActivityAdd'),
  //             meta: { title: '活动卡密添加' }
  //           },
  //           {
  //             path: 'cardPassActivityDetail',
  //             name: 'cardPassActivityDetail',
  //             component: () =>
  //               import('@/views/promotion/cardPass-activity/cardPassActivityDetail'),
  //             meta: { title: '活动卡密详情' },
  //             hidden: true
  //           }
  //         ]
  //       }
  //     ]
  //   },
  // 订单中心
  // {
  //   path: '/order',
  //   component: Layout,
  //   redirect: '/order/list',
  //   name: 'oder',
  //   meta: { title: '订单中心', icon: 'order' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'list',
  //       component: () => import('@/views/order/order'),
  //       meta: { title: '订单明细' }
  //     }
  //   ]
  // },
  //   /*
  //  提现管理
  //   */
  //   {
  //     path: '/api',
  //     component: Layout,
  //     redirect: '/api/applyWithdraw',
  //     name: 'Api',
  //     meta: { title: '财务审核', icon: 'financial' },
  //     children: [
  //       {
  //         path: 'applyWithdraw',
  //         name: 'applyWithdraw',
  //         component: () => import('@/views/financial/index'),
  //         meta: { title: '提现申请' }
  //       },
  //       {
  //         path: 'reviewDetails',
  //         name: 'reviewDetails',
  //         hidden: true,
  //         component: () => import('@/views/financial/reviewDetails'),
  //         meta: { title: '提现审核详情' }
  //       },
  //       {
  //         path: 'withdrawalDetails',
  //         name: 'withdrawalDetails',
  //         hidden: true,
  //         component: () => import('@/views/financial/withdrawalDetails'),
  //         meta: { title: '提现详情' }
  //       }
  //     ]
  //   },
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
  // /* 配置中心*/
  // {
  //   path: '/configCentre',
  //   component: Layout,
  //   redirect: '/configCentre/memberCardRenew',
  //   name: 'configCentre',
  //   meta: {
  //     title: '配置中心',
  //     icon: 'config',
  //     roles: ['admin']
  //   },
  //   children: [
  //     {
  //       path: 'memberCardRenew',
  //       name: 'memberCardRenew',
  //       component: () => import('@/views/configCentre/memberCardRenew'),
  //       meta: { title: '会员卡续费配置' }
  //     },
  //     {
  //       path: 'pushMoney',
  //       name: 'pushMoney',
  //       component: () => import('@/views/configCentre/pushMoney'),
  //       meta: { title: '提成设置' }
  //     },
  //     {
  //       path: 'couponGiveOut',
  //       name: 'couponGiveOut',
  //       component: () => import('@/views/configCentre/couponGiveOut'),
  //       meta: { title: '优惠券发放配置' }
  //     },
  //     {
  //       path: 'sensitiveConfig',
  //       name: 'sensitiveConfig',
  //       component: () => import('@/views/configCentre/sensitiveConfig'),
  //       meta: { title: '敏感词配置' }
  //     }
  //   ]
  // },
  // /* 绿色通道*/
  // {
  //   path: '/Greenchannel',
  //   component: Layout,
  //   redirect: '/Greenchannel/greenChannelStat',
  //   name: 'Greenchannel',
  //   meta: {
  //     title: '绿色通道管理',
  //     icon: 'green',
  //     roles: ['admin']
  //   },
  //   children: [
  //     {
  //       path: 'greenChannelStat',
  //       name: 'greenChannelStat',
  //       component: () => import('@/views/greenChannel/greenChannelStat'),
  //       meta: { title: '绿色通道统计' }
  //     },
  //     {
  //       path: 'greenChannel',
  //       name: 'greenChannel',
  //       hidden: true,
  //       component: () => import('@/views/greenChannel/greenChannel'),
  //       meta: { title: '绿色通道' }
  //     }
  //   ]
  // },
  // /* 渠道管理*/
  // {
  //   path: '/channel',
  //   component: Layout,
  //   redirect: '/channel/channelIndex',
  //   name: 'channel',
  //   meta: {
  //     title: '渠道管理',
  //     icon: 'channel',
  //     roles: ['admin']
  //   },
  //   children: [
  //     {
  //       path: 'channelIndex',
  //       name: 'channelIndex',
  //       component: () => import('@/views/channel/index'),
  //       meta: { title: '渠道列表' }
  //     },
  //     {
  //       path: 'channelAdd',
  //       name: 'channelAdd',
  //       component: () => import('@/views/channel/channelAdd'),
  //       meta: { title: '渠道添加' }
  //     },
  //     {
  //       path: 'channelData',
  //       name: 'channelData',
  //       hidden: true,
  //       component: () => import('@/views/channel/channelData'),
  //       meta: { title: '渠道数据' }
  //     },
  //     {
  //       path: 'channelStatistical',
  //       name: 'channelStatistical',
  //       component: () => import('@/views/channel/channelStatistical'),
  //       meta: { title: '渠道统计' }
  //     }
  //   ]
  // },
  // // 合伙人
  // {
  //   path: '/partner',
  //   component: Layout,
  //   redirect: '/partner/partnerList',
  //   name: 'partner',
  //   meta: {
  //     title: '合伙人中心',
  //     icon: 'partner',
  //     roles: ['admin']
  //   },
  //   children: [
  //     {
  //       path: 'partnerList',
  //       name: 'partnerList',
  //       component: () => import('@/views/partner/partnerList'),
  //       meta: { title: '合伙人列表' }
  //     },
  //     {
  //       path: 'addPartner',
  //       name: 'addPartner',
  //       component: () => import('@/views/partner/addPartner'),
  //       meta: { title: '合伙人添加' }
  //     },
  //     {
  //       path: 'partnerDetail',
  //       name: 'partnerDetail',
  //       component: () => import('@/views/partner/partnerDetail'),
  //       meta: { title: '合伙人详情' },
  //       hidden: true
  //     },
  //     {
  //       path: 'partnerBelowList',
  //       name: 'partnerBelowList',
  //       component: () => import('@/views/partner/partnerBelowList'),
  //       meta: { title: '合伙人下级用户明细' },
  //       hidden: true
  //     },
  //     {
  //       path: 'partnerData',
  //       name: 'partnerData',
  //       component: () => import('@/views/partnerChart/partnerData'),
  //       meta: { title: '合伙人下级统计' },
  //       hidden: true
  //     }
  //   ]
  // },
  // // 运营
  // {
  //   path: '/operation',
  //   component: Layout,
  //   redirect: '/operation/couponOperation',
  //   name: 'operation',
  //   meta: {
  //     title: '运营',
  //     icon: 'yunying',
  //     roles: ['admin']
  //   },
  //   children: [
  //     {
  //       path: 'couponOperation',
  //       name: 'couponOperation',
  //       component: () => import('@/views/operation/couponOperation'),
  //       meta: { title: '优惠券运营' }
  //     },
  //     {
  //       path: 'couponOperationLook',
  //       name: 'couponOperationLook',
  //       component: () => import('@/views/operation/couponOperationLook'),
  //       meta: { title: '查看' },
  //       hidden: true
  //     }
  //   ]
  // },
  // // 用户反馈
  // {
  //   path: '/userFeedback',
  //   component: Layout,
  //   redirect: '/userFeedback/userFeedbackList',
  //   name: 'userFeedback',
  //   meta: {
  //     title: '用户反馈',
  //     icon: 'feedback',
  //     roles: ['admin']
  //   },
  //   children: [
  //     {
  //       path: 'userFeedbackList',
  //       name: 'userFeedbackList',
  //       component: () => import('@/views/userFeedback/list'),
  //       meta: { title: '用户反馈' }
  //     },
  //     {
  //       path: 'userFeekbackDetails',
  //       name: 'userFeekbackDetails',
  //       component: () => import('@/views/userFeedback/userFeekbackDetails'),
  //       meta: { title: '用户反馈详情' },
  //       hidden: true
  //     }
  //   ]
  // },
  // // banner管理
  // {
  //   path: '/banner',
  //   component: Layout,
  //   redirect: '/banner/index',
  //   name: 'banner',
  //   meta: {
  //     title: 'banner管理',
  //     icon: 'banner',
  //     roles: ['admin']
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'index',
  //       component: () => import('@/views/banner/index'),
  //       meta: { title: 'banner管理' }
  //     }
  //   ]
  // },
  // // 数据统计
  // {
  //   path: '/dataStatistics',
  //   component: Layout,
  //   redirect: '/dataStatistics/dataReport',
  //   name: 'dataStatistics',
  //   meta: {
  //     title: '数据统计',
  //     icon: 'data',
  //     roles: ['admin']
  //   },
  //   children: [
  //     // {
  //     //   path: 'dayOrder',
  //     //   name: 'dayOrder',
  //     //   component: () => import('@/views/dataStatistics/dayOrder'),
  //     //   meta: { title: '日订单统计' }
  //     // },
  //     // {
  //     //   path: 'statisticsMap',
  //     //   name: 'statisticsMap',
  //     //   component: () => import('@/views/dataStatistics/statisticsMap'),
  //     //   meta: { title: '数据统计' }
  //     // },
  //     {
  //       path: 'dataReport',
  //       name: 'dataReport',
  //       component: () => import('@/views/dataStatistics/dataReport'),
  //       meta: { title: '数据报告' }
  //     },
  //     {
  //       path: 'financialStat',
  //       name: 'financialStat',
  //       component: () => import('@/views/dataStatistics/financialStat'),
  //       meta: { title: '财务报表' }
  //     },
  //     {
  //       path: 'VirtualStatistics',
  //       name: 'VirtualStatistics',
  //       component: () => import('@/views/dataStatistics/VirtualStatistics'),
  //       meta: { title: '虚拟通讯录统计' }
  //     },
  //     {
  //       path: 'dataChart',
  //       name: 'dataChart',
  //       component: () => import('@/views/dataStatistics/dataChart'),
  //       meta: { title: '续费分析' }
  //     },
  //     {
  //       path: 'paySatistical',
  //       name: 'paySatistical',
  //       component: () => import('@/views/dataStatistics/paySatistical'),
  //       meta: { title: '付费分析' }
  //     },
  //     {
  //       path: 'pushData',
  //       name: 'pushData',
  //       component: () => import('@/views/dataStatistics/pushData'),
  //       meta: { title: '推送数据' }
  //     },
  //     {
  //       path: 'pushClickData',
  //       name: 'pushClickData',
  //       component: () => import('@/views/dataStatistics/pushClickData'),
  //       meta: { title: '推送点击统计' }
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
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
