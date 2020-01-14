import request from '@/utils/request'

// 添加banner
export function addOrUpdateBanner(data) {
  return request({
    url: '/admin/banner/addOrUpdateBanner',
    method: 'post',
    data
  })
}

// banner列表
export function bannerList(data) {
  return request({
    url: '/admin/banner/bannerList',
    method: 'get',
    params: data
  })
}

// 删除banner
export function deleteBanner(data) {
  return request({
    url: '/admin/banner/deleteBanner',
    method: 'post',
    params: data
  })
}
