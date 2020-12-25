<template>
  <div class="page">
    <el-card>
      <mo-table
        v-loading="loading"
        element-loading-text="加载中"
        :options="table"
        :pagination="false"
      />
      <el-dialog
        :visible.sync="show"
        :title="notice.placeStr || '修改公告'"
        @close="show = false"
      >
        <el-form
          ref="notice"
          label-width="100px"
          :model="notice"
          :rules="rules"
        >
          <div class="mo-form">
            <el-form-item label="公告内容" prop="content">
              <el-input
                v-model="notice.content"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6 }"
                placeholder="请输入公告内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="跳转链接" prop="jumpUrl">
              <el-input
                v-model="notice.jumpUrl"
                placeholder="请输入跳转链接"
              ></el-input>
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
import {
  topNoticeList,
  editTopNotice,
  editTopNoticeStatus
} from '@/api/mo-config'
import { btn } from '@/config'

export default {
  props: {},
  data() {
    return {
      show: false,
      loading: false,
      notice: {},
      table: {
        data: [],
        columns: [
          {
            prop: 'placeStr',
            label: '公告位置',
            minWidth: 100
          },
          {
            prop: 'content',
            label: '公告内容',
            minWidth: 100
          },
          {
            prop: 'jumpUrl',
            label: 'URL',
            minWidth: 100
          },
          {
            prop: '',
            label: '操作',
            minWidth: 100,
            render: (h, { row }) => {
              const status = row.noticeStatus === 1
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
        content: [
          { required: true, message: '请输入公告内容', trigger: 'blur' }
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
      topNoticeList().then(res => {
        this.loading = false
        if (res && res.code === 0) {
          this.table.data = res.data || []
        }
      })
    },
    handleEdit(row) {
      if (this.$refs.notice) {
        this.$refs.notice.resetFields()
      }
      this.notice = { ...row }
      this.show = true
    },
    handleChangeStatus(row) {
      if (row && row.id) {
        editTopNoticeStatus({
          noticeId: row.id
        }).then(res => {
          if (res && res.code === 0) {
            this.handleQuery()
            this.$message.success(
              row.noticeStatus === 1 ? '下架成功' : '上架成功'
            )
          } else {
            this.$message.error(res.msg || '操作失败')
          }
        })
      }
    },
    handleSave() {
      this.$refs.notice.validate(pass => {
        if (pass) {
          editTopNotice({
            ...this.notice
          }).then(res => {
            this.show = false
            if (res && res.code === 0) {
              this.$message.success('修改成功')
              this.handleQuery()
            } else {
              this.$message.error(res.msg || '修改失败')
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
