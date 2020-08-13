<template>
  <el-dialog
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    custom-class="custom-dialog" v-bind="$attrs" v-on="$listeners" :append-to-body="isInner">
    <slot></slot>
    <template slot="footer" v-if="showFooter">
      <span class="footer__tips">
        <slot name="tips"></slot>
      </span>
      <slot name="actions">
        <el-button @click="close">{{$attrs.cancelButtonText || '取 消'}}</el-button>
        <el-button type="primary" @click="confirm">{{$attrs.confirmButtonText || '确 定'}}</el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'yblDialog',
  props: {
    showFooter: {
      type: Boolean,
      default: function () {
        return true
      }
    }
  },
  computed:{
    isInner(){
      return this.$attrs.isInner || this.$attrs['append-to-body']
    }
  },
  methods: {
    handleClose () {
      this.close()
    },
    close () {
      this.$emit('close')
    },
    confirm () {
      this.$emit('confirm')
    }
  }

  /* 
  * use like this :
  * 
  <ybl-dialog :visible.sync="dialog.visible" :title="dialog.title" @close="close" @confirm="submit" confirmButtonText="提交">
    <el-button @click="innerOpen">OpenInner</el-button>
    <ybl-dialog :visible.sync="dialog.innerVisible" :title="dialog.innerTitle" @close="innerClose" cancelButtonText="返回" append-to-body>
      inner
      <template #actions>
        <el-button>自定义</el-button>
      </template>
    </ybl-dialog>
  </ybl-dialog> 
  *
  */
}
</script>

<style lang="less">
@border-color:#EAEAEA;
.custom-dialog{
  .el-dialog__header{
    border-bottom: 1px solid @border-color;
  }
  .el-dialog__footer{
    border-top: 1px solid @border-color;
  }
  .footer__tips{
    color: red;
    float: left;
    font-size: 14px;
  }
}
</style>
