<template>
  <el-select
    :value="currentValue"
    :disabled="disabled"
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
</template>
<script>
import { taskTypeList } from '@/api/mo-advert'
export default {
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      typeList: []
    }
  },
  computed: {
    currentValue() {
      return this.value
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
        }
      })
    },
    handleChange(e) {
      this.$emit('update:value', e)
      this.$emit('on-change', e)
    }
  }
}
</script>
<style lang="scss" scoped></style>
