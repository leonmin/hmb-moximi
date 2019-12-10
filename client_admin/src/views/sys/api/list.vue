<template>
  <div class="app-container">
    <el-table :data="apiList" style="width: 100%" border max-height="250">
      <el-table-column fixed prop="apiName" label="接口名称" width="150" />
      <el-table-column fixed prop="apiNumber" label="接口编号" width="150" />
      <el-table-column fixed prop="date" label="" />
    </el-table>
  </div>
</template>

<script>
import { allApiList } from '@/api/apiManage'
export default {
  name: 'List',
  data() {
    return {
      apiList: []
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      allApiList().then(res => {
        this.apiList = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
