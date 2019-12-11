<template>
    <el-table
      max-height="600"
      :height="height"
      :data="tableData"
      :show-summary="showSummary"
      :header-cell-style="tableHeaderColor"
      style="width: 100%">
      <div v-for="(item,index) in tableHead" :key="index">
        <el-table-column v-if="!item.scope" :prop="item.prop" :width="item.width" :fixed="item.fixed" align="center">
          <template slot="header">{{item.label}}</template>
        </el-table-column>
        <el-table-column v-else :label="item.label" :width="item.width" :fixed="item.fixed" align="center">
          <template slot-scope="scope">
            <row-view :row="scope.row" :render="item.scope"></row-view>
          </template>
        </el-table-column>
      </div>
    </el-table>
</template>

<script>
export default {
  components: {
    rowView: {
      functional: true,
      render: function (h, ctx) {
        const { row } = ctx.props
        return ctx.props.render(row)
      },
      props: {
        row: Object,
        render: Function
      }
    }
  },
  props: {
    height: {
      type: [Number, String],
      default: () => { return null }
    },
    tableData: {
      type: Array,
      default: () => { return [] }
    },
    tableHead: {
      type: Array,
      default: () => { return [] }
    },
    // 是否显示合计
    showSummary: {
      type: Boolean,
      default: () => { return false }
    },
    listQuery: {
      type: Object,
      default: () => { return null }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    tableHeaderColor: function ({ row, column, rowIndex, columnIndex }) {
      return 'background-color: #409EFF;color: #fff;height:50px;font-size:16px;'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
