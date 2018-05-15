<template>
  <div id="app">
    <nav class="navbar navbar-default fixed">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="/">
            <img alt="Brand" class="logo" src="./assets/logo.svg">
          </a>
        </div>
        <div class="navbar-right">
          <ul class="nav navbar-nav">
            <li v-if="!log"><a href="#">{{ username }}</a></li>
            <li v-if="log"><a @click="logClick" href="#">登陆</a></li>
            <li v-if="log"><a @click="regClick" href="#">注册</a></li>
            <li v-if="!log"><a href="#" @click="quit">退出</a></li>
            <li><a @click="aboutClick" href="#">关于</a></li>
          </ul>
        </div>
      </div>
    </nav> 
    <div class="app-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div>
      <footer>
        <p>&copy; 2018 Learning with Vue.js</p>
      </footer>
    </div>
    <my-dialog :isShow="isShowLogDialog" @on-close="closeDialog('isShowLogDialog')">
      <h4 class="modal-title" slot="header">登陆</h4>
      <log-form @has-log="onSuccessLog"></log-form>
    </my-dialog>
    <my-dialog :isShow="isShowRegDialog" @on-close="closeDialog('isShowRegDialog')">
      <h4 class="modal-title" slot="header">注册</h4>
      <reg-form></reg-form>
    </my-dialog>
    <my-dialog :isShow="isShowAboutDialog" @on-close="closeDialog('isShowAboutDialog')">
      <h4 class="modal-title" slot="header">关于</h4>
      <p>本报告在调研数据的基础上，采用定性与定量相结合的方式深入分析了专车市场发展的驱动因素与阻碍因素、专车市场背后的产业格局、专车企业的竞争格局、用户对专车市场的依赖程度、专车对其他交通工具运力的补充效应等，通过这五个章节的研究反映专车市场的发展态势和面临的问题。报告力求客观、深入、准确地反映中国专车市场发展情况，为政府、企事业单位和社会各界提供决策依据。 </p>
    </my-dialog>
  </div>
</template>

<script>
import Dialog from './components/dialog'
import logForm from './components/logForm'
import regForm from './components/regForm'

export default {
  name: 'App',
  components: {
    myDialog: Dialog,
    logForm,
    regForm
  },
  data () {
    return {
      isShowLogDialog: false,
      isShowRegDialog: false,
      isShowAboutDialog: false,
      username: '',
      log: true
    }
  },
  methods: {
    logClick () {
      this.isShowLogDialog = true
    },
    regClick () {
      this.isShowRegDialog = true
    },
    aboutClick () {
      this.isShowAboutDialog = true
    },
    closeDialog (attr) {
      this[attr] = false
    },
    onSuccessLog (data) {
      console.log(data)
      this.closeDialog('isShowLogDialog')
      this.username = data.data.username
      this.log = false
    },
    quit () {
      this.log = true
    }
  }
}
</script>

<style>
body::-webkit-scrollbar-track {
  background-color: #fff;
}

body::-webkit-scrollbar {
  width: 6px;
  background-color: #fff;
}

body::-webkit-scrollbar-thumb {
  background-color: #333;
  border-radius: 4px;
}

.scroll-container {
  overflow-y: auto;
}

.scroll-container::-webkit-scrollbar-track {
  background-color: #fff;
}

.scroll-container::-webkit-scrollbar {
  width: 5px;
  height:5px;
  background-color: #fff;
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: #111;
  border-radius: 2px;
}
body {
  background: #f0f2f5;
}
.logo {
  max-width: 50px;
  margin-top: -16px;
}
.fixed {
  position: fixed;
  top: 0;
  z-index: 3;
  width: 100%;
}
.app-content {
  margin-top: 80px;
}
footer {
  text-align: center;
  height: 80px;
  width: 100%;
  line-height: 80px;
  background: #e3e4e8;
  clear: both;
  margin-top: 30px;
}
</style>

