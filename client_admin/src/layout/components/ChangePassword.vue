<template>
  <div>
    <el-dialog
      title="修改密码"
      width="800px"
      height="600px"
      top="50px"
      :visible.sync="visible"
      :show="show"
      @open="openDialog"
      @close="$emit('update:show',false)"
    >
      <div>
        <div class="bigBox">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="旧密码" prop="oldPassword" class="item">
              <el-input v-model="ruleForm.oldPassword" type="password" />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword" class="item">
              <el-input v-model="ruleForm.newPassword" type="password" />
            </el-form-item>
            <el-form-item label="确认新密码" prop="newPassword2" class="item">
              <el-input v-model="ruleForm.newPassword2" type="password" />
            </el-form-item>
            <el-form-item style="margin-top: 40px;margin-left: 20px">
              <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">确定</el-button>
              <el-button @click="cancel()">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updatePassword } from '@/api/userManage'
export default {
  filters: {
  },
  props: ['show', 'row'],
  data() {
    return {
      visible: this.show,
      loading: false,
      input: '',
      fullHeight: document.documentElement.clientHeight, // 页面高度
      total: null,
      btnLoading: false,
      ruleForm: {
        oldPassword: null,
        newPassword: null,
        newPassword2: null
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
        ],
        newPassword2: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    show() {
      this.visible = this.show
    },
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.newPassword !== this.ruleForm.newPassword2) {
            this.$message.error('两次输入的密码不一致!')
          } else {
            const data = {
              oldPassword: this.ruleForm.oldPassword,
              newPassword: this.ruleForm.newPassword
            }
            this.loading = true
            updatePassword(data).then(res => {
              if (res.code === 0 || res.code === '0') {
                this.$message.success('修改成功!请重新登录')
                this.logout()
              }
              this.loading = false
            })
          }
        }
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 关闭
    cancel() {
      this.visible = false
    },
    // 确定
    openDialog() {
      this.ruleForm = {
        oldPassword: null,
        newPassword: null,
        newPassword2: null
      }
    }
  }
}
</script>
<style scoped>
  .item{
    width: 500px;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .bigBox {
    width: 95%;
    height: auto;
    overflow: hidden;
    margin: 0 auto;
  }
</style>
