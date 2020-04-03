<template>
  <div id="main" v-loading="loading" style="overflow: hidden">
    <div style="margin-left: 80px">
      <span>选择时间：</span>
      <el-date-picker
        v-model="value"
        class="time"
        format="yyyy-MM-dd"
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

    <div id="myChartPay" />
    <div id="myChartCard" />
    <!--    <div id="myChartRenewal" />-->
    <!--    <div id="myChartWeekCard" />-->
    <div style="margin-left: 75px;margin-top: 40px;margin-bottom: 10px;color: #6699FF">合计</div>
    <el-table
      :data="tableData"
      style="width: 90%;margin:auto;margin-bottom: 40px"
      border
      size="mini"
    >
      <el-table-column prop="orderPayed" label="已支付" min-width="120" show-overflow-tooltip />
      <el-table-column prop="orderWaitPay" label="等待支付" min-width="120" show-overflow-tooltip />
      <el-table-column prop="orderWeekShare" label="免费周卡" min-width="120" show-overflow-tooltip />
      <el-table-column prop="orderWeekPay" label="付费周卡" min-width="120" show-overflow-tooltip />
      <el-table-column prop="orderAllWeek" label="周卡(免费+付费)" min-width="120" show-overflow-tooltip />
      <el-table-column prop="orderPayedMonth" label="月卡" min-width="120" show-overflow-tooltip />
      <el-table-column prop="orderPayedSeason" label="季卡" min-width="120" show-overflow-tooltip />
      <el-table-column prop="orderPayedYear" label="年卡" min-width="120" show-overflow-tooltip />
      <el-table-column prop="totalExCard" label="卡密" min-width="120" show-overflow-tooltip />
    </el-table>
    <el-table
      :data="initTableData"
      border
      show-summary
      size="mini"
      :max-height="400"
      style="width: 90%;margin:auto;margin-bottom: 40px"
    >
      <el-table-column prop="begin" label="日期" min-width="120" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.begin.split(' ')[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="countPayUserOld" label="老用户支付数量" min-width="120" show-overflow-tooltip />
      <el-table-column prop="countPayUserOldNormal" label="老用户正常支付数量" min-width="120" show-overflow-tooltip />
      <el-table-column prop="countPayUserOldCoupon" label="老用户优惠券支付数量" min-width="120" show-overflow-tooltip />
      <el-table-column prop="countPayUserOldGreen" label="老用户绿色通道支付数量" min-width="120" show-overflow-tooltip />
      <el-table-column prop="countPayUserNew" label="新用户支付数量" min-width="120" show-overflow-tooltip />
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
      initTableData: [],
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
      xAxis: [],
      series: [],
      paySeries: [],
      cardSeries: [],
      renewalSeries: [],
      tableData: [],
      isdataZoom: false
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
      console.log(this.begin, this.end)
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
        this.initTableData = res.data
        var payedData = []
        var notPay = []

        var weekShare = []
        var allWeek = []
        var monthCard = []
        var seasonCard = []
        var yearCard = []
        var exCard = []

        var renewalDate = []
        var unrenewalDate = []
        var renewalNum = []
        var weekrenewalDate = []
        var weekunrenewalDate = []
        var weekrenewalNum = []
        // 合计
        var totalPayed = 0
        var totalWaitPayed = 0
        var totalWeekShare = 0
        var totalAllWeek = 0
        var totalPayedMonth = 0
        var totalPayedSeason = 0
        var totalPayedYear = 0
        var totalExCard = 0
        var totalWeekPay = 0

        for (let i = 0; i < res.data.length; i++) {
          this.xAxis.push(this.dealDate(res.data[i].begin))
          payedData.push(res.data[i].orderPayed)
          notPay.push(res.data[i].orderWaitPay)
          // 第二个图表
          weekShare.push(res.data[i].orderWeekShare)
          allWeek.push(res.data[i].orderAllWeek - res.data[i].orderWeekShare)
          monthCard.push(res.data[i].orderPayedMonth)
          seasonCard.push(res.data[i].orderPayedSeason)
          yearCard.push(res.data[i].orderPayedYear)
          exCard.push(res.data[i].orderExCard ? res.data[i].orderExCard : 0)
          // 第三个图表
          renewalDate.push(res.data[i].ofdRenew)
          unrenewalDate.push(res.data[i].renew)
          renewalNum.push(res.data[i].ofdUser)
          // 第四个图表
          weekrenewalDate.push(res.data[i].weekOfdRenew)
          weekunrenewalDate.push(res.data[i].weekRenew)
          weekrenewalNum.push(res.data[i].weekOfdUser)
          // 合计
          totalPayed = totalPayed + res.data[i].orderPayed
          totalWaitPayed = totalWaitPayed + res.data[i].orderWaitPay
          totalWeekShare = totalWeekShare + res.data[i].orderWeekShare
          totalAllWeek = totalAllWeek + res.data[i].orderAllWeek
          totalWeekPay = totalAllWeek - totalWeekShare
          totalPayedMonth = totalPayedMonth + res.data[i].orderPayedMonth
          totalPayedSeason = totalPayedSeason + res.data[i].orderPayedSeason
          totalPayedYear = totalPayedYear + res.data[i].orderPayedYear
          totalExCard = totalExCard + res.data[i].orderExCard
          this.paySeries = [
            {
              name: '等待支付',
              type: 'bar',
              stack: '支付',
              color: '#D0917A',
              data: notPay
            },
            {
              name: '已支付',
              type: 'bar',
              stack: '支付',
              color: '#C25552',
              barMaxWidth: '60px',
              data: payedData
            }
          ]
          this.cardSeries = [
            {
              name: '卡密',
              type: 'bar',
              stack: '支付卡',
              color: '#c9a91d',
              data: exCard
            },
            {
              name: '年卡',
              type: 'bar',
              stack: '支付卡',
              color: '#74e10c',
              data: yearCard
            },
            {
              name: '季卡',
              type: 'bar',
              stack: '支付卡',
              color: '#bcb2d7',
              data: seasonCard
            },
            {
              name: '月卡',
              type: 'bar',
              stack: '支付卡',
              color: '#00b376',
              data: monthCard
            },
            {
              name: '周卡',
              type: 'bar',
              stack: '支付卡',
              color: '#124b9c',
              data: allWeek
            },
            {
              name: '免费周卡',
              type: 'bar',
              stack: '支付卡',
              barMaxWidth: '60px',
              color: '#5fc7ce',
              data: weekShare
            }
          ]
          this.renewalSeries = [
            {
              name: '过期续费',
              type: 'bar',
              stack: '过期',
              color: '#6A48D7',
              barMaxWidth: '60px',
              data: renewalDate
            },
            {
              name: '未过期续费',
              type: 'bar',
              stack: '过期',
              color: '#00a0d7',
              barMaxWidth: '60px',
              data: unrenewalDate
            },
            {
              name: '过期人数',
              type: 'bar',
              stack: '过期',
              color: '#d745d1',
              barMaxWidth: '60px',
              data: renewalNum
            }
          ]
          this.weekSeries = [
            {
              name: '周卡过期续费',
              type: 'bar',
              stack: '周卡',
              color: '#d75413',
              barMaxWidth: '60px',
              data: weekrenewalDate
            },
            {
              name: '周卡未过期续费',
              type: 'bar',
              stack: '周卡',
              color: '#d7bf26',
              barMaxWidth: '60px',
              data: weekunrenewalDate
            },
            {
              name: '周卡过期人数',
              type: 'bar',
              stack: '周卡',
              color: '#a8d70b',
              barMaxWidth: '60px',
              data: weekrenewalNum
            }
          ]
        }
        this.tableData = [{ orderPayed: totalPayed, orderWaitPay: totalWaitPayed, orderWeekShare: totalWeekShare,
          orderAllWeek: totalAllWeek, orderWeekPay: totalWeekPay, orderPayedMonth: totalPayedMonth, orderPayedSeason: totalPayedSeason,
          orderPayedYear: totalPayedYear, totalExCard: totalExCard }]
        // this.xAxis
        this.drawLinePay()
        this.drawLineCard()
        // this.drawLineRenewal()
        // this.drawLineWeekCard()
      })
    },
    dealDate(date) {
      return String(date).split(' ')[0]
    },
    // 绘制图表支付
    drawLinePay() {
      console.log('x的长度0', this.xAxis.length)
      if (this.xAxis.length <= 6) {
        this.isdataZoom = null
      } else {
        this.isdataZoom = {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          left: '4%',
          bottom: -25,
          start: 0,
          end: 70
        }
      }
      var _this = this
      this.loading = true
      // 基于准备好的dom，初始化echarts实例
      const myChartPay = this.$echarts.init(document.getElementById('myChartPay'))
      // 绘制图表
      myChartPay.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['已支付', '等待支付']
        },
        grid: {
          top: '12%',
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
        dataZoom: _this.isdataZoom,
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
        series: _this.paySeries
      })
      // window.onresize = function() {
      //   myChartPay.resize()
      // }
      this.loading = false
    },
    //  绘制支付卡图表
    drawLineCard() {
      console.log('x的长度1', this.xAxis.length)
      if (this.xAxis.length <= 6) {
        this.isdataZoom = null
      } else {
        this.isdataZoom = {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          left: '4%',
          bottom: -25,
          start: 0,
          end: 70
        }
      }
      var _this = this
      this.loading = true
      // 基于准备好的dom，初始化echarts实例
      const myChartCard = this.$echarts.init(document.getElementById('myChartCard'))
      const myChartPay = this.$echarts.init(document.getElementById('myChartPay'))
      // 绘制图表
      myChartCard.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['免费周卡', '周卡', '月卡', '季卡', '年卡', '卡密']
        },
        grid: {
          top: '12%',
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
        dataZoom: _this.isdataZoom,
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
        series: _this.cardSeries
      })
      window.onresize = function() {
        myChartCard.resize()
        myChartPay.resize()
      }
      this.loading = false
    },
    //  绘制续费图表
    drawLineRenewal() {
      var _this = this
      this.loading = true
      // 基于准备好的dom，初始化echarts实例
      const myChartRenewal = this.$echarts.init(document.getElementById('myChartRenewal'))
      // 绘制图表
      myChartRenewal.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['过期续费', '未过期续费', '过期人数']
        },
        grid: {
          top: '12%',
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
        series: _this.renewalSeries
      })
      window.onresize = function() {
        myChartRenewal.resize()
      }
      this.loading = false
    },
    //  绘制周卡图表
    drawLineWeekCard() {
      var _this = this
      this.loading = true
      // 基于准备好的dom，初始化echarts实例
      const myChartWeekCard = this.$echarts.init(document.getElementById('myChartWeekCard'))
      // 绘制图表
      myChartWeekCard.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['周卡过期续费', '周卡未过期续费', '周卡过期人数']
        },
        grid: {
          top: '12%',
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
        series: _this.weekSeries
      })
      window.onresize = function() {
        myChartWeekCard.resize()
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
  #main{
  }
  #myChartPay,#myChartCard,#myChartRenewal,#myChartWeekCard{
    width: calc(100% - 220px);
    margin:30px;
    height: 250px;
  }
  .time{
    margin-top: 30px;
    margin-left: 30px;
  }
</style>
