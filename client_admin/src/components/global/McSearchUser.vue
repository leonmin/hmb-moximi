<template>
  <div class="mo-search">
    <el-form ref="query" :model="query" :inline="true" size="mini">
      <el-form-item label="ID">
        <el-input
          v-model="query.userId"
          placeholder="请输入用户ID"
          :style="{ width: '120px' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          v-model="query.mobile"
          placeholder="请输入用户手机"
          :style="{ width: '120px' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="推荐好友手机号">
        <el-input
          v-model="query.friendMobile"
          placeholder="请输入推荐好友手机号"
          :style="{ width: '120px' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="来源渠道">
        <el-select
          v-model="query.fromChannel"
          clearable
          :style="{ width: '150px' }"
        >
          <el-option
            v-for="(r, idx) in channelList"
            :key="idx"
            :label="r.channelName"
            :value="r.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" round @click="handleQuery">查询</el-button>
        <el-button round @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { launchChannelList } from '@/api/mo-release'
export default {
  props: {
    query: {
      type: Object,
      default: () => ({
        begin: null,
        end: null
      })
    },
    dateSuffix: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      channelList: []
    }
  },

  mounted() {
    this.handleFindChannel()
  },
  methods: {
    handleQuery() {
      this.$emit('on-query')
    },
    handleReset() {
      Object.keys(this.query).map(key => {
        this.query[key] = null
      })
      this.handleQuery()
    },

    handleFindChannel() {
      launchChannelList().then(res => {
        if (res && res.code === 0) {
          const data = res.data || []
          this.channelList = data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.mo-search {
  .el-form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .el-form-item {
      margin-bottom: 0;
      display: flex;
      padding: 10px 0;
    }
  }
}
</style>
