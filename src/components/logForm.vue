<template>
  <div>
    <form class="form-horizontal">
      <div class="form-group">
        <label for="inputUserName1" class="col-sm-2 control-label">用户名</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="inputUserName1"
          v-model="userNameModal1" placeholder="请输入用户名">
          <span class="error-text">{{ userErrors.errorText }}</span>
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword1" class="col-sm-2 control-label">Password</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="inputPassword1"
          v-model="userPassword1" placeholder="Password">
          <span class="error-text">{{ passwordErrors.errorText }}</span>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-default" @click="onLogin">登陆</button>
        </div>
      </div>
      <p class="error-text">{{ errorText }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userNameModal1: '',
      userPassword1: '',
      errorText: ''
    }
  },
  computed: {
    userErrors() {
      let errorText, status
      if (!/@/g.test(this.userNameModal1)) {
        errorText = '缺少@'
        status = false
      } else {
        errorText = ''
        status = true
      }
      if (!this.userFlag) {
        errorText = ''
        this.userFlag = true
      }
      return {
        status,
        errorText
      }
    },
    passwordErrors() {
      let errorText, status
      if (!/^\w{1,6}$/g.test(this.userPassword1)) {
        errorText = '密码不是1-6位'
        status = false
      } else {
        errorText = ''
        status = true
      }
      if (!this.passwordFlag) {
        errorText = ''
        this.passwordFlag = true
      }
      return {
        status,
        errorText
      }
    }
  },
  methods: {
    onLogin () {
      if (!this.userErrors.status || !this.passwordErrors.status) {
        this.errorText = '部分选项未通过'
      } else {
        this.errorText = ''
        this.$http.post('api/login')
        .then((res) => {
          this.$emit('has-log', res.data)
        }, (err) => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style>
.error-text {
  color: red;
}
</style>
