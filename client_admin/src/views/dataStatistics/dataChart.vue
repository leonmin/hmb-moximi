<template>
  <div >
  </div>
</template>

<script>
import { ofdCharge, ofdInfo } from '../../api/userManage'
export default {
  data() {
    return {
      page: 1,
      size: 10
    }
  },
  mounted() {
    this.getData()
    this.getInfo()
  },
  methods: {
    getData() {
      const params = {
        page: this.page,
        size: this.size
      }
      ofdCharge(params).then(res => {})
    },
    getInfo() {
      ofdInfo().then(res => {})
    }
  }
}
</script>

<style scoped>

</style>
