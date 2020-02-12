<template>
  <div class="channelData">
    <div>
      <span>选择时间：</span>
      <el-date-picker
        v-model="begin"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        @change="dateChange"
      />
    </div>
    <!--    渠道数据-->
    <el-card class="box-card channel">
      <div slot="header" class="clearfix">
        <span>渠道统计</span>
      </div>
      <div>
        <el-form disabled="">
          <el-form-item label="关注人数" label-width="120px">
            <el-input v-model="channelData.follow" />
          </el-form-item>
        <el-form-item label="注册并支付人数" label-width="120px">
          <el-input v-model="channelData.countRegistered" />
        </el-form-item>
          <el-form-item label="关注已注册人数" label-width="120px">
            <el-input v-model="channelData.countNotRegistered" />
          </el-form-item>
          <el-form-item label="关注未注册人数" label-width="120px">
            <el-input v-model="channelData.countRegisteredPay" />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { channelStatistics } from '../../api/userManage'
export default {
  name: 'ChannelData',
  data() {
    return {
      begin: '',
      end: '',
      date: '',
      channelData: ''
    }
  },
  created() {
    //  获取当前时间
    this.getCurrentTime()
    //  初始化数据
    this.initData()
  },
  methods: {
    // 获取当前时间
    getCurrentTime() {
      var myDate = new Date()
      var year = myDate.getFullYear()
      var month = myDate.getMonth() + 1
      var date = myDate.getDate()
      this.begin = year + '-' + this.conver(month) + '-' + this.conver(date)
      this.end = year + '-' + this.conver(month) + '-' + this.conver(date)
      console.log('开始时间', this.begin, '结束时间', this.end)
    },
    conver(s) {
      return s < 10 ? '0' + s : s
    },
    //  初始化数据
    initData() {
      const params = {
        uuid: this.$route.query.id,
        date: this.begin
      }
      console.log(params)
      channelStatistics(params).then(res => {
        this.channelData = res.data
      })
    },
    //  时间更改
    dateChange(value) {
      this.begin = value
      this.initData()
    }
  }
}
</script>

<style scoped>
.channelData{
  padding: 40px;
}
  .channel{
    margin-top: 40px;
  }
</style>
