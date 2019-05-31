<template>
  <aside>
    <!--导航菜单-->
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleopen"
      @close="handleclose"
      @select="handleselect"
      unique-opened
      router
      :collapse="isCollapse"
    >
      <template v-for="(item,index) in menuList">
        <template v-if="!item.hidden">
          <el-submenu :index="index+''" v-if="!item.leaf" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{{{raw_helper}}}}{{item.name}}{{{{/raw_helper}}}}</span>
            </template>
            <template v-for="child in item.children">
              <el-menu-item
                :index="child.path"
                :key="child.path"
                v-if="!child.hidden"
              >{{{{raw_helper}}}}{{child.name}}{{{{/raw_helper}}}}</el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item
            v-if="item.leaf&&item.children.length>0"
            :index="item.children[0].path"
            :key="item.chidren[0].path"
          >
            <i :class="item.icon"></i>
            {{{{raw_helper}}}}{{item.children[0].name}}{{{{/raw_helper}}}}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
    <i class="el-icon" :class="{'el-icon-s-unfold':isCollapse,'el-icon-s-fold':!isCollapse}" @click="toggleClick"></i>
  </aside>
</template>

<script>
import menus from '@/data/menus'
export default {
  name: 'yblMenu',
  data () {
    return {
      isCollapse: false,
      menuList: []
    }
  },
  created () {
    let data = menus
    this.menuList = JSON.parse(JSON.stringify(data)).filter(item => {
      return item.children.length > 0 && item
    })
  },
  computed: {
  },
  methods: {
    handleopen () {
      console.log('handleopen')
    },
    handleclose () {
      console.log('handleclose')
    },
    handleselect: function (a, b) {
    },
    toggleClick () {
      this.isCollapse = !this.isCollapse
    }
  },
  watch: {
    /* $route: function (to, from) {
      console.log(to, from)
      if (from.path === '/login') {
        let url = this.menuList && this.menuList[0] && this.menuList[0].children[0].path
        this.$router.push({path: url})
      }
    } */
  }
}
</script>

<style lang="less" scoped>
aside {
  .el-menu {
    height: 100%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 230px;
    min-height: 400px;
  }
  .el-icon{
    position: absolute;
    bottom: 10px;
    left:20px;
    cursor: pointer;
  }
}

</style>
