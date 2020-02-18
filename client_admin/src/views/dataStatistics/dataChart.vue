<template>
  <div class="datachart">
    <div>
      <span>选择时间：</span>
      <el-date-picker
        v-model="month"
        type="month"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择月"
        @change="monthChange"
      />
    </div>
    <el-table
      :data="dataChart"
      style="width: 95%;;margin-top: 40px"
      border
      :summary-method="getSummaries"
      show-summary
      :max-height="fullHeight-220+'px'"
      size="mini"
    >
      <el-table-column prop="ofd" label="到期时间" min-width="150" show-overflow-tooltip />
      <el-table-column prop="ofdUserCount" label="到期人数（周卡/付费）" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.ofdUserCount + scope.row.ofdWeekUserCount }}（{{ scope.row.ofdWeekUserCount }} / {{ scope.row.ofdUserCount }}）</span>
        </template>
      </el-table-column>
      <el-table-column prop="chargeEarly" label="提前续费（周卡/付费）" min-width="140" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.chargeEarly }} （{{ scope.row.chargeEarlyWeek }} / {{ scope.row.chargeEarlyMonth + scope.row.chargeEarlySeason + scope.row.chargeEarlyYear }}）</span>
        </template>
      </el-table-column>
      <el-table-column prop="chargeToday" label="今日续费（周卡/付费）" min-width="140" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.chargeToday }} （{{ scope.row.chargeTodayWeek }} / {{ scope.row.chargeTodayMonth + scope.row.chargeTodaySeason + scope.row.chargeTodayYear }}）</span>
        </template>
      </el-table-column>
      <el-table-column prop="ofd2charge" label="过期1-3天（周卡/付费）" min-width="140" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.ofd2charge }} （{{ scope.row.chargeTodayWeek }} / {{ scope.row.ofd2chargeMonth + scope.row.ofd2chargeSeason + scope.row.ofd2chargeYear }}）</span>
        </template>
      </el-table-column>
      <el-table-column prop="ofd5charge" label="过期4-7天（周卡/付费）" min-width="140" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.ofd5charge }} （{{ scope.row.ofd5chargeWeek }} / {{ scope.row.ofd5chargeMonth + scope.row.ofd5chargeSeason + scope.row.ofd5chargeYear }}）</span>
        </template>
      </el-table-column>
      <el-table-column prop="ofd8charge" label="过期7天以上（周卡/付费）" min-width="140" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.ofd8charge }} （{{ scope.row.ofd8chargeWeek }} / {{ scope.row.ofd8chargeMonth + scope.row.ofd8chargeSeason + scope.row.ofd8chargeYear }}）</span>
        </template>
      </el-table-column>
      <el-table-column prop="rateAll" label="总续费率（周卡续费率/付费续费率）" min-width="200" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.rateAll }}（{{ scope.row.rateWeek }} / {{ scope.row.rateCharge }} ）</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      style="float: right;margin-top: 20px;margin-right: 40px"
      :current-page="searchData.pageNum"
      :page-size="searchData.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { ofdCharge } from '../../api/userManage'
export default {
  filters: {
    fixed: (value) => {
      console.log(value)
    }
  },
  data() {
    return {
      page: 1,
      size: 40,
      fullHeight: document.documentElement.clientHeight, // 页面高度
      dataChart: [],
      searchData: { // 筛选的数据
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      month: ''
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
    this.getTime()
    this.getData()
  },
  methods: {
    getSummaries(param) {
      var _this = this
      const { columns, data } = param
      const sums = []
      var ofTotal
      var ofWeek
      var ofPay
      var chargeEarly
      var chargeEarlyWeek
      var chargeEarlyPay
      var chargeToday
      var chargeTodayWeek
      var chargeTodayPay
      var ofd2charge
      var ofd2chargeWeek
      var ofd2chargePay
      var ofd5charge
      var ofd5chargeWeek
      var ofd5chargePay
      var ofd8charge
      var ofd8chargeWeek
      var ofd8chargePay
      var rateTotal
      var rateWeek
      var rateCharge
      columns.forEach((column, index) => {
        // console.log(column)
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        if (column.property === 'ofdUserCount') {
          ofTotal = data.map(item => Number(item.ofdUserCount + item.ofdWeekUserCount))
          ofWeek = data.map(item => Number(item.ofdWeekUserCount))
          ofPay = data.map(item => Number(item.ofdUserCount))
          if (ofTotal) {
            sums[index] = _this.qiuhe(ofTotal) + '（' + _this.qiuhe(ofWeek) + ' / ' + _this.qiuhe(ofPay) + '）'
          }
        } else if (column.property === 'chargeEarly') {
          chargeEarly = data.map(item => Number(item.chargeEarly))
          chargeEarlyWeek = data.map(item => Number(item.chargeEarlyWeek))
          chargeEarlyPay = data.map(item => Number(item.chargeEarlyMonth + item.chargeEarlySeason + item.chargeEarlyYear))
          if (chargeEarly) {
            sums[index] = _this.qiuhe(chargeEarly) + '（' + _this.qiuhe(chargeEarlyWeek) + ' / ' + _this.qiuhe(chargeEarlyPay) + '）'
          }
        } else if (column.property === 'chargeToday') {
          chargeToday = data.map(item => Number(item.chargeToday))
          chargeTodayWeek = data.map(item => Number(item.chargeTodayWeek))
          chargeTodayPay = data.map(item => Number(item.chargeTodayMonth + item.chargeTodaySeason + item.chargeTodayYear))
          if (chargeToday) {
            sums[index] = _this.qiuhe(chargeToday) + '（' + _this.qiuhe(chargeTodayWeek) + ' / ' + _this.qiuhe(chargeTodayPay) + '）'
          }
        } else if (column.property === 'ofd2charge') {
          ofd2charge = data.map(item => Number(item.ofd2charge))
          ofd2chargeWeek = data.map(item => Number(item.ofd2chargeWeek))
          ofd2chargePay = data.map(item => Number(item.ofd2chargeMonth + item.ofd2chargeSeason + item.ofd2chargeYear))
          if (ofd2charge) {
            sums[index] = _this.qiuhe(ofd2charge) + '（' + _this.qiuhe(ofd2chargeWeek) + ' / ' + _this.qiuhe(ofd2chargePay) + '）'
          }
        } else if (column.property === 'ofd5charge') {
          ofd5charge = data.map(item => Number(item.ofd5charge))
          ofd5chargeWeek = data.map(item => Number(item.ofd5chargeWeek))
          ofd5chargePay = data.map(item => Number(item.ofd5chargeMonth + item.ofd5chargeSeason + item.ofd5chargeYear))
          if (ofd5charge) {
            sums[index] = _this.qiuhe(ofd5charge) + '（' + _this.qiuhe(ofd5chargeWeek) + ' / ' + _this.qiuhe(ofd5chargePay) + '）'
          }
        } else if (column.property === 'ofd8charge') {
          ofd8charge = data.map(item => Number(item.ofd8charge))
          ofd8chargeWeek = data.map(item => Number(item.ofd8chargeWeek))
          ofd8chargePay = data.map(item => Number(item.ofd8chargeMonth + item.ofd8chargeSeason + item.ofd8chargeYear))
          if (ofd8charge) {
            sums[index] = _this.qiuhe(ofd8charge) + '（' + _this.qiuhe(ofd8chargeWeek) + ' / ' + _this.qiuhe(ofd8chargePay) + '）'
          }
        } else if (column.property === 'rateAll') {
          rateWeek = (_this.qiuhe(chargeEarlyWeek) + _this.qiuhe(chargeTodayWeek) + _this.qiuhe(ofd2chargeWeek) + _this.qiuhe(ofd5chargeWeek) + _this.qiuhe(ofd8chargeWeek)) / _this.qiuhe(ofWeek)
          rateCharge = (_this.qiuhe(chargeEarlyPay) + _this.qiuhe(chargeTodayPay) + _this.qiuhe(ofd2chargePay) + _this.qiuhe(ofd5chargePay) + _this.qiuhe(ofd8chargePay)) / _this.qiuhe(ofPay)
          rateTotal = (_this.qiuhe(chargeEarly) + _this.qiuhe(chargeToday) + _this.qiuhe(ofd2charge) + _this.qiuhe(ofd5charge) + _this.qiuhe(ofd8charge)) / _this.qiuhe(ofTotal)
          if (!Number.isNaN(rateWeek)) {
            sums[index] = _this.toPercent(rateTotal) + '（' + _this.toPercent(rateWeek) + ' / ' + _this.toPercent(rateCharge) + '）'
          }
        }
      })
      return sums
    },
    qiuhe(arr) {
      // console.log(arr)
      if (arr.length != 0) {
        return arr.reduce((prev, curr, idx, arr) => {
          return prev + curr
        })
      }
    },
    toPoint(percent) {
      var str = percent.replace('%', '')
      str = str / 100
      return str
    },
    toPercent(point) {
      var str = Number(point * 100).toFixed(2)
      str += '%'
      return str
    },
    changeArr(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (Number.isNaN(arr[i]) || Number.isFinite(arr[i])) {
          arr[i] = 0
        }
      }
    },
    getTime() {
      var myDate = new Date()
      var year = myDate.getFullYear()
      var month = myDate.getMonth() + 1
      this.month = year + '-' + this.conver(month) + '-' + '01' + ' ' + '00:00:00'
      console.log(this.month)
    },
    conver(s) {
      return s < 10 ? '0' + s : s
    },
    monthChange(value) {
      console.log(value)
      if (value) {
        this.month = value
        this.getData()
      }
    },
    // 当前页码
    handleSizeChange(val) {
      this.searchData.pageSize = val
      this.getData()
    },
    // 当前页数
    handleCurrentChange(val) {
      this.page = val
      this.searchData.pageNum = val
      this.getData()
    },
    getData() {
      const params = {
        page: this.page,
        size: this.size,
        month: this.month
      }
      ofdCharge(params).then(res => {
        this.dataChart = res.data.records
        this.total = res.data.total
      })
    }

  }
}
</script>

<style scoped>
  .datachart{
    margin: 40px;
  }
</style>
