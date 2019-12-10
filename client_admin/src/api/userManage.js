import request from '@/utils/request'

/**
 *
 * @param data
 */
export function userRechargeInfo(data) {
  return request({
    url: '/admin/user/userRechargeInfo',
    method: 'get',
    params: data
  })
}
export function submitRecharge(data) {
  return request({
    url: '/admin/user/submitRecharge',
    method: 'post',
    data
  })
}

export function orderRechargeList(data) {
  return request({
    url: '/admin/user/orderRechargeList',
    method: 'get',
    params: data
  })
}

export function orderRechargeListV2(data) {
  return request({
    url: '/admin/user/orderRechargeListV2',
    method: 'get',
    params: data
  })
}

/**
 * 得到充值的明细
 * @param data
 */
export function rechargeDetails(data) {
  return request({
    url: '/admin/user/rechargeDetails',
    method: 'get',
    params: data
  })
}
export function checkRechargeOrder(data) {
  return request({
    url: '/admin/user/checkRechargeOrder',
    method: 'post',
    params: data
  })
}

export function tenantAppPackList(data) {
  return request({
    url: '/admin/user/tenantAppPackList',
    method: 'get',
    params: data
  })
}

export function userList(data) {
  return request({
    url: '/admin/user/list',
    method: 'get',
    data
  })
}

export function billList(data) {
  return request({
    url: '/admin/user/billList',
    method: 'get',
    params: data
  })
}

export function realNameAuthList(data) {
  return request({
    url: '/admin/user/realNameAuthList',
    method: 'get',
    params: data
  })
}

export function submitRealNameAuth(data) {
  return request({
    url: '/admin/user/submitRealNameAuth',
    method: 'post',
    params: data
  })
}

export function userApiList(data) {
  return request({
    url: '/admin/api/listByUser',
    method: 'get',
    params: data
  })
}

export function apiOrderList(data) {
  return request({
    url: '/admin/api/apiOrderList',
    method: 'get',
    params: data
  })
}

export function apiStatistics(data) {
  return request({
    url: '/admin/statistics/apiStatistics',
    method: 'get',
    params: data
  })
}

export function FinanceStatistics(data) {
  return request({
    url: '/admin/statistics/FinanceStatistics',
    method: 'get',
    params: data
  })
}
