<template>
  <div class="page">
    <el-card :style="{ marginBottom: '10px' }">
      <div class="mo-table-desc">
        <div class="mo-table-lead">常规提现最低金额</div>
        <div class="mo-table-more"></div>
      </div>
      <el-form
        v-loading="loading"
        element-loading-text="加载中"
        label-width="100px"
      >
        <el-form-item label="金额" :style="{ width: '400px' }">
          <div class="mo-form-item">
            <el-input
              v-model="lowestAmount"
              size="middle"
              placeholder="请输入常规提现最低金额"
              ><template slot="append"
                >元</template
              ></el-input
            >
            <el-button
              type="primary"
              size="mini"
              round
              :style="{ marginLeft: '20px' }"
              @click="handleSaveAmount"
              >确定</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div class="withdraw">
        <div class="mo-table-desc">
          <div class="mo-table-lead">提现手续费</div>
          <div class="mo-table-more">
            <el-button
              v-if="serviceList && serviceList.length === 0"
              type="primary"
              round
              size="mini"
              @click="handleAdd"
              >新增</el-button
            >
          </div>
        </div>
        <el-form
          v-loading="loading"
          element-loading-text="加载中"
          label-width="120px"
        >
          <el-form-item
            v-for="(m, idx) in serviceList"
            :key="idx"
            label="直推有效用户数:"
          >
            <div class="mo-form-item">
              <el-input
                v-model="m.totalInvite"
                placeholder="有效用户数"
                :style="{ width: '100px' }"
              ></el-input>
              <div class="text">手续费:</div>
              <el-input
                v-model="m.cashServiceCharge"
                :style="{ width: '155px' }"
                placeholder="手续费"
                ><template slot="append"
                  >%</template
                ></el-input
              >
              <el-button
                type="danger"
                size="mini"
                plain
                round
                :style="{ marginLeft: '20px' }"
                @click="handleRemove(idx)"
                >删除</el-button
              >
              <el-button
                type="success"
                size="mini"
                plain
                round
                @click="handleAdd"
                >新增</el-button
              >
            </div>
          </el-form-item>
          <el-form-item>
            <div class="mo-form-item" :style="{ paddingLeft: '386px' }">
              <el-button
                type="primary"
                size="mini"
                round
                :style="{ marginLeft: '20px' }"
                @click="handleSaveCharge()"
                >确定</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  cashConfIndex,
  editCashLowest,
  addOrEditService
} from '@/api/mo-config'
import { isFloat } from '@/utils'
export default {
  props: {},
  data() {
    return {
      loading: false,
      lowestAmount: '',
      serviceList: []
    }
  },
  mounted() {
    this.handleQuery()
  },
  methods: {
    handleAdd() {
      this.serviceList.push({
        totalInvite: 0,
        cashServiceCharge: 0
      })
    },
    handleSaveAmount() {
      if (!isFloat(this.lowestAmount)) {
        this.$message.error('金额格式错误')
        return
      }
      editCashLowest({
        configValue: this.lowestAmount
      }).then(res => {
        if (res && res.code === 0) {
          this.$message.success('保存成功')
          this.handleQuery()
        }
      })
    },
    handleRemove(index) {
      if (this.serviceList && this.serviceList.length > 0) {
        this.serviceList.splice(index, 1)
      }
    },
    handleSaveCharge(row) {
      addOrEditService({
        charges: this.serviceList
      }).then(res => {
        if (res && res.code === 0) {
          this.$message.success('保存成功')
          this.handleQuery()
        }
      })
    },
    handleQuery() {
      this.loading = true
      cashConfIndex().then(res => {
        this.loading = false
        if (res && res.code === 0) {
          const { lowestAmount = 0, serviceList = [] } = res.data || {}
          this.lowestAmount = lowestAmount
          if (serviceList.length > 0) {
            this.serviceList = serviceList
          } else {
            this.serviceList = [{ totalInvite: 0, cashServiceCharge: 0 }]
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.withdraw {
  // width: 50%;
  // min-width: 500px;
  // max-width: 600px;
  .split {
    width: 15px;
    height: 2px;
    background: #ccc;
    margin: 0 10px;
  }
  .text {
    margin: 0 8px 0 10px;
  }
}
</style>
