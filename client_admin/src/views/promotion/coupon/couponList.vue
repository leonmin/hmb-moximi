<template>
  <div v-loading="loading" class="coupons">
    <!--   搜索栏-->
    <div class="search clearfix">
      <div class="searchItem">
        <p>关键词</p>
        <el-input
            v-model="nameInput"
            placeholder="用户名称/用户手机号"
            style="width: 180px"
            clearable
        />
      </div>
      <div class="searchItem" style="margin-left: 20px">
        <p>是否已成会员</p>
        <el-select v-model="isMemberSelect" placeholder="请选择">
          <el-option :key="-1" label="全部" :value="-1" />
          <el-option :key="1" label="未过期" :value="1" />
          <el-option :key="0" label="已过期" :value="0" />
        </el-select>
      </div>
      <div class="searchItem" style="margin-left: 20px">
        <p>状态</p>
        <el-select v-model="isUseSelect" placeholder="请选择">
          <el-option :key="-1" label="全部" :value="-1" />
          <el-option :key="1" label="启用中" :value="1" />
          <el-option :key="0" label="未启用" :value="0" />
        </el-select>
      </div>
      <el-button type="primary" class="searchBtn" @click="seachList">查询</el-button>
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
          prop="endTime"
          label="有效期"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.addTime.split('T')[0] }}<span style="margin: 0 5px">至</span>{{ scope.row.endTime.split('T')[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="couponDiscount"
          label="折扣数"
          :formatter="discountChange"
      />
      <el-table-column
          prop="enable"
          label="状态"
          :formatter="enableChange"
      />
      <el-table-column
          prop="cardSku"
          label="适用范围"
          :formatter="typeChange"
      />
      <el-table-column
          label="操作"
      >
        <template slot-scope="scope">
          <span class="tableOperation" @click="checkDetails(scope.row)">查看</span>
          <span class="tableOperation" @click="Issued">下发</span>
          <span class="tableOperation" @click="RevStop(scope.row.id,scope.row.enable ? 0: 1)">{{ scope.row.enable ? '停用': '启用' }}</span>
        </template>

      </el-table-column>
    </el-table>
    <!--    分页-->
    <div class="pageList clearfix">
      <div class="pageination">
        <p style="display: inline-block">共{{ totalPage }}页/{{ totalNum }}条数据</p>
        <el-pagination
            background
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="totalNum"
            style="display: inline-block"
            @current-change="currentChange"
        />
      </div>
    </div>
    <!--    穿梭框-->
    <el-dialog title="下发优惠券" :visible.sync="dialogFormVisible">
      <el-transfer
          v-model="value"
          style="margin-left: 20px !important;"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入城市拼音"
          :data="data"
      />
    </el-dialog>
  </div>
</template>

<script>
import { couponList, couponEnable } from '@/api/userManage'
export default {
  name: '',
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
      totalPage: 1,
      currentPage: 1, // 当前页码
      totalNum: 0, // 总条数
      pageSize: 10, // 每页的数据条数
      loading: false
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
      couponList().then(res => {
        this.couponsData = res.data.records
        this.totalNum = res.data.total
        this.pageSize = res.data.size
        this.currentPage = res.data.pages
        this.loading = false
      })
    },
    // 下发优惠券
    Issued() {
      this.dialogFormVisible = true
    },
    // 优惠券启停
    RevStop(id, rs) {
      console.log(rs, id)
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
      console.log(row)
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
      }
      return result
    },
    // 折扣
    discountChange(row, column) {
      var result = row[column.property]
      return result / 10 + '折'
    },
    // 页码改变
    currentChange() {},
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
