<template>
  <div id="main" v-loading="loading" style="overflow: hidden">
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
    <div id="myChart" />
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
      legend: ['收入', '返佣', '提现', '成本支出'],
      xAxis: [],
      series: []
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
      var Date7 = new Date(myDate.getTime() - 144 * 60 * 60 * 1000)
      var year1 = Date7.getFullYear()
      var month1 = Date7.getMonth() + 1
      var date1 = Date7.getDate()
      this.begin = year1 + '-' + this.conver(month1) + '-' + this.conver(date1) + ' ' + '00:00:00'
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
    // 初始化数据
    initData() {
      this.xAxis = []
      this.series = []
      const params = {
        begin: this.begin,
        end: this.end
      }
      dataMonth(params).then(res => {
        var income = [] // 收入
        var commission = [] // 返佣
        var withdrawal = [] // 提现
        var spending = [] // 成本支出
        for (let i = 0; i < res.data.length; i++) {
          this.xAxis.push(this.dealDate(res.data[i].begin))
          income.push(res.data[i].sumPayPrice)
          commission.push(res.data[i].orderWaitPay)
          withdrawal.push(res.data[i].orderWeekShare)
          spending.push(res.data[i].orderAllWeek - res.data[i].orderWeekShare)
          this.series = [
            {
              name: '收入',
              type: 'bar',
              color: '#C25552',
              data: income
            },
            {
              name: '返佣',
              type: 'bar',
              color: '#36BBCE',
              data: commission
            },
            {
              name: '提现',
              type: 'bar',
              color: '#00AA72',
              data: withdrawal
            },
            {
              name: '成本支出',
              type: 'bar',
              color: '#6A48D7',
              data: spending
            }
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
  #myChart{
    width: calc(100% - 60px);
    margin:30px;
    height: 600px;
  }
  .time{
    margin-top: 30px;
    margin-left: 30px;
  }
</style>
