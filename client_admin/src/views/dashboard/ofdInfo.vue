<template>
  <div class="ofdInfo">
    <el-card  class="box-card">
      <div slot="header" class="clearfix">
        <span>用户总数</span>
      </div>
      <div>
        <el-input
          v-model="ofdInfoData.userTotalCount"
          :disabled="true"/>
      </div>
    </el-card>
    <el-card  class="box-card" style="margin-top: 40px">
      <div slot="header" class="clearfix">
        <span>会员数量</span>
      </div>
      <div>
        <el-input
          v-model="ofdInfoData.vipCount"
          :disabled="true"/>
      </div>
    </el-card>
    <el-card  class="box-card" style="margin-top: 40px">
      <div slot="header" class="clearfix">
        <span>正常用户</span>
      </div>
      <div>
        <el-input
          v-model="ofdInfoData.vipNormalCount"
          :disabled="true"/>
      </div>
    </el-card>
    <el-card  class="box-card" style="margin-top: 40px">
      <div slot="header" class="clearfix">
        <span>过期用户</span>
      </div>
      <div>
        <el-input
          v-model="ofdInfoData.vipOfdCount"
          :disabled="true"/>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ofdInfo } from '../../api/userManage'
export default {
  data() {
    return {
      ofdInfoData: ''
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      ofdInfo().then(res => {
        this.ofdInfoData = res.data
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
