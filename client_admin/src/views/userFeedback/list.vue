<template>
  <div v-loading="loading" class="main">
<!--    <div class="title">用户反馈</div>-->
    <el-form :inline="true" :model="searchData" class="demo-form-inline" label-width="80px" style="margin-top: 30px">
      <el-form-item label="关键字" style="margin-left: 15px">
        <el-input v-model="searchData.searchKey" placeholder="用户名/手机号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-left: 30px" @click="loadList()">查询</el-button>
        <el-button type="info" style="margin-left: 30px" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="tableData" style="width: 95%;margin-left: 40px;" border :height="fullHeight-220+'px'">
<!--      <el-table-column prop="username" label="用户名" min-width="150" show-overflow-tooltip />-->
      <el-table-column prop="username" label="用户名" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.username | formateName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="用户手机号" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.mobile | formatTel }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="satisfaction" label="用户满意度" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.satisfaction | satisfaction }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="反馈详情" min-width="150" show-overflow-tooltip />
      <el-table-column prop="addTime" label="提交时间" min-width="150" show-overflow-tooltip />
      <el-table-column label="操作" min-width="150" show-overflow-tooltip>
        <template slot-scope="scope">
          <span style="cursor: pointer;color: #409EFF;" @click="look(scope.row)">查看详情</span>
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
import { pageList } from '@/api/userFeedback'
export default {
  name: 'List',
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
      } else if (data === 4 || data === 4) {
        return '很满意'
      }
    }
  },
  // 存放 数据
  data: function() {
    return {
      loading: false,
      fullHeight: document.documentElement.clientHeight, // 页面高度
      tableData: [], // 表格数据
      searchData: { // 筛选的数据
        pageNum: 1,
        pageSize: 10,
        searchKey: '' // 关键字
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
    // 查看详情
    look(row) {
      this.$router.push({
        path: 'userFeekbackDetails',
        query: { id: row.id }
      })
      const row2 = JSON.stringify(row)
      sessionStorage.setItem('userFeedbackRow', row2)
    },
    // 重置
    reset() {
      this.searchData = { // 筛选的数据
        pageNum: 1,
        pageSize: 10,
        searchKey: '' // 关键字
      }
      this.loadList()
    },
    // 查看
    lookDetail(row) {
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
      pageList(this.searchData).then(res => {
        if (res.code === 0 || res.code === '0') {
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
