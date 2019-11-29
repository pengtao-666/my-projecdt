<template>
   <div class="container">
      <div class="left-cont" :class="zoom?'active':''">
        <menu-circle />
      </div>
      <div class="right-cont" :class="zoom?'active':''">
        <router-view />
      </div>
        <!-- <p>id:{{userInfo.id}}</p> -->
        <!-- <p>账号:{{userInfo.loginNum}}</p> -->
        <!-- <p>密码:{{userInfo.password}}</p> -->
        <!-- <p>用户名:{{userInfo.userName}}</p> -->
   </div>
</template>

<script>
import menuCircle from 'com/menuCircle'
export default {
  components: {
    menuCircle
  },
  data () {
    return {
      zoom: false,
      userInfo: {}
    }
  },
  beforeCreate () {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  // 容器宽高
  @mixin contSize($w,$h){
    width: $w;
    height: $h;
  }
  // 对其方式
  @mixin flex_align($content,$item){
    display: flex;
    justify-content: $content;
    align-items: $item;
  }
  .container{
    width: 100%;
    height: 100vh;
    background-color: #232323;
    @mixin contStyle{
      display: inline-block;
      transition: .3s;
      height: 100%;
    }
    // 最左侧容器
    .left-cont{
      @include contStyle;
      left: 0;
      position: fixed;
      &:hover{
        z-index: 999;
      }
    }
    .right-cont{
      @include contStyle;
      overflow: auto;
      width:100%;
      padding: 40px;
      &.active{
        width:calc(100% - 20px);
      }
      // background-image: url('../../assets/img/bg.png');
      background-size: 100% 100%;
    }
  }
</style>
