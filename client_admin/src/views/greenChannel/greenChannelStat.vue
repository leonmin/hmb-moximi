<template>
  <div id="main" v-loading="loading" style="overflow: hidden">
    <div>
      <span>选择时间：</span>
      <el-date-picker
        v-model="month"
        type="month"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择月"
        @change="monthChange"
      />
    </div>
    <el-table
      border
      :data="tableData"
      style="margin-top: 30px"
    >
      <el-table-column label="日期" />
      <el-table-column label="已完成人数" />
      <el-table-column label="任务中人数" />
    </el-table>
  </div>
</template>

<script>
import { greenStats } from '../../api/userManage'
export default {
  data() {
    return {
      tableData: [],
      loading: false,
      value: [],
      month: ''
    }
  },
  mounted() {
    this.getTime()
    this.initData()
  },
  methods: {
    initData() {
      const params = {
        month: this.month
      }
      greenStats(params).then(res => {
        this.tableData = res.data
      })
    },
    getTime() {
      var myDate = new Date()
      var year = myDate.getFullYear()
      var month = myDate.getMonth() + 1
      this.month = year + '-' + this.conver(month) + '-' + '01' + ' ' + '00:00:00'
      console.log(this.month)
    },
    conver(s) {
      return s < 10 ? '0' + s : s
    },
    // 选择时间
    monthChange(value) {
      console.log(value)
      if (value) {
        this.month = value
        this.initData()
      } else {
        this.getTime()
        this.initData()
      }
    }
  }
}
</script>

<style scoped>
  #main{
    margin: 40px;
  }
</style>
