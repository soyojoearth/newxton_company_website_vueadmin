<template>
  <div class="app-container">
    <el-card style="margin:10px 0;font-size:14px;line-height:30px;">
      <el-row style="font-weight:800;">
        操作提示：
      </el-row>
      <el-row>
        1、用户对购买的商品进行评价后，会展示在这里。默认新增的评论暂时不显示，点击“显示”立即展示在对应商品详情页。
      </el-row>
      <el-row>
        2、可控制某条评价是否显示。
      </el-row>
      <el-row>
        3、可以对评论进行推荐，被推荐的评论排在前面。
      </el-row>
    </el-card>
    <el-row>
      <div style="float:left;">
        一共{{listData.length}}条评论
      </div>
      <div style="float:right;line-height: 40px;">

        <el-input
          v-model="newParams.productUrl"
          style="width:150px"
          placeholder="输入商品链接筛选"
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

        <el-table-column
          prop="productName"
          label="商品信息"
          width="200"
        >

          <template slot-scope="scope">
            <div style="display:flex;align-items: center;">

              <el-image
                style="width: 50px; height: 50px;"
                :src="scope.row.productPicUrl+'?imageView2/1/w/50/h/50/q/75'"
              >
              </el-image>
              <div style="padding:5px">
                {{ scope.row.productName }}

              </div>
            </div>

          </template>

        </el-table-column>
        <el-table-column
          prop="content"
          label="评论内容"
          show-overflow-tooltip
        />
        <el-table-column
          prop="username"
          label="用户"
          show-overflow-tooltip
        />
        <el-table-column
          prop="date"
          label="评论时间"
          show-overflow-tooltip
        />

        <el-table-column
          label="推荐"
          align="right"
          width="70"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.recommend"
              :active-value="true"
              :inactive-value="false"
              @change="changeIsRecommend(scope.$index, scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="显示"
          align="right"
          width="70"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.hidden"
              :active-value="true"
              :inactive-value="false"
              @change="changeIsShow(scope.$index, scope.row)"
            />
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          align="right"
          width="200"
        >
          <template slot-scope="scope">

            <el-button
              size="mini"
              type="text"
              @click="handleToDetail(scope.row)"
            >查看和回复 </el-button>

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
      <el-col
        :span="12"
        style="text-align:right"
      >
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
        <el-button>{{ listNumber }}/{{Math.ceil(pageCount/params.limit)}}</el-button>
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
import { getList, recommend, hidden } from '@/api/reviews'
export default {
  data () {
    return {
      multipleSelection: [],

      params: {

        offset: 0,
        limit: 20,
      },
      newParams: {
        productUrl: '',
        offset: 0,
        limit: 20
      },
      listData: [],
      pageCount: 1,
      listNumber: 1
    }
  },

  created () {

    this.load()


  },
  methods: {
    async load () {
      var res = await getList(this.newParams)
      this.listData = res.result.list
      this.pageCount = res.result.count
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
      if ((this.listNumber + page) <= 0 || (this.listNumber + page) > Math.ceil(this.pageCount / this.params.limit)) {
        return false
      }
      this.$myLoading.myLoading.loading()
      this.listNumber = this.listNumber + page
      this.newParams.offset = (this.listNumber - 1) * this.newParams.limit
      this.load()

      this.$myLoading.myLoading.closeLoading()
    },
    change () {
      this.$myLoading.myLoading.loading()
      this.load()
      this.$myLoading.myLoading.closeLoading()
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
    async changeIsShow (index, row) {

      var res = await hidden({ id: row.id, isHidden: row.hidden })
      this.load()
    },
    async changeIsRecommend (index, row) {
      var res = await recommend({ id: row.id, isRecommend: row.recommend })
      this.load()

    },
    async handleDelete () {
      var listData = []
      const items = this.multipleSelection
      for (let i = 0; i < items.length; i++) {
        listData.push(items[i].id)
      }
      var form = {

        isTrash: true,
        idList: listData
      }
      var res = await set_trash(form)
      Message({
        message: '放入回收站成功！',
        type: 'success',
        duration: 1000
      })
      this.load()
      // console.log(this.multipleSelection)
      // const items = this.multipleSelection
      // for (let i = 0; i < items.length; i++) {
      //   await this.$store.dispatch('product/deleteProduct', items[i].id)
      // }
      // Message({
      //   message: '删除成功！',
      //   type: 'success',
      //   duration: 1000
      // })
      // this.load()
      // this.$store.dispatch('new/deleteNew', row.id)
    },
    handleToDetail (row) {
      this.$router.push({ name: 'reviewsDetail', params: { id: row.id } })
    }

  }
}
</script>
