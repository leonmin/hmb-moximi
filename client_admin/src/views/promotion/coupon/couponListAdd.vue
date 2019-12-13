<template>
  <div class="couponsAdd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加优惠券</span>
      </div>
      <div>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="demo-ruleForm">
          <el-form-item label="优惠券名称" prop="couponTitle">
            <el-input v-model="ruleForm.couponTitle" placeholder="请输入优惠券名称" style="max-width: 300px" />
          </el-form-item>
          <el-form-item label="优惠券折扣数" prop="couponDiscount">
            <el-input v-model="ruleForm.couponDiscount" placeholder="请输入优惠券折扣" style="max-width: 300px" oninput="this.value=this.value.replace(/\D/g,'')" @input="compute()" />
          </el-form-item>
          <el-form-item label="优惠券有效期" prop="beginTime">
            <el-date-picker
              v-model="date"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
              @change="getDate"
            />
          </el-form-item>
          <el-form-item label="适用范围" prop="couponCardType">
            <el-radio v-model="ruleForm.couponCardType" label="0" @change="compute(100001)">月卡</el-radio>
            <el-radio v-model="ruleForm.couponCardType" label="1" @change="compute(100002)">季卡</el-radio>
            <el-radio v-model="ruleForm.couponCardType" label="2" @change="compute(100003)">年卡</el-radio>
          </el-form-item>
          <el-form-item v-show="discount!==null && discount!==''" label="优惠后会员卡价格">
            <span>{{ discount===null || discount===''?null:discount+'元' }}</span>
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
import { getDiscountPrice, addCoupon } from '@/api/userManage'
export default {
  data() {
    return {
      ruleForm: {
        couponTitle: '',
        couponDiscount: '',
        beginTime: '',
        endTime: '',
        couponCardType: '0',
        cardSku: 100001,
        enable: true
      },
      date: [],
      rules: {
        couponTitle: [{ required: true, message: '请输入优惠券名称', trigger: 'blur' }],
        couponDiscount: [
          { required: true, message: '请输入优惠券折扣数', trigger: 'blur' },
          { pattern: /^(?:[1-9]?\d|99)$/, message: '请输入正确折扣数!' }
        ],
        beginTime: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        couponCardType: [
          { required: true, message: '请选择适用范围', trigger: 'change' }
        ]
      },
      discount: '',
      btnLoading: false
    }
  },
  methods: {
    // 计算折扣价格
    compute(ev) {
      this.ruleForm.cardSku = ev
      if (this.ruleForm.couponDiscount === null || this.ruleForm.couponDiscount === '') {
        this.discount = null
      } else {
        const params = {
          cardType: this.ruleForm.couponCardType,
          discount: this.ruleForm.couponDiscount
        }
        getDiscountPrice(params).then(res => {
          if (res.code === 0 || res.code === '0') {
            this.discount = res.data
          }
        })
      }
    },
    // 得到时间
    getDate(value) {
      if (value != null) {
        this.ruleForm.beginTime = value[0]
        this.ruleForm.endTime = value[1]
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          addCoupon(this.ruleForm).then(res => {
            if (res.code === 0 || res.code === '0') {
              this.$message.success('添加成功!')
              this.btnLoading = false
            }
          })
        }
      })
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
