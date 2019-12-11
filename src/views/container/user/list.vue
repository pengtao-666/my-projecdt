<template>
  <div class="templateCont">
    <div class="table-cont">
      <div class="table-cont-head">
        <el-button class="pop-add" type="primary" @click="dialogFormVisible = true">添加</el-button>
        <h4 class="title">用户列表</h4>
        <el-button class="pop-del" type="danger" @click="deleteUsers">删除</el-button>
      </div>
      <div class="table-cont-body">
        <el-table v-loading="loading" @selection-change="selectionChange" :data="tableData" border style="width: 100%">
          <el-table-column type="selection" width="100" align="center"></el-table-column>
          <el-table-column prop="userName" label="账号" width align="center"></el-table-column>
          <el-table-column prop="name" label="名称" width align="center"></el-table-column>
          <el-table-column label="身份" width align="center">
            <template slot-scope="scope">{{scope.row.status==1?'管理员':'用户'}}</template>
          </el-table-column>
          <el-table-column prop="createDate" label="更新时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="rowClick(scope.row)">编辑</el-button>
              <el-button type="warning" @click="deleteUser(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog @closed="dialogClose" :title="dialogLabel==1?'编辑账号':'添加账号'" width="500px" :visible.sync="dialogFormVisible">
        <el-form :model="userInfo" label-width="60px">
          <el-form-item label="用户名">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item v-if="dialogLabel==0" label="账号">
            <el-input v-model="userInfo.userName"></el-input>
          </el-form-item>
          <el-form-item v-if="dialogLabel==0" label="密码">
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
      if (this.userInfo.userName === undefined || this.userInfo.userName === '') {
        this.message('账号不能为空', 'warning')
        return
      }
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
            if (res.code === 201) {
              this.message(res.msg, 'warning')
            } else {
              this.message(res.msg, 'success')
              this.dialogFormVisible = false
            }
          })
      }
    },
    message (title, type = 'info') {
      this.$message({
        message: title,
        type: type
      })
    },
    deleteUsers () {
      this.deleteUser(this.ids)
    },
    // 删除
    deleteUser (id) {
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let uid = JSON.parse(sessionStorage.getItem('userInfo')).uid
          apiDeleteUser({ ids: id, uid: uid })
            .then(res => {
              if (res.code === 201) {
                this.message(res.msg, 'warning')
              } else {
                this.message(res.msg, 'success')
                this.getList()
              }
            })
        })
        .catch(() => {})
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
.templateCont{
  background: #fff;
  height: 100%;
}
.table-cont {
  .table-cont-head {
    display: flex;
    justify-content: space-between;
    color: #333;
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
