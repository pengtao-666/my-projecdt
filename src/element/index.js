/*
 * @Date: 2020-04-14 19:17:01
 * @LastEditTime: 2020-04-25 15:32:05
 * @Description: element按需引入
 */
// 导入自己需要的组件
import {
  Message,
  Select,
  Option, OptionGroup,
  Input,
  Tree,
  Dialog,
  Row, Col,
  Carousel,
  Image,
  Header,
  InfiniteScroll,
  Button,
  Container,
  CarouselItem,
  Footer,
  Tabs, TabPane,
  Form, FormItem,
  DatePicker,
  Loading,
  Upload,
  RadioGroup, RadioButton,
  Radio,
  Table, TableColumn,
  Pagination,
  Breadcrumb, BreadcrumbItem,
  Menu, MenuItem,
  Submenu,
  Switch,
  Popover
} from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.prototype.$message = Message
    Vue.use(Popover)
    Vue.use(Switch)
    Vue.use(Submenu)
    Vue.use(MenuItem)
    Vue.use(Menu)
    Vue.use(BreadcrumbItem)
    Vue.use(Breadcrumb)
    Vue.use(Radio)
    Vue.use(Pagination)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(RadioButton)
    Vue.use(RadioGroup)
    Vue.use(Upload)
    Vue.use(Loading)
    Vue.use(DatePicker)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(OptionGroup)
    Vue.use(Input)
    Vue.use(Tree)
    Vue.use(Dialog)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Carousel)
    Vue.use(Image)
    Vue.use(Button)
    Vue.use(CarouselItem)
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.use(InfiniteScroll)
  }
}
export default element
