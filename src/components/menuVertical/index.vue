<template>
    <div class="left-cont-menu">
          <div class="left-cont-menu-hd">
            <div @mouseenter="menuMove(item)" v-for="(item,index) in [1,2,3,4]" :key="index" :class="item==menuActive?'active':''"></div>
          </div>
          <div class="left-cont-menu-bd">
            <div v-for="(item,index) in [1,2,3,4]" :key="index" :class="item==menubdActive?'active':''"></div>
          </div>
        </div>
</template>

<script>
export default {
  data () {
    return {
      menuActive: 0,
      menubdActive: null
    }
  },
  methods: {
    menuMove (val) {
      this.menuActive = val
      this.menubdActive = val
    },
    menuMoveOut () {
      this.menuActive = null
      this.menubdActive = null
    }
  }
}
</script>

<style lang="scss" scoped>
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
// 定位居中
  @mixin absolute_align($l,$t,$x,$y){
    position: absolute;
    left: $l;
    top: $t;
    transform: translate($x,$y);
  }
      .left-cont-menu{
        z-index: 99999;
        @include absolute_align(50%,50%,-50%,-50%);
        .left-cont-menu-hd{
          @include flex_align(space-around,center);
          flex-direction: column;
          height: 200px;
          div{
            @include contSize(25px,25px);
            border: 5px solid #1d96fd;
            border-radius: 50%;
            transition: .3s;
            &.active{
              background: #1effb9;
            @include contSize(30px,30px);
            }
          }
        }
        .left-cont-menu-bd{
          @include absolute_align(150%,50%,0,-50%);
          @include flex_align(space-around,center);
          flex-direction: column;
          height: 200px;
          div{
            @include contSize(110px,40px);
            border-radius: 6px;
            background: #fff;
            transition: .7s;
            opacity: 0;
            margin-left: -30px;
            &.active{
              opacity: 1;
              // transition: .7s;
              margin-left: 10px;
            }
          }
        }
      }
</style>
