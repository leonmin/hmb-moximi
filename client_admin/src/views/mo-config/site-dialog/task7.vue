<template>
  <el-dialog
    :visible.sync="visible"
    class="mp-achieve-diag"
    width="75%"
    top="20px"
    title="成就任务"
    @close="$emit('update:show', false)"
  >
    <div class="mp-achieve">
      <div
        v-for="(achieve, idx) in achieveList"
        :key="idx"
        class="mp-achieve-item"
      >
        <el-form label-width="150px">
          <el-form-item
            class="mp-achieve-label"
            :label="achieve.levelStr || '等级' + (idx + 1)"
          ></el-form-item>
          <el-form-item label="魔小秘累计接听时长">
            <el-input
              v-model="achieve.totalCalls"
              placeholder="接听时长"
            ></el-input>
          </el-form-item>
          <el-form-item label="累计看视频广告次数">
            <el-input
              v-model="achieve.totalAdLookNum"
              placeholder="看广告次数 "
            ></el-input>
          </el-form-item>
          <el-form-item label="累计微信阅读次数">
            <el-input
              v-model="achieve.totalReadNum"
              placeholder="微信阅读次数"
            ></el-input>
          </el-form-item>
          <el-form-item label="累计游戏试玩次数">
            <el-input
              v-model="achieve.totalPlayNum"
              placeholder="游戏试玩次数"
            ></el-input>
          </el-form-item>
          <el-form-item :label="'获取' + (achieve.mcStr || '')"></el-form-item>
          <el-form-item label="奖励类型">
            <mo-select
              :value.sync="achieve.awardType"
              :range="awardList"
            ></mo-select>
          </el-form-item>
          <el-form-item label="奖励数量">
            <el-input
              v-model="achieve.awardNum"
              placeholder="奖励数量"
            ></el-input>
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
import { editAchievementIndex, editPlace } from '@/api/mo-config'
import { awardTypeList } from '@/config'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      visible: this.show,
      awardList: awardTypeList || [],
      achieveList: Array.from({ length: 7 }, _ => ({}))
    }
  },
  watch: {
    show(v) {
      this.visible = this.show
      if (v) {
        this.achieveList = Array.from({ length: 7 }, _ => ({}))
        this.handleQuery()
      }
    }
  },
  mounted() {},
  methods: {
    handleQuery() {
      editAchievementIndex({
        placeId: 7
      }).then(res => {
        if (res && res.code === 0) {
          const data = res.data || []
          this.achieveList = data
        }
      })
    },
    handleSave() {
      const achievements = this.achieveList.filter(s => s.id)
      const params = {
        place: {
          placeId: 7
        },
        achievements
      }
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
.mp-achieve-diag {
  ::v-deep.el-dialog {
    min-width: 1000px;
  }
  ::v-deep.el-dialog__body {
    padding-top: 0;
  }
}
.mp-achieve {
  display: flex;
  flex-wrap: wrap;
  .mp-achieve-item {
    width: 33.33%;
    margin-bottom: 20px;

    .el-form-item {
      margin-bottom: 0px;
    }
    .el-input,
    .mo-select {
      width: 120px;
    }
  }
  .mp-achieve-label {
    ::v-deep.el-form-item__label {
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
