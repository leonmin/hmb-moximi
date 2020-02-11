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
    <el-dialog title="二维码" :visible.sync="dialogTableVisible" class="Qrimg" width="30%">
      <img :src="src" alt="" style="width:100%;max-width: 400px">
      <p class="downloadQr" @click="down">下载二维码</p>
      <a :href="base" download="">下载</a>
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
    down() {
      this.getBase64('https://fastmarket.oss-cn-shenzhen.aliyuncs.com/oss/static/other/1/images/baseMap_index.jpg')
    },
    getBase64(imgUrl) {
      window.URL = window.URL || window.webkitURL
      var xhr = new XMLHttpRequest()
      xhr.open('get', imgUrl, true)
      // 至关重要
      xhr.responseType = 'blob'
      xhr.onload = function() {
        if (this.status === 200) {
          // 得到一个blob对象
          var blob = this.response
          console.log('blob', blob)
          // 至关重要
          const oFileReader = new FileReader()
          oFileReader.onloadend = function(e) {
            // 此处拿到的已经是 base64的图片了
            const base64 = e.target.result
            console.log('方式一》》》》》》》》》', base64)
            this.base = base64
          }
          oFileReader.readAsDataURL(blob)
          // ====为了在页面显示图片，可以删除====
          var img = document.createElement('img')
          img.onload = function(e) {
            window.URL.revokeObjectURL(img.src) // 清除释放
          }
          const src = window.URL.createObjectURL(blob)
          img.src = src
          // document.getElementById("container1").appendChild(img);
          // ====为了在页面显示图片，可以删除====
        }
      }
      xhr.send()
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
