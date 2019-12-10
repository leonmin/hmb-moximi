<template>
    <div class="rechargeDetail">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>充值详情</span>
        </div>
        <div  class="text item">
          <el-table :data="packRechargeList" border style="width: 100%">
            <el-table-column prop="id" label="序号"  />
            <el-table-column  label="商户名称" >{{this.$route.query.username}}</el-table-column>
            <el-table-column label="认证类型" >{{typeChange}}</el-table-column>
            <el-table-column label="手机号" >{{mobileChange}}</el-table-column>
            <el-table-column prop="addTime" label="充值日期" />
            <el-table-column prop="packName" label="套餐" />
            <el-table-column prop="packCount" label="套餐数量" />
<!--            <el-table-column prop="packCount" label="充值人" />-->
<!--            <el-table-column prop="packCount" label="审核人" />-->
          </el-table>
        </div>
      </el-card>
    </div>
</template>

<script>
import { tenantAppPackList } from '@/api/userManage'
export default {
  name: 'RechargeDetail',
  computed: {
    typeChange: function() {
      if (this.$route.query.realNameAuth === 1) {
        return '个人认证'
      } else {
        return '企业认证'
      }
    },
    mobileChange: function() {
      var reg = /^(\d{3})\d{4}(\d{4})$/
      return this.$route.query.mobile.replace(reg, '$1****$2')
    }
  },
  created() {
    this.initData()
    console.log('传过来的username', this.$route.query.username)
    this.packRechargeList.username = this.$route.query.username
  },
  data() {
    return {
      appkey: '',
      packRechargeList: [],
      username: ''
    }
  },
  methods: {
    initData() {
      const appkey = this.$route.query.appkey
      tenantAppPackList({ appkey: appkey, page: 1 }).then(res => {
        this.packRechargeList = res.data.records
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .rechargeDetail{
    margin: 30px;
  }
</style>
