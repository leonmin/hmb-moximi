<template>
  <div v-loading="loading" class="main">
    <!--    <div class="title">用户列表</div>-->
    <el-form :inline="true" :model="searchData" class="demo-form-inline" label-width="90px" style="margin-top: 30px">
      <el-form-item label="关键字" style="margin-left: 5px">
        <el-input v-model="searchData.searchKey" placeholder="用户名称\用户手机号" />
      </el-form-item>
      <el-form-item label="是否是会员">
        <el-select v-model="searchData.isMember" placeholder="请选择" clearable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-left: 30px" @click="loadList()">查询</el-button>
        <el-button type="info" style="margin-left: 30px" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="tableData" style="width: 95%;margin-left: 40px;" border :height="fullHeight-220+'px'">
      <el-table-column prop="avatar" label="头像" min-width="60" show-overflow-tooltip>
        <template v-slot="scope">
          <div class="block"><el-avatar icon="el-icon-user-solid" :size="40" :src="scope.row.avatar" /></div>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" min-width="80" show-overflow-tooltip />
      <el-table-column prop="userName" label="用户名称" min-width="100" show-overflow-tooltip />
      <el-table-column prop="mobile" label="用户手机号" min-width="100" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.mobile | formatTel }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="isMember" label="是否已成会员" min-width="60" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.isMember?'是':'否' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="memberEndTime" label="会员到期日" min-width="160" show-overflow-tooltip />
      <el-table-column prop="addTime" label="注册时间" min-width="160" show-overflow-tooltip />
      <el-table-column prop="pchannel" label="渠道" min-width="120" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.pchannel | pchannel }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="partner" label="用户类型" min-width="80" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.partner | partner }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="puserName" label="上级用户" min-width="80" show-overflow-tooltip />
      <el-table-column prop="puserMobile" label="上级手机号" min-width="100" show-overflow-tooltip>
        <template v-slot="scope">
          <span>{{ scope.row.puserMobile | formatTel }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="inviteUserCount" label="下级用户数" min-width="70" show-overflow-tooltip>
        <template v-slot="scope">
          <span style="cursor: pointer;color: #409EFF;" @click="look(scope.row)">{{ scope.row.inviteUserCount }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="inviteUserCount" label="设置用户类型" min-width="110" show-overflow-tooltip>
        <template v-slot="scope">
          <span style="cursor: pointer;color: #409EFF;" @click="setPartner(scope.row)">{{ scope.row.partner===0 || scope.row.partner===null?'设置为合伙人':'取消合伙人' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="inviteUserCount" label="查看详情" min-width="80" show-overflow-tooltip>
        <template v-slot="scope">
          <span style="cursor: pointer;color: #409EFF;" @click="lookData(scope.row)">查看详情</span>
        </template>
      </el-table-column>
      <el-table-column prop="inviteUserCount" label="删除用户" min-width="80" show-overflow-tooltip>
        <template v-slot="scope">
          <span style="cursor: pointer;color: #409EFF;" @click="del(scope.row)">删除用户</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      style="float: right;margin-top: 20px;margin-right: 40px"
      :current-page="searchData.pageNum"
      :page-size="searchData.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!--dialog-->
    <look-detail :show.sync="show" :row="row" />
  </div>
</template>

<script>
import { getUserList, setPartner, deleteUser } from '@/api/user'
import lookDetail from './lookDetail'
export default {
  name: 'Index',
  components: {
    lookDetail
  },
  filters: {
    /* 是否过期*/
    outTime: function(data) {
      if (data === 0 || data === '0') {
        return '未过期'
      } else {
        return '已过期'
      }
    },
    partner: function(data) {
      if (data === 1 || data === '1') {
        return '合伙人'
      } else {
        return '普通用户'
      }
    },
    pchannel: function(data) {
      if (data === 0 || data === '0') {
        return '普通用户邀请'
      } else if (data === 1 || data === '1') {
        return '合伙人邀请'
      } else if (data === 2 || data === '2') {
        return '卡密邀请'
      }
    }
  },
  // 存放 数据
  data: function() {
    return {
      loading: false,
      fullHeight: document.documentElement.clientHeight, // 页面高度
      options: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ],
      tableData: [], // 表格数据
      searchData: { // 筛选的数据
        pageNum: 1,
        pageSize: 10,
        searchKey: '', // 关键字
        isMember: '' // 是否是会员
      },
      total: null, // 总数
      isPaging: false, // 是否是分页
      show: false,
      row: {}
    }
  },
  watch: {
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
    this.loadList()
  },
  methods: {
    lookData(row) {
      this.show = true
      Object.assign(this.row, row)
    },
    // 删除
    del(row) {
      this.$confirm('是否删除此用户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          id: row.id
        }
        deleteUser(data).then(res => {
          if (res.code === 0) {
            this.$message.success('操作成功!')
            this.loadList()
          }
        })
      }).catch(() => {
      })
    },
    // 设置合伙人
    setPartner(row) {
      this.$confirm('是否修改用户类型', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          id: row.id,
          partner: row.partner === 0 ? 1 : 0
        }
        setPartner(data).then(res => {
          if (res.code === 0) {
            this.$message.success('操作成功!')
            this.isPaging = true
            this.loadList()
          }
        })
      }).catch(() => {
      })
    },
    // 重置
    reset() {
      this.searchData = { // 筛选的数据
        pageNum: 1,
        pageSize: 10,
        searchKey: '', // 关键字
        isMember: '' // 是否是会员
      }
      this.loadList()
    },
    // 查看
    look(row) {
      this.$router.push({
        path: 'lowerDetails',
        query: { id: row.id }
      })
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
    loadList() {
      this.loading = true
      if (!this.isPaging) {
        this.searchData.pageNum = 1
      }
      getUserList(this.searchData).then(res => {
        if (res.code === 0 || res.code === '0') {
          this.total = res.data.total
          this.tableData = res.data.records
          this.loading = false
          this.isPaging = false
        }
      })
    }
  }
}
</script>

<style scoped>
  .title{
    font-size: 22px;
    margin-top: 20px;
    margin-left: 40px;
    font-weight: bold;
  }
</style>
