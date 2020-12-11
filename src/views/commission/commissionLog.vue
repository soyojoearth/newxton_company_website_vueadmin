<template>
  <div class="app-container">
    <el-card class="operatingHints">
      <el-row style="font-weight:800;">
        操作提示：
      </el-row>
      <el-row>
        1、如果没有显示分成日志，请检查分销开关是否打开、推荐人是否拉黑是否被关闭分销功能。
      </el-row>
      <el-row>
        2、可以根据订单编号查询这笔订单的佣金分给了哪几个会员，查询某个用户得到的所有分成记录
      </el-row>
      <el-row>
        3、推荐人级别，直接推荐人：一级，直接推荐人的上家：二级，直接推荐人的上上家：三级。
      </el-row>
    </el-card>

    <el-card class="operatingHints">
      <el-row style="margin-top: 10px">
        <el-col :offset="8">
          <el-select v-model="searchBean.isPaid" placeholder="-是否已支付-" clearable>
            <el-option v-for="item in isList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="searchBean.isReceive" placeholder="-是否已收货-" clearable>
            <el-option v-for="item in isList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="searchBean.isTransfer" placeholder="-是否已结算-" clearable>
            <el-option v-for="item in isList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-input v-model="searchBean.orderFormSerialNum" placeholder="订单编号" style="width: 150px" />
          <el-input v-model="searchBean.username" placeholder="获佣会员" style="width: 150px" />
          <el-button type="primary" @click="searchDate">筛选</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-table ref="multipleTable" :data="listData" tooltip-effect="dark">
          <el-table-column prop="orderFormSerialNum" label="订单编号" width="220px" />
          <el-table-column prop="" label="商品名称" width="220px;">
            <template slot-scope="scope">
              <div style="text-align: left;text-overflow: ellipsis;overflow: hidden">{{ scope.row.orderFormProductName }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="数量(退货/成交)" width="120px">
            <template slot-scope="scope">
              <span>{{ scope.row.quantityRefund }}/{{ scope.row.quantityDeal }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="inviterUsername" label="获佣会员" width="120px" />
          <el-table-column prop="" label="获佣金额/百分比" width="130px">
            <template slot-scope="scope">
              <span>{{ scope.row.commissionAmount }}/{{ scope.row.commissionRate }}%</span>
            </template>
          </el-table-column>
          <el-table-column prop="priceDeal" label="商品付款金额" width="120px" />
          <el-table-column prop="inviterLevel" label="推荐人级别" width="120px" />
          <el-table-column prop="datelineReadable" label="发生时间" width="150px" />
          <el-table-column prop="statusText" label="状态" />
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
  </div>
</template>

<script>

export default {
  data() {
    return {
      searchBean: {
        offset: 0,
        limit: 10,
        listNumber: 1
      },
      isList: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ],
      listData: [],
      pageCount: 0
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
      this.$store.dispatch('commission/getCommissionLogs', this.searchBean).then(() => {
        this.listData = this.$store.state.commission.listData
        this.pageCount = Math.ceil(this.$store.state.commission.countData / this.searchBean.limit)
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
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.operatingHints{
  margin-top:10px;font-size:14px;line-height:30px;
}
</style>
