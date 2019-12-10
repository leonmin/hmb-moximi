<template>
  <div class="order">
    <!--   搜索栏-->
    <div class="search clearfix">
      <div class="searchItem">
        <p>关键词</p>
        <el-input
          v-model="orderInput"
          placeholder="订单编号/用户名/手机号"
          style="width: 220px"
          clearable>
        </el-input>
      </div>
      <el-button type="primary" class="searchBtn" @click="seachList">查询</el-button>
    </div>
    <!--    表格-->
    <el-table
      :data="tableData"
      border>
      <el-table-column
      prop="no"
      label="订单编号"
      width="300">
      </el-table-column>
      <el-table-column
      prop="sku"
      label="会员卡续费种类"
      :formatter="vipType"
      width="100">
      </el-table-column>
      <el-table-column
      prop="price"
      label="会员卡续费金额"
      width="100">
      </el-table-column>
      <el-table-column
      prop="addTime"
      label="支付时间">
      </el-table-column>
      <el-table-column
      prop="userName"
      label="支付用户名">
      </el-table-column>
      <el-table-column
      prop="mobile"
      label="支付手机号"
      :formatter="changeMobile">
      </el-table-column>
      <el-table-column
      prop="couponPrice"
      label="是否使用优惠券"
      :formatter="isUseCoupon">
      </el-table-column>

      <el-table-column
      prop="couponPrice"
      label="优惠券折扣">
      </el-table-column>
      <el-table-column
      prop="payPrice"
      label="实际支付金额">
      </el-table-column>
      <el-table-column
      prop=""
      label="提成金额">
      </el-table-column>

    </el-table>
    <!--    分页-->
    <div class="pageList clearfix">
      <div class="pageination">
        <p style="display: inline-block">共{{totalPage}}页/{{totalNum}}条数据</p>
        <el-pagination
          background
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
import { orderList } from '@/api/user'
export default {
  name: 'Order',
  data() {
    return {
      tableData: [],
      currentPage: 1, // 当前页码
      totalNum: 0, // 总条数
      pageSize: 10, // 每页的数据条数
      orderInput: '',
      totalPage: 1 // 总页数
    }
  },
  mounted() {
  //  初始化数据
    this.initData()
  },
  methods: {
  //  初始化数据
    initData() {
      const params = {
        pageNum: this.currentPage,
        orderNo: this.orderInput
      }
      orderList(params).then(res => {
        this.tableData = res.data.records
        this.pageSize = res.data.size
        this.totalNum = res.data.total
        this.totalPage = res.data.pages
      })
    },
    // 查询
    seachList() {
      this.initData()
    },
    currentChange() {
      this.initData()
    },
    // 是否使用优惠券
    isUseCoupon(row, column) {
      var isUseCoupon = row[column.property]
      var result = ''
      if (isUseCoupon > 0) {
        result = '是'
        return result
      } else {
        result = '否'
        return result
      }
    },
    //  vip会员种类
    vipType(row, column) {
      var vipType = row[column.property]
      var result = ''
      if (vipType === 100001) {
        result = '月卡会员'
        return result
      } else if (vipType === 100002) {
        result = '季卡会员'
        return result
      } else if (vipType === 100003) {
        result = '年卡会员'
        return result
      }
      return result
    },
    // 手机脱敏
    changeMobile(row, column) {
      var changeMobile = row[column.property]
      var reg = /^(\d{3})\d{4}(\d{4})$/
      return changeMobile.replace(reg, '$1****$2')
    }
  }
}
</script>

<style scoped>
.order{
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
/*  分页*/
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
