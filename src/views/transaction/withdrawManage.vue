<template>
  <div class="app-container">
    <el-card class="operatingHints">
      <el-row style="font-weight:800;">
        操作提示：
      </el-row>
      <el-row v-for="item in headerList" :key="item.content">
        {{ item.content }}
      </el-row>
    </el-card>

    <el-card class="operatingHints">
      <el-row style="margin-top: 10px">
        <el-col :offset="16">
          <el-select v-model="searchBean.status" placeholder="状态" clearable>
            <el-option v-for="item in isList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-input v-model="searchBean.username" placeholder="用户名" style="width: 150px" />
          <el-button type="primary" @click="searchAction">筛选</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-table ref="multipleTable" :data="listData" tooltip-effect="dark">
          <el-table-column prop="username" label="用户名" width="120px" />
          <el-table-column prop="platformPerson" label="真实姓名" width="120px" />
          <el-table-column prop="" label="收款平台账号" width="220px;">
            <template slot-scope="scope">
              <div style="text-align: left;text-overflow: ellipsis;overflow: hidden">{{ scope.row.platformAccount }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="platform" label="收款平台名称" width="120px" />
          <el-table-column prop="platformText" label="收款平台类型" width="120px" />
          <el-table-column prop="datelineCreateReadable" label="申请时间" width="180px" />
          <el-table-column prop="amount" label="金额" width="120px" />
          <el-table-column prop="statusText" label="审核结果" width="120px" />
          <el-table-column prop="" label="操作" show-overflow-tooltip header-align="left">
            <template slot-scope="scope">
              <router-link :to="{path:'/transaction/transactionList', query: { username: scope.row.username }}" target="_blank">
                <el-button type="text" size="small">查看资金记录</el-button>
              </router-link>
              <el-button type="text" size="small" @click="withdrawApprovalShow(scope.row)">审核</el-button>
              <el-button type="text" size="small" @click="transferUpdateShow(scope.row)">填写汇款结果</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :offset="18">
          <el-button type="primary" icon="el-icon-arrow-left" @click="handlePage(-1)">上一页</el-button>
          <el-button>{{ searchBean.listNumber }} / {{ pageCount }}</el-button>
          <el-button type="primary" icon="el-icon-arrow-right" @click="handlePage(1)">下一页</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog title="审核" :visible.sync="approvalDialog" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" width="500px" center>
      <el-form ref="approvalRef" :model="approvalParam" :rules="approvalParamRules" label-width="140px">
        <el-form-item label="用户名" prop="username">
          <span>{{ approvalParam.username }}</span>
        </el-form-item>
        <el-form-item label="提现金额" prop="username">
          <span>{{ approvalParam.amount }}</span>
        </el-form-item>
        <el-form-item label="提现备注" prop="inviterUsername">
          <el-input v-model="approvalParam.remarkUser" type="textarea" disabled style="width: 200px" />
        </el-form-item>
        <el-form-item label="审核意见" prop="approval">
          <el-radio-group v-model="approvalParam.approval">
            <el-radio :label="true">批准</el-radio>
            <el-radio :label="false">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="saveApproval">确定</el-button>
        <el-button @click="approvalDialog = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="汇款结果" :visible.sync="transferDialog" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" width="500px" center>
      <el-form ref="transferRef" :model="transferParam" :rules="transferParamRules" label-width="140px">
        <el-form-item label="用户名" prop="username">
          <span>{{ transferParam.username }}</span>
        </el-form-item>
        <el-form-item label="提现金额" prop="amount">
          <span>{{ transferParam.amount }}</span>
        </el-form-item>
        <el-form-item label="提现备注" prop="remarkUser">
          <el-input v-model="transferParam.remarkUser" type="textarea" style="width: 200px" disabled />
        </el-form-item>
        <el-form-item label="汇款单号" prop="serialNum">
          <el-input v-model="transferParam.serialNum" style="width: 200px" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="transferParam.remark" type="textarea" style="width: 200px"/>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="saveTransfer">确定</el-button>
        <el-button @click="transferDialog = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    const serialNumDeliverySerialNum = (rule, value, callback) => {
      if (value == null || value.length === 0) {
        callback(new Error('汇款单号不能为空'))
      } else {
        callback()
      }
    }
    const remarkDeliverySerialNum = (rule, value, callback) => {
      if (value == null || value.length === 0) {
        callback(new Error('备注不能为空'))
      } else {
        callback()
      }
    }
    return {
      headerList: [
        {
          content: '1、用户提交申请时，申请金额会被暂时冻结，用户取消申请或者管理员拒绝申请时解冻。'
        },
        {
          content: '2、在这里审核通过的提现申请会转入“汇款管理”—“待汇款列表”。'
        },
        {
          content: '3、银行信息和支付宝账号，用户只要二选一填写即满足要求。'
        },
        {
          content: '4、对于审核通过的用户提现申请，可以通过人工给用户汇款。'
        },
        {
          content: '5、汇款结果的单号，提在这里以供用户查看和对证。'
        },
        {
          content: '6、填写汇款结果，状态修改成“汇款成功”后，提现金额和手续费即从系统余额中正式扣除，该步骤不可撤销。'
        },
        {
          content: '7、填写汇款结果，状态修改成“汇款失败”后，提现金额和手续费解除冻结，回到用户余额中；用户可以重新提交提现申请，该步骤不可撤销。'
        }
      ],
      searchBean: {
        offset: 0,
        limit: 10,
        listNumber: 1
      },
      isList: [
        {
          value: 0,
          label: '已申请'
        },
        {
          value: 1,
          label: '已批准'
        },
        {
          value: 2,
          label: '已拒绝'
        },
        {
          value: 3,
          label: '已汇款'
        }
      ],
      listData: [],
      pageCount: 0,
      approvalDialog: false,
      approvalParam: {},
      approvalParamRules: {
        // inviterUsername: [{ required: true, trigger: 'blur', validator: inviterUsernameDeliverySerialNum }]
      },
      transferDialog: false,
      transferParam: {},
      transferParamRules: {
        serialNum: [{ required: true, trigger: 'blur', validator: serialNumDeliverySerialNum }],
        remark: [{ required: true, trigger: 'blur', validator: remarkDeliverySerialNum }]
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
    searchAction() {
      this.$set(this.searchBean, 'offset', 0)
      this.$set(this.searchBean, 'listNumber', 1)
      this.searchDate()
    },
    searchDate() {
      this.$myLoading.myLoading.loading()
      if (this.searchBean.status != null && this.searchBean.status === '') {
        this.searchBean.status = null
      }
      if (this.searchBean.username != null && this.searchBean.username === '') {
        this.searchBean.username = null
      }
      this.$store.dispatch('withdraw/searchListData', this.searchBean).then(() => {
        this.listData = this.$store.state.withdraw.listData
        this.pageCount = Math.ceil(this.$store.state.withdraw.countData / this.searchBean.limit)
        const that = this
        that.$myLoading.myLoading.closeLoading()
      })
    },
    handlePage(page) {
      if (this.searchBean.listNumber + page < 1 || this.searchBean.listNumber + page > this.pageCount) {
        return false
      }
      this.searchBean.listNumber = this.searchBean.listNumber + page
      this.searchBean.offset = (this.searchBean.listNumber - 1) * this.searchBean.limit
      this.searchDate()
    },
    withdrawApprovalShow(data) {
      this.approvalParam = Object.assign({}, data)
      this.$set(this.approvalParam, 'approval', true)
      this.approvalDialog = true
    },
    saveApproval() {
      this.$store.dispatch('withdraw/withdrawApproval', this.approvalParam).then(() => {
        const status = this.$store.state.withdraw.withdrawApprovalStatus
        if (status != null && status === 0) {
          this.$message({
            type: 'success',
            message: '审核成功'
          })
          this.approvalDialog = false
          setTimeout(() => {
            this.searchDate()
          }, 1000)
        } else {
          this.$message({
            type: 'error',
            message: '审核失败'
          })
        }
      })
    },
    transferUpdateShow(data) {
      this.transferParam = Object.assign({}, data)
      this.transferDialog = true
    },
    saveTransfer() {
      this.$refs.transferRef.validate(valid => {
        if (valid) {
          this.$store.dispatch('withdraw/transferUpdate', this.transferParam).then(() => {
            const status = this.$store.state.withdraw.transferUpdateStatus
            if (status != null && status === 0) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.searchDate()
              this.transferDialog = false
            } else {
              this.$message({
                type: 'error',
                message: '操作失败'
              })
            }
          })
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.operatingHints{
  margin-top:10px;font-size:14px;line-height:30px;
}
</style>
