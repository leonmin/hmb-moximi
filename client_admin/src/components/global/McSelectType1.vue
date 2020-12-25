<template>
  <div :class="['mc-select-type', vertical ? 'mc-select-type-vertical' : '']">
    <div class="mc-select-type-line">
      <el-select
        :value="type"
        placeholder="请选择广告类型"
        @change="handleChange"
      >
        <el-option
          v-for="t in typeList"
          :key="t.taskId"
          :label="t.taskMemo"
          :value="t.taskId"
        />
      </el-select>
    </div>
    <div
      v-if="typeSubList && typeSubList.length > 0"
      class="mc-select-type-line"
    >
      <el-select :value="typeSub" @change="handleChangeChild">
        <el-option
          v-for="t in typeSubList"
          :key="t.taskId"
          :label="t.taskMemo"
          :value="t.taskId"
        />
      </el-select>
    </div>
  </div>
</template>
<script>
import { taskTypeList } from '@/api/mo-advert'
export default {
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      type: '',
      typeSub: '',
      typeList: [],
      typeSubList: []
    }
  },
  watch: {
    value(v) {
      this.handleLoad(v)
    }
  },
  mounted() {
    this.handleQueryType()
  },
  methods: {
    // 查询任务列表
    handleQueryType() {
      taskTypeList().then(res => {
        if (res && res.code === 0) {
          this.typeList = res.data || []
          this.typeSubList = []
          this.handleLoad(this.value)
        }
      })
    },
    // 刷新下拉选择
    handleLoad(v) {
      this.typeSubList = []
      if (v && this.typeList) {
        this.typeList.map(t => {
          if (t.children && t.children.length > 0) {
            t.children.map(tc => {
              if (tc.taskId === v) {
                this.typeSubList = t.children
                this.type = t.taskId
                this.typeSub = tc.taskId
              }
            })
          } else {
            if (t.taskId === v) {
              this.type = t.taskId
              this.typeSub = ''
            }
          }
        })
      } else {
        this.type = ''
        this.typeSub = ''
      }
    },
    // 修改一级任务
    handleChange(e) {
      if (this.typeList) {
        this.typeSub = ''
        this.typeSubList = []
        this.typeList.map(t => {
          if (t.taskId === e) {
            if (t.children && t.children.length > 0) {
              this.typeSubList = t.children
              this.typeSub = t.children[0].taskId
              this.$emit('update:value', t.children[0].taskId)
              this.$emit('on-change', t.children[0].taskId)
            } else {
              this.$emit('update:value', e)
              this.$emit('on-change', e)
            }
          }
        })
      }
    },
    // 修改二级任务
    handleChangeChild(e) {
      this.$emit('update:value', e)
      this.$emit('on-change', e)
    }
  }
}
</script>
<style lang="scss" scoped>
.mc-select-type {
  .el-select {
    width: 100%;
  }
  .mc-select-type-line + .mc-select-type-line {
    margin-top: 11px;
  }
}
.mc-select-type-vertical {
  display: flex;
  align-items: center;
  .mc-select-type-line {
    width: 150px;
  }
  .mc-select-type-line + .mc-select-type-line {
    margin: 0 0 0 5px;
  }
}
</style>
