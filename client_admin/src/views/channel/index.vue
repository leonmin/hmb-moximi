<template>
  <div class="main">
    <!--    渠道表格-->
    <el-table
      :data="channelList"
      border
    >
      <el-table-column
        prop="channelName"
        label="渠道名称"
      />
      <el-table-column
        prop="channelMemo"
        label="渠道备注"
      />
      <el-table-column
        prop="addTime"
        label="添加时间"
      />
      <el-table-column
        label="操作"
      >
        <template v-slot="scope">
          <span style="cursor: pointer;color: #409EFF;" @click="getQr(scope.row)">查看二维码</span>
          <span style="cursor: pointer;color: #409EFF;margin: 10px" @click="getChannelData(scope.row)">查看渠道数据</span>
        </template>
      </el-table-column>
    </el-table>
    <!--  二维码弹窗 -->
    <el-dialog title="二维码" :visible.sync="dialogTableVisible" class="Qrimg" width="30%"">
      <img :src="src" alt="" style="width:100%;max-width: 400px">
<!--      <p class="downloadQr" @click="startTrans(src)">下载二维码</p>-->
<!--      <a :href="base" download="png"></a>-->
    </el-dialog>
    <!--    分页-->
  </div>
</template>
<script>
import { channelList, channelQr } from '../../api/userManage'
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      channelList: [],
      src: '',
      dialogTableVisible: false,
      base: ''
    }
  },
  created() {
    //  初始化数据
    this.getChannelList()
  },
  methods: {
    //  初始化数据
    getChannelList() {
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      channelList(params).then(res => {
        this.channelList = res.data.records
      })
    },
    // 数据
    getChannelData(row) {
      var uuid = row.uuid
      this.$router.push({ path: '/channel/channelData', query: { id: uuid }})
    },
    //  查看二维码
    getQr(row) {
      this.dialogTableVisible = true
      const params = {
        channelId: row.id
      }
      channelQr(params).then(res => {
        this.src = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + res.data
      })
    },
    //  下载二维码
    getBase64Image(img) {
      var canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      var ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      var dataURL = canvas.toDataURL('image/png') // 可选其他值 image/jpeg
      this.base = dataURL
      return dataURL
    },

    startTrans(src, cb) {
      var image = new Image()
      image.src = src + '?v=' + Math.random() // 处理缓存
      image.crossOrigin = '*' // 支持跨域图片
      image.onload = function() {
        var base64 = this.getBase64Image(image)
        cb && cb(base64)
      }
    }

  }
}
</script>

<style scoped>
  .main{
    margin: 40px;
  }
  .Qrimg{
    text-align: center;
  }
  .downloadQr{
    margin-top: 20px;
    cursor: pointer;
    font-size: 20px;
  }
</style>
