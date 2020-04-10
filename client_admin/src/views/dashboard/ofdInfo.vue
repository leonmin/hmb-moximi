<template>
  <div class="ofdInfo" v-loading="loading">
    <el-card  class="box-card">
      <div>
        <el-table
          :data="userCount"
          border>
          <el-table-column label="用户总数" prop="userTotalCount"></el-table-column>
          <el-table-column label="APP用户数" prop="appUserCount"></el-table-column>
          <el-table-column label="公众号用户数" prop="gzhUserCount"></el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-card  class="box-card" style="margin-top: 40px">
      <div>
        <el-table
          :data="VIPCount"
          border>
          <el-table-column label="会员总数" prop="vipCount"></el-table-column>
          <el-table-column label="APP会员数" prop="appVipUserCount"></el-table-column>
          <el-table-column label="公众号会员数" prop="gzhVipUserCount"></el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-card  class="box-card" style="margin-top: 40px">
      <div>
        <el-table
          :data="normalConut"
          border>
          <el-table-column label="正常会员数" prop="vipNormalCount"></el-table-column>
          <el-table-column label="APP正常会员数" prop="vipWXNormalCount"></el-table-column>
          <el-table-column label="公众号正常会员数" prop="appAPPVipUserCount"></el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-card  class="box-card" style="margin-top: 40px">
      <div>
        <el-table
          :data="ofdUserCount"
          border>
          <el-table-column label="会员过期总人数" prop="vipOfdCount"></el-table-column>
          <el-table-column label="APP会员过期人数数" prop="appOfdUserCount"></el-table-column>
          <el-table-column label="公众号会员过期人数" prop="gzhOfdUserCount"></el-table-column>
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
      VIPCount: [],
      normalConut: [],
      ofdUserCount:[],
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
          gzhUserCount: this.ofdInfoData.gzhUserCount,
          appUserCount: this.ofdInfoData.appUserCount,
          userTotalCount: this.ofdInfoData.userTotalCount
        }]
        this.VIPCount = [{
          vipCount: this.ofdInfoData.vipCount,
          gzhVipUserCount: this.ofdInfoData.gzhVipUserCount,
          appVipUserCount: this.ofdInfoData.appVipUserCount
        }]
        this.normalConut = [{
          vipNormalCount: this.ofdInfoData.vipNormalCount,
          vipWXNormalCount: this.ofdInfoData.gzhVipUserCount - this.ofdInfoData.gzhOfdUserCount,
          appAPPVipUserCount: this.ofdInfoData.appVipUserCount - this.ofdInfoData.appOfdUserCount
        }]
        this.ofdUserCount = [{
          vipOfdCount: this.ofdInfoData.vipOfdCount,
          appOfdUserCount: this.ofdInfoData.appOfdUserCount,
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
