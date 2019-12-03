<template>
  <div class="templateCont">
    <div class="table-cont">
      <div class="table-cont-head">
        <el-button class="pop-add" type="primary">添加</el-button>
        <h4 class="title">用户列表</h4>
        <el-button class="pop-del" type="danger">删除</el-button>
      </div>
      <div class="table-cont-body">
        <el-table v-loading="loading" @row-click="rowClick" :data="tableData" border style="width: 100%">
          <el-table-column type="selection" width="100" align="center"></el-table-column>
          <el-table-column prop="loginNum" label="账号" width align="center"></el-table-column>
          <el-table-column prop="userName" label="名称" width align="center"></el-table-column>
          <el-table-column prop="date" label="更新时间" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { apiuserList } from '@/api'
import { parseTime } from '@/utils/date'
export default {
  data () {
    return {
      tableData: [],
      loading: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    rowClick (row, event, column) {
    },
    getList () {
      this.loading = true
      apiuserList().then(res => {
        this.tableData = res.data
        this.tableData.forEach(item => {
          item.date = parseTime(item.date, '{y}-{m}-{d}')
        })
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-cont {
  .table-cont-head {
    display: flex;
    justify-content: space-between;
    color: #fff;
    .pop-add {
      border-radius: 0 0 12px 0;
    }
    .pop-del {
      border-radius: 0 0 0 12px;
    }
  }
  .table-cont-body{
    padding: 30px;
  }
}
</style>
