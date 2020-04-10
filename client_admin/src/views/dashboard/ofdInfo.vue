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
  </div>
</template>

<script>
import { ofdInfo } from '../../api/userManage'
export default {
  data() {
    return {
      ofdInfoData: '',
      userCount: [],
      AppCount: [],
      WxCount: [],
      loading: true
    }
  },
  created() {
    this.initData()
  },
  methods: {
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
