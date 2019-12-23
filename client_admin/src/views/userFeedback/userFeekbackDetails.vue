<template>
  <div id="main">
    <el-card class="box-card">
      <div class="title">
        用户反馈详情
      </div>
      <el-divider />
      <el-row class="el-row">
        <el-col :span="6">
          <span class="left-font">用户名:</span>
          <span class="right-font">{{ row.username }}</span>
        </el-col>
        <el-col :span="6">
          <span class="left-font">用户手机号:</span>
          <span class="right-font">{{ row.mobile | formatTel }}</span>
        </el-col>
        <el-col :span="6">
          <span class="left-font">用户满意度:</span>
          <span class="right-font">{{ row.satisfaction | satisfaction }}</span>
        </el-col>
        <el-col :span="6">
          <span class="left-font">提交时间:</span>
          <span class="right-font">{{ row.addTime }}</span>
        </el-col>
      </el-row>
      <el-divider />
      <div class="title2">反馈详情</div>
      <div class="contentBox">{{ row.content }}</div>
      <div class="title2">上传凭证</div>
      <div class="img-box">
        <el-image v-for="(item,index) in row.attachArray" :key="index" class="img" :src="item" :preview-src-list="row.attachArray" />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  filters: {
    satisfaction: function(data) {
      if (data === 0 || data === '0') {
        return '很不满意'
      } else if (data === 1 || data === '1') {
        return '不满'
      } else if (data === 2 || data === '2') {
        return '一般'
      } else if (data === 3 || data === '3') {
        return '满意'
      } else if (data === 4 || data === '4') {
        return '很满意'
      }
    }
  },
  // 存放 数据
  data: function() {
    return {
      loading: false,
      fullHeight: document.documentElement.clientHeight, // 页面高度
      listData: {},
      row: {}
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
    this.row = JSON.parse(sessionStorage.getItem('userFeedbackRow'))
    this.loadList()
  },
  methods: {
    loadList() {

    }
  }
}
</script>

<style scoped>
  .img{
    width: 100px;
    height: 100px;
    margin-right: 15px;
  }
  .img-box{
    width: 1000px;
    min-height: 200px;
    margin-top: 20px;
    margin-left: 20px;
  }
  .contentBox{
    width: 600px;
    height: 200px;
    border: 1px solid #dcdfe6;
    margin-left: 20px;
    margin-top: 20px;
    padding: 20px;
  }
  .title2{
    font-size: 20px;
    margin-top: 20px;
    margin-left: 20px;
    font-weight: bold;
  }
  .right-font{
    font-size: 18px;
    font-weight: normal;
    margin-left: 10px;
  }
  .left-font{
    font-weight: bold;
    font-size: 18px;
  }
  .el-row{
    margin-left: 20px;
    margin-top: 20px;
  }
  .title{
    font-size: 22px;
    margin-left: 20px;
    font-weight: bold;
  }
  .box-card{
    width: calc(100% - 40px);
    margin: 20px auto;
    min-height: 200px;
    min-width: 1000px;
  }
  #main{
    overflow: auto;
  }
</style>
