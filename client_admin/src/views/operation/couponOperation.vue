<template>
  <div v-loading="loading" class="main">
    <div class="title">优惠卷运营</div>
    <el-form :inline="true" :model="ruleForm" class="demo-form-inline" label-width="80px" style="margin-top: 30px">
      <el-form-item label="关键字" style="margin-left: 20px">
        <el-input v-model="ruleForm.key" placeholder="用户名称\用户手机号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-left: 30px" @click="loadList()">查询</el-button>
        <el-button type="info" style="margin-left: 30px" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="tableData" style="width: 95%;margin-left: 40px;" border :height="fullHeight-280+'px'">
      <el-table-column prop="serialNumber" label="用户名称" min-width="150" show-overflow-tooltip />
      <el-table-column prop="title" label="用户手机号" min-width="150" show-overflow-tooltip />
      <el-table-column prop="name" label="是否已成会员" min-width="180" show-overflow-tooltip />
      <el-table-column prop="total" label="已使用优惠卷数量" min-width="150" show-overflow-tooltip />
      <el-table-column prop="name" label="未使用优惠卷数量" min-width="120" show-overflow-tooltip />
      <el-table-column prop="status" label="已过期优惠卷数量" min-width="120" show-overflow-tooltip />
      <el-table-column label="操作" show-overflow-tooltip width="150">
        <template slot-scope="scope">
          <span style="cursor: pointer;color: #409EFF;margin-right: 15px" @click="lookDetail()">查看</span>
          <span style="cursor: pointer;color: #409EFF;" @click="giveCoupon(scope.row)">赠送优惠券</span>
        </template>
      </el-table-column>
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
    <!--dialog-->
    <give-coupon :show.sync="show" :row="row" />
  </div>
</template>

<script>
import giveCoupon from './giveCoupon'
export default {
  name: 'CouponOperation',
  components: {
    giveCoupon
  },
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
      total: null, // 总数
      row: null, // 行数据
      show: false
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
    // 打开赠送优惠券dialog
    giveCoupon(row) {
      this.row = row
      this.show = true
    },
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
    // 查看
    lookDetail() {
      this.$router.push({
        path: 'couponOperationLook'
      })
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
