<template>
  <div class="app-container">
    <el-card class="operatingHints">
      <el-row style="font-weight:800;">
        操作提示：
      </el-row>
      <el-row>
        1、会员等级管理，这里给不同等级的会员设置不同的折扣。
      </el-row>
    </el-card>

    <el-card class="operatingHints">
      <el-row style="margin-top: 10px">
        <el-col>
          <el-button type="primary" @click="addMemberLevel">新增会员等级</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-table ref="multipleTable" :data="listData" tooltip-effect="dark">
          <el-table-column prop="levelNum" label="等级" height="30px" />
          <el-table-column prop="levelName" label="等级名称" height="30px" />
          <el-table-column prop="levelCost" label="消费额度" height="30px" />
          <el-table-column prop="" label="折扣率" height="30px">
            <template slot-scope="scope">
              <span>{{ scope.row.levelDiscount }}%</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" show-overflow-tooltip header-align="left">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="changeMemberLevel(scope.row)">编辑</el-button>
              <el-button v-if="scope.$index+ 1 === listData.length" type="text" size="small" @click="delMemberLevel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>

    <el-dialog title="会员设置" :visible.sync="memberDialog" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" width="500px" center>
      <el-form ref="memberRef" :model="memberParam" :rules="memberParamRules" label-width="140px">
        <el-form-item label="等级名称" prop="levelName">
          <el-input v-model="memberParam.levelName" style="width: 200px" />
          <div>设置会员等级名称</div>
        </el-form-item>
        <el-form-item label="消费额度" prop="levelCost">
          <el-input-number v-model="memberParam.levelCost" style="width: 200px" :controls="false" />
          <div>达到该等级，会员累计所需消费的额度</div>
        </el-form-item>
        <el-form-item label="折扣率" prop="levelDiscount">
          <el-input-number v-model="memberParam.levelDiscount" style="width: 200px" :controls="false" />
          <div>例如：输入95，就是95%，表示95折</div>
        </el-form-item>
      </el-form>
      <div style="margin-left: 120px">
        <el-button type="primary" @click="saveMember">确 定</el-button>
        <el-button @click="memberDialog = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    const levelNameDeliverySerialNum = (rule, value, callback) => {
      if (value == null || value.length === 0) {
        callback(new Error('等级名称不能为空'))
      } else {
        callback()
      }
    }
    const levelCostDeliverySerialNum = (rule, value, callback) => {
      if (value == null || value.length === 0) {
        callback(new Error('消费额度不能为空'))
      } else {
        callback()
      }
    }
    const levelDiscountDeliverySerialNum = (rule, value, callback) => {
      if (value == null || value.length === 0) {
        callback(new Error('折扣率不能为空'))
      } else {
        callback()
      }
    }
    return {
      listData: [],
      memberDialog: false,
      memberParam: {},
      memberParamRules: {
        levelName: [{ required: true, trigger: 'blur', validator: levelNameDeliverySerialNum }],
        levelCost: [{ required: true, trigger: 'blur', validator: levelCostDeliverySerialNum }],
        levelDiscount: [{ required: true, trigger: 'blur', validator: levelDiscountDeliverySerialNum }]
      }
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
    this.searchDate()
  },
  methods: {
    searchDate() {
      this.$myLoading.myLoading.loading()
      this.$store.dispatch('memberLevel/searchListData').then(() => {
        this.listData = this.$store.state.memberLevel.listData
        const that = this
        that.$myLoading.myLoading.closeLoading()
      })
    },
    addMemberLevel() {
      this.resetForm('memberRef')
      this.memberParam = {}
      this.memberDialog = true
    },
    changeMemberLevel(data) {
      this.resetForm('memberRef')
      this.memberParam = Object.assign({}, data)
      this.memberDialog = true
    },
    saveMember() {
      this.$refs.memberRef.validate(valid => {
        if (valid) {
          this.$store.dispatch('memberLevel/memberLevelSave', this.memberParam).then(() => {
            const status = this.$store.state.memberLevel.saveStatus
            if (status != null && status === 0) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.searchDate()
              this.memberDialog = false
            } else {
              this.$message({
                type: 'error',
                message: '操作失败'
              })
            }
          })
        }
      })
    },
    delMemberLevel(data) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('memberLevel/memberLevelDelete', { levelNum: data.levelNum }).then(() => {
          const status = this.$store.state.memberLevel.deleteStatus
          if (status != null && status === 0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.searchDate()
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
    resetForm(formName) {
      if (this.$refs[formName] != null) {
        this.$refs[formName].resetFields()
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.brandImg{
  vertical-align: middle;
  max-height: 80px;
}
.operatingHints{
  margin-top:10px;font-size:14px;line-height:30px;
}

.brandImg {
  vertical-align: middle;
  max-height: 80px;
}
.bg-img1 {
  width: 200px;
  height: 200px;
  background-size: contain;
}
</style>
