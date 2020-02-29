<template>
  <div id="main" v-loading="loading" style="overflow: hidden">
    <div style="margin-left: 140px">
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

    <div style="margin-top: 30px;color: #6699FF;margin-left: 140px">
      <span>付费人数</span>
    </div>
    <div id="payCountChart" />
    <div style="margin-top: 30px;color: #6699FF;margin-left: 140px">
      <span>付费金额</span>
    </div>
    <div id="payPriceChart" />
  </div>

</template>

<script>
import { dataMonth } from '@/api/dataStatistics'
export default {
  data: function() {
    return {
      loading: false,
      value: [],
      begin: '',
      end: '',
      now: '',
      dataChart: [],
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
      payCountLegend: ['正常付费', '绿色通道', '优惠券'],
      payCountxAxis: [],
      payCountNormal: [],
      payCountGreen: [],
      payCountCoupon: [],
      payPriceNormal: [],
      payPriceGreen: [],
      payPriceCoupon: []
    }
  },
  mounted() {
    this.getTime()
    this.getData()
  },
  methods: {
    // 初始化数据
    getData() {
      const params = {
        begin: this.begin,
        end: this.end
      }
      dataMonth(params).then(res => {
        this.dataChart = res.data
        this.payCountxAxis = []
        this.payCountNormal = []
        this.payCountGreen = []
        this.payCountCoupon = []
        this.payPriceNormal = []
        this.payPriceGreen = []
        this.payPriceCoupon = []
        for (let i = 0; i < this.dataChart.length; i++) {
          // console.log('hhhhhhh', this.dataChart[i].countPayUserCoupon)
          // X轴
          this.payCountxAxis.push(this.dataChart[i].begin.split(' ')[0])
          //  付费人数 正常付费
          this.payCountNormal.push(this.dataChart[i].countPayUserNormal == null ? 0 : this.dataChart[i].countPayUserNormal)
          //  正常付费 绿色通道
          this.payCountGreen.push(this.dataChart[i].countPayUserGreen == null ? 0 : this.dataChart[i].countPayUserGreen)
          // 正常付费 优惠券
          this.payCountCoupon.push(this.dataChart[i].countPayUserCoupon == null ? 0 : this.dataChart[i].countPayUserCoupon)
          //  付费金额 正常付费
          this.payPriceNormal.push(this.dataChart[i].sumPayPriceNormal == null ? 0 : this.dataChart[i].sumPayPriceNormal / 100)
          //  付费金额 绿色通道
          this.payPriceGreen.push(this.dataChart[i].sumPayPriceGreen == null ? 0 : this.dataChart[i].sumPayPriceGreen / 100)
          //  付费金额 优惠券
          this.payPriceCoupon.push(this.dataChart[i].sumPayPriceCoupon == null ? 0 : this.dataChart[i].sumPayPriceCoupon / 100)
        }
        this.drawPayCount()
        this.drawPriceCount()
      })
    },
    // 付费人数统计表
    drawPayCount() {
      var that = this
      const payCountChart = this.$echarts.init(document.getElementById('payCountChart'))
      var app = {}
      var posList = [
        'left', 'right', 'top', 'bottom',
        'inside',
        'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
        'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
      ]
      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: 'left',
            center: 'center',
            right: 'right'
          }
        },
        verticalAlign: {
          options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
          }
        },
        position: {
          options: this.$echarts.util.reduce(posList, function(map, pos) {
            map[pos] = pos
            return map
          }, {})
        },
        distance: {
          min: 0,
          max: 100
        }
      }
      app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function() {
          var labelOption = {
            normal: {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance
            }
          }
          payCountChart.setOption({
            series: [{
              label: labelOption
            }, {
              label: labelOption
            }, {
              label: labelOption
            }, {
              label: labelOption
            }]
          })
        }
      }
      var labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {
            textBorderColor: '#fff'
          }
        }
      }
      // 绘制图表
      payCountChart.setOption({
        color: ['#003366', '#006699', '#4cabce'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: that.payCountLegend
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        dataZoom: {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          height: 20,
          left: '9%',
          bottom: -5,
          start: 0,
          end: 40
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: that.payCountxAxis
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [{
          name: '正常付费',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          data: that.payCountNormal
        },
        {
          name: '绿色通道',
          type: 'bar',
          label: labelOption,
          data: that.payCountGreen
        },
        {
          name: '优惠券',
          type: 'bar',
          label: labelOption,
          data: that.payCountCoupon
        }]
      })
      // window.onresize = function() {
      //   payCountChart.resize()
      // }
    },
    // 付费人数统计表
    drawPriceCount() {
      var that = this
      const payCountChart = this.$echarts.init(document.getElementById('payCountChart'))
      const payPriceChart = this.$echarts.init(document.getElementById('payPriceChart'))
      var app = {}
      var posList = [
        'left', 'right', 'top', 'bottom',
        'inside',
        'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
        'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
      ]
      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: 'left',
            center: 'center',
            right: 'right'
          }
        },
        verticalAlign: {
          options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
          }
        },
        position: {
          options: this.$echarts.util.reduce(posList, function(map, pos) {
            map[pos] = pos
            return map
          }, {})
        },
        distance: {
          min: 0,
          max: 100
        }
      }
      app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function() {
          var labelOption = {
            normal: {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance
            }
          }
          payPriceChart.setOption({
            series: [{
              label: labelOption
            }, {
              label: labelOption
            }, {
              label: labelOption
            }, {
              label: labelOption
            }]
          })
        }
      }
      var labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {
            textBorderColor: '#fff'
          }
        }
      }
      // 绘制图表
      payPriceChart.setOption({
        color: ['#003366', '#006699', '#4cabce'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: that.payCountLegend
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        dataZoom: {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          height: 20,
          left: '9%',
          bottom: -5,
          start: 0,
          end: 40
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: that.payCountxAxis
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [{
          name: '正常付费',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          data: that.payPriceNormal
        },
        {
          name: '绿色通道',
          type: 'bar',
          label: labelOption,
          data: that.payPriceGreen
        },
        {
          name: '优惠券',
          type: 'bar',
          label: labelOption,
          data: that.payPriceCoupon
        }]
      })
      window.onresize = function() {
        payPriceChart.resize()
        payCountChart.resize()
      }
    },
    // 初始化时间
    getTime() {
      var myDate = new Date()
      var year = myDate.getFullYear()
      var month = myDate.getMonth() + 1
      var date = myDate.getDate()
      this.begin = year + '-' + this.conver(month) + '-' + '01' + ' ' + '00:00:00'
      this.end = year + '-' + this.conver(month) + '-' + this.conver(date) + ' ' + '00:00:00'
      console.log('时间', this.begin, this.end)
    },
    conver(s) {
      return s < 10 ? '0' + s : s
    },
    // 选择时间
    timeChange(ev) {
      if (ev !== null) {
        this.begin = ev[0]
        this.end = ev[1]
        console.log(this.begin, this.end)
      } else {
        this.getTime()
      }
      this.getData()
    }
  }
}
</script>

<style scoped>
#main{
  margin: 40px 0;
}
#payCountChart,#payPriceChart{
  width: calc(100% - 180px);
  margin:30px 0;
  height: 300px;
}
</style>
