<template>
  <!-- 日常任务 -->
  <!-- 福利专区 -->
  <el-dialog
    :visible.sync="visible"
    :title="title"
    @close="$emit('update:show', false)"
  >
    <el-form
      v-loading="loading"
      element-loading-text="加载中"
      label-width="120px"
    >
      <div class="mo-form">
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
    title: {
      type: String,
      default: ''
    },
    placeId: {
      type: [String, Number],
      default: ''
    }
  },

  data() {
    return {
      visible: this.show,
      loading: false,
      placeList: [],
      awardList: awardTypeList || []
    }
  },
  watch: {
    show(v) {
      this.visible = this.show
      if (v) {
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
        placeId: this.placeId
      }).then(res => {
        this.loading = false
        if (res && res.code === 0) {
          const data = res.data || []
          if (data.length === 0) {
            this.placeList = [{ taskId: '', placeSort: '' }]
          } else {
            this.placeList = data
          }

          // this.$forceUpdate()
        }
      })
    },
    handleAdd() {
      this.placeList.push({
        taskId: '',
        placeSort: ''
      })
    },
    handleRemove(idx) {
      if (this.placeList && this.placeList.length > 0) {
        this.placeList.splice(idx, 1)
      }
    },
    handleSave() {
      // this.$emit('update:show', false)
      const tasks = this.placeList.filter(s => s.taskId)
      const params = {
        place: {
          placeId: this.placeId
        },
        tasks
      }
      editPlace(params).then(res => {
        this.$emit('update:show', false)
        if (res && res.code === 0) {
          this.$message.success('修改成功')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
