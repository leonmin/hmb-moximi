<template>
  <div>
    <el-dialog
      title="赠送优惠券"
      width="900px"
      height="600px"
      top="50px"
      :visible.sync="visible"
      :show="show"
      @open="openDialog"
      @close="$emit('update:show',false)"
    >
      <div v-loading="loading">
        <div class="bigBox">
          <el-input v-model="input" placeholder="输入优惠卷编号\名称" clearable class="input" />
          <!--表格部分-->
          <el-table ref="multipleTable" v-loading="loading" :data="tableData" tooltip-effect="dark" class="table" :height="550" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="username" label="优惠卷编号" show-overflow-tooltip min-width="120" />
            <el-table-column prop="commentType" label="优惠卷名称" show-overflow-tooltip min-width="120" />
            <el-table-column prop="" label="折扣数" show-overflow-tooltip min-width="120" />
            <el-table-column prop="" label="适用范围" show-overflow-tooltip min-width="120" />
            <el-table-column prop="content" label="有效期" show-overflow-tooltip min-width="150" />
          </el-table>
          <!--分页-->
          <el-pagination
            style="float: right;margin-top: 20px;"
            :current-page="searchData.pageNum"
            :page-sizes="[10,30,50,100,200]"
            :page-size="searchData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  props: ['show'],
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
        key: '' // 关键字
      },
      total: null
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
    // 当前页码
    handleSizeChange(val) {
      this.searchData.pageSize = val
      this.loadList()
    },
    // 当前页数
    handleCurrentChange(val) {
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

    },
    // 取消
    cancel() {
      this.$emit('update:show', false)
    },
    openDialog() {
      this.loadList()
    },
    loadList() {

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
