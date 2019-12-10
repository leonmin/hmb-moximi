<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>角色列表</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="addRole">添加</el-button>
            <el-button style="float: right; padding: 3px 0" type="text" @click="initData">刷新</el-button>
          </div>
          <el-table size="mini" :data="adminList" border>
            <el-table-column prop="roleName" label="代码" width="120" />
            <el-table-column prop="roleDes" label="角色名称" width="120" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="roleClick(scope.row)">权限明细</el-button>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>角色权限</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="initData">刷新</el-button>
          </div>
          <el-table size="mini" :data="adminList" border>
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="mobile" label="电话" width="120" />
            <el-table-column prop="username" label="姓名" width="120" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

      </el-col>
    </el-row>

    <el-dialog title="编辑角色" :visible.sync="show.addRole">
      <el-form :model="roleForm">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="roleForm.roleDes" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色代码" label-width="120px">
          <el-input v-model="roleForm.roleName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show.addRole = false">取 消</el-button>
        <el-button type="primary" @click="submitAddRole">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { sysRoleList, submitAddRole, permissions } from '@/api/sys'

export default {
  data() {
    return {
      adminList: [],
      roleForm: {
        roleDes: '',
        roleName: ''
      },
      show: {
        addRole: false
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    addRole() {
      console.log('添加角色')
      this.show.addRole = true
    },
    submitAddRole() {
      submitAddRole(this.roleForm).then(res => {
        this.initData()
        this.show.addRole = false
      })
    },
    initData() {
      sysRoleList().then(res => {
        this.adminList = res.data
      })
    },
    roleClick() {
      console.log('查询所有的权限')
      permissions().then(res => {
        console.log('获得的权限:', res)
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

