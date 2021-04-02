<template>
  <div class="listpanel-container">
    <div class="listpanel-container__header">
      <slot name='header'></slot>
    </div>
    <el-tabs type="border-card" class="custom-card" v-bind="$attrs">
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
  },
  mounted () {
    let _this = this
    this.$nextTick(() => {
      _this.resize()

      _this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', _this.resize, false)
      })
      window.addEventListener('resize', _this.resize, false)
    })
  },
  methods: {
    resize () {
      let width = document.querySelector('.custom-card .is-active').clientWidth
      let panelWidth = document.querySelector('.listpanel-container').clientWidth
      if(+width > 0) {
        document.querySelector('.listpanel-container__header').style.width = `${panelWidth - width - 40}px`
        document.querySelector('.listpanel-container__header').style.left = `${width + 10}px`
      }
    }
  }
}
</script>

<style lang="less" scoped>
.listpanel-container{
  position: relative;
  margin-bottom: 20px;
  &__header{
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
