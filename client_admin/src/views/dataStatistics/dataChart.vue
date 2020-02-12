<template>
  <div class="datachart">
    <el-table :data="dataChart" style="width: 95%;margin-left: 40px;" border :height="fullHeight-220+'px'">
      <el-table-column prop="ofd" label="到期时间" min-width="150" show-overflow-tooltip />
      <el-table-column prop="ofdUserCount" label="到期人数（周卡/付费）" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.ofdUserCount }}（{{ scope.row.ofdWeekUserCount }} / {{ scope.row.ofdUserCount - scope.row.ofdWeekUserCount }}）</span>
        </template>
      </el-table-column>
      <el-table-column prop="ofdUserCount" label="提前续费（周卡/付费）" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.chargeEarly }} （{{ scope.row.chargeEarlyWeek }} / {{ scope.row.chargeEarlyMonth + scope.row.chargeEarlySeason + scope.row.chargeEarlyYear }}）</span>
        </template>
      </el-table-column>
      <el-table-column prop="ofdUserCount" label="今日续费（周卡/付费）" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.chargeToday }} （{{ scope.row.chargeTodayWeek }} / {{ scope.row.chargeTodayMonth + scope.row.chargeTodaySeason + scope.row.chargeTodayYear }}）</span>
        </template>
      </el-table-column>
      <el-table-column prop="ofdUserCount" label="过期2-4天（周卡/付费）" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.ofd2charge }} （{{ scope.row.ofd2chargeWeek }} / {{ scope.row.ofd2chargeMonth + scope.row.ofd2chargeSeason + scope.row.ofd2chargeYear }}）</span>
        </template>
      </el-table-column>
      <el-table-column prop="ofdUserCount" label="过期5-7天（周卡/付费）" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.ofd5charge }} （{{ scope.row.ofd5chargeWeek }} / {{ scope.row.ofd5chargeMonth + scope.row.ofd5chargeSeason + scope.row.ofd5chargeYear }}）</span>
        </template>
      </el-table-column>
      <el-table-column prop="ofdUserCount" label="过期7天以上（周卡/付费）" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.ofd8charge }} （{{ scope.row.ofd8chargeWeek }} / {{ scope.row.ofd8chargeMonth + scope.row.ofd8chargeSeason + scope.row.ofd8chargeYear }}）</span>
        </template>
      </el-table-column>
      <el-table-column prop="ofdUserCount" label="总续费率（周卡续费率/付费续费率）" min-width="150" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{scope.row.rateWeek + scope.row.rateCharge}}（{{ scope.row.rateWeek}} / {{ scope.row.rateCharge }} ）</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      style="float: right;margin-top: 20px;margin-right: 40px"
      :current-page="searchData.pageNum"
      :page-size="searchData.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { ofdCharge } from '../../api/userManage'
export default {
  filters: {
    fixed: (value) => {
      console.log(value)
    }
  },
  data() {
    return {
      page: 1,
      size: 10,
      fullHeight: document.documentElement.clientHeight, // 页面高度
      dataChart: [],
      searchData: { // 筛选的数据
        pageNum: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  watch: {
    fullHeight(val) {
      if (!this.timer) {
        this.fullHeight = val
        this.timer = true
        const that = this
        setTimeout(function() {
          that.timer = false
        }, 400)
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 当前页码
    handleSizeChange(val) {
      this.searchData.pageSize = val
      this.getData()
    },
    // 当前页数
    handleCurrentChange(val) {
      this.page = val
      this.searchData.pageNum = val
      this.getData()
    },
    getData() {
      const params = {
        page: this.page,
        size: this.size
      }
      ofdCharge(params).then(res => {
        this.dataChart = res.data.records
        this.total = res.data.total
      })
    }
  }
}
</script>

<style scoped>
.datachart{
  margin: 40px;
}
</style>
