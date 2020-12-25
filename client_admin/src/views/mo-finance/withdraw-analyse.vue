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
        <div class="mo-table-lead">提现统计数据</div>
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
import { cashStatistics } from '@/api/mo-finance'

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
          { prop: 'successAmount', label: '提现成功金额', minWidth: 100 },
          { prop: 'refuseAmount', label: '拒绝金额', minWidth: 100 },
          { prop: 'waitAmount', label: '待审核金额', minWidth: 100 },
          { prop: 'newUserAmount', label: '新人提现金额', minWidth: 100 },
          { prop: 'normalAmount', label: '常规提现金额', minWidth: 100 }
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
      cashStatistics({
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
        '提现统计_' + parseTime(new Date(), '{y}_{m}_{d}_{h}_{i}') + '.xlsx'
      await json2excel(
        name,
        [
          { header: '日期', key: 'day' },
          { header: '提现成功金额', key: 'successAmount' },
          { header: '拒绝金额', key: 'refuseAmount' },
          { header: '待审核金额', key: 'waitAmount' },
          { header: '新人提现金额', key: 'newUserAmount' },
          { header: '常规提现金额', key: 'normalAmount' }
        ],
        this.table.data
      )
    }
  }
}
</script>
<style lang="scss" scoped></style>
