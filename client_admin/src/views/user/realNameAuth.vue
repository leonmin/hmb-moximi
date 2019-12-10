<template>
  <div class="app-container">

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审核状态">
        <el-select v-model="formInline.checkStatus" placeholder="审核状态">
          <el-option label="待审核" :value="0" />
          <el-option label="审核通过" :value="2" />
          <el-option label="审核失败" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <!--   布局-->
    <el-table :data="tableData" border>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="realName" label="商户用户名" />
      <el-table-column prop="mobile" label="商户手机号"   :formatter="mobileChange"/>
      <el-table-column prop="authType" label="实名认证类型" :formatter="authTypeCheck"/>
<!--      <el-table-column prop="idCardNumber" label="身份证号码"/>-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">{{check}}</el-button>
        </template>
      </el-table-column>
    </el-table>

<!--    个人实名 -->
    <el-dialog title="审核信息" :visible.sync="showCheckView">
      <el-form :model="currentItem" label-width="100px" class="demo-ruleForm">
        <el-form-item label="认证类型：" prop="authType">{{authTypeCk}}</el-form-item>
        <el-form-item label="姓名：" prop="realName">{{currentItem.realName}}</el-form-item>
        <el-form-item label="身份证号码：" prop="idCardNumber">{{currentItem.idCardNumber}}</el-form-item>
        <el-form-item label="身份证正面：" prop="idCardFront">
          <img style="height: 200px" :src="currentItem.idCardFront">
        </el-form-item>
        <el-form-item label="身份证背面：" prop="idCardBack">
          <img style="height: 200px" :src="currentItem.idCardBack">
        </el-form-item>
        <el-form-item label="" prop="name">
          <div v-show="buttonShow">
            <el-button type="primary" @click="checkSubmit(2)">通过</el-button>
            <el-button type="primary" @click="refusedSubmit(3)">拒绝</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>

<!--    企业实名-->
    <el-dialog title="审核信息" :visible.sync="qiyeCheckView">
      <el-form :model="currentItem" label-width="150px" class="demo-ruleForm">
        <el-form-item label="认证类型：" prop="authType">{{authTypeCk}}</el-form-item>
        <span class="spanStyle">基本信息</span>
        <hr>
        <el-form-item label="公司名称：" prop="companyName">{{currentItem.companyName}}</el-form-item>
        <el-form-item label="公司地址：" prop="companyAddress">{{currentItem.companyAddress}}</el-form-item>
        <el-form-item label="详细地址：" prop="companyAddressDes">{{currentItem.companyAddressDes}}</el-form-item>
        <span class="spanStyle">企业信息</span>
        <hr>
        <el-form-item label="统一社会编码：" prop="organizationNo">{{currentItem.organizationNo}}</el-form-item>
        <el-form-item label="税务登记证编号：" prop="taxNo">{{currentItem.taxNo}}</el-form-item>
        <el-form-item label="组织机构证明：" prop="companyNo">{{currentItem.companyNo}}</el-form-item>
        <el-form-item label="营业执照副本：" prop="blImgUrl">
          <img style="height: 200px" :src="currentItem.blImgUrl">
        </el-form-item>
        <span class="spanStyle">联系人信息</span>
        <hr>
        <el-form-item label="联系人姓名：" prop="contact">{{currentItem.contact}}</el-form-item>
        <el-form-item label="联系人电话：" prop="mobile">{{currentItem.mobile}}</el-form-item>
        <el-form-item label="" prop="name">
          <div v-show="buttonShow">
            <el-button type="primary" @click="checkSubmit(2)">通过</el-button>
<!--            <el-button type="primary" @click="checkSubmit(3)">拒绝</el-button>-->
            <el-button type="primary" @click="refusedSubmit(3)">拒绝</el-button>
          </div>
        </el-form-item>

      </el-form>

    </el-dialog>

  </div>
</template>

<script>
import { realNameAuthList, submitRealNameAuth } from '@/api/userManage'

export default {
  computed: {
    authTypeCk: function() {
      if (this.currentItem.authType === 1) {
        return '个人认证'
      } else {
        return '企业认证'
      }
    }
  },
  filters: {
    orderStatusDes(v) {
      if (v === 10001) {
        return '创建'
      } else if (v === 10002) {
        return '处理中'
      } else if (v === 10003) {
        return '成功'
      } else if (v === 10004) {
        return '失败'
      }
      return '未知状态'
    }
  },
  data() {
    return {
      showCheckView: false,
      qiyeCheckView: false,
      formInline: {
        checkStatus: 0,
        user: '',
        region: '',
        realNameAuthType: 0
      },
      currentItem: {},
      tableData: [],
      apiTableData: [],
      orderTableData: [],
      check: '审核',
      buttonShow: true
    }
  },
  mounted() {
    console.log('穿过来参数:', this.$route.params)
    this.formInline.realNameAuthType = this.$route.params.realNameAuthType
    this.onSubmit()
  },
  methods: {
    mobileChange(row, column) {
      var changeMobile = row[column.property]
      var reg = /^(\d{3})\d{4}(\d{4})$/
      if (changeMobile !== null) {
        return changeMobile.replace(reg, '$1****$2')
      } else {
        return changeMobile
      }
    },
    authTypeCheck(row, column) {
      var realNameAuthType = row[column.property]
      if (realNameAuthType === 1) {
        realNameAuthType = '个人认证'
        return realNameAuthType
      } else {
        realNameAuthType = '企业认证'
        return realNameAuthType
      }
    },
    onSubmit() {
      console.log('查询')
      const that = this
      realNameAuthList(this.formInline).then(res => {
        console.log('得到的数据')
        that.tableData = res.data
      })
      if (this.formInline.checkStatus === 0) {
        this.check = '审核'
      } else if (this.formInline.checkStatus === 2) {
        this.check = '查看详情'
        this.buttonShow = false
      } else if (this.formInline.checkStatus === 3) {
        this.check = '查看驳回原因'
      }
    },
    handleClick(item) {
      console.log(this.check)
      console.log('查询用户拥有的api接口:', item)
      if (item.authType === 1) {
        this.showCheckView = true
        this.qiyeCheckView = false
      } else {
        this.showCheckView = false
        this.qiyeCheckView = true
      }
      this.currentItem = item
    },
    checkSubmit(result) {
      this.$confirm('确认审核信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {
          id: this.currentItem.id,
          checkStatus: result
        }
        submitRealNameAuth(param).then(res => {
          this.$message({
            type: 'success',
            message: '审核通过!'
          })
          this.onSubmit()
        })
        this.showCheckView = false
        this.qiyeCheckView = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '审核取消'
        })
      })
    },
    refusedSubmit(result) {
      this.$confirm('确认拒绝审核?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {
          id: this.currentItem.id,
          checkStatus: result
        }
        submitRealNameAuth(param).then(res => {
          this.$message({
            type: 'success',
            message: '拒绝成功!'
          })
          this.onSubmit()
        })
        this.showCheckView = false
        this.qiyeCheckView = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '审核取消'
        })
      })
    }
  }
}
</script>
<style>
  .spanStyle{
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .toolbar {

  }
</style>

