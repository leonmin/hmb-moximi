<template>
  <div class="page">
    <el-card>
      <mo-table
        v-loading="loading"
        element-loading-text="加载中"
        :options="table"
        :pagination="false"
      ></mo-table>
      <el-dialog :visible.sync="show" :title="pet.nickName || '魔宠'">
        <el-form ref="pet" :model="pet" :rules="rules" label-width="120px">
          <div class="mo-form">
            <el-form-item label="兑换消耗魔钻" prop="price">
              <el-input
                v-model="pet.price"
                placeholder="请输入兑换消耗魔钻数量"
              ></el-input>
            </el-form-item>
            <el-form-item label="产出速度/小时" prop="speed">
              <el-input
                v-model="pet.speed"
                placeholder="请输入产出速度"
              ></el-input>
            </el-form-item>
            <el-form-item label="有效期/小时" prop="effectTime">
              <el-input
                v-model="pet.effectTime"
                placeholder="请输入有效期"
              ></el-input>
            </el-form-item>
            <el-form-item label="最高拥有数/个" prop="limitNum">
              <el-input
                v-model="pet.limitNum"
                placeholder="请输入产出速度"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="mcMemo">
              <el-input
                v-model="pet.mcMemo"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 4 }"
                placeholder="请输入备注"
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
import { btn } from '@/config'
import { confMcList, editConfMc } from '@/api/mo-config'
import { isNNInt, isFloat } from '@/utils'
export default {
  props: {},
  data() {
    const vi = (r, v, callback) => {
      if (!isNNInt(v)) callback(new Error('格式错误'))
      callback()
    }
    const vf = (r, v, callback) => {
      if (!isFloat(v)) callback(new Error('格式错误'))
      callback()
    }
    return {
      show: false,
      loading: false,
      pet: {},
      query: {},
      table: {
        page: 1,
        total: 0,
        data: [],
        columns: [
          { prop: 'nickName', label: '魔宠名称', minWidth: 100 },
          { prop: 'price', label: '兑换消耗魔钻', minWidth: 100 },
          { prop: 'speed', label: '产出速度/小时', minWidth: 100 },
          { prop: 'effectTime', label: '有效期/小时', minWidth: 100 },
          { prop: 'limitNum', label: '最高拥有数', minWidth: 100 },
          { prop: 'mcMemo', label: '备注', minWidth: 100 },
          {
            prop: 'action',
            label: '操作',
            minWidth: 100,
            render: (h, { row }) => {
              return h('div', [
                btn(h, 'primary', '修改', () => this.handleEdit(row))
              ])
            }
          }
        ]
      },
      rules: {
        price: [
          { required: true, message: '不能为空' },
          { validator: vf, trigger: 'blur' }
        ],
        speed: [
          { required: true, message: '不能为空' },
          { validator: vf, trigger: 'blur' }
        ],
        effectTime: [
          { required: true, message: '不能为空' },
          { validator: vf, trigger: 'blur' }
        ],
        limitNum: [
          { required: true, message: '不能为空' },
          { validator: vi, trigger: 'blur' }
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
      confMcList().then(res => {
        this.loading = false
        if (res && res.code === 0) {
          const data = res.data || []
          this.table.data = data
        }
      })
    },
    handleEdit(row) {
      if (this.$refs.pet) {
        this.$refs.pet.resetFields()
      }
      this.show = true
      this.pet = {
        ...row
      }
    },
    handleSave() {
      this.$refs.pet.validate(pass => {
        if (pass) {
          editConfMc({ ...this.pet }).then(res => {
            this.show = false
            if (res && res.code === 0) {
              this.$message.success('修改成功')
              this.handleQuery()
            } else {
              // this.$message.error('修改异常')
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
