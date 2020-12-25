<template>
  <div class="page">
    <el-card :style="{ marginBottom: '10px' }">
      <mo-search
        :query.sync="query"
        layout="daterange, channel"
        @on-query="handleQuery"
      ></mo-search>
    </el-card>
    <el-card>
      <div class="mo-table-desc">
        <div class="mo-table-lead">总用户统计</div>
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
import { totalUserStatistics } from '@/api/mo-person'
export default {
  props: {},
  data() {
    return {
      query: {},
      loading: false,
      table: {
        page: 1,
        total: 0,
        size: 10,
        data: [],
        columns: [
          { prop: 'day', label: '日期', minWidth: 100 },
          { prop: 'totalUserNum', label: '累计用户数', minWidth: 100 },
          { prop: 'newUserNum', label: '新增用户数', minWidth: 100 },
          { prop: 'totalOpenVipNum', label: '累计开通会员数', minWidth: 100 },
          { prop: 'newOpenVipNum', label: '新增开通会员数', minWidth: 100 },
          { prop: 'effectiveVipNum', label: '有效会员数', minWidth: 100 },
          { prop: 'totalJoinTaskNum', label: '累计参与任务数', minWidth: 100 },
          { prop: 'newJoinTaskNum', label: '新增参与任务数', minWidth: 100 }
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
      totalUserStatistics({
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
        '总用户统计' + parseTime(new Date(), '{y}_{m}_{d}_{h}_{i}') + '.xlsx'
      await json2excel(
        name,
        [
          { header: '日期', key: 'day' },
          { header: '累计用户数', key: 'totalUserNum' },
          { header: '新增用户数', key: 'newUserNum' },
          { header: '累计开通会员数', key: 'totalOpenVipNum' },
          { header: '新增开通会员数', key: 'newOpenVipNum' },
          { header: '有效会员数', key: 'effectiveVipNum' },
          { header: '累计参与任务数', key: 'totalJoinTaskNum' },
          { header: '新增参与任务数', key: 'newJoinTaskNum' }
        ],
        this.table.data
      )
    }
  }
}
</script>
<style lang="scss" scoped></style>
