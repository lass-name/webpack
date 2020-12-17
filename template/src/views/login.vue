{{#if_eq platform "web"}}
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
    </el-form>
  </div>
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
{{/if_eq}} 
{{#if_eq platform "mobile"}}
<template>
  <div class="login-pages">
    <div class="main_content">
      <img src="@/assets/logo.png" alt="" class="logo">
        <ValidationObserver tag="form" ref="obs">
          <ValidationProvider name="用户名" rules="required">
            <van-field
              v-model="form.username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
            />
          </ValidationProvider>
          <ValidationProvider name="password" rules="required|password">
            <van-field
              v-model="form.password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
            />
          </ValidationProvider>
        </ValidationObserver>
        <div style="margin: 16px;">
          <van-button round block type="info" :disabled="logining" :loading="logining" @click="login" loading-text="正在登录...">登录</van-button>
        </div>
    </div>
    <div class="flex-between bottom-link">
      <span @click="navTo('/')">去注册</span>
      <span @click="navTo('/')">忘记密码</span>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: '',
        mobile: ''
      },
      logining: false
    }
  },
  created () {
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    login () {
      let obs = this.$refs['obs']
      this.$refs['obs'].validate().then((valid) => {
        if (valid) {
          // 登录成功
          this.logining = true
        } else {
          let errors = this.showErrorMessage(obs.errors)
          let error = errors[errors.length - 1]
          this.$toast(error)
        }
      })
    },
    showErrorMessage (errors) {
      return Object.keys(errors).reduce((arr, key) => {
        let _array = errors[key]
        if (_array && _array.length) {
          arr = [..._array, ...arr]
        }
        return arr
      }, [])
    },
    userLogin () {

    },
    navTo (url) {
      this.$router.push({ path: url })
    }
  }
}
</script>

<style lang="less" scoped>
/* :root {
  --borderColor: rgba(214, 219, 226, .5); //输入框边框线
} */
.login-pages {
  padding: 10px;
  .main_content {
    background: #fff;
    padding: 73px 0 50px;
    border-radius: 5px;
    .logo {
      width: 88px;
      height: 88px;
      display: block;
      margin: 0 auto 32px;
    }
  }
  .bottom-link {
    padding: 15px 0;
    font-size: 14px;
    font-weight: 400;
    color: #666666;
  }
}
</style>

{{/if_eq}} 