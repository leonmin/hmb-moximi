<template>
  <div class="page">
    <el-card>
      <div class="mo-table-desc">
        <div class="mo-table-lead">团队分红配置数据</div>
        <div class="mo-table-more">
          <el-button type="primary" round size="mini" @click="handleCalc"
            >分红试算</el-button
          >
        </div>
      </div>
      <mo-table
        v-loading="loading"
        element-loading-text="加载中"
        :options="table"
        :pagination="false"
      ></mo-table>
      <el-dialog
        :visible.sync="show"
        :title="'分红金额修改' + (bonus.level ? '(' + bonus.level + ')' : '')"
        @close="show = false"
      >
        <el-form label-width="100px">
          <div class="mo-form">
            <el-form-item label="金额" :error="error">
              <el-input
                v-model="bonus.configValue"
                placeholder="请输入分红金额"
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
      <el-dialog
        :visible.sync="showCalc"
        title="分红试算"
        @close="showCalc = false"
      >
        <div class="mo-dialog">
          <div class="mp-trial">
            <div v-for="(t, idx) in trial" :key="idx" class="mp-trial-item">
              <span v-if="idx % 2 === 0">{{ t.num }}</span>
              <span>{{ t.desc }}</span>
            </div>
          </div>
        </div>
        <span slot="footer">
          <el-button type="primary" round @click="showCalc = false"
            >关闭</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { btn } from '@/config'
import { teamBonusConfIndex, editBonusAmount } from '@/api/mo-config'
export default {
  props: {},
  data() {
    return {
      show: false,
      showCalc: false,
      loading: false,
      bonus: {},
      trial: [
        { num: 1000, desc: '好友任务' },
        { num: 0, desc: '+' },
        { num: 3000, desc: '直推好友' },
        { num: 0, desc: '+' },
        { num: 3000, desc: '间推好友' },
        { num: 0, desc: '+' },
        { num: 3000, desc: '扩散好友' },
        { num: 0, desc: '=' },
        { num: 10000, desc: '总计' }
      ],
      table: {
        data: [],
        columns: [
          { prop: 'level', label: '配置项', minWidth: 200 },
          {
            prop: 'configValue',
            label: '分红金额',
            minWidth: 100,
            render: (h, { $index, row }) => {
              if ($index < 3) {
                return h('span', row.configValue + '元/个视频')
              } else {
                return h('span', row.configValue + '元/人')
              }
            }
          },
          {
            prop: 'action',
            label: '操作',
            minWidth: 100,
            render: (h, { $index, row }) => {
              if ($index < 3) {
                return h('div', [
                  btn(h, 'primary', '修改', () => this.handleEdit(row))
                ])
              } else {
                return h('span')
              }
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
      this.loading = true
      teamBonusConfIndex().then(res => {
        this.loading = false
        if (res && res.code === 0) {
          this.table.data = res.data || []
        }
      })
    },
    handleEdit(row) {
      this.error = ''
      this.show = true
      this.bonus = { ...row }
    },
    handleInput() {
      this.error = ''
    },
    handleSave() {
      const { configKey, configValue } = this.bonus || {}
      if (configKey) {
        if (!configValue) {
          this.error = '请输入分红金额'
          return
        }
        if (!/^(-?\d+)(\.\d+)?$/.test(configValue)) {
          this.error = '请输入的分红金额格式错误'
          return
        }
        editBonusAmount({
          configKey,
          configValue
        }).then(res => {
          this.show = false
          if (res && res.code === 0) {
            this.$message.success('修改分红金额成功')
            this.handleQuery()
          } else {
            this.$message.error(res.msg || '修改失败')
          }
        })
      } else {
        this.$message.error('修改异常')
      }
    },
    handleCalc() {
      this.showCalc = true
    }
  }
}
</script>
<style lang="scss" scoped>
.mp-trial {
  display: flex;
  align-items: center;
  .mp-trial-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    span {
      font-size: 18px;
      font-weight: bold;
      padding: 2px 0;
      &:first-child {
        font-size: 25px;
      }
    }
  }
}
</style>
