<template>
  <div class="financial">
    <span class="finacialTile">财务数据统计</span>
    <div class="dataDiv">
      <span class="selectDate">选择时间</span>
      <el-select v-model="dateValue" placeholder="请选择" @change="dateChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="searchItem">查询</el-button>
    </div>
    <div class="tableTitle">
      <span>10月财务报表</span>
    </div>
    <div>
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        border
        style="min-height: 650px;border: 1px solid #dedede">
        <el-table-column
        prop="tenantName"
        label="商家名称"
        >
        </el-table-column>
        <el-table-column
        prop="lastMonthBalance"
        label="上月余额"
        >
        </el-table-column>
        <el-table-column
        prop="monthRecharge"
        label="本月累计充值（元）"
        >
        </el-table-column>
        <el-table-column
        prop="chuanglanConsumeCount"
        label="创蓝（本月消耗）"
        >
        </el-table-column>
        <el-table-column
        prop="lingkaiConsumeCount"
        label="凌凯（本月消耗）"
        >
        </el-table-column>
        <el-table-column
        prop="monthBalance"
        label="本月余额"
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="pageF">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalNum"
        @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { FinanceStatistics } from '@/api/userManage'
import { allApiList } from '@/api/apiManage'
export default {
  name: 'Financial',
  created() {
    this.getApi()
    this.initData()
  },
  data() {
    return {
      tableData: [],
      currentPage: 1, // 当前页码
      totalNum: 0, // 总条数
      pageSize: 10, // 每页的数据条数
      dateValue: '2019-10',
      month: '2019-10-00 00:00',
      appId: '',
      options: [{
        value: '2019-08',
        label: '2019-08'
      }, {
        value: '2019-09',
        label: '2019-09'
      }, {
        value: '2019-10',
        label: '2019-10'
      }, {
        value: '2019-11',
        label: '2019-11'
      }]
    }
  },
  methods: {
    initData() {
      const params = {
        appId: this.appId,
        month: this.month
      }
      FinanceStatistics(params).then(res => {
        this.tableData = res.data.records
      })
    },
    currentChange(currentPage) {
      this.currentPage = currentPage
    },
    getApi() {
      allApiList().then(res => {
        this.appId = res.data[0].id
      })
    },
    dateChange(value) {
      console.log(value)
      this.dateValue = value
      this.month = value + '-00 00:00:00'
      console.log(this.month)
    },
    searchItem() {
      this.initData()
    }
  }
}
</script>

<style scoped lang="scss">
  .financial{
    padding: 30px;
    .finacialTile{
      font-weight: 600;
      color: #2b2f3a;
      font-size: 20px;
    }
    .tableTitle{
      margin-top: 30px;
      padding: 15px;
      text-align: center;
      background-color: #1986cf;
      span{
        font-size: 22px;
        font-weight: 600;
        color: white;
      }
    }
    .pageF{
      margin-top: 30px;
    }
    .dataDiv{
      margin-top: 30px;
    }
    .selectDate{
      font-weight: 600;
      font-size: 20px;
      margin-right: 20px;
    }
  }

</style>
