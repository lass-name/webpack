<template>
{{#if_eq platform "mobile"}}
  <div class="container"></div>
{{/if_eq}}
{{#if_eq platform "web"}}
  <el-row class="container">
    <ybl-header></ybl-header>
    <el-col :span="24" class="main">
      <ybl-menu></ybl-menu>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{{{raw_helper}}}}{{$route.meta.title}}{{{{/raw_helper}}}}</strong>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
{{/if_eq}}
</template>

<script>
export default {
  name:'layout',
  data(){
    return {
      
    }
  },
  methods:{
    
  }
}
</script>
<style lang="less" scoped>
{{#if_eq platform "web"}}
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0;
  width: 100%;
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        margin-bottom: 15px;
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
{{/if_eq}}
</style>