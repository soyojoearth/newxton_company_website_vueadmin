<template>
  <div class="app-container">
    <el-row>
      <el-button
        type="primary"
        @click="handleCreate"
      >创建</el-button>
    </el-row>
    <el-card style="margin-top:10px">
      <el-table
        ref="multipleTable"
        :data="listData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" />
        <el-table-column
          prop="productName"
          label="标题"
        />
        <el-table-column
          prop="categoryName"
          label="类型"
          show-overflow-tooltip
        />
        <el-table-column label="日期">
          <template slot-scope="scope">{{ scope.row.datelineCreateReadable }}</template>
        </el-table-column>
        <el-table-column
          align="right"
          width="80"
        >
          <template slot-scope="scope">
            <el-col>
              <i
                class="el-icon-bottom"
                @click="handleSort(scope.$index, scope.row, 'bot')"
              />
              <i
                class="el-icon-top"
                @click="handleSort(scope.$index, scope.row, 'top')"
              />
            </el-col>
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="right"
          width="80"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="推荐"
          align="right"
          width="70"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isRecommend"
              :active-value="1"
              :inactive-value="0"
              @change="changeRecommend(scope.$index, scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-row
      type="flex"
      class="row-bg"
      justify="space-around"
      style="margin-top:20px"
    >
      <el-col :span="12">
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col
        :span="12"
        style="text-align:right"
      >
        <el-button
          type="primary"
          icon="el-icon-arrow-left"
          @click="handlePage(-1)"
        >上一页</el-button>
        <el-button>{{ listNumber }}</el-button>
        <el-button
          type="primary"
          icon="el-icon-arrow-right"
          @click="handlePage(1)"
        >下一页</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  data() {
    return {
      multipleSelection: []
    }
  },
  computed: {
    listData() {
      return this.$store.state.product.ListData
    },
    listNumber() {
      return this.$store.state.product.ListNumber
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$store.dispatch('product/getList')
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handlePage(page) {
      if (this.listNumber + page < 1) {
        return false
      }
      this.$store.commit('product/SET_LIST_NUMBER', this.listNumber + page)
      this.$store.dispatch('product/getList')
    },
    handleSort(index, row, pos) {
      // eslint-disable-next-line no-unused-vars
      let actionIndex = 0
      if (pos === 'top') {
        actionIndex = index - 1
      } else {
        actionIndex = index + 1
      }
      if (actionIndex === -1 || actionIndex === this.listData.length) {
        return false
      }
      this.$store.commit('product/SWAP_LIST_DATA', { index, actionIndex })
      this.$store.dispatch('product/swapData', { a_id: this.listData[actionIndex].id, b_id: this.listData[index].id })
      // this.$forceUpdate()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async handleDelete() {
      console.log(this.multipleSelection)
      const items = this.multipleSelection
      for (let i = 0; i < items.length; i++) {
        await this.$store.dispatch('product/deleteProduct', items[i].id)
      }
      Message({
        message: '删除成功！',
        type: 'success',
        duration: 1000
      })
      this.load()
      // this.$store.dispatch('new/deleteNew', row.id)
    },
    handleEdit(index, row) {
      this.$router.push({ name: 'UpdateProduct', params: { id: row.id }})
    },
    handleCreate() {
      this.$router.push({ name: 'CreateProduct' })
    },
    changeRecommend(index, row) {
      this.$store.dispatch('product/changeRecommend', { id: row.id, recommend: row.isRecommend })
    }
  }
}
</script>
