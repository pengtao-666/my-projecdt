<template>
<div class="container">
  <el-page-header @back="goBack" :content="artcleInfo.categoryName+'-'+artcleInfo.subclassName?artcleInfo.subclassName:''">
  </el-page-header>
  <div class="ql-container ql-snow" v-loading="loading">
    <div class="head">
      <h1>{{artcleInfo.title}}</h1>
    <p><span>{{artcleInfo.author}}</span> <span>{{artcleInfo.createDate}}</span></p>
    </div>
    <div class="ql-editor" v-html="artcleInfo.content"></div>
  </div>
</div>
</template>

<script>
// import * as Quill from 'quill'
import { getArtcleDetails } from '@/api/article'
export default {
  data () {
    return {
      artcleInfo: {},
      loading: false
    }
  },
  mounted () {
    let id = this.$route.query.id
    this.loading = true
    getArtcleDetails({ id: id }).then(res => {
      this.loading = false
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
    margin-top: 20px;
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
  .ql-editor{
    border: 1px solid #c9c6c6;
    border-radius: 6px;
  }
</style>
