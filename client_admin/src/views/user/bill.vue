<template>
  <div class="app-container">
    <div class="tableDiv">
      <el-form size="mini" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="关键字">
          <el-input v-model="formInline.user" placeholder="" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.checkStatus" placeholder="请选择">
            <el-option :key="0" label="待审核" :value="0" />
            <el-option :key="1" label="通过" :value="1" />
            <el-option :key="-1" label="拒绝" :value="-1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initData">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 布局 -->
      <el-table size="mini" :data="tableData" border>
        <el-table-column prop="no" label="订单号" width="160" />
        <el-table-column prop="tenantUsername" label="商户名称" />
        <el-table-column prop="realNameAuth" label="认证类型" width="80">
          <template slot-scope="scope">
            {{ scope.row.realNameAuth | realNameAuthDes }}
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="120" />
        <el-table-column prop="apiMemo" label="API名称" :formatter="apiNameChange" />
        <el-table-column prop="packName" label="数据包名称" width="160" />
        <el-table-column prop="addTime" label="充值时间" width="140" />
        <el-table-column prop="orderStatus" label="状态" width="70">
          <template slot-scope="scope">
            {{ scope.row.orderStatus | orderStatusDes }}
          </template>
        </el-table-column>
        <el-table-column prop="rechargeAdmin" label="充值人" />
        <el-table-column prop="checkAdmin" label="审核人" />
        <!--      <el-table-column prop="packId" label="充值包" width="70" />-->
        <!--      <el-table-column prop="packCount" label="数量" width="70" />-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClickDetails(scope.row)">查看</el-button>
            <el-button v-if="scope.row.orderStatus == 0" type="text" size="small" @click="showCheck(scope.row)">开始审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      style="margin-top: 8px"
      background
      layout="prev, pager, next"
      :total="formInline.total"
      @current-change="pageChange"
    />
    <el-dialog title="充值明细" :visible.sync="showCheckView" width="80%">
      <div v-if="rechargeDetails.id">

        <el-form disabled size="mini" :model="rechargeDetails" label-width="200px">
          <el-form-item label="商户名称">
            <span>{{ rechargeDetails.tenantUsername }}</span>
          </el-form-item>
          <el-form-item label="认证类型">
            <el-input v-model="rechargeDetails.packName" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="rechargeDetails.mobile" />
          </el-form-item>
          <el-form-item label="API名称">
            <el-input v-model="rechargeDetails.apiMemo"" />
          </el-form-item>
          <el-form-item label="充值包">
            <el-input v-model="rechargeDetails.packName" />
          </el-form-item>
          <el-form-item label="支付方式">
            <el-select v-model="rechargeDetails.payType" style="width: 100%;" placeholder="请选择">
              <el-option :key="100" label="免费体验" :value="100" />
              <el-option :key="101" label="支付宝支付" :value="100" />
              <el-option :key="102" label="微信支付" :value="102" />
              <el-option :key="103" label="银联支付" :value="103" />
            </el-select>
          </el-form-item>
          <el-form-item label="充值时间">
            <el-input v-model="rechargeDetails.addTime" />
          </el-form-item>
          <el-form-item label="操作人">
            <el-input v-model="rechargeDetails.rechargeAdmin" />
          </el-form-item>
          <el-form-item label="附件">
            <div style="text-align: center">
              <img
                style="height: 200px"
                :src="rechargeDetails.attach"
                @click="clickShowAttach(rechargeDetails.attach)"
              >
            </div>
          </el-form-item>
          <el-form-item label="充值备注">
            <el-input v-model="rechargeDetails.memo" />
          </el-form-item>
          <el-form-item label="审核意见">
            <el-input v-model="rechargeDetails.checkMemo" />
          </el-form-item>
        </el-form>
        <div v-if="showCheckButton==true" style="text-align: right">
          <el-button size="mini" type="primary" @click="submitCheckRecharge(1)">通过</el-button>
          <el-button size="mini" type="primary" @click="submitCheckRecharge(-1)">拒绝</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showAttach" width="80%">
      <img :src="showAttachUrl">
    </el-dialog>
  </div>
</template>

<script>
import { orderRechargeListV2, checkRechargeOrder } from '@/api/userManage'

export default {
  filters: {
    realNameAuthDes(vv) {
      if (vv === 0) {
        return '未认证'
      } else if (vv === 1) {
        return '个人认证'
      } else if (vv === 2) {
        return '企业认证 '
      }
      return '未认证'
    },
    orderStatusDes(v) {
      const vv = parseInt(v)
      if (vv === 0) {
        return '等待审核'
      } else if (vv === 1) {
        return '审核通过'
      } else if (vv === -1) {
        return '拒绝通过'
      }
      return '未知状态'
    }
  },

  data() {
    return {
      showCheckView: false,
      showAttach: false,
      showCheckButton: false,
      showAttachUrl: null,
      formInline: {
        user: '',
        region: '',
        page: 1,
        total: 0,
        checkStatus: 0
      },
      tableData: [],
      rechargeDetails: {
        id: null,
        tenantUsername: null,
        packName: null,
        packCount: null,
        amount: null,
        attach: null,
        orderNo: null
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      orderRechargeListV2(this.formInline).then(res => {
        console.log('充值等待审核的列表', res.data.records)
        this.tableData = res.data.records
        this.formInline.total = res.data.total
      })
    },
    handleClickDetails(item) {
      console.log('查看详情:', item)
      this.rechargeDetails = item
      this.showCheckView = true
      this.showCheckButton = false
    },
    pageChange(p) {
      console.log('页码改变', p)
      this.formInline.page = p
      this.initData()
    },
    submitCheckRecharge(s) {
      console.log('提交审核充值', s)
      const that = this
      this.$prompt('请输入审核意见', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        // 输入审核意见之后的处理...
        const param = {
          orderNo: that.rechargeDetails.no,
          check: s,
          memo: value
        }
        checkRechargeOrder(param).then(res => {
          console.log('审核之后的结果')
          that.rechargeDetails.id = null
          that.showCheckView = false
          that.showCheckButton = false
          that.initData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消审核'
        })
      })
    },
    showCheck(item) {
      console.log('准备审核', item)
      this.rechargeDetails = item
      this.showCheckView = true
      this.showCheckButton = true
    },
    clickShowAttach(url) {
      this.showAttachUrl = url
      this.showAttach = true
    },
    apiNameChange(row, column) {
      var apiNameChange = row[column.property]
        apiNameChange = '短信'
        return apiNameChange
    }
  }
}
</script>
<style>
  .toolbar {

  }
.tableDiv{
  min-height: 60vh;
}
  el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
    border-color: #E4E7ED;
    color: black;
    cursor: not-allowed;
  }
</style>

