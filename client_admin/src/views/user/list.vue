<template>
  <div class="app-container">
    <div class="tableDiv">
      <el-form  :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="关键字">
          <el-input v-model="formInline.user" placeholder="" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!--    布局-->
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 660px" >
        <el-table-column prop="id" label="ID" width="120" />
        <el-table-column prop="mobile" label="电话" width="200" :formatter="mobileCheck" />
        <el-table-column prop="username" label="用户名" width="200" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClickDetails(scope.row)">详情</el-button>
            <!--                <el-button type="text" size="small" @click="handleClick(scope.row)">apis</el-button>-->
            <!--                <el-button type="text" size="small">编辑</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pageDiv">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalNum"
        @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { userList, apiOrderList } from '@/api/userManage'

export default {
  filters: {
    orderStatusDes(v) {
      if (v === 10001) {
        return '创建'
      } else if (v === 10002) {
        return '处理中'
      } else if (v === 10003) {
        return '成功'
      } else if (v === 10004) {
        return '失败'
      }
      return '未知状态'
    }
  },

  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [],
      orderTableData: [],
      clickUser: {},
      currentPage: 1, // 当前页码
      totalNum: 0, // 总条数
      pageSize: 10 // 每页的数据条数
    }
  },
  mounted() {
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      console.log('查询')
      const that = this
      userList().then(res => {
        console.log('得到的数据')
        that.tableData = res.data
        that.totalNum = res.data.length
      })
    },

    handleClickDetails(item) {
      console.log('查看用户的详情:', item)
      this.$router.push(
        {
          path: 'userDetails',
          query: {
            userId: item.id,
            username: item.username,
            mobile: item.mobile,
            realNameAuth: item.realNameAuth,
            tenantType: item.tenantType
          }
        })
    },
    mobileCheck(row, column) {
      var changeMobile = row[column.property]
      var reg = /^(\d{3})\d{4}(\d{4})$/
      return changeMobile.replace(reg, '$1****$2')
    },
    queryOrderList(item) {
      apiOrderList({ appkey: item.appkey }).then(res => {
        console.log('得到调用记录:', res.data)
        this.orderTableData = res.data
      })
      console.log('查询调用订单...')
    },
    currentChange(currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>
<style>
 .pageDiv{
   margin-top: 30px;
 }
 .tableDiv{
   min-height: 72vh;
 }
</style>

