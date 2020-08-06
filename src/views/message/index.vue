<template>
  <div class="app-container">
    <el-card style="margin-top:10px">
      <el-table
        ref="multipleTable"
        :data="ListData"
        tooltip-effect="dark"
        style="width: 100%;min-height:300px;margin-bottom:20px;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="日期">
          <template slot-scope="scope">{{ scope.row.messageDatelineReadable }}</template>
        </el-table-column>
        <el-table-column prop="messageContent" label="内容" />
        <el-table-column prop="guestName" label="联系人" show-overflow-tooltip />
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" class="row-bg" justify="space-around" style="margin-top:20px">
        <el-col :span="12">
          <el-button type="danger" icon="el-icon-delete" @click="handleDelete">删除</el-button>
        </el-col>
        <el-col :span="12" style="text-align:right">
          <el-button type="primary" icon="el-icon-arrow-left" @click="handlePage(-1)">上一页</el-button>
          <el-button>{{ page_number }}</el-button>
          <el-button type="primary" icon="el-icon-arrow-right" @click="handlePage(1)">下一页</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="留言人">
          <span>{{ form.name }}</span>
        </el-form-item>
        <el-form-item label="联系方式">
          <span>{{ form.link }}</span>
        </el-form-item>
        <el-form-item label="内容">
          <span>{{ form.content }}</span>
        </el-form-item>
        <el-form-item label="时间">
          <span>{{ form.date }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03 19:23',
          title: '测试内容',
          kind: 'Linand'
        }
      ],
      dialogVisible: false,
      multipleSelection: [],
      form: {
        name: 'Linda',
        link: '188888888',
        content: '测试测试测试测试测试测试',
        date: '2020-07-24 19:45'
      },
      page_number: 1
    }
  },
  computed: {
    ListData() {
      return this.$store.state.message.ListData
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$store.dispatch('message/getList', this.page_number)
    },
    handlePage(page) {
      if (this.page_number + page < 1) {
        return false
      }
      this.page_number = this.page_number + page
      this.load()
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
      console.log(index)
      console.log(row)
      this.form.name = row.guestName
      this.form.link = row.guestPhone
      this.form.content = row.messageContent
      this.form.date = row.messageDatelineReadable
      this.dialogVisible = true
    },
    async handleDelete() {
      const items = this.multipleSelection
      for (let i = 0; i < items.length; i++) {
        await this.$store.dispatch('message/deleteMessage', items[i].id)
      }
      this.$message({
        message: '删除成功！',
        type: 'success'
      })
      this.load()
    }
  }
}
</script>
