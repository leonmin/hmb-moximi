<template>
  <!-- 金刚位 -->
  <el-dialog
    :visible.sync="visible"
    top="20px"
    :title="title"
    @close="$emit('update:show', false)"
  >
    <div v-loading="loading" element-loading-text="加载中" class="mo-task">
      <div v-for="(site, idx) in placeList" :key="idx" class="mo-task-item">
        <el-form label-width="100px">
          <el-form-item :label="'位置' + (idx + 1) + '-任务ID'">
            <mo-select
              :value.sync="site.taskId"
              :range="tasks"
              :style="{ width: '100%' }"
              label-key="title"
              value-key="id"
            ></mo-select>
          </el-form-item>
          <el-form-item label="任务图标">
            <mo-upload
              :value.sync="site.taskIcon"
              :action="$config.uploadUrl"
            ></mo-upload>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <span slot="footer">
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
    },
    title: {
      type: String,
      default: ''
    },
    placeId: {
      type: [String, Number],
      default: ''
    },
    count: {
      type: Number,
      default: 2
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
    handleQuery() {
      // 查询位置列表
      this.loading = true
      editPlaceIndex({
        placeId: this.placeId
      }).then(res => {
        this.loading = false
        if (res && res.code === 0) {
          const data = res.data || []
          this.placeList = []
          for (let i = 1; i < this.count + 1; i++) {
            if (data.some(d => d.placeSort === i)) {
              data.map(d => {
                if (d.placeSort === i) {
                  this.placeList.push(d)
                }
              })
            } else {
              this.placeList.push({
                taskId: '',
                taskIcon: ''
              })
            }
          }
        }
      })
    },
    handleSave() {
      const tasks = []
      this.placeList.map((s, idx) => {
        if (s.taskId) {
          tasks.push({
            ...s,
            placeSort: idx + 1
          })
        }
      })
      const params = {
        place: {
          placeId: this.placeId
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
