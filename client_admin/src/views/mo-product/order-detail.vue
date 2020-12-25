<template>
  <div class="page">
    <el-card :style="{ marginBottom: '10px' }">
      <mo-search
        :query.sync="query"
        :payment-list="paymentList"
        :disabled-today="false"
        layout="daterange, payment"
        @on-query="handleQuery"
      ></mo-search>
    </el-card>
    <el-card>
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
import { orderList } from '@/api/mo-product'
import { orderTypes } from '@/config'
export default {
  props: {},
  data() {
    const self = this
    return {
      query: {},
      loading: false,
      channel: {},
      paymentList: [],
      table: {
        page: 1,
        total: 0,
        size: 20,
        data: [],
        columns: [
          { prop: 'no', label: '订单编号', minWidth: 100 },
          { prop: 'prop2', label: '会员卡续费时间', minWidth: 100 },
          { prop: 'price', label: '会员卡续费金额', minWidth: 100 },
          { prop: 'payTime', label: '支付时间', minWidth: 150 },
          { prop: 'prop5', label: '支付用户名', minWidth: 100 },
          { prop: 'prop6', label: '支付手机号', minWidth: 100 },
          {
            prop: 'payChannel',
            label: '支付渠道',
            minWidth: 100,
            render: (h, { row }) => {
              return (self.channel || {})[row.payChannel] || ''
            }
          },
          {
            prop: 'couponPrice',
            label: '是否使用优惠券',
            minWidth: 100,
            render: (h, { row }) => {
              return (row.couponPrice || 0) > 0 ? '是' : '否'
            }
          },
          { prop: 'couponPrice', label: '优惠券抵扣金额', minWidth: 100 },
          { prop: 'payPrice', label: '实际支付金额', minWidth: 100 },
          { prop: 'profit', label: '提成金额', minWidth: 100 },
          {
            prop: 'orderStatus',
            label: '订单状态',
            minWidth: 100,
            render: (h, { row }) => {
              return orderTypes[row.orderStatus] || ''
            }
          }
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
      orderList({
        ...this.query,
        pageNum: this.table.page || 1
        // pageSize: 20
      }).then(res => {
        this.loading = false
        const { code, data } = res || {}
        if (code === 0 && data) {
          this.paymentList = []
          const { channel = {}, page = {} } = data
          this.channel = channel
          Object.keys(channel).map(c => {
            this.paymentList.push({
              label: channel[c],
              value: c
            })
          })
          const { records = [], total = 0, size = 10 } = page
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
          { header: '日期', key: 'no' },
          { header: '会员卡续费时间', key: 'prop2' },
          { header: '会员卡续费金额', key: 'price' },
          { header: '支付时间', key: 'payTime' },
          { header: '支付用户名', key: 'prop5' },
          { header: '支付手机号', key: 'prop6' },
          { header: '支付渠道', key: 'payChannel' },
          { header: '是否使用优惠券', key: 'couponPrice' },
          { header: '优惠券抵扣金额', key: 'couponPrice' },
          { header: '实际支付金额', key: 'payPrice' },
          { header: '提成金额', key: 'profit' },
          { header: '订单状态', key: 'orderStatus' }
        ],
        this.table.data
      )
    }
  }
}
</script>
<style lang="scss" scoped></style>
