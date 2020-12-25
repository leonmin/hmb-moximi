<template>
  <div class="page">
    <el-card>
      <div class="mo-table-desc">
        <div class="mo-table-lead">投放渠道数据</div>
        <div class="mo-table-more">
          <el-button type="primary" round size="mini" @click="handleAdd"
            >添加渠道</el-button
          >
        </div>
      </div>
      <mo-table
        v-loading="loading"
        element-loading-text="加载中"
        :options="table"
        :pagination="false"
      ></mo-table>
      <el-dialog :visible.sync="show" title="添加渠道">
        <el-form
          ref="channel"
          :model="channel"
          :rules="rules"
          label-width="100px"
        >
          <div class="mo-form">
            <el-form-item label="渠道名称:" prop="channelName">
              <el-input
                v-model="channel.channelName"
                placeholder="请输入渠道名称"
                @input="handleInput('channelName')"
              ></el-input>
            </el-form-item>
            <el-form-item label="渠道类型:" prop="channelType">
              <el-input
                v-model="channel.channelType"
                placeholder="请输入渠道类型"
              ></el-input>
            </el-form-item>
            <el-form-item label="广告类型:" prop="adType">
              <el-input
                v-model="channel.adType"
                placeholder="请输入广告类型"
              ></el-input>
            </el-form-item>
            <el-form-item label="结算方式:" prop="settleWay">
              <el-input
                v-model="channel.settleWay"
                placeholder="请输入结算方式"
              ></el-input>
            </el-form-item>
            <el-form-item label="结算单价:" prop="settlePrice">
              <el-input
                v-model="channel.settlePrice"
                placeholder="请输入结算单价"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注:" prop="url">
              <el-input
                v-model="channel.url"
                placeholder="请输入备注"
              ></el-input>
            </el-form-item>
            <el-form-item label="URL:" prop="memo">
              <el-input v-model="channel.memo" placeholder="请输入URL"
                ><el-button slot="append" type="primary"
                  >复制</el-button
                ></el-input
              >
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer">
          <el-button round @click="show = false">取消</el-button>
          <el-button type="primary" round @click="handleSave">确定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { btn } from '@/config'
import {
  launchChannelList,
  addOrEditLaunchChannel,
  editLaunchChannelStatus
} from '@/api/mo-release'
export default {
  props: {},
  data() {
    return {
      show: false,
      loading: false,
      channel: {},
      table: {
        data: [],
        columns: [
          { prop: 'channelName', label: '渠道名称', minWidth: 100 },
          { prop: 'channelType', label: '渠道类型', minWidth: 100 },
          { prop: 'adType', label: '广告类型', minWidth: 100 },
          { prop: 'settleWay', label: '结算方式', minWidth: 100 },
          { prop: 'settlePrice', label: '结算单价', minWidth: 100 },
          { prop: 'url', label: 'URL', minWidth: 100 },
          { prop: 'memo', label: '备注', minWidth: 100 },
          {
            prop: 'action',
            label: '操作',
            minWidth: 120,
            render: (h, { row }) => {
              const status = row.channelStatus === 1
              return h('div', [
                btn(h, 'primary', '修改', () => this.handleEdit(row)),
                btn(
                  h,
                  status ? 'warning' : 'success',
                  status ? '下架' : '上架',
                  () => this.handleChangeStatus(row)
                )
              ])
            }
          }
        ]
      },
      rules: {
        channelName: [
          { required: true, message: '请输入渠道名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.handleQuery()
  },
  methods: {
    handleQuery() {
      this.loading = true
      launchChannelList().then(res => {
        this.loading = false
        if (res && res.code === 0) {
          const data = res.data || []
          this.table.data = data
        }
      })
    },
    // 清除错误
    handleInput(prop) {
      this.$refs.channel.clearValidate(prop)
    },
    // 重置表单
    handleReset() {
      this.channel = {}
      if (this.$refs.channel) {
        this.$refs.channel.resetFields()
      }
    },
    // 新增
    handleAdd() {
      this.handleReset()
      this.show = true
    },
    // 编辑
    handleEdit(row) {
      this.handleReset()
      this.channel = { ...row }
      this.show = true
    },
    // 保存
    handleSave() {
      this.$refs.channel.validate(pass => {
        if (pass) {
          addOrEditLaunchChannel({ ...this.channel }).then(res => {
            this.show = false
            if (res && res.code === 0) {
              this.$message.success('保存成功')
              this.handleQuery()
            }
          })
        }
      })
    },
    // 上下架
    handleChangeStatus(row) {
      if (row && row.id) {
        editLaunchChannelStatus({
          channelId: row.id
        }).then(res => {
          if (res && res.code === 0) {
            this.$message.success('操作成功')
            this.handleQuery()
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
