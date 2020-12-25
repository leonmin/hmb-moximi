<template>
  <!-- 新手任务 -->
  <el-dialog
    :visible.sync="visible"
    title="新手任务"
    width="60%"
    @close="$emit('update:show', false)"
  >
    <el-form
      ref="task"
      v-loading="loading"
      :model="task"
      label-width="140px"
      element-loading-text="加载中"
    >
      <div class="mo-form">
        <el-form-item label="限时时间">
          <el-input
            v-model="task.limitTime"
            placeholder="请输入限时时间"
          ></el-input>
        </el-form-item>
        <el-form-item label="千元红包奖励类型">
          <mo-select
            :value.sync="task.awardId"
            :range="awardList"
            :style="{ width: '100%' }"
            placeholder="请选择千元红包奖励类型"
          ></mo-select>
        </el-form-item>
        <el-form-item label="千元红包奖励数量">
          <el-input
            v-model="task.awardNum"
            placeholder="请输入千元红包奖励数量"
          ></el-input>
        </el-form-item>
        <div v-for="(p, idx) in placeList" :key="idx">
          <el-form-item :label="'任务' + (idx + 1) + '-任务ID'">
            <div class="mo-form-item">
              <mo-select
                :value.sync="p.taskId"
                :range="tasks"
                :style="{ width: '60%' }"
                label-key="title"
                value-key="id"
              ></mo-select>
              <el-input
                v-model="p.placeSort"
                placeholder="位置权重"
                :style="{ width: '40%' }"
              ></el-input>
              <el-button
                type="danger"
                size="small"
                round
                plain
                :style="{ marginLeft: '10px' }"
                @click="handleRemove(idx)"
                >删除</el-button
              >
              <el-button
                type="success"
                size="small"
                round
                plain
                @click="handleAdd"
                >添加任务</el-button
              >
            </div>
          </el-form-item>
        </div>
        <div
          v-if="!loading && placeList && placeList.length === 0"
          class="mo-form-empty"
        >
          暂无任务数据
        </div>
      </div>
    </el-form>
    <span slot="footer">
      <el-button
        v-if="placeList && placeList.length === 0"
        type="success"
        round
        :style="{ float: 'left' }"
        @click="handleAdd"
        >添加任务</el-button
      >
      <el-button round @click="$emit('update:show', false)">取消</el-button>
      <el-button type="primary" round @click="handleSave">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { editPlaceIndex, editPlace } from '@/api/mo-config'
import { awardTypeList } from '@/config'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    tasks: {
      type: Array,
      default: () => []
    },
    place: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      visible: this.show,
      loading: false,
      task: {},
      placeList: [],
      awardList: awardTypeList || []
    }
  },
  watch: {
    show(v) {
      this.visible = this.show
      if (v) {
        this.task = {
          ...this.place
        }
        this.placeList = []
        this.handleQuery()
      }
    }
  },
  mounted() {},
  methods: {
    handleQuery() {
      // 查询任务列表
      this.loading = true
      editPlaceIndex({
        placeId: 2
      }).then(res => {
        this.loading = false
        if (res && res.code === 0) {
          const data = res.data || []
          this.placeList = data
        }
      })
    },
    handleAdd() {
      this.placeList.push({
        taskId: '',
        taskIcon: '',
        placeSort: ''
      })
    },
    handleRemove(idx) {
      if (this.placeList && this.placeList.length > 0) {
        this.placeList.splice(idx, 1)
      }
    },
    handleSave() {
      const tasks = []
      this.placeList.map((s, idx) => {
        if (s.taskId) {
          tasks.push({
            ...s
          })
        }
      })
      const params = {
        place: {
          placeId: 2,
          ...this.task
        },
        tasks
      }
      editPlace(params).then(res => {
        this.$emit('update:show', false)
        if (res && res.code === 0) {
          this.$message.success('修改成功')
          this.$emit('on-change')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
