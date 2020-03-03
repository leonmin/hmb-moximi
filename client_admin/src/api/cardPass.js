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

// 启用/停用
export function startAndStopCard(data) {
  return request({
    url: '/admin/exchangeCard/startAndStopCard',
    method: 'post',
    params: data
  })
}

// 卡密明细
export function pageList(data) {
  return request({
    url: '/admin/userExchangeCard/pageList',
    method: 'get',
    params: data
  })
}

/* 活动卡密详情*/
export function activityExchangeCard(data) {
  return request({
    url: '/admin/exchangeCard/activityExchangeCard',
    method: 'get',
    params: data
  })
}
