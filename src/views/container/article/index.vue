<template>
  <div class="templateCont">
    <el-row class="nav_category">
      <el-col :span="16" class="nav_category_list">
        <p @click="categoryChange(item.id)" v-for="(item,index) in categoryArr" :key="index" :class="categoryType==item.id?'active':''">{{item.categoryName}}</p>
      </el-col>
      <el-col :span="5">
        <el-input clearable placeholder="请输入搜索内容" v-model="title" class="input-with-select">
          <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button class="add_article" @click="jump('/article/publish')" type="primary">写文章</el-button>
      </el-col>
    </el-row>
    <el-row class="cont">
      <el-col :span="18" class="left_list">
        <router-view v-loading="listLoading" :artcleList="artcleList" />
        <p v-if="artcleList.length<1" style="text-align:center;margin-top:20px;">暂无数据~</p>
      </el-col>
      <el-col :span="6" class="right_label">
        <h4>常用标签</h4>
        <div class="label-cont">
          <p class="label-text" v-for="item in subclassArr" :key="item.id" @click='categoryChange(item.categoryId,item.id)'>{{item.subclassName}}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCategory, getArtcle, searchArtcle } from '@/api/article'
export default {
  data () {
    return {
      title: '',
      listLoading: false,
      categoryArr: [],
      categoryType: 0,
      subclassArr: [],
      artcleList: [],
      categoryIds: {
        categoryId: null,
        subclassId: null
      }
    }
  },
  mounted () {
    if (this.$store.getters.getCategoryId) {
      let id = Number(this.$store.getters.getCategoryId)
      this.categoryIds.categoryId = id
      this.categoryType = id
    }
    this.getCategoryList({ type: 0 })
    this.getCategoryList({ type: 1, categoryId: this.categoryType })
    this.getArtcleList()
  },
  methods: {
    // 获取分类
    getCategoryList (data) {
      getCategory(data).then(res => {
        if (data.type === 0) {
          res.data.unshift({ id: 0, categoryName: '首页' })
          this.categoryArr = res.data
        } else {
          res.data.unshift({ subclassName: '全部', categoryId: this.categoryType })
          this.subclassArr = res.data
        }
      })
    },
    getArtcleList () {
      this.listLoading = true
      if (this.categoryIds.categoryId === 0) {
        this.categoryIds.categoryId = null
      }
      getArtcle(this.categoryIds).then(res => {
        this.listLoading = false
        this.artcleList = res.data
      })
    },
    search () {
      if (this.$route.path !== '/article') {
        this.jump('/article')
      }
      this.listLoading = true
      searchArtcle({ title: this.title }).then(res => {
        this.categoryType = 0
        this.artcleList = res.data
        this.listLoading = false
      })
    },
    jump (url, id) {
      this.$router.push({
        path: url,
        query: { id: id }
      })
    },
    categoryChange (cid, sid) {
      if (this.$route.path !== '/article') {
        this.jump('/article', cid)
      }
      this.$store.commit('handleCategoryId', cid)
      this.categoryType = cid
      this.categoryIds.categoryId = cid
      this.categoryIds.subclassId = sid
      this.getArtcleList()
      this.getCategoryList({ type: 1, categoryId: this.categoryType })
    }
  }
}
</script>

<style lang="scss" scoped>
.templateCont{
  background: #fff;
  height: 100%;
  padding: 0;
}
  .nav_category{
    border-bottom: 1px solid #f1f1f1;
    padding:15px;
    .el-col{
      height: 40px;
      line-height: 40px;
      color: #71777c;
      .add_article{
        margin-left: 50px
      }
    }
    .nav_category_list{
      display: flex;
      p{
        display: inline-block;
        padding: 0 18px;
        height: 100%;
        cursor: pointer;
        &.active{
          color: #007fff;
        }
      }
    }
  }
  .cont {
    background: #f4f5f5;
    height: calc(100% - 71px);
    padding: 20px 50px;
    display: flex;
    .el-col{
      background: #fff;
    }
    .left_list{
      margin-right: 10px;
      height: 100%;
      overflow: auto;
    }
    .right_label{
      padding: 20px;
      .label-cont{
        // display: flex;
        // flex-wrap: wrap;
        .label-text{
          margin-top: 10px;
          margin-right: 10px;
          display: inline-block;
          padding: 0 12px;
          height: 36px;
          line-height: 36px;
          border-radius: 3px;
          color: #71777c;
          background: #f4f5f5;
          cursor: pointer;
        }
      }
    }
  }
</style>
