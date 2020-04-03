<template>
  <div class="listpanel-container">
    <div class="header">
      <slot name='header'></slot>
    </div>
    <el-tabs type="border-card" v-bind="$attrs">
      <el-tab-pane :label="title">
        <slot></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'yblListPanel',
  props: {
    title: {
      type: String,
      default: function () {
        return '列表'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.listpanel-container{
  position: relative;
  margin-bottom: 20px;
  .header{
    position: absolute;
    width: 80%+5%;
    z-index: 200;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    left: 18%-5%;
    min-height: 40px;
    height: 40px;
    .item{
      padding: 0 5px;
      margin-right: 10px;
    }
  }
}
</style>
