<template>
  <div class="login-wrap">
    <el-form v-model="form" label-width="auto" class="login-wrap-form">
      <el-form-item label="账号">
        <el-input v-model="form.loginNum" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="warning" @click="region">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { apiLogin } from '../../api/index'
export default {
  data () {
    return {
      form: {
        loginNum: 'admin',
        password: 'admin'
      }
    }
  },
  methods: {
    login () {
      apiLogin(this.form).then(res => {
        if (res.msg === '成功') {
          sessionStorage.setItem('userInfo', JSON.stringify(res.data))
          this.$router.push({
            path: '/'
          })
        }
      })
    },
    region () {
      this.$message({
        message: '暂未开放',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-form-item:last-child{
    display: flex;
    justify-content:center;
    margin-left: -20px;
  }
  .login-wrap-form {
    width: 400px;
    padding: 40px 20px 20px;
    box-shadow: 0px 0px 10px #888888;
    border-radius: 6px;
  }
}
</style>
