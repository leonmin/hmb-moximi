<template>
  <div v-loading="loading" class="ofdInfo">
    <el-card class="box-card">
      <div>
        <el-table
          :data="userCount"
          border
        >
          <el-table-column label="用户总数" prop="userTotalCount" />
          <el-table-column label="会员总数" prop="vipCount" />
          <el-table-column label="正常会员总数" prop="vipNormalCount" />
          <el-table-column label="会员过期总数" prop="vipOfdCount" />
        </el-table>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 40px">
      <div>
        <el-table
          :data="AppCount"
          border
        >
          <el-table-column label="APP用户总数" prop="appUserCount" />
          <el-table-column label="APP会员数" prop="appVipUserCount" />
          <el-table-column label="APP正常会员数" prop="appAPPVipUserCount" />
          <el-table-column label="APP过期会员数" prop="appOfdUserCount" />
        </el-table>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 40px">
      <div>
        <el-table
          :data="WxCount"
          border
        >
          <el-table-column label="公众号用户总数" prop="gzhUserCount" />
          <el-table-column label="公众号会员数" prop="gzhVipUserCount" />
          <el-table-column label="公众号正常会员数" prop="gzhNormalVipUserCount" />
          <el-table-column label="公众号过期会员数" prop="gzhOfdUserCount" />
        </el-table>
      </div>
    </el-card>
    <!--    信息-->
    <el-card class="box-card" style="margin-top: 40px">
      <span>选择日期：</span>
      <el-date-picker
        v-model="date"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="dateChange"
      />
      <div>
        <el-table
          :data="infoArr"
          border
          style="margin-top: 20px"
        >
          <el-table-column label="注册用户" prop="countRegUser" />
          <el-table-column label="注册并绑定手机号" prop="countRegUserMobile" />
<!--          <el-table-column label="公众号正常会员数" prop="gzhNormalVipUserCount" />-->
<!--          <el-table-column label="公众号过期会员数" prop="gzhOfdUserCount" />-->
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ofdInfo, regUserInfo } from '../../api/userManage'
export default {
  data() {
    return {
      ofdInfoData: '',
      userCount: [],
      AppCount: [],
      WxCount: [],
      infoArr: [],
      loading: true,
      date: '',
      begin: '',
      enf: ''
    }
  },
  created() {
    this.getTime()
  },
  mounted() {
    this.initData()
    this.getUserInfo()
  },
  methods: {
    // 获取当前时间
    getTime() {
      var now = new Date()
      var year = now.getFullYear()
      var month = now.getMonth()
      var date = now.getDate()
      month = month + 1
      if (date < 10) date = '0' + date
      if (month < 10) month = '0' + month
      this.begin = year + '-' + month + '-' + date + ' 00:00:00'
      this.end = year + '-' + month + '-' + date + ' 23:59:59'
      console.log(this.end, this.begin)
    },
    // getUserInfo
    getUserInfo() {
      const params = {
        begin: this.begin,
        end: this.end
      }
      regUserInfo(params).then(res => {
        this.infoArr = [{
          countRegUserMobile: res.data.countRegUserMobile,
          countRegUserSubscribe: res.data.countRegUserSubscribe,
          countRegUserPay: res.data.countRegUserPay,
          countRegUser: res.data.countRegUser
        }]
      })
    },
    // 日期选择
    dateChange() {
      console.log(this.date)
      if (this.date) {
        this.begin = this.date[0]
        this.end = this.date[1]
      } else {
        this.getTime()
      }
      this.getUserInfo()
    },
    initData() {
      ofdInfo().then(res => {
        this.ofdInfoData = res.data
        this.userCount = [{
          userTotalCount: this.ofdInfoData.userTotalCount, // 用户总数
          vipCount: this.ofdInfoData.vipCount, // 会员总数
          vipNormalCount: this.ofdInfoData.vipNormalCount, // 正常会员总数
          vipOfdCount: this.ofdInfoData.vipOfdCount// 会员过期总数
        }]
        this.AppCount = [{
          appUserCount: this.ofdInfoData.appUserCount, // APP用户总数
          appVipUserCount: this.ofdInfoData.appVipUserCount, // APP会员数
          appAPPVipUserCount: this.ofdInfoData.appVipUserCount - this.ofdInfoData.appOfdUserCount, // APP正常会员数
          appOfdUserCount: this.ofdInfoData.appOfdUserCount// APP过期会员数
        }]
        this.WxCount = [{
          gzhUserCount: this.ofdInfoData.gzhUserCount,
          gzhVipUserCount: this.ofdInfoData.gzhVipUserCount,
          gzhNormalVipUserCount: this.ofdInfoData.gzhVipUserCount - this.ofdInfoData.gzhOfdUserCount,
          gzhOfdUserCount: this.ofdInfoData.gzhOfdUserCount
        }]
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.ofdInfo{
  margin: 40px;
}
</style>
