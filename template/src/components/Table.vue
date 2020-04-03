<template>
  <div class="ybl-table" :class="{'mutil-rows':$attrs.mutil}">
    <el-table :data="data" v-bind="$attrs" v-on="$listeners">
      <slot></slot>
    </el-table>
    <div class="ybl-table__page" v-if="total>10">
      <ybl-pager :total="total" @change="change"></ybl-pager>
    </div>
  </div>
</template>

<script>
export default {
  name: 'yblTable',
  props: {
    data: {
      type: Array,
      defalut: () => []
    },
    total: {
      type: Number | String,
      default: 0
    },
    change: {
      type: Function,
      defalut: () => {}
    }
  },
  data () {
    return {
      maxHeight: 500
    }
  },
  mounted () {
    //  :max-height="maxHeight"
    let height = document.documentElement.clientHeight
    this.$nextTick(() => {
      this.maxHeight = height - 180
    })
  }
}
</script>

<style lang="less">
.ybl-table{
  &__page{
    padding: 10px 0;
    text-align: right;
  }
  .el-button{
    padding: 0;
  }
  &.mutil-rows{
    .el-table__header{
      th{
        padding: 0;
      }
    }
  }
  .el-table__expanded-cell{
    padding: 0;
  }
}
</style>
