import request from '@/utils/request'

// 获取日订单统计
export function statistics(data) {
  return request({
    url: '/admin/statistics/s1',
    method: 'get',
    params: data
  })
}

// 获取数据统计
export function statisticsS3(data) {
  return request({
    url: '/admin/statistics/s3',
    method: 'get',
    params: data
  })
}
