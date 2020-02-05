// const API = "";
const API = "/api";
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
// 首页会员状态
export const SHOWINDEXTIP =API+"/app/index/showIndexTips";
// 首页获取优惠券
export const INDEXCOUPON =API+"/app/index/getCoupon";


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
// 删除通话详情
export const DELCALL  = API+"/app/chat/delCallRecord";
//banner
export const BANNER  = API+"/app/banner";

//优惠券列表
export const COUPONLIST  = API+"/app/chat/couponList";


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
//引导页手机号
export const GETNUMINFO  = API+"/app/chat/getNumberInfo";
// 上传图片
export const UPLOADFILE = API+"/app/uploadFile";
// 用户反馈
export const FEEDBACK = API+"/app/chat/feedback";
// 用户分享免费
export const SHARECARD = API+"/app/order/shareGetWeekCard";





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
// 合伙人卡密列表
export const CARDPACK =API+"/app/chat/cardPack";
// 合伙人卡密列表详情
export const CARDPACKDETAILS =API+"/app/chat/cardPackDetails";

// 接听配置


// 转接状态
export const TRANSFERCONFIG = API+"/user/bysetting/transferConfig"
// 音色列表
export const TTSPLAID = API+"/user/bysetting/ttsPlaid"
// 设置音色
export const TTSUPDATE = API+"/user/bysetting/ttsUpdate"
// 查询当前音色
export const TTSSCENE = API+"/user/bysetting/ttsScene"
// 转化语音
export const TTSCONVERT = API+"/user/bysetting/ttsConvert"
// 开场白列表
export const PROLOGUELIST = API+"/user/bysetting/prologueList"
// 当前设置开场白
export const PROLOGUECURRENT = API+"/user/bysetting/prologueCurrent"
// 设置开场白
export const PROLOGUESET = API+"/user/bysetting/prologueSet"
// 修改开场白详情
export const PROLOGUEGET = API+"/user/bysetting/prologueGet"
// 开场白修改设置
export const SETTEXTPROLOGUE = API+"/user/bysetting/setTextPrologue"
// 删除开场白
export const PROLOGUEDELETE = API+"/user/bysetting/prologueDelete"
// 黑名单列表
export const BLACKLIST = API+"/user/bysetting/blackList"
// 黑名单添加
export const BLACKADD = API+"/user/bysetting/blackAdd"
// 黑名单删除
export const BLACKDELETE = API+"/user/bysetting/blackDetele"
// 拒接黑名单状态
export const REFUSECALL = API+"/user/bysetting/refuseCall"
// 更改拒接黑名单状态
export const REFUSECALLSET = API+"/user/bysetting/refuseCallSet"
// 场景列表
export const SCENESTATUS = API+"/user/bysetting/sceneStatus"
// 场景列表
export const SCENELIST = API+"/user/bysetting/scenelist"
// 场景拒接列表
export const SCENEREFUSE = API+"/user/bysetting/sceneRefuse"
// 场景拒接列表更新
export const SCENEREFUSEUPDATE = API+"/user/bysetting/sceneRefuseUpdate"
// 添加场景回复
export const SCENEUSERPOST = API+"/user/bysetting/sceneUserPost"
//设置语音开场白
export const SETVOICEPROLOGUE = API+"/user/bysetting/setVoicePrologue"
//设置回复
export const SCENCESET = API+"/user/bysetting/sceneSet"