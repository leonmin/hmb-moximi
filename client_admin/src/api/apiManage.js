import request from '@/utils/request'

export function allApiList(data) {
  return request({
    url: '/admin/api/allApiList',
    method: 'get',
    data
  })
}

export function listDataSource(data) {
  return request({
    url: '/admin/api/sms/listDataSource',
    method: 'get',
    data
  })
}

export function updateDataSource(data) {
  return request({
    url: '/admin/api/sms/updateDataSource',
    method: 'POST',
    data
  })
}

export function delDataSource(data) {
  return request({
    url: '/admin/api/sms/delDataSource',
    method: 'get',
    params: data
  })
}
