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
        :data="ListData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
      >
        <el-table-column
          prop="category_name_display"
          label="类别名"
          sortable
        />
        <el-table-column align="right">
          <template slot="header">
            <span>操作</span>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :modal-append-to-body="false"
    >
      <el-form
        label-position="top"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="上级类别">
          <el-select
            v-model="formLabelAlign.value"
            placeholder="请选择"
          >
            <el-option
              v-for="item in ListData"
              :key="item.category_id"
              :label="item.category_name_display"
              :value="item.category_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="UpdateCategory"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      formLabelAlign: {
        SelectId: '',
        name: '',
        value: ''
      },
      isCreate: false
    }
  },
  computed: {
    ListData() {
      return this.$store.state.product.CategoryListData
    }
  },
  watch: {
    ListData: function(val, oval) {
      console.log(val)
      console.log(oval)
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$store.dispatch('product/getCategory')
    },
    handleCreate() {
      this.isCreate = true
      this.dialogVisible = true
      this.formLabelAlign.SelectId = ''
      this.formLabelAlign.name = ''
      this.formLabelAlign.value = ''
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    handleEdit(index, row) {
      this.formLabelAlign.SelectId = row.category_id
      this.formLabelAlign.name = row.category_name
      this.formLabelAlign.value = row.category_pid === 0 ? null : row.category_pid
      this.isCreate = false
      this.dialogVisible = true
    },
    handleDelete(index, row) {
      this.$confirm('确认删除？')
        .then(async _ => {
          const then = this
          await this.$store.dispatch('product/deleteCategory', row.category_id).then(() => {
            then.load()
            then.$message({
              type: 'success',
              message: '删除成功!'
            })
            // setTimeout(function() {
            //   then.load()
            // },
            // 500)
          })
        })
        .catch(_ => { })
    },
    async UpdateCategory() {
      if (this.isCreate) {
        await this.$store.dispatch('product/createCategory', this.formLabelAlign)
        this.$message({
          type: 'success',
          message: '创建成功!'
        })
      } else {
        await this.$store.dispatch('product/updateCategory', this.formLabelAlign)
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }
      const then = this
      setTimeout(function() {
        then.load()
      },
      500)
      this.dialogVisible = false
    }
  }
}
</script>
