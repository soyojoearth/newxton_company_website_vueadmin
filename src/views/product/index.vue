<template>
  <div class="app-container">
    <el-row>
      <el-button
        type="primary"
        @click="handleCreate"
      >创建</el-button>
      <div style="float:right">
        是否推荐
        <el-select
          v-model="params.is_recommend"
          placeholder="请选择"
          style="width:150px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        类别
        <el-select
          v-model="params.category_id"
          placeholder="请选择"
        >
          <el-option
            value=""
            label="全部"
          ></el-option>
          <el-option
            v-for="item in category_list"
            :key="item.category_id"
            :label="item.category_name_display"
            :value="item.category_id"
          >
          </el-option>
        </el-select>
        <el-input
          v-model="params.search_keyword"
          style="width:150px"
          placeholder="搜索关键词"
        ></el-input>
        <el-button
          type="primary"
          @click="change"
        >筛选</el-button>
      </div>

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
          label="产品名称"
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
        <el-table-column
          label="热卖"
          align="right"
          width="70"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isHot"
              :active-value="1"
              :inactive-value="0"
              @change="changeIsHot(scope.$index, scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="新品"
          align="right"
          width="70"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isNew"
              :active-value="1"
              :inactive-value="0"
              @change="changeIsNew(scope.$index, scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="上架"
          align="right"
          width="70"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isSelling"
              :active-value="1"
              :inactive-value="0"
              @change="changeIsSelling(scope.$index, scope.row)"
            />
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
        <el-button>{{ listNumber }}/{{pageCount}}</el-button>
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
import { mapState } from 'vuex'

export default {
  data () {
    return {
      multipleSelection: [],
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '仅含推荐'
      }, {
        value: '0',
        label: '仅不推荐'
      }],
      params: {
        category_id: '',
        is_recommend: '',
        search_keyword: ''
      },
      newParams: {

      }
    }
  },
  computed: {
    listData () {
      return this.$store.state.product.ListData
    },
    listNumber () {
      return this.$store.state.product.ListNumber
    },
    ...mapState({
      category_list: state => state.product.CategoryListData,
      pageCount: state => state.product.pageCount
    }),
  },
  created () {

    this.load()
    this.$store.dispatch('product/getCategory')

  },
  methods: {
    load () {
      this.$store.commit('product/SET_LIST_NUMBER', 1)
      this.$store.dispatch('product/getList', this.newParams)
    },
    change () {
      this.newParams = Object.assign({}, this.params)
      this.$store.commit('product/SET_LIST_NUMBER', 1)
      this.$store.dispatch('product/getList', this.newParams)
    },

    toggleSelection (rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handlePage (page) {
      if (this.listNumber + page < 1 || this.listNumber + page > this.pageCount) {
        return false
      }
      this.$store.commit('product/SET_LIST_NUMBER', this.listNumber + page)
      console.log(this.newParams);
      this.$store.dispatch('product/getList', this.newParams)

    },
    handleSort (index, row, pos) {
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
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    async handleDelete () {
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
    handleEdit (index, row) {
      this.$router.push({ name: 'UpdateProduct', params: { id: row.id } })
    },
    handleCreate () {
      this.$router.push({ name: 'CreateProduct' })
    },
    changeRecommend (index, row) {
      this.$store.dispatch('product/changeRecommend', { id: row.id, recommend: row.isRecommend })
    },
    changeIsHot (index, row) {
      this.$store.dispatch('product/changeIsHot', { id: row.id, isHot: row.isHot })
    },
    changeIsNew (index, row) {
      this.$store.dispatch('product/changeIsNew', { id: row.id, isNew: row.isNew })
    },
    changeIsSelling (index, row) {
      this.$store.dispatch('product/changeIsSelling', { id: row.id, isSelling: row.isSelling })
    }
  }
}
</script>
