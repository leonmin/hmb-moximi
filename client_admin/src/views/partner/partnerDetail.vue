<template>
  <div id="main" :style="{height:fullHeight-50+'px'}">
    <el-card class="box-card" shadow="hover">
      <div class="title">合伙人详情</div>
      <div class="lineBox">
        <div class="line">
          <div class="lineContent1">用户名</div>
          <div class="lineContent2">王珂</div>
          <div class="lineContent1">合伙人手机号</div>
          <div class="lineContent2">181xxxx8456</div>
          <div class="lineContent1">注册时间</div>
          <div class="lineContent2">2109-10-11 12:21:31</div>
        </div>
        <div class="line">
          <div class="lineContent1">下级用户数</div>
          <div class="lineContent2" style="color: #3399FF;cursor: pointer" @click="toBelowList()">150人</div>
          <div class="lineContent1">合伙人余额</div>
          <div class="lineContent2">50000.00元</div>
          <div class="lineContent1">提成累计</div>
          <div class="lineContent2">80000.00元</div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div class="title">渠道提成收益
        <span style="font-weight: normal;margin-left: 10px">（总计：2322.20元）</span>
        <div style="color: red;font-size: 16px;margin-top: 10px">（注：近7日）</div>
      </div>
      <div class="charts" />
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PartnerDetail',
  // 存放 数据
  data: function() {
    return {
      loading: false,
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
    const that = this
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight
        that.fullHeight = window.fullHeight
      })()
    }
  },
  methods: {
    // 查看下级列表
    toBelowList() {
      this.$router.push({
        path: 'partnerBelowList'
      })
    }
  }
}
</script>

<style scoped>
  .charts{
    width: 70%;
    height: 500px;
    background: skyblue;
    margin: 0 auto;
    min-width: 800px;
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
    background-color: rgba(242, 242, 242, 1);
    font-size: 18px;
    font-weight: bold;
    min-height: 60px;
    text-align: center;
    padding-top: 20px;
  }
  .line{
    display: flex;
    width: 100%;
    border: 1px solid #c2c2c2;
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
