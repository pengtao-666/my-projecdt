<template>
  <div class="container">
    <div class="list_info" @click="jump(item.id)" v-for="(item,index) in artcleList" :key="index">
      <div>
        <p class="title">
          <span>{{item.subclassName}}</span>
          <!-- <span>{{item.subclassName}}</span> -->
          {{item.title}}
        </p>
        <div>
          <p>{{item.author}}</p>
          <p>{{item.createDate}}</p>
        </div>
      </div>
      <el-image
        style="width: 90px; height: 90px"
        :src="item.src?item.src:src"
        fit="fill"
      ></el-image>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    artcleList: {
      type: Array
    }
  },
  data () {
    return {
      src: require('@/assets/img/3.jpg')
    }
  },
  methods: {
    jump (e, categoryId) {
      this.$router.push({
        path: '/article/details',
        query: { id: e }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  cursor: pointer;
  @mixin between {
    display: flex;
    justify-content: space-between;
  }
  .list_info {
    &:hover {
      background: rgba(0, 0, 0, 0.01);
    }
    padding: 18px 24px;
    border-bottom: 1px solid rgba(178, 186, 194, 0.15);
    color: #2e3135;
    @include between;
    @mixin font_style($h, $fz, $c: #2e3135) {
      height: $h;
      line-height: $h;
      font-size: $fz;
      color: $c;
    }
    div {
      @include between;
      flex-direction: column;
    }
    .title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
      span {
        display: inline-block;
        @include font_style(28px, 14px);
        padding: 0 12px;
        border-radius: 3px;
        font-weight: normal;
        &:first-child {
          background: #007fff;
          color: #fff;
        }
        // &:last-child {
        //   @include font_style(24px, 13px);
        //   color:#007fff;
        // }
      }
    }
  }
}
</style>
