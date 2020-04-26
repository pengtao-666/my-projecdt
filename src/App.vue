<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created () {
    document.title = '个人测试网站'
  }
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app{
  min-width: 1200px;
}
.templateCont{
  height: 100%;
  padding: 20px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  overflow: auto;
}
</style>
