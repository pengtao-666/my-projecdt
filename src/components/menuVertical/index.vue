<template>
  <div class="menu-cont">
    <div class="menu-item" v-for="(item,index) in catalogList" :key="index" @click.stop="jump(item.path)">
      <el-tooltip effect="dark" :content="item.title" placement="left">
        <img src="@/assets/img/3.jpg" alt="">
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    catalogList: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    jump (val) {
      if (val === '/login') {
        sessionStorage.removeItem('userInfo')
        this.$router.push({ path: val })
      } else if (this.$route.path !== val) {
        this.$router.push({
          path: val
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin contSize($w, $h) {
  width: $w;
  height: $h;
}

.menu-cont{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.menu-item{
  cursor: pointer;
  height: 50px;
  margin-top: 10px;
  &:last-child{
    margin-bottom: 10px;
  }
  img{
    @include contSize(50px,50px);
    border-radius: 12px;
  }
}
</style>
