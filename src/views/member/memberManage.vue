<template>
  <div class="app-container">
    <el-card class="operatingHints">
      <el-row style="font-weight:800;">
        操作提示：
      </el-row>
      <el-row>
        1、会员管理，这里可以查看会员资料、修改会员密码。
      </el-row>
      <el-row>
        2、筛选栏可以指定条件筛选会员列表。
      </el-row>
      <el-row>
        3、分销是很实用的一个功能，下家每消费一笔，推荐人都会有佣金。
      </el-row>
    </el-card>

    <el-card class="operatingHints">
      <el-row style="margin-top: 10px">
        <el-col :offset="8">
          <el-select v-model="searchBean.levelNum" placeholder="会员等级" clearable>
            <el-option v-for="item in $store.state.memberLevel.listData" :key="item.levelNum" :label="item.levelName" :value="item.levelNum">
              {{ item.levelName }}
            </el-option>
          </el-select>
          <el-input v-model="searchBean.userId" placeholder="会员ID" style="width: 150px" />
          <el-input v-model="searchBean.username" placeholder="会员昵称" style="width: 150px" />
          <el-date-picker
            v-model="starDate"
            type="date"
            :picker-options="beginDateAfter"
            format="yyyy-MM-dd"
            placeholder="注册开始时间"
            :clearable="true"
          />
          <span class="date-in">~</span>
          <el-date-picker
            v-model="endDate"
            type="date"
            format="yyyy-MM-dd"
            :picker-options="beginDateBefore"
            placeholder="注册结束时间"
            :clearable="true"
          />
          <el-button type="primary" @click="searchAction">筛选</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-table ref="multipleTable" :data="listData" tooltip-effect="dark">
          <el-table-column prop="userId" label="ID" height="30px" width="180px"/>
          <el-table-column prop="username" label="用户名" height="30px" width="180px" />
          <el-table-column prop="levelName" label="等级" height="30px" width="180px" />
          <el-table-column prop="phone" label="手机号" height="30px" width="180px" />
          <el-table-column prop="datelineRegisterReadable" label="注册时间" height="30px" width="220px" />
          <el-table-column prop="statusText" label="状态" height="30px" width="180px" />
          <el-table-column prop="inviteesCount" label="下家数量" height="30px" width="180px" />
          <el-table-column prop="" label="操作" show-overflow-tooltip header-align="left">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showBasicData(scope.row)">基本资料</el-button>
              <el-button type="text" size="small" @click="showAddressDetail(scope.row)">收货地址</el-button>
              <el-button type="text" size="small" @click="showBalance(scope.row)">资金管理</el-button>
              <el-button type="text" size="small" @click="showCmmission(scope.row)">分销管理</el-button>
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

    <el-dialog title="基本信息" :visible.sync="memberInfoDialog" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" width="500px" center>
      <el-form ref="dialogRef" :model="memberInfoParam" :rules="memberInfoParamRules" label-width="140px">
        <el-form-item label="用户名" prop="username">
          <span>{{ memberInfoParam.username }}</span>
        </el-form-item>
        <el-form-item label="会员等级" prop="levelNum">
          <el-select v-model="memberInfoParam.levelNum" placeholder="--请选择--" clearable>
            <el-option v-for="item in $store.state.memberLevel.listData" :key="item.levelNum" :label="item.levelName" :value="item.levelNum">
              {{ item.levelName }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="memberInfoParam.phone" style="width: 200px" :controls="false" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="memberInfoParam.email" style="width: 200px" :controls="false" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="memberInfoParam.newPwd" style="width: 200px" :controls="false" show-password autocomplete="new-password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm">
          <el-input v-model="memberInfoParam.confirm" style="width: 200px" :controls="false" show-password />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="memberInfoParam.gender">
            <el-radio :label="0">保密</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="注册时间" prop="datelineRegisterReadable">
          <span>{{ memberInfoParam.datelineRegisterReadable }}</span>
        </el-form-item>
        <el-form-item label="拉黑会员" prop="block">
          <el-switch v-model="memberInfoParam.block" />
        </el-form-item>
      </el-form>
      <div style="margin-left: 120px">
        <el-button type="primary" @click="saveMemberInfo">确 定</el-button>
        <el-button @click="memberInfoDialog = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="收货地址" :visible.sync="addressDialog" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" width="800px" center>
      <el-table ref="multipleTable" :data="addressParam" tooltip-effect="dark">
        <el-table-column prop="deliveryPerson" label="收货人" height="30px" width="120px" />
        <el-table-column prop="deliveryPhone" label="联系方式" height="30px" width="200px" />
        <el-table-column prop="deliveryPostcode" label="邮编" height="30px" width="120px" />
        <el-table-column prop="" label="地址" height="30px">
          <template slot-scope="scope">
            <span>{{ scope.row.regionCountryName }}{{ scope.row.regionProvinceName }}{{ scope.row.regionCityName }}{{ scope.row.deliveryAddress }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center">
        <el-button @click="addressDialog = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog title="收货地址" :visible.sync="balanceDialog" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" width="600px" center>
      <el-form ref="balanceRef" :model="balanceParam" :rules="balanceParamRules" label-width="140px">
        <el-form-item label="用户名" prop="username">
          <span>{{ balanceParam.username }}</span>
        </el-form-item>
        <el-form-item label="会员余额" prop="balance">
          <span>{{ balanceParam.balance }}</span>
        </el-form-item>
        <el-form-item label="增减资" prop="amount">
          <el-input-number v-model="balanceParam.amount" style="width: 200px" :controls="false" /> <span>（正数增加，负数减少）</span>
        </el-form-item>
        <el-form-item label="操作备注" prop="remark">
          <el-input v-model="balanceParam.remark" type="textarea" style="width: 200px" :controls="false" show-password autocomplete="new-password" />
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="saveBalance">确 定</el-button>
        <el-button @click="balanceDialog = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="分销管理" :visible.sync="cmmissionDialog" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" width="600px" center>
      <el-form ref="cmmissioneRef" :model="cmmissionParam" :rules="cmmissionParamRules" label-width="140px">
        <el-form-item label="用户名" prop="username">
          <span>{{ cmmissionParam.username }}</span>
        </el-form-item>
        <el-form-item label="分销功能" prop="canInvite">
          <el-switch v-model="cmmissionParam.canInvite" />
        </el-form-item>
        <el-form-item label="推荐人" prop="inviterUsername">
          <el-input v-model="cmmissionParam.inviterUsername" style="width: 200px" />
        </el-form-item>
        <el-form-item label="下家数" prop="inviteesCount">
          <span>{{ cmmissionParam.inviteesCount }}</span>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="saveCmmission">更新</el-button>
        <el-button @click="cmmissionDialog = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    const amountDeliverySerialNum = (rule, value, callback) => {
      if (value == null || value.length === 0) {
        callback(new Error('增减资不能为空'))
      } else {
        callback()
      }
    }
    const inviterUsernameDeliverySerialNum = (rule, value, callback) => {
      if (value == null || value.length === 0) {
        callback(new Error('推荐人不能为空'))
      } else {
        callback()
      }
    }
    return {
      searchBean: {
        offset: 0,
        limit: 10,
        listNumber: 1
      },
      // 开始日期选中
      starDate: null,
      // 结束日期选中
      endDate: null,
      // 开始日期选择限制
      beginDateAfter: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() || this.endDate != null ? time.getTime() > this.endDate : false
        }
      },
      // 结束日期选择限制
      beginDateBefore: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() || this.starDate > time.getTime()
        }
      },
      listData: [],
      pageCount: 0,
      memberInfoDialog: false,
      memberInfoParam: {},
      memberInfoParamRules: {},

      addressDialog: false,
      addressParam: [],

      balanceDialog: false,
      balanceParam: {},
      balanceParamRules: {
        amount: [{ required: true, trigger: 'blur', validator: amountDeliverySerialNum }]
      },

      cmmissionDialog: false,
      cmmissionParam: {},
      cmmissionParamRules: {
        inviterUsername: [{ required: true, trigger: 'blur', validator: inviterUsernameDeliverySerialNum }]
      }
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
    this.searchDate()
    this.$store.dispatch('memberLevel/searchListData')
  },
  methods: {
    searchAction() {
      this.$set(this.searchBean, 'offset', 0)
      this.$set(this.searchBean, 'listNumber', 1)
      this.searchDate()
    },
    searchDate() {
      this.$myLoading.myLoading.loading()
      if (this.starDate != null) {
        this.searchBean.datelineRegisterBegin = this.dateFormat('YYYY-mm-dd', this.starDate)
      } else {
        this.searchBean.datelineRegisterBegin = null
      }
      if (this.endDate != null) {
        this.searchBean.datelineRegisterEnd = this.dateFormat('YYYY-mm-dd', this.endDate)
      } else {
        this.searchBean.datelineRegisterEnd = null
      }

      if (this.searchBean.userId != null && this.searchBean.userId === '') {
        this.searchBean.userId = null
      }
      if (this.searchBean.username != null && this.searchBean.username === '') {
        this.searchBean.username = null
      }
      if (this.searchBean.levelNum != null && this.searchBean.levelNum === '') {
        this.searchBean.levelNum = null
      }
      this.$store.dispatch('memberManage/searchListData', this.searchBean).then(() => {
        this.listData = this.$store.state.memberManage.listData
        this.pageCount = Math.ceil(this.$store.state.memberManage.countData / this.searchBean.limit)
        const that = this
        that.$myLoading.myLoading.closeLoading()
      })
    },
    // 日期格式
    dateFormat(fmt, date) {
      let ret
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        }
      }
      return fmt
    },
    handlePage(page) {
      if (this.searchBean.listNumber + page < 1 || this.searchBean.listNumber + page > this.pageCount) {
        return false
      }
      this.searchBean.listNumber = this.searchBean.listNumber + page
      this.searchBean.offset = (this.searchBean.listNumber - 1) * this.searchBean.limit
      this.searchDate()
    },
    showBasicData(data) {
      this.$store.dispatch('memberManage/searchDetailData', { userId: data.userId }).then(() => {
        this.memberInfoParam = this.$store.state.memberManage.detailData
        this.memberInfoDialog = true
      })
    },
    saveMemberInfo() {
      if (this.memberInfoParam.levelNum != null && this.memberInfoParam.levelNum === '') {
        this.memberInfoParam.levelNum = null
      }
      if (this.memberInfoParam.phone != null && this.memberInfoParam.phone === '') {
        this.memberInfoParam.phone = null
      }
      if (this.memberInfoParam.email != null && this.memberInfoParam.email === '') {
        this.memberInfoParam.email = null
      }
      if (this.memberInfoParam.levelNum != null && this.memberInfoParam.levelNum === '') {
        this.memberInfoParam.levelNum = null
      }
      if (this.memberInfoParam.levelNum != null && this.memberInfoParam.levelNum === '') {
        this.memberInfoParam.levelNum = null
      }
      if (this.memberInfoParam.block != null) {
        this.memberInfoParam.isBlock = this.memberInfoParam.block
      }
      this.$store.dispatch('memberManage/updateBasic', this.memberInfoParam).then(() => {
        const status = this.$store.state.memberManage.updateBasicStatus
        if (status != null && status === 0) {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.searchDate()
          this.memberInfoDialog = false
        } else {
          this.$message({
            type: 'error',
            message: '操作失败'
          })
        }
      })
    },
    showAddressDetail(data) {
      this.$store.dispatch('memberManage/getAddressList', { userId: data.userId }).then(() => {
        this.addressParam = this.$store.state.memberManage.addressData
        this.addressDialog = true
      })
    },
    showBalance(data) {
      this.resetForm('balanceRef')
      this.$store.dispatch('memberManage/searchDetailData', { userId: data.userId }).then(() => {
        this.balanceParam = this.$store.state.memberManage.detailData
        this.balanceParam.amount = 0
        this.balanceDialog = true
      })
    },
    saveBalance() {
      this.$refs.balanceRef.validate(valid => {
        if (valid) {
          this.$store.dispatch('memberManage/updateBalance', this.balanceParam).then(() => {
            const status = this.$store.state.memberManage.updateBalanceStatus
            if (status != null && status === 0) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.searchDate()
              this.balanceDialog = false
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
    showCmmission(data) {
      this.resetForm('cmmissioneRef')
      this.$store.dispatch('memberManage/searchDetailData', { userId: data.userId }).then(() => {
        this.cmmissionParam = this.$store.state.memberManage.detailData
        this.cmmissionDialog = true
      })
    },
    saveCmmission() {
      this.$refs.cmmissioneRef.validate(valid => {
        if (valid) {
          this.$store.dispatch('memberManage/updateCmmission', this.cmmissionParam).then(() => {
            const status = this.$store.state.memberManage.updateCmmissionStatus
            if (status != null && status === 0) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.searchDate()
              this.cmmissionDialog = false
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
.operatingHints{
  margin-top:10px;font-size:14px;line-height:30px;
}
</style>
