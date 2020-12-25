<template>
  <div class="page">
    <el-card>
      <div class="mo-table-desc">
        <div class="mo-table-lead">广告主数据</div>
        <div class="mo-table-more">
          <el-button type="primary" round size="mini" @click="handleAdAdd"
            >添加广告主</el-button
          >
        </div>
      </div>
      <mo-table
        v-loading="loading"
        element-loading-text="加载中"
        :options="table"
        :pagination="false"
      />
    </el-card>
    <el-dialog :visible.sync="show" title="添加广告主" @close="handleAdClose">
      <el-form
        ref="advertiser"
        :model="advertiser"
        :rules="rules"
        label-width="100px"
      >
        <div class="mo-form">
          <el-form-item label="广告类型:" prop="adType">
            <mc-select-type
              disabled
              :value.sync="advertiser.adType"
            ></mc-select-type>
          </el-form-item>
          <el-form-item label="广告主名称:" prop="advertName">
            <el-input
              v-model="advertiser.advertName"
              placeholder="请输入广告主名称"
              @input="handleInput('advertName')"
            ></el-input>
          </el-form-item>
          <el-form-item label="链接地址:" prop="addressUrl">
            <el-input
              v-model="advertiser.addressUrl"
              placeholder="请输入链接地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注:" prop="memo">
            <el-input
              v-model="advertiser.memo"
              type="textarea"
              maxlength="300"
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer">
        <el-button round @click="show = false">取消</el-button>
        <el-button type="primary" round @click="handleAdSave">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  advertisersList,
  taskTypeList,
  addOrEditAdvert,
  updateAdvertStatus
} from '@/api/mo-advert'
import { btn } from '@/config'
export default {
  props: {},
  data() {
    return {
      type: '',
      loading: false,
      show: false,
      showType: '0', // 0 新增 1 编辑
      advertiser: {
        adType: null
      },
      adTypeList: [],
      table: {
        data: [],
        columns: [
          { prop: 'adTypeStr', label: '广告类型', minWidth: 100 },
          { prop: 'advertName', label: '广告主', minWidth: 100 },
          { prop: 'addressUrl', label: '链接地址', minWidth: 100 },
          { prop: 'memo', label: '备注', minWidth: 100 },
          {
            prop: '',
            label: '操作',
            minWidth: 100,
            render: (h, { row }) => {
              const status = row.advertStatus === 1
              return h('div', [
                btn(h, 'primary', '修改', () => this.handleEdit(row)),
                btn(
                  h,
                  status ? 'warning' : 'success',
                  status ? '下架' : '上架',
                  () => this.handleUpdateStatus(row)
                )
              ])
            }
          }
        ]
      },
      rules: {
        adType: [
          { required: true, message: '请选择广告类型', trigger: 'change' }
        ],
        advertName: [
          { required: true, message: '请输入广告主名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.handleQuery()
    this.handleQueryList()
  },
  methods: {
    handleQuery() {
      this.loading = true
      advertisersList().then(res => {
        this.loading = false
        if (res && res.code === 0) {
          this.table.data = res.data || []
        }
      })
    },
    handleQueryList() {
      taskTypeList().then(res => {
        if (res && res.code === 0) {
          this.adTypeList = res.data || []
        }
      })
    },
    // 关闭对话框
    handleAdClose() {
      this.show = false
      this.handleAdReset()
    },
    // 重置表单
    handleAdReset() {
      this.advertiser = {}
      if (this.$refs.advertiser) {
        this.$refs.advertiser.resetFields()
      }
    },
    handleAdAdd() {
      this.handleAdReset()
      this.show = true
      this.showType = '0'
    },
    handleEdit(row) {
      this.handleAdReset()
      this.advertiser = { ...row }
      this.show = true
      this.showType = '1'
    },
    handleAdShow(type) {
      this.show = true
      this.showType = type
    },
    handleAdSave() {
      this.$refs.advertiser.validate(pass => {
        if (pass) {
          addOrEditAdvert({
            ...this.advertiser
          }).then(res => {
            this.show = false
            if (res && res.code === 0) {
              this.handleQuery()
              this.$message.success(
                this.showType === '0' ? '新增成功' : '修改成功'
              )
            } else {
              this.$message.error(res.msg || '操作失败')
            }
          })
        }
      })
    },
    handleInput(prop) {
      this.$refs.advertiser.clearValidate(prop)
    },
    handleUpdateStatus(row) {
      if (row && row.id) {
        updateAdvertStatus({
          advertId: row.id
        }).then(res => {
          if (res && res.code === 0) {
            this.$message.success(
              String(row.advertStatus) === '1' ? '下架成功' : '上架成功'
            )
            this.handleQuery()
          } else {
            this.$message.error(res.msg || '操作失败')
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
