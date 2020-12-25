<template>
  <div class="mo-search">
    <el-form ref="query" :model="query" :inline="true" size="mini">
      <el-form-item v-if="layout && layout.includes('daterange')" label="日期">
        <el-date-picker
          v-model="daterange"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOpts"
          :style="{ width: '270px' }"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item v-if="layout && layout.includes('channel')" label="渠道">
        <el-select v-model="query.channelId">
          <el-option
            v-for="(r, idx) in channelList"
            :key="idx"
            :label="r.channelName"
            :value="r.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="layout && layout.includes('adType')" label="广告类型">
        <mc-select-type
          :value.sync="query.adType"
          :vertical="true"
        ></mc-select-type>
      </el-form-item>
      <el-form-item
        v-if="layout && layout.includes('payment')"
        label="支付渠道"
      >
        <el-select v-model="query.payChannel">
          <el-option
            v-for="(r, idx) in paymentList"
            :key="idx"
            :label="r.label"
            :value="r.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="layout && layout.includes('taskId')" label="任务ID">
        <el-select v-model="query.taskId">
          <el-option
            v-for="(r, idx) in tasksList"
            :key="idx"
            :label="r.title"
            :value="r.id"
            placeholder="请选择任务"
          ></el-option>
        </el-select>
        <!-- <el-input v-model="query.taskId" placeholder="请输入任务ID"></el-input> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round @click="handleQuery">查询</el-button>
        <el-button round @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import McSelectType from './McSelectType.vue'
import { launchChannelList } from '@/api/mo-release'
import { taskList } from '@/api/mo-config'
// import { parseTime } from '@/utils'

export default {
  components: { McSelectType },
  props: {
    // 布局元素
    layout: {
      type: String,
      default: 'daterange, channel'
    },
    // 查询条件
    query: {
      type: Object,
      default: () => ({
        begin: null,
        end: null
      })
    },
    // 时间后缀
    dateSuffix: {
      type: Boolean,
      default: true
    },
    // 支付渠道
    paymentList: {
      type: Array,
      default: () => []
    },
    // 禁止选择今天以后时间
    disabledDay: {
      type: Boolean,
      default: true
    },
    // 禁止选择今天
    disabledToday: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      daterange: [],
      channelList: [],
      tasksList: []
    }
  },
  computed: {
    suffix() {
      return {
        begin: this.dateSuffix ? ' 00:00:00' : '',
        end: this.dateSuffix ? ' 23:59:59' : ''
      }
    },
    pickerOpts() {
      const self = this
      return {
        disabledDate(time) {
          if (self.disabledDay) {
            if (self.disabledToday) {
              return time.getTime() > Date.now() - 60 * 60 * 24 * 1000
            } else {
              return time.getTime() > Date.now()
            }
          } else {
            return false
          }
        }
      }
    }
  },
  mounted() {
    if (this.layout) {
      // 设置默认时间
      // if (this.layout.includes('daterange')) {
      //   const begin = parseTime(
      //     new Date(new Date().setDate(new Date().getDate() - 30)),
      //     '{y}-{m}-{d}'
      //   )
      //   const end = parseTime(new Date(), '{y}-{m}-{d}')
      //   const daterange = [begin, end]
      //   this.daterange = daterange
      //   this.handleChange(daterange)
      // }
      if (this.layout.includes('channel')) {
        this.handleFindChannel()
      }
      if (this.layout.includes('taskId')) {
        this.handleFindTasks()
      }
    }
  },
  methods: {
    handleQuery() {
      this.$emit('on-query')
    },
    handleReset() {
      Object.keys(this.query).map(key => {
        this.query[key] = null
      })
      if (this.layout && this.layout.includes('daterange')) {
        this.daterange = []
      }
      this.handleQuery()
    },
    handleChange(e) {
      this.query.begin = e && e[0] + this.suffix.begin
      this.query.end = e && e[1] + this.suffix.end
    },
    handleFindChannel() {
      launchChannelList().then(res => {
        if (res && res.code === 0) {
          const data = res.data || []
          this.channelList = data
        }
      })
    },
    handleFindTasks() {
      taskList().then(res => {
        if (res && res.code === 0) {
          this.tasksList = res.data || []
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.mo-search {
  .el-form {
    display: flex;
    align-items: center;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
