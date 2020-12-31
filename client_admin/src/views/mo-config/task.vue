<template>
  <div class="page">
    <el-card>
      <div class="mo-table-desc">
        <div class="mo-table-lead">任务管理</div>
        <div class="mo-table-more">
          <el-button type="primary" size="mini" round @click="handleAdd"
            >添加任务</el-button
          >
        </div>
      </div>
      <mo-table
        v-loading="loading"
        element-loading-text="加载中"
        :options="table"
        :pagination="false"
        @on-change="handleQuery"
      ></mo-table>
      <el-dialog
        :visible.sync="show"
        :title="task.id ? 'ID: ' + task.id : '添加任务'"
        top="30px"
        width="780px"
        @close="show = false"
      >
        <el-form ref="task" :model="task" :rules="rules" label-width="100px">
          <div class="mo-form">
            <el-form-item label="广告类型" prop="taskType">
              <mc-select-type
                :value.sync="task.taskType"
                :style="{ width: '100%' }"
                @on-change="handleChangeType"
              ></mc-select-type>
            </el-form-item>
            <el-form-item label="广告主" prop="advertId">
              <el-select
                v-model="task.advertId"
                :style="{ width: '100%' }"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in advertFilterList"
                  :key="item.id"
                  :label="item.advertName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="奖励类型">
              <mc-select-award :value.sync="task.awardType"></mc-select-award>
            </el-form-item>
            <el-form-item label="奖励数量">
              <el-input
                v-model="task.awardNum"
                placeholder="请输入奖励数量"
              ></el-input>
            </el-form-item>
            <el-form-item label="任务目标数量">
              <el-input
                v-model="task.taskNum"
                placeholder="请输入任务目标数量"
              ></el-input>
            </el-form-item>
            <el-form-item label="每日上限">
              <el-input
                v-model="task.taskLimit"
                placeholder="请输入每日上限"
              ></el-input>
            </el-form-item>
            <el-form-item label="任务标题">
              <el-input
                v-model="task.title"
                placeholder="请输入任务标题"
              ></el-input>
            </el-form-item>
            <el-form-item label="任务描述">
              <el-input
                v-model="task.taskDesc"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 3 }"
                placeholder="请输入任务描述"
              ></el-input>
            </el-form-item>
            <el-form-item label="按钮名称">
              <el-input
                v-model="task.buttonName"
                placeholder="请输入按钮名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否次日刷新">
              <div class="mo-form-item">
                <el-switch
                  v-model="task.flushTomorrow"
                  :active-value="1"
                  :inactive-value="0"
                ></el-switch>
                <span class="mo-form-item-label">是否可以翻倍领取</span>
                <el-switch
                  v-model="task.doubleReceive"
                  :active-value="1"
                  :inactive-value="0"
                ></el-switch>
                <span class="mo-form-item-label">是否自动发放奖励</span>
                <el-switch
                  v-model="task.awardWay"
                  :active-value="2"
                  :inactive-value="1"
                ></el-switch>
              </div>
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
import { btn, taskTypes } from '@/config'
import { taskList, addOrEditTask, editTaskStatus } from '@/api/mo-config'
import { advertisersList } from '@/api/mo-advert'
export default {
  props: {},
  data() {
    return {
      show: false,
      loading: false,
      task: {
        advertId: null
      },
      query: {},
      advertList: [],
      advertFilterList: [],
      table: {
        page: 1,
        total: 0,
        data: [],
        columns: [
          { prop: 'id', label: 'ID', minWidth: 50 },
          { prop: 'title', label: '标题', minWidth: 100 },
          {
            prop: 'taskType',
            label: '广告类型',
            minWidth: 100,
            render: (h, { row }) => {
              return h('span', taskTypes[row.taskType])
            }
          },
          { prop: 'advertName', label: '广告主', minWidth: 100 },
          {
            prop: 'placeStr',
            label: '任务位置',
            minWidth: 200
          },
          {
            prop: 'awardType',
            label: '奖励内容',
            minWidth: 100,
            render: (h, { row }) => {
              const award = (row.awardNum || 0) + (row.awardTypeStr || '')
              return h('span', award)
            }
          },
          { prop: 'taskDesc', label: '备注', minWidth: 150 },
          {
            prop: 'action',
            label: '操作',
            fixed: 'right',
            minWidth: 150,
            render: (h, { row }) => {
              const status = row.taskStatus === 1
              return h('div', [
                btn(h, 'primary', '修改', () => this.handleEdit(row)),
                btn(
                  h,
                  status ? 'warning' : 'success',
                  status ? '下架' : '上架',
                  () => this.handleChangeStatus(row)
                )
              ])
            }
          }
        ]
      },
      rules: {
        taskType: [
          { required: true, message: '广告类型不能为空', trigger: 'change' }
        ],
        advertId: [
          { required: true, message: '广告主不能为空', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.handleQuery()
    this.handleQueryConfig()
  },
  methods: {
    handleQuery() {
      this.loading = true
      taskList().then(res => {
        this.loading = false
        if (res && res.code === 0) {
          const data = res.data || []
          this.table.data = data
          this.table.total = data.length
        }
      })
    },
    handleQueryConfig() {
      advertisersList().then(res => {
        if (res && res.code === 0) {
          const data = res.data || []
          this.advertList = data
          this.advertFilterList = data
        }
      })
    },
    handleReset() {
      this.advertFilterList = [...this.advertList]
      if (this.$refs.task) {
        this.$refs.task.resetFields()
      }
    },
    handleAdd() {
      this.handleReset()
      this.task = {}
      this.show = true
    },
    handleEdit(row) {
      this.handleReset()
      this.task = { ...row }
      if (row.taskType) {
        this.advertFilterList = []
        this.advertList.map(a => {
          if (a.adType === row.taskType) {
            this.advertFilterList.push(a)
          }
        })
      }
      this.show = true
    },
    handleSave() {
      this.$refs.task.validate(pass => {
        if (pass) {
          addOrEditTask({ ...this.task }).then(res => {
            this.show = false
            if (res && res.code === 0) {
              this.$message.success('保存成功')
              this.handleQuery()
            }
          })
        }
      })
    },
    handleChangeType(taskType) {
      this.$set(this.task, 'advertId', null)
      this.advertFilterList = []
      this.advertList.map(a => {
        if (a.adType === taskType) {
          this.advertFilterList.push(a)
        }
      })
    },
    handleChangeStatus(row) {
      if (row && row.id) {
        editTaskStatus({
          taskId: row.id
        }).then(res => {
          if (res && res.code === 0) {
            this.handleQuery()
            this.$message.success(
              row.taskStatus === 1 ? '下架成功' : '上架成功'
            )
          } else {
            this.$message.error(res.msg || '操作失败')
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
