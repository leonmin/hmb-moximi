import request from '@/utils/request'

// 添加合伙人
export function addPartner(data) {
  return request({
    url: '/admin/user/addPartner',
    method: 'post',
    data
  })
}

// 合伙人列表
export function partnerList(data) {
  return request({
    url: '/admin/user/partnerList',
    method: 'get',
    params: data
  })
}

// 合伙人下级列表
export function partnerSubUserDetails(data) {
  return request({
    url: '/admin/user/partnerSubUserDetails',
    method: 'get',
    params: data
  })
}

// 渠道提成收益
export function partnerDetail(data) {
  return request({
    url: '/admin/user/partnerDetail',
    method: 'get',
    params: data
  })
}