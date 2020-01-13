const API = "";
// const API = "/api";
// 测试
export const TEST =API+"/getWangYiNews";
// 绑定手机号
export const LOGIN =API+"/app/bindMobile";
//发送验证码
export const SENDCODE =API+"/app/sendVerifyCode";
// 通话列表
export const CALLRECORDLISTTODAY =API+"/app/chat/callRecordListToday";
// 历史来电
export const CALLRECORDLIST =API+"/app/chat/callRecordList";
// 获取接听
export const SETTINGURL =API+"/app/chat/getSettingPageUrl";


/**
 * 专属定制
 */

// 通讯录详情
export const CALLRECORDDETAILS =API+"/app/chat/callRecordDetails";
// 通讯录列表
export const CONTACTLIST  = API+"/app/contact/list";
// 通讯录详情
export const CONTACTDETAIL  = API+"/app/contact/detail";
// 添加联系人
export const ADDCONTACT  = API+"/app/contact/create";
// 删除联系人
export const DELCONTACT  = API+"/app/contact/delete";
// 自定义录音开场白
export const VOICEPROLOGUE  = API+"/app/chat/setVoicePrologue";
// 自定义文本开场白
export const TEXTPROLOGUE  = API+"/app/chat/setTextPrologue";
// 查询自定义开场白
export const GETPROLPGUE  = API+"/app/chat/getPrologue";
// 取消开场白
export const CANCELPROLPGUE  = API+"/app/chat/cancelPrologue";
// 试听
export const AUDITION  = API+"/app/chat/audition";


/**
 * 个人中心
 */

// 添加黑名单
export const ADDBLACKLIST  = API+"/app/blacklist/add";
// 创建订单
export const CREATEORDER  = API+"/app/order/createOrder";
// 优惠券
export const BEFORODER  = API+"/app/order/beforeOrder";
//购买卡列表
export const GOODSLIST  = API+"/app/order/goodsCardList";
//我的信息
export const MYINFO  = API+"/app/chat/myInfo";
//我的钱包
export const MYCASH  = API+"/app/chat/myCash";
//零钱明细
export const CASHLIST  = API+"/app/chat/cashList";
//零钱明细详情
export const MYCASHLIST  = API+"/app/chat/myCashList";
//提现
export const APPLYCASHOUT  = API+"/app/chat/applyCashOut";
//JSSDK
export const JSAPI  = API+"/app/chat/jsapiParams";
//邀请数据
export const INVITEDATA  = API+"/app/chat/myInviteData";
//邀请明细
export const INVITELIST  = API+"/app/chat/inviteUserList";
//是否关注
export const SUBSCRIBEINFO  = API+"/app/chat/subscribeInfo";





// 卡密激活
export const EXCHANGECARD  = API+"/app/order/submitExchangeCard";



/**
 * 合伙人
 */
// 合伙人信息
export const PARTNERINFO =API+"/app/chat/myPartnerInfo";
// 合伙人钱包
export const PARTNERCASH =API+"/app/chat/myPartnerCash";
// 合伙人邀请信息
export const PARTNERINVITEDATA =API+"/app/chat/myPartnerInviteData";
// 合伙人绑定
export const PARTNERBIND =API+"/app/bindPartnerMobile";
// 合伙人提现
export const PARTNERCASHOUT =API+"/app/chat/partnerApplyCashOut";
// 合伙人邀请列表
export const PARTNERINVITELIST =API+"/app/chat/partnerInviteUserList";
// 合伙人明细列表
export const PARTNERCASHLIST =API+"/app/chat/partnerCashList";