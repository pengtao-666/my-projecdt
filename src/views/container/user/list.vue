<template>
  <div class="templateCont">
    <div class="table-cont">
      <div class="table-cont-head">
        <el-button class="pop-add" type="primary" @click="dialogFormVisible = true">添加</el-button>
        <h4 class="title">用户列表</h4>
        <el-button class="pop-del" type="danger" @click="deleteUser">删除</el-button>
      </div>
      <div class="table-cont-body">
        <el-table v-loading="loading" @row-click="rowClick" @selection-change="selectionChange" :data="tableData" border style="width: 100%">
          <el-table-column type="selection" width="100" align="center"></el-table-column>
          <el-table-column prop="userName" label="账号" width align="center"></el-table-column>
          <el-table-column prop="name" label="名称" width align="center"></el-table-column>
          <el-table-column prop="createDate" label="更新时间" align="center"></el-table-column>
        </el-table>
      </div>
      <el-dialog @closed="dialogClose" :title="dialogLabel==1?'编辑账号':'添加账号'" width="500px" :visible.sync="dialogFormVisible">
        <el-form :model="userInfo" label-width="60px">
          <el-form-item label="用户名">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="userInfo.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="userInfo.password" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { apiuserList, apiDeleteUser, apiRegister, apiUpdateUser } from '@/api'
import { parseTime } from '@/utils/date'
export default {
  data () {
    return {
      tableData: [],
      loading: false,
      ids: [],
      dialogFormVisible: false,
      userInfo: {},
      dialogLabel: 0
    }
  },
  created () {
    this.getList()
  },
  methods: {
    rowClick (row) {
      this.dialogLabel = 1
      this.dialogFormVisible = true
      this.userInfo = row
    },
    // 多选
    selectionChange (e) {
      this.ids = []
      e.forEach(item => { this.ids.push(item.id) })
    },
    // 添加/修改
    addUser () {
      if (this.dialogLabel === 0) {
        apiRegister(this.userInfo)
          .then(res => {
            if (res.code === 201) {
              this.message(res.msg, 'warning')
            } else {
              this.message(res.msg, 'success')
              this.getList()
              this.dialogFormVisible = false
            }
          })
      } else {
        apiUpdateUser(this.userInfo)
          .then(res => {
            this.dialogFormVisible = false
          })
      }
    },
    message (title, type = 'info') {
      this.$message({
        message: title,
        type: type
      })
    },
    // 删除
    deleteUser () {
      let userName = JSON.parse(sessionStorage.getItem('userInfo')).userName
      apiDeleteUser({ ids: this.ids, userName: userName })
        .then(res => {
          if (res.code === 201) {
            this.message(res.msg, 'warning')
          } else {
            this.message(res.msg, 'success')
            this.getList()
          }
        })
    },
    // 获取用户列表
    getList () {
      this.loading = true
      apiuserList().then(res => {
        this.tableData = res.data
        this.tableData.forEach(item => {
          item.createDate = parseTime(item.createDate, '{y}-{m}-{d}')
        })
        this.loading = false
      })
    },
    dialogClose () {
      this.userInfo = {}
      this.dialogLabel = 0
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
