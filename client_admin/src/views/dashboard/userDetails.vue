<template>
  <div class="userDetails">
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
          v-model="valueInput"
          placeholder="用户名称/用户手机号"
          style="width: 180px"
          clearable>
        </el-input>
      </div>
      <el-button type="primary" class="searchBtn">查询</el-button>
    </div>
    <!-- 表格-->
    <el-table
      :data="tableData"
      border
      style="width: 100%;min-height: 680px">
      <el-table-column
        prop="username"
        label="用户名称">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="用户手机号">
      </el-table-column>
      <el-table-column
        prop="regTime"
        label="注册时间">
      </el-table-column>
      <el-table-column
        prop="isVIP"
        label="是否会员">
      </el-table-column>
    </el-table>
    <!--    分页-->
    <div class="pageList clearfix">
      <div class="pageination">
        <p style="display: inline-block">共10页/100条数据</p>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="currentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="totalNum"
          style="display: inline-block">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDetails',
  data() {
    return {
      valueInput: '',
      tableData: [
        // {
        //   username: '',
        //   mobile: '',
        //   regTime: '',
        //   isVIP: ''
        // }
      ],
      currentPage: 1, // 当前页码
      totalNum: 0, // 总条数
      pageSize: 10 // 每页的数据条数
    }
  },
  methods: {
    handleSizeChange() {},
    currentChange(currentPage) {
      this.currentPage = currentPage
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
