<template>
  <div class="ybl-table" :class="{'mutil-rows':$attrs.mutil,'nowrap':$attrs.nowrap}">
    <el-table :data="data" v-bind="$attrs" v-on="$listeners" :max-height="maxHeight">
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
      calcHeight: 1500
    }
  },
  mounted () {
    //  :max-height="maxHeight"
    if(this.$attrs['max-height'] === undefined){
      let height = document.documentElement.clientHeight
      this.$nextTick(() => {
        this.calcHeight = height - 180
      })
    }
  },
  computed: {
    maxHeight () {
      return this.$attrs['max-height'] === undefined ? this.calcHeight : (this.$attrs['max-height'] || this.calcHeight)
    }
  },
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
        .cell{
          line-height: 16px;
        }
      }
    }
  }
  &.nowrap{
    .el-table__header{
      th .cell{
        white-space: nowrap;
      }
    }
  }
  .el-table__expanded-cell{
    padding: 0;
  }
  .el-table__placeholder{
    margin-right: 3px;
  }
}
</style>
