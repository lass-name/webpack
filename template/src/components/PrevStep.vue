<template>
  <div class="center prev-step">
    <slot name="left"></slot>
    <el-button type="default" @click="goPrev" v-if="showBack">\{{backButtonText}}</el-button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'yblStep',
  props: {
    backButtonText: {
      type: String,
      default: () => '返回'
    },
    showBack: {
      type: Boolean,
      default: () => true
    },
    cancelAction: {
      type: Function | String,
      default: () => ''
    }
  },
  data () {
    return {}
  },
  methods: {
    goPrev () {
      let type = typeof this.cancelAction
      if (type === 'string') {
        this.$router.go(-1)
      } else if (type === 'function') {
        this.cancelAction()
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="less">
.prev-step{
  padding: 20px 0;
  position: absolute;
  bottom: 0;
  width: 100%-6%;
  z-index: 10;
  background-color: #FFF;
  border-top: 1px solid #EBEEF5;
  margin-left: -20px;
  .el-button {
    min-width: 120px;
  }
}
</style>
