<template>
  <div class="platform">
    <span class="platform_title">平台数据包购买统计</span>
    <div class="dataDiv">
      <span class="selectDate">选择时间</span>
      <el-date-picker
        v-model="dataValue"
        type="daterange"
        value-format="yyyy-MM-dd hh:mm:ss"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>

    <div class="platform_statFigure">
      <div id='myChart' style="width600px; height:600px"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { userList, apiStatistics } from '@/api/userManage'
import { allApiList } from '@/api/apiManage'
export default {
  name: 'Platform',
  data() {
    return {
      topdata: ['数据包'],
      xData: ['2019-11-04', '2019-11-05', '2019-11-06', '2019-11-07', '2019-11-08', '2019-11-09', '2019-11-10'],
      yData: [3000, 4560, 6553, 3244, 5943, 4820, 7434],
      tenantId: '',
      appId: '',
      begin: '',
      end: '',
      dataValue: ''
    }
  },
  mounted() {
    this.initData()
    this.getLineData()
    // this.drawLine()
  },
  methods: {
    initData() {
      userList().then(res => {
        // 获得商家列表第一个用户
        this.tenantId = res.data[0].id
        // this.xData.push(res.data[0].username)
      })
      allApiList().then(res => {
        // 获取applist 第一个接口id（短信）
        this.appId = res.data[0].id
      })
    },
    getLineData() {
      const params = {
        tenantId: this.tenantId,
        app: this.appId
        // begin: this.begin,
        // end: this.end,
      }
      apiStatistics(params).then(res => {
        this.drawLine()
      })
    },
    drawLine() {
      var _this = this
      {
        // 实例化echarts对象
        let myChartDrawer = echarts.init(document.getElementById('myChart'))
        // 绘制条形图
        var option = {
          title: {
            text: '数据包购买统计',
            top: 5,
            left: 'center'
          },
          tooltip: {
            show: true
          },
          legend: {
            data: this.topdata,
            top: 30
          },
          // X轴
          xAxis: {
            data: _this.xData
          },
          // Y轴
          yAxis: {
          },
          // 数据
          series: [
            {
              name: '数量',
              type: 'bar',
              data: this.yData,
              barWidth: 100,
              itemStyle: {
                normal: {
                  color: function(params) {
                    var colorList = ['#3398db', '#3398db', '#3398db', '#3398db', '#3398db']
                    return colorList[params.dataIndex]
                  }
                }
              }
            }
          ]
        }

        myChartDrawer.setOption(option)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.platform{
  padding: 30px;
  &_title{
    font-weight: 600;
    color: #2b2f3a;
    font-size: 20px;
  }
  &_statFigure{
    margin-top: 30px;
  }
}
  .dataDiv{
    margin-top: 30px;
  }
.selectDate{
  font-weight: 600;
  font-size: 20px;
  margin-right: 20px;
}
</style>
