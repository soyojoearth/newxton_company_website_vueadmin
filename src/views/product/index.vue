<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" @click="handleCreate">添加商品</el-button>
      <el-button type="primary" @click="thirdParty">从第三方平台抓取产品</el-button>
      <div style="float:right">
        <el-select v-model="params.categoryId"
                   placeholder="请选择">
          <el-option :value="null"
                     label="分类：全部"></el-option>
          <el-option v-for="item in category_list"
                     :key="item.category_id"
                     :label="item.category_name_display"
                     :value="item.category_id">
          </el-option>
        </el-select>

        <el-select v-model="params.isSelling"
                   placeholder="请选择"
                   style="width:150px">
          <el-option :value="null"
                     label="上下架：全部"></el-option>
          <el-option :value="true"
                     label="上架"></el-option>
          <el-option :value="false"
                     label="下架"></el-option>

        </el-select>
        <el-select v-model="params.isRecommend"
                   placeholder="请选择"
                   style="width:150px">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>

        <el-select v-model="params.isNew"
                   placeholder="请选择"
                   style="width:150px">
          <el-option :value="null"
                     label="新品：全部"></el-option>
          <el-option v-for="item in isOptions"
                     :key="item.value"
                     :label="'新品：'+item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="params.isHot"
                   placeholder="请选择"
                   style="width:150px">
          <el-option :value="null"
                     label="热卖：全部"></el-option>
          <el-option v-for="item in isOptions"
                     :key="item.value"
                     :label="'热卖：'+item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="params.searchKeyword"
                  style="width:150px"
                  placeholder="搜索关键词"></el-input>
        <el-button type="primary"
                   @click="change">筛选</el-button>
      </div>

    </el-row>

    <el-card style="margin-top:10px">
      <el-table ref="multipleTable"
                :data="listData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
        <el-table-column prop="productName"
                         label="货品信息">

          <template slot-scope="scope">
            <div style="display:flex;align-items: center;">
              <div style="padding:5px;">
              <el-image style="width: 50px; height: 50px;"
                        :src="scope.row.pic_url+'?imageView2/1/w/50/h/50/q/75'">
              </el-image>
              </div>
              <div style="padding:5px;">
                {{ scope.row.productName }}
                </br>
                货号：{{ scope.row.itemNo }}
                </br>
                分类：{{ scope.row.categoryName }}
              </div>
            </div>

          </template>

        </el-table-column>
        <el-table-column prop="priceMarket"
                         label="原价"
                         width="80"
                         show-overflow-tooltip />
        <el-table-column prop="priceSelling"
                         label="现价"
                         width="80"
                         show-overflow-tooltip />
        <el-table-column prop="inventoryQuantity"
                         label="库存"
                         width="50"
                         show-overflow-tooltip />
        <el-table-column prop="salsCount"
                         label="销量"
                         width="50"
                         show-overflow-tooltip />
        <el-table-column prop="salsCount"
                         label="佣金比例(%)"
                         width="120">
          <template slot-scope="scope">

            <el-input-number class="inputClass"
                             v-model="scope.row.commissionRate"
                             controls-position="right"
                             @change="handleChange&&handleRow(scope.row)"
                             :min="1"
                             :max="100"></el-input-number>
            <el-button size="mini"
                       v-if="scope.row.isShow"
                       @click="handleUpdate(scope.row)">更新</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="datelineUpdatedReadable"
                         label="上次修改时间"
                         width="180"
                         show-overflow-tooltip />
        <el-table-column label="标签"
                         width="180">
          <template slot-scope="scope">
            上架
            <el-switch v-model="scope.row.isSelling"
                       :active-value="1"
                       :inactive-value="0"
                       @change="changeIsSelling(scope.$index, scope.row)" /> 新品
            <el-switch v-model="scope.row.isNew"
                       :active-value="1"
                       :inactive-value="0"
                       @change="changeIsNew(scope.$index, scope.row)" />
            </br>
            推荐
            <el-switch v-model="scope.row.isRecommend"
                       :active-value="1"
                       :inactive-value="0"
                       @change="changeRecommend(scope.$index, scope.row)" />
            热卖
            <el-switch v-model="scope.row.isHot"
                       :active-value="1"
                       :inactive-value="0"
                       @change="changeIsHot(scope.$index, scope.row)" />
          </template>
        </el-table-column>

        <el-table-column align="right"
                         width="80"
                         label="排序">
          <template slot-scope="scope">
            <el-col>
              <i class="el-icon-bottom"
                 @click="handleSort(scope.$index, scope.row, 'bot')" />
              <i class="el-icon-top"
                 @click="handleSort(scope.$index, scope.row, 'top')" />
            </el-col>
          </template>
        </el-table-column>

        <el-table-column label="操作"
                         align="right"
                         width="100">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleEdit(scope.$index, scope.row)">编辑 </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleView(scope.$index, scope.row)">查看 </el-button>

          </template>
        </el-table-column>

      </el-table>
    </el-card>
    <el-row type="flex"
            class="row-bg"
            justify="space-around"
            style="margin-top:20px">
      <el-col :span="12">
        <el-button type="danger"
                   icon="el-icon-delete"
                   @click="handleDelete">放入回收站</el-button>
      </el-col>
      <el-col :span="12"
              style="text-align:right">
        <el-button type="primary"
                   icon="el-icon-arrow-left"
                   @click="handlePage(-1)">上一页</el-button>
        <el-button>{{ listNumber }}/{{Math.ceil(pageCount/params.limit)}}</el-button>
        <el-button type="primary"
                   icon="el-icon-arrow-right"
                   @click="handlePage(1)">下一页</el-button>
      </el-col>
    </el-row>


    <el-dialog title="从第三方平台抓取" :visible.sync="thirdPartyDialog" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" width="600px" left>
      <el-form ref="thirdPartyRef" :model="thirdPartyParam" :rules="thirdPartyParamRules" label-width="140px">
        <el-form-item label="链接" prop="externalUrl">
          <el-input v-model="thirdPartyParam.externalUrl" style="width: 350px" placeholder="支持Shopify、Amazon、淘宝、天猫、京东、1688、并且不断扩展中。。。" />
        </el-form-item>
        <el-form-item label="产品类别" prop="categoryId">
          <el-select v-model="thirdPartyParam.categoryId" placeholder="--请选择--">
            <el-option v-for="item in $store.state.product.CategoryListData" :key="item.category_id" :label="item.category_name_display" :value="item.category_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="运费模板" prop="deliveryConfigId">
          <el-select v-model="thirdPartyParam.deliveryConfigId" placeholder="--请选择--">
            <el-option v-for="item in $store.state.delivery.deliveryConfigList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button @click="thirdPartyDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveThirdParty">抓取并创建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { mapState } from 'vuex'
import { set_trash, update_commission_rate } from '@/api/product'

export default {
  data () {
    const externalUrlValidation = (rule, value, callback) => {
      if (value == null || value.length === 0) {
        callback(new Error('链接不能为空'))
      } else {
        callback()
      }
    }
    const categoryIdValidation = (rule, value, callback) => {
      if (value == null || value.length === 0) {
        callback(new Error('产品类别不能为空'))
      } else {
        callback()
      }
    }
    const deliveryConfigIdValidation = (rule, value, callback) => {
      if (value == null || value.length === 0) {
        callback(new Error('运费模板不能为空'))
      } else {
        callback()
      }
    }
    return {
      multipleSelection: [],
      options: [{
        value: null,
        label: '是否推荐：全部'
      }, {
        value: true,
        label: '仅含推荐'
      }, {
        value: false,
        label: '仅不推荐'
      }],
      isOptions: [{
        value: true,
        label: '是'
      }, {
        value: false,
        label: '否'
      }],
      params: {
        categoryId: null,
        isRecommend: null,
        searchKeyword: '',
        isSelling: null,
        isNew: null,
        isHot: null,
        offset: 0,
        limit: 20,
        requireCount: true,
        isTrash: false

      },

      newParams: {
        isTrash: false,
        offset: 0,
        limit: 20
      },

      thirdPartyDialog: false,
      thirdPartyParam: {},
      thirdPartyParamRules: {
        externalUrl: [{ required: true, trigger: 'blur', validator: externalUrlValidation }],
        categoryId: [{ required: true, trigger: 'change', validator: categoryIdValidation }],
        deliveryConfigId: [{ required: true, trigger: 'change', validator: deliveryConfigIdValidation }]
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
    this.$store.dispatch('delivery/getDeliveryConfigList')
  },
  watch: {
    // 'currentValue': {
    //   handler: function () {
    //     this.currentRow.isShow = false
    //     if (this.currentValue !== this.oldValue) {
    //       this.currentRow.isShow = true
    //     }

    //     console.log(this.listData[0]);


    //   }
    // }
  },
  methods: {
    load () {
      // this.$myLoading.myLoading.loading()
      this.$store.commit('product/SET_LIST_NUMBER', 1)
      this.$store.dispatch('product/getList', this.newParams)
      // this.$myLoading.myLoading.closeLoading()
    },
    change () {
      this.$myLoading.myLoading.loading()

      this.newParams = Object.assign({}, this.params)
      this.$store.commit('product/SET_LIST_NUMBER', 1)
      this.$store.dispatch('product/getList', this.newParams)
      this.$myLoading.myLoading.closeLoading()

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
      this.$store.commit('product/SET_LIST_NUMBER', this.listNumber + page)
      this.newParams.offset = (this.listNumber - 1) * this.newParams.limit

      this.$store.dispatch('product/getList', this.newParams)
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
    handleChange (currentValue, oldValue) {
      // console.log(currentValue, oldValue, row);

    },
    handleRow (row) {


      this.listData.forEach((i, index) => {
        if (i.id == row.id) {
          this.listData[index]['isShow'] = true
          if (i.NewCommissionRate == i.commissionRate) {
            this.listData[index]['isShow'] = false
          }
          return
        }
      })
      console.log(this.listData[0]);
    },
    async handleUpdate (row) {
      var res = await update_commission_rate({ productId: row.id, rate: parseInt(row.commissionRate) })
      if (res.status === 0) {
        Message({
          message: '更新成功！',
          type: 'success',
          duration: 1000
        })
        this.load()
      }
    },
    handleEdit (index, row) {
      this.$router.push({ name: 'UpdateProduct', params: { id: row.id } })
    },
    handleView (index, row) {
      window.open("/product/detail?productId=" + row.id, '_blank');
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
    },

    thirdParty() {
      // this.thirdPartyParam = {}
      // this.resetForm('thirdPartyRef')
      this.thirdPartyDialog = true
    },
    saveThirdParty() {
      var than = this;
      this.$refs.thirdPartyRef.validate(valid => {
        if (valid) {
          this.thirdPartyDialog = false
          setTimeout(() => {
            this.$store.dispatch('product/createFromOther', this.thirdPartyParam).then(() => {
              const status = this.$store.state.product.createFromOtherStatus
              if (status != null && status === 0) {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
                const createFromResult = this.$store.state.product.createFromResult
                if (createFromResult != null) {
                  this.$router.push({ name: 'UpdateProduct', params: { id: createFromResult.id }})
                }
              } else {
                this.$message({
                  type: 'error',
                  message: '操作失败'
                })
              }
            })
          }, 100)
        }
      })
    },
    // 重置表单
    resetForm(formName) {
      if (this.$refs[formName] != null) {
        this.$refs[formName].resetFields()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.inputClass {
  width: 100px !important;
}
</style>
