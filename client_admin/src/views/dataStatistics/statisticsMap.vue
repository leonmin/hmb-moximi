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
import { statisticsS3 } from '@/api/dataStatistics'
export default {
  name: '',
  // 存放 数据
  data: function() {
    return {
      loading: false,
      value: [],
      begin: '',
      end: '',
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
      }
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    // 选择时间
    timeChange(ev) {
      if (ev !== null) {
        this.begin = ev[0]
        this.end = ev[1]
      } else {
        this.begin = ''
        this.end = ''
      }
      this.drawLine()
    },
    // 绘制图表
    drawLine() {
      this.loading = true
      const data = {
        begin: this.begin,
        end: this.end
      }
      statisticsS3(data).then(res => {
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: res.data.lineData
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
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: res.data.xData
          },
          yAxis: {
            type: 'value'
          },
          series: res.data.data
        })
        window.onresize = function() {
          myChart.resize()
        }

        this.loading = false
      })
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
