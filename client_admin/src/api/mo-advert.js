import request from '@/utils/request'

// 广告主管理列表接口
export function advertisersList(data) {
  return request({
    url: '/admin/adConf/advertisersList',
    method: 'get',
    params: data
  })
}

// 广告类型/任务类型接口
export function taskTypeList(data) {
  return request({
    url: '/admin/adConf/taskTypeList',
    method: 'get',
    params: data
  })
}

// 上架/下架广告主接口
export function updateAdvertStatus(data) {
  return request({
    url: '/admin/adConf/updateAdvertStatus',
    method: 'post',
    params: data
  })
}

// 添加/修改广告主接口
export function addOrEditAdvert(data) {
  return request({
    url: '/admin/adConf/addOrEditAdvert',
    method: 'post',
    data
  })
}

// 添加收入接口
export function addIncome(data) {
  return request({
    url: '/admin/adConf/addIncome',
    method: 'post',
    params: data
  })
}

// 添加/广告数据分析列表接口
export function adAnalysisList(data) {
  return request({
    url: '/admin/adConf/adAnalysisList',
    method: 'get',
    params: data
  })
}
