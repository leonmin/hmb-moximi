<template>
  <div class="page">
    <el-card :style="{ marginBottom: '10px' }">
      <mo-search :query.sync="query" @on-query="handleQuery"></mo-search>
    </el-card>
    <el-card>
      <div class="mo-table-desc">
        <div class="mo-table-lead">投放渠道分析数据</div>
        <div class="mo-table-more">
          <el-button type="primary" round size="mini" @click="handleAdd"
            >添加投放数据</el-button
          >
        </div>
      </div>
      <mo-table
        v-loading="loading"
        element-loading-text="加载中"
        :options="table"
        :page.sync="table.page"
      ></mo-table>
      <el-dialog
        :visible.sync="show"
        title="添加投放数据"
        @close="show = false"
      >
        <el-form
          ref="channel"
          :model="channel"
          :rules="rules"
          label-width="100px"
        >
          <div class="mo-form">
            <el-form-item label="渠道:" prop="channelId">
              <mo-select
                :value.sync="channel.channelId"
                :range="channelList"
                label-key="channelName"
                value-key="id"
                :style="{ width: '100%' }"
              ></mo-select>
            </el-form-item>
            <el-form-item label="日期:" prop="day">
              <el-date-picker
                v-model="channel.day"
                type="date"
                placeholder="请选择日期"
                value-format="yyyy-MM-dd"
                :style="{ width: '100%' }"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="投放金额" prop="launchAmount">
              <el-input
                v-model="channel.launchAmount"
                placeholder="请输入投放金额"
                @input="handleInput('launchAmount')"
              ></el-input>
            </el-form-item>
            <el-form-item label="投放效果" prop="launchEffect">
              <el-input
                v-model="channel.launchEffect"
                placeholder="请输入投放效果"
                @input="handleInput('launchEffect')"
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
import {
  launchAnalysisList,
  launchChannelList,
  addLaunchAnalysis
} from '@/api/mo-release'
export default {
  props: {},
  data() {
    return {
      show: false,
      loading: false,
      query: {},
      channel: {},
      channelList: [],
      table: {
        page: 1,
        total: 0,
        size: 10,
        data: [],
        columns: [
          { prop: 'day', label: '日期', minWidth: 100 },
          { prop: 'channelName', label: '渠道名称', minWidth: 100 },
          { prop: 'launchAmount', label: '投放金额', minWidth: 100 },
          { prop: 'launchEffect', label: '投放效果', minWidth: 100 },
          {
            prop: '',
            label: '投放单价',
            minWidth: 100,
            render: (h, { row }) => {
              if (
                row.launchAmount &&
                row.launchEffect &&
                row.launchEffect !== 0
              ) {
                const price = (row.launchAmount / row.launchEffect).toFixed(2)
                return h('span', price)
              } else {
                return h('span', '')
              }
            }
          }
        ]
      },
      rules: {
        day: [{ required: true, message: '请选择时间', trigger: 'change' }],
        channelName: [
          { required: true, message: '请选择渠道', trigger: 'change' }
        ],
        launchAmount: [
          { required: true, message: '请输入投放金额', trigger: 'blur' }
        ],
        launchEffect: [
          { required: true, message: '请输入投放效果', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.handleQuery()
    this.handleQueryChannel()
  },
  methods: {
    handleQuery() {
      this.loading = true
      launchAnalysisList({ ...this.query, pageNum: this.table.page }).then(
        res => {
          this.loading = false
          if (res && res.code === 0) {
            const { records = [], total = 0, size = 10 } = res.data || {}
            this.table.data = records
            this.table.total = total
            this.table.size = size
          }
        }
      )
    },
    handleQueryChannel() {
      launchChannelList().then(res => {
        if (res && res.code === 0) {
          const data = res.data || []
          this.channelList = data
        }
      })
    },
    handleInput(prop) {
      this.$refs.channel.clearValidate(prop)
    },
    handleAdd() {
      this.channel = {}
      if (this.$refs.channel) {
        this.$refs.channel.resetFields()
      }
      this.show = true
    },
    handleSave() {
      this.$refs.channel.validate(pass => {
        if (pass) {
          addLaunchAnalysis({ ...this.channel }).then(res => {
            this.show = false
            if (res && res.code === 0) {
              this.$message.success('保存成功')
              this.handleQuery()
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
