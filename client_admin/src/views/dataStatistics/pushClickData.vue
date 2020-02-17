<template>
  <div class="pushData">
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
      :data="clickData"
      style="width: 95%;margin-top: 40px"
      border
      :max-height="fullHeight-220+'px'"
      size="mini"
    >
      <el-table-column prop="day" label="推送时间" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.day.split(' ')[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="jp" label="接听配置8" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.data[8]?scope.row.data[8]:0}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="jp" label="续费推送13" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.data[13]?scope.row.data[13]:0}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="jp" label="续费推送17" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.data[17]?scope.row.data[17]:0}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="jp" label="续费推送9" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.data[9]?scope.row.data[9]:0}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="jp" label="续费推送10" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.data[10]?scope.row.data[10]:0}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="jp" label="通话详情" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.data[1]? scope.row.data[1]:0}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="jp" label="绿色通道" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.data[10001]? scope.row.data[10001] : 0}}</span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { wxPushStats } from '../../api/userManage'
export default {
  data() {
    return {
      page: 1,
      size: 10,
      clickData: [],
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
  mounted() {
    this.getTime()
    this.getPushDATA()
  },
  methods: {
    getPushDATA() {
      const params = {
        month: this.month
      }
      wxPushStats(params).then(res => {
        this.clickData = res.data
        console.log(this.clickData)
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
    monthChange(value) {
      console.log(value)
      if (value) {
        this.month = value
        this.getPushDATA()
      } else {
        this.getTime()
        this.getPushDATA()
      }
    },
    // 当前页码
    handleSizeChange(val) {
      this.searchData.pageSize = val
      this.getPushDATA()
    },
    // 当前页数
    handleCurrentChange(val) {
      this.page = val
      this.searchData.pageNum = val
      this.getPushDATA()
    }
  }
}
</script>

<style scoped>
  .pushData{
    margin: 40px;
  }
</style>
