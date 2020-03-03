<template>
  <div v-loading="loading" class="main">
    <!--    <div class="title">卡密列表</div>-->
    <el-form :inline="true" :model="searchData" class="demo-form-inline" label-width="80px" style="margin-top: 30px">
      <el-form-item label="关键字" style="margin-left: 30px;">
        <el-input v-model="searchData.title" placeholder="卡密名称" style="width: 140px" />
      </el-form-item>
      <el-form-item label="是否过期">
        <el-select v-model="searchData.isExpire" placeholder="请选择" clearable style="width: 140px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchData.status" placeholder="请选择" clearable style="width: 140px">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-left: 30px" @click="loadList()">查询</el-button>
        <el-button type="info" style="margin-left: 30px" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="tableData" style="width: 95%;margin-left: 40px;" border :height="fullHeight-220+'px'">
      <el-table-column prop="id" label="ID" min-width="80" show-overflow-tooltip />
      <!--      <el-table-column prop="serialNumber" label="编号" min-width="140" show-overflow-tooltip />-->
      <el-table-column prop="title" label="卡密名称" min-width="150" show-overflow-tooltip />
      <el-table-column prop="ableDays" label="有效期(天)" min-width="100" show-overflow-tooltip />
      <el-table-column prop="total" label="总发行量" min-width="100" show-overflow-tooltip />
      <el-table-column prop="outTime" label="是否过期" min-width="90" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.endDate | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="channel" label="渠道" min-width="100" show-overflow-tooltip />
      <el-table-column prop="rurl" label="链接" min-width="200" show-overflow-tooltip />
      <el-table-column prop="cardType" label="适用范围" min-width="80" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.cardType | cardType }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="100" show-overflow-tooltip fixed="right">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            :active-value="0"
            :inactive-value="1"
            inactive-color="#ff4949"
            @change="startAndStop(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip width="150" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" v-clipboard:copy="scope.row.rurl" v-clipboard:success="copy">复制链接</el-button>
          <span style="cursor: pointer;color: #409EFF;margin-right: 15px;margin-left: 10px" @click="lookDetail(scope.row)">查看</span>
          <!--          <span style="cursor: pointer;color: #409EFF" @click="startAndStop(scope.row)">{{ scope.row.status===0?'停用':'启用' }}</span>-->
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      style="float: right;margin-top: 20px;margin-right: 40px"
      :current-page="searchData.pageNum"
      :page-size="searchData.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { listExchangeCard, startAndStopCard } from '@/api/cardPass'
export default {
  name: 'CardPassList',
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
    }
  },
  // 存放 数据
  data: function() {
    return {
      loading: false,
      fullHeight: document.documentElement.clientHeight, // 页面高度
      options: [
        {
          value: 0,
          label: '未过期'
        },
        {
          value: 1,
          label: '已过期'
        }
      ],
      options2: [
        {
          value: 0,
          label: '启用中'
        },
        {
          value: 1,
          label: '停用中'
        }
      ],
      tableData: [], // 表格数据
      searchData: { // 筛选的数据
        pageNum: 1,
        pageSize: 10,
        title: '', // 关键字
        isExpire: '', // 是否过期
        status: '', // 状态
        activity: 1 // 表示活动卡密
      },
      total: null, // 总数
      status: '启用',
      isPaging: false// 是否是分页
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
    // 复制卡密
    copy() {
      this.$message.success('已复制到粘贴板')
    },
    // 启用或停用
    startAndStop(row) {
      const data = {
        status: row.status,
        id: row.id,
        activity: 1
      }
      this.isPaging = true
      startAndStopCard(data).then(res => {
        if (res.code === 0 || res.code === '0') {
          this.$message.success('操作成功!')
          this.loadList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 重置
    reset() {
      this.searchData = { // 筛选的数据
        pageNum: 1,
        pageSize: 10,
        title: '', // 关键字
        isExpire: '', // 是否过期
        status: '', // 卡密名称
        activity: 1 // 表示活动卡密
      }
      this.loadList()
    },
    // 查看
    lookDetail(row) {
      this.$router.push({
        path: 'cardPassActivityDetail'
      })
      const row2 = JSON.stringify(row)
      sessionStorage.setItem('cardPassRow', row2)
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
    loadList() {
      this.loading = true
      if (!this.isPaging) {
        this.searchData.pageNum = 1
      }
      listExchangeCard(this.searchData).then(res => {
        if (res.code === 0 || res.code === '0') {
          this.total = res.data.total
          this.tableData = res.data.records
          this.loading = false
          this.isPaging = false
        }
      })
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
