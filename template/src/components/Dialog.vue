<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :width="width"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :top='top' custom-class="custom-dialog">
    <slot></slot>
    <template slot="footer" v-if="showFooter">
      <span class="footer__tips">
        <slot name="tips"></slot>
      </span>
      <slot name="actions">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </slot>
    </template>
    <el-dialog
      :width="width"
      :title="innerTitle"
      :visible.sync="innerVisible"
      :before-close="innerClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      append-to-body>
      <slot name="inner"></slot>
      <template slot="footer">
        <el-button @click="innerClose">取 消</el-button>
        <el-button type="primary" @click="innerConfirm">确 定</el-button>
      </template>
    </el-dialog>
  </el-dialog>
</template>

<script>
export default {
  name: 'yblDialog',
  props: {
    visible: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    title: {
      type: String,
      default: function () {
        return '系统提示'
      }
    },
    width: {
      type: String | Number,
      default: function () {
        return '50%'
      }
    },
    top: {
      type: String | Number,
      default: function () {
        return '5vh'
      }
    },
    showFooter: {
      type: Boolean,
      default: function () {
        return true
      }
    },
    innerTitle: {
      type: String,
      default: function () {
        return '系统提示'
      }
    },
    innerVisible: {
      type: Boolean,
      default: function () {
        return false
      }
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
    },
    innerClose () {
      this.$emit('inner-close')
    },
    innerConfirm () {
      this.$emit('inner-confirm')
    }
  }
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
