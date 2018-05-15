<template>
  <div>
    <this-dialog :isShow="isShowCheckDialog" @on-close="failOrder">
      <h4 slot="header">检查您的支付状态</h4>
      <button type="button" class="btn btn-success" @click="checkStatus">支付成功</button>
      <button type="button" class="btn btn-danger" @click="cancelOrder">支付失败</button>
    </this-dialog>
    <this-dialog :isShow="isShowSuccessDialog" @on-close="toOrderList">
      购买成功！
    </this-dialog>
    <this-dialog :isShow="isShowFailDialog" @on-close="failOrder">
      购买失败！
    </this-dialog>
  </div>
</template>

<script>
import ThisDialog from './dialog'

export default {
  components: {
    ThisDialog
  },
  props: {
    isShowCheckDialog: {
      type: Boolean,
      default: false
    },
    orderId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      isShowSuccessDialog: false,
      isShowFailDialog: false
    }
  },
  methods: {
    checkStatus () {
      this.$http.post('/api/createOrder', {
        orderId: this.orderId
      })
      .then((res) => {
        this.isShowSuccessDialog = true
        this.$emit('on-close-check-dialog')
      }, (err) => {
        this.isShowFailDialog = true
        this.$emit('on-close-check-dialog')
      })
    },
    toOrderList () {
      this.$router.push({path: '/orderlist'})
    },
    cancelOrder () {
      this.isShowFailDialog = true
    },
    failOrder () {
      this.isShowFailDialog = false
      
    }
  }
}
</script>
