<template>
<div @keydown="keyEvent">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="login-container">
    <h3 class="title">系统登录</h3>
    <!-- <el-form-item prop="SubDomain">
      <el-input type="text" v-model="ruleForm.SubDomain" auto-complete="off" placeholder="商户编码" clearable :autofocus="true"></el-input>
    </el-form-item> -->
    <el-form-item prop="loginName">
      <el-input type="text" v-model="ruleForm.loginName" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="passWord">
      <el-input type="password" v-model="ruleForm.passWord" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="login" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
</el-form></div>
</template>

<script>
import menus from '@/data/menus'
import { mapGetters } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      ruleForm: {
        loginName: '',
        passWord: '',
        SubDomain: ''

      },
      rules: {
        SubDomain: [{required: true, message: '请输入商户编码'}],
        loginName: [{required: true, message: '请输入登录帐号'}],
        passWord: [{required: true, message: '请输入登录密码'}]
      },
      checked: false,
      logining: false
    }
  },
  created () {
    let obj = this.commonData['u_p']
    if (obj) {
      this.ruleForm = obj
      this.checked = true
    }
  },
  computed: {
    ...mapGetters([
      'commonData'
    ])
  },
  methods: {
    login () {
      this.logining = true
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.userLogin().then(data => {
            console.log(data)
            let auth = data.customer.pageAuthorization.split(',').map(c => +c)
            console.log(auth)
            let url = '/order'
            if (auth && auth.length && +auth[0] !== 1) {
              let menuList = JSON.parse(JSON.stringify(menus)).filter(item => {
                let children = item.children.filter(c => auth.indexOf(+c.value) !== -1)
                item.children = children
                return item.children.length > 0 && item
              })
              console.log(menuList)
              url = menuList && menuList[0] && menuList[0].children[0].path
            }
            if (url === undefined) {
              this.logining = false
              this.$alert('您没有访问系统的权限，请联系管理员！')
              return
            }
            this.$router.push({path: url})
          }).catch(() => {
            this.logining = false
          })
        } else {
          this.logining = false
        }
      })
    },
    userLogin () {
      return this.$store.dispatch('userLogin', this.ruleForm).then(data => {
        // return this.saveDataToLocal().then(() => {
        return data
        // })
      }).then(data => {
        return data
      })
    },
    saveDataToLocal () {
      console.log('local')
      let data = {
        key: 'u_p',
        value: this.checked ? this.ruleForm : '',
        reset: true
      }
      return this.$store.dispatch('pureDataTransmit', data)
    },
    keyEvent (e) {
      if (e.keyCode === 13) {
        this.login()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
