<template>
  <div id="main" v-loading="loading">
    <el-button class="add" type="primary" @click="add()">新增banner</el-button>
    <!--表格-->
    <el-table :data="tableData" class="table" border size="mini">
      <el-table-column prop="id" label="id" show-overflow-tooltip min-width="60" />
      <el-table-column prop="title" label="标题" show-overflow-tooltip min-width="100" />
      <el-table-column prop="addTime" label="创建时间" show-overflow-tooltip min-width="120" />
      <el-table-column prop="bannerType" label="类型" show-overflow-tooltip min-width="100" />
      <el-table-column prop="bannerUrl" label="图片" show-overflow-tooltip min-width="140">
        <template v-slot="scope">
          <el-image style="width: 120px; height: 100px;cursor: pointer" :src="scope.row.bannerUrl" fit="contain" :preview-src-list="[scope.row.bannerUrl]" />
        </template>
      </el-table-column>
      <el-table-column prop="memo" label="备注" show-overflow-tooltip />
      <el-table-column label="操作" show-overflow-tooltip width="200">
        <template v-slot="scope">
          <el-button type="primary" plain @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" plain @click="del(scope.row)">删除</el-button>
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
    <!--dialog-->
    <add-dialog :show.sync="show" :row="row" :is-edit="isEdit" @success="success" />
  </div>
</template>

<script>
import addDialog from './add.vue'
import { bannerList, deleteBanner } from '@/api/banner'
export default {
  name: '',
  components: {
    addDialog
  },
  // 存放 数据
  data: function() {
    return {
      row: '',
      show: false,
      loading: false,
      tableData: [],
      searchData: {
        pageSize: 10,
        pageNum: 1
      },
      total: 0,
      isEdit: false
    }
  },
  mounted() {
    this.loadList()
  },
  methods: {
    // 编辑
    edit(row) {
      this.show = true
      this.row = row
      this.isEdit = true
    },
    // 删除banner
    del(row) {
      this.$confirm('确定删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          id: row.id
        }
        deleteBanner(data).then(res => {
          if (res.code === 0) {
            this.$message.success('删除成功!')
            this.loadList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
      })
    },
    // 新增
    add() {
      this.show = true
      this.isEdit = false
    },
    // 新增/编辑成功的回调
    success() {
      this.loadList()
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
      bannerList(this.searchData).then(res => {
        console.log(res)
        this.total = res.data.total
        this.tableData = res.data.records
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
  .table{
    width: calc(100% - 60px);
    margin-left: 30px;
    margin-top: 30px;
    float: left;
  }
  .add{
    float: right;
    margin-right: 30px;
    margin-top: 30px;
  }
</style>
