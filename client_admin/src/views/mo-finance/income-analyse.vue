<template>
  <div class="page">
    <el-card :style="{ marginBottom: '10px' }">
      <mo-search
        :query.sync="query"
        layout="daterange"
        @on-query="handleQuery"
      ></mo-search>
    </el-card>
    <el-card>
      <div class="mo-table-desc">
        <div class="mo-table-lead">收支统计数据</div>
        <div class="mo-table-more">
          <el-button type="primary" size="mini" round @click="handleExport"
            >导出</el-button
          >
        </div>
      </div>
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
import { platformStatistics } from '@/api/mo-finance'

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
          { prop: 'day', label: '日期', minWidth: 100 },
          { prop: 'moneyVipIncome', label: '现金会员收入', minWidth: 100 },
          { prop: 'adIncome', label: '广告收入', minWidth: 100 },
          { prop: 'launchExpend', label: '投放支出', minWidth: 100 },
          { prop: 'cashExpend', label: '提现支出', minWidth: 100 },
          { prop: 'profit', label: '利润', minWidth: 100 }
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
      platformStatistics({
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
    async handleExport() {
      const name =
        '收支统计_' + parseTime(new Date(), '{y}_{m}_{d}_{h}_{i}') + '.xlsx'
      await json2excel(
        name,
        [
          { header: '日期', key: 'day' },
          { header: '现金会员收入', key: 'moneyVipIncome' },
          { header: '广告收入', key: 'adIncome' },
          { header: '投放支出', key: 'launchExpend' },
          { header: '提现支出', key: 'cashExpend' },
          { header: '利润', key: 'profit' }
        ],
        this.table.data
      )
    }
  }
}
</script>
<style lang="scss" scoped></style>
