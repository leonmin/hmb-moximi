<script>
export default {
  props: {
    // 表头配置和数据
    options: {
      type: Object,
      default: () => ({
        data: [], // 数据
        total: 0, // 数量
        size: 10,
        props: {}, // 表格配置
        columns: [] // 表头配置
        // pagination: {} // 分页配置
      })
    },
    // 当前分页
    page: {
      type: Number,
      default: 1
    },
    pagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      defTable: {
        'highlight-current-row': true,
        border: true
      },
      defColumn: {
        'show-overflow-tooltip': true
      },
      defPagination: {
        total: 0,
        background: true,
        layout: 'total, prev, pager, next',
        // 'page-size': this.pagination ? this.options.size || 10 : 999,
        'hide-on-single-page': false
      }
    }
  },
  computed: {
    currentPage() {
      return this.page
    }
  },
  methods: {
    handleCurrentChange(e) {
      this.$emit('update:page', e)
      this.$emit('on-change', e)
    },
    handleSizeChange(e) {
      this.$emit('size-change', e)
    },
    handlePage(h) {
      return this.pagination
        ? h('el-pagination', {
            props: {
              ...this.defPagination,
              ...(this.options.pagination || {}),
              total: this.options.total || 0,
              'page-size': this.pagination ? this.options.size || 10 : 999,
              'current-page': this.currentPage
            },
            on: {
              'size-change': e => this.handleSizeChange(e),
              'current-change': e => this.handleCurrentChange(e)
            }
          })
        : h('div', '')
    }
  },
  render(h) {
    const $columns = []

    this.options.columns.forEach((col, cidx) => {
      const props = {
        props: { ...this.defColumn, ...col }
      }
      if (col.render) {
        props.scopedSlots = { default: scope => col.render(h, scope) }
      }
      const $column = h('el-table-column', {
        ...props
      })
      $columns.push($column)
    })

    return h(
      'div',
      {
        class: 'mo-table'
      },
      [
        h('div', { class: 'mo-table-head' }, [
          h(
            'el-table',
            {
              props: {
                data: this.options.data,
                ...this.defTable,
                ...(this.options.props || {})
              }
            },
            $columns
          )
        ]),
        h(
          'div',
          {
            class: 'mo-table-foot'
          },
          [this.handlePage(h)]
        )
      ]
    )
  }
}
</script>
<style lang="scss">
.mo-table-desc {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
  // .mo-table-lead {
  // }
  // .mo-table-more {
  // }
}
.mo-table {
  .mo-table-foot {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .el-pagination {
      margin: 20px 0 10px;
    }
  }
}
</style>
