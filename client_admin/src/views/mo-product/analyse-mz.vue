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
        <div class="mo-table-lead">魔钻统计</div>
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
import { mzStatistics } from '@/api/mo-product'
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
          { prop: 'grantTotal', label: '发放总数', minWidth: 100 },
          { prop: 'grantPeopleTotal', label: '发放人数', minWidth: 100 },
          { prop: 'mcProductNum', label: '魔宠产生数', minWidth: 100 },
          { prop: 'taskProductNum', label: '任务发放数', minWidth: 100 },
          { prop: 'callReceiveNum', label: '通话领取数', minWidth: 100 },
          {
            prop: 'mzLtFiftyPeople',
            label: '魔钻余额大于50人数',
            minWidth: 100
          },
          {
            prop: 'mzLtFiftyNum',
            label: '魔钻余额大于50的人所拥有的魔钻数',
            minWidth: 100
          },
          { prop: 'exchangeMcUse', label: '兑换魔宠消耗数', minWidth: 100 },
          { prop: 'bonusUse', label: '分红消耗数', minWidth: 100 },

          { prop: 'circulation', label: '魔钻流通数', minWidth: 100 },
          { prop: 'circulationNum', label: '魔钻流通次数', minWidth: 100 }
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
      mzStatistics({
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
        '魔钻统计' + parseTime(new Date(), '{y}_{m}_{d}_{h}_{i}') + '.xlsx'
      await json2excel(
        name,
        [
          { header: '日期', key: 'day' },
          { header: '发放总数', key: 'grantTotal' },
          { header: '发放人数', key: 'grantPeopleTotal' },
          { header: '魔宠产生数', key: 'mcProductNum' },
          { header: '任务发放数', key: 'taskProductNum' },
          { header: '通话领取数', key: 'callReceiveNum' },
          { header: '魔钻余额大于50人数', key: 'mzLtFiftyPeople' },
          { header: '魔钻余额大于50的人所拥有的魔钻数', key: 'mzLtFiftyNum' },
          { header: '兑换魔宠消耗数', key: 'exchangeMcUse' },
          { header: '分红消耗数', key: 'bonusUse' },
          { header: '魔钻流通数', key: 'circulation' },
          { header: '魔钻流通次数', key: 'circulationNum' }
        ],
        this.table.data
      )
    }
  }
}
</script>
<style lang="scss" scoped></style>
