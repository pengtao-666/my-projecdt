<template>
    <div>
        <router-view/>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
    if (!sessionStorage.getItem('userInfo') && this.$route.path !== '/login') {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
