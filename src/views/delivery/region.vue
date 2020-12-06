<template>
  <div class="app-container">
    <el-card class="operatingHints">
      <el-row style="font-weight:800;">
        操作提示：
      </el-row>
      <el-row>
        1、系统内置的地区基础数据都可在此修改编辑，请谨慎操作。
      </el-row>
      <el-row>
        2、可以自由添加无限下级、无限量地区。
      </el-row>
      <el-row>
        3、可排序。（注：同级别排序）
      </el-row>
    </el-card>
    <el-row style="margin-top: 30px;">
      <el-row style="font-size:15px;float: left;margin-top: 10px;margin-left: 10px;margin-right: 10px">
        地区列表
      </el-row>
      <el-button
        type="primary"
        @click="handleCreate"
      >新增地区</el-button>
    </el-row>
    <el-card style="margin-top:10px">
      <el-table
        ref="multipleTable"
        :data="listData"
        tooltip-effect="dark"
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        @selection-change="handleSelectionChange"
      >>
        <el-table-column
          prop="regionName"
          label="地区"
          height="30px"
        >
          <template slot-scope="scope">
            <span :title="scope.row.regionName">{{scope.row.regionName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="排序"
          height="30px"
        >
          <template slot-scope="scope">
            <el-col>
              <i
                class="el-icon-bottom"
                @click="handleSort(scope.row, 'bot')"
              />
              <i
                class="el-icon-top"
                @click="handleSort(scope.row, 'top')"
              />
            </el-col>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="操作"
          show-overflow-tooltip
          align="right"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="editorClick(scope.row)"
            >修改</el-button>
            <el-button
              size="small"
              @click="editorLowerlClick(scope.row)"
            >新增下级</el-button>
            <el-button
              type="danger"
              size="small"
              @click="deleteClick(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="地区管理"
      :visible.sync="saveDialog"
      :close-on-click-modal="false"
      :show-close="false"
      :close-on-press-escape="false"
      width="450px"
      center
    >
      <el-form
        ref="dialogRef"
        :model="saveParam"
        :rules="saveParamRules"
      >
        <el-form-item
          label="上级地区"
          prop="regionPid"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="saveParam.regionPid"
            placeholder="--请选择--"
            :disabled="editorLower"
          >
            <el-option
              v-for="item in simpleData"
              :key="item.region_id"
              :label="item.region_name_display"
              :value="item.region_id"
            >
              {{ item.region_name_display }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="地区名称"
          prop="regionName"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="saveParam.regionName"
            style="width: 200px"
          />
        </el-form-item>
      </el-form>
      <div style="margin-left: 120px">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button
          type="primary"
          @click="saveConfirm"
        >确 定</el-button>
      </div>
      <div style="margin-left: 30px;margin-top: 20px;color: red">
        注：地区名称设定直接影响订单、收货地址等重要信息。
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data () {
    const validateBrandName = (rule, value, callback) => {
      if (value == null || value.length === 0) {
        callback(new Error('地区名称不能为空'))
      } else {
        callback()
      }
    }
    return {
      multipleSelection: [],
      saveParam: {},
      saveDialog: false,
      saveParamRules: {
        regionName: [{ required: true, trigger: 'blur', validator: validateBrandName }]
      },
      formLabelWidth: '120px',
      listData: [],
      hereList: [],
      simpleData: [],
      editorLower: false,
      pidDataList: {}
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {

      this.$myLoading.myLoading.loading()
      this.$store.dispatch('region/searchListData').then(() => {
        const that = this
        that.$myLoading.myLoading.closeLoading()
        const datas = this.$store.state.region.listData
        const newData = []
        recursiveList(datas, newData)
        this.listData = []
        this.listData = newData
        this.simpleData = []
        this.simpleData = this.$store.state.region.simpleData
        this.pidDataList = {}
        this.simpleData.forEach(function (value) {
          let pidData = that.pidDataList[value.region_pid]
          if (pidData == null) {
            pidData = []
          }
          pidData.push(value)
          that.pidDataList[value.region_pid] = pidData
        })
      })
      // eslint-disable-next-line no-unused-vars
      // 递归查询结果
      function recursiveList (datas, newData) {
        for (const i in datas) {
          newData[i] = datas[i].region
          if (newData[i].regionPid != null && newData[i].regionPid === 0) {
            newData[i].regionPid = null
          }
          if (datas[i].sub_region_list != null && datas[i].sub_region_list.length > 0) {
            newData[i].children = []
            recursiveList(datas[i].sub_region_list, newData[i].children)
          }
        }
      }

    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSort (row, pos) {
      let regionPid = row.regionPid
      if (regionPid == null) {
        // eslint-disable-next-line no-const-assign
        regionPid = 0
      }
      let actionIndex = 0
      const regionPidList = this.pidDataList[regionPid]
      for (const i in regionPidList) {
        const index = Number(i)
        if (regionPidList[index].region_id === row.id) {
          if (pos === 'top') {
            // eslint-disable-next-line no-undefs
            actionIndex = index - 1
          } else {
            actionIndex = index + 1
          }
          break
        }
      }
      const newRow = regionPidList[actionIndex]
      if (newRow == null) {
        return false
      }
      this.$store.dispatch('region/swapRegionOrder', { id1: row.id, id2: newRow.region_id }).then(() => {
        this.load()
      })
    },
    handleCreate () {
      this.saveParam = {}
      this.resetForm('dialogRef')
      this.saveDialog = true
      this.editorLower = false
    },
    closeDialog: function () {
      this.saveDialog = false
    },
    // 确认添加或修改
    saveConfirm: function () {
      this.$refs.dialogRef.validate(valid => {
        if (valid) {
          this.saveChange()
        }
      })
    },
    // 保存操作
    saveChange () {
      this.newParams = Object.assign({}, this.saveParam)
      this.$store.dispatch('region/saveData', this.newParams).then(() => {
        const status = this.$store.state.region.saveStatus
        if (status != null && status === 0) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.closeDialog()
          this.load()
        } else {
          this.$message({
            type: 'error',
            message: '保存失败'
          })
        }
      })
    },
    editorClick: function (data) {
      this.resetForm('dialogRef')
      this.saveDialog = true
      this.editorLower = false
      this.saveParam = Object.assign({}, data)
    },
    editorLowerlClick: function (data) {
      this.resetForm('dialogRef')
      this.saveDialog = true
      this.saveParam = {
        regionPid: data.id
      }
      this.editorLower = true
    },
    deleteClick: function (data) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = Object.assign({}, { id: data.id })
        this.$store.dispatch('region/deleteData', param).then(() => {
          const status = this.$store.state.region.deleteStatus
          if (status != null && status === 0) {
            this.load()
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 重置表单
    resetForm (formName) {
      if (this.$refs[formName] != null) {
        this.$refs[formName].resetFields()
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.brandImg {
  vertical-align: middle;
  max-height: 80px;
}
.operatingHints {
  margin-top: 10px;
  font-size: 14px;
  line-height: 30px;
}
</style>
