<template>
  <div v-loading="loading" class="coupons">
    <!--   搜索栏-->
    <div class="search clearfix">
      <div class="searchItem">
        <p>关键词</p>
        <el-input
          v-model="searchData.searchKey"
          placeholder="优惠卷名称"
          style="width: 180px"
          clearable
        />
      </div>
      <div class="searchItem" style="margin-left: 20px">
        <p>是否已过期</p>
        <el-select v-model="searchData.isOutime" placeholder="请选择" clearable>
          <el-option :key="-1" label="全部" :value="null" />
          <el-option :key="1" label="未过期" :value="0" />
          <el-option :key="0" label="已过期" :value="1" />
        </el-select>
      </div>
      <div class="searchItem" style="margin-left: 20px">
        <p>状态</p>
        <el-select v-model="searchData.status" placeholder="请选择" clearable>
          <el-option :key="-1" label="全部" :value="null" />
          <el-option :key="1" label="启用中" :value="1" />
          <el-option :key="0" label="未启用" :value="0" />
        </el-select>
      </div>
      <el-button type="primary" class="searchBtn" @click="getCoupons()">查询</el-button>
    </div>
    <!--    表格-->
    <el-table
      border
      :data="couponsData"
    >
      <el-table-column
        prop="id"
        label="编号"
      />
      <el-table-column
        prop="couponTitle"
        label="优惠券名称"
      />
      <el-table-column
        prop="validity"
        label="有效期"
      />
      <el-table-column
        prop="couponDiscount"
        label="折扣数"
        :formatter="discountChange"
      />
      <el-table-column
        prop="status"
        label="是否过期"
      >
        <template v-slot="scope">
          <span>{{ scope.row.status | status }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="enable"
        label="状态"
        :formatter="enableChange"
      >
        <template v-slot="scope">
          <span>{{ scope.row.enable | enable }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="couponType"
        label="适用范围"
      >
        <template v-slot="scope">
          <span>{{ scope.row.couponType | couponType }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <span class="tableOperation" @click="checkDetails(scope.row)">查看</span>
          <span class="tableOperation" @click="Issued(scope.row)">下发</span>
          <span class="tableOperation" @click="RevStop(scope.row.id,scope.row.enable ? 0: 1)">{{ scope.row.enable ? '停用': '启用' }}</span>
        </template>

      </el-table-column>
    </el-table>
    <!--    分页-->
    <div class="pageList clearfix">
      <div class="pageination">
        <el-pagination
          :current-page.sync="searchData.pageNum"
          :page-size="10"
          layout="total,prev, pager, next, jumper"
          :total="total"
          style="display: inline-block"
          @current-change="currentChange"
        />
      </div>
    </div>
    <!--dialog-->
    <coupon-dialog :show.sync="show" :row="row" />
  </div>
</template>

<script>
import { couponList, couponEnable } from '@/api/userManage'
import couponDialog from './couponDialog'
export default {
  name: 'CouponList',
  components: {
    couponDialog
  },
  filters: {
    enable: function(data) {
      if (data === null || data === '') {
        return null
      } else {
        if (data) {
          return '已启用'
        } else {
          return '已停用'
        }
      }
    },
    couponType: function(data) {
      if (data === 0 || data === '0') {
        return '月卡'
      } else if (data === 1 || data === '1') {
        return '季卡'
      } else if (data === 2 || data === '2') {
        return '年卡'
      }
    },
    status: function(data) {
      if (data === 0 || data === '0') {
        return '未过期'
      } else if (data === 1 || data === '1') {
        return '已过期'
      }
    }
  },
  // 存放 数据
  data() {
    const generateData = _ => {
      const data = []
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: cities[index]
        })
      })
      return data
    }
    return {
      data: generateData(),
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1
      },
      nameInput: '',
      isMemberSelect: -1,
      isUseSelect: -1,
      couponsData: [],
      dialogFormVisible: false,
      total: null,
      searchData: {
        pageNum: 1,
        searchKey: '',
        isOutime: '',
        status: ''
      },
      loading: false,
      isPaging: false, // 是否是分页
      row: null,
      show: false
    }
  },
  mounted() {
  //  获取优惠券列表
    this.getCoupons()
  },
  inject: ['reload'],
  methods: {
    // 获取优惠券列表
    getCoupons() {
      this.loading = true
      if (!this.isPaging) {
        this.searchData.pageNum = 1
      }
      couponList(this.searchData).then(res => {
        this.couponsData = res.data.records
        this.total = res.data.total
        this.isPaging = false
        this.loading = false
      })
    },
    // 下发优惠券
    Issued(row) {
      this.row = row
      this.show = true
    },
    // 优惠券启停
    RevStop(id, rs) {
      var stauts
      if (rs === 1) {
        stauts = '启用'
      } else if (rs === 0) {
        stauts = '停用'
      }
      this.$confirm('是否' + stauts + '?', '启用/停用', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          couponId: id,
          enabled: rs
        }
        couponEnable(params).then(res => {
          this.$message({
            type: 'success',
            message: '该优惠券已' + stauts + '!'
          })
          this.reload()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消' + stauts
        })
      })
    },
    // 优惠券详情
    checkDetails(row) {
      this.$router.push({ path: '/promotion/coupon/couponsDetails', query: { id: row.id }})
    },
    // 状态
    enableChange(row, column) {
      var reuslt = row[column.property]
      return reuslt ? '启用中' : '停用中'
    },
    // 适用范围
    typeChange(row, column) {
      var result = row[column.property]
      if (result === 100001) {
        result = '月卡'
      } else if (result === 100002) {
        result = '季卡'
      } else if (result === 100003) {
        result = '年卡'
      } else if (result === 0) {
        result = '通用'
      } else {
        result = '/'
      }
      return result
    },
    // 折扣
    discountChange(row, column) {
      var result = row[column.property]
      return result / 10 + '折'
    },
    // 页码改变
    currentChange(currentPage) {
      this.isPaging = true
      this.searchData.pageNum = currentPage
      this.getCoupons()
    },
    //  查询
    seachList() {}
  }
}
</script>

<style scoped lang="scss">
  >>>.el-transfer-panel{
    margin-left:50px !important;
  }
  .coupons{
    margin: 30px;
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
    .tableOperation{
      cursor: pointer;
      margin: 0 5px;
      color: #1c75ff;
    }
    .pageList{
      font-size: 14px;
      margin-top: 20px;
    }
    .pageination{
      display: flex;
      float: right;
      margin-right: 50px;
      align-items: center;
    }
  }
</style>
