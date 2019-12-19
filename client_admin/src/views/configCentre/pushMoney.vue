<template>
  <div id="main" v-loading="loading">
    <div class="bigBox" :style="{height:fullHeight-80+'px'}">
      <div class="title">提成设置</div>
      <!--tabs-->
      <el-tabs v-model="activeName" type="card" class="tabs" @tab-click="handleClick">
        <el-tab-pane label="普通用户" name="first">
          <el-form ref="ruleForm" :model="ruleForm" label-width="250px" :rules="rules" style="margin-top: 10px">
            <el-form-item label="普通用户邀请用户续费提成比例" class="form-item" prop="ticheng">
              <el-input v-model="ruleForm.ticheng" placeholder="请输入" oninput="this.value=this.value.replace(/\D/g,'')" onpaste="return false;">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-button type="primary" class="save" :loading="btnLoading" @click="submitForm('ruleForm')">确定</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="合伙人" name="second">
          <el-form ref="ruleForm2" :model="ruleForm2" label-width="250px" :rules="rules2" style="margin-top: 10px">
            <el-form-item label="合伙人邀请用户首次充值提成比例" class="form-item" prop="hehuoren_first_time_ticheng">
              <el-input v-model="ruleForm2.hehuoren_first_time_ticheng" placeholder="请输入" oninput="this.value=this.value.replace(/\D/g,'')" onpaste="return false;">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="合伙人邀请用户续费提成比例" class="form-item" prop="hehuoren_xufei_ticheng">
              <el-input v-model="ruleForm2.hehuoren_xufei_ticheng" placeholder="请输入" oninput="this.value=this.value.replace(/\D/g,'')" onpaste="return false;">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-button type="primary" class="save" :loading="btnLoading" @click="submitForm2('ruleForm2')">确定</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="普通邀请优惠券" name="thirdly">
          <el-form ref="ruleForm3" :model="ruleForm3" label-width="150px" :rules="rules3" style="margin-top: 10px">
            <el-form-item label="普通邀请优惠券" class="form-item" prop="award_coupon">
              <el-input v-model="ruleForm3.award_coupon" placeholder="请输入" />
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
        ticheng: ''
      },
      ruleForm2: {
        hehuoren_first_time_ticheng: '',
        hehuoren_xufei_ticheng: ''
      },
      ruleForm3: {
        award_coupon: ''
      },
      rules: { // 正则
        ticheng: [
          { required: true, message: '请设置续费提成比例!', trigger: 'blur' },
          { pattern: /^(?:[1-9]?\d|99)$/, message: '请输入正确提成比例!' }
        ]
      },
      rules2: { // 正则
        hehuoren_first_time_ticheng: [
          { required: true, message: '请设置首次充值提成比例!', trigger: 'blur' },
          { pattern: /^(?:[1-9]?\d|99)$/, message: '请输入正确提成比例!' }
        ],
        hehuoren_xufei_ticheng: [
          { required: true, message: '请设置续费提成比例!', trigger: 'blur' },
          { pattern: /^(?:[1-9]?\d|99)$/, message: '请输入正确提成比例!' }
        ]
      },
      rules3: { // 正则
        award_coupon: [
          { required: true, message: '请输入普通邀请优惠券!', trigger: 'blur' }
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
          this.ruleForm.ticheng = res.data.ticheng
          this.ruleForm2.hehuoren_first_time_ticheng = res.data.hehuoren_first_time_ticheng
          this.ruleForm2.hehuoren_xufei_ticheng = res.data.hehuoren_xufei_ticheng
          this.ruleForm3.award_coupon = res.data.award_coupon
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
