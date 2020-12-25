<template>
  <div class="page">
    <el-card :style="{ marginBottom: '10px' }">
      <mo-search
        :query.sync="query"
        layout="daterange, taskId"
        @on-query="handleQuery"
      ></mo-search>
    </el-card>
    <el-card>
      <div class="mo-table-desc">
        <div class="mo-table-lead">任务统计</div>
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
import { taskStatistics } from '@/api/mo-product'
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
          { prop: 'taskId', label: '任务ID', minWidth: 100 },
          { prop: 'taskName', label: '任务名称', minWidth: 100 },
          { prop: 'finishPeopleNum', label: '完成人数', minWidth: 100 },
          { prop: 'finishNum', label: '完成次数', minWidth: 100 },
          { prop: 'mbGrantNum', label: '魔币发放数', minWidth: 100 },
          { prop: 'mzGrantNum', label: '魔钻发放数', minWidth: 100 },
          { prop: 'mxmGrantNum', label: '魔小秘发放时长', minWidth: 100 }
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
      taskStatistics({
        ...this.query,
        pageNum: this.table.page || 1,
        pageSize: 30
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
        '任务统计' + parseTime(new Date(), '{y}_{m}_{d}_{h}_{i}') + '.xlsx'
      await json2excel(
        name,
        [
          { header: '日期', key: 'day' },
          { header: '任务ID', key: 'taskId' },
          { header: '任务名称', key: 'taskName' },
          { header: '完成人数', key: 'finishPeopleNum' },
          { header: '完成次数', key: 'finishNum' },
          { header: '魔币发放数', key: 'mbGrantNum' },
          { header: '魔钻发放数', key: 'mzGrantNum' },
          { header: '魔小秘发放时长', key: 'mxmGrantNum' }
        ],
        this.table.data
      )
    }
  }
}
</script>
<style lang="scss" scoped></style>
