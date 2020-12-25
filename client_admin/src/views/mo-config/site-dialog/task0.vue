<template>
  <!-- 开宝箱-任务中心页面 -->
  <!-- 开宝箱-我的会员页面 -->
  <!-- 百宝阁 -->
  <el-dialog
    :visible.sync="visible"
    :title="title"
    @close="$emit('update:show', false)"
  >
    <el-form label-width="120px">
      <div class="mo-form">
        <el-form-item label="宝箱奖励类型">
          <mo-select
            :value.sync="box.awardId"
            :range="awardList"
            :style="{ width: '100%' }"
          ></mo-select>
        </el-form-item>
        <el-form-item label="奖励数量">
          <el-input
            v-model="box.awardNum"
            placeholder="请输入奖励数量"
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
            </div>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <span slot="footer">
      <el-button round @click="$emit('update:show', false)">取消</el-button>
      <el-button type="primary" round @click="handleSave">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { editPlaceIndex, taskList, editPlace } from '@/api/mo-config'
import { awardTypeList } from '@/config'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    placeId: {
      type: [String, Number],
      default: ''
    },
    place: {
      type: Object,
      default: () => ({})
    },
    count: {
      type: Number,
      default: 3
    }
  },

  data() {
    return {
      visible: this.show,
      box: {},
      placeList: [],
      tasks: [],
      awardList: awardTypeList || []
    }
  },
  watch: {
    show(v) {
      this.visible = this.show
      if (v) {
        this.box = {
          ...this.place
        }
        this.placeList = Array.from({ length: 3 }, (_, idx) => ({
          taskId: '',
          placeSort: ''
        }))
        this.handleQuery()
      }
    }
  },
  mounted() {},
  methods: {
    handleQuery() {
      // 查询任务列表
      taskList().then(res => {
        if (res && res.code === 0) {
          this.tasks = res.data || []
        }
      })
      editPlaceIndex({
        placeId: this.placeId
      }).then(res => {
        if (res && res.code === 0) {
          const data = res.data || []
          const rd = data.concat(
            Array.from({ length: this.count - data.length }, (_, idx) => ({
              taskId: '',
              placeSort: ''
            }))
          )
          this.placeList = rd
          // // data.map((d, idx) => {
          // //   this.placeList[idx] = {
          // //     ...this.placeList[idx],
          // //     ...d
          // //   }
          // // })
          // this.$nextTick(() => {
          //   this.placeList = data
          // })
          // this.$forceUpdate()
        }
      })
    },
    handleSave() {
      const tasks = this.placeList.filter(s => s.taskId)
      const params = {
        place: {
          placeId: this.placeId,
          ...this.box
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
