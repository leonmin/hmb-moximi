import request from '@/utils/request'

// 添加卡密
export function addOrUpdateBanner(data) {
  return request({
    url: '/admin/banner/addOrUpdateBanner',
    method: 'post',
    data
  })
}

