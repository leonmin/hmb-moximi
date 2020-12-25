import request from '@/utils/request'

// 提现统计接口
export function cashStatistics(data) {
  return request({
    url: '/admin/financeData/cashStatistics',
    method: 'get',
    params: data
  })
}

// 提现明细接口
export function cashDetailList(data) {
  return request({
    url: '/admin/financeData/cashDetailList',
    method: 'get',
    params: data
  })
}
// 收支统计接口
export function platformStatistics(data) {
  return request({
    url: '/admin/financeData/platformStatistics',
    method: 'get',
    params: data
  })
}

// 提现审核接口
export function cashExamine(data) {
  return request({
    url: '/admin/financeData/cashExamine',
    method: 'get',
    params: data
  })
}
