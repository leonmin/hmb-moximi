import request from '@/utils/request'

// 获取优惠券运营列表
export function couponOperate(data) {
  return request({
    url: '/admin/user/couponOperate',
    method: 'get',
    params: data
  })
}

// 优惠券列表
export function couponList(data) {
  return request({
    url: '/admin/coupon/couponList',
    method: 'get',
    params: data
  })
}

// 赠送优惠券
export function sendCoupons(data) {
  return request({
    url: '/admin/coupon/sendCoupons',
    method: 'post',
    data
  })
}

// 使用优惠券数据列表
export function userCouponList(data) {
  return request({
    url: '/admin/userCoupon/userCouponList',
    method: 'get',
    params: data
  })
}