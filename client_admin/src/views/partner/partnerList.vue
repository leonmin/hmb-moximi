<template>
  <div v-loading="loading" class="main">
    <!--    <div class="title">合伙人列表</div>-->
    <el-form :inline="true" :model="searchData" class="demo-form-inline" label-width="80px" style="margin-top: 30px">
      <el-form-item label="关键字" style="margin-left: 20px">
        <el-input v-model="searchData.key" placeholder="用户名\手机号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-left: 30px" @click="loadList()">查询</el-button>
        <el-button type="info" style="margin-left: 30px" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="tableData" style="width: 95%;margin-left: 40px;" border :height="fullHeight-220+'px'">
      <el-table-column prop="id" label="序号" min-width="150" show-overflow-tooltip />
<!--      <el-table-column prop="userName" label="合伙人用户名" min-width="150" show-overflow-tooltip />-->
      <el-table-column prop="userName" label="合伙人用户名" min-width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.userName | formateName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="合伙人手机号" min-width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.mobile | formatTel }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="addTime" label="注册时间" min-width="160" show-overflow-tooltip />
      <el-table-column prop="partnerBalance" label="合伙人余额(元)" min-width="120" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.partnerBalance | formatMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="royaltyCount" label="提成累计(元)" min-width="120" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.royaltyCount | formatMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="subUser" label="下级用户数" min-width="120" show-overflow-tooltip />
      <el-table-column label="操作" show-overflow-tooltip width="150">
        <template slot-scope="scope">
          <span style="cursor: pointer;color: #409EFF;margin-right: 15px" @click="lookDetail(scope.row)">查看</span>
          <span style="cursor: pointer;color: #409EFF;margin-right: 15px" @click="partnerData(scope.row)">数据统计</span>
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
import { partnerList } from '@/api/partner'
export default {
  name: 'PartnerList',
  // 存放 数据
  data: function() {
    return {
      loading: false,
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
        pageSize: 10,
        key: '' // 关键字
      }
      this.loadList()
    },
    // 查看
    lookDetail(row) {
      this.$router.push({
        path: 'partnerDetail'
      })
      console.log(row)
      const row2 = JSON.stringify(row)
      sessionStorage.setItem('partnerRow', row2)
    },
    // 数据统计
    partnerData(row) {
      this.$router.push({ path: '/partner/partnerData', query: { mobile: row.mobile }})
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
      partnerList(this.searchData).then(res => {
        if (res.code === 0 || res.code === '0') {
          this.total = res.data.total
          this.tableData = res.data.records
          this.isPaging = false
        }
        this.loading = false
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
