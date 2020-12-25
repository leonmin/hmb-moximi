<template>
  <div class="page">
    <el-card :style="{ marginBottom: '10px' }">
      <mo-search
        :query.sync="query"
        layout="daterange, adType"
        @on-query="handleQuery"
      ></mo-search>
    </el-card>
    <el-card>
      <mo-table
        v-loading="loading"
        element-loading-text="加载中"
        :options="table"
        :page.sync="table.page"
      ></mo-table>
      <el-dialog
        :visible.sync="show"
        :title="
          '添加收入' +
            (analyse.advertName ? '(' + analyse.advertName + ')' : '')
        "
        @click="show = false"
      >
        <el-form label-width="100px">
          <div class="mo-form">
            <el-form-item label="收入金额" :error="error">
              <el-input
                v-model="analyse.income"
                placeholder="请输入收入金额"
                @input="handleInput"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer">
          <el-button round @click="show = false">取消</el-button>
          <el-button type="primary" round @click="handleSave">确定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { btn } from '@/config'
import { adAnalysisList, addIncome } from '@/api/mo-advert'
export default {
  props: {},
  data() {
    return {
      show: false,
      loading: false,
      query: {},
      analyse: {},
      table: {
        page: 1,
        total: 0,
        size: 10,
        data: [],
        columns: [
          { prop: 'day', label: '日期', minWidth: 100 },
          { prop: 'adType', label: '广告类型', minWidth: 100 },
          { prop: 'advertName', label: '广告主名称', minWidth: 100 },
          { prop: 'income', label: '收入', minWidth: 100 },
          {
            prop: 'action',
            label: '操作',
            minWidth: 100,
            render: (h, { row }) => {
              return h('div', [
                btn(h, 'primary', '添加收入', () => this.handleAdd(row))
              ])
            }
          }
        ]
      },
      error: ''
    }
  },
  mounted() {
    this.handleQuery()
  },
  methods: {
    handleQuery() {
      this.loading = false
      adAnalysisList({
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
    handleInput() {
      if (this.analyse.income) {
        this.error = ''
      }
    },
    handleAdd(row) {
      this.error = ''
      this.analyse = { ...row, income: row.income || '' }
      this.show = true
    },
    handleSave() {
      if (this.analyse && this.analyse.income) {
        if (!/^(-?\d+)(\.\d+)?$/.test(this.analyse.income)) {
          this.error = '收入金额格式错误'
          return
        }
        addIncome({
          id: this.analyse.id,
          income: this.analyse.income
        }).then(res => {
          this.show = false
          if (res && res.code === 0) {
            this.$message.success('添加成功:' + this.analyse.income)
          } else {
            this.$message.error('添加失败')
          }
        })
      } else {
        this.error = '请输入收入金额'
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
