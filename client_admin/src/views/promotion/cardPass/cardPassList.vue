<template>
  <div class="main">
    <div class="title">卡密列表</div>
    <el-form :inline="true" :model="ruleForm" class="demo-form-inline" label-width="80px" style="margin-top: 30px">
      <el-form-item label="关键字" style="margin-left: 20px">
        <el-input v-model="ruleForm.name" placeholder="编号\优惠卷名称" />
      </el-form-item>
      <el-form-item label="是否过期">
        <el-select v-model="ruleForm.name" placeholder="请选择" clearable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="ruleForm.name" placeholder="请选择" clearable>
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-left: 30px">查询</el-button>
        <el-button type="info" style="margin-left: 30px">重置</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="tableData" style="width: 95%;margin-left: 40px;" border :height="fullHeight-280+'px'">
      <el-table-column prop="name" label="编号" min-width="150" show-overflow-tooltip />
      <el-table-column prop="name" label="卡密名称" min-width="150" show-overflow-tooltip />
      <el-table-column prop="name" label="有效期" min-width="180" show-overflow-tooltip />
      <el-table-column prop="name" label="总发行量" min-width="150" show-overflow-tooltip />
      <el-table-column prop="name" label="是否过期" min-width="120" show-overflow-tooltip />
      <el-table-column prop="name" label="状态" min-width="120" show-overflow-tooltip />
      <el-table-column prop="name" label="适用范围" min-width="120" show-overflow-tooltip />
      <el-table-column label="操作" show-overflow-tooltip width="150">
        <template slot-scope="scope">
          <span style="cursor: pointer;color: #409EFF;margin-right: 15px" @click="lookDetail()">查看</span>
          <span style="cursor: pointer;color: #409EFF">启用</span>
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
  </div>
</template>

<script>
export default {
  name: 'CardPassList',
  // 存放 数据
  data: function() {
    return {
      loading: false,
      fullHeight: document.documentElement.clientHeight, // 页面高度
      ruleForm: {
        name: ''
      },
      options: [
        {
          value: '1',
          label: '未过期'
        },
        {
          value: '2',
          label: '已过期'
        }
      ],
      options2: [
        {
          value: '1',
          label: '启用中'
        },
        {
          value: '2',
          label: '停用中'
        }
      ],
      tableData: [
        {
          name: '111'
        }
      ], // 表格数据
      searchData: { // 筛选的数据
        pageNum: 1,
        pageSize: 10,
        startTime: '',
        endTime: ''
      },
      total: null// 总数
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
    // 查看
    lookDetail() {
      this.$router.push({
        path: 'cardPassDetail'
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
