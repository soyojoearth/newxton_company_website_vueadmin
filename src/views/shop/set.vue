<template>
  <div class="app-container">
    <el-card style="margin-top:10px;font-size:14px;line-height:30px;">
      <el-row style="font-weight:800;">
        操作提示：
      </el-row>
      <el-row>
        1、此处配置默认空白，但不影响网站正常运行。
      </el-row>
      <el-row>
        2、如需个性化，请在下面对应配置相关内容。
      </el-row>
    </el-card>
    <el-card style="margin-top:10px">
      <el-form ref="form" class="data-from" label-width="160px">
        <el-form-item label="搜索推荐关键词">
          <el-input v-model="keywords" class="from-input" />
          <span>（商城搜索框的推荐搜索词，方便用户快捷搜索）</span>
        </el-form-item>
        <el-form-item label="减库存" prop="pass">
          <el-radio v-model="inventoryUpdateType" :label="1">下单减库存</el-radio>
          <el-radio v-model="inventoryUpdateType" :label="2">付款减库存</el-radio>
        </el-form-item>
        <el-form-item label="满多少包邮">
          <el-input v-model="freeShippingAmount" class="from-input" type="text" rows="6" />
          <span>(0等于全场包邮)</span>
        </el-form-item>
        <el-form-item label="发货后多少天自动收货">
          <el-select v-model="automaticConfirmationOfReceiptTime" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="多少天内可申请售后">
          <el-select v-model="afterSalesServiceTimeLimit" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"              
            />
          </el-select>
          <span>从确认收货日开始计算</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getShopInfo, getShopSave } from '@/api/shop'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      list: [],
      oldList: [],
      afterSalesServiceTimeLimit: '',
      automaticConfirmationOfReceiptTime: '',
      freeShippingAmount: '',
      inventoryUpdateType: '',
      keywords: '',
      options: [
        { value: 1, label: '1天' },
        { value: 2, label: '2天' },
        { value: 3, label: '3天' },
        { value: 4, label: '4天' },
        { value: 5, label: '5天' },
        { value: 6, label: '6天' },
        { value: 7, label: '7天' },
        { value: 8, label: '8天' },
        { value: 9, label: '9天' },
        { value: 10, label: '10天' },
        { value: 11, label: '11天' },
        { value: 12, label: '12天' },
        { value: 13, label: '13天' },
        { value: 14, label: '14天' }
      ],
      value: ''
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      var then = this
      new Promise((resolve, rejust) => {
        getShopInfo()
          .then(res => {
            then.list = res.detail
            then.afterSalesServiceTimeLimit = res.detail.afterSalesServiceTimeLimit
            then.automaticConfirmationOfReceiptTime = res.detail.automaticConfirmationOfReceiptTime
            then.freeShippingAmount = res.detail.freeShippingAmount
            then.inventoryUpdateType = res.detail.inventoryUpdateType
            then.keywords = res.detail.keywords
            console.log(res.detail)
            // then.oldList = JSON.parse(JSON.stringify(res.list))
            resolve()
          })
          .catch(error => {
            rejust(error)
          })
      })
      console.log('sss')
    },
    onSubmit() {
      var postDatas = {}
      postDatas['afterSalesServiceTimeLimit'] = this.afterSalesServiceTimeLimit
      postDatas['automaticConfirmationOfReceiptTime'] = this.automaticConfirmationOfReceiptTime
      postDatas['freeShippingAmount'] = this.freeShippingAmount
      postDatas['inventoryUpdateType'] = this.inventoryUpdateType
      // postDatas['afterSalesServiceTimeLimit'] = 1
      // postDatas['automaticConfirmationOfReceiptTime'] = 1
      // postDatas['freeShippingAmount'] = 1
      // postDatas['inventoryUpdateType'] = 1
      postDatas['keywords'] = this.keywords
      getShopSave(postDatas).then(value => {
        console.log(value)
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      }).catch(() => {
        this.$message({
          message: '修改失败',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style scoped>
.from-input{
    width: 400px;
}
</style>

