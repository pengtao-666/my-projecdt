/*
 * @Date: 2020-04-14 19:17:01
 * @LastEditTime: 2020-04-26 20:35:39
 * @Description: element按需引入
 */
// 导入自己需要的组件
import {
  Message,
  Select,
  Option,
  Input,
  Dialog,
  Row, Col,
  Image,
  Button,
  Form, FormItem,
  Loading,
  Upload,
  Table, TableColumn,
  Pagination,
  Menu, MenuItem,
  Popover,
  MessageBox,
  Tooltip
} from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.prototype.$message = Message
    Vue.prototype.$prompt = MessageBox.prompt
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.use(Tooltip)
    Vue.use(Popover)
    Vue.use(MenuItem)
    Vue.use(Menu)
    Vue.use(Pagination)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Upload)
    Vue.use(Loading)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Input)
    Vue.use(Dialog)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Image)
    Vue.use(Button)
  }
}
export default element
