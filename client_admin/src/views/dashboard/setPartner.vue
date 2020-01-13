<template>
  <div>
    <el-dialog
      title="修改合伙人配置"
      width="600px"
      height="600px"
      top="50px"
      :visible.sync="visible"
      :show="show"
      @open="openDialog"
      @close="$emit('update:show',false)"
    >
      <div v-loading="loading">
        <div class="bigBox">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
            <el-form-item label="合伙人邀请用户首次充值提成比例" prop="firstProfit">
              <el-input v-model="ruleForm.firstProfit">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="合伙人邀请用户续费提成比例" prop="secondProfit">
              <el-input v-model="ruleForm.secondProfit">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="" style="float: right">
              <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { partnerProfitConfig, updatePartnerProfitConfig } from '@/api/user'
export default {
  filters: {
  },
  props: ['show', 'row'],
  data() {
    return {
      visible: this.show,
      loading: false,
      ruleForm: {
        firstProfit: '',
        secondProfit: ''
      },
      rules: {
        firstProfit: [
          { required: true, message: '请设置首次充值提成比例!', trigger: 'blur' },
          { pattern: /^(?:[1-9]?\d|99)$/, message: '请输入正确提成比例!' }
        ],
        secondProfit: [
          { required: true, message: '请设置续费提成比例!', trigger: 'blur' },
          { pattern: /^(?:[1-9]?\d|99)$/, message: '请输入正确提成比例!' }
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
    // 保存1
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            id: this.row.id,
            firstProfit: this.ruleForm.firstProfit,
            secondProfit: this.ruleForm.secondProfit
          }
          updatePartnerProfitConfig(data).then(res => {
            if (res.code === 0) {
              this.$message.success('操作成功!')
              this.visible = false
              this.$emit('success')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    openDialog() {
      this.loading = true
      const data = {
        id: this.row.id
      }
      partnerProfitConfig(data).then(res => {
        this.ruleForm = res.data
        this.loading = false
      })
    }
  }
}
</script>
<style scoped>
  .input{
    width: 50%;
  }
  .btn {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
  }

  .reply {
    width: 70%;
    margin-left: 20px;
    float: left;
  }

  .imgBox {
    width: 90px;
    height: 80px;
    float: left;
    margin-right: 30px;
    margin-bottom: 20px;
  }

  .most-right {
    float: right;
    width: 200px;
    min-height: 50px;
    line-height: 50px;
  }

  .line {
    overflow: hidden;
    width: 100%;
    min-height: 50px;
  }

  .rightBox {
    font-size: 15px;
    width: 80%;
    float: left;
    word-wrap: break-word; /*文字自动换行*/
  }

  .leftBox {
    float: left;
    width: 110px;
    height: auto;
    font-size: 15px;
    color: rgb(81, 81, 81);
    font-weight: 600;
    text-indent: 20px;
  }

  .titleBox {
    width: 100%;
    min-height: 60px;
    background: rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }

  .bigBox {
    width: 95%;
    height: auto;
    overflow: hidden;
    margin: 0 auto;
  }
</style>
