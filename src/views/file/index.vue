<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" @click="handleCreate">创建</el-button>
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
        <el-table-column prop="contentTitle" label="标题" />
        <el-table-column prop="categoryId" label="类型" show-overflow-tooltip />
        <el-table-column label="推荐">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isRecommend" :active-value="1" :inactive-value="0" @change="changeRecommend(scope.$index, scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="日期">
          <template slot-scope="scope">{{ scope.row.datelineCreateReadable }}</template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-row style="margin-top:20px">
      <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
      <el-button type="primary" icon="el-icon-arrow-right">下一页</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      multipleSelection: []
    }
  },
  computed: {
    listData() {
      return this.$store.state.new.ListData
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$store.dispatch('new/getList')
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
    handleDelete(index, row) {
      this.$store.dispatch('new/deleteNew', row.id)
    },
    handleEdit(index, row) {
      this.$router.push({ name: 'UpdateContent', params: { id: row.id }})
    },
    handleCreate() {
      this.$router.push({ name: 'CreateContent' })
    },
    changeRecommend(index, row) {
      this.$store.dispatch('new/changeRecommend', { id: row.id, recommend: row.isRecommend })
    }
  }
}
</script>
