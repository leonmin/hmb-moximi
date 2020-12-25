<template>
  <div class="mo-select">
    <el-select
      :size="size"
      :value="currentValue"
      :value-label="currentLabel"
      :disabled="disabled"
      :multiple="multiple"
      :clearable="clearable"
      :placeholder="placeholder"
      @change="handleChange"
      @clear="handleClear"
    >
      <el-option
        v-for="r in range"
        :key="r[valueKey]"
        :label="r[labelKey]"
        :value="r[valueKey]"
      />
    </el-select>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    valueLabel: {
      type: [String, Number, Boolean],
      default: ''
    },
    labeled: {
      type: Boolean,
      default: false
    },
    range: {
      type: Array,
      default: () => []
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    multiple: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    size: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  computed: {
    currentValue() {
      return this.value
    },
    currentLabel() {
      return this.valueLabel
    }
  },
  methods: {
    handleChange(e) {
      this.$emit('update:value', e)
      this.$emit('on-change', e)
      if (this.labeled && this.range && this.range.length > 0) {
        this.range.map(r => {
          if (r[this.valueKey] === e) {
            this.$emit('update:value-label', r[this.labelKey])
          }
        })
      }
    },
    handleClear() {
      this.$emit('update:value', null)
      this.$emit('on-change', null)
      if (this.labeled && this.range && this.range.length > 0) {
        this.$emit('update:value-label', null)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.mo-select {
  display: inline-block;
  .el-select {
    width: 100%;
  }
}
</style>
