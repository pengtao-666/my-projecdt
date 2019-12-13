<template>
  <div class="templateCont">
    <el-row :gutter="20">
      <el-col :span="5" class="search">
        <el-select style="width:100%" v-model="listQuery.categoryId" clearable placeholder="请选择文章分类">
          <el-option v-for="(item,index) in categoryArr" :key="index" :label="item.categoryName" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" class="search">
        <el-input v-model="listQuery.title" clearable placeholder="请输入搜索标题"></el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="getTableList">搜索</el-button>
      </el-col>
    </el-row>
      <el-col class="table">
        <customTable v-loading="loading" :height="600" :tableHead="tableHead" :tableData="tableData" />
        <pagination
         v-show="tableTotal>0"
        :total="tableTotal"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pageSize"
        @pagination="getTableList" />
      </el-col>
  </div>
</template>

<script>
import customTable from '@/components/customTable/index'
import pagination from '@/components/pagination/index'
import { getArtcle, deleteArticle, getCategory } from '@/api/article'
import utils from '@/utils/index'
export default {
  components: {
    customTable,
    pagination
  },
  data () {
    return {
      listQuery: {
        title: '',
        categoryId: '',
        page: 1,
        pageSize: 10
      },
      loading: false,
      tableTotal: 0,
      tableHead: [
        { prop: 'id', label: 'ID', width: 70, fixed: 'left' },
        { prop: 'title', label: '标题' },
        { prop: 'author', label: '作者' },
        { prop: 'categoryName', label: '分类' },
        { prop: 'src', label: '封面', scope: (row) => { return (<div>{<el-image src={row.src} preview-src-list={[row.src]} style="width:100px" />}</div>) } },
        { prop: 'createDate', label: '日期' },
        { label: '操作',
          fixed: 'right',
          scope: (row) => {
            return (<div>
              {<el-button type='primary' plain size="mini" onClick={() => this.see(row)}>查看</el-button>}
              {<el-button type='primary' plain size="mini" onClick={() => this.edit(row)}>编辑</el-button>}
              {<el-button type='danger' plain size="mini" onClick={() => this.delete(row)}>删除</el-button>}</div>)
          } }
      ],
      tableData: [],
      categoryArr: []
    }
  },
  async mounted () {
    this.getTableList()
    this.categoryArr = await this.getCategoryArr({ type: 0 })
  },
  methods: {
    getCategoryArr (data) {
      return new Promise((resolve, reject) => {
        getCategory(data).then(res => {
          resolve(res.data)
        })
      })
    },
    getTableList () {
      this.loading = true
      getArtcle(this.listQuery).then(res => {
        this.tableData = res.data.list
        this.tableTotal = res.data.total
        this.loading = false
      })
    },
    see (row) {
      utils.jump_query(this, '/article/details', { id: row.id })
    },
    edit (row) {
      utils.jump_query(this, '/article/edit', { id: row.id })
    },
    delete (row) {
      deleteArticle({ id: row.id }).then(res => {
        this.getTableList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .search{
    display: flex;
  }
  .table{
    margin-top:40px;
    background:#fff;
    border-radius:6px;
    overflow: hidden;
  }
</style>
