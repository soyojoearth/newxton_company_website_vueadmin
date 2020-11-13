<template>
  <div class="app-container">
    <el-card style="margin-top:10px">
      <el-form ref="form" label-width="160px">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="微信支付设置" name="first">
            <el-form-item label="绑定支付的APPID" prop="pass">
              <el-input v-model="wxpayAPPID" placeholder="" />
            </el-form-item>
            <el-form-item label="商户号" prop="pass">
              <el-input v-model="wxpayClinetID" placeholder="" />
            </el-form-item>
            <el-form-item label="商户支付密钥" prop="pass">
              <el-input v-model="wxpaySecretKey" placeholder="" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="支付宝设置" name="second">
            <el-form-item label="支付宝appid" prop="pass">
              <el-input v-model="alipayAPPID" placeholder="" />
            </el-form-item>
            <el-form-item label="商户私钥" prop="pass">
              <el-input v-model="alipaySecretKey" placeholder="" />
            </el-form-item>
            <el-form-item label="支付宝公钥" prop="pass">
              <el-input v-model="alipayPublicKey" placeholder="" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getShopInfo, getShopSave } from '@/api/shop'
export default {
  data() {
    return {
      list: [],
      oldList: [],
      activeName: 'first',
      input: '',
      wxpayAPPID: '',
      wxpayClinetID: '',
      wxpaySecretKey: '',
      alipayAPPID: '',
      alipaySecretKey: '',
      alipayPublicKey: ''
    }
  },
  created() {
    // this.load()
  },
  methods: {
    load() {
      var then = this
      new Promise((resolve, rejust) => {
        getShopInfo()
          .then(res => {
            then.wxpayAPPID = res.detail.wxpayAPPID
            then.wxpayClinetID = res.detail.wxpayClinetID
            then.wxpaySecretKey = res.detail.wxpaySecretKey
            then.alipayAPPID = res.detail.alipayAPPID
            then.alipaySecretKey = res.detail.alipaySecretKey
            then.alipayPublicKey = res.detail.alipayPublicKey
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
      var postData = {}
      postData['ossLocation'] = this.ossLocation
      postData['ossQiniuAccessKey'] = this.ossQiniuAccessKey
      postData['ossQiniuSecretKey'] = this.ossQiniuSecretKey
      postData['ossQiniuBucket'] = this.ossQiniuBucket
      postData['ossQiniuDomain'] = this.ossQiniuDomain
      getShopSave(postData)
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>

