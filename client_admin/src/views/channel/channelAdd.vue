<template>
  <div class="couponsAdd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加渠道</span>
      </div>
      <div>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="demo-ruleForm">
          <el-form-item label="渠道名称" prop="channelName">
            <el-input v-model="ruleForm.channelName" placeholder="请输入渠道名称" style="max-width: 300px" />
          </el-form-item>
          <el-form-item label="渠道备注" prop="channelMemo">
            <el-input v-model="ruleForm.channelMemo" placeholder="请输入渠道备注" style="max-width: 300px" />
          </el-form-item>
          <el-form-item label="渠道uuid" prop="uuid">
            <el-input v-model="ruleForm.uuid" placeholder="请输入渠道uuid" style="max-width: 300px" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="btnLoading" @click="submitForm('ruleForm')">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { channelAdd } from '@/api/userManage'
export default {
  data() {
    return {
      btnLoading: false,
      ruleForm: {
        channelName: '',
        channelMemo: '',
        uuid: ''
      },
      rules: {
        channelName: [{ required: true, message: '请输入渠道名称', trigger: 'blur' }],
        channelMemo: [
          { required: true, message: '请输入渠道备注', trigger: 'blur' }
        ],
        uuid: [
          { required: true, message: '请输入渠道uuid', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          console.log(this.ruleForm)
          channelAdd(this.ruleForm).then(res => {
            if (res.code === 0 || res.code === '0') {
              this.btnLoading = false
              this.$router.push({ name: 'channelIndex' })
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  >>>.el-input-group__append{
    background: none;
  }
  .couponsAdd{
    margin: 30px;
    .box-card{
      min-height: 800px;
    }
  }
</style>
