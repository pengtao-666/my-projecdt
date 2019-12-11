<template>
   <div class="container">
     <div class="right-cont">
        <router-view />
      </div>
      <div class="left-cont">
        <menu-Vertical :catalogList="catalogList" />
      </div>

   </div>
</template>

<script>
import menuVertical from 'com/menuVertical'
export default {
  components: {
    menuVertical
  },
  data () {
    return {
      userInfo: {},
      catalogList: [
        { title: '主页', path: '/' },
        { title: '文章管理', path: '/article/manage' },
        { title: '相册', path: '/album' },
        { title: '账号管理', path: '/userList' },
        { title: '注销', path: '/login' }
      ]
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
    background: url("../../assets/img/bg.jpg") 0 / cover fixed;
    overflow: hidden;
    @include flex_align(space-between,center);
    @mixin contStyle{
      display: inline-block;
      height: 100%;
    }
    // 最左侧容器
    .left-cont{
      @include contStyle;
      @include contSize(85px,auto);
      min-height: 50%;
      max-height: 80%;
      position: relative;
      overflow:hidden;
      overflow-y: auto;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      z-index: 1;
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
      &::before{
        content: '';
        position: absolute;
        top:0;right:0;bottom:0;left:0;
        z-index: -1;
        background: url("../../assets/img/bg.jpg") 0 / cover fixed;
        filter: blur(5px);
        margin:0 -10px;
      }
    }
    .right-cont{
      @include contStyle;
      overflow: auto;
      width:calc(100% - 85px);
    }
  }
</style>
