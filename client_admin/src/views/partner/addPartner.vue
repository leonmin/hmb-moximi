<template>
  <div class="main" :style="{height:fullHeight-50+'px'}">
    <div class="title">合伙人添加</div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
      style="margin-top: 30px;"
    >
      <el-form-item label="合伙人名称" prop="userName" class="form-item">
        <el-input v-model="ruleForm.userName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="合伙人电话" prop="mobile" class="form-item">
        <el-input v-model="ruleForm.mobile" placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" />
      </el-form-item>
      <el-form-item label="备注" class="form-item">
        <el-input v-model="ruleForm.memo" type="textarea" rows="4" placeholder="请输入" />
      </el-form-item>
      <el-button type="primary" class="sure" :loading="btnLoading" @click="sure('ruleForm')">确定</el-button>
    </el-form>
  </div>
</template>

<script>
import { addPartner } from '../../api/partner'

export default {
  name: 'CardPassAdd',
  // 存放 数据
  data: function() {
    return {
      loading: false,
      btnLoading: false,
      fullHeight: document.documentElement.clientHeight, // 页面高度
      ruleForm: {
        userName: '', // 名称
        mobile: '',
        memo: '' // 备注
      },
      rules: { // 正则
        userName: [
          { required: true, message: '请输入渠道名称!', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话!', trigger: 'blur' },
          { pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/, message: '手机号格式有误', trigger: 'blur' }
        ]
      },
      options: []
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
    // 确定
    sure(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          addPartner(this.ruleForm).then(res => {
            if (res.code === 0 || res.code === '0') {
              this.$message.success('操作成功!')
              this.$router.push({
                path: 'partnerList'
              })
            }
            this.btnLoading = false
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .sure {
    margin-left: 50px;
    margin-top: 20px;
  }

  .picker-font {
    float: left;
    margin-left: 20px;
    margin-right: 20px;
  }

  .picker {
    float: left;
  }

  .form-item {
    width: 595px;
    margin-left: 20px;
  }

  .title {
    font-size: 22px;
    margin-top: 20px;
    margin-left: 40px;
    font-weight: bold;
  }

  .main {
    width: 100%;
    overflow: auto;
  }
</style>
