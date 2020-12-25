<template>
  <el-select
    :value="currentValue"
    :style="{ width: '100%' }"
    placeholder="请选择奖励类型"
    @change="handleChange"
  >
    <el-option
      v-for="a in awardList"
      :key="a.value"
      :label="a.label"
      :value="a.value"
    ></el-option>
  </el-select>
</template>
<script>
import { awardTypes } from '@/config'
import { awardTypeList } from '@/api/mo-config'
export default {
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    }
  },
  data() {
    return {
      awardList: []
    }
  },
  computed: {
    currentValue() {
      return this.value
    }
  },
  mounted() {
    this.handleQuery()
  },

  methods: {
    handleQuery() {
      awardTypeList().then(res => {
        if (res && res.code === 0) {
          this.awardList = []
          const data = res.data || []
          data.map((r, idx) => {
            this.awardList.push({
              label: awardTypes[r],
              value: idx + 1
            })
          })
        }
      })
    },
    handleChange(e) {
      this.$emit('update:value', e)
    }
  }
}
</script>
<style lang="scss" scoped></style>
