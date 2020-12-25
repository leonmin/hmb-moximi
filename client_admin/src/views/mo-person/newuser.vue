<template>
  <div class="page">
    <el-card :style="{ marginBottom: '10px' }">
      <mo-search :query.sync="query" @on-query="handleQuery"></mo-search>
    </el-card>
    <el-card>
      <div class="mo-table-desc">
        <div class="mo-table-lead">新用户统计数据</div>
        <div class="mo-table-more">
          <el-button type="primary" round size="mini" @click="handleExport"
            >导出</el-button
          >
        </div>
      </div>
      <mo-table
        v-loading="loading"
        element-loading-text="加载中"
        :options="table"
        :page.sync="table.page"
        @on-change="handleQuery"
      ></mo-table>
    </el-card>
  </div>
</template>
<script>
import { json2excel } from '@/utils/excel'
import { parseTime } from '@/utils'

import { newUserStatistics } from '@/api/mo-person'
export default {
  props: {},
  data() {
    return {
      query: {
        begin: '',
        end: '',
        channelId: ''
      },
      loading: false,
      table: {
        page: 1,
        total: 0,
        size: 10,
        data: [],
        columns: [
          { prop: 'day', label: '日期', minWidth: 100 },
          { prop: 'activeNum', label: 'APP激活用户数', minWidth: 100 },
          { prop: 'cardNum', label: '7天体验卡领取人数', minWidth: 100 },
          { prop: 'registerNum', label: '注册用户数', minWidth: 100 },
          { prop: 'redBagNum', label: '魔豆红包领取人数', minWidth: 100 },
          { prop: 'openNum', label: '魔小秘开通人数', minWidth: 100 },
          { prop: 'cashNum', label: '提现人数', minWidth: 100 }
        ]
      }
    }
  },
  mounted() {
    this.handleQuery()
  },
  methods: {
    handleQuery() {
      this.loading = true
      newUserStatistics({
        ...this.query,
        pageNum: this.table.page || 1
      }).then(res => {
        this.loading = false
        const { code, data } = res || {}
        if (code === 0 && data) {
          const { records = [], total = 0, size = 10 } = data
          this.table.data = records
          this.table.total = total
          this.table.size = size
        }
      })
    },
    async handleExport() {
      const name =
        '新用户统计数据' +
        parseTime(new Date(), '{y}_{m}_{d}_{h}_{i}') +
        '.xlsx'
      await json2excel(
        name,
        [
          { header: '日期', key: 'day' },
          { header: 'APP激活用户数', key: 'activeNum' },
          { header: '7天体验卡领取人数', key: 'cardNum' },
          { header: '注册用户数', key: 'registerNum' },
          { header: '魔豆红包领取人数', key: 'redBagNum' },
          { header: '魔小秘开通人数', key: 'openNum' },
          { header: '提现人数', key: 'cashNum' }
        ],
        this.table.data
      )
    }
  }
}
</script>
<style lang="scss" scoped></style>
