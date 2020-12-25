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
      <div class="mo-table-desc">
        <div class="mo-table-lead">魔小秘会员统计</div>
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
import { mxmVipStatistics } from '@/api/mo-product'
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
          { prop: 'totalVip', label: '累计会员数', minWidth: 100 },
          { prop: 'addedVip', label: '新增会员数', minWidth: 100 },
          { prop: 'effectiveVip', label: '有效会员数', minWidth: 100 },
          { prop: 'moneyVip', label: '新增现金购买会员数', minWidth: 100 },
          { prop: 'mzVip', label: '新增魔钻购买会员数', minWidth: 100 },
          { prop: 'taskVip', label: '新增任务发放会员数', minWidth: 100 },
          { prop: 'totalMoneyVip', label: '累计现金购买会员数', minWidth: 100 },
          { prop: 'totalMzVip', label: '累计魔钻购买会员数', minWidth: 100 },
          { prop: 'totalTaskVip', label: '累计任务发放会员数', minWidth: 100 }
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
      mxmVipStatistics({
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
        '魔小秘会员统计' +
        parseTime(new Date(), '{y}_{m}_{d}_{h}_{i}') +
        '.xlsx'
      await json2excel(
        name,
        [
          { header: '日期', key: 'day' },
          { header: '累计会员数', key: 'totalVip' },
          { header: '新增会员数', key: 'addedVip' },
          { header: '有效会员数', key: 'effectiveVip' },
          { header: '新增现金购买会员数', key: 'moneyVip' },
          { header: '新增魔钻购买会员数', key: 'mzVip' },
          { header: '新增任务发放会员数', key: 'taskVip' },
          { header: '累计现金购买会员数', key: 'totalMoneyVip' },
          { header: '累计魔钻购买会员数', key: 'totalMzVip' },
          { header: '累计任务发放会员数', key: 'totalTaskVip' }
        ],
        this.table.data
      )
    }
  }
}
</script>
<style lang="scss" scoped></style>
