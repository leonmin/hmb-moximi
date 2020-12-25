<template>
  <div class="page">
    <el-card :style="{ marginBottom: '10px' }">
      <mc-search-user
        :query.sync="query"
        @on-query="handleQuery"
      ></mc-search-user>
    </el-card>
    <el-card>
      <mo-table
        v-loading="loading"
        element-loading-text="加载中"
        :options="table"
        :page.sync="table.page"
        @on-change="handleQuery"
      ></mo-table>
    </el-card>
  </div>
</template>
<script>
import { json2excel } from '@/utils/excel'
import { parseTime } from '@/utils'
import { btn, avatar } from '@/config'
import {
  userDetailList,
  updateUserStatus,
  becomeChannel
} from '@/api/mo-person'

export default {
  props: {},
  data() {
    return {
      query: {},
      loading: false,
      table: {
        page: 1,
        total: 0,
        size: 20,
        data: [],
        columns: [
          {
            prop: 'avatar',
            label: '头像',
            minWidth: 100,
            render: (h, { row }) => {
              return avatar(h, row.avatar, 45)
            }
          },
          { prop: 'id', label: 'ID', minWidth: 100 },
          { prop: 'userName', label: '用户名', minWidth: 100 },
          { prop: 'mobile', label: '手机号', minWidth: 120 },
          { prop: 'firstLogin', label: '注册时间', minWidth: 150 },
          { prop: 'lastLogin', label: '最近一次登录时间', minWidth: 150 },
          { prop: 'fromChannel', label: '来源渠道', minWidth: 100 },
          { prop: 'vipEndTime', label: '会员到期日', minWidth: 150 },
          { prop: 'pUserName', label: '推荐用户', minWidth: 100 },
          { prop: 'pUserMobile', label: '推荐用户手机号', minWidth: 100 },

          { prop: 'totalInviteNum', label: '直推好友数', minWidth: 100 },
          { prop: 'grandsonNum', label: '间推好友数', minWidth: 100 },
          { prop: 'channelNum', label: '扩散好友数', minWidth: 100 },
          { prop: 'totalMb', label: '累计魔币', minWidth: 100 },
          { prop: 'mbBalance', label: '魔币余额', minWidth: 100 },
          { prop: 'totalMz', label: '累计魔钻', minWidth: 100 },
          { prop: 'mzBalance', label: '魔钻余额', minWidth: 100 },
          { prop: 'totalTx', label: '累计提现金额', minWidth: 100 },
          { prop: 'totalTxNum', label: '累计提现次数', minWidth: 100 },
          {
            prop: 'id0',
            label: '操作',
            minWidth: 180,
            fixed: 'right',
            render: (h, { row }) => {
              const status = row.userStatus === 1
              const level = row.userIdentity === 2
              return h('div', [
                btn(
                  h,
                  status ? 'success' : 'danger',
                  status ? '解冻' : '冻结',
                  () => this.handleChangeFreeze(row)
                ),
                btn(
                  h,
                  level ? 'danger' : 'success',
                  level ? '撤销升行级' : '升级渠道商',
                  () => this.handleChangeLevel(row)
                )
              ])
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.handleQuery()
  },
  methods: {
    handleQuery() {
      this.loading = true
      userDetailList({
        ...this.query,
        pageNum: this.table.page || 1
      }).then(res => {
        this.loading = false
        const { code, data } = res || {}
        if (code === 0 && data) {
          const { records = [], total = 0, size = 10 } = data
          this.table.data = records
          this.table.total = total
          this.table.size = size
        }
      })
    },
    handleChangeFreeze(row) {
      if (row && row.id) {
        updateUserStatus({
          userId: row.id
        }).then(res => {
          if (res && res.code === 0) {
            this.$message.success(
              row.userStatus === 1 ? '解冻成功' : '冻结成功'
            )
            this.handleQuery()
          } else {
            // this.$message.error(res.msg || '操作失败')
          }
        })
      }
    },
    handleChangeLevel(row) {
      if (row && row.id) {
        becomeChannel({
          userId: row.id
        }).then(res => {
          if (res && res.code === 0) {
            this.$message.success(
              row.userIdentity === 2 ? '撤销升级成功' : '升级渠道商成功'
            )
            this.handleQuery()
          }
        })
      }
    },
    async handleExport() {
      const name =
        '用户明细数据' + parseTime(new Date(), '{y}_{m}_{d}_{h}_{i}') + '.xlsx'
      await json2excel(
        name,
        [
          { header: '头像', key: 'avatar' },
          { header: 'ID', key: 'id' },
          { header: '用户名', key: 'userName' },
          { header: '手机号', key: 'mobile' },
          { header: '注册时间', key: 'firstLogin' },
          { header: '最近一次登录时间', key: 'lastLogin' },
          { header: '来源渠道', key: 'fromChannel' },
          { header: '会员到期日', key: 'vipEndTime' },
          { header: '推荐用户', key: 'pUserName' },
          { header: '推荐用户手机号', key: 'pUserMobile' },

          { header: '直推好友数', key: 'totalInviteNum' },
          { header: '间推好友数', key: 'grandsonNum' },
          { header: '扩散好友数', key: 'channelNum' },
          { header: '累计魔币', key: 'totalMb' },
          { header: '魔币余额', key: 'mbBalance' },
          { header: '累计魔钻', key: 'totalMz' },
          { header: '魔钻余额', key: 'mzBalance' },
          { header: '累计提现金额', key: 'totalTx' },
          { header: '累计提现次数', key: 'totalTxNum' }
        ],
        this.table.data
      )
    }
  }
}
</script>
<style lang="scss" scoped></style>
