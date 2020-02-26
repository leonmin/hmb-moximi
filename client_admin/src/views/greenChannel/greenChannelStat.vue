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
      :max-height="fullHeight-220+'px'"
      style="margin-top: 30px"
    >
      <el-table-column prop="day" label="日期" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.day.split(' ')[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="completeCount" label="已完成人数" min-width="150" show-overflow-tooltip />
      <el-table-column prop="processCount" label="任务中人数" min-width="150" show-overflow-tooltip />
    </el-table>
  </div>
</template>

<script>
import { greenStats } from '../../api/userManage'
export default {
  data() {
    return {
      fullHeight: document.documentElement.clientHeight, // 页面高度
      tableData: [],
      loading: false,
      value: [],
      month: ''
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
