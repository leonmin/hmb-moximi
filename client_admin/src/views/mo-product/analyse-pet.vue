<template>
  <div class="page">
    <el-card :style="{ marginBottom: '10px' }">
      <mo-search
        :query.sync="query"
        layout="daterange"
        @on-query="handleQuery"
      ></mo-search>
    </el-card>
    <el-card>
      <div class="mo-table-desc">
        <div class="mo-table-lead">魔宠统计</div>
        <div class="mo-table-more">
          <el-button type="primary" size="mini" round @click="handleExport"
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
import { mcStatistics } from '@/api/mo-product'
import { json2excel } from '@/utils/excel'
import { parseTime } from '@/utils'

export default {
  props: {},
  data() {
    return {
      query: {},
      loading: false,
      table: {
        page: 1,
        total: 0,
        size: 20,
        data: [],
        columns: [
          { prop: 'day', label: '日期', minWidth: 100 },
          { prop: 'effectiveNovice', label: '有效新手魔宠量', minWidth: 100 },
          { prop: 'effectiveLv1', label: '有效一级魔宠量', minWidth: 100 },
          { prop: 'effectiveLv2', label: '有效二级魔宠量', minWidth: 100 },
          { prop: 'effectiveLv3', label: '有效三级魔宠量', minWidth: 100 },
          { prop: 'effectiveLv4', label: '有效四级魔宠量', minWidth: 100 },
          { prop: 'effectiveSupper', label: '有效超级魔宠量', minWidth: 100 },
          { prop: 'mcNoviceProduct', label: '新手魔宠产出量', minWidth: 100 },
          { prop: 'mcProductLv1', label: '一级魔宠产出量', minWidth: 100 },
          { prop: 'mcProductLv2', label: '二级魔宠产出量', minWidth: 100 },
          { prop: 'mcProductLv3', label: '三级魔宠产出量', minWidth: 100 },
          { prop: 'mcProductLv4', label: '四级魔宠产出量', minWidth: 100 },
          { prop: 'mcSupperProduct', label: '超级魔宠产出量', minWidth: 100 }
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
      mcStatistics({
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
        '魔宠统计' + parseTime(new Date(), '{y}_{m}_{d}_{h}_{i}') + '.xlsx'
      await json2excel(
        name,
        [
          { header: '日期', key: 'day' },
          { header: '有效新手魔宠量', key: 'effectiveNovice' },
          { header: '有效一级魔宠量', key: 'effectiveLv1' },
          { header: '有效二级魔宠量', key: 'effectiveLv2' },
          { header: '有效三级魔宠量', key: 'effectiveLv3' },
          { header: '有效四级魔宠量', key: 'effectiveLv4' },
          { header: '有效超级魔宠量', key: 'effectiveSupper' },
          { header: '新手魔宠产出量', key: 'mcNoviceProduct' },
          { header: '一级魔宠产出量', key: 'mcProductLv1' },
          { header: '二级魔宠产出量', key: 'mcProductLv2' },
          { header: '三级魔宠产出量', key: 'mcProductLv3' },
          { header: '四级魔宠产出量', key: 'mcProductLv4' },
          { header: '超级魔宠产出量', key: 'mcSupperProduct' }
        ],
        this.table.data
      )
    }
  }
}
</script>
<style lang="scss" scoped></style>
