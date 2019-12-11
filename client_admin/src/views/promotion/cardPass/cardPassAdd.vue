<template>
  <div class="main" :style="{height:fullHeight-50+'px'}">
    <div class="title">添加卡密</div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" style="margin-top: 30px;">
      <el-form-item label="卡密名称" prop="ticheng" class="form-item">
        <el-input v-model="ruleForm.title" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="总发行量" prop="ticheng" class="form-item">
        <el-input v-model="ruleForm.total" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="有效期" prop="ticheng" class="form-item" style="width: 700px;">
        <el-date-picker v-model="ruleForm.beginDate" type="date" placeholder="请选择日期" class="picker" />
        <div class="picker-font">至</div>
        <el-date-picker v-model="ruleForm.endDate" type="date" placeholder="请选择日期" class="picker" />
      </el-form-item>
      <el-form-item label="适用范围" prop="ticheng" class="form-item" style="width: 700px;">
        <el-radio v-model="ruleForm.radio" label="1">月卡</el-radio>
        <el-radio v-model="ruleForm.radio" label="2">季卡</el-radio>
        <el-radio v-model="ruleForm.radio" label="3">年卡</el-radio>
      </el-form-item>
      <el-button type="primary" class="sure">确定</el-button>
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
        title: '', // 卡密名称
        radio: '1'
      },
      rules: { // 正则
        ticheng: [
          { required: true, message: '请设置续费提成比例!', trigger: 'blur' },
          { pattern: /^(?:[1-9]?\d|99)$/, message: '请输入正确提成比例!' }
        ]
      }
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
  methods: {}
}
</script>

<style scoped>
  .sure{
    margin-left: 50px;
    margin-top: 20px;
  }
  .picker-font{
    float: left;
    margin-left: 20px;
    margin-right: 20px;
  }
  .picker{
    float: left;
  }
  .form-item{
    width: 595px;
    margin-left: 20px;
  }
  .title{
    font-size: 22px;
    margin-top: 20px;
    margin-left: 40px;
    font-weight: bold;
  }
  .main{
    width: 100%;
    overflow: auto;
  }
</style>
