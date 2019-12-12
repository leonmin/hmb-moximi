<template>
  <div v-loading="loading" class="userDetails">
    <!--    页面标题-->
    <!--    <div class="pageTitle">-->
    <!--      <p>用户列表</p>-->
    <!--      <div class="deliver"></div>-->
    <!--    </div>-->
    <!--   搜索栏-->
    <div class="search clearfix">
      <div class="searchItem">
        <p>关键词</p>
        <el-input
          v-model="searchData.key"
          placeholder="用户名称/用户手机号"
          style="width: 180px"
          clearable
          @input="loadList()"
        />
      </div>
      <el-button type="primary" class="searchBtn" @click="loadList()">查询</el-button>
    </div>
    <!-- 表格-->
    <el-table
      :data="tableData"
      border
      style="width: 100%;min-height: 680px"
    >
      <el-table-column
        prop="userName"
        label="用户名称"
      />
      <el-table-column
        prop="mobile"
        label="用户手机号"
      >
        <template v-slot="scope">
          <span>{{ scope.row.mobile | formatTel }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="addTime"
        label="注册时间"
      />
      <el-table-column
        prop="vipMember"
        label="是否会员"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.vipMember?'是':'否' }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页-->
    <div class="pageList clearfix">
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
  </div>
</template>

<script>
import { partnerSubUserDetails } from '@/api/user'
export default {
  name: 'UserDetails',
  data() {
    return {
      valueInput: '',
      tableData: [],
      searchData: {
        pageNum: 1, // 当前页码
        pageSize: 10, // 每页的数据条数
        key: '',
        id: ''
      },
      total: null,
      loading: false
    }
  },
  mounted() {
    this.searchData.id = this.$route.query.id
    this.loadList()
  },
  methods: {
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
      this.loading = true
      partnerSubUserDetails(this.searchData).then(res => {
        if (res.code === 0) {
          console.log(res)
          this.total = res.data.total
          this.tableData = res.data.records
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped>
.userDetails{
margin: 30px;
}
  .pageTitle{
    font-size: 24px;
    color: #333333;
  }
.deliver{
  border-top: 1px solid #dedede;
  margin: 20px 0;
}
.search{
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
.searchItem{
  float: left;
}
.searchItem>p{
  display: inline-block;
  font-size: 18px;
  margin-right:10px;
}
.searchBtn{
  width: 100px;
  margin-left: 50px;
}
.pageList{
  font-size: 14px;
}
.pageination{
  display: flex;
  float: right;
  margin-right: 50px;
  align-items: center;
}
</style>
