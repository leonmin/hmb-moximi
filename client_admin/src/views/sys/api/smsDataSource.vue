<template>
  <div class="app-container">
    <el-table :data="apiList" style="width: 100%" border max-height="250">
      <el-table-column fixed prop="id" label="ID" width="60" />
      <el-table-column fixed prop="sourceName" label="数据源" />
      <el-table-column fixed prop="priority" label="比例" />
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="text" @click="clickEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="clickDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="边界"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listDataSource } from '@/api/apiManage'
export default {
  name: 'SmsDataSource',
  data() {
    return {
      dialogVisible: false,
      apiList: [],
      clickItem: {}
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      listDataSource().then(res => {
        this.apiList = res.data
      })
    },
    clickDel(row) {

    },
    clickEdit(row) {
      this.clickItem = row
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>

</style>
