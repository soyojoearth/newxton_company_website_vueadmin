<template>
  <div class="app-container">
    <div v-show="showPage === 'homePage'">
      <el-card class="operatingHints">
        <el-row style="font-weight:800;">
          操作提示：
        </el-row>
        <el-row>
          1、用户已经付款，然后再申请“取消订单”，会出现在这里；无论有没有发货。
        </el-row>
        <el-row>
          2、可以在这里根据情况，同意或拒绝退款申请。
        </el-row>
        <el-row>
          3、同意退款后，金额退到用户余额。然后用户在个人中心申请提现。
        </el-row>
      </el-card>

      <el-card class="operatingHints">
        <el-row style="margin-top: 10px">
          <el-col :offset="15">
            <el-select v-model="searchBean.status" placeholder="处理状态" :clearable="true">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-input v-model="searchBean.username" placeholder="用户名" style="width: 150px" maxlength="30"></el-input>
            <el-input v-model="searchBean.orderFormSerialNum" placeholder="订单编号" style="width: 150px" maxlength="30"></el-input>
            <el-button type="primary" @click="searchDate">筛选</el-button>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-table ref="multipleTable" :data="listData" tooltip-effect="dark">
            <el-table-column prop="orderFormSerialNum" label="订单号" height="30px" />
            <el-table-column prop="datelineCreateReadable" label="售后申请时间" height="30px" />
            <el-table-column prop="deliveryPhone" label="收货人电话" height="30px" />
            <el-table-column prop="amountFinally" label="订单总金额" height="30px" />
            <el-table-column prop="amountRefundTotal" label="申请退款金额" height="30px" />
            <el-table-column prop="statusText" label="处理状态" height="30px" />
            <el-table-column prop="" label="操作" show-overflow-tooltip header-align="left">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="showDetail(scope.row)">查看处理</el-button>
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
    </div>
    <div v-if="showPage === 'editorPage'">
      <el-row style="margin-top: 10px">
        <el-col :span="2">
          <el-button @click="showListPag">返回</el-button>
        </el-col>
      </el-row>

      <el-card class="operatingHints">
        <el-row style="margin-top: 10px">
          基本信息
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="4" :offset="1">
            订单编号：{{ detailData.orderFormDetail.serialNum }}
          </el-col>
          <el-col :span="4" :offset="2">
            会员ID：{{ detailData.orderFormDetail.username }}
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="4" :offset="1">
            成交平台：{{ detailData.orderFormDetail.dealPlatform }}
          </el-col>
          <el-col :span="4" :offset="2">
            下单时间：{{ detailData.orderFormDetail.datelineCreateReadable }}
          </el-col>
          <el-col :span="4" :offset="2">
            付款时间：{{ detailData.orderFormDetail.datelinePaidReadable != null ? detailData.orderFormDetail.datelinePaidReadable: '- -' }}
          </el-col>
        </el-row>
        <el-divider />
        <el-row style="margin-top: 10px">
          <el-col :span="2">
            收货信息
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="4" :offset="1">
            收货人：{{ detailData.orderFormDetail.deliveryPerson }}
          </el-col>
          <el-col :span="4" :offset="2">
            联系方式：{{ detailData.orderFormDetail.deliveryPhone }}
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :offset="1">
            收货地址：{{ detailData.orderFormDetail.deliveryCountry }}{{ detailData.orderFormDetail.deliveryProvince }}{{ detailData.orderFormDetail.deliveryCity }}{{ detailData.orderFormDetail.deliveryAddress }}
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="4" :offset="1">
            邮编：{{ detailData.orderFormDetail.deliveryPostcode }}
          </el-col>
          <el-col :span="4" :offset="2">
            配送方式：{{ detailData.orderFormDetail.deliveryConfigName }}
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="4" :offset="1">
            留言：{{ detailData.orderFormDetail.deliveryRemark }}
          </el-col>
        </el-row>
        <el-divider />
        <el-row style="margin-top: 10px">
          <el-col :span="2">
            商品信息
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="22" :offset="1">
            <el-table ref="multipleTable" :data="detailData.orderFormRefundDetail.orderFormRefundProductList" tooltip-effect="dark">
              <el-table-column prop="orderFormProductId" label="货号" />
              <el-table-column prop="brandName" label="商品信息">
                <template slot-scope="scope">
                  <img :src="scope.row.picUrl" class="brandImg">
                  <span>{{ scope.row.productName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="brandName" label="规格">
                <template slot-scope="scope">
                  <span v-for="data in scope.row.sku">{{ data.skuValueName }} </span>
                </template>
              </el-table-column>
              <el-table-column prop="quantity" label="退货数量" />
              <el-table-column prop="" label="成交单价">
                <template slot-scope="scope">
                  <span>￥{{ scope.row.productPriceDeal }} </span>
                </template>
              </el-table-column>
              <el-table-column prop="" label="退款总额">
                <template slot-scope="scope">
                  <span v-if="!scope.row.changAmountRefund">￥{{ scope.row.amountRefund }} </span>
                  <el-input-number v-if="scope.row.changAmountRefund" v-model="scope.row.amountRefund" :controls="false" style="width: 100px"></el-input-number>
                  <el-button :icon="scope.row.changAmountRefund ? 'el-icon-check' : 'el-icon-edit'" size="mini" @click="changAmountRefundAction(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-divider />
        <el-row style="margin-top: 10px">
          <el-col :span="2">
            退货退款信息
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="4" :offset="1">
            当前状态： {{ detailData.orderFormRefundDetail.statusText }}
          </el-col>
          <el-col :span="4" :offset="2">
            申请原因：{{ detailData.orderFormRefundDetail.reasonTypeText }}
          </el-col>
          <el-col :span="4" :offset="2">
            申请时间：{{ detailData.orderFormRefundDetail.datelineCreateReadable }}
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="4" :offset="1">
            退货快递：{{ detailData.orderFormRefundDetail.deliveryCompanyName != null ? detailData.orderFormRefundDetail.deliveryCompanyName : '- -' }}
          </el-col>
          <el-col :span="4" :offset="2">
            退货快递单号：{{ detailData.orderFormRefundDetail.deliverySerialNum != null ? detailData.orderFormRefundDetail.deliverySerialNum : '- -' }}
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="1" :offset="1">
            留言：
          </el-col>
          <el-col :span="20">
            <el-input v-model="detailData.orderFormRefundDetail.reasionDescription" disabled type="textarea" style="width: 100%" />
            <el-image v-for="item in detailData.orderFormRefundDetail.reasonImageList" style="width: 100px; height: 100px" :src="item" :preview-src-list="[item]">
            </el-image>
          </el-col>
        </el-row>
        <el-divider />
        <el-row style="margin-top: 10px">
          <el-col :span="2">
            退货退款处理
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="1" :offset="1">
            审核意见
          </el-col>
          <el-col :span="20">
            <el-radio v-for="item in auditStatus" v-model="approvalData.status" :label="item.value" @change="statusCheck">{{ item.label }}</el-radio>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="1" :offset="1">
            处理备注
          </el-col>
          <el-col :span="21">
            <el-input v-model="approvalData.remark" type="textarea" style="width: 100%" placeholder="这里可以填写拒绝退款原因、退货地址等信息。" />
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="1" :offset="2">
            <el-button type="primary" size="small" @click="approvalAction">确定</el-button>
          </el-col>
          <el-col :span="1">
            <el-checkbox v-if="approvalData.status === 3 || approvalData.status === 4" v-model="approvalData.refundDeliveryCost">退运费</el-checkbox>
          </el-col>
        </el-row>
      </el-card>
    </div>
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
      statusList: [{
        value: -1,
        label: '拒绝退款'
      }, {
        value: 0,
        label: '已申请'
      }, {
        value: 1,
        label: '完成'
      }, {
        value: 2,
        label: '等用户发货'
      }, {
        value: 3,
        label: '收到货退款'
      }, {
        value: 4,
        label: '收到货有问题，请修改金额'
      }, {
        value: 5,
        label: '用户已寄出物品'
      }],
      auditStatus: [
        {
          value: -1,
          label: '拒绝退款'
        }, {
          value: 2,
          label: '同意退货，等待用户发货 '
        }, {
          value: 3,
          label: '收到货退款'
        }, {
          value: 4,
          label: '直接退款'
        }
      ],
      listData: [],
      pageCount: 0,
      showPage: 'homePage',
      detailData: {},
      approvalData: {}
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
      if (this.searchBean.status != null && this.searchBean.status === '') {
        this.searchBean.status = null
      }
      if (this.searchBean.username != null && this.searchBean.username === '') {
        this.searchBean.username = null
      }
      if (this.searchBean.orderFormSerialNum != null && this.searchBean.orderFormSerialNum === '') {
        this.searchBean.orderFormSerialNum = null
      }
      this.$store.dispatch('orderFormRefund/searchListData', this.searchBean).then(() => {
        this.listData = this.$store.state.orderFormRefund.listData
        this.pageCount = Math.ceil(this.$store.state.orderFormRefund.countData / this.searchBean.limit)
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
    showListPag() {
      this.showPage = 'homePage'
    },
    showDetail(data) {
      this.detailData = {}
      this.$store.dispatch('orderFormRefund/searchDetailData', { id: data.id }).then(() => {
        this.detailData = this.$store.state.orderFormRefund.detailData
        if (this.detailData.orderFormRefundDetail.orderFormRefundProductList != null && this.detailData.orderFormRefundDetail.orderFormRefundProductList.length > 0) {
          for (const i in this.detailData.orderFormRefundDetail.orderFormRefundProductList) {
            this.$set(this.detailData.orderFormRefundDetail.orderFormRefundProductList[i], 'changAmountRefund', false)
          }
        }
        this.showPage = 'editorPage'
      })
    },
    changAmountRefundAction(data) {
      this.$set(data, 'changAmountRefund', !data.changAmountRefund)
    },
    statusCheck() {
      if (this.approvalData.status !== 3 && this.approvalData.status !== 4) {
        this.$set(this.approvalData, 'refundDeliveryCost', false)
      }
    },
    approvalAction() {
      this.approvalData.id = this.detailData.orderFormRefundDetail.id
      this.approvalData.refundAmountList = []
      if (this.detailData.orderFormRefundDetail.orderFormRefundProductList != null && this.detailData.orderFormRefundDetail.orderFormRefundProductList.length > 0) {
        for (const i in this.detailData.orderFormRefundDetail.orderFormRefundProductList) {
          const refundAmount = {
            orderFromRefundProductId: this.detailData.orderFormRefundDetail.orderFormRefundProductList[i].orderFormProductId,
            orderFromRefundProductAmount: this.detailData.orderFormRefundDetail.orderFormRefundProductList[i].amountRefund
          }
          this.approvalData.refundAmountList.push(refundAmount)
        }
      }
      this.$store.dispatch('orderFormRefund/updateAddress', this.approvalData).then(() => {
        const status = this.$store.state.orderFormRefund.orderRefundApprovalStatus
        if (status != null && status === 0) {
          this.$message({
            type: 'success',
            message: '审核成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '审核失败'
          })
        }
      })
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
</style>
