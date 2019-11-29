<template>
    <div class="circle" @mouseenter="circleEnter" @mouseleave="circleLeave" :class="circleActive?'active':''">
        <div class="circle-cont" @click="openStatus=!openStatus">{{openStatus?'收起':'展开'}}
          <div class="catalog" @click.stop="jump(item.path)" :class="openStatus?'active':''" v-for="(item,index) in catalogList" :key="index">
            <div class="catalog-logo"></div>
            <p class="catalog-title">{{item.title}}</p>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      openStatus: false,
      circleActive: false,
      circleOut: null,
      catalogList: [
        { title: '主页', path: '/' },
        { title: '用户列表', path: '/user' },
        { title: '相册', path: '/album' },
        { title: '标题四', path: '/user' },
        { title: '注销', path: '/login' }
      ]
    }
  },
  methods: {
    jump (val) {
      if (val === '/login') {
        sessionStorage.removeItem('userInfo')
      } else if (this.$route.path !== val) {
        this.$router.push({
          path: val
        })
      }
    },
    circleEnter () {
      this.circleActive = true
      clearTimeout(this.circleOut)
    },
    circleLeave () {
      this.circleOut = setTimeout(() => {
        this.circleActive = false
        this.openStatus = false
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
    @mixin position($l,$t,$x,$y){
        position: absolute;
        left: $l;
        top: $t;
        transform: translate($x,$y)
    }
    @mixin contSize($w,$h,$lh:normal,$bg:#ffffff00){
        width: $w;
        height: $h;
        line-height: $lh;
        background:$bg;
    }
    .circle{
        @include position(0,50% , -50%, -50%);
        @include contSize(100px, 100px);
        text-align: center;
        transition: .4s;
        display: flex;
        align-items: center;
        .circle-cont{
            @include contSize(100px, 100px,100px,#fff);
            border-radius: 50%;
            cursor: pointer;
            position: relative;
            .catalog{
              width: 0;
              display: flex;
              overflow: hidden;
              position: absolute;
              left: 100px;
              transition: .5s;
              &.active{
                width: 130px;
              }
              .catalog-logo{
                  @include contSize(30px, 30px,normal,#4480f0);
                  border-radius: 50%;
              }
              .catalog-title{
                  @include contSize(100px, 30px,30px);
                  display: block;
                  color: #fff;
                  border-bottom: 1px dashed #fff;
                  font-size: 14px;
                  background: #232323;
              }
              @mixin catalogPlace($x,$y){
                left: $x;
                top: $y;
              }
              &:nth-child(1){
                @include catalogPlace(55px,-50px)
              }
              &:nth-child(2){
                @include catalogPlace(105px,-10px)
              }
              &:nth-child(3){
                @include catalogPlace(135px,40px)
              }
              &:nth-child(4){
                @include catalogPlace(105px,90px)
              }
              &:nth-child(5){
                @include catalogPlace(55px,120px)
              }
            }
        }
        &.active{
            transform: translate(0,-50%);
            @include contSize(265px, 200px,normal);
            border-radius: 6px
        }
    }
</style>
