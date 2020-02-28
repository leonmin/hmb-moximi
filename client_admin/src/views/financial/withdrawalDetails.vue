<template>
  <div class="outBox">
    <el-card style="padding: 10px">
      <div slot="header" class="clearfix">
        <span>提成明细</span>
      </div>
      <div>
        <div>
          <span>关键字：</span>
          <el-input v-model="searchKey" placeholder="请输入用户名/订单编号" clearable style="width: 200px" />
          <el-button type="primary">查询</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          :max-height="fullHeight-340+'px'"
          :summary-method="getSummaries"
          show-summary
          style="margin-top: 30px"
        >
          <el-table-column prop="orderId" label="订单编号" min-width="100" show-overflow-tooltip />
          <el-table-column prop="profitUserName" label="用户名" min-width="100" show-overflow-tooltip />
          <el-table-column prop="sku" label="会员卡续费种类" min-width="100" show-overflow-tooltip />
          <el-table-column prop="price" label="会员卡续费金额" min-width="100" show-overflow-tooltip >
            <template v-slot="scope">
              <span>{{ scope.row.price/100 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="payPrice" label="实际支付金额" min-width="100" show-overflow-tooltip>
            <template v-slot="scope">
              <span>{{ scope.row.payPrice/100 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="scale" label="提成比例" min-width="100" show-overflow-tooltip />
          <el-table-column prop="profit" label="提成金额" min-width="100" show-overflow-tooltip>
            <template v-slot="scope">
              <span>{{ scope.row.profit/100 }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="float: right;margin-top: 20px;margin-right: 40px"
          :current-page="pageNum"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { profitList } from '../../api/userManage'
export default {
  data() {
    return {
      searchKey: '',
      pageNum: 1,
      pageSize: 10,
      total: null, // 总数
      isPaging: false, // 是否是分页
      tableData: [],
      fullHeight: document.documentElement.clientHeight // 页面高度
    }
  },
  watch: {
    fullHeight(val) {
      if (!this.timer) {
        this.fullHeight = val
        this.timer = true
        const that = this
        setTimeout(function() {
          that.timer = false
        }, 400)
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      const params = {
        userId: this.$route.query.id,
        searchKey: this.searchKey,
        pageNum: this.pageNum
      }
      profitList(params).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    // 合计
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value)) && column.property == 'profit') {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          // sums[index] += ' 元'
          sums[index] = sums[index] / 100 + ' 元'
        } else {
          sums[index] = '/'
        }
      })

      return sums
    },
    // 当前页码
    handleSizeChange(val) {
      console.log(val)
      // this.pageSize = val
      // this.initData()
    },
    // 当前页数
    handleCurrentChange(val) {
      this.pageNum = val
      this.initData()
    }
  }
}
</script>

<style scoped>
.outBox{
  margin: 30px;
}
</style>
