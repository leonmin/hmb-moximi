import request from '@/utils/request'

// 用户反馈列表
export function pageList(data) {
  return request({
    url: '/admin/feedback/pageList',
    method: 'get',
    params: data
  })
}

