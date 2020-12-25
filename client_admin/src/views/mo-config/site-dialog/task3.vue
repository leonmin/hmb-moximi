<template>
  <!-- 签到任务 -->
  <el-dialog
    :visible.sync="visible"
    class="mp-signin-diag"
    top="20px"
    width="60%"
    :title="title"
    @close="$emit('update:show', false)"
  >
    <div v-loading="loading" element-loading-text="加载中">
      <div class="mp-signin">
        <div
          v-for="(place, idx) in placeList"
          :key="idx"
          class="mp-signin-item"
        >
          <el-form label-width="100px">
            <el-form-item
              :label="'Day' + (place.day || idx + 1)"
            ></el-form-item>
            <el-form-item label="奖励类型">
              <mo-select
                :value.sync="place.awardType"
                :range="awardList"
              ></mo-select>
            </el-form-item>
            <el-form-item label="奖励数量">
              <el-input
                v-model="place.awardNum"
                placeholder="奖励数量"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <span slot="footer">
      <el-button round @click="$emit('update:show', false)">取消</el-button>
      <el-button type="primary" round @click="handleSave">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { awardTypeList } from '@/config'

import { editSignInIndex, editPlace } from '@/api/mo-config'
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
      default: '签到任务'
    },
    placeId: {
      type: [String, Number],
      default: ''
    },
    count: {
      type: Number,
      default: 30
    }
  },

  data() {
    return {
      visible: this.show,
      loading: false,
      task: {},
      placeList: Array.from({ length: 30 }, _ => ({})),
      awardList: awardTypeList || []
    }
  },
  watch: {
    show(v) {
      this.visible = this.show
      if (v) {
        this.placeList = Array.from({ length: 30 }, _ => ({}))
        this.handleQuery()
      }
    }
  },
  mounted() {},
  methods: {
    handleQuery() {
      // 查询位置列表
      this.loading = true
      editSignInIndex({
        placeId: 12
      }).then(res => {
        this.loading = false
        if (res && res.code === 0) {
          const data = res.data || []
          this.placeList = data
        }
      })
    },
    handleSave() {
      const signs = [...this.placeList]
      signs.map(s => {
        if (!s.awardType) {
          s.awardNum = ''
        }
      })
      const params = {
        place: {
          placeId: 12
        },
        signs
      }
      console.log('params', params)
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
<style lang="scss" scoped>
.mp-signin-diag {
  ::v-deep.el-dialog {
    min-width: 760px;
  }
  ::v-deep.el-dialog__body {
    padding-top: 0;
  }
}
.mp-signin {
  display: flex;
  flex-wrap: wrap;
  .mp-signin-item {
    width: 33.33%;
    margin-bottom: 0;
    .el-form-item {
      margin-bottom: 0;
    }
    .el-input,
    .mo-select {
      width: 120px;
    }
  }
}
</style>
