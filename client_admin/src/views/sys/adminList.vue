<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>管理员列表</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="addAdmin">添加管理员</el-button>
      </div>
      <el-table size="mini" :data="adminList" border>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <img style="height: 50px;width: 50px" :src="scope.row.avatar">
          </template>
        </el-table-column>
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

      <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
            <el-input v-model="form.name" ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="tel" :label-width="formLabelWidth">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd" :label-width="formLabelWidth">
            <el-input v-model="form.pwd"></el-input>
          </el-form-item>
          <el-form-item label="再次确认密码" prop="confirmPwd" :label-width="formLabelWidth">
            <el-input v-model="form.confirmPwd"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </div>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
import { adminList, submitAddRole } from '@/api/sys'
export default {
  data() {
    const validMobile = (rule, value, callback) => {
      var TEL = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (!(TEL.test(value))) {
        callback(new Error('请输入正确手机号'))
      } else {
        callback()
      }
    }
    const validConfimPwd = (rule, value, callback) => {
      const pwd = this.form.pwd
      const confirmPwd = this.form.confirmPwd
      if (pwd !== confirmPwd) {
        callback(new Error('两次密码不相同'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        tel: [{ required: true, trigger: 'blur', validator: validMobile }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        confirmPwd: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validConfimPwd }]

      },
      form: {
        name: '',
        tal: '',
        pwd: '',
        confirmPwd: ''
      },
      formLabelWidth: '120px',
      adminList: [],
      dialogFormVisible: false
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      adminList().then(res => {
        this.adminList = res.data
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handleClick() {},
    addAdmin() {
      this.dialogFormVisible = true
    },
    confirmAdd() {
      submitAddRole()
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

