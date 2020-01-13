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

// 获取下级用户列表
export function partnerSubUserDetails(data) {
  return request({
    url: '/admin/user/partnerSubUserDetails',
    method: 'get',
    params: data
  })
}

// 提现历史记录
export function cashHistoryApplyList(data) {
  return request({
    url: '/admin/order/cashHistoryApplyList',
    method: 'get',
    params: data
  })
}

// 设置合伙人
export function setPartner(data) {
  return request({
    url: '/admin/user/setPartner',
    method: 'post',
    params: data
  })
}

// 删除用户
export function deleteUser(data) {
  return request({
    url: '/admin/user/deleteUser',
    method: 'post',
    params: data
  })
}

// 查看用户详情
export function userDetail(data) {
  return request({
    url: '/admin/user/userDetail',
    method: 'get',
    params: data
  })
}

// 获取合伙人配置
export function partnerProfitConfig(data) {
  return request({
    url: '/admin/user/partnerProfitConfig',
    method: 'get',
    params: data
  })
}

// 修改合伙人配置
export function updatePartnerProfitConfig(data) {
  return request({
    url: 'admin/user/updatePartnerProfitConfig',
    method: 'post',
    params: data
  })
}
