<template>
  <div class="templateCont">
    <el-row :gutter="20">
      <el-col>
        <el-col :span="17">
          <el-button type="primary" @click="registerDialog = true">添加账号</el-button>
        </el-col>
        <el-col :span="5"><el-input v-model="listQuery.userName" clearable placeholder="请输入要搜索账号"></el-input></el-col>
        <el-col :span="2"><el-button style="width:100%;" type="primary" icon="el-icon-search" @click="search">搜索</el-button></el-col>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="table">
        <customTable v-loading="loading" :tableHead="tableHead" :tableData="tableData" :height="550" />
        <pagination
         v-show="tableTotal>0"
        :total="tableTotal"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pageSize"
        @pagination="getList" />
      </el-col>
    </el-row>
    <el-dialog width="30%" :visible.sync="registerDialog" :close-on-click-modal='false' >
      <el-form :model="register" :rules="rules" label-width="80px" ref="ruleForm" >
        <el-form-item label="账号" prop="userName">
          <el-input v-model="register.userName" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="register.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="register.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { apiuserList, apiDeleteUser, apiRegister, apiUpdateUser } from '@/api'
import { parseTime } from '@/utils/date'
import utils from '@/utils/index'
import customTable from '@/components/customTable'
import pagination from '@/components/pagination'
export default {
  components: {
    customTable,
    pagination
  },
  data () {
    return {
      registerDialog: false,
      tableTotal: 0,
      register: {
        userName: '',
        password: '',
        name: ''
      },
      rules: {
        userName: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
      },
      listQuery: {
        page: 1,
        pageSize: 10
      },
      tableHead: [
        { prop: 'id', label: 'ID', width: 70, fixed: 'left' },
        { prop: 'userName', label: '账号' },
        { prop: 'name', label: '用户名' },
        { prop: 'status', label: '权限', scope: (row) => { return (<div>{row.status === 0 ? '用户' : '管理员'}</div>) } },
        { prop: 'createDate', label: '日期' },
        { label: '操作',
          fixed: 'right',
          scope: (row) => {
            return (<div>
              {<el-button type='danger' plain size="mini" onClick={() => this.delete(row)}>删除</el-button>}</div>)
          } }
      ],
      tableData: [],
      loading: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          apiRegister(this.register).then(res => {
            if (res.code !== 200) return utils.message(res.msg, 'warning')
            utils.message(res.msg, 'success')
            this.getList()
            this.registerDialog = false
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    search () {
      this.listQuery.page = 1
      this.getList()
    },
    // 获取用户列表
    getList () {
      this.loading = true
      apiuserList(this.listQuery).then(res => {
        this.tableData = res.data.list
        this.tableTotal = res.data.total
        this.tableData.forEach(item => {
          item.createDate = parseTime(item.createDate, '{y}-{m}-{d}')
        })
        this.loading = false
      })
    },
    delete (row) {
      let uid = JSON.parse(sessionStorage.getItem('userInfo')).uid
      this.$confirm('此操作将删除该账号，是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        apiDeleteUser({ uid: uid, ids: [row.id] }).then(res => {
          if (res.code !== 200) return utils.message(res.msg, 'warning')
          utils.message(res.msg, 'success')
          this.getList()
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.templateCont{
  // background: #fff;
  height: 100%;
}
.table{
    margin-top:40px;
    background:#fff;
    border-radius:6px;
    overflow: hidden;
  }
</style>
