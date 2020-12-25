export const awardTypes = {
  AWARD_TYPE_MB: '魔币',
  AWARD_TYPE_MZ: '魔钻',
  AWARD_TYPE_MXM_VIP: '魔小秘会员'
}
export const awardTypeList = [
  { label: '魔币', value: 1 },
  { label: '魔钻', value: 2 },
  { label: '魔小秘会员', value: 3 }
]
export const taskTypes = {
  '1': '视频任务',
  '2': '微信阅读任务',
  '3': '游戏试玩任务',
  '4': '刷小视频任务',
  '5': '看资讯任务',
  '6': '读小说任务',
  '7': 'APP下载任务',
  '8': '提交截图任务',
  '9': '跳转小程序任务',
  '10': '特殊任务',
  '11': '成就任务',
  '12': '打卡任务'
}
export const orderTypes = {
  '0': '等待支付',
  '1': '已支付',
  '2': '退款中',
  '3': '已退款'
}
export const uploadUrl = process.env.VUE_APP_BASE_API + 'admin/common/upload'
export const noop = () => {}
export const btn = (h, type = '', text = '', callback, style = {}) =>
  h(
    'el-button',
    {
      props: {
        type,
        size: 'mini',
        round: true
      },
      style,
      on: {
        click: callback
      }
    },
    text
  )
export const avatar = (h, url, size = 'medium', shape = 'circle') =>
  h('el-avatar', {
    props: {
      src: url,
      size,
      shape
    }
  })
export const popover = (h, text = '删除', cb1 = noop, cb2 = noop) =>
  h(
    'el-popconfirm',
    {
      props: {
        title: '确定要' + text + '吗?'
      },
      on: {
        onConfirm: cb1,
        onCancel: cb2
      }
    },
    [
      h(
        'el-button',
        {
          slot: 'reference',
          props: {
            type: 'danger',
            size: 'mini',
            round: true
          }
        },
        text
      )
    ]
  )

export default {
  uploadUrl
}
