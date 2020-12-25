<template>
  <div class="mo-upload">
    <el-upload
      class="mo-upload-main"
      :style="{ width: width, height: height || width }"
      :action="action"
      :headers="headers"
      :show-file-list="showFileList"
      :on-success="handleSuccess"
      :before-upload="handleBeforeUpload"
    >
      <img v-if="currentValue" :src="currentValue" class="mo-upload-img" />
      <i v-else class="el-icon-plus mo-upload-icon" />
    </el-upload>
    <div v-if="tips" class="mo-upload-tips">{{ tips }}</div>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
export default {
  props: {
    value: {
      type: String,
      default: null
    },
    action: {
      type: String,
      required: true,
      default: ''
    },
    tips: {
      type: String,
      default: ''
    },
    showFileList: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: ''
    },
    maxSize: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      // currentValue: '',
      headers: {
        'X-Mxm-Token': getToken()
      }
    }
  },

  computed: {
    currentValue: {
      get: function() {
        return this.value
      },
      set: function(val) {
        this.$emit('update:value', val)
      }
    }
  },
  methods: {
    handleSuccess(e) {
      if (e && e.data && e.data.url) {
        this.$emit('update:value', e.data.url)
        this.currentValue = e.data.url
      }
    },

    handleBeforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLtMax = file.size / 1024 / 1024 < (this.maxSize || 2)

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG或PNG 格式!')
      }
      if (!isLtMax) {
        this.$message.error(`上传图片大小不能超过 ${this.maxSize || 2}MB!`)
      }
      return (isJPG || isPNG) && isLtMax
    }
  }
}
</script>
<style lang="scss">
.mo-upload {
  .el-upload {
    width: 100%;
    height: 100%;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      border-color: #409eff;
      .mo-upload-icon {
        color: #409eff;
      }
    }
  }
  .mo-upload-img {
    width: 100%;
    display: flex;
  }
  .mo-upload-icon {
    font-size: 28px;
    color: #8c939d;
  }
  .mo-upload-tips {
    color: #606266;
    font-size: 12px;
    padding: 10px 0;
  }
}
</style>
