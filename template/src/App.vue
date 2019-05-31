<template>
  <div id="app">
    {{#if_eq platform "mobile"}}
    <router-view v-wechat-title="$route.meta.title"/>
    {{/if_eq}}
    {{#if_eq platform "web"}}
    <router-view/>
    {{/if_eq}}
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
