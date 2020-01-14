<template>
  <div v-loading="loading" class="couponsDetails">
    <!--      优惠券详情-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>优惠券详情</span>
        <span>编号({{ couponsDetailsData.couponNumber }})</span>
      </div>
      <div class="lineBox">
        <div class="line">
          <div class="lineContent1">优惠券名称</div>
          <div class="lineContent2">{{ couponsDetailsData.title }}</div>
          <div class="lineContent1">适用范围</div>
          <div class="lineContent2">{{ couponsDetailsData.useForSku }}</div>
          <div class="lineContent1">折扣数</div>
          <div class="lineContent2">{{ discount }}</div>
        </div>
        <div class="line">
          <div class="lineContent1">有效期</div>
          <div class="lineContent2">{{ isTime }}</div>
          <div class="lineContent1">是否过期</div>
          <div class="lineContent2">{{ isExpire }}</div>
          <div class="lineContent1">状态</div>
          <div class="lineContent2">{{ couponsDetailsData.enable?'已启用':'未启用' }}</div>
        </div>
        <div class="line">
          <div class="lineContent1">已使用数</div>
          <div class="lineContent2">{{ couponsDetailsData.usedCount }}</div>
          <div class="lineContent1">未使用数</div>
          <div class="lineContent2">{{ couponsDetailsData.unusedCount }}</div>
          <div class="lineContent1"></div>
          <div class="lineContent2"></div>
        </div>
      </div>
    </el-card>
    <!--    优惠券使用详情-->
    <div class="useDetail">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>优惠券使用明细</span>
        </div>
        <div>
          <!--   搜索栏-->
          <div class="search clearfix">
            <div class="searchItem">
              <p>关键词</p>
              <el-input
                v-model="searchData.searchKey"
                placeholder="用户名称/用户手机号/订单编号"
                style="width: 180px"
                clearable
              />
            </div>
            <div class="searchItem" style="margin-left: 20px">
              <p>当前状态</p>
              <el-select v-model="searchData.status" placeholder="请选择">
                <el-option :key="-1" label="全部" :value="null" />
                <el-option :key="1" label="未使用" :value="0" />
                <el-option :key="2" label="已使用" :value="1" />
                <el-option :key="3" label="已过期" :value="2" />
              </el-select>
            </div>
            <el-button type="primary" class="searchBtn" @click="loadList">查询</el-button>
          </div>
          <div>
            <el-table
              border
              :data="usedData"
            >
              <el-table-column
                prop="userName"
                label="领取用户"
              />
              <el-table-column
                prop="mobile"
                label="用户手机号"
              >
                <template v-slot="scope">
                  <span>{{ scope.row.mobile | formatTel }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="getType"
                label="领取方式"
              >
                <template v-slot="scope">
                  <span>{{ scope.row.getType | getType }}</span>
                </template>
              </el-table-column>
              <!--              <el-table-column-->
              <!--                prop="addTime"-->
              <!--                label="领取时间"-->
              <!--              />-->
              <el-table-column
                prop="usedStatus"
                label="当前状态"
              >
                <template v-slot="scope">
                  <span>{{ scope.row.usedStatus | usedStatus }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="usedTime"
                label="使用时间"
              />
              <el-table-column
                prop="orderNo"
                label="订单编号"
              />
              <el-table-column
                  prop="beginTime"
                  label="开始时间"
              />
              <el-table-column
                  prop="endTime"
                  label="结束时间"
              />
            </el-table>
            <!--分页-->
            <el-pagination
              style="float: right;margin-top: 20px;margin-right: 40px;margin-bottom: 10px"
              :current-page="searchData.pageNum"
              :page-size="searchData.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
import { couponDetail, couponUseDetails } from '@/api/userManage'
export default {
  name: 'CouponsDetails',
  filters: {
    usedStatus: function(data) {
      if (data === 0 || data === '0') {
        return '未使用'
      } else if (data === 1 || data === '1') {
        return '已使用'
      } else if (data === 2 || data === '2') {
        return '已过期'
      }
    },
    getType: function(data) {
      if (data === 1 || data === '1') {
        return '后台发放'
      } else if (data === 2 || data === '2') {
        return '邀请注册时赠送'
      }
    }
  },
  data() {
    return {
      couponsDetailsData: '',
      nameInput: '',
      isUsed: 1,
      usedData: [],
      loading: false,
      searchData: {
        couponId: '',
        pageNum: 1,
        pageSize: 10,
        searchKey: '',
        status: ''
      },
      isPaging: false,
      total: null
    }
  },
  computed: {
    discount: function() {
      return this.couponsDetailsData.discount / 10 + '折'
    },
    isTime: function() {
      var start = String(this.couponsDetailsData.beginTime).split('T')[0]
      var end = String(this.couponsDetailsData.endTime).split('T')[0]
      return start + '至' + end
    },
    isExpire: function() {
      var result = this.couponsDetailsData.isExpire
      result = this.couponsDetailsData.isExpire ? '已过期' : '未过期'
      return result
    }
  },
  mounted() {
  //  优惠券详情
    this.getDetails()
    this.searchData.couponId = this.$route.query.id
    this.loadList()
  },
  methods: {
    // 当前页码
    handleSizeChange(val) {
      this.searchData.pageSize = val
      this.loadList()
    },
    // 当前页数
    handleCurrentChange(val) {
      this.isPaging = true
      this.searchData.pageNum = val
      this.loadList()
    },
    // 优惠券详情
    getDetails() {
      this.loading = true
      const params = {
        couponId: this.$route.query.id
      }
      couponDetail(params).then(res => {
        this.couponsDetailsData = res.data
        this.loading = false
      })
    },
    // 表格数据
    loadList() {
      this.loading = true
      if (!this.isPaging) {
        this.searchData.pageNum = 1
      }
      couponUseDetails(this.searchData).then(res => {
        if (res.code === 0 || res.code === '0') {
          this.total = res.data.total
          this.usedData = res.data.records
          this.isPaging = false
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
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
.couponsDetails{
  margin: 30px;
  .useDetail{
    margin-top: 30px;
  }
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
    font-size: 18px;
    margin-right:10px;
  }
  .searchBtn{
    width: 100px;
    margin-left: 50px;
  }
}
</style>
