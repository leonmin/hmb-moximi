<template>
  <div class="reviewDetails">
    <!--      审核详情-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>提现审核详情</span>
        <el-button style="float: right; padding: 3px 0" type="text" />
      </div>
      <el-row :gutter="20">
        <el-form ref="form" disabled v-model="checkData" label-width="100px">
          <el-col :span="6">
            <el-form-item label="提现订单编号">
              <el-input v-model="checkData.no"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="提现人">
              <el-input v-model="checkData.userName"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号">
              <el-input v-model="checkData.mobile"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="提现时间">
              <el-input v-model="checkData.addTime"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="提现账号">
              <el-input v-model="checkData.alipayAccount"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="提现金额">
              <el-input v-model="checkData.cash" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="钱包余额">
              <el-input v-model="checkData.balance"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="审批状态">
              <el-input v-model="checkStatus"/>
            </el-form-item>
          </el-col>
        </el-form>

      </el-row>

    </el-card>
    <!--      分割线-->
    <div class="deliver"></div>
    <!--          页面标题-->
    <div class="pageTitle">
      <p>提现历史记录</p>
      <div class="deliver"></div>
    </div>
    <!--   搜索栏-->
    <div class="search clearfix">
      <div class="searchItem">
        <p>关键词</p>
        <el-input
          v-model="oderInput"
          placeholder="订单编号/提现人/提现账号"
          style="width: 180px"
          clearable>
        </el-input>
      </div>
      <div class="searchItem" style="margin-left: 20px;font-size: 16px">
        <p>审核状态</p>
        <el-select v-model="selectValue">
          <el-option :key="0" label="待审核" :value="0" />
          <el-option :key="1" label="审核通过" :value="1" />
          <el-option :key="2" label="审核拒绝" :value="2" />
        </el-select>
      </div>
      <el-button type="primary" class="searchBtn" >查询</el-button>
    </div>
<!--    表格-->
    <el-table
    border
    :data="historyData">
      <el-table-column
      prop=""
      label="提现订单编号"></el-table-column>
      <el-table-column
      prop=""
      label="提现人"></el-table-column>
      <el-table-column
      prop=""
      label="手机号"></el-table-column>
      <el-table-column
      prop=""
      label="提现时间"></el-table-column>
      <el-table-column
      prop=""
      label="提现账号"></el-table-column>
      <el-table-column
      prop=""
      label="提现金额"></el-table-column>
      <el-table-column
      prop=""
      label="审批状态"></el-table-column>
    </el-table>
    <!--    分页-->
    <div class="pageList clearfix">
      <div class="pageination">
        <p style="display: inline-block">共{{totalPage}}页/{{totalNum}}条数据</p>
        <el-pagination
          background
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="totalNum"
          @current-change="currentChange"
          style="display: inline-block">
        </el-pagination>
      </div>
    </div>
    <div class="deliver"></div>
<!--    待审核按钮-->
    <div class="checkBtn" v-if="checkData.applyStatus === 0" >
      <el-button type="primary" @click="approved(1)">通过</el-button>
      <el-button type="default" @click="approved(2)">拒绝</el-button>
    </div>
<!--    查看审核备注-->
    <div class="checkMemo clearfix" v-if="checkData.applyStatus !== 0">
      <span v-if="checkData.applyStatus === 1">审核备注:</span>
      <span v-if="checkData.applyStatus === 2">拒绝原因:</span>
      <div>
        <textarea disabled v-model="checkData.memo" name="" id="" cols="60" rows="10"></textarea>
      </div>
    </div>
<!--    审核失败备注-->
    <el-dialog title="审核备注" :visible.sync="dialogTableVisible">
      <span style="margin: 10px 0;display: inline-block;">审核备注:</span>
      <el-input v-model="memo" clearable></el-input>
      <div style="margin: 10px 0;text-align: center">
        <el-button type="primary" @click="comfirmCheck">确认</el-button>
        <el-button type="default" @click="dialogTableVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { applyCashDetail, checkCash } from '@/api/user'
export default {
  name: 'ReviewDetails',
  inject: ['reload'],
  data() {
    return {
      checkData: [],
      historyData: [],
      selectValue: 0,
      oderInput: '',
      confirmStatus: '',
      dialogTableVisible: false,
      id: '',
      memo: '', // 审核备注
      totalPage: 1,
      currentPage: 1, // 当前页码
      totalNum: 0, // 总条数
      pageSize: 10 // 每页的数据条数
    }
  },
  computed: {
    checkStatus: function() {
      var status = this.checkData.applyStatus
      var checkStatus = ''
      if (status === 0) {
        checkStatus = '待审核'
        return checkStatus
      } else if (status === 1) {
        checkStatus = '通过审核'
        return checkStatus
      } else if (status === 2) {
        checkStatus = '拒绝审核'
        return checkStatus
      }
      return checkStatus
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.initData()
  },
  methods: {
    // 初始化数据
    initData() {
      const params = {
        applyId: this.id
      }
      applyCashDetail(params).then(res => {
        this.checkData = res.data
      })
    },
    currentChange() {},
    //  审核通过按钮
    approved(status) {
      if (status === 1) {
        this.$confirm('确认通过审核？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.showDialog(status)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          })
        })
      } else if (status === 2) {
        this.$confirm('确认拒绝审核？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.showDialog(status)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          })
        })
      }
    },
    // 弹窗
    showDialog(status) {
      this.dialogTableVisible = true
      this.confirmStatus = status
    },
    // 确认拒绝
    comfirmCheck() {
      this.checkApproved(this.confirmStatus)
    },
    //  审核操作
    checkApproved(status) {
      const params = {
        status: status,
        memo: '',
        applyId: this.id
      }
      checkCash(params).then(res => {
        if (status === 1) {
          this.$message({
            type: 'success',
            message: '审核已通过!'
          })
        } else if (status === 2) {
          this.$message({
            type: 'success',
            message: '审核已拒绝!'
          })
        }
        this.dialogTableVisible = false
        this.reload()
      })
    }
  }
}
</script>

<style scoped>
.reviewDetails{
  margin: 30px;
}
.deliver{
  border-top:  1px solid #dedede;
  margin: 30px 0;
}
.pageTitle{
  font-size: 16px;
  color: #333333;
}
.pageTitle>p{
  margin-left: 20px;
}
/*  搜索栏*/
.search{
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
.searchItem{
  float: left;
}
.searchItem>p{
  display: inline-block;
  font-size: 16px;
  margin-right:10px;
}
.searchBtn{
  width: 100px;
  margin-left: 50px;
}
.pageList{
  font-size: 14px;
  margin: 10px 0;
}
.pageination{
  display: flex;
  float: right;
  margin-right: 50px;
  align-items: center;
}
  .checkBtn{
    text-align: center;
    margin:30px ;
  }
.checkBtn>.el-button{
  width: 100px;
  margin: 10px 60px;
}
  .checkMemo{
  }
.checkMemo>span{
  display: inline-block;
  margin: 10px 0;
  font-size: 20px;
  float: left;
}
.checkMemo>div{
  float: left;
}
.checkMemo textarea{
  display: inline-block;
  margin-left: 30px;
}
</style>
