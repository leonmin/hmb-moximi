<template>
  <div id="main" v-loading="loading">
    <div class="bigBox" :style="{height:fullHeight-80+'px'}">
      <div class="title">优惠券发放配置</div>
      <!--tabs-->
      <el-tabs v-model="activeName" type="card" class="tabs" @tab-click="handleClick">
        <el-tab-pane label="新用户优惠券奖励" name="first">
          <el-form ref="ruleForm" :model="ruleForm" label-width="120px" :rules="rules" style="margin-top: 10px">
            <el-form-item label="奖励开关" class="form-item" prop="switch_newuser_award">
              <el-switch v-model="ruleForm.switch_newuser_award" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0" @change="test" />
            </el-form-item>
            <el-form-item label="发放优惠券Id" class="form-item" prop="switch_newuser_award_coupon_id">
              <el-input v-model="ruleForm.switch_newuser_award_coupon_id" placeholder="请输入" oninput="this.value=this.value.replace(/\D/g,'')" onpaste="return false;" />
            </el-form-item>
            <el-button type="primary" class="save" :loading="btnLoading" @click="submitForm('ruleForm')">确定</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="用户邀请配置" name="second">
          <span style="margin-left: 30px;opacity: 0.5;font-size: 14px">A邀请B,B获得优惠券</span>
          <el-form ref="ruleForm2" :model="ruleForm2" label-width="120px" :rules="rules2" style="margin-top: 10px">
            <el-form-item label="奖励开关" class="form-item" prop="switch_invite_coupon_award">
              <el-switch v-model="ruleForm2.switch_invite_coupon_award" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0" />
            </el-form-item>
            <el-form-item label="发放优惠券Id" class="form-item" prop="AWARD_COUPON_ID">
              <el-input v-model="ruleForm2.AWARD_COUPON_ID" placeholder="请输入" oninput="this.value=this.value.replace(/\D/g,'')" onpaste="return false;" />
            </el-form-item>
            <el-button type="primary" class="save" :loading="btnLoading" @click="submitForm2('ruleForm2')">确定</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="老用户需要自己领取的优惠券" name="three">
          <el-form ref="ruleForm3" :model="ruleForm3" label-width="130px" :rules="rules3" style="margin-top: 10px">
            <el-form-item label="领取的优惠券id" class="form-item" prop="index_vip_charge_coupon">
              <el-input v-model="ruleForm3.index_vip_charge_coupon" placeholder="请输入" oninput="this.value=this.value.replace(/\D/g,'')" onpaste="return false;" />
            </el-form-item>
            <el-button type="primary" class="save" :loading="btnLoading" @click="submitForm3('ruleForm3')">确定</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getRoyalty, updateTicheng } from '@/api/configCentre'
export default {
  name: 'PushMoney',
  // 存放 数据
  data: function() {
    return {
      activeName: 'first',
      fullHeight: document.documentElement.clientHeight, // 页面高度
      loading: false,
      btnLoading: false,
      ruleForm: {
        switch_newuser_award: '1',
        switch_newuser_award_coupon_id: ''
      },
      ruleForm2: {
        switch_invite_coupon_award: '1',
        AWARD_COUPON_ID: ''
      },
      ruleForm3: {
        index_vip_charge_coupon: ''
      },
      rules: { // 正则
        switch_newuser_award: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        switch_newuser_award_coupon_id: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      rules2: { // 正则
        switch_invite_coupon_award: [
          { required: true, message: '请选择!', trigger: 'blur' }
        ],
        AWARD_COUPON_ID: [
          { required: true, message: '请输入!', trigger: 'blur' }
        ]
      },
      rules3: { // 正则
        index_vip_charge_coupon: [
          { required: true, message: '请输入!', trigger: 'blur' }
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
    this.getData()
  },
  methods: {
    test(ev) {
      // console.log(ev)
    },
    // 保存1
    submitForm(formName, index) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          updateTicheng(this.ruleForm).then(res => {
            if (res.code === 0 || res.code === '0') {
              this.$message.success('操作成功!')
              this.getData()
            }
            this.btnLoading = false
          })
        }
      })
    },
    // 保存2
    submitForm2(formName, index) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          updateTicheng(this.ruleForm2).then(res => {
            if (res.code === 0 || res.code === '0') {
              this.$message.success('操作成功!')
              this.getData()
            }
            this.btnLoading = false
          })
        }
      })
    },
    // 保存3
    submitForm3(formName, index) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          updateTicheng(this.ruleForm3).then(res => {
            if (res.code === 0 || res.code === '0') {
              this.$message.success('操作成功!')
              this.getData()
            }
            this.btnLoading = false
          })
        }
      })
    },
    // tab切换
    handleClick(tab, event) {
    },
    // 获取数据
    getData() {
      this.loading = true
      getRoyalty().then(res => {
        if (res.code === 0 || res.code === '0') {
          console.log(res)
          /* 1*/
          this.ruleForm.switch_newuser_award = res.data.switch_newuser_award
          this.ruleForm.switch_newuser_award_coupon_id = res.data.switch_newuser_award_coupon_id
          /* 2*/
          this.ruleForm2.switch_invite_coupon_award = res.data.switch_invite_coupon_award
          this.ruleForm2.AWARD_COUPON_ID = res.data.award_COUPON_ID
          /* 3*/
          this.ruleForm3.index_vip_charge_coupon = res.data.index_vip_charge_coupon
          this.loading = false
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped>
  .save{
    margin-top: 10px;
    margin-left: 20px;
    width: 120px;
  }
  >>>.el-input-group__append{
    background: none;
  }
  .form-item{
    width: 500px;
    margin-left: -11px;
  }
  .tabs{
    margin-top: 20px;
    margin-left: 20px;
  }
  .title{
    font-size: 22px;
    margin-top: 20px;
    margin-left: 20px;
    font-weight: bold;
  }
  .bigBox {
    width: 100%;
    min-height:800px;
    overflow: hidden;
    min-width: 1000px;
  }
  #main{
    width: calc(100% - 40px);
    margin: 0 auto;
    overflow: auto;
  }
</style>
