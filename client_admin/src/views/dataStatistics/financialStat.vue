<template>
  <div id="main" v-loading="loading" style="overflow: hidden">
    <div style="margin-left: 80px">
      <span>选择时间：</span>
      <el-date-picker
        v-model="value"
        class="time"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
        @change="timeChange"
      />
    </div>
    <!--    收入 返佣 提现图标-->
    <div id="myChart" />
    <!--    支付渠道统计-->
    <el-table
      :data="tableData"
      style="width: 90%;margin:auto;margin-bottom: 40px;margin-top: 50px"
      border
      show-summary
      size="mini"
    >
      <el-table-column prop="begin" label="时间" min-width="120" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.begin.split(' ')[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="orderWeekShare" label="周卡订单数" min-width="120" show-overflow-tooltip />
      <el-table-column prop="countOrderPayWxgzh" :formatter="dataFormate" label="公众号支付数" min-width="120" show-overflow-tooltip />
      <el-table-column prop="sumOrderPayWxgzh" label="公众号支付金额" min-width="120" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.sumOrderPayWxgzh }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="countOrderPayWxApp" :formatter="dataFormate" label="APP微信支付数" min-width="120" show-overflow-tooltip />
      <el-table-column prop="sumOrderPayWxApp" label="APP微信支付金额" min-width="120" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.sumOrderPayWxApp }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="countOrderPayAliApp" :formatter="dataFormate" label="APP支付宝支付数" min-width="120" show-overflow-tooltip />
      <el-table-column prop="sumOrderPayAliApp" label="APP支付宝支付金额" min-width="120" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.sumOrderPayAliApp }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sumPayProfit" label="提成" min-width="120" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.sumPayProfit }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { dataMonth } from '@/api/dataStatistics'
export default {
  name: '',
  // 存放 数据
  data: function() {
    return {
      loading: false,
      value: [],
      begin: '',
      end: '',
      now: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }],
        disabledDate(time) {
          return time.getTime() > new Date(new Date().toLocaleDateString()).getTime()
        }
      },
      legend: ['收入', '返佣', '提现'],
      xAxis: [],
      series: [],
      isDatazoom: false,
      tableData: []
    }
  },
  mounted() {
    this.getTime()
    this.initData()
  },
  methods: {
    getTime() {
      var myDate = new Date()
      var year = myDate.getFullYear()
      var month = myDate.getMonth() + 1
      var date = myDate.getDate()
      this.begin = year + '-' + this.conver(month) + '-' + '01' + ' ' + '00:00:00'
      this.end = year + '-' + this.conver(month) + '-' + this.conver(date) + ' ' + '00:00:00'
    },
    conver(s) {
      return s < 10 ? '0' + s : s
    },
    // 选择时间
    timeChange(ev) {
      if (ev !== null) {
        this.begin = ev[0]
        this.end = ev[1]
      } else {
        this.getTime()
      }
      this.initData()
    },
    dataFormate(row, column, cellValue) {
      if (cellValue == null) {
        cellValue = 0
        return cellValue
      } else {
        return cellValue
      }
    },
    // 初始化数据
    initData() {
      this.xAxis = []
      this.series = []
      this.channelSeries = []
      const params = {
        begin: this.begin,
        end: this.end
      }
      dataMonth(params).then(res => {
        this.tableData = res.data
        this.tableData.forEach((item, index) => {
          this.tableData[index].sumPayProfit = item.sumPayProfit / 100
          this.tableData[index].sumOrderPayWxgzh = item.sumOrderPayWxgzh / 100
          this.tableData[index].sumOrderPayWxApp = item.sumOrderPayWxApp / 100
          this.tableData[index].sumOrderPayAliApp = item.sumOrderPayAliApp / 100
        })
        var income = [] // 收入
        var commission = [] // 返佣
        var withdrawal = [] // 提现
        // var spending = [] // 成本支出
        for (let i = 0; i < res.data.length; i++) {
          this.xAxis.push(this.dealDate(res.data[i].begin))
          income.push(res.data[i].sumPayPrice / 100)
          commission.push(res.data[i].sumPayProfit / 100)
          withdrawal.push(res.data[i].sumCashOut / 100)

          // spending.push(res.data[i].orderAllWeek - res.data[i].orderWeekShare)
          this.series = [
            {
              name: '收入',
              type: 'bar',
              color: '#C25552',
              barWidth: 20,
              data: income
            },
            {
              name: '返佣',
              type: 'bar',
              color: '#36BBCE',
              barWidth: 20,
              data: commission
            },
            {
              name: '提现',
              type: 'bar',
              color: '#00AA72',
              barWidth: 20,
              data: withdrawal
            }
            // {
            //   name: '成本支出',
            //   type: 'bar',
            //   color: '#6A48D7',
            //   data: spending
            // }
          ]
        }
        // this.xAxis
        this.drawLine()
      })
    },
    dealDate(date) {
      return String(date).split(' ')[0]
    },
    // 绘制图表
    drawLine() {
      if (this.xAxis.length <= 15) {
        this.isDatazoom = null
      } else {
        this.isDatazoom = {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          left: '4%',
          bottom: -20,
          start: 0,
          end: 50
        }
      }
      var _this = this
      this.loading = true
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: _this.legend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        dataZoom: _this.isDatazoom,
        xAxis: [
          {
            type: 'category',
            data: _this.xAxis
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: _this.series
      })
      window.onresize = function() {
        myChart.resize()
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
  #myChart,#channelChart{
    /*width: calc(100% - 180px);*/
    /*margin:30px;*/
    height: 600px;
  }
  #channelChart{
    margin-top: 30px;
  }
  .time{
    margin-top: 30px;
    margin-left: 30px;
  }
</style>
