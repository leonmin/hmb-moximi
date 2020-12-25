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
        <div class="mo-table-lead">魔币统计</div>
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
import { mBStatistics } from '@/api/mo-product'
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
          { prop: 'totalBalance', label: '总金额', minWidth: 100 },
          { prop: 'totalGrant', label: '发放总数', minWidth: 100 },
          { prop: 'grantPeopleNum', label: '发放人数', minWidth: 100 },
          { prop: 'taskGrant', label: '任务发放数', minWidth: 100 },
          { prop: 'friendBonus', label: '好友分红划转数', minWidth: 100 },
          { prop: 'cashTotal', label: '提现总数', minWidth: 100 },
          { prop: 'cashPeopleNum', label: '提现人数', minWidth: 100 },
          { prop: 'cashNum', label: '提现次数', minWidth: 100 },
          { prop: 'newUserCashNum', label: '新人提现总数', minWidth: 100 },
          { prop: 'normalCashNum', label: '常规提现总数', minWidth: 100 }
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
      mBStatistics({
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
        '魔币统计' + parseTime(new Date(), '{y}_{m}_{d}_{h}_{i}') + '.xlsx'
      await json2excel(
        name,
        [
          { header: '日期', key: 'day' },
          { header: '总金额', key: 'totalBalance' },
          { header: '发放总数', key: 'totalGrant' },
          { header: '发放人数', key: 'grantPeopleNum' },
          { header: '任务发放数', key: 'taskGrant' },
          { header: '好友分红划转数', key: 'friendBonus' },
          { header: '提现总数', key: 'cashTotal' },
          { header: '提现人数', key: 'cashPeopleNum' },
          { header: '提现次数', key: 'cashNum' },
          { header: '新人提现总数', key: 'newUserCashNum' },
          { header: '常规提现总数', key: 'normalCashNum' }
        ],
        this.table.data
      )
    }
  }
}
</script>
<style lang="scss" scoped></style>
