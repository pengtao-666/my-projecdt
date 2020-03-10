<template>
  <div>
    <div class="cards">
      <div class="card" :class="current==index?'card-hover':''" @click="cardClick(index)" v-for="(item,index) in albums" :key="index" :style="'left:'+index*(100/6)+'px'">
        <el-image class="img" :src="item.img" fit="contain" alt=""/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      current: null,
      albums: [
        { img: require('@/assets/img/l1.jpg') },
        { img: require('@/assets/img/l2.jpg') },
        { img: require('@/assets/img/l3.jpg') },
        { img: require('@/assets/img/l4.jpg') },
        { img: require('@/assets/img/ll.jpeg') }
      ]
    }
  },
  methods: {
    cardClick (i) {
      if (this.current === i) {
        this.current = null
      } else {
        this.current = i
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin absolute{
  position: absolute;
  left: 0;
  top: 0;
}
.cards{
  transform-style: preserve-3d;
  width: 100%;
}
.card{
  @include absolute;
  width: 300px;
  transform: rotateX(-10deg) rotateY(50deg);
  transform-origin: center top;/*以顶部中心为定点摇动*/
  transition: .7s;
  cursor: pointer;
  &:hover{
    .img{
      top: 30px;
      left: -50px;
    }
  }
}
.card .img{
  @include absolute;
  // width: 100%;
  height: 300px;
  // border: 1px solid #ccc;
  // color: #ccc;
  // background: #fff;
  text-align: center;
  font-size: 12px;
  animation: randomswing 1s 1.1s infinite linear alternate;
  transition: .5s;
}
.card:nth-of-type(even) .img{
  animation: randomswing 1.5s 1.3s infinite linear alternate;
}
.card-hover{
  z-index: 1;
  transform: translateY(10px) translateX(-90%);
  left: 50%!important;
  &:hover{
    .img{
      top: 0;
      left: 0;
    }
  }
}
.card-hover .img{
  width: 200%;
  animation-play-state: paused!important;
}
@keyframes randomswing {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(20deg);
  }
}
</style>
