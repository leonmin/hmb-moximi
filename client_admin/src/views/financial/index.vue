<template>
<!--  提现审核-->
  <div class="financial">
    <!--   搜索栏-->
    <div class="search clearfix">
      <div class="searchItem">
        <p>关键词</p>
        <el-input
          v-model="nameInput"
          placeholder="订单编号/提现人/提现账号"
          style="width: 180px"
          clearable>
        </el-input>
      </div>
      <div class="searchItem" style="margin-left: 20px">
        <p>审核状态</p>
        <el-select v-model="selectValue">
          <el-option :key="0" label="待审核" :value="0" />
          <el-option :key="1" label="审核通过" :value="1" />
          <el-option :key="2" label="审核拒绝" :value="2" />
        </el-select>
      </div>
      <el-button type="primary" class="searchBtn" @click="initData">查询</el-button>
    </div>
    <!--表格    -->
    <el-table
      border
      :data='tableData'>
      <el-table-column
        prop="no"
        label="提现订单编号">
      </el-table-column>
      <el-table-column
      prop="userName"
      label="提现人">
      </el-table-column>
      <el-table-column
      prop="mobile"
      label="提现人手机号"
      :formatter="changeMobile">
      </el-table-column>
      <el-table-column
      prop="addTime"
      label="提现时间">
      </el-table-column>
      <el-table-column
      prop="alipayAccount"
      label="提现账号">
      </el-table-column>
      <el-table-column
      prop="cash"
      label="提现金额"
      :formatter="cashChange">
      </el-table-column>
      <el-table-column
      prop="balance"
      label="钱包余额">
      </el-table-column>
      <el-table-column
      prop="applyStatus"
      label="审核状态"
      :formatter="statusCheck">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
            <span @click="checkDetail(scope.index,scope.row)" style="cursor: pointer;color: #1c75ff">查看详情</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { cashApplyList } from '@/api/user'
export default {
  name: 'Index',
  data() {
    return {
      nameInput: '',
      selectValue: 0,
      tableData: []
    }
  },
  computed: {
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 初始化数据
    initData() {
      const params = {
        applyId: '',
        status: this.selectValue,
        memo: ''
      }
      cashApplyList(params).then(res => {
        this.tableData = res.data.records
      })
    },
    // 审核详情
    checkDetail(index, rowid) {
      // this.$router.push(path:'/api/reviewDetails')
      this.$router.push({ path: '/api/reviewDetails', query: { id: rowid.id }})
    },
    //  审核状态转换
    statusCheck(row, column) {
      var statusCheck = row[column.property]
      var checkStatus = ''
      if (statusCheck === 0) {
        checkStatus = '待审核'
        return checkStatus
      } else if (statusCheck === 1) {
        checkStatus = '通过审核'
        return checkStatus
      } else if (statusCheck === 2) {
        checkStatus = '拒绝审核'
        return checkStatus
      }
      return checkStatus
    },
    // 提现金额改变
    cashChange(row, column) {
      var cashChange = row[column.property]
      var result = cashChange / 100
      return result
    },
    // 手机号脱敏
    changeMobile(row, column) {
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

<style scoped>
  *{
    cursor: default;
  }
.financial{
  margin: 30px;
}
/*  搜索栏*/
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
