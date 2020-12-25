<template>
  <div class="page">
    <el-card :style="{ marginBottom: '10px' }">
      <mo-search
        :query.sync="query"
        :disabled-today="false"
        layout="daterange"
        @on-query="handleQuery"
      ></mo-search>
    </el-card>
    <el-card>
      <mo-table
        v-loading="loading"
        element-loading-text="加载中"
        :options="table"
        :page.sync="table.page"
        @on-change="handleQuery"
      ></mo-table>
      <el-dialog :visible.sync="show" title="用户详情">
        用户详情
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { json2excel } from '@/utils/excel'
import { parseTime } from '@/utils'
import { btn, popover } from '@/config'
import { cashDetailList } from '@/api/mo-finance'

export default {
  props: {},
  data() {
    return {
      show: false,
      user: {},
      query: {},
      loading: false,
      table: {
        page: 1,
        total: 0,
        size: 20,
        data: [],
        columns: [
          { prop: 'id', label: '提现编号', minWidth: 100 },
          { prop: 'addTime', label: '提现时间', minWidth: 150 },
          { prop: 'userName', label: '用户名', minWidth: 100 },
          { prop: 'mobile', label: '用户手机号', minWidth: 120 },
          { prop: 'fromChannel', label: '用户来源', minWidth: 100 },
          { prop: 'cashAmount', label: '提现金额', minWidth: 100 },
          { prop: 'fee', label: '手续费', minWidth: 100 },
          {
            prop: 'withdraw',
            label: '提现方式',
            minWidth: 100,
            render: h => {
              return '微信'
            }
          },
          { prop: 'aichatStatus', label: '是否开通魔小秘', minWidth: 100 },
          { prop: 'totalActive', label: '累计活跃天数', minWidth: 100 },
          { prop: 'mbBalance', label: '魔币余额', minWidth: 100 },
          { prop: 'applyStatus', label: '审核状态', minWidth: 100 },
          {
            prop: 'action',
            label: '操作',
            minWidth: 220,
            fixed: 'right',
            render: (h, { row }) => {
              return h('div', [
                btn(h, 'primary', '查看', () => this.handleDetail(row)),
                btn(h, 'success', '通过', () => this.handlePass(row), {
                  marginRight: '10px'
                }),
                popover(h, '拒绝', () => this.handleRefuse(row))
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
      cashDetailList({
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
    handleDetail(row) {
      console.log('row', row)
      this.user = { ...row }
      this.show = true
    },
    handlePass(row) {
      console.log('pass')
    },
    handleRefuse(row) {
      console.log('refuse', row)
    },
    async handleExport() {
      const name =
        '收支统计_' + parseTime(new Date(), '{y}_{m}_{d}_{h}_{i}') + '.xlsx'
      await json2excel(
        name,
        [
          { header: '日期', key: 'id' },
          { header: '现金会员收入', key: 'addTime' },
          { header: '广告收入', key: 'userName' },
          { header: '投放支出', key: 'mobile' },
          { header: '提现支出', key: 'fromChannel' },
          { header: '利润', key: 'cashAmount' }
        ],
        this.table.data
      )
    }
  }
}
</script>
<style lang="scss" scoped></style>
