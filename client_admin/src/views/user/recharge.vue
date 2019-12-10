<template>
  <div class="app-container">
    <el-row :gutter="20">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span> 【{{ userRechargeInfo.username }}】余额信息</span>
          </div>
          <div>
            <el-form :disabled="true" size="mini" label-width="120px" :model="userRechargeInfo.ttenantApp">
              <el-form-item label="余额">
                <el-input v-model="userRechargeInfo.ttenantApp.rechargeBalance" />
              </el-form-item>
              <el-form-item label="到期时间">
                <el-input v-model="userRechargeInfo.ttenantApp.endTime" />
              </el-form-item>
              <el-form-item label="剩余条数">
                <el-input v-model="userRechargeInfo.ttenantApp.rechargeCount" />
              </el-form-item>
            </el-form>
          </div>
          <div />
        </el-card>
        <!--        充值表单-->
        <div style="height: 10px" />
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>充值表单</span>
          </div>
          <el-form size="mini" label-width="120px" :model="userRechargeInfo.ttenantApp">
            <el-form-item label="选择充值包">
              <el-select v-model="rechargeForm.packId" placeholder="请选择" style="width: 100%" @change="packChange">
                <el-option
                  v-for="item in userRechargeInfo.packs"
                  :key="item.id"
                  :label="item.packName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-radio-group v-model="rechargeForm.payType" @change="clickPayType">
                <el-radio-button label="101">支付宝</el-radio-button>
                <el-radio-button label="102">微信</el-radio-button>
                <el-radio-button label="103">银联</el-radio-button>
                <el-radio-button label="100">免费</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <!--            <el-form-item label="选择数量">-->
            <!--              <el-input v-model="rechargeForm.count" type="number" />-->
            <!--            </el-form-item>-->
            <el-form-item v-if="rechargeForm.payType == 101" label="支付宝订单号">
              <el-input v-model="rechargeForm.aliPayNo" />
            </el-form-item>
            <el-form-item v-if="rechargeForm.payType == 102" label="微信订单号">
              <el-input v-model="rechargeForm.wxPayNo" />
            </el-form-item>

            <el-form-item label="总次数">
              <el-input v-model="rechargeForm.rechargeCount" disabled />
            </el-form-item>

            <el-form-item label="总金额">
              <el-input v-model="rechargeForm.fee" disabled />
            </el-form-item>

            <el-form-item v-if="rechargeForm.payType != 100" label="付款凭证">
<!--              <el-upload-->
<!--                class="avatar-uploader"-->
<!--                :action="uploadUrl"-->
<!--                :limit="1"-->
<!--                list-type="picture-card"-->
<!--                :show-file-list="false"-->
<!--                :on-success="handleAvatarSuccess"-->
<!--                :before-upload="beforeAvatarUpload"-->
<!--                :headers="headers"-->
<!--              >-->
<!--                <img v-if="rechargeForm.attach" :src="rechargeForm.attach" class="avatar">-->
<!--                <i v-else class="el-icon-plus avatar-uploader-icon" />-->
<!--              </el-upload>-->
              <el-upload
                :action="uploadUrl"
                list-type="picture-card"
                :limit="1"
                :on-success="handleAvatarSuccess"
                :on-preview="preview"
                :on-remove="handleRemove"
                :headers="headers">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisibal">
                <img width="100%" :src="userRechargeInfo.imageUrl" alt="">
              </el-dialog>
            </el-form-item>

            <el-form-item label="充值备注">
              <el-input v-model="rechargeForm.memo" />
            </el-form-item>

            <el-form-item style="text-align: right">
              <el-button type="primary" @click="clickSubmitRecharge">充值</el-button>
            </el-form-item>
          </el-form>
        </el-card>
<!--      <el-col :span="12">-->
<!--        <el-card class="box-card">-->
<!--          <div slot="header" class="clearfix">-->
<!--            <span>历史充值记录</span>-->
<!--          </div>-->
<!--          <el-table :data="packRechargeList" border size="mini" style="width: 100%">-->
<!--            <el-table-column prop="addTime" label="充值日期" width="180" />-->
<!--            <el-table-column prop="packName" label="套餐" />-->
<!--            <el-table-column prop="packCount" label="套餐数量" />-->
<!--          </el-table>-->
<!--        </el-card>-->
<!--      </el-col>-->
    </el-row>

  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

import COMMON_URL from '@/api/url'
import { userRechargeInfo, submitRecharge, tenantAppPackList } from '@/api/userManage'

export default {
  name: 'Recharge',
  data() {
    return {
      headers: { 'X-Token': getToken() },
      uploadUrl: COMMON_URL.uploadUrl,
      appkey: '',
      packRechargeList: [],
      userRechargeInfo: {
        ttenantApp: {
          rechargeBalance: null,
          rechargeCount: 0
        },
        imageUrl: ''
      },
      dialogVisibal: false,
      rechargeForm: {
        packId: null,
        memo: null,
        fee: 0,
        count: 1,
        appkey: '',
        attach: null,
        appId: null,
        payType: 101
      }
    }
  },
  mounted() {
    console.log('得到参数', this.$route.query.userId)
    this.appkey = this.$route.query.appkey
    this.rechargeForm.appkey = this.appkey
    this.rechargeForm.appId = this.$route.query.appId
    this.initData()
    this.initPackRechargeList()
  },
  methods: {
    initData() {
      userRechargeInfo({ key: this.appkey }).then(res => {
        this.userRechargeInfo = res.data
      })
    },
    preview(file) {
      this.userRechargeInfo.imageUrl = file.url
      this.dialogVisibal = true
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    initPackRechargeList() {
      tenantAppPackList({ appkey: this.appkey, page: 1 }).then(res => {
        this.packRechargeList = res.data.records
      })
    },
    clickSubmitRecharge() {
      console.log('确定充值')
      submitRecharge(this.rechargeForm).then(res => {
        console.log('充值的结果', res)
        this.$message({
          message: '充值成功',
          type: 'success',
          showClose: true,
          duration: 1000
        })
        this.initPackRechargeList()
        this.$router.go(-1)
      }).catch(err => {
        this.$message.error({
          message: '充值失败',
          showClose: true,
          duration: 1000
        })
        console.log('充值出错:', err)
      })
    },
    handleAvatarSuccess(response) {
      console.log('上传的结果:', response)
      // this.ruleForm.imageUrl = response.data.storageUrl
      this.rechargeForm.attach = response.data.storageUrl
    },
    beforeAvatarUpload(file) {

    },
    clickPayType(v) {
      console.log('支付方式改变:', v)
    },
    packChange(pack) {
      console.log('得到的充值包', pack)
      // 得到选中的item
      let packItem = {}
      this.userRechargeInfo.packs.forEach(item => {
        if (item.id === pack) {
          packItem = item
        }
      })
      // 计算价格，数量
      this.rechargeForm.fee = packItem.price * this.rechargeForm.count
      this.rechargeForm.rechargeCount = packItem.count * this.rechargeForm.count
    }
  }
}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px solid;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
