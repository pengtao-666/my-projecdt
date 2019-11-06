import axios from 'axios'
import qs from 'qs'

const Axios = axios.create({
  baseURL: 'http://localhost:8081/',
  timeout: 10000
})
// post 传参序列化（添加请求拦截器）
Axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  // console.log('错误的传参')
  return Promise.reject(error)
})
// 返回状态判断（添加响应拦截器）
Axios.interceptors.response.use((res) => {
  // console.log(res)
  if (!res.data.success) {
    return Promise.resolve(res)
  }
  return res
}, (error) => {
  // console.log('网络异常')
  return Promise.reject(error)
})

// 返回一个Promise(发送post请求)
export function fetchPost (url, params) {
  return new Promise((resolve, reject) => {
    Axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch(error => {
        reject(error)
      })
  })
}
// 返回一个Promise(发送get请求)
export function fetchGet (url, param) {
  return new Promise((resolve, reject) => {
    Axios.get(url, { params: param })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default {
  fetchPost,
  fetchGet
}
