import request from '@/utils/request'

/**
 *
 * @param data
 */
export function userRechargeInfo(data) {
  return request({
    url: '/admin/user/userRechargeInfo',
    method: 'get',
    params: data
  })
}
export function submitRecharge(data) {
  return request({
    url: '/admin/user/submitRecharge',
    method: 'post',
    data
  })
}

export function orderRechargeList(data) {
  return request({
    url: '/admin/user/orderRechargeList',
    method: 'get',
    params: data
  })
}

export function orderRechargeListV2(data) {
  return request({
    url: '/admin/user/orderRechargeListV2',
    method: 'get',
    params: data
  })
}

/**
 * 得到充值的明细
 * @param data
 */
export function rechargeDetails(data) {
  return request({
    url: '/admin/user/rechargeDetails',
    method: 'get',
    params: data
  })
}
export function checkRechargeOrder(data) {
  return request({
    url: '/admin/user/checkRechargeOrder',
    method: 'post',
    params: data
  })
}

export function tenantAppPackList(data) {
  return request({
    url: '/admin/user/tenantAppPackList',
    method: 'get',
    params: data
  })
}

export function userList(data) {
  return request({
    url: '/admin/user/list',
    method: 'get',
    params: data
  })
}

export function billList(data) {
  return request({
    url: '/admin/user/billList',
    method: 'get',
    params: data
  })
}

export function realNameAuthList(data) {
  return request({
    url: '/admin/user/realNameAuthList',
    method: 'get',
    params: data
  })
}

export function submitRealNameAuth(data) {
  return request({
    url: '/admin/user/submitRealNameAuth',
    method: 'post',
    params: data
  })
}

export function userApiList(data) {
  return request({
    url: '/admin/api/listByUser',
    method: 'get',
    params: data
  })
}

export function apiOrderList(data) {
  return request({
    url: '/admin/api/apiOrderList',
    method: 'get',
    params: data
  })
}

export function apiStatistics(data) {
  return request({
    url: '/admin/statistics/apiStatistics',
    method: 'get',
    params: data
  })
}

export function FinanceStatistics(data) {
  return request({
    url: '/admin/statistics/FinanceStatistics',
    method: 'get',
    params: data
  })
}
// 优惠券管理
export function couponList(data) {
  return request({
    url: '/admin/coupon/couponList',
    method: 'get',
    params: data
  })
}
// 优惠券详情
export function couponDetail(data) {
  return request({
    url: '/admin/coupon/couponDetail',
    method: 'get',
    params: data
  })
}

// 优惠券启停
export function couponEnable(data) {
  return request({
    url: '/admin/coupon/couponEnable',
    method: 'post',
    params: data
  })
}

// 计算优惠券折扣价
export function getDiscountPrice(data) {
  return request({
    url: '/admin/coupon/getDiscountPrice',
    method: 'get',
    params: data
  })
}

// 添加优惠券
export function addCoupon(data) {
  return request({
    url: '/admin/coupon/addCoupon',
    method: 'post',
    data
  })
}

// 优惠券详情(使用明细)
export function couponUseDetails(data) {
  return request({
    url: '/admin/coupon/couponUseDetails',
    method: 'get',
    params: data
  })
}

// 优惠券下发确认
export function sendCoupons(data) {
  return request({
    url: '/admin/coupon/sendCoupons',
    method: 'post',
    data
  })
}

/* 下发的用户列表*/
export function usersList(data) {
  return request({
    url: '/admin/user/usersList',
    method: 'get',
    params: data
  })
}

/* 修改密码*/
export function updatePassword(data) {
  return request({
    url: '/admin/auth/updatePassword',
    method: 'post',
    params: data
  })
}

// 渠道列表
export function channelList(data) {
  return request({
    url: '/admin/channel/channelList',
    method: 'get',
    params: data
  })
}

// 渠道添加
export function channelAdd(data) {
  return request({
    url: '/admin/channel/addChannel',
    method: 'post',
    data
  })
}

// 渠道二维码
export function channelQr(data) {
  return request({
    url: '/admin/channel/getChannelQr',
    method: 'get',
    params: data
  })
}

// 渠道数据
export function channelStatistics(data) {
  return request({
    url: '/admin/channel/channelStatistics',
    method: 'get',
    params: data
  })
}

// 渠道数据
export function ofdCharge(data) {
  return request({
    url: '/admin/statistics/ofdCharge',
    method: 'get',
    params: data
  })
}

// 渠道数据
export function ofdInfo(data) {
  return request({
    url: '/admin/statistics/ofdInfo',
    method: 'get',
    params: data
  })
}

// 渠道统计
export function channelStat(data) {
  return request({
    url: '/admin/channel/channelDayStatistics',
    method: 'get',
    params: data
  })
}

// 数据
export function wxMsg(data) {
  return request({
    url: '/admin/statistics/wxMsg',
    method: 'get',
    params: data
  })
}

// 数据
export function wxPushStats(data) {
  return request({
    url: '/admin/statistics/wxPushStats',
    method: 'get',
    params: data
  })
}

// 绿色通道数据
export function greenStats(data) {
  return request({
    url: '/admin/statistics/greenStats',
    method: 'get',
    params: data
  })
}


// 提成明细
export function profitList(data) {
  return request({
    url: '/admin/order/profitList',
    method: 'get',
    params: data
  })
}

// 提成明细
export function addressBookStats(data) {
  return request({
    url: '/admin/statistics/phoneBak/stats',
    method: 'get',
    params: data
  })
}
