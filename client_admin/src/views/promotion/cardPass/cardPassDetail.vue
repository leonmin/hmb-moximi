<template>
  <div id="main" v-loading="loading" :style="{height:fullHeight-50+'px'}">
    <el-card class="box-card" shadow="hover">
      <div class="title">
        卡密详情
        <span class="code">编号（{{ row.id }}）</span>
      </div>
      <div class="lineBox">
        <div class="line">
          <div class="lineContent1">卡密名称</div>
          <div class="lineContent2">{{ row.title }}</div>
          <div class="lineContent1">适用范围</div>
          <div class="lineContent2">{{ row.cardType | cardType }}</div>
          <div class="lineContent1">总发行量</div>
          <div class="lineContent2">{{ row.total }}</div>
        </div>
        <div class="line">
          <div class="lineContent1">有效期</div>
          <div class="lineContent2">{{ row.validity }}</div>
          <div class="lineContent1">是否过期</div>
          <div class="lineContent2">{{ row.outTime | outTime }}</div>
          <div class="lineContent1">状态</div>
          <div class="lineContent2">{{ row.status | status }}</div>
        </div>
        <div class="line">
          <div class="lineContent1">已使用数</div>
          <div class="lineContent2">{{ row.usedCount }}</div>
          <div class="lineContent1">未使用数</div>
          <div class="lineContent2">{{ row.unUseCount }}</div>
          <div class="lineContent1">合伙人</div>
          <div class="lineContent2">{{ row.partnerName }}</div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div class="title">卡密明细</div>
      <div class="title" style="margin-top: 20px;font-size: 18px;overflow: hidden">
        <span>关键字</span>
        <el-input v-model="searchData.key" placeholder="用户名称\用户手机号\订单编号" style="width:400px;margin-left: 10px" clearable />
        <el-button type="primary" class="search-btn" @click="loadList()">查询</el-button>
      </div>
      <!--表格-->
      <el-table :data="tableData" style="width: 99%;margin-left: 15px;margin-top: 20px" border>
        <el-table-column prop="cardKey" label="卡密密码" min-width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.cardKey | cardKey }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="使用用户" min-width="150" show-overflow-tooltip />
        <el-table-column prop="mobile" label="用户手机号" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.mobile | formatTel }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardStatus" label="当前状态" min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.cardStatus | cardStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userTime" label="使用时间" min-width="180" show-overflow-tooltip />
        <el-table-column prop="orderNum" label="订单编号" min-width="180" show-overflow-tooltip />
        <el-table-column label="操作" show-overflow-tooltip width="150">
          <template slot-scope="scope">
            <span v-clipboard:copy="scope.row.cardKey" v-clipboard:success="copy" style="cursor: pointer;color: #409EFF;margin-right: 15px">复制卡密</span>
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
import { pageList } from '@/api/cardPass'
export default {
  name: 'CardPassDetail',
  filters: {
    /* 是否过期*/
    outTime: function(data) {
      if (data === 0 || data === '0') {
        return '未过期'
      } else {
        return '已过期'
      }
    },
    /* 适用范围*/
    cardType: function(data) {
      if (data === 0 || data === '0') {
        return '月卡'
      } else if (data === 1 || data === '1') {
        return '季卡'
      } else {
        return '年卡'
      }
    },
    /* 状态*/
    status: function(data) {
      if (data === 0 || data === '0') {
        return '已启用'
      } else {
        return '已停用'
      }
    },
    // 卡密明细状态
    cardStatus: function(data) {
      if (data === 0 || data === '0') {
        return '未使用'
      } else {
        return '已使用'
      }
    },
    // 卡密密码
    cardKey: function(data) {
      return data.substr(0, 7) + '**** ****' + data.substr(8)
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
        key: '',
        cardId: ''
      },
      tableData: [],
      total: null,
      isPaging: false// 是否是分页
    }
  },
  computed: {
    row() {
      return JSON.parse(sessionStorage.getItem('cardPassRow'))
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
    this.searchData.cardId = this.row.id
    this.loadList()
  },
  methods: {
    // 复制卡密
    copy() {
      this.$message.success('已复制到粘贴板')
    },
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
      pageList(this.searchData).then(res => {
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
  .search-btn{
    margin-left: 10px;
  }
  .lineContent2{
    flex: 1;
    background-color: rgba(255,255,255,1);
    font-size: 18px;
    font-weight: normal;
    min-height: 55px;
    text-align: center;
    padding-top: 20px;
  }
  .lineContent1{
    flex: 1;
    background-color: #D9ECFF;
    font-size: 18px;
    font-weight: bold;
    min-height: 55px;
    text-align: center;
    padding-top: 20px;
  }
  .line{
    display: flex;
    width: 100%;
    border: 1px solid #dcdcdc;
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
