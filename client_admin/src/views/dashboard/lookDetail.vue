<template>
  <div>
    <el-dialog
      title="用户详情"
      width="1000px"
      height="600px"
      top="50px"
      :visible.sync="visible"
      :show="show"
      @open="openDialog"
      @close="$emit('update:show',false)"
    >
      <div v-loading="loading">
        <div class="bigBox">
          <el-row :gutter="20">
            <el-col :span="6"><el-tag style="width: 100%">id : {{ row.id===null?'':row.id }}</el-tag></el-col>
            <el-col :span="6"><el-tag style="width: 100%">用户名 : {{ row.userName===null?'':row.userName }}</el-tag></el-col>
            <el-col :span="6"><el-tag style="width: 100%">上级用户 : {{ row.puserName===null?'':row.puserName }}</el-tag></el-col>
            <el-col :span="6"><el-tag style="width: 100%">是否已成会员 : {{ row.isMember===null?'':row.isMember }}</el-tag></el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 20px">
            <el-col :span="6"><el-tag style="width: 100%">提现金额 : {{ data.applyBalance }}</el-tag></el-col>
            <el-col :span="6"><el-tag style="width: 100%">当前余额 : {{ data.balance }}</el-tag></el-col>
            <el-col :span="6"><el-tag style="width: 100%">申请提现次数 : {{ data.countRecharge }}</el-tag></el-col>
            <el-col :span="6"><el-tag style="width: 100%">合伙人提现金额 : {{ data.partnerApplyBalance }}</el-tag></el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 20px">
            <el-col :span="6"><el-tag style="width: 100%">合伙人当前余额 : {{ data.partnerBalance }}</el-tag></el-col>
            <el-col :span="6"><el-tag style="width: 100%">分数 : {{ data.score }}</el-tag></el-col>
            <el-col :span="6"><el-tag style="width: 100%">userId : {{ data.userId }}</el-tag></el-col>
            <el-col :span="6"><el-tag style="width: 100%">版本 : {{ data.version }}</el-tag></el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 20px">
            <el-col :span="6"><el-tag style="width: 100%">会员注册时间 : {{ data.vipBeginTime }}</el-tag></el-col>
            <el-col :span="6"><el-tag style="width: 100%">会员到期日 : {{ data.vipEndTime }}</el-tag></el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userDetail } from '@/api/user'
export default {
  filters: {
  },
  props: ['show', 'row'],
  data() {
    return {
      visible: this.show,
      loading: false,
      input: '',
      fullHeight: document.documentElement.clientHeight, // 页面高度
      total: null,
      btnLoading: false,
      data: {}
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
    // 关闭
    cancel() {
      this.visible = false
    },
    // 确定
    openDialog() {
      this.loadList()
    },
    loadList() {
      this.loading = true
      const data = {
        id: this.row.id
      }
      userDetail(data).then(res => {
        if (res.code === 0 || res.code === '0') {
          this.data = res.data
          this.loading = false
        }
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
