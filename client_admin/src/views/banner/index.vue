<template>
  <div id="main">
    <el-button class="add" type="primary" @click="add()">新增banner</el-button>
    <!--dialog-->
    <add-dialog :show.sync="show" :row="row" @success="success" />
  </div>
</template>

<script>
import addDialog from './add.vue'
export default {
  name: '',
  components: {
    addDialog
  },
  // 存放 数据
  data: function() {
    return {
      row: '',
      show: false
    }
  },
  mounted() {

  },
  methods: {
    // 新增
    add() {
      this.show = true
    },
    // 新增/编辑成功的回调
    success() {

    }
  }
}
</script>

<style scoped>
  .add{
    float: right;
    margin-right: 30px;
    margin-top: 30px;
  }
</style>
