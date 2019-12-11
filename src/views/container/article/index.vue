<template>
  <div class="templateCont">
    <el-row class="nav_category">
      <el-col :span="16" class="nav_category_list">
        <p @click="categoryChange(item.id)" v-for="(item,index) in categoryArr" :key="index" :class="categoryType==item.id?'active':''">{{item.categoryName}}</p>
      </el-col>
      <el-col :span="5">
        <el-input clearable placeholder="请输入搜索内容" v-model="listQuery.title" class="input-with-select">
          <el-button @click="getArtcleList" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button class="add_article" @click="jump('/article/publish')" type="primary">写文章</el-button>
      </el-col>
    </el-row>
    <el-row class="cont">
      <el-col :span="18" class="left_list" >
        <router-view v-loading="listLoading" :artcleList="artcleList" />
          <pagination
          v-show="tableTotal>0 && $route.path == '/article'"
          :total="tableTotal"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.pageSize"
          @pagination="getArtcleList" />
        <p v-if="artcleList.length<1" style="text-align:center;margin-top:20px;">暂无数据~</p>
      </el-col>
      <el-col :span="6" class="right_label">
        <h4>常用标签</h4>
        <div class="label-cont">
          <p class="label-text" :class="listQuery.subclassId==item.id?'active':''" v-for="item in subclassArr" :key="item.id" @click='categoryChange(categoryType,item.id)'>{{item.subclassName}}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCategory, getArtcle, searchArtcle } from '@/api/article'
import pagination from '@/components/pagination/index'
export default {
  components: {
    pagination
  },
  data () {
    return {
      listLoading: false,
      categoryArr: [],
      categoryType: 0,
      subclassArr: [],
      artcleList: [],
      listQuery: {
        categoryId: null,
        subclassId: null,
        title: '',
        page: 1,
        pageSize: 10
      },
      tableTotal: 0
    }
  },
  mounted () {
    if (this.$store.getters.getCategoryId) {
      let id = Number(this.$store.getters.getCategoryId)
      this.listQuery.categoryId = id
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
      if (this.listQuery.categoryId === 0) {
        this.listQuery.categoryId = null
      }
      getArtcle(this.listQuery).then(res => {
        this.listLoading = false
        this.artcleList = res.data.list
        this.tableTotal = res.data.total
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
      this.listQuery.categoryId = cid
      this.listQuery.subclassId = sid
      this.listQuery.page = 1
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
          &.active{
            background: #007fff;
            color: #fff;
          }
        }
      }
    }
  }
</style>
