<template>
  <div v-loading="loading" class="order">
    <!--   搜索栏-->
    <div class="search clearfix">
      <div class="searchItem">
        <p>关键词</p>
        <el-input
          v-model="orderInput"
          placeholder="订单编号\用户名\手机号"
          style="width: 220px"
          clearable
        />
        <el-select v-model="selectValue" clearable placeholder="请选择支付渠道" @change="selectChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <el-button type="primary" class="searchBtn" @click="seachList">查询</el-button>
    </div>
    <!--    表格-->
    <el-table
      :data="tableData"
      border
    >
      <el-table-column
        prop="no"
        label="订单编号"
        min-width="200"
        show-overflow-tooltip
      />
      <el-table-column
        prop="sku"
        label="会员卡续费种类"
        :formatter="vipType"
        min-width="80"
        show-overflow-tooltip
      />
      <el-table-column
        prop="price"
        label="会员卡续费金额(元)"
        min-width="80"
        show-overflow-tooltip
      >
        <template v-slot="scope">
          <span>{{ scope.row.price | formatMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="addTime"
        label="支付时间"
        min-width="120"
        show-overflow-tooltip
      />
      <el-table-column prop="userName" label="支付用户名" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.userName | formateName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="支付手机号"
        min-width="80"
        show-overflow-tooltip
        :formatter="changeMobile"
      />
      <el-table-column
        prop="payChannel"
        label="支付渠道"
        min-width="80"
        :formatter="payChannelFormate"
        show-overflow-tooltip
      />
      <el-table-column
        prop="couponPrice"
        label="是否使用优惠券"
        min-width="60"
        show-overflow-tooltip
        :formatter="isUseCoupon"
      />

      <el-table-column
        prop="couponPrice"
        label="优惠券抵扣(元)"
        min-width="80"
        show-overflow-tooltip
      >
        <template v-slot="scope">
          <span>{{ scope.row.couponPrice | formatMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="payPrice"
        label="实际支付金额(元)"
        min-width="80"
        show-overflow-tooltip
      >
        <template v-slot="scope">
          <span>{{ scope.row.payPrice | formatMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="profit"
        label="提成金额(元)"
        min-width="80"
        show-overflow-tooltip
      >
        <template v-slot="scope">
          <span>{{ scope.row.profit | formatMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="orderStatus"
        label="订单状态"
        min-width="80"
        show-overflow-tooltip
      >
        <template v-slot="scope">
          <span>{{ scope.row.orderStatus | orderStatus }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页-->
    <div class="pageList clearfix" style="margin-top: 10px">
      <div class="pageination">
        <p style="display: inline-block">共{{ totalPage }}页/{{ totalNum }}条数据</p>
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="totalNum"
          style="display: inline-block"
          @current-change="currentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { orderList } from '@/api/user'
export default {
  name: 'Order',
  filters: {
    orderStatus: function(data) {
      if (data === 0 || data === '0') {
        return '等待支付'
      } else if (data === 1 || data === '1') {
        return '已支付'
      } else if (data === 2 || data === '2') {
        return '退款中'
      } else if (data === 3 || data === '3') {
        return '已退款'
      }
    }
  },
  data() {
    return {
      tableData: [],
      currentPage: 1, // 当前页码
      totalNum: 0, // 总条数
      pageSize: 10, // 每页的数据条数
      orderInput: '',
      totalPage: 1, // 总页数
      loading: false,
      selectValue: '',
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 'pay_app_gzh',
          label: '公众号支付'
        }, {
          value: 'pay_app_wx',
          label: 'APP微信支付'
        }, {
          value: 'pay_app_ali',
          label: 'APP支付宝支付'
        }],
      payChannel: ''
    }
  },
  mounted() {
  //  初始化数据
    this.initData()
  },
  methods: {
  //  表格渠道
    payChannelFormate(row, column, cellValue) {
      if (cellValue == 'pay_app_ali') {
        return '支付宝支付'
      } else if (cellValue == 'pay_app_wx') {
        return '微信APP支付'
      } else if (cellValue == 'pay_app_gzh') {
        return '微信公众号支付'
      }
    },
    //  渠道衩裙
    selectChange(value) {
      console.log(value)
      this.payChannel = value
      this.initData()
    },
    //  初始化数据
    initData() {
      this.loading = true
      const params = {
        page: this.currentPage,
        searchKey: this.orderInput,
        payChannel: this.payChannel
      }
      orderList(params).then(res => {
        this.tableData = res.data.records
        this.pageSize = res.data.size
        this.totalNum = res.data.total
        this.totalPage = res.data.pages
        this.loading = false
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
      } else if (vipType === 100004) {
        result = '周卡会员'
        return result
      }
      return result
    },
    // 手机脱敏
    changeMobile(row, column) {
      var changeMobile = row[column.property]
      var reg = /^(\d{3})\d{4}(\d{4})$/
      if (changeMobile !== null && changeMobile !== '') {
        return changeMobile.replace(reg, '$1****$2')
      }
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
