<template>
  <div class="page">
    <el-card>
      <div v-loading="loading" element-loading-text="加载中" class="mo-rowcol">
        <div class="mo-row mo-th">
          <div class="mo-col">轮播图位置</div>
          <div class="mo-col">操作</div>
        </div>
        <div v-for="(ban, idx) in bannerArr" :key="idx" class="mo-row">
          <div class="mo-col">{{ ban.bannerPlace }}</div>
          <div class="mo-col">
            <el-button type="primary" size="mini" round @click="handleEdit(ban)"
              >修改</el-button
            >
            <el-button
              :type="ban.status === 1 ? 'warning' : 'success'"
              size="mini"
              round
              @click="handleChangeStatus(ban)"
              >{{ ban.status === 1 ? '下架' : '上架' }}</el-button
            >
          </div>
        </div>
      </div>
      <el-dialog
        :visible.sync="show"
        :title="banner.bannerPlace || '轮播图'"
        top="20px"
        width="55%"
      >
        <div class="mo-task">
          <div v-for="(ban, idx) in bannerList" :key="idx" class="mo-task-item">
            <el-form label-width="100px">
              <el-form-item :label="'轮播图' + (idx + 1)">
                <div
                  class="mo-form-item"
                  :style="{ justifyContent: 'space-between' }"
                >
                  <mo-upload
                    :value.sync="ban.bannerImg"
                    :action="$config.uploadUrl"
                  ></mo-upload>
                  <el-button
                    type="danger"
                    size="mini"
                    round
                    plain
                    @click="handleRemove(idx)"
                    >删除</el-button
                  >
                </div>
              </el-form-item>
              <el-form-item label="跳转链接">
                <el-input
                  v-model="ban.bannerUrl"
                  placeholder="跳转链接"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <span slot="footer">
          <el-button
            type="success"
            round
            :style="{ float: 'left' }"
            :disabled="bannerList && bannerList.length === 5"
            @click="handleAdd"
            >添加轮播图(最多5张)</el-button
          >
          <el-button round @click="show = false">取消</el-button>
          <el-button type="primary" round @click="handleSave">确定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { wzBannerList, editWzBanner, editWzBannerStatus } from '@/api/mo-config'
export default {
  props: {},
  data() {
    return {
      show: false,
      loading: false,
      banner: {},
      bannerArr: [],
      bannerList: []
    }
  },
  mounted() {
    this.handleQuery()
  },
  methods: {
    handleQuery() {
      this.bannerArr = []
      this.loading = true
      wzBannerList().then(res => {
        this.loading = false
        if (res && res.code === 0) {
          const data = res.data || []
          this.bannerArr = data
        }
      })
    },
    handleAdd() {
      this.bannerList.push({
        bannerImg: '',
        bannerUrl: ''
      })
    },
    handleEdit(banner) {
      this.show = true
      const { banners, ...props } = banner || {}
      this.banner = {
        ...props
      }
      this.bannerList = [...banners]
    },
    handleRemove(idx) {
      if (this.bannerList && this.bannerList.length > 0) {
        this.bannerList.splice(idx, 1)
      }
    },
    handleChangeStatus(banner) {
      editWzBannerStatus({
        placeId: banner.placeId,
        status: banner.status === 1 ? 0 : 1
      }).then(res => {
        if (res && res.code === 0) {
          this.$message.success('操作成功')
          this.handleQuery()
        }
      })
    },
    handleSave() {
      const bannerList = []
      this.bannerList.map(banner => {
        if (banner && banner.bannerImg) {
          bannerList.push({
            ...banner,
            bannerSort: bannerList.length + 1
          })
        }
      })
      console.log('bannerlist', bannerList)
      const params = {
        banners: [...bannerList],
        placeId: this.banner.placeId
      }
      editWzBanner(params).then(res => {
        this.show = false
        if (res && res.code === 0) {
          this.$message.success('修改成功')
          this.handleQuery()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.mp-ban {
  padding: 10px 0;
  .mp-ban-item {
    // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    width: 85%;
    margin: 0 auto 0;
    padding: 5px 20px 5px 0;
  }
  .mp-ban-head {
    height: 60px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .mp-ban-lead {
      width: 100px;
      text-align: right;
      padding-right: 12px;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
