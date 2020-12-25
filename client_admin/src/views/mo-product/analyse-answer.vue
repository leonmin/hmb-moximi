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
        <div class="mo-table-lead">魔小秘接听统计</div>
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
import { mxmCallStatistics } from '@/api/mo-product'
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
          { prop: 'answerNum', label: '接听电话通数', minWidth: 100 },
          { prop: 'answerPeopleNum', label: '接听电话人数', minWidth: 100 },
          { prop: 'totalAnswerTime', label: '接听总时长', minWidth: 100 },
          { prop: 'perCapitaNum', label: '人均接听通数', minWidth: 100 },
          { prop: 'perCapitaTime', label: '人均接听时长', minWidth: 100 },
          { prop: 'callCapitaTime', label: '通均接听时长', minWidth: 100 }
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
      mxmCallStatistics({
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
        '魔小秘接听统计' +
        parseTime(new Date(), '{y}_{m}_{d}_{h}_{i}') +
        '.xlsx'
      await json2excel(
        name,
        [
          { header: '日期', key: 'day' },
          { header: '接听电话通数', key: 'answerNum' },
          { header: '接听电话人数', key: 'answerPeopleNum' },
          { header: '接听总时长', key: 'totalAnswerTime' },
          { header: '人均接听通数', key: 'perCapitaNum' },
          { header: '人均接听时长', key: 'perCapitaTime' },
          { header: '通均接听时长', key: 'callCapitaTime' }
        ],
        this.table.data
      )
    }
  }
}
</script>
<style lang="scss" scoped></style>
