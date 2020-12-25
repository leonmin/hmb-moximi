import request from '@/utils/request'

// 新用户统计表接口
export function newUserStatistics(data) {
  return request({
    url: '/admin/userData/newUserStatistics',
    method: 'get',
    params: data
  })
}

// 总用户统计表接口
export function totalUserStatistics(data) {
  return request({
    url: '/admin/userData/totalUserStatistics',
    method: 'get',
    params: data
  })
}

// 用户明细接口
export function userDetailList(data) {
  return request({
    url: '/admin/userData/userDetailList',
    method: 'get',
    params: data
  })
}

// 冻结或解冻用户接口
export function updateUserStatus(data) {
  return request({
    url: '/admin/userData/updateUserStatus',
    method: 'get',
    params: data
  })
}

// 给与或解除渠道商接口
export function becomeChannel(data) {
  return request({
    url: '/admin/userData/becomeChannel',
    method: 'post',
    params: data
  })
}
