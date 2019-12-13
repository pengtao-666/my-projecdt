import { Message } from 'element-ui'
let utils
export default utils = {
  jump_query: (_this, url, data) => {
    _this.$router.push({
      path: url,
      query: data
    })
  },
  message: (title, type = 'info') => {
    Message({
      message: title,
      type: type
    })
  }
}

// module.exports = utils
