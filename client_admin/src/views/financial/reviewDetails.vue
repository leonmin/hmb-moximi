<template>
  <div v-loading="loading" class="reviewDetails">
    <!--      审核详情-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>提现审核详情</span>
        <el-button style="float: right; padding: 3px 0" type="text" />
      </div>
      <div class="lineBox">
        <div class="line">
          <div class="lineContent1">提现订单编号</div>
          <div class="lineContent2">{{ checkData.no }}</div>
          <div class="lineContent1">提现人</div>
          <div class="lineContent2">{{ checkData.userName }}</div>
          <div class="lineContent1">手机号</div>
          <div class="lineContent2">{{ checkData.mobile }}</div>
        </div>
        <div class="line">
          <div class="lineContent1">提现时间</div>
          <div class="lineContent2">{{ checkData.addTime }}</div>
          <div class="lineContent1">提现账号</div>
          <div class="lineContent2">{{ checkData.alipayAccount }}</div>
          <div class="lineContent1">提现金额(元)</div>
          <div class="lineContent2">{{ checkData.cash | formatMoney}}</div>
        </div>
        <div class="line">
          <div class="lineContent1">钱包余额(元)</div>
          <div class="lineContent2">{{ checkData.balance |formatMoney }}</div>
          <div class="lineContent1">审批状态</div>
          <div class="lineContent2">{{ checkStatus }}</div>
          <div class="lineContent1" />
          <div class="lineContent2" />
        </div>
      </div>
    </el-card>
    <!--      分割线-->
    <div class="deliver" />
    <!--          页面标题-->
    <div class="pageTitle">
      <p>提现历史记录</p>
      <div class="deliver" />
    </div>
    <!--   搜索栏-->
    <div class="search clearfix">
      <div class="searchItem">
        <p style="margin-left: 10px">关键词</p>
        <el-input
          v-model="searchData.searchKey"
          placeholder="订单编号/提现账号"
          style="width: 230px"
          clearable
        />
      </div>
      <div class="searchItem" style="margin-left: 20px;font-size: 16px">
        <p>审核状态</p>
        <el-select v-model="searchData.status" clearable>
          <el-option :key="1" label="审核通过" :value="1" />
          <el-option :key="2" label="审核拒绝" :value="2" />
        </el-select>
      </div>
      <el-button type="primary" class="searchBtn" @click="loadList()">查询</el-button>
    </div>
    <!--    表格-->
    <el-card class="box-card">
      <el-table
        border
        :data="historyData"
      >
        <el-table-column
          prop="no"
          label="提现订单编号"
          min-width="200"
        />
        <el-table-column
          prop="userName"
          label="提现人"
          min-width="120"
        />
        <el-table-column
          prop="mobile"
          label="手机号"
          min-width="150"
        >
          <template v-slot="scope">
            <span>{{ scope.row.mobile | formatTel }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="提现时间"
          show-overflow-tooltip
          table-size="mini"
          min-width="160"
        />
        <el-table-column
          prop="alipayAccount"
          label="提现账号"
          show-overflow-tooltip
          min-width="180"
        />
        <el-table-column
          prop="cash"
          label="提现金额(元)"
          show-overflow-tooltip
          min-width="150"
        >
          <template v-slot="scope">
            <span>{{ scope.row.cash | formatMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="applyStatus"
          label="审批状态"
          show-overflow-tooltip
          min-width="100"
        >
          <template v-slot="scope">
            <span>{{ scope.row.applyStatus | applyStatus }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!--    分页-->
      <div class="pageList clearfix">
        <div class="pageination">
          <el-pagination
            style="float: right;margin-top: 20px;margin-right: 40px"
            :current-page="searchData.pageNum"
            :page-size="searchData.pageSize"
            layout="total,prev, pager, next, jumper"
            :total="total"
            @current-change="currentChange"
          />
        </div>
      </div>
    </el-card>
    <div class="deliver" />
    <!--    待审核按钮-->
    <div v-if="checkData.applyStatus === 0" class="checkBtn">
      <el-button type="primary" @click="approved(1)">通过</el-button>
      <el-button type="default" @click="approved(2)">拒绝</el-button>
    </div>
    <!--    查看审核备注-->
    <div v-if="checkData.memo!==null && checkData.memo!==''" style="overflow: hidden">
      <div style="float: left;margin-right: 20px;margin-bottom: 10px">备注:</div>
      <el-input v-model="memo" type="textarea" rows="4" style="float: left;width: 95%" disabled />
    </div>
    <!--    审核失败备注-->
    <el-dialog title="审核备注" :visible.sync="dialogTableVisible">
      <span style="margin: 10px 0;display: inline-block;">审核备注:</span>
      <el-input v-model="memo" clearable />
      <div style="margin: 10px 0;text-align: center">
        <el-button type="primary" @click="comfirmCheck">确认</el-button>
        <el-button type="default" @click="dialogTableVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { applyCashDetail, checkCash, cashHistoryApplyList } from '@/api/user'
export default {
  name: 'ReviewDetails',
  inject: ['reload'],
  filters: {
    applyStatus: function(data) {
      if (data === 0 || data === '0') {
        return '待审核'
      } else if (data === 1 || data === '1') {
        return '通过审核'
      } else if (data === 2 || data === '2') {
        return '拒绝审核'
      }
    }
  },
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
      loading: false,
      searchData: {
        pageNum: 1,
        searchKey: '',
        status: '',
        userId: ''
      },
      total: null,
      isPaging: false
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
    this.searchData.userId = this.$route.query.userId
    this.initData()
    this.loadList()
  },
  methods: {
    // 历史记录
    loadList() {
      this.loading = true
      if (!this.isPaging) {
        this.searchData.pageNum = 1
      }
      cashHistoryApplyList(this.searchData).then(res => {
        if (res.code === 0 || res.code === '0') {
          this.total = res.data.total
          this.historyData = res.data.records
          this.isPaging = false
          this.loading = false
        }
      })
    },
    // 初始化数据
    initData() {
      this.loading = true
      const params = {
        applyId: this.id
      }
      applyCashDetail(params).then(res => {
        this.checkData = res.data
        console.log(this.checkData)
        this.checkData.cash = this.checkData.cash / 100
        this.memo = res.data.memo
        this.loading = false
      })
    },
    currentChange(val) {
      this.isPaging = true
      this.searchData.pageNum = val
      this.loadList()
    },
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
        memo: this.memo,
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
        this.$router.push({
          path: 'applyWithdraw'
        })
      })
    }
  }
}
</script>

<style scoped>
  .line{
    display: flex;
    width: 100%;
    border: 1px solid #dcdcdc;
  }
  .lineBox{
    width: 100%;
    margin-top: -10px;
  }
  .lineContent2{
    flex: 1;
    background-color: rgba(255,255,255,1);
    font-size: 18px;
    font-weight: normal;
    min-height: 55px;
    text-align: center;
    padding-top: 20px;
  }
  .lineContent1{
    flex: 1;
    background-color: #f7f7f7;
    font-size: 18px;
    font-weight: bold;
    min-height: 55px;
    text-align: center;
    padding-top: 20px;
  }
  >>>.el-table .cell{
    white-space: nowrap !important;
  }
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
