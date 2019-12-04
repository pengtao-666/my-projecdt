/* eslint-disable camelcase */
import api from '../axios'
// 注册
export const apiRegister = params => api.fetchPost('/register', params)
// 登录
export const apiLogin = params => api.fetchPost('/login', params)
// 获取用户列表
export const apiuserList = params => api.fetchGet('/userList', params)
// 删除用户
export const apiDeleteUser = data => api.fetchPost('/deleteUser', data)
// 更改
export const apiUpdateUser = data => api.fetchPost('/updateUser', data)
