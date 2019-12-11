import request from '@/utils/request'

// 添加卡密
export function addExchangeCard(data) {
  return request({
    url: '/admin/exchangeCard/addExchangeCard',
    method: 'post',
    data
  })
}

// 合伙人下拉列表
export function allPartner() {
  return request({
    url: '/admin/user/allPartner',
    method: 'get'
  })
}

// 卡密列表
export function listExchangeCard(data) {
  return request({
    url: '/admin/exchangeCard/listExchangeCard',
    method: 'get',
    params: data
  })
}

