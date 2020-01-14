<template>
  <div>
    <el-dialog
      title="新增banner"
      width="600px"
      height="600px"
      top="50px"
      :visible.sync="visible"
      :show="show"
      @open="openDialog"
      @close="$emit('update:show',false)"
    >
      <div v-loading="loading" style="overflow: hidden">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="标题" prop="title">
            <el-input v-model="ruleForm.title" />
          </el-form-item>
          <el-form-item label="备注" prop="memo">
            <el-input v-model="ruleForm.memo" />
          </el-form-item>
          <el-form-item label="跳转地址" prop="url">
            <el-input v-model="ruleForm.url" />
          </el-form-item>
          <el-form-item label="图片地址" prop="bannerUrl">
            <el-input v-model="ruleForm.bannerUrl" />
          </el-form-item>
          <el-form-item label="类型" prop="bannerType">
            <el-input v-model="ruleForm.bannerType" />
          </el-form-item>
          <el-form-item style="float: right;margin-top: 20px">
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addOrUpdateBanner } from '@/api/banner'
export default {
  filters: {
  },
  props: ['show', 'row'],
  data() {
    return {
      visible: this.show,
      loading: false,
      ruleForm: {
        title: '',
        memo: '',
        url: '',
        bannerUrl: '',
        bannerType: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        memo: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        bannerUrl: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        bannerType: [
          { required: true, message: '请输入', trigger: 'blur' }
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
    // 确定
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addOrUpdateBanner(this.ruleForm).then(res => {
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
