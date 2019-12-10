<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" />
      </div>
      <el-row :gutter="20">

        <el-form ref="form" disabled :model="userInfo" label-width="100px">

          <el-col :span="6">
            <el-form-item label="用户名称">
              <el-input v-model="userInfo.name" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电话号码">
              <el-input v-model="userInfo.name" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="实名认证">
              <el-input v-model="userInfo.name" />
            </el-form-item>
          </el-col>
        </el-form>

      </el-row>

    </el-card>
    <el-tabs v-model="tab.activeName" @tab-click="handleTabClick">
      <el-tab-pane label="api列表" name="apiList">
        <el-table :data="apiTableData" border>
          <!--          <el-table-column prop="id" label="ID" width="80" />-->
          <!--          <el-table-column prop="apiId" label="APIID" width="80" />-->
          <el-table-column prop="apiNumber" label="接口" width="200" />
          <el-table-column prop="apiName" label="接口名称" width="200" />
          <el-table-column prop="appkey" label="密钥" width="328" class="tag-read"/>
          <el-table-column  width="100">
            <template slot-scope="scope">
              <span
                v-clipboard:copy="sysAppIds"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                class="copyApiKey"
                @click="copyApiKey(scope.row)">复制密钥</span>
            </template>
          </el-table-column>
<!--          <el-table-column prop="endTime" label="结束时间" width="80" />-->
          <!--          <el-table-column prop="freezeBalance" label="冻结余额 " width="50" />-->
          <el-table-column prop="freezeCount" label="冻结次数" width="200" />
          <el-table-column prop="giveCount" label="赠送次数" width="200" />
          <!--          <el-table-column prop="priceBalance" label="调用消耗余额" width="50" />-->
          <el-table-column prop="priceCount" label="调用消耗次卡" width="200" />
          <!--          <el-table-column prop="rechargeBalance" label="余额" width="50" />-->
          <el-table-column prop="rechargeCount" label="次数" width="120" />
          <el-table-column label="操作" width="120" >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="queryOrderList(scope.row)">记录</el-button>
              <el-button type="text" size="small" @click="handleRecharge(scope.row)">充值</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>

      <el-tab-pane label="充值记录" name="rechargeList" />
      <el-tab-pane label="调用订单" name="callList">
        <el-table size="mini" :data="orderTableData" border>
          <el-table-column prop="tenantId" label="用户ID" width="60" />
          <el-table-column prop="no" label="订单编号" width="150" />
          <el-table-column prop="addTime" label="调用时间" width="150" />
          <!--          <el-table-column prop="apiId" label="apiId" width="140" />-->
          <el-table-column prop="apiNumber" label="接口编号" width="80" />
          <el-table-column prop="fee" label="费用" width="80" />
          <el-table-column prop="orderStatus" label="订单状态" width="70">
            <template slot-scope="scope">
              {{ scope.row.orderStatus |orderStatusDes }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="queryOrderList(scope.row)">状态</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import { userApiList } from '@/api/userManage'
export default {
  name: 'UserDetails',
  data() {
    return {
      userInfo: {
        id: null
      },
      sysAppIds: '',
      apiTableData: [
        {
          appkey: ''
        }
      ],
      orderTableData: [],
      tab: {
        activeName: 'apiList'
      }
    }
  },
  created() {
    this.userInfo.id = this.$route.query.userId
    console.log('onCreate.userInfo：', this.userInfo)
  },
  mounted() {
    this.initApiList()
  },
  methods: {
    handleTabClick() {
      console.log('点击了tab页面...')
    },
    initApiList() {
      const that = this
      userApiList({ tenantId: this.userInfo.id }).then(res => {
        that.apiTableData = res.data
      })
    },
    handleRecharge(item) {
      console.log('开始充值:', item)
      this.$router.push(
        {
          path: 'recharge',
          query: {
            userId: this.userInfo.id,
            apiNumber: item.apiNumber,
            appkey: item.appkey,
            appId: item.id
          }
        })
    },
    queryOrderList(appKeyDetail) {
      console.log('得到的appkey', appKeyDetail)
      this.$router.push(
        {
          path: 'rechargeDetail',
          query: {
            appkey: appKeyDetail.appkey,
            username: this.$route.query.username,
            mobile: this.$route.query.mobile,
            realNameAuth: this.$route.query.realNameAuth,
            tenantType: this.$route.query.tenantType
          }
        })
    },
    copyApiKey(copyApiKey) {
      console.log(copyApiKey.appkey)
      this.sysAppIds = copyApiKey.appkey
    },
    onCopy(e) {
      console.log(e)
    },
    onError(e) {
      alert('失败')
    }
  }
}
</script>

<style scoped lang="scss">
.copyApiKey{
  color: #409EFF;
  cursor: pointer;
}
</style>
