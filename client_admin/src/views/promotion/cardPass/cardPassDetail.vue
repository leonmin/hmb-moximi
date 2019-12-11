<template>
  <div id="main" :style="{height:fullHeight-50+'px'}">
    <el-card class="box-card" shadow="hover">
      <div class="title">
        卡密详情
        <span class="code">编号（0000123）</span>
      </div>
      <div class="lineBox">
        <div class="line">
          <div class="lineContent1">卡密名称</div>
          <div class="lineContent2">新人大礼包</div>
          <div class="lineContent1">适用范围</div>
          <div class="lineContent2">月卡</div>
          <div class="lineContent1">总发行量</div>
          <div class="lineContent2">20</div>
        </div>
        <div class="line">
          <div class="lineContent1">有效期</div>
          <div class="lineContent2">2019年11月1日-2019年11月15日</div>
          <div class="lineContent1">是否过期</div>
          <div class="lineContent2">未过期</div>
          <div class="lineContent1">状态</div>
          <div class="lineContent2">启用中</div>
        </div>
        <div class="line">
          <div class="lineContent1">已使用数</div>
          <div class="lineContent2">12份</div>
          <div class="lineContent1">未使用数</div>
          <div class="lineContent2">8份</div>
          <div class="lineContent1" />
          <div class="lineContent2" />
        </div>
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div class="title">卡密明细</div>
      <div class="title" style="margin-top: 20px;font-size: 18px;overflow: hidden">
        <span>关键字</span>
        <el-input v-model="searchData.input" placeholder="用户名称\用户手机号\订单编号" style="width:400px;margin-left: 10px" />
        <el-button type="primary" class="search-btn">查询</el-button>
      </div>
      <!--表格-->
      <el-table :data="tableData" style="width: 99%;margin-left: 15px;margin-top: 20px" border>
        <el-table-column prop="name" label="卡密密码" min-width="180" show-overflow-tooltip />
        <el-table-column prop="name" label="使用用户" min-width="150" show-overflow-tooltip />
        <el-table-column prop="name" label="用户手机号" min-width="150" show-overflow-tooltip />
        <el-table-column prop="name" label="当前状态" min-width="120" show-overflow-tooltip />
        <el-table-column prop="name" label="使用时间" min-width="180" show-overflow-tooltip />
        <el-table-column prop="name" label="订单编号" min-width="180" show-overflow-tooltip />
        <el-table-column label="操作" show-overflow-tooltip width="150">
          <template slot-scope="scope">
            <span style="cursor: pointer;color: #409EFF;margin-right: 15px"  v-clipboard:copy="scope.row.name" v-clipboard:success="copy" >复制卡密</span>
          </template>
        </el-table-column>
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
  name: 'CardPassDetail',
  // 存放 数据
  data: function() {
    return {
      loading: false,
      fullHeight: document.documentElement.clientHeight, // 页面高度
      searchData: { // 筛选的数据
        pageNum: 1,
        pageSize: 10,
        input: ''
      },
      tableData: [
        {
          name: '157****1234'
        }
      ],
      total: null
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
  .search-btn{
    margin-left: 10px;
  }
  .lineContent2{
    flex: 1;
    background-color: rgba(255,255,255,1);
    font-size: 18px;
    font-weight: normal;
    min-height: 60px;
    text-align: center;
    padding-top: 20px;
  }
  .lineContent1{
    flex: 1;
    background-color: rgba(242, 242, 242, 1);
    font-size: 18px;
    font-weight: bold;
    min-height: 60px;
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
