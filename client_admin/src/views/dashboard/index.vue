<template>
<!--  用户列表-->
  <div class="dashboard-container">
    <!--    <div class="dashboard-text">name: {{ name }}</div>-->
    <!--    <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div>-->
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
          v-model="nameInput"
          placeholder="用户名称/用户手机号"
          style="width: 180px"
          clearable>
        </el-input>
      </div>
      <div class="searchItem" style="margin-left: 20px">
        <p>是否已成会员</p>
        <el-select v-model="selectValue" placeholder="请选择">
          <el-option :key="-1" label="全部" :value="-1" />
          <el-option :key="1" label="是" :value="1" />
          <el-option :key="0" label="否" :value="0" />
        </el-select>
      </div>
      <el-button type="primary" class="searchBtn" @click="seachList">查询</el-button>
    </div>
<!--   用户列表-->
    <div class="tableList">
      <el-table
        :data='tableData'
        border
        style="width: 100%;min-height: 680px">
        <el-table-column
          prop="userName"
          label="用户名称"
         >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="用户手机号"
          :formatter="mobileChange"
         >
        </el-table-column>
        <el-table-column
          prop="isMember"
          label="是否已成会员">
        </el-table-column>
        <el-table-column
          prop="memberEndTime"
          label="会员到期日">
        </el-table-column>
        <el-table-column
          prop="addTime"
          label="注册时间"
        >
        </el-table-column>
        <el-table-column
          prop="puserName"
          label="上级用户"
        >
        </el-table-column>
        <el-table-column
          prop="puserMobile"
          label="上级手机号"
        >
        </el-table-column>
        <el-table-column
          prop="inviteUserCount"
          label="下级用户数"
        >
        </el-table-column>
        <el-table-column
        label="操作">
          <el-button type="default" @click="lowerDetails">查看</el-button>
        </el-table-column>
      </el-table>
    </div>
    <!--    分页-->
    <div class="pageList clearfix">
      <div class="pageination">
        <p style="display: inline-block">共{{totalPage}}页/{{totalNum}}条数据</p>
        <el-pagination
          background
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="totalNum"
          @size-change="handleSizeChange"
          @current-change="currentChange"
          style="display: inline-block">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserList } from '@/api/user'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    this.initData()
  },
  data() {
    return {
      nameInput: '',
      selectValue: -1,
      searchKey: '',
      totalPage: '',
      tableData: [],
      currentPage: 1, // 当前页码
      totalNum: 0, // 总条数
      pageSize: 10 // 每页的数据条数
    }
  },
  methods: {
    // 初始化数据
    initData() {
      console.log('开始请求用户列表')
      const params = {
        searchKey: this.nameInput,
        isMember: this.selectValue,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      getUserList(params).then(res => {
        this.tableData = res.data
        this.totalNum = res.data.total
        this.pageSize = res.data.size
        this.currentPage = res.data.current
        this.totalPage = res.data.pages
      })
    },
    // 查询列表
    seachList() {
      this.initData()
    },
    // 用户下级详情
    lowerDetails() {
      this.$router.push('/lowerDetails')
    },
    // 页码改变
    handleSizeChange() {},
    currentChange(currentPage) {
      this.currentPage = currentPage
    },
    // 手机脱敏
    mobileChange(row, column) {
      var changeMobile = row[column.property]
      if (changeMobile !== null) {
        var reg = /^(\d{3})\d{4}(\d{4})$/
        return changeMobile.replace(reg, '$1****$2')
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
  .tableList{
    min-height: 650px;
    margin-bottom: 10px;
  }
  .pageTitle{
    font-size: 24px;
    color: #333333;
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

</style>
