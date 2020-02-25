<template>
  <div id="main" v-loading="loading" style="overflow: hidden">
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
    <div class="fenlei">统计分类：
      <el-select v-model="Selectvalue" placeholder="请选择" @change="selectChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div id="myChart" />
  </div>
</template>

<script>
import { channelStat } from '../../api/userManage'
export default {
  data() {
    return {
      loading: false,
      value: [],
      begin: '',
      end: '',
      now: '',
      options: [{
        value: 'followData',
        label: '关注人数'
      }, {
        value: 'countRegisteredPayData',
        label: '注册并支付人数'
      }, {
        value: 'countRegisteredData',
        label: '关注已注册人数'
      }, {
        value: 'countNotRegisteredData',
        label: '关注未注册人数'
      }],
      Selectvalue: 'followData',
      channelData: [],
      legendData: [],
      xAxisData: [],
      seriesData: [],
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
    this.getTime()
    this.initData(this.Selectvalue)
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
      this.initData(this.Selectvalue)
    },
    selectChange(value) {
      this.seriesData = value
      this.initData(this.Selectvalue)
      console.log(value)
    },
    dateTrans(date) {
      return date.split(' ')[0]
    },
    initData(seData) {
      this.loading = true
      this.xAxisData = []
      const params = {
        // uuid: 'qudaoceshi01',
        beginDate: this.begin,
        endDate: this.end
      }
      channelStat(params).then(res => {
        this.channelData = res.data
        this.xAxisData = this.channelData.dayData
        this.drawChart(seData)
        this.loading = false
      })
    },
    drawChart(seData) {
      var that = this
      const myChart = this.$echarts.init(document.getElementById('myChart'))
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
          myChart.setOption({
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
      this.seriesData = []
      for (let i = 0; i < this.channelData.series.length; i++) {
        this.seriesData.push({
          name: this.channelData.series[i].name,
          type: 'bar',
          barGap: 0,
          // barWidth: 30,
          barCategoryGap: 20,
          label: labelOption,
          data: this.channelData.series[i][seData]
        })
      }
      console.log('数据', this.seriesData)
      // 绘制图表
      myChart.setOption({
        // color: ['#003366', '#006699', '#4cabce', '#e5323e'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: that.legendData
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
          left: '5%',
          bottom: -5,
          start: 0,
          end: 40
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: that.xAxisData
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: this.seriesData
      })
      window.onresize = function() {
        myChart.resize()
      }
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
  .fenlei{
    display: inline-block;
    margin-left: 30px;
  }
</style>
