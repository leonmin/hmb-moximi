<template>
  <div id="main" v-loading="loading">
    <div class="bigBox" :style="{height:fullHeight-80+'px'}">
      <div class="title">会员卡续费配置</div>
      <!--tabs-->
      <el-tabs v-model="activeName" type="card" class="tabs" @tab-click="handleClick">
        <el-tab-pane v-for="(item,index) in tabsData" :key="index" :label="item.name" :name="item.activeName">
          <el-form ref="ruleForm" :model="ruleForm" label-width="80px" :rules="rules" style="margin-top: 10px">
            <el-form-item label="原价:" class="form-item" prop="oldPriceDes">
              <el-input v-model="ruleForm.oldPriceDes" placeholder="请输入原价" onpaste="return false;">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="现价:" class="form-item" prop="priceDes">
              <el-input v-model="ruleForm.priceDes" placeholder="请输入现价" onpaste="return false;">
                <template slot="append">元</template></el-input>
            </el-form-item>
            <div class="tip">有效时间 ： {{ item.value }}天</div>
            <el-form-item label="备注:" class="form-item">
              <el-input v-model="ruleForm.cardMemo" type="textarea" placeholder="请输入备注" rows="4" />
            </el-form-item>
            <el-button type="primary" class="save" :loading="btnLoading" @click="submitForm('ruleForm',index)">保存</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { lookConfig, changeConfig } from '@/api/configCentre'
export default {
  name: 'MemberCardRenew',
  // 存放 数据
  data: function() {
    return {
      activeName: 'first',
      fullHeight: document.documentElement.clientHeight, // 页面高度
      loading: false,
      btnLoading: false,
      ruleForm: {
        oldPriceDes: '', // 原价
        priceDes: '', // 现价
        cardType: '', // 卡类型
        cardMemo: '' // 备注
      },
      rules: { // 正则
        oldPriceDes: [
          { required: true, message: '请输入原价', trigger: 'blur' }
        ],
        priceDes: [
          { required: true, message: '请输入现价', trigger: 'blur' }
        ]
      },
      tabsData: [
        {
          name: '月卡',
          activeName: 'first',
          value: '30'
        },
        {
          name: '季卡',
          activeName: 'second',
          value: '90'
        },
        {
          name: '年卡',
          activeName: 'thirdly',
          value: '360'
        }
      ],
      lookData: {
        cardType: 0
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
    // 保存
    submitForm(formName, index) {
      this.$refs[formName][index].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          /* 处理金额*/
          this.ruleForm.oldPrice = parseFloat(this.ruleForm.oldPriceDes) * 100
          this.ruleForm.price = parseFloat(this.ruleForm.priceDes) * 100
          changeConfig(this.ruleForm).then(res => {
            if (res.code === 0 || res.code === '0') {
              this.$message.success('修改成功!')
              this.btnLoading = false
              this.getData()
            }
          })
        }
      })
    },
    // tab切换
    handleClick(tab, event) {
      this.lookData.cardType = tab.index
      this.getData()
    },
    // 获取数据
    getData() {
      this.loading = true
      lookConfig(this.lookData).then(res => {
        if (res.code === 0 || res.code === '0') {
          this.ruleForm = res.data
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped>
  .save{
    margin-left: 70px;
    margin-top: 20px;
    width: 120px;
  }
  .tip{
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
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
