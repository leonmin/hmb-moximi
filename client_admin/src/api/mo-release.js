import request from '@/utils/request'

// 投放渠道管理列表接口
export function launchChannelList(data) {
  return request({
    url: '/admin/launchManage/launchChannelList',
    method: 'get',
    params: data
  })
}

// 投放数据分析列表接口
export function launchAnalysisList(data) {
  return request({
    url: '/admin/launchManage/launchAnalysisList',
    method: 'get',
    params: data
  })
}

// 添加/编辑投放渠道接口
export function addOrEditLaunchChannel(data) {
  return request({
    url: '/admin/launchManage/addOrEditLaunchChannel',
    method: 'post',
    data
  })
}

// 添加投放数据接口
export function addLaunchAnalysis(data) {
  return request({
    url: '/admin/launchManage/addLaunchAnalysis',
    method: 'post',
    data
  })
}

// 投放渠道上架/下架接口
export function editLaunchChannelStatus(data) {
  return request({
    url: '/admin/launchManage/editLaunchChannelStatus',
    method: 'post',
    params: data
  })
}
