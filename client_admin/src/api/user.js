import request from '@/utils/request'

// 获取用户列表
export function getUserList(data) {
  return request({
    url: '/admin/user/list',
    method: 'get',
    params: data
  })
}

// 登录
export function login(data) {
  return request({
    url: '/admin/auth/login',
    method: 'post',
    params: data
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: '/admin/auth/info',
    method: 'get',
    params: { token }
  })
}

// 登出
export function logout() {
  return request({
    url: '/admin/auth/logout',
    method: 'post'
  })
}

// 提现列表
export function cashApplyList(data) {
  return request({
    url: '/admin/order/cashApplyList',
    method: 'get',
    params: data
  })
}

// 订单明细
export function orderList(data) {
  return request({
    url: '/admin/order/orderList',
    method: 'get',
    params: data
  })
}

// 提现详情
export function applyCashDetail(data) {
  return request({
    url: '/admin/order/applyCashDetail',
    method: 'get',
    params: data
  })
}

// 审核提现
export function checkCash(data) {
  return request({
    url: '/admin/order/checkCash',
    method: 'post',
    params: data
  })
}

