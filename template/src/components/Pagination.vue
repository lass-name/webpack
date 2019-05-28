<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentPageChange"
    :current-page.sync="currentPage"
    :page-sizes="[10,15,20,25,30,50]"
    :page-size="pageSize"
    background
    :hide-on-single-page="total<10"
    layout="total, sizes, prev, pager, next, jumper" :total="total">
  </el-pagination>
</template>

<script>
export default {
  name: 'yblPager',
  props: {
    total: {
      type: Number | String,
      default: 0
    }
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.invokeFatherMethod()
    },
    handleCurrentPageChange (val) {
      this.invokeFatherMethod()
    },
    invokeFatherMethod () {
      let item = {
        page: this.currentPage,
        size: this.pageSize
      }
      this.$emit('change', item)
    }
  },
  watch: {
    total: function (curVal, oldVal) {
      this.currentPage = 1
    }
  }
}
</script>

<style>

</style>
