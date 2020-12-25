<template>
  <el-dialog
    :visible.sync="visible"
    top="20px"
    width="55%"
    title="赚魔币-体验领魔币"
    @close="$emit('update:show', false)"
  >
    <div v-loading="loading" element-loading-text="加载中" class="mo-task">
      <div v-for="(site, idx) in placeList" :key="idx" class="mo-task-item">
        <el-form label-width="100px">
          <el-form-item :label="'位置' + (idx + 1) + '-任务ID'">
            <div class="mo-form-item">
              <mo-select
                :value.sync="site.taskId"
                :range="tasks"
                :style="{ width: '100%' }"
                label-key="title"
                value-key="id"
              ></mo-select>
            </div>
          </el-form-item>
          <el-form-item label="任务图标">
            <div class="mo-form-item">
              <mo-upload
                :value.sync="site.taskIcon"
                :action="$config.uploadUrl"
              ></mo-upload>
              <div>
                <el-button
                  size="small"
                  round
                  plain
                  type="danger"
                  :style="{ marginLeft: '10px' }"
                  @click="handleRemove(idx)"
                  >删除</el-button
                >
                <el-button
                  size="small"
                  round
                  plain
                  type="success"
                  @click="handleAdd"
                  >添加任务</el-button
                >
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>

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
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    tasks: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      visible: this.show,
      loading: false,
      task: {},
      placeList: []
    }
  },
  watch: {
    show(v) {
      this.visible = this.show
      if (v) {
        this.handleQuery()
      }
    }
  },
  mounted() {},
  methods: {
    handleAdd() {
      this.placeList.push({
        taskId: '',
        taskIcon: '',
        placeSort: this.placeList.length + 1
      })
    },
    handleQuery() {
      // 查询位置列表
      this.loading = true
      editPlaceIndex({
        placeId: 9
      }).then(res => {
        this.loading = false
        if (res && res.code === 0) {
          const data = res.data || []
          if (data.length > 0) {
            this.placeList = data
          } else {
            this.placeList = [{ taskId: '', taskIcon: '', placeSort: '' }]
          }
        }
      })
    },
    handleRemove(idx) {
      this.placeList.splice(idx, 1)
    },
    handleSave() {
      const tasks = []
      this.placeList.map(place => {
        if (place && place.taskId) {
          tasks.push({
            ...place,
            placeSort: tasks.length + 1
          })
        }
      })
      const params = {
        place: {
          placeId: 9
        },
        tasks
      }
      // 修改位置
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
