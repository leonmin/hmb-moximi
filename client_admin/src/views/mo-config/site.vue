<template>
  <div class="page">
    <el-card>
      <mo-table
        v-loading="loading"
        element-loading-text="加载中"
        :options="table"
        :page.sync="table.page"
        :pagination="false"
        @on-change="handleQuery"
      ></mo-table>
    </el-card>
    <!-- 我的钱包-八大金刚 -->
    <task-1
      :show.sync="task[1]"
      title="我的钱包-八大金刚"
      :tasks="tasks"
      :count="8"
      :place-id="1"
    ></task-1>
    <!-- 新手任务 -->
    <task-2
      :show.sync="task[2]"
      :tasks="tasks"
      :place="table.data[1]"
      @on-change="handleQuery"
    ></task-2>
    <!-- 开宝箱-任务中心页面 -->
    <task-0
      :show.sync="task[3]"
      title="开宝箱-任务中心"
      :tasks="tasks"
      :place-id="3"
      :place="table.data[2]"
      @on-change="handleQuery"
    ></task-0>
    <!-- 开宝箱-我的会员页面 -->
    <task-0
      :show.sync="task[4]"
      title="开宝箱-我的会员"
      :tasks="tasks"
      :place-id="4"
      :place="table.data[3]"
      @on-change="handleQuery"
    ></task-0>
    <!-- 日常任务 -->
    <task-5
      :show.sync="task[5]"
      title="日常任务"
      :tasks="tasks"
      :place-id="5"
    ></task-5>
    <!-- 百宝阁 -->
    <task-0
      :show.sync="task[6]"
      title="百宝阁-完成任务得魔钻"
      :tasks="tasks"
      :place-id="6"
      :place="table.data[5]"
      @on-change="handleQuery"
    ></task-0>
    <!-- 成就任务 -->
    <task-7 :show.sync="task[7]"></task-7>
    <!-- 福利专区 -->
    <task-5
      :show.sync="task[8]"
      title="福利中心"
      :tasks="tasks"
      :place-id="8"
    ></task-5>
    <!-- 赚魔币 - 体验领魔币 -->
    <task-9 :show.sync="task[9]" :tasks="tasks"></task-9>
    <!-- 我的钱包-金刚后两位 -->
    <task-1
      :show.sync="task[10]"
      title="我的钱包-金刚位后两位"
      :tasks="tasks"
      :count="2"
      :place-id="10"
    ></task-1>
    <!-- 赚魔币-任务中心-金刚位 -->
    <task-1
      :show.sync="task[11]"
      title="赚魔币-任务中心 -金刚位"
      :tasks="tasks"
      :count="4"
      :place-id="11"
    ></task-1>
    <!-- 奖励任务 -->
    <task-3 :show.sync="task[12]"></task-3>
  </div>
</template>
<script>
import { btn } from '@/config'
import { placeList, taskList, updatePlaceStatus } from '@/api/mo-config'
// 开宝箱任务中心; 开宝箱我的会员; 百宝阁
import task0 from './site-dialog/task0.vue'
// 我的钱包8大金刚; 我的钱包金刚后两位; 赚魔币任务中心
import task1 from './site-dialog/task1.vue'
// 新手任务
import task2 from './site-dialog/task2.vue'
// 奖励任务
import task3 from './site-dialog/task3.vue'
// 日常任务; 福利专区
import task5 from './site-dialog/task5.vue'
// 成就任务
import task7 from './site-dialog/task7.vue'
// 赚魔币体验领魔币
import task9 from './site-dialog/task9.vue'

export default {
  components: {
    task0,
    task1,
    task2,
    task3,
    task5,
    task7,
    task9
  },
  props: {},
  data() {
    return {
      query: {},
      loading: false,
      jl: false,
      task: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false
      },
      tasks: [],
      table: {
        page: 1,
        total: 0,
        data: [],
        columns: [
          { prop: 'placeName', label: '位置', minWidth: 100 },
          {
            prop: 'action',
            label: '操作',
            minWidth: 100,
            render: (h, { $index, row }) => {
              const status = row.placeStatus === 1
              return h('div', [
                btn(h, 'primary', '修改', () => this.handleEdit(row, $index)),
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
      }
    }
  },
  mounted() {
    this.handleQuery()
  },
  methods: {
    handleQuery() {
      this.loading = true
      taskList().then(res => {
        this.loading = false
        if (res && res.code === 0) {
          const data = res.data || []
          this.tasks = data
        }
      })
      placeList().then(res => {
        if (res && res.code === 0) {
          const data = res.data || []
          this.table.data = data
        }
      })
    },
    handleEdit(row, index) {
      this.task[row.placeId] = !this.task[row.placeId]
    },
    handleChangeStatus(row) {
      if (row && row.id) {
        updatePlaceStatus({
          id: row.id
        }).then(res => {
          if (res && res.code === 0) {
            this.$message.success('修改成功')
            this.handleQuery()
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
