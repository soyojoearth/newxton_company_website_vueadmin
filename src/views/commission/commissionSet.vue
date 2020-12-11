<template>
  <div class="app-container">
    <el-card class="operatingHints">
      <el-row style="font-weight:800;">
        操作提示：
      </el-row>
      <el-row>
        1、本系统支持三级分销佣金结算。
      </el-row>
      <el-row>
        2、每成交一个商品，购买者的推荐人、推荐人的上家和上上家，能分别得到佣金提成。
      </el-row>
      <el-row>
        3、所有级别分成比例加起来不超过100%。
      </el-row>
      <el-row>
        4、推荐人级别，直接推荐人：一级，直接推荐人的上家：二级，直接推荐人的上上家：三级。
      </el-row>
    </el-card>

    <el-card class="operatingHints">
      <el-row style="margin-top: 10px">
        <el-col :span="2" class="colName">
          <span>分销功能</span>
        </el-col>
        <el-col :span="2">
          <el-switch v-model="commissionDetailData.onoff" />
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="2" class="colName">
          <span>默认商品佣金</span>
        </el-col>
        <el-col :span="2">
          <el-input-number v-model="commissionDetailData.defaultProductCommissionRate" :controls="false" style="width: 100px" />
        </el-col>
        <el-col :span="1">
          <div style="padding-left: 10px">%</div>
        </el-col>
        <el-col :span="6">
          <span>（默认新添加商品的佣金占实际付款价的比例，不含运费）</span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="2" class="colName">
          <span>一级佣金</span>
        </el-col>
        <el-col :span="2">
          <el-input-number v-model="commissionDetailData.commissionRateLevel1" :controls="false" style="width: 100px" />
        </el-col>
        <el-col :span="1">
          <div style="padding-left: 10px">%</div>
        </el-col>
        <el-col :span="6">
          <span>（购买者直接推荐人返佣占商品分销金比例）</span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="2" class="colName">
          <span>二级佣金</span>
        </el-col>
        <el-col :span="2">
          <el-input-number v-model="commissionDetailData.commissionRateLevel2" :controls="false" style="width: 100px" />
        </el-col>
        <el-col :span="1">
          <div style="padding-left: 10px">%</div>
        </el-col>
        <el-col :span="6">
          <span>（购买者推荐人的上家返佣占商品分销金比例）</span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="2" class="colName">
          <span>三级佣金</span>
        </el-col>
        <el-col :span="2">
          <el-input-number v-model="commissionDetailData.commissionRateLevel3" :controls="false" style="width: 100px" />
        </el-col>
        <el-col :span="1">
          <div style="padding-left: 10px">%</div>
        </el-col>
        <el-col :span="6">
          <span>（购买者推荐人的上上家返佣占商品分销金比例）</span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="2" class="colName">
          <span>推荐人有效期</span>
        </el-col>
        <el-col :span="2">
          <el-input-number v-model="commissionDetailData.inviterExpirationDays" :controls="false" style="width: 100px" />
        </el-col>
        <el-col :span="1">
          <div style="padding-left: 10px">天</div>
        </el-col>
        <el-col :span="6">
          <span>（下家注册超过这个时间后，上家不再享有佣金提成）</span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="2" class="colName">
          <span>佣金售后期限</span>
        </el-col>
        <el-col :span="2">
          <el-input-number v-model="commissionDetailData.safeDays" :controls="false" style="width: 100px" />
        </el-col>
        <el-col :span="1">
          <div style="padding-left: 10px">天</div>
        </el-col>
        <el-col :span="6">
          <span>（确认收货后几天，佣金才可转入余额）</span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :offset="2">
          <el-button type="primary" @click="commissionConfirm">确定</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      commissionDetailData: {}
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
      this.commissionDetailData = {}
      this.$store.dispatch('commission/searchDetailData').then(() => {
        this.commissionDetailData = Object.assign({}, this.$store.state.commission.detailData)
        const that = this
        that.$myLoading.myLoading.closeLoading()
      })
    },
    commissionConfirm() {
      if (this.commissionDetailData.defaultProductCommissionRate == null || this.commissionDetailData.defaultProductCommissionRate === '') {
        this.$notify.error({
          title: '错误',
          message: '默认商品佣金不能为空！'
        })
        return
      }
      if (this.commissionDetailData.commissionRateLevel1 == null || this.commissionDetailData.commissionRateLevel1 === '') {
        this.$notify.error({
          title: '错误',
          message: '一级佣金不能为空！'
        })
        return
      }
      if (this.commissionDetailData.commissionRateLevel2 == null || this.commissionDetailData.commissionRateLevel2 === '') {
        this.$notify.error({
          title: '错误',
          message: '二级佣金不能为空！'
        })
        return
      }
      if (this.commissionDetailData.commissionRateLevel3 == null || this.commissionDetailData.commissionRateLevel3 === '') {
        this.$notify.error({
          title: '错误',
          message: '三级佣金不能为空！'
        })
        return
      }
      if (this.commissionDetailData.inviterExpirationDays == null || this.commissionDetailData.inviterExpirationDays === '') {
        this.$notify.error({
          title: '错误',
          message: '推荐人有效期不能为空！'
        })
        return
      }
      if (this.commissionDetailData.safeDays == null || this.commissionDetailData.safeDays === '') {
        this.$notify.error({
          title: '错误',
          message: '佣金售后期限不能为空！'
        })
        return
      }
      this.$store.dispatch('commission/commissionSave', this.commissionDetailData).then(() => {
        const status = this.$store.state.commission.commissionSaveStatus
        if (status != null && status === 0) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          setTimeout(() => {
            this.searchDate()
          }, 1000)
        } else {
          this.$message({
            type: 'error',
            message: '保存失败'
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
.colName {
  text-align: right;
  margin-right: 10px
}
</style>
