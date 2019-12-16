<template>
  <div>
    <el-dialog
      title="下发优惠券"
      width="1200px"
      height="600px"
      top="50px"
      :visible.sync="visible"
      :show="show"
      @open="openDialog"
      @close="$emit('update:show',false)"
    >
      <div v-loading="loading">
        <div class="bigBox">
          <template>
            <el-transfer v-model="value" filterable filter-placeholder="用户名/用户手机号" :data="data" :titles="['源数据','选择的数据']" @change="chooseData" />
          </template>
        </div>
        <el-divider />
        <el-button type="primary" style="margin-left: 75px" :loading="btnLoading" @click="sure()">确认</el-button>
        <el-button type="info" @click="cancel()">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listUsers, sendCoupons } from '@/api/userManage'
export default {
  filters: {
  },
  props: ['show', 'row'],
  data() {
    return {
      visible: this.show,
      loading: false,
      tableData: [],
      fullHeight: document.documentElement.clientHeight, // 页面高度
      multipleSelection: [], // 表格选中的数据
      btnLoading: false,
      // 获取row的key值
      getRowKeys(row) {
        return row.id
      },
      isPaging: false, // 是否是分页
      value: [],
      data: [],
      params: {
        couponId: null,
        userIds: []
      }
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
    // 选择的数据
    chooseData(ev) {
      this.params.userIds = ev
    },
    // 取消
    cancel() {
      this.visible = false
    },
    // 确定
    sure() {
      if (this.params.userIds.length > 0) {
        this.$confirm('确认下发, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sendCoupons(this.params).then(res => {
            if (res.code === 0 || res.code === '0') {
              this.$message.success(res.msg)
              this.visible = false
            }
          })
        }).catch(() => {
        })
      } else {
        this.$message.error('请选择下发的用户')
      }
    },
    openDialog() {
      this.params.couponId = this.row.id
      this.value = []
      this.params.userIds = []
      this.loadList()
    },
    loadList() {
      this.loading = true
      this.data = []
      listUsers().then(res => {
        if (res.code === 0 || res.code === '0') {
          for (let i = 0; i < res.data.length; i++) {
            this.data.push({
              key: res.data[i].id,
              label: '姓名:' + res.data[i].userName + '\xa0\xa0\xa0\xa0\xa0\xa0' + '手机:' + (res.data[i].mobile + '').substr(0, 3) + '****' + (res.data[i].mobile + '').substr(7)
            })
          }
          this.loading = false
        }
      })
    }
  }
}
</script>
<style scoped>
  >>>.el-transfer-panel{
    width: 400px;
    height: 500px;
  }
  >>>.el-transfer-panel__list.is-filterable{
    height: 400px;
  }
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
