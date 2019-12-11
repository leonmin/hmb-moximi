<template>
  <div v-loading="loading" class="main">
    <div class="title">合伙人下级用户明细</div>
    <el-form :inline="true" :model="ruleForm" class="demo-form-inline" label-width="80px" style="margin-top: 30px">
      <el-form-item label="关键字" style="margin-left: 20px">
        <el-input v-model="ruleForm.key" placeholder="用户名\手机号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-left: 30px" @click="loadList()">查询</el-button>
        <el-button type="info" style="margin-left: 30px" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="tableData" style="width: 95%;margin-left: 40px;" border :height="fullHeight-280+'px'">
      <el-table-column prop="serialNumber" label="序号" min-width="150" show-overflow-tooltip />
      <el-table-column prop="title" label="用户名称" min-width="150" show-overflow-tooltip />
      <el-table-column prop="name" label="用户手机号" min-width="180" show-overflow-tooltip />
      <el-table-column prop="total" label="注册时间" min-width="150" show-overflow-tooltip />
      <el-table-column prop="name" label="是否已成会员" min-width="120" show-overflow-tooltip />
    </el-table>
    <!--分页-->
    <el-pagination
      style="float: right;margin-top: 20px;margin-right: 40px"
      :current-page="searchData.pageNum"
      :page-sizes="[10,30,50,100,200]"
      :page-size="searchData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'PartnerBelowList',
  // 存放 数据
  data: function() {
    return {
      loading: false,
      fullHeight: document.documentElement.clientHeight, // 页面高度
      ruleForm: {
        name: ''
      },
      tableData: [
        {
          name: '111'
        }
      ], // 表格数据
      searchData: { // 筛选的数据
        pageNum: 1,
        pageSize: 10,
        key: '', // 关键字
        isExpire: '', // 是否过期
        status: ''// 卡密名称
      },
      total: null// 总数
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
        key: '', // 关键字
        isExpire: '', // 是否过期
        status: ''// 卡密名称
      }
      this.loadList()
    },
    // 当前页码
    handleSizeChange(val) {
      this.searchData.pageSize = val
      this.loadList()
    },
    // 当前页数
    handleCurrentChange(val) {
      this.searchData.pageNum = val
      this.loadList()
    },
    loadList() {
      this.loading = false
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
