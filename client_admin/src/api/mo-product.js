import request from '@/utils/request'

// 魔宠统计接口
export function mcStatistics(data) {
  return request({
    url: '/admin/productData/mcStatistics',
    method: 'get',
    params: data
  })
}
// 魔币统计接口
export function mBStatistics(data) {
  return request({
    url: '/admin/productData/mBStatistics',
    method: 'get',
    params: data
  })
}

// 魔钻统计接口
export function mzStatistics(data) {
  return request({
    url: '/admin/productData/mzStatistics',
    method: 'get',
    params: data
  })
}
// 魔小秘会员统计接口
export function mxmVipStatistics(data) {
  return request({
    url: '/admin/productData/mxmVipStatistics',
    method: 'get',
    params: data
  })
}

// 任务统计接口
export function taskStatistics(data) {
  return request({
    url: '/admin/productData/taskStatistics',
    method: 'get',
    params: data
  })
}

// 魔小秘接听统计接口
export function mxmCallStatistics(data) {
  return request({
    url: '/admin/productData/mxmCallStatistics',
    method: 'get',
    params: data
  })
}

// 魔小秘订单明细接口
export function orderList(data) {
  return request({
    url: '/admin/productData/orderList',
    method: 'get',
    params: data
  })
}

// 魔小秘订单统计接口
export function orderStatistics(data) {
  return request({
    url: '/admin/productData/orderStatistics',
    method: 'get',
    params: data
  })
}

// 好友分红统计接口
export function friendProfitStatistics(data) {
  return request({
    url: '/admin/productData/friendProfitStatistics',
    method: 'get',
    params: data
  })
}
