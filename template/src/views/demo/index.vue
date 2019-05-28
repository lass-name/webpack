<template>
  <section>
    <ybl-pager :total="total"></ybl-pager>
    <el-button @click="search">search</el-button>
  </section>
</template>

<script>
export default {
  name: 'demo',
  data () {
    return {
      total: 0
    }
  },
  created () {
    this.total = 18
  },
  methods: {
    search () {
      this.total = Math.floor(Math.random() * 150)
      console.log(this.total)
    }
  }
}
</script>

<style>

</style>
