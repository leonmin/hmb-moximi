<template>
  <div id="main" v-loading="loading" :style="{height:fullHeight-50+'px'}">
    <el-card class="box-card" shadow="hover">
      <div class="leftBox">
        <img class="head-img" :src="row.avatar">
        <div class="username">{{ row.userName }}</div>
      </div>
      <div class="rightBox">
        <div class="line">
          <div class="lineContent1">用户名称</div>
          <div class="lineContent2">{{ row.userName }}</div>
        </div>
        <div class="line">
          <div class="lineContent1">用户手机号</div>
          <div class="lineContent2">{{ row.mobile | formatTel }}</div>
        </div>
        <div class="line">
          <div class="lineContent1">注册时间</div>
          <div class="lineContent2">{{ row.addTime }}</div>
        </div>
        <div class="line">
          <div class="lineContent1">是否已成会员</div>
          <div class="lineContent2">{{ row.vipMember?'是':'否' }}</div>
        </div>
        <div class="line">
          <div class="lineContent1" style="flex: 1">上级姓名</div>
          <div class="lineContent2" style="flex: 1">{{ row.pusername }}</div>
          <div class="lineContent1" style="flex: 1">上级电话</div>
          <div class="lineContent2" style="flex: 1">{{ row.puserMobile | formatTel }}</div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div class="title">使用优惠卷数据列表</div>
      <div class="title" style="margin-top: 20px;font-size: 18px;overflow: hidden">
        <span>关键字</span>
        <el-input v-model="searchData.searchKey" placeholder="优惠卷名称" style="width:200px;margin-left: 10px;margin-right: 10px" clearable />
        <el-input v-model="searchData.couponNumber" placeholder="优惠卷编号" style="width:200px;margin-right: 10px" clearable />
        <span>领取方式</span>
        <el-select v-model="searchData.getWay" placeholder="请选择" style="margin-left: 10px;margin-right: 10px" clearable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <span>使用状态</span>
        <el-select v-model="searchData.currentStatus" placeholder="请选择" style="margin-left: 10px" clearable>
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button type="primary" class="search-btn" @click="loadList()">查询</el-button>
      </div>
      <!--表格-->
      <el-table :data="tableData" style="width: 99%;margin-left: 15px;margin-top: 20px" border>
        <el-table-column prop="couponNumber" label="优惠券编号" min-width="150" show-overflow-tooltip />
        <el-table-column prop="couponTitle" label="优惠券名称" min-width="140" show-overflow-tooltip />
        <el-table-column prop="discount" label="优惠券折扣" min-width="100" show-overflow-tooltip>
          <template v-slot="scope">
            <span>{{ scope.row.discount | discount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="getType" label="领取方式" min-width="120" show-overflow-tooltip>
          <template v-slot="scope">
            <span>{{ scope.row.getType | getType }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="addTime" label="领取时间" min-width="180" show-overflow-tooltip />
        <el-table-column prop="usedStatus" label="使用状态" min-width="120" show-overflow-tooltip>
          <template v-slot="scope">
            <span>{{ scope.row.usedStatus | usedStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="usedTime" label="使用时间" min-width="180" show-overflow-tooltip />
        <el-table-column prop="endTime" label="到期时间" min-width="180" show-overflow-tooltip />
        <el-table-column prop="orderNo" label="订单编号" min-width="180" show-overflow-tooltip />
      </el-table>
      <!--分页-->
      <el-pagination
        style="float: right;margin-top: 20px;margin-right: 20px;margin-bottom: 20px"
        :current-page="searchData.pageNum"
        :page-size="searchData.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
import { userCouponList } from '@/api/couponOperation'
export default {
  name: 'CouponOperationLook',
  filters: {
    /* 折扣*/
    discount: function(data) {
      data = data.toString()
      return data.substring(0, 1) + '.' + data.substring(1) + '折'
    },
    usedStatus: function(data) {
      if (data === 0 || data === '0') {
        return '未使用'
      } else if (data === 1 || data === '1') {
        return '已使用'
      } else if (data === 2 || data === '2') {
        return '已过期'
      }
    },
    getType: function(data) {
      if (data === 1 || data === '1') {
        return '后台发放'
      } else if (data === 2 || data === '2') {
        return '邀请注册时赠送'
      }
    }
  },
  // 存放 数据
  data: function() {
    return {
      loading: false,
      fullHeight: document.documentElement.clientHeight, // 页面高度
      searchData: { // 筛选的数据
        pageNum: 1,
        pageSize: 10,
        userId: '',
        searchKey: '',
        couponNumber: '',
        getWay: '',
        currentStatus: ''
      },
      tableData: [],
      total: null,
      options: [
        {
          label: '后台发放',
          value: 1
        },
        {
          label: '邀请注册时赠送',
          value: 2
        }
      ],
      options2: [
        {
          label: '未使用',
          value: 0
        },
        {
          label: '已使用',
          value: 1
        },
        {
          label: '已过期',
          value: 2
        }
      ],
      isPaging: false // 是否是分页
    }
  },
  computed: {
    row() {
      return JSON.parse(sessionStorage.getItem('couponOperationLookRow'))
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
    this.searchData.userId = this.row.id
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
      this.isPaging = true
      this.searchData.pageNum = val
      this.loadList()
    },
    // 获取表格数据
    loadList() {
      this.loading = true
      if (!this.isPaging) {
        this.searchData.pageNum = 1
      }
      userCouponList(this.searchData).then(res => {
        if (res.code === 0 || res.code === '0') {
          this.total = res.data.total
          this.tableData = res.data.records
          this.isPaging = false
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped>
  .username{
    width: 100%;
    text-align: center;
    font-size: 20px;
    height: 60px;
    line-height: 60px;
    font-weight: bold;
  }
  .head-img{
    width: 350px;
    float: left;
    height: 210px;
  }
  .rightBox{
    float: left;
    min-height: 260px;
    width: calc(100% - 350px);
  }
  .leftBox{
    float: left;
    min-height: 260px;
    width: 350px;
  }
  .search-btn{
    margin-left: 10px;
  }
  .lineContent2{
    flex: 3;
    background-color: rgba(255,255,255,1);
    font-size: 18px;
    font-weight: normal;
    min-height: 50px;
    text-align: center;
    padding-top: 20px;
  }
  .lineContent1{
    flex: 1;
    background-color: #D9ECFF;
    font-size: 18px;
    font-weight: bold;
    min-height: 50px;
    text-align: center;
    padding-top: 20px;
  }
  .line{
    display: flex;
    width: 100%;
    border: 1px solid #c2c2c2;
  }
  .lineBox{
    width: 100%;
    margin-top: 15px;
  }
  .code{
    font-size: 16px;
    margin-left: 20px;
    font-weight: normal;
  }
  .box-card{
    width:calc(100% - 40px);
    margin-left: 20px;
    margin-top: 20px;
    min-width: 800px;
  }
  .title{
    font-size: 22px;
    font-weight: bold;
    margin-left: 20px;
  }
  #main{
    width: 100%;
    overflow: auto;
  }
</style>
