import request from '@/utils/request'

export function adminList(data) {
  return request({
    url: '/admin/sys/adminList',
    method: 'get',
    params: data
  })
}

export function sysRoleList(data) {
  return request({
    url: '/admin/sys/sysRoleList',
    method: 'get',
    params: data
  })
}

export function submitAddRole(data) {
  return request({
    url: '/admin/sys/submitAddRole',
    method: 'post',
    params: data
  })
}

export function permissions(data) {
  return request({
    url: '/admin/sys/permissions',
    method: 'get',
    params: data
  })
}

