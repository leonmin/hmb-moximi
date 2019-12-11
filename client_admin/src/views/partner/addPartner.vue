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
      <el-form-item label="合伙人名称" prop="name" class="form-item">
        <el-input v-model="ruleForm.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="合伙人电话" prop="tel" class="form-item">
        <el-input v-model="ruleForm.tel" placeholder="请输入" oninput = "value=value.replace(/[^\d]/g,'')"/>
      </el-form-item>
      <el-form-item label="备注" class="form-item">
        <el-input v-model="ruleForm.remark" type="textarea" rows="4" placeholder="请输入"/>
      </el-form-item>
      <el-button type="primary" class="sure" @click="sure('ruleForm')">确定</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CardPassAdd',
  // 存放 数据
  data: function() {
    return {
      loading: false,
      fullHeight: document.documentElement.clientHeight, // 页面高度
      ruleForm: {
        name: '', // 名称
        tel: '',
        remark: '' // 备注
      },
      rules: { // 正则
        name: [
          { required: true, message: '请输入渠道名称!', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入有效电话!', trigger: 'blur' }
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
