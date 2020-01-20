<template>
  <div v-loading="loading" class="main">
    <!--    <div class="title">合伙人列表</div>-->
    <el-form :inline="true" class="demo-form-inline" label-width="100px" style="margin-top: 30px">
      <el-form-item label="请选择日期：" style="margin-left: 30px">
        <el-date-picker
          v-model="dateValue"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="date"
          placeholder="选择日期"
          @change="dateChange"
        />
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="tableData" style="width: 95%;margin-left: 40px;" border :height="fullHeight-220+'px'">
      <el-table-column prop="userName" label="下级用户名" min-width="150" show-overflow-tooltip />
      <el-table-column prop="mobile" label="下级手机号" min-width="150" show-overflow-tooltip />
      <el-table-column prop="addTime" label="支付时间" min-width="180" show-overflow-tooltip/>
      <el-table-column prop="partnerBalance" label="实际支付金额(元)" min-width="120" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.payPrice | formatMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="profit" label="返佣金额(元)" min-width="120" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.profit | formatMoney }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      style="float: right;margin-top: 20px;margin-right: 40px"
      :current-page="searchData.pageNum"
      :page-size="searchData.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { sprtner1 } from '@/api/partner'
export default {
  name: 'PartnerList',
  // 存放 数据
  data: function() {
    return {
      loading: false,
      dateValue: '',
      begin: '',
      end: '',
      mobile: '',
      fullHeight: document.documentElement.clientHeight, // 页面高度
      tableData: [], // 表格数据
      searchData: { // 筛选的数据
        pageNum: 1,
        pageSize: 10,
        key: '' // 关键字
      },
      total: null, // 总数
      isPaging: false// 是否是分页
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
    this.mobile = this.$route.query.mobile
    console.log(this.mobile)
    this.getCurrentTime()
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight
        that.fullHeight = window.fullHeight
      })()
    }
    this.initData()
  },
  methods: {
    // 选择时间
    dateChange(value) {
      if (value !== null) {
        this.begin = value
        this.end = String(value).split(' ')[0] + ' ' + '23:59:59'
      } else {
        this.getCurrentTime()
      }
      this.initData()
    },
    // 获取当前时间
    getCurrentTime() {
      var myDate = new Date()
      var year = myDate.getFullYear()
      var month = myDate.getMonth() + 1
      var date = myDate.getDate()
      this.begin = year + '-' + this.conver(month) + '-' + this.conver(date) + ' ' + '00:00:00'
      this.end = year + '-' + this.conver(month) + '-' + this.conver(date) + ' ' + '23:59:59'
    },
    conver(s) {
      return s < 10 ? '0' + s : s
    },
    // 初始化数据
    initData() {
      const params = {
        begin: this.begin,
        end: this.end,
        mobile: this.mobile,
        page: this.searchData.pageNum
      }
      sprtner1(params).then(res => {
        if (res.code === 0 || res.code === '0') {
          this.tableData = res.data.orders.records
          this.total = res.data.orders.total
          this.searchData.pageSize = res.data.orders.size
          this.searchData.pageNum = res.data.orders.current
          console.log(this.total)
        }
      })
    },
    // 当前页码
    handleSizeChange(val) {
      this.searchData.pageSize = val
      this.initData()
    },
    // 当前页数
    handleCurrentChange(val) {
      this.isPaging = true
      this.searchData.pageNum = val
      this.initData()
    }
  }
}
</script>

<style scoped>
  .title{
    font-size: 22px;
    margin-top: 20px;
    margin-left: 40px;
    font-weight: bold;
  }
</style>
