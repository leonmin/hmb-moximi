<template>
  <div id="main" v-loading="loading" style="overflow: hidden">
    <el-date-picker
      v-model="value"
      class="time"
      format="yyyy-MM-dd HH:mm:ss"
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetime"
      placeholder="选择日期时间"
      align="right"
      :picker-options="pickerOptions"
      @change="timeChange"
    />
    <div class="big-box">
      <el-card v-for="(item,index) in data" :key="index" shadow="hover" class="card">
        <div class="card-value">{{ item | formatItem }}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { statistics } from '@/api/dataStatistics'
export default {
  name: '',
  filters: {
    formatItem(data) {
      const formatData = JSON.stringify(data)
      return formatData.substring(1, formatData.length - 1)
    }
  },
  // 存放 数据
  data: function() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value: '',
      loading: false,
      data: {}
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 获取数据
    getData() {
      this.loading = true
      const data = {
        day: this.value
      }
      statistics(data).then(res => {
        console.log(res)
        this.data = res.data
        this.loading = false
      })
    },
    // 选择时间
    timeChange(ev) {
      this.getData()
    }
  }
}
</script>

<style scoped>
  .card-title{
    width: 100%;
    text-align: center;
    opacity: 0.8;
  }
  .card-value{
    width: 100%;
    text-align: center;
    opacity: 0.9;
    line-height: 20px;
  }
  .card{
    width: 220px;
    height: 80px;
    margin-right: 30px;
    margin-bottom: 30px;
  }
  .big-box{
    width: calc(100% - 60px);
    margin-left: 30px;
    display: flex;
    flex: auto;
    height: auto;
    margin-bottom: 30px;
    margin-top: 30px;
    flex-wrap:wrap;
  }
  .time{
    margin-left: 30px;
    margin-top: 30px;
  }
</style>
