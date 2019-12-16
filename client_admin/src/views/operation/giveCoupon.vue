<template>
  <div>
    <el-dialog
      title="赠送优惠券"
      width="1000px"
      height="600px"
      top="50px"
      :visible.sync="visible"
      :show="show"
      @open="openDialog"
      @close="$emit('update:show',false)"
    >
      <div v-loading="loading">
        <div class="bigBox">
          <el-input v-model="searchData.searchKey" placeholder="输入优惠卷编号\名称" clearable class="input" @input="loadList()" />
          <!--表格部分-->
          <el-table ref="multipleTable" v-loading="loading" :row-key="getRowKeys" :data="tableData" tooltip-effect="dark" class="table" :height="550" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" :reserve-selection="true" />
            <el-table-column prop="id" label="优惠卷编号" show-overflow-tooltip min-width="120" />
            <el-table-column prop="couponTitle" label="优惠卷名称" show-overflow-tooltip min-width="120" />
            <el-table-column prop="couponDiscount" label="折扣数" show-overflow-tooltip min-width="120">
              <template v-slot="scope">
                {{ scope.row.couponDiscount | couponDiscount }}
              </template>
            </el-table-column>
            <el-table-column prop="couponType" label="适用范围" show-overflow-tooltip min-width="120">
              <template v-slot="scope">
                <span>{{ scope.row.couponType | couponType }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="validity" label="有效期" show-overflow-tooltip min-width="150" />
          </el-table>
          <!--分页-->
          <el-pagination
            style="float: right;margin-top: 20px;"
            :current-page="searchData.pageNum"
            :page-size="searchData.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <el-button type="primary" style="margin-left: 20px" :loading="btnLoading" @click="sure()">确认</el-button>
        <el-button type="info" @click="cancel()">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { couponList, sendCoupons } from '@/api/couponOperation'
export default {
  filters: {
    /* 折扣*/
    couponDiscount: function(data) {
      data = data.toString()
      return data.substring(0, 1) + '.' + data.substring(1) + '折'
    },
    /* 适用范围*/
    couponType: function(data) {
      if (data === 0 || data === '0') {
        return '月卡'
      } else if (data === 1 || data === '1') {
        return '季卡'
      } else if (data === 2 || data === '2') {
        return '年卡'
      }
    }
  },
  props: ['show', 'row'],
  data() {
    return {
      visible: this.show,
      loading: false,
      tableData: [],
      input: '',
      fullHeight: document.documentElement.clientHeight, // 页面高度
      multipleSelection: [], // 表格选中的数据
      checkAll: false, // 底部全选
      searchData: { // 筛选的数据
        pageNum: 1,
        pageSize: 10,
        searchKey: '' // 关键字
      },
      total: null,
      btnLoading: false,
      // 获取row的key值
      getRowKeys(row) {
        return row.id
      },
      isPaging: false // 是否是分页
    }
  },
  watch: {
    show() {
      this.visible = this.show
    },
    fullHeight(val) {
      if (!this.timer) {
        this.fullHeight = val
        this.timer = true
        const that = this
        setTimeout(function() {
          that.timer = false
        }, 400)
      }
    }
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight
        that.fullHeight = window.fullHeight
      })()
    }
  },
  methods: {
    // 取消
    cancel() {
      this.visible = false
    },
    // 当前页码
    handleSizeChange(val) {
      this.searchData.pageSize = val
      this.loadList()
    },
    // 当前页数
    handleCurrentChange(val) {
      this.isPaging = true
      this.searchData.pageNum = val
      this.loadList()
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 表格选中
    handleSelectionChange(val) {
      const vlength = val.length
      this.multipleSelection = val
      this.checkAll = vlength === this.searchData.pageSize
    },
    // 确定
    sure() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('确认赠送, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.btnLoading = true
          const data = {
            couponIds: [],
            userId: this.row.id
          }
          for (let i = 0; i < this.multipleSelection.length; i++) {
            data.couponIds.push(this.multipleSelection[i].id)
          }
          sendCoupons(data).then(res => {
            if (res.code === 0 || res.code === '0') {
              this.btnLoading = false
              this.$message.success(res.msg)
              this.visible = false
              this.$emit('success')
            }
          })
        }).catch(() => {
        })
      } else {
        this.$message.error('请先选择优惠券')
      }
    },
    openDialog() {
      this.searchData = { // 筛选的数据
        pageNum: 1,
        pageSize: 10,
        searchKey: '' // 关键字
      }
      this.loadList()
      if (this.multipleSelection.length > 0) {
        this.$refs.multipleTable.clearSelection()
      }
    },
    loadList() {
      this.loading = true
      if (!this.isPaging) {
        this.searchData.pageNum = 1
      }
      couponList(this.searchData).then(res => {
        if (res.code === 0 || res.code === '0') {
          this.total = res.data.total
          this.tableData = res.data.records
          this.isPaging = false
          this.loading = false
        }
      })
    }
  }
}
</script>
<style scoped>
  .input{
    width: 50%;
  }
  .btn {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
  }

  .reply {
    width: 70%;
    margin-left: 20px;
    float: left;
  }

  .imgBox {
    width: 90px;
    height: 80px;
    float: left;
    margin-right: 30px;
    margin-bottom: 20px;
  }

  .most-right {
    float: right;
    width: 200px;
    min-height: 50px;
    line-height: 50px;
  }

  .line {
    overflow: hidden;
    width: 100%;
    min-height: 50px;
  }

  .rightBox {
    font-size: 15px;
    width: 80%;
    float: left;
    word-wrap: break-word; /*文字自动换行*/
  }

  .leftBox {
    float: left;
    width: 110px;
    height: auto;
    font-size: 15px;
    color: rgb(81, 81, 81);
    font-weight: 600;
    text-indent: 20px;
  }

  .titleBox {
    width: 100%;
    min-height: 60px;
    background: rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }

  .bigBox {
    width: 95%;
    height: auto;
    overflow: hidden;
    margin: 0 auto;
  }
</style>
