/* eslint-disable camelcase */
import api from '../axios'

export const apiLogin = params => api.fetchPost('/login', params)
export const apiuserList = params => api.fetchGet('/userList', params)
