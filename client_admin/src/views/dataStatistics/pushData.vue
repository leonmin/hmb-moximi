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
      :data="mypushData"
      style="width: 95%;margin-top: 40px"
      border
      :height="fullHeight-220+'px'"
      size="mini"
    >
      <el-table-column prop="day" label="推送时间" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.day.split(' ')[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ofd3" label="过期3天" min-width="150" show-overflow-tooltip />
      <el-table-column prop="ofd7" label="过期7天" min-width="150" show-overflow-tooltip />
      <el-table-column prop="serviceOff" label="服务器未开通" min-width="150" show-overflow-tooltip />
      <el-table-column prop="callNotify" label="转接" min-width="150" show-overflow-tooltip />
      <el-table-column prop="remain1" label="剩余1天" min-width="150" show-overflow-tooltip />
      <el-table-column prop="remain5" label="剩余5天" min-width="150" show-overflow-tooltip />
    </el-table>
  </div>
</template>

<script>
import { wxMsg, wxPushStats } from '../../api/userManage'
export default {
  data() {
    return {
      page: 1,
      size: 10,
      mypushData: [],
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
    this.getData()
  },
  methods: {
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
    //  初始化数据
    getData() {
      const params = {
        month: this.month
      }

      wxMsg(params).then(res => {
        this.mypushData = res.data
      })
    },
    monthChange(value) {
      console.log(value)
      if (value) {
        this.month = value
        this.getData()
      } else {
        this.getTime()
        this.getData()
      }
    },
    // 当前页码
    handleSizeChange(val) {
      this.searchData.pageSize = val
      this.getData()
    },
    // 当前页数
    handleCurrentChange(val) {
      this.page = val
      this.searchData.pageNum = val
      this.getData()
    }
  }
}
</script>

<style scoped>
.pushData{
  margin: 40px;
}
</style>
