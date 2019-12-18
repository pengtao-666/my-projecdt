<template>
  <div class="menu-cont">
    <div class="menu-item" v-for="(item,index) in catalogList" :key="index" @click.stop="jump(item.path)">
      <el-tooltip effect="dark" :content="item.title" placement="left">
        <el-image class="img" :src="item.src" fit="cover"></el-image>
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
  width: 60px;
  height: 65px;
  position: relative;
  .img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    @include contSize(50px,50px);
    border-radius: 12px;
    transition: .3s;
    &:hover{
      @include contSize(60px,60px);
    }
  }
}
</style>
