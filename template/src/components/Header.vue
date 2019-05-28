<template>
  <el-col :span="24" class="header">
    <el-col
      :span="10"
      class="logo"
    >{{{{raw_helper}}}}{{collapsed?'':sysName}}{{{{/raw_helper}}}}</el-col>
    <el-col :span="10">
    </el-col>
    <el-col :span="4" class="userinfo">
      <el-dropdown trigger="hover">
        <span class="el-dropdown-link userinfo-inner">
          <img :src="this.sysUserAvatar" v-if="sysUserAvatar">
          <img src="../assets/logo.png" alt="" v-else>
          admin
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>我的消息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-col>
</template>

<script>
import { storage } from '@/utils'
export default {
  name: 'yblHeader',
  data () {
    return {
      sysName: '管理平台基础模版信息',
      collapsed: false,
      sysUserAvatar: ''
    }
  },
  computed: {
  },
  methods: {
    // 折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed
      this.$emit('trigger', this.collapsed)
    },
    // 退出登录
    logout: function () {
      var _this = this
      this.$confirm('确认退出吗?', '提示', {
        // type: 'warning'
      }).then(() => {
        storage.removeItem('t')
        storage.removeItem('u')
        _this.$router.push('/login')
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  background: #20a0ff;
  color: #fff;
  .userinfo {
    text-align: right;
    padding-right: 35px;
    float: right;
    .userinfo-inner {
      cursor: pointer;
      color: #fff;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin: 10px 0px 10px 10px;
        float: right;
      }
    }
  }
  .logo {
    //width:230px;
    height: 60px;
    font-size: 22px;
    padding-left: 20px;
    padding-right: 20px;
    img {
      width: 40px;
      float: left;
      margin: 10px 10px 10px 18px;
    }
    .txt {
      color: #fff;
    }
  }
  .logo-collapse-width {
    width: 60px+5;
  }
  .tools {
    padding: 0px 5px;
    font-size: 35px;
    width: 14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    .iconfont{
      font-size: inherit;
    }
  }
}
</style>
