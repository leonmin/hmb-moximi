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
        <div class="mo-table-lead">魔小秘订单统计</div>
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
import { orderStatistics } from '@/api/mo-product'
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
          { prop: 'totalOrder', label: '订单总量', minWidth: 100 },
          { prop: 'moneyOrderNum', label: '现金支付订单量', minWidth: 100 },
          { prop: 'mzOrderNum', label: '魔钻支付订单量', minWidth: 100 },
          { prop: 'taskOrderNum', label: '任务发放订单量', minWidth: 100 },
          { prop: 'yearCardOrderNum', label: '年卡订单量', minWidth: 100 },
          { prop: 'seasonCardOrderNum', label: '季卡订单量', minWidth: 100 },
          { prop: 'monthOrderNum', label: '月卡订单量', minWidth: 100 },
          { prop: 'otherOrderNum', label: '其他订单量', minWidth: 100 }
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
      orderStatistics({
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
        '魔小秘订单统计' +
        parseTime(new Date(), '{y}_{m}_{d}_{h}_{i}') +
        '.xlsx'
      await json2excel(
        name,
        [
          { header: '日期', key: 'day' },
          { header: '订单总量', key: 'totalOrder' },
          { header: '现金支付订单量', key: 'moneyOrderNum' },
          { header: '魔钻支付订单量', key: 'mzOrderNum' },
          { header: '任务发放订单量', key: 'taskOrderNum' },
          { header: '年卡订单量', key: 'yearCardOrderNum' },
          { header: '季卡订单量', key: 'seasonCardOrderNum' },
          { header: '月卡订单量', key: 'monthOrderNum' },
          { header: '其他订单量', key: 'otherOrderNum' }
        ],
        this.table.data
      )
    }
  }
}
</script>
<style lang="scss" scoped></style>
