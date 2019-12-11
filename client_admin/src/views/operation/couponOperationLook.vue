<template>
  <div id="main" :style="{height:fullHeight-50+'px'}">
    <el-card class="box-card" shadow="hover">
      <div class="leftBox">
        <img class="head-img">
        <div class="username">用户名称</div>
      </div>
      <div class="rightBox">
        <div class="line">
          <div class="lineContent1">用户名称</div>
          <div class="lineContent2">天上人间</div>
        </div>
        <div class="line">
          <div class="lineContent1">用户手机号</div>
          <div class="lineContent2">181xxxx5570</div>
        </div>
        <div class="line">
          <div class="lineContent1">注册时间</div>
          <div class="lineContent2">2019-11-01  12:23:34</div>
        </div>
        <div class="line">
          <div class="lineContent1">是否已成会员</div>
          <div class="lineContent2">是</div>
        </div>
        <div class="line">
          <div class="lineContent1" style="flex: 1">上级姓名</div>
          <div class="lineContent2" style="flex: 1">水天一色</div>
          <div class="lineContent1" style="flex: 1">上级电话</div>
          <div class="lineContent2" style="flex: 1">181xxxx8740</div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div class="title">使用优惠卷数据列表</div>
      <div class="title" style="margin-top: 20px;font-size: 18px;overflow: hidden">
        <span>关键字</span>
        <el-input v-model="searchData.input" placeholder="优惠卷编号\优惠卷名称" style="width:200px;margin-left: 10px;margin-right: 10px" />
        <span>领取方式</span>
        <el-select v-model="searchData.type" placeholder="请选择" style="margin-left: 10px;margin-right: 10px" clearable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <span>当前状态</span>
        <el-select v-model="searchData.type" placeholder="请选择" style="margin-left: 10px" clearable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button type="primary" class="search-btn">查询</el-button>
      </div>
      <!--表格-->
      <el-table :data="tableData" style="width: 99%;margin-left: 15px;margin-top: 20px" border :height="fullHeight-600">
        <el-table-column prop="name" label="优惠券编号" min-width="180" show-overflow-tooltip />
        <el-table-column prop="name" label="优惠券名称" min-width="150" show-overflow-tooltip />
        <el-table-column prop="name" label="优惠券折扣" min-width="150" show-overflow-tooltip />
        <el-table-column prop="name" label="领取方式" min-width="120" show-overflow-tooltip />
        <el-table-column prop="name" label="领取时间" min-width="180" show-overflow-tooltip />
        <el-table-column prop="name" label="当前状态" min-width="180" show-overflow-tooltip />
        <el-table-column prop="name" label="使用时间" min-width="180" show-overflow-tooltip />
        <el-table-column prop="name" label="到期时间" min-width="180" show-overflow-tooltip />
        <el-table-column prop="name" label="订单编号" min-width="180" show-overflow-tooltip />
      </el-table>
      <!--分页-->
      <el-pagination
        style="float: right;margin-top: 20px;margin-right: 20px;margin-bottom: 20px"
        :current-page="searchData.pageNum"
        :page-sizes="[10,30,50,100,200]"
        :page-size="searchData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CouponOperationLook',
  // 存放 数据
  data: function() {
    return {
      loading: false,
      fullHeight: document.documentElement.clientHeight, // 页面高度
      searchData: { // 筛选的数据
        pageNum: 1,
        pageSize: 10,
        input: '',
        type: ''
      },
      tableData: [
        {
          name: '157****1234'
        }
      ],
      total: null,
      options: [
        {
          label: '主动领取',
          value: '0'
        },
        {
          label: '后台赠送',
          value: '1'
        }
      ]
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
  },
  methods: {
    // 复制卡密
    copy() {
      this.$message.success('复制成功!')
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
    height: 200px;
    background: skyblue;
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
    background-color: rgba(242, 242, 242, 1);
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
