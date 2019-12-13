<template>
  <div id="main" v-loading="loading" :style="{height:fullHeight-50+'px'}">
    <el-card class="box-card" shadow="hover">
      <div class="title">合伙人详情</div>
      <div class="lineBox">
        <div class="line">
          <div class="lineContent1">用户名</div>
          <div class="lineContent2">{{ partnerRow.userName }}</div>
          <div class="lineContent1">合伙人手机号</div>
          <div class="lineContent2">{{ partnerRow.mobile | formatTel }}</div>
          <div class="lineContent1">注册时间</div>
          <div class="lineContent2">{{ partnerRow.addTime }}</div>
        </div>
        <div class="line">
          <div class="lineContent1">下级用户数</div>
          <div class="lineContent2" style="color: #3399FF;cursor: pointer" @click="toBelowList()">{{ partnerRow.subUser===null?'':partnerRow.subUser+'人' }}</div>
          <div class="lineContent1">合伙人余额</div>
          <div class="lineContent2">{{ partnerRow.partnerBalance===null?'':partnerRow.partnerBalance+'元' }}</div>
          <div class="lineContent1">提成累计</div>
          <div class="lineContent2">{{ partnerRow.royaltyCount===null?'':partnerRow.royaltyCount+'元' }}</div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div class="title">渠道提成收益
        <span style="font-weight: normal;margin-left: 10px">（总计：{{ total }}元）</span>
        <div style="color: red;font-size: 16px;margin-top: 10px">（注：近7日）</div>
      </div>
      <div id="myChart" class="charts" />
    </el-card>
  </div>
</template>

<script>
import { partnerDetail } from '@/api/partner'
export default {
  name: 'PartnerDetail',
  // 存放 数据
  data: function() {
    return {
      loading: false,
      fullHeight: document.documentElement.clientHeight, // 页面高度
      total: null
    }
  },
  computed: {
    partnerRow() {
      return JSON.parse(sessionStorage.getItem('partnerRow'))
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
    const that = this
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight
        that.fullHeight = window.fullHeight
      })()
    }
    this.drawLine()
  },
  methods: {
    // 查看下级列表
    toBelowList() {
      this.$router.push({
        path: 'partnerBelowList'
      })
    },
    drawLine() {
      this.loading = true
      const params = {
        userId: this.partnerRow.id
      }
      partnerDetail(params).then(res => {
        if (res.code === 0 || res.code === '0') {
          this.loading = false
          this.total = res.data.total
          const xData = []
          for (let i = 0; i < res.data.list.length; i++) {
            xData.push(res.data.list[i].day)
            xData[i] = xData[i].substring(0, 10)
          }
          const yData = []
          for (let i = 0; i < res.data.list.length; i++) {
            yData.push(res.data.list[i].profit)
          }

          // 基于准备好的dom，初始化echarts实例
          const myChart = this.$echarts.init(document.getElementById('myChart'))
          // 绘制图表
          myChart.setOption({
            xAxis: {
              type: 'category',
              data: xData
            },
            tooltip: {
              trigger: 'axis',
              type: 'value'
            },
            color: ['#5EAAFD'],
            yAxis: {
              type: 'value'
            },
            series: [{
              data: yData,
              type: 'line'
            }]
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .charts{
    width:1000px;
    height: 500px;
    margin: 0 auto;
  }
  .search-btn{
    margin-left: 10px;
  }
  .lineContent2{
    flex: 1;
    background-color: rgba(255,255,255,1);
    font-size: 18px;
    font-weight: normal;
    min-height: 60px;
    text-align: center;
    padding-top: 20px;
  }
  .lineContent1{
    flex: 1;
    background-color: #D9ECFF;
    font-size: 18px;
    font-weight: bold;
    min-height: 60px;
    text-align: center;
    padding-top: 20px;
  }
  .line{
    display: flex;
    width: 100%;
    border: 1px solid #dcdcdc;
  }
  .lineBox{
    width: 100%;
    margin-top: 15px;
  }
  .code{
    font-size: 16px;
    margin-left: 20px;
    font-weight: normal;
  }
  .box-card{
    width:calc(100% - 40px);
    margin-left: 20px;
    margin-top: 20px;
    min-width: 1000px;
  }
  .title{
    font-size: 22px;
    font-weight: bold;
    margin-left: 20px;
  }
  #main{
    width: 100%;
    overflow: auto;
  }
</style>
