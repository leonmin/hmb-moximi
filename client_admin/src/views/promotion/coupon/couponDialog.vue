<template>
  <div>
    <el-dialog
      title="下发优惠券"
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
          <el-input v-model="searchData.searchKey" placeholder="用户名/用户手机号" clearable class="input" style="float: left;width: 324px;margin-bottom: 10px" />
          <el-button type="primary" style="margin-left: 15px;" @click="loadList()">搜索</el-button>
          <!--表格部分-->
          <div style="float: left;width: 100%" />
          <div style="font-weight: bold;margin-bottom: 10px;">用户列表</div>
          <div style="font-weight: bold;margin-bottom: 10px;float: right;margin-top: -30px;margin-right: 365px">已选列表</div>
          <el-table ref="multipleTable" border :row-key="getRowKeys" :data="tableData" tooltip-effect="dark" class="table" :height="550" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" :reserve-selection="true" />
            <el-table-column prop="userName" label="用户名" show-overflow-tooltip min-width="120" />
            <el-table-column prop="mobile" label="用户手机号" show-overflow-tooltip min-width="120">
              <template v-slot="scope">
                <span>{{ scope.row.mobile | formatTel }}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="rightNarrow" />
          <el-table border :data="multipleSelection" tooltip-effect="dark" class="table" :height="550">
            <el-table-column prop="userName" label="用户名" show-overflow-tooltip min-width="120" />
            <el-table-column prop="mobile" label="用户手机号" show-overflow-tooltip min-width="120">
              <template v-slot="scope">
                <span>{{ scope.row.mobile | formatTel }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="mobile" label="操作" show-overflow-tooltip min-width="60">
              <template v-slot="scope">
                <span style="color: #1c75ff;cursor: pointer" @click="toggleSelection([multipleSelection[scope.$index]])">删除</span>
              </template>
            </el-table-column>
          </el-table>
          <div style="float: right;margin-right: 10px;font-size: 14px;margin-top: 10px">共 {{ multipleSelection.length }} 位</div>
        </div>
        <!--分页-->
        <el-pagination
          style="float: right;margin-top: 10px;float: left;margin-left: 100px"
          :current-page="searchData.pageNum"
          :page-size="searchData.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <div style="margin-left: 750px;margin-top: 40px">
          <el-button type="primary" style="margin-left: 20px" :loading="btnLoading" @click="sure()">确认</el-button>
          <el-button type="info" @click="cancel()">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { usersList, sendCoupons } from '@/api/userManage'
export default {
  filters: {
  },
  props: ['show', 'row'],
  data() {
    return {
      visible: this.show,
      loading: false,
      tableData: [],
      tableData2: [],
      input: '',
      fullHeight: document.documentElement.clientHeight, // 页面高度
      multipleSelection: [], // 表格选中的数据
      searchData: { // 筛选的数据
        pageNum: 1,
        pageSize: 10,
        couponNumber: '',
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
    // del(row) {
    //   this.$confirm('确认删除此用户?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     for (let i = 0; i <= this.multipleSelection.length; i++) {
    //       if (row.id === this.multipleSelection[i].id) {
    //         this.multipleSelection.splice(i, 1)
    //       }
    //     }
    //     this.$refs.multipleTable.toggleRowSelection(row, false)
    //   }).catch(() => {
    //   })
    // },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      }
      function unique(arr) {
        for (var i = 0; i < arr.length; i++) {
          for (var j = i + 1; j < arr.length; j++) {
            if (arr[i].id === arr[j].id) { // 第一个等同于第二个，splice方法删除第二个
              arr.splice(j, 1)
              j--
            }
          }
        }
        return arr
      }
      unique(this.multipleSelection)
    },
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
    // 表格选中
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.tableData2 = val
    },
    // 确定
    sure() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('确认下发给已选择的' + this.multipleSelection.length + '位用户?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.btnLoading = true
          const data = {
            userIds: [],
            couponId: this.row.id
          }
          for (let i = 0; i < this.multipleSelection.length; i++) {
            data.userIds.push(this.multipleSelection[i].id)
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
        this.$message.error('请先选择下发的用户')
      }
    },
    openDialog() {
      this.searchData = { // 筛选的数据
        pageNum: 1,
        pageSize: 10,
        couponNumber: '',
        searchKey: '' // 关键字
      }
      this.loadList()
      if (this.multipleSelection.length > 0) {
        this.$refs.multipleTable.clearSelection()
        this.multipleSelection = []
      }
    },
    loadList() {
      this.loading = true
      if (!this.isPaging) {
        this.searchData.pageNum = 1
      }
      usersList(this.searchData).then(res => {
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
  .rightNarrow{
    float: left;
    margin-top: 25%;
    margin-left: 15px;
    margin-right: 15px;
    cursor: pointer;
    width: 50px;
    height: 50px;
    background:url("../../../assets/img/rightNarrow.png") no-repeat;
    background-size: 50px 50px;
  }
  .table{
    width: 45%;
    float: left;
  }
  .input{
    width: 50%;
    clear: both;
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
