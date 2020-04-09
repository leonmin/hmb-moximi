<template>
  <div class="datachart">
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
      :data="dataChart"
      style="width: 95%;;margin-top: 40px"
      border
      :max-height="fullHeight-220+'px'"
      size="mini"
    >
      <el-table-column prop="day" label="时间" min-width="200" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.day.split(' ')[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="countUser" :formatter="dataFormate" label="今日开启人数" min-width="120" show-overflow-tooltip />
      <el-table-column prop="countUserAll" :formatter="dataFormate" label="累计开启人数" min-width="120" show-overflow-tooltip />
      <el-table-column prop="countOn" :formatter="dataFormate" label="今日开启次数" min-width="120" show-overflow-tooltip />
      <el-table-column prop="countClose" :formatter="dataFormate" label="今日关闭次数" min-width="120" show-overflow-tooltip />
      <el-table-column prop="countRecover" :formatter="dataFormate" label="今日恢复次数" min-width="120" show-overflow-tooltip />
    </el-table>
  </div>
</template>

<script>
import { addressBookStats } from '../../api/userManage'
export default {
  name: 'VirtualStatistics',
  data() {
    return {
      page: 1,
      size: 40,
      fullHeight: document.documentElement.clientHeight, // 页面高度
      dataChart: [],
      searchData: { // 筛选的数据
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
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
  created() {
    this.getTime()
    this.initData()
  },
  methods: {
    initData() {
      const params = {
        month: this.month
      }
      addressBookStats(params).then(res => {
        this.dataChart = res.data
      })
    },
    dataFormate(row, column, cellValue) {
      console.log(cellValue)
      if (cellValue == null) {
        cellValue = 0
        return cellValue
      } else {
        return cellValue
      }
    },
    monthChange(value) {
      console.log(value)
      if (value) {
        this.month = value
        this.initData()
      }
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
    }
  }
}
</script>

<style scoped>
  .datachart{
    margin: 40px;
  }
</style>
