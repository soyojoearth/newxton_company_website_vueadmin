<template>
  <div class="app-container">
    <el-card style="margin-top:10px">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;min-height:300px;margin-bottom:20px;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="名称">
          <template slot-scope="scope">{{ scope.row.contentTitle }}</template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="留言人">
          <el-input v-model="form.name" disabled />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.link" disabled />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="form.content" type="textarea" disabled />
        </el-form-item>
        <el-form-item label="时间">
          <el-input v-model="form.date" disabled />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      multipleSelection: [],
      form: {
        name: 'Linda',
        link: '188888888',
        content: '测试测试测试测试测试测试',
        date: '2020-07-24 19:45'
      }
    }
  },
  computed: {
    tableData: function() {
      return this.$store.state.set.pageData
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$store.dispatch('set/getPageList')
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleEdit(index, row) {
      this.$router.replace({name: 'PageEdit', params: { id: row.id }})
    }
  }
}
</script>
