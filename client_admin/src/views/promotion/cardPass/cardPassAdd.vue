<template>
  <div class="main" :style="{height:fullHeight-50+'px'}">
    <div class="title">添加卡密</div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
      style="margin-top: 30px;"
    >
      <el-form-item label="卡密名称" prop="title" class="form-item">
        <el-input v-model="ruleForm.title" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="总发行量" prop="total" class="form-item">
        <el-input v-model="ruleForm.total" placeholder="请输入" oninput="this.value=this.value.replace(/\D/g,'')" />
      </el-form-item>
      <el-form-item label="有效期" prop="beginDate" class="form-item" style="width: 700px;">
        <el-date-picker
          v-model="date"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          :picker-options="pickerOptionsStart"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          @change="getDate"
        />
      </el-form-item>
      <el-form-item label="适用范围" prop="cardType" class="form-item" style="width: 700px;">
        <el-radio v-model="ruleForm.cardType" label="0">月卡</el-radio>
        <el-radio v-model="ruleForm.cardType" label="1">季卡</el-radio>
        <el-radio v-model="ruleForm.cardType" label="2">年卡</el-radio>
      </el-form-item>
      <el-form-item label="绑定合伙人" class="form-item" style="width: 700px;">
        <el-select v-model="ruleForm.partnerName" placeholder="请选择" clearable @change="select">
          <el-option
            v-for="item in options"
            :key="item.id "
            :label="item.userName"
            :value="item "
          />
        </el-select>
      </el-form-item>
      <el-button type="primary" class="sure" :loading="loading" @click="sure('ruleForm')">确定</el-button>
    </el-form>
  </div>
</template>

<script>
import { addExchangeCard, allPartner } from '@/api/cardPass'

export default {
  name: 'CardPassAdd',
  // 存放 数据
  data: function() {
    return {
      pickerOptionsStart: {
        disabledDate(time) {
          return time.getTime() < new Date(new Date().toLocaleDateString()).getTime()
        }
      },
      loading: false,
      fullHeight: document.documentElement.clientHeight, // 页面高度
      ruleForm: {
        title: '', // 卡密名称
        cardType: '0',
        beginDate: '',
        endDate: '',
        partnerId: '', // 合伙人id
        partnerName: ''// 合伙人名字
      },
      rules: { // 正则
        title: [
          { required: true, message: '请输入卡密名称', trigger: 'blur' }
        ],
        total: [
          { required: true, message: '请输入总发行量', trigger: 'blur' }
        ],
        beginDate: [
          { required: true, message: '请选择有效期', trigger: 'blur' }
        ],
        cardType: [
          { required: true, message: '请选择适用范围', trigger: 'blur' }
        ]
      },
      options: [],
      date: []
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
    // 获取合伙人列表
    allPartner().then(res => {
      if (res.code === 0 || res.code === '0') {
        this.options = res.data
      }
    })
  },
  methods: {
    // 得到时间
    getDate(value) {
      if (value != null) {
        this.ruleForm.beginDate = value[0]
        this.ruleForm.endDate = value[1]
      }
    },
    // 选择下拉框
    select(item) {
      if (item !== null) {
        this.ruleForm.partnerId = item.id
        this.ruleForm.partnerName = item.userName
      } else {
        this.ruleForm.partnerId = ''
        this.ruleForm.partnerName = ''
      }
    },
    // 确定
    sure(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          addExchangeCard(this.ruleForm).then(res => {
            if (res.code === 0 || res.code === '0') {
              this.$message.success('操作成功!')
              this.$router.push({
                path: 'cardPassList'
              })
            }
            this.loading = false
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
