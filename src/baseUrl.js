let baseUrl = ''
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'http://localhost:3000/api/' // 开发环境
    break
  case 'production':
    baseUrl = 'http://118.24.125.76/api/'
    break
}
export default baseUrl
