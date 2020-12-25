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
        <div class="mo-table-lead">好友分红统计</div>
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
import { friendProfitStatistics } from '@/api/mo-product'
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
          { prop: 'shareNum', label: '分享人数', minWidth: 100 },
          {
            prop: 'lessThreeFriend',
            label: '3位好友以下用户数',
            minWidth: 100
          },
          {
            prop: 'greatThreeFriend',
            label: '3位好友以上用户数',
            minWidth: 100
          },
          { prop: 'channelNum', label: '渠道商数', minWidth: 100 },
          { prop: 'taskGrant', label: '好友任务发放(元)', minWidth: 100 },
          { prop: 'sonGrant', label: '直推好友发放(元)', minWidth: 100 },
          { prop: 'grandSonGrant', label: '间推好友发放(元)', minWidth: 100 },
          { prop: 'channelGrant', label: '扩散好友发放(元)', minWidth: 100 },
          { prop: 'totalGrant', label: '发放总额(元)', minWidth: 100 },
          { prop: 'autoExchange', label: '自动划转总额(元)', minWidth: 100 }
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
      friendProfitStatistics({
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
        '好友分红统计' + parseTime(new Date(), '{y}_{m}_{d}_{h}_{i}') + '.xlsx'
      await json2excel(
        name,
        [
          { header: '日期', key: 'day' },
          { header: '分享人数', key: 'shareNum' },
          { header: '3位好友以下用户数', key: 'lessThreeFriend' },
          { header: '3位好友以上用户数', key: 'lessThreeFriend' },
          { header: '渠道商数', key: 'channelNum' },
          { header: '好友任务发放(元)', key: 'taskGrant' },
          { header: '直推好友发放(元)', key: 'sonGrant' },
          { header: '间推好友发放(元)', key: 'grandSonGrant' },
          { header: '扩散好友发放(元)', key: 'channelGrant' },
          { header: '发放总额(元)', key: 'totalGrant' },
          { header: '自动划转总额(元)', key: 'autoExchange' }
        ],
        this.table.data
      )
    }
  }
}
</script>
<style lang="scss" scoped></style>
