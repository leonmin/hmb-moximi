<template>
  <div class="couponsAdd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加优惠券</span>
      </div>
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
          <el-form-item label="优惠券名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入优惠券名称" style="max-width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="优惠券折扣数" prop="region">
            <el-input v-model="ruleForm.region" placeholder="请输入优惠券折扣" style="max-width: 300px"/>
          </el-form-item>
          <el-form-item label="优惠券有效期" required prop="date">
            <el-date-picker
              v-model="ruleForm.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="getDate">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="适用范围" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="月卡" name="type"></el-checkbox>
              <el-checkbox label="季卡" name="type"></el-checkbox>
              <el-checkbox label="年卡" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="优惠后会员卡价格">
            <span>10元</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date: '',
        type: []
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 得到时间
    getDate(value) {
      console.log(value)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped lang="scss">
  .couponsAdd{
    margin: 30px;
    .box-card{
      min-height: 800px;
    }
  }
</style>
