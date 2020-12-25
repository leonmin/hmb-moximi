import request from '@/utils/request'

// 网赚banner列表的接口
export function wzBannerList(data) {
  return request({
    url: '/admin/productConf/wzBannerList',
    method: 'get',
    params: data
  })
}

// 公告配置列表接口
export function topNoticeList(data) {
  return request({
    url: '/admin/productConf/topNoticeList',
    method: 'get',
    params: data
  })
}

// 任务管理列表接口
export function taskList(data) {
  return request({
    url: '/admin/productConf/taskList',
    method: 'get',
    params: data
  })
}

// 添加/编辑任务接口
export function addOrEditTask(data) {
  return request({
    url: '/admin/productConf/addOrEditTask',
    method: 'post',
    data
  })
}

// 下架/上架任务接口
export function editTaskStatus(data) {
  return request({
    url: '/admin/productConf/editTaskStatus',
    method: 'post',
    params: data
  })
}

// 获取任务位置接口
export function taskPlaceList(data) {
  return request({
    url: '/admin/productConf/taskPlaceList',
    method: 'get',
    params: data
  })
}

// 获取位置管理列表接口
export function placeList(data) {
  return request({
    url: '/admin/productConf/placeList',
    method: 'get',
    params: data
  })
}

// 编辑位置管理初始数据接口
export function editPlaceIndex(data) {
  return request({
    url: '/admin/productConf/editPlaceIndex',
    method: 'post',
    params: data
  })
}

// 编辑位置签到任务初始数据接口
export function editSignInIndex(data) {
  return request({
    url: '/admin/productConf/editSignInIndex',
    method: 'get',
    params: data
  })
}
// 编辑位置管理成就任务初始数据接口
export function editAchievementIndex(data) {
  return request({
    url: '/admin/productConf/editAchievementIndex',
    method: 'post',
    params: data
  })
}

// 编辑位置管理接口
export function editPlace(data) {
  return request({
    url: '/admin/productConf/editPlace',
    method: 'post',
    data
  })
}

// 上架/下架任务位置接口
export function updatePlaceStatus(data) {
  return request({
    url: '/admin/productConf/updatePlaceStatus',
    method: 'post',
    params: data
  })
}

// 获取任务奖励类型接口
export function awardTypeList(data) {
  return request({
    url: '/admin/productConf/awardTypeList',
    method: 'get',
    params: data
  })
}

// 团队分红配置初始数据接口
export function teamBonusConfIndex(data) {
  return request({
    url: '/admin/productConf/teamBonusConfIndex',
    method: 'get',
    params: data
  })
}

// 修改公告配置接口
export function editTopNotice(data) {
  return request({
    url: '/admin/productConf/editTopNotice',
    method: 'post',
    data
  })
}

// 停用/启用公告接口
export function editTopNoticeStatus(data) {
  return request({
    url: '/admin/productConf/editTopNoticeStatus',
    method: 'post',
    params: data
  })
}

// 修改分红金额接口
export function editBonusAmount(data) {
  return request({
    url: '/admin/productConf/editBonusAmount',
    method: 'post',
    params: data
  })
}

// 修改网赚banner接口
export function editWzBanner(data) {
  return request({
    url: '/admin/productConf/editWzBanner',
    method: 'post',
    data
  })
}
// 停用/启用网赚banner接口
export function editWzBannerStatus(data) {
  return request({
    url: '/admin/productConf/editWzBannerStatus',
    method: 'post',
    params: data
  })
}

// 魔宠配置列表接口
export function confMcList(data) {
  return request({
    url: '/admin/productConf/confMcList',
    method: 'get',
    params: data
  })
}

// 修改魔宠配置接口
export function editConfMc(data) {
  return request({
    url: '/admin/productConf/editConfMc',
    method: 'post',
    data
  })
}

// 提现配置初始数据接口
export function cashConfIndex(data) {
  return request({
    url: '/admin/productConf/cashConfIndex',
    method: 'get',
    params: data
  })
}

// 修改提现配置金额接口
export function editCashLowest(data) {
  return request({
    url: '/admin/productConf/editCashLowest',
    method: 'post',
    params: data
  })
}

// 编辑或新增手续费接口
export function addOrEditService(data) {
  return request({
    url: '/admin/productConf/addOrEditService',
    method: 'post',
    data
  })
}
