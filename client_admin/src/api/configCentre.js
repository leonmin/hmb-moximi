import request from '@/utils/request'

// 查询会员卡续费配置详情
export function lookConfig(data) {
  return request({
    url: '/admin/goodsCard/cardDetails',
    method: 'get',
    params: data
  })
}

// 修改会员卡续费配置
export function changeConfig(data) {
  return request({
    url: '/admin/goodsCard/updateGoodsCard',
    method: 'post',
    data
  })
}

// 提成设置获取详情
export function getRoyalty() {
  return request({
    url: '/admin/goodsCard/getRoyalty',
    method: 'get'
  })
}

// 修改提成设置
export function updateTicheng(data) {
  return request({
    url: '/admin/goodsCard/updateTicheng',
    method: 'post',
    data
  })
}

// 敏感词列表
export function SENLIST(data) {
  return request({
    url: '/admin/sensitive/list',
    method: 'get',
    params: data
  })
}

// 敏感词列表
export function SENdelete(data) {
  return request({
    url: '/admin/sensitive/delete',
    method: 'get',
    params: data
  })
}

// 敏感词列表
export function SENadd(data) {
  return request({
    url: '/admin/sensitive/add',
    method: 'get',
    params: data
  })
}
