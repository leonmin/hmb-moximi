<template>
  <div v-loading="loading" class="main">
    <el-form :inline="true" :model="searchData" class="demo-form-inline" label-width="90px" style="margin-top: 30px">
      <el-form-item>
        <el-button type="primary" style="margin-left: 40px" @click="add()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="tableData" style="width: 95%;margin-left: 40px;" border :height="fullHeight-220+'px'">
      <el-table-column prop="id" label="序号" min-width="60" show-overflow-tooltip />
      <el-table-column prop="word" label="敏感词" min-width="60" show-overflow-tooltip />
      <el-table-column prop="inviteUserCount" label="删除用户" min-width="80" show-overflow-tooltip>
        <template v-slot="scope">
          <span style="cursor: pointer;color: #409EFF;" @click="del(scope.row)">删除</span>
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
    <!--    dialog-->
    <el-dialog title="添加敏感词" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="敏感词" label-width="100px">
          <el-input v-model="form.key" autocomplete="off" style="width: 300px" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { SENLIST, SENadd, SENdelete } from '@/api/configCentre'
export default {
  // 存放 数据
  data: function() {
    return {
      loading: false,
      fullHeight: document.documentElement.clientHeight, // 页面高度
      tableData: [], // 表格数据
      searchData: { // 筛选的数据
        page: 1,
        pageSize: 10
      },
      form: { key: '' },
      total: 0,
      dialogFormVisible: false
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
    this.getList()
  },
  methods: {
    // 获取敏感词列表
    getList() {
      const params = {
        page: 1
      }
      SENLIST(params).then(res => {
        console.log(res)
        if (res.code == 0) {
          this.tableData = res.data.records
          this.total = res.data.total
        }
      })
    },
    add() {
      this.dialogFormVisible = true
    },
    confirm() {
      SENadd(this.form).then(res => {
        if (res.code == 0) {
          this.dialogFormVisible = false
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
        setTimeout(() => {
          this.form.key = ''
          this.getList()
        }, 1000)
      })
    },
    del(e) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        SENdelete({ id: e.id }).then(res => {
          if (res.code == 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
          setTimeout(() => {
            this.getList()
          }, 1000)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  }
}
</script>

<style scoped>
  .title {
    font-size: 22px;
    margin-top: 20px;
    margin-left: 40px;
    font-weight: bold;
  }
</style>
