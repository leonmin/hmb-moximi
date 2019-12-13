<template>
  <div v-loading="loading" class="couponsDetails">
    <!--      优惠券详情-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>优惠券详情</span>
        <span>编号({{ this.$route.query.id }})</span>
      </div>
      <div>
        <el-row :gutter="20">
          <el-form ref="form" v-model="couponsDetailsData" disabled label-width="100px">
            <el-col :span="6">
              <el-form-item label="优惠券名称">
                <el-input v-model="couponsDetailsData.title" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="适用范围">
                <el-input v-model="couponsDetailsData.useForSku" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="折扣数">
                <el-input v-model="discount" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="有效期">
                <el-input v-model="isTime" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否过期">
                <el-input v-model="isExpire" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态">
                <el-input v-model="couponsDetailsData.balance" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="已领取数">
                <el-input v-model="couponsDetailsData.totalCount" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="已使用数">
                <el-input v-model="couponsDetailsData.usedCount" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="未使用数">
                <el-input v-model="couponsDetailsData.unusedCount" />
              </el-form-item>
            </el-col>
          </el-form>

        </el-row>
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
                v-model="nameInput"
                placeholder="用户名称/用户手机号/订单编号"
                style="width: 180px"
                clearable
              />
            </div>
            <div class="searchItem" style="margin-left: 20px">
              <p>当前状态</p>
              <el-select v-model="isUsed" placeholder="请选择">
                <el-option :key="-1" label="全部" :value="-1" />
                <el-option :key="1" label="已使用" :value="1" />
                <el-option :key="0" label="未使用" :value="0" />
              </el-select>
            </div>
            <el-button type="primary" class="searchBtn" @click="seachList">查询</el-button>
          </div>
          <div style="margin-top: 30px">
            <el-table
              border
              :data="usedData"
            >
              <el-table-column
                prop=""
                label="领取用户"
              />
              <el-table-column
                prop=""
                label="用户手机号"
              />
              <el-table-column
                prop=""
                label="领取方式"
              />
              <el-table-column
                prop=""
                label="领取时间"
              />
              <el-table-column
                prop=""
                label="当前状态"
              />
              <el-table-column
                prop=""
                label="使用时间"
              />
              <el-table-column
                prop=""
                label="订单编号"
              />
            </el-table>
          </div>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
import { couponDetail } from '@/api/userManage'
export default {
  name: 'CouponsDetails',
  data() {
    return {
      couponsDetailsData: '',
      nameInput: '',
      isUsed: 1,
      usedData: [],
      loading: false
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
  },
  methods: {
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
    //  查询
    seachList() {}
  }
}
</script>

<style scoped lang="scss">
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
