<template>
<div class="container">
  <el-page-header @back="goBack" :content="artcleInfo.title">
  </el-page-header>
  <div class="ql-container ql-snow">
    <div class="head">
      <h1>{{artcleInfo.title}}</h1>
    <p><span>{{artcleInfo.author}}</span> <span>{{artcleInfo.createDate}}</span></p>
    </div>
    <div class="ql-editor" v-html="artcleInfo.content"></div>
  </div>
</div>
</template>

<script>
import * as Quill from 'quill'
import { getArtcleDetails } from '@/api/article'
export default {
  data () {
    return {
      artcleInfo: {}
    }
  },
  mounted () {
    let id = this.$route.query.id
    getArtcleDetails({ id: id }).then(res => {
      this.artcleInfo = res.data
    })
  },
  methods: {
    goBack () {
      this.$router.push({
        path: '/article'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    padding: 12px 24px;
  }
  .ql-container.ql-snow{
    border: 0;
  }
  .head{
    h1{
      text-align: center;
      color: #333;
    }
    p{
      text-align: center;
      color: #909090;
      margin-bottom: 10px;
    }
  }
</style>
