<template>
  <div class="main" :style="{height:fullHeight-50+'px'}">
    <div class="title">添加活动卡密</div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="130px"
      class="demo-ruleForm"
      style="margin-top: 30px;"
    >
      <el-form-item label="活动卡密名称" prop="title" class="form-item">
        <el-input v-model="ruleForm.title" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="总发行量" prop="total" class="form-item">
        <el-input v-model="ruleForm.total" placeholder="请输入" oninput="this.value=this.value.replace(/\D/g,'')" />
      </el-form-item>
      <el-form-item label="领取后有效时间" prop="ableDays" class="form-item">
        <el-input v-model="ruleForm.ableDays" placeholder="请输入" oninput="this.value=this.value.replace(/\D/g,'')">
          <template slot="append">天</template>
        </el-input>
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
      <el-form-item label="绑定渠道" class="form-item" style="width: 700px;" prop="channel">
        <el-select v-model="ruleForm.channel" placeholder="请选择" clearable>
          <el-option
            v-for="item in options"
            :key="item.id "
            :label="item.channelName"
            :value="item.uuid"
          />
        </el-select>
      </el-form-item>
      <el-button type="primary" class="sure" :loading="loading" @click="sure('ruleForm')">确定</el-button>
    </el-form>
  </div>
</template>

<script>
import { addExchangeCard, allPartner } from '@/api/cardPass'
import { channelList } from '@/api/userManage'

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
        total: '', // 总量
        ableDays: '', // 有效天数
        beginDate: '',
        endDate: '',
        channel: '', // 渠道
        activity: 1// 表示活动渠道
      },
      rules: { // 正则
        title: [
          { required: true, message: '请输入卡密名称', trigger: 'blur' }
        ],
        total: [
          { required: true, message: '请输入总发行量', trigger: 'blur' }
        ],
        ableDays: [
          { required: true, message: '请输入领取后有效天数', trigger: 'blur' }
        ],
        beginDate: [
          { required: true, message: '请选择有效期', trigger: 'blur' }
        ],
        cardType: [
          { required: true, message: '请选择适用范围', trigger: 'blur' }
        ],
        channel: [
          { required: true, message: '请选择渠道', trigger: 'blur' }
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
    const params = {
      pageNum: 1,
      pageSize: 10000
    }
    // 获取渠道列表
    channelList(params).then(res => {
      if (res.code === 0 || res.code === '0') {
        this.options = res.data.records
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
    // 确定
    sure(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          addExchangeCard(this.ruleForm).then(res => {
            if (res.code === 0 || res.code === '0') {
              this.$message.success('操作成功!')
              this.$router.push({
                path: 'cardPassActivityList'
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
