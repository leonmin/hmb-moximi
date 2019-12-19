<template>
  <div v-loading="loading" class="main">
<!--    <div class="title">提现审核</div>-->
    <el-form :inline="true" :model="searchData" class="demo-form-inline" label-width="80px" style="margin-top: 30px">
      <el-form-item label="关键字" style="margin-left: 20px">
        <el-input v-model="searchData.orderNo" placeholder="订单编号\提现人\提现账号" style="width: 215px" clearable/>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="searchData.status" placeholder="请选择" clearable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-left: 30px" @click="loadList()">查询</el-button>
        <el-button type="info" style="margin-left: 30px" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="tableData" style="width: 95%;margin-left: 40px;" border :height="fullHeight-220+'px'">
      <el-table-column prop="no" label="提现审核编号" min-width="180" show-overflow-tooltip />
      <el-table-column prop="userName" label="提现人" min-width="150" show-overflow-tooltip />
      <el-table-column prop="mobile" label="提现人手机号" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.mobile | formatTel }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="addTime" label="提现时间" min-width="150" show-overflow-tooltip />
      <el-table-column prop="alipayAccount" label="提现账号" min-width="150" show-overflow-tooltip />
      <el-table-column prop="cash" label="提现金额(元)" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{scope.row.cash | formatMoney}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column prop="balance" label="钱包余额" min-width="150" show-overflow-tooltip />-->
      <el-table-column prop="applyStatus" label="审核状态" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.applyStatus | applyStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150" show-overflow-tooltip>
        <template slot-scope="scope">
          <span style="cursor: pointer;color: #409EFF;" @click="lookDetail(scope.row)">{{ scope.row.applyStatus===0?'审核':'查看详情' }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      style="float: right;margin-top: 20px;margin-right: 40px"
      :current-page="searchData.pageNum"
      :page-size="searchData.pageSize"
      layout="total,prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { cashApplyList } from '@/api/user'
export default {
  name: 'CardPassList',
  filters: {
    /* 是否过期*/
    applyStatus: function(data) {
      if (data === 0 || data === '0') {
        return '待审核'
      } else if (data === 1 || data === '1') {
        return '通过审核'
      } else if (data === 2 || data === '2') {
        return '拒绝审核'
      }
    }
  },
  // 存放 数据
  data: function() {
    return {
      loading: false,
      fullHeight: document.documentElement.clientHeight, // 页面高度
      options: [
        {
          value: 0,
          label: '待审核'
        },
        {
          value: 1,
          label: '审核通过'
        },
        {
          value: 2,
          label: '审核拒绝'
        }
      ],
      tableData: [], // 表格数据
      searchData: { // 筛选的数据
        pageNum: 1,
        orderNo: '', // 关键字
        status: '' // 是否过期
      },
      total: null, // 总数
      status: '启用',
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
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight
        that.fullHeight = window.fullHeight
      })()
    }
    this.loadList()
  },
  methods: {
    // 重置
    reset() {
      this.searchData = { // 筛选的数据
        pageNum: 1,
        orderNo: '', // 关键字
        status: '' // 是否过期
      }
      this.loadList()
    },
    // 查看
    lookDetail(row) {
      this.$router.push({
        path: 'reviewDetails',
        query: { id: row.id, userId: row.userId }
      })
    },
    // 当前页码
    handleSizeChange(val) {
      this.searchData.pageSize = val
      this.loadList()
    },
    // 当前页数
    handleCurrentChange(val) {
      this.isPaging = true
      this.searchData.pageNum = val
      this.loadList()
    },
    loadList() {
      this.loading = true
      if (!this.isPaging) {
        this.searchData.pageNum = 1
      }
      cashApplyList(this.searchData).then(res => {
        if (res.code === 0 || res.code === '0') {
          console.log(res)
          this.total = res.data.total
          this.tableData = res.data.records
          this.isPaging = false
          this.loading = false
        }
      })
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
