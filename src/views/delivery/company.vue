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
          prop="name"
          label="快递公司名称"
          sortable
        />
        <el-table-column
          prop="code100"
          label="快递公司编码"
          sortable
        />
        <el-table-column
          prop="activity"
          label="状态"
          :formatter="fmtBoolean"
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
        <el-form-item label="快递公司名称">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="快递公司编码">
          <el-input v-model="formLabelAlign.code100" />
        </el-form-item>

        <el-form-item label="设置禁用启用" prop="formLabelAlign.activity">
          <el-radio-group v-model="formLabelAlign.activity">
            <el-radio :label="true">启用</el-radio>
            <el-radio :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="updateDeliveryCompany"
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
        id:null,
        name: '',
        code100: '',
        activity:true
      },
      isCreate: false
    }
  },
  computed: {
    ListData() {
      return this.$store.state.delivery.deliveryCompanyList;
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
    fmtBoolean(row, column, cellValue) {
        let ret = ''
        if (cellValue) {
            ret = "启用"
        } else {
            ret = "禁用"
        }
        return ret;
    },

    load() {
      this.$store.dispatch('delivery/getDeliveryCompanyList')
    },
    handleCreate() {
      this.isCreate = true;
      this.dialogVisible = true;
      this.formLabelAlign.id = null;
      this.formLabelAlign.name = '';
      this.formLabelAlign.code100 = '';
      this.formLabelAlign.activity = true;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    handleEdit(index, row) {
      this.formLabelAlign.id = row.id;
      this.formLabelAlign.name = row.name;
      this.formLabelAlign.code100 = row.code100;
      this.formLabelAlign.activity = row.activity; // todo 待从界面是否禁用下拉里取值
      this.isCreate = false;
      this.dialogVisible = true;
    },
    handleDelete(index, row) {
      this.$confirm('确认删除？')
        .then(async _ => {
          const then = this
          await this.$store.dispatch('delivery/deleteDeliveryCompany', row.id).then(() => {
            then.load()
            then.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(_ => { })
    },
    async updateDeliveryCompany() {
      if (this.isCreate) {
        await this.$store.dispatch('delivery/saveDeliveryCompany', this.formLabelAlign)
        this.$message({
          type: 'success',
          message: '创建成功!'
        })
      } else {
        await this.$store.dispatch('delivery/saveDeliveryCompany', this.formLabelAlign)
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
