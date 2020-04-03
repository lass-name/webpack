<template>
  <el-card class="box-card" v-bind="$attrs">
    <div slot="header" class="clearfix" v-if="header">
      <slot name="title">
        <span>{{title}}</span>
      </slot>
      <div class="right">
        <slot name="actions">
          <el-button type="text" @click="actionEvent">{{actionText}}</el-button>
        </slot>
      </div>
    </div>
    <slot name="search"></slot>
    <slot></slot>
  </el-card>
</template>

<script>
export default {
  name: 'yblPanel',
  props: {
    title: {
      type: String,
      default: function () {
        return '基本信息'
      }
    },
    actionText: {
      type: String,
      default: function () {
        return ''
      }
    },
    header: {
      type: Boolean,
      default: () => true
    }
  },
  methods: {
    actionEvent () {
      console.log('actionEvent')
      this.$emit('action')
    }
  }
}
</script>

<style lang="less" scoped>
.box-card{
  margin-bottom: 20px/2;
  .clearfix{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
<style lang="less">
.box-card{
  .el-card__header{
    padding:10px/2 20px;
  }
  .el-card__body{
    padding:10px 20px;
  }
}
</style>
