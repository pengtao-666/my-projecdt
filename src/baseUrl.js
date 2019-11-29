let baseUrl = ''
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'http://localhost:3000/api/' // 开发环境
    break
  case 'production':
    baseUrl = 'http://www.pt66.xyz/api/'
    break
}
export default baseUrl
